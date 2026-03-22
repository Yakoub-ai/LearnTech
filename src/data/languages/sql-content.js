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

### Exercises

Given a \`products\` table with columns: \`product_id\`, \`product_name\`, \`category\`, \`price\`, \`stock_quantity\`, \`created_at\`.

**1. Filter by category and sort**

Select all products in the \`'Electronics'\` category, sorted by price descending.

<details>
<summary>Hint</summary>

Use \`WHERE category = 'Electronics'\` and \`ORDER BY price DESC\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT product_id, product_name, category, price, stock_quantity, created_at
FROM products
WHERE category = 'Electronics'
ORDER BY price DESC;
\`\`\`

Returns all Electronics products from most to least expensive.

</details>

**2. Most recently created**

Get the 5 most recently created products.

<details>
<summary>Hint</summary>

Sort by \`created_at DESC\` and use \`LIMIT 5\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT product_id, product_name, category, price, stock_quantity, created_at
FROM products
ORDER BY created_at DESC
LIMIT 5;
\`\`\`

Returns the 5 newest products by creation date.

</details>

**3. Unique categories**

Find all unique categories in the products table.

<details>
<summary>Hint</summary>

Use \`SELECT DISTINCT category\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT DISTINCT category
FROM products
ORDER BY category;
\`\`\`

Returns one row per unique category, sorted alphabetically.

</details>

**4. Price range filter**

Select products priced between $10 and $50, showing only name and price.

<details>
<summary>Hint</summary>

Use \`WHERE price BETWEEN 10 AND 50\` and select only the two columns needed.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT product_name, price
FROM products
WHERE price BETWEEN 10 AND 50
ORDER BY price;
\`\`\`

Returns product name and price for all products in the $10–$50 range, inclusive.

</details>

### SELECT Anatomy

\`\`\`mermaid
flowchart LR
    A[SELECT columns] --> B[FROM table]
    B --> C[JOIN other tables]
    C --> D[WHERE conditions]
    D --> E[GROUP BY columns]
    E --> F[HAVING group filter]
    F --> G[ORDER BY columns]
    G --> H[LIMIT count]
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

### Exercises

Given an \`orders\` table with columns: \`order_id\`, \`customer_id\`, \`order_date\`, \`status\`, \`total\`, \`shipping_address\`, \`notes\`.

**1. Status and date filter**

Find all orders with status \`'pending'\` or \`'processing'\` placed in 2025.

<details>
<summary>Hint</summary>

Use \`status IN ('pending', 'processing')\` combined with \`AND order_date BETWEEN '2025-01-01' AND '2025-12-31'\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT order_id, customer_id, order_date, status, total
FROM orders
WHERE status IN ('pending', 'processing')
  AND order_date BETWEEN '2025-01-01' AND '2025-12-31';
\`\`\`

Returns orders that are pending or processing and were placed any time in 2025.

</details>

**2. Case-insensitive pattern match**

Find orders where \`notes\` contains the word \`'urgent'\` (case-insensitive).

<details>
<summary>Hint</summary>

Use \`ILIKE '%urgent%'\` for case-insensitive pattern matching in PostgreSQL.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT order_id, customer_id, order_date, status, total, notes
FROM orders
WHERE notes ILIKE '%urgent%';
\`\`\`

Returns all orders whose notes field contains the word "urgent" in any capitalisation.

</details>

**3. Range with exclusion**

Find orders with a total between $100 and $500, excluding cancelled orders.

<details>
<summary>Hint</summary>

Combine \`total BETWEEN 100 AND 500\` with \`AND status <> 'cancelled'\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT order_id, customer_id, order_date, status, total
FROM orders
WHERE total BETWEEN 100 AND 500
  AND status <> 'cancelled';
\`\`\`

Returns non-cancelled orders in the $100–$500 range inclusive.

</details>

**4. NULL check**

Find orders where \`shipping_address\` is not provided.

<details>
<summary>Hint</summary>

Use \`IS NULL\` — never \`= NULL\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT order_id, customer_id, order_date, status, total
FROM orders
WHERE shipping_address IS NULL;
\`\`\`

Returns orders that have no shipping address on file.

</details>

**5. Multi-column sort**

List orders sorted by status ascending, then total descending.

<details>
<summary>Hint</summary>

Use \`ORDER BY status ASC, total DESC\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT order_id, customer_id, order_date, status, total
FROM orders
ORDER BY status ASC, total DESC;
\`\`\`

Groups orders alphabetically by status, and within each status shows the highest-value orders first.

</details>

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
-- Resets sequences (with RESTART IDENTITY), cannot be rolled back in MySQL
-- but IS transactional in PostgreSQL (can be rolled back)
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

### Exercises

**1. Insert multiple products**

Insert 3 new products into the \`products\` table in a single statement.

<details>
<summary>Hint</summary>

Use a multi-row \`INSERT INTO ... VALUES (...), (...), (...)\` statement.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
INSERT INTO products (product_name, category, price, stock_quantity)
VALUES
    ('Wireless Mouse', 'Electronics', 29.99, 200),
    ('USB-C Hub', 'Electronics', 49.99, 150),
    ('Desk Lamp', 'Office', 24.99, 300);
\`\`\`

Inserts all three rows in a single round trip, which is much faster than three separate INSERT statements.

</details>

**2. Percentage price increase**

Increase the price of all \`'Electronics'\` products by 15%.

<details>
<summary>Hint</summary>

Use \`SET price = price * 1.15\` with \`WHERE category = 'Electronics'\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
UPDATE products
SET price = ROUND(price * 1.15, 2)
WHERE category = 'Electronics';
\`\`\`

Multiplies each Electronics product's price by 1.15 and rounds to 2 decimal places. Always run a \`SELECT\` with the same \`WHERE\` first to verify the affected rows.

</details>

**3. Delete old cancelled orders**

Delete all orders older than 2 years with status \`'cancelled'\`.

<details>
<summary>Hint</summary>

Use \`order_date < NOW() - INTERVAL '2 years'\` combined with the status filter.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
DELETE FROM orders
WHERE status = 'cancelled'
  AND order_date < NOW() - INTERVAL '2 years';
\`\`\`

Removes cancelled orders that are more than two years old. Verify with a \`SELECT\` using the same conditions before running the \`DELETE\`.

</details>

**4. Upsert by SKU**

Write an upsert that updates a product's price if the SKU exists, or inserts a new product if it does not.

<details>
<summary>Hint</summary>

Use \`INSERT ... ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
INSERT INTO products (sku, product_name, price)
VALUES ('WIDGET-001', 'Widget A', 34.99)
ON CONFLICT (sku) DO UPDATE
SET price = EXCLUDED.price,
    updated_at = NOW();
\`\`\`

If a row with \`sku = 'WIDGET-001'\` already exists, its price is updated to 34.99. If it does not exist, a new row is inserted. \`EXCLUDED\` refers to the row that failed the uniqueness check.

</details>

---

## 4. SQL Injection Prevention

SQL injection is one of the most dangerous and common security vulnerabilities. It occurs when user input is concatenated directly into SQL strings, allowing an attacker to execute arbitrary SQL.

### The Danger of String Concatenation

\`\`\`sql
-- NEVER do this in application code (pseudocode):
-- query = "SELECT * FROM users WHERE username = '" + userInput + "'"
-- If userInput is: ' OR '1'='1
-- The query becomes:
-- SELECT * FROM users WHERE username = '' OR '1'='1'
-- This returns ALL users!

-- Even worse, an attacker could input: '; DROP TABLE users; --
-- SELECT * FROM users WHERE username = ''; DROP TABLE users; --'
-- This deletes your entire users table!
\`\`\`

### Parameterized Queries (Prepared Statements)

Always use parameterized queries. The database treats parameters as data, never as executable SQL.

\`\`\`sql
-- PostgreSQL prepared statement
PREPARE get_user(TEXT) AS
SELECT user_id, username, email
FROM users
WHERE username = $1;

EXECUTE get_user('alice');
\`\`\`

In application code, always use your language's parameterized query support:

\`\`\`sql
-- Python (psycopg2/psycopg3):
-- cursor.execute("SELECT * FROM users WHERE username = %s", (username,))

-- Node.js (pg):
-- client.query('SELECT * FROM users WHERE username = $1', [username])

-- Java (JDBC):
-- PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE username = ?");
-- ps.setString(1, username);

-- Go (database/sql):
-- db.Query("SELECT * FROM users WHERE username = $1", username)

-- NEVER use string concatenation or template literals for SQL values:
-- BAD:  f"SELECT * FROM users WHERE username = '{username}'"
-- BAD:  \\\`SELECT * FROM users WHERE username = '\${username}'\\\`
-- GOOD: cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
\`\`\`

**Why it matters:** SQL injection has been the #1 web application vulnerability for decades (OWASP Top 10). A single unparameterized query can expose your entire database. Parameterized queries are simple, have no performance penalty (in fact they are often faster due to plan caching), and completely eliminate SQL injection.

> **Role connection:** Every developer who writes code that talks to a database must use parameterized queries. This is non-negotiable for backend developers, and code reviewers should reject any string-concatenated SQL on sight.

---

## 5. JOINs

JOINs combine rows from two or more tables based on a related column. They are the fundamental mechanism for working with relational data. Always use explicit \`JOIN ... ON\` syntax rather than implicit comma joins with WHERE conditions — it is clearer and less error-prone.

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

### Exercises

Given tables: \`customers\`, \`orders\`, \`order_items\`, \`products\`, and \`employees\`.

**1. Customers with order count**

List all customers with their order count, including customers who have never placed an order.

<details>
<summary>Hint</summary>

Use a \`LEFT JOIN\` from \`customers\` to \`orders\`, then \`COUNT(o.order_id)\` to count only non-NULL order rows.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY order_count DESC;
\`\`\`

Customers with zero orders appear with \`order_count = 0\` because \`COUNT(o.order_id)\` counts non-NULL values only.

</details>

**2. Products never ordered**

Find products that have never been ordered.

<details>
<summary>Hint</summary>

Use a \`LEFT JOIN\` from \`products\` to \`order_items\` and filter \`WHERE oi.product_id IS NULL\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT p.product_id, p.product_name, p.category, p.price
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
WHERE oi.product_id IS NULL;
\`\`\`

When no matching row exists in \`order_items\`, the LEFT JOIN produces NULL for \`oi.product_id\`, identifying products with no orders.

</details>

**3. Order with customer name and item count**

Show each order with the customer name and total item count across all line items.

<details>
<summary>Hint</summary>

Join \`orders\` to \`customers\` and \`order_items\`, then \`SUM(oi.quantity)\` grouped by order.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    o.order_id,
    c.customer_name,
    o.order_date,
    o.total,
    SUM(oi.quantity) AS total_items
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, c.customer_name, o.order_date, o.total
ORDER BY o.order_date DESC;
\`\`\`

Returns one row per order showing who placed it and how many total items it contains.

</details>

**4. Employees with the same manager**

Find pairs of employees who report to the same manager.

<details>
<summary>Hint</summary>

Self-join \`employees\` on \`manager_id\`, using \`e1.employee_id < e2.employee_id\` to avoid duplicate pairs.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    e1.first_name || ' ' || e1.last_name AS employee_1,
    e2.first_name || ' ' || e2.last_name AS employee_2,
    mgr.first_name || ' ' || mgr.last_name AS shared_manager
FROM employees e1
INNER JOIN employees e2
    ON e1.manager_id = e2.manager_id
    AND e1.employee_id < e2.employee_id
INNER JOIN employees mgr ON e1.manager_id = mgr.employee_id
ORDER BY shared_manager, employee_1;
\`\`\`

The \`e1.employee_id < e2.employee_id\` condition ensures each pair appears only once.

</details>

**5. Product–month combination grid**

Generate a report showing every product–month combination for 2025.

<details>
<summary>Hint</summary>

Use \`CROSS JOIN\` between \`products\` and a month series generated with \`generate_series\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    p.product_id,
    p.product_name,
    months.month
FROM products p
CROSS JOIN (
    SELECT generate_series(
        '2025-01-01'::date,
        '2025-12-01'::date,
        '1 month'::interval
    ) AS month
) months
ORDER BY p.product_name, months.month;
\`\`\`

Produces one row for every (product, month) pair — useful as a base for a sales report where months with no sales should still appear as zero.

</details>

---

## 6. Aggregate Functions

Aggregate functions compute a single result from a set of input rows. They are essential for reporting and analytics. Note that most aggregate functions ignore NULL values — \`COUNT(*)\` counts all rows, but \`COUNT(column)\` only counts non-NULL values in that column.

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

### Exercises

**1. Revenue per category**

Find the total revenue per product category.

<details>
<summary>Hint</summary>

Join \`order_items\` to \`products\`, then \`SUM(oi.quantity * oi.unit_price)\` grouped by \`p.category\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    p.category,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.category
ORDER BY total_revenue DESC;
\`\`\`

Returns one row per category with its total revenue, sorted highest first.

</details>

**2. High-revenue months**

List months where total revenue exceeded $50,000.

<details>
<summary>Hint</summary>

Use \`DATE_TRUNC('month', order_date)\` in \`GROUP BY\`, then \`HAVING SUM(total) > 50000\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS monthly_revenue
FROM orders
WHERE status = 'completed'
GROUP BY DATE_TRUNC('month', order_date)
HAVING SUM(total) > 50000
ORDER BY month;
\`\`\`

Only months whose completed-order revenue exceeds $50,000 appear in the result.

</details>

**3. Top 5 customers by spending**

Find the top 5 customers by total spending.

<details>
<summary>Hint</summary>

Join \`customers\` to \`orders\`, \`SUM(o.total)\`, \`GROUP BY\` customer, \`ORDER BY\` total DESC, \`LIMIT 5\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    c.customer_id,
    c.customer_name,
    SUM(o.total) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spent DESC
LIMIT 5;
\`\`\`

Returns the five highest-spending customers and their lifetime order totals.

</details>

**4. Average order value for active customers**

Calculate the average order value per customer, but only for customers with at least 3 orders.

<details>
<summary>Hint</summary>

Use \`HAVING COUNT(o.order_id) >= 3\` to filter out customers with fewer than 3 orders.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    ROUND(AVG(o.total), 2) AS avg_order_value
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(o.order_id) >= 3
ORDER BY avg_order_value DESC;
\`\`\`

Customers with 0, 1, or 2 orders are excluded by the \`HAVING\` clause.

</details>

**5. Category revenue percentage**

Show the percentage of total revenue each category represents.

<details>
<summary>Hint</summary>

Divide each category's revenue by the grand total using \`SUM(...) OVER ()\` (a window function), or use a subquery for the total.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    p.category,
    SUM(oi.quantity * oi.unit_price) AS category_revenue,
    ROUND(
        SUM(oi.quantity * oi.unit_price) * 100.0
        / SUM(SUM(oi.quantity * oi.unit_price)) OVER (),
        2
    ) AS revenue_pct
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.category
ORDER BY category_revenue DESC;
\`\`\`

The window function \`SUM(...) OVER ()\` computes the grand total across all groups, enabling the percentage calculation in a single query.

</details>

---

## 7. Subqueries

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

### Exercises

**1. Products above average price**

Find all products priced above the average product price.

<details>
<summary>Hint</summary>

Use a scalar subquery \`(SELECT AVG(price) FROM products)\` in the \`WHERE\` clause.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT product_id, product_name, category, price
FROM products
WHERE price > (SELECT AVG(price) FROM products)
ORDER BY price DESC;
\`\`\`

The subquery computes the overall average once; the outer query filters products whose price exceeds it.

</details>

**2. Top 10% spenders**

Find customers whose total spending is in the top 10%.

<details>
<summary>Hint</summary>

Calculate total spending per customer in a subquery, then filter where \`total_spent >= PERCENTILE_CONT(0.9)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT customer_id, customer_name, total_spent
FROM (
    SELECT
        c.customer_id,
        c.customer_name,
        SUM(o.total) AS total_spent
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.customer_name
) customer_totals
WHERE total_spent >= (
    SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_spent)
    FROM (
        SELECT SUM(o.total) AS total_spent
        FROM orders o
        GROUP BY o.customer_id
    ) all_totals
)
ORDER BY total_spent DESC;
\`\`\`

\`PERCENTILE_CONT(0.9)\` computes the 90th percentile of customer spending; only customers at or above that threshold are returned.

</details>

**3. Highest-paid employee per department**

For each department, find the employee with the highest salary using a correlated subquery.

<details>
<summary>Hint</summary>

In the \`WHERE\` clause, use \`e.salary = (SELECT MAX(e2.salary) FROM employees e2 WHERE e2.department = e.department)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT e.first_name, e.last_name, e.department, e.salary
FROM employees e
WHERE e.salary = (
    SELECT MAX(e2.salary)
    FROM employees e2
    WHERE e2.department = e.department
)
ORDER BY e.department;
\`\`\`

The correlated subquery runs once per row, comparing the employee's salary to the maximum salary in their own department.

</details>

**4. Orders containing Electronics**

Find orders that contain at least one product from the \`'Electronics'\` category using \`EXISTS\`.

<details>
<summary>Hint</summary>

Use \`WHERE EXISTS (SELECT 1 FROM order_items oi JOIN products p ON ... WHERE p.category = 'Electronics' AND oi.order_id = o.order_id)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT o.order_id, o.order_date, o.total
FROM orders o
WHERE EXISTS (
    SELECT 1
    FROM order_items oi
    JOIN products p ON oi.product_id = p.product_id
    WHERE oi.order_id = o.order_id
      AND p.category = 'Electronics'
)
ORDER BY o.order_date DESC;
\`\`\`

\`EXISTS\` short-circuits as soon as one matching Electronics item is found, making it efficient even for orders with many line items.

</details>

---

## 8. Basic Indexing

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

### Exercises

**1. Create appropriate indexes**

Create indexes to speed up these two queries:
- \`SELECT * FROM orders WHERE customer_id = 123 AND status = 'pending';\`
- \`SELECT * FROM products WHERE category = 'Electronics' ORDER BY price;\`

<details>
<summary>Hint</summary>

For the first query, a composite index on \`(customer_id, status)\` lets the database satisfy both conditions from the index. For the second, a composite index on \`(category, price)\` covers the filter and the sort.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Index for orders query: equality on customer_id first (more selective),
-- then status narrows the result within each customer's rows
CREATE INDEX idx_orders_customer_status ON orders (customer_id, status);

-- Index for products query: category equality first, then price supports
-- ORDER BY without a separate sort step
CREATE INDEX idx_products_category_price ON products (category, price);
\`\`\`

For the orders query, \`customer_id\` is placed first because it is more selective (one customer's orders vs all pending orders). For products, \`category\` filters rows and \`price\` orders them — together they enable an Index Scan that returns rows already sorted.

</details>

**2. Compare EXPLAIN output**

Run \`EXPLAIN\` on both queries before and after adding the indexes above and observe the difference.

<details>
<summary>Hint</summary>

Before adding the index you should see \`Seq Scan\`. After adding it you should see \`Index Scan\` or \`Index Only Scan\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Before index (shows Seq Scan):
EXPLAIN SELECT * FROM orders WHERE customer_id = 123 AND status = 'pending';

-- Create the index:
CREATE INDEX idx_orders_customer_status ON orders (customer_id, status);

-- After index (shows Index Scan):
EXPLAIN SELECT * FROM orders WHERE customer_id = 123 AND status = 'pending';
\`\`\`

The key difference in the plan output: \`Seq Scan\` reads every row; \`Index Scan\` navigates the B-tree directly to matching rows, dramatically reducing I/O on large tables.

</details>

**3. Low-selectivity boolean index**

Explain why an index on a boolean column like \`is_active\` is often less useful.

<details>
<summary>Hint</summary>

Think about how many distinct values a boolean has and what fraction of rows each value matches.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- A boolean column has only two values: true and false.
-- If 80% of rows are is_active = true, the index covers 80% of the table.
-- The query planner will prefer a Seq Scan over an Index Scan when the
-- match fraction is high, because fetching scattered heap pages is slower
-- than reading the table sequentially.

-- A partial index is much better when one value is rare:
CREATE INDEX idx_users_inactive ON users (user_id)
WHERE is_active = false;
-- This index is small (only inactive users) and highly selective.
\`\`\`

Boolean indexes are useful only when one value is rare (e.g., \`is_deleted = true\` on a table where 99% of rows are not deleted). A partial index on the rare value is the correct solution.

</details>

---

## 9. Data Types & Constraints

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

### Exercises

**1–2. Blog schema with constraints**

Design a schema for a blog application with tables: \`users\`, \`posts\`, \`comments\`, \`tags\`, \`post_tags\` (many-to-many). Include appropriate data types, primary keys, foreign keys, \`NOT NULL\`, \`UNIQUE\`, \`CHECK\`, and \`DEFAULT\` constraints.

<details>
<summary>Hint</summary>

\`post_tags\` needs a composite primary key \`(post_id, tag_id)\`. Posts need a foreign key to \`users.user_id\`. Comments need foreign keys to both \`posts\` and \`users\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
CREATE TABLE users (
    user_id     SERIAL PRIMARY KEY,
    username    VARCHAR(50) NOT NULL UNIQUE,
    email       VARCHAR(255) NOT NULL UNIQUE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    post_id     SERIAL PRIMARY KEY,
    author_id   INTEGER NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    title       VARCHAR(500) NOT NULL,
    body        TEXT NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
    comment_id  SERIAL PRIMARY KEY,
    post_id     INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    author_id   INTEGER NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    body        TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tags (
    tag_id   SERIAL PRIMARY KEY,
    name     VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    post_id  INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    tag_id   INTEGER NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);
\`\`\`

Each relationship is enforced with a foreign key. \`ON DELETE CASCADE\` on \`comments\` and \`post_tags\` means deleting a post automatically removes its comments and tag associations.

</details>

**3. Indexes for common queries**

Add an index on \`posts.author_id\` and \`comments.post_id\`.

<details>
<summary>Hint</summary>

Foreign key columns are not automatically indexed in PostgreSQL — you must create them explicitly.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
CREATE INDEX idx_posts_author ON posts (author_id);
CREATE INDEX idx_comments_post ON comments (post_id);
\`\`\`

These indexes speed up queries like "all posts by a user" and "all comments on a post", which are the most common access patterns in a blog application.

</details>

**4. ON DELETE behaviour**

What happens when you try to delete a user who has posts, and how should you handle it?

<details>
<summary>Hint</summary>

Consider \`ON DELETE RESTRICT\`, \`ON DELETE CASCADE\`, and \`ON DELETE SET NULL\` — each has different implications.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- With ON DELETE RESTRICT (used in the schema above):
DELETE FROM users WHERE user_id = 42;
-- ERROR: update or delete on table "users" violates foreign key constraint
-- "posts_author_id_fkey" on table "posts"
-- The delete is blocked as long as the user has any posts.

-- To allow user deletion while keeping posts (reassign to a "deleted" account):
ALTER TABLE posts
    DROP CONSTRAINT posts_author_id_fkey,
    ADD CONSTRAINT posts_author_id_fkey
        FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE SET NULL;

-- Or, soft-delete the user instead of hard-deleting:
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP;
UPDATE users SET deleted_at = NOW() WHERE user_id = 42;
\`\`\`

\`RESTRICT\` is the safest default — it prevents accidental data loss. Use \`SET NULL\` if posts should survive their author's deletion. Use \`CASCADE\` only when child rows are meaningless without the parent (like \`comments\` belonging to a deleted \`post\`).

</details>

---

## Summary — Beginner Level

You now have a solid foundation in SQL:
- **SELECT** to retrieve data with filtering, sorting, and pagination
- **Filtering** with comparison operators, logical operators, and pattern matching
- **DML** operations to insert, update, and delete data safely
- **SQL injection prevention** using parameterized queries
- **JOINs** to combine data across related tables (using explicit JOIN ... ON syntax)
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

### Exercises

**1. Rank products by sales volume within category**

Rank products within each category by total sales volume (units sold).

<details>
<summary>Hint</summary>

Aggregate sales per product first (in a CTE or subquery), then use \`RANK() OVER (PARTITION BY category ORDER BY units_sold DESC)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    p.category,
    p.product_name,
    SUM(oi.quantity) AS units_sold,
    RANK() OVER (
        PARTITION BY p.category
        ORDER BY SUM(oi.quantity) DESC
    ) AS category_rank
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.category, p.product_id, p.product_name
ORDER BY p.category, category_rank;
\`\`\`

Within each category, rank 1 is the best-selling product. Tied sales volumes share the same rank.

</details>

**2. Month-over-month revenue growth**

Calculate month-over-month revenue growth percentage.

<details>
<summary>Hint</summary>

Use \`LAG(revenue) OVER (ORDER BY month)\` to get the previous month's value, then compute \`(current - previous) / previous * 100\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month))
        / LAG(revenue) OVER (ORDER BY month) * 100,
        2
    ) AS mom_growth_pct
FROM monthly
ORDER BY month;
\`\`\`

The first month has \`NULL\` for \`prev_revenue\` and \`mom_growth_pct\` because there is no prior month.

</details>

**3. Second most recent order per customer**

Find the 2nd most recent order for each customer.

<details>
<summary>Hint</summary>

Use \`ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC)\` and filter \`WHERE rn = 2\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
WITH ranked_orders AS (
    SELECT
        order_id,
        customer_id,
        order_date,
        total,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY order_date DESC
        ) AS rn
    FROM orders
)
SELECT order_id, customer_id, order_date, total
FROM ranked_orders
WHERE rn = 2
ORDER BY customer_id;
\`\`\`

Customers with only one order do not appear in the result because there is no row with \`rn = 2\`.

</details>

**4. 30-day moving average of daily signups**

Compute a 30-day moving average of daily user signups.

<details>
<summary>Hint</summary>

Aggregate signups per day first, then use \`AVG(daily_signups) OVER (ORDER BY signup_date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
WITH daily_signups AS (
    SELECT
        DATE_TRUNC('day', created_at) AS signup_date,
        COUNT(*) AS signups
    FROM users
    GROUP BY DATE_TRUNC('day', created_at)
)
SELECT
    signup_date,
    signups,
    ROUND(
        AVG(signups) OVER (
            ORDER BY signup_date
            ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
        ),
        2
    ) AS moving_avg_30d
FROM daily_signups
ORDER BY signup_date;
\`\`\`

\`ROWS BETWEEN 29 PRECEDING AND CURRENT ROW\` includes today plus the previous 29 days — a 30-day window.

</details>

**5. Customers in deciles by lifetime value**

Assign customers to deciles (10 groups) by lifetime value.

<details>
<summary>Hint</summary>

Use \`NTILE(10) OVER (ORDER BY total_spent DESC)\` — decile 1 will be the top 10% of spenders.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    c.customer_id,
    c.customer_name,
    SUM(o.total) AS lifetime_value,
    NTILE(10) OVER (ORDER BY SUM(o.total) DESC) AS decile
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY lifetime_value DESC;
\`\`\`

Decile 1 contains the top 10% of customers by lifetime value; decile 10 contains the bottom 10%.

</details>

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

### LATERAL Joins

A \`LATERAL\` join allows a subquery in the FROM clause to reference columns from preceding tables — like a correlated subquery, but returning multiple rows and columns. This is a powerful modern SQL feature (SQL:2003 standard, PostgreSQL 9.3+).

\`\`\`sql
-- Get the 3 most recent orders for each customer
-- Without LATERAL, this requires window functions or correlated subqueries
SELECT
    c.customer_name,
    recent.order_id,
    recent.order_date,
    recent.total
FROM customers c
CROSS JOIN LATERAL (
    SELECT o.order_id, o.order_date, o.total
    FROM orders o
    WHERE o.customer_id = c.customer_id
    ORDER BY o.order_date DESC
    LIMIT 3
) AS recent;

-- LATERAL with aggregation: get stats per customer inline
SELECT
    c.customer_name,
    stats.order_count,
    stats.total_spent,
    stats.last_order
FROM customers c
LEFT JOIN LATERAL (
    SELECT
        COUNT(*) AS order_count,
        SUM(total) AS total_spent,
        MAX(order_date) AS last_order
    FROM orders o
    WHERE o.customer_id = c.customer_id
) AS stats ON true;
\`\`\`

**Why it matters:** LATERAL joins solve "top-N per group" problems more efficiently than window functions in many cases. They are also the cleanest way to call set-returning functions for each row of another table.

### MERGE Statement (PostgreSQL 15+)

\`MERGE\` (also known as "upsert on steroids") combines INSERT, UPDATE, and DELETE in a single atomic statement based on a match condition. It is part of the SQL:2003 standard.

\`\`\`sql
-- Synchronize a staging table into the main products table
MERGE INTO products AS target
USING staging_products AS source
ON target.sku = source.sku
WHEN MATCHED AND source.is_deleted = true THEN
    DELETE
WHEN MATCHED THEN
    UPDATE SET
        product_name = source.product_name,
        price = source.price,
        updated_at = NOW()
WHEN NOT MATCHED THEN
    INSERT (sku, product_name, price, created_at)
    VALUES (source.sku, source.product_name, source.price, NOW());
\`\`\`

**Why it matters:** MERGE replaces complex INSERT ... ON CONFLICT or multi-step upsert patterns. It is especially useful for ETL pipelines and data synchronization tasks where you need to handle inserts, updates, and deletes in one pass.

### Exercises

**1. Churned customers**

Find "churned" customers: those who placed at least one order before 90 days ago but have placed no order in the last 90 days.

<details>
<summary>Hint</summary>

Use two CTEs — one for customers with recent orders and one for customers with any historical order — then find customers in the second but not the first.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
WITH recent_orders AS (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE order_date >= NOW() - INTERVAL '90 days'
),
historical_orders AS (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE order_date < NOW() - INTERVAL '90 days'
)
SELECT
    c.customer_id,
    c.customer_name,
    c.email,
    MAX(o.order_date) AS last_order_date
FROM customers c
JOIN historical_orders h ON c.customer_id = h.customer_id
LEFT JOIN recent_orders r ON c.customer_id = r.customer_id
JOIN orders o ON c.customer_id = o.customer_id
WHERE r.customer_id IS NULL
GROUP BY c.customer_id, c.customer_name, c.email
ORDER BY last_order_date ASC;
\`\`\`

Customers in \`historical_orders\` but not in \`recent_orders\` have gone quiet. The result shows when each churned customer last ordered.

</details>

**2. Revenue trend with anomaly flag**

Build a multi-step CTE that calculates daily revenue, adds 7-day and 30-day moving averages, and flags days where revenue dropped more than 20% below the 7-day average.

<details>
<summary>Hint</summary>

Chain three CTEs: \`daily_revenue\` → \`with_averages\` → final \`SELECT\` with the flag.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
WITH daily_revenue AS (
    SELECT
        DATE_TRUNC('day', order_date) AS day,
        SUM(total) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('day', order_date)
),
with_averages AS (
    SELECT
        day,
        revenue,
        AVG(revenue) OVER (
            ORDER BY day
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ) AS avg_7d,
        AVG(revenue) OVER (
            ORDER BY day
            ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
        ) AS avg_30d
    FROM daily_revenue
)
SELECT
    day,
    revenue,
    ROUND(avg_7d, 2) AS avg_7d,
    ROUND(avg_30d, 2) AS avg_30d,
    CASE
        WHEN revenue < avg_7d * 0.80 THEN 'ANOMALY'
        ELSE 'normal'
    END AS flag
FROM with_averages
ORDER BY day;
\`\`\`

Days flagged as \`'ANOMALY'\` had revenue more than 20% below their 7-day moving average.

</details>

**3. Top 5 products per category with LATERAL**

Use a \`LATERAL\` join to get the 5 best-selling products per category.

<details>
<summary>Hint</summary>

\`CROSS JOIN LATERAL\` a subquery that selects from \`products\` and \`order_items\` filtered by the outer category, \`ORDER BY units_sold DESC LIMIT 5\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
SELECT
    cat.category,
    top5.product_name,
    top5.units_sold
FROM (SELECT DISTINCT category FROM products) cat
CROSS JOIN LATERAL (
    SELECT
        p.product_name,
        SUM(oi.quantity) AS units_sold
    FROM products p
    JOIN order_items oi ON p.product_id = oi.product_id
    WHERE p.category = cat.category
    GROUP BY p.product_id, p.product_name
    ORDER BY units_sold DESC
    LIMIT 5
) top5
ORDER BY cat.category, top5.units_sold DESC;
\`\`\`

The \`LATERAL\` subquery runs once per category, returning only the top 5 products for that category.

</details>

**4. MERGE to synchronise a staging table**

Write a \`MERGE\` statement to synchronise \`staging_products\` into the main \`products\` table: update matching SKUs, delete rows marked for deletion, and insert new ones.

<details>
<summary>Hint</summary>

Use \`MERGE INTO products USING staging_products ON (sku match)\` with \`WHEN MATCHED\`, \`WHEN MATCHED AND is_deleted\`, and \`WHEN NOT MATCHED\` clauses.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
MERGE INTO products AS target
USING staging_products AS source
ON target.sku = source.sku
WHEN MATCHED AND source.is_deleted = true THEN
    DELETE
WHEN MATCHED THEN
    UPDATE SET
        product_name = source.product_name,
        price        = source.price,
        updated_at   = NOW()
WHEN NOT MATCHED THEN
    INSERT (sku, product_name, price, created_at)
    VALUES (source.sku, source.product_name, source.price, NOW());
\`\`\`

A single \`MERGE\` statement handles all three cases atomically, which is cleaner than separate \`INSERT\`, \`UPDATE\`, and \`DELETE\` statements. Requires PostgreSQL 15+.

</details>

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

### Exercises

**1. Full chain of command**

Build an org chart query that shows each employee's full chain of command from the CEO down to them.

<details>
<summary>Hint</summary>

Start the recursive CTE with employees where \`manager_id IS NULL\`, then recursively join subordinates and concatenate the path string.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
WITH RECURSIVE org_chain AS (
    -- Base: CEO
    SELECT
        employee_id,
        first_name,
        last_name,
        manager_id,
        0 AS depth,
        first_name || ' ' || last_name AS chain
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: each employee below
    SELECT
        e.employee_id,
        e.first_name,
        e.last_name,
        e.manager_id,
        oc.depth + 1,
        oc.chain || ' > ' || e.first_name || ' ' || e.last_name
    FROM employees e
    INNER JOIN org_chain oc ON e.manager_id = oc.employee_id
)
SELECT
    REPEAT('  ', depth) || first_name || ' ' || last_name AS employee,
    chain AS command_chain
FROM org_chain
ORDER BY chain;
\`\`\`

Each row shows the indented name and the full path from CEO to that employee, for example: \`Alice > Bob > Carol\`.

</details>

**2. Category breadcrumb paths**

Given a \`categories\` table with \`category_id\`, \`name\`, and \`parent_id\`, build a breadcrumb path for each category (e.g., \`"Electronics > Computers > Laptops"\`).

<details>
<summary>Hint</summary>

Start with root categories (\`parent_id IS NULL\`), then recursively append child names with \`' > '\` as the separator.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
WITH RECURSIVE category_path AS (
    -- Base: root categories
    SELECT
        category_id,
        name,
        parent_id,
        name AS breadcrumb
    FROM categories
    WHERE parent_id IS NULL

    UNION ALL

    -- Recursive: append child name
    SELECT
        c.category_id,
        c.name,
        c.parent_id,
        cp.breadcrumb || ' > ' || c.name
    FROM categories c
    INNER JOIN category_path cp ON c.parent_id = cp.category_id
)
SELECT category_id, name, breadcrumb
FROM category_path
ORDER BY breadcrumb;
\`\`\`

Returns every category with its full path, e.g., \`Electronics > Computers > Laptops\`.

</details>

**3. Date series via recursive CTE**

Write a recursive query that generates a date series from 2025-01-01 to 2025-12-31.

<details>
<summary>Hint</summary>

Start with \`'2025-01-01'::date\` as the anchor and recursively add \`1 day\` until the date exceeds \`'2025-12-31'\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
WITH RECURSIVE date_series AS (
    SELECT '2025-01-01'::date AS d

    UNION ALL

    SELECT d + 1
    FROM date_series
    WHERE d < '2025-12-31'
)
SELECT d AS calendar_date
FROM date_series;
\`\`\`

Produces 365 rows, one per day in 2025. In PostgreSQL you can also use \`generate_series('2025-01-01'::date, '2025-12-31'::date, '1 day')\` — the recursive CTE demonstrates the general pattern that works across any SQL database supporting \`WITH RECURSIVE\`.

</details>

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

### Exercises

**1. Transfer with balance check**

Write a transaction that transfers money between accounts, verifying sufficient balance before the transfer.

<details>
<summary>Hint</summary>

Lock the source row with \`FOR UPDATE\`, check the balance, debit/credit, then \`COMMIT\`. Use \`ROLLBACK\` if balance is insufficient.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
BEGIN;

-- Lock the source row to prevent concurrent withdrawals
DO $$
DECLARE
    current_balance DECIMAL;
    transfer_amount DECIMAL := 500;
    from_id INTEGER := 1;
    to_id   INTEGER := 2;
BEGIN
    SELECT balance INTO current_balance
    FROM accounts
    WHERE account_id = from_id
    FOR UPDATE;

    IF current_balance < transfer_amount THEN
        RAISE EXCEPTION 'Insufficient funds: balance %, requested %',
            current_balance, transfer_amount;
    END IF;

    UPDATE accounts SET balance = balance - transfer_amount WHERE account_id = from_id;
    UPDATE accounts SET balance = balance + transfer_amount WHERE account_id = to_id;
END $$;

COMMIT;
\`\`\`

\`FOR UPDATE\` prevents another concurrent transaction from reading and modifying the same row simultaneously, eliminating the race condition where two withdrawals could both see a sufficient balance.

</details>

**2. Savepoint for partial rollback**

Write a transaction with a savepoint that inserts an order and its items, rolling back only the items if they fail while keeping the order.

<details>
<summary>Hint</summary>

Create a \`SAVEPOINT\` after inserting the order row, then use \`ROLLBACK TO SAVEPOINT\` if the item insert fails.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
BEGIN;

INSERT INTO orders (customer_id, total, status)
VALUES (1, 199.99, 'pending')
RETURNING order_id;
-- Assume order_id = 1001 was returned

SAVEPOINT order_saved;

-- Try inserting order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (1001, 99, 2, 99.99);  -- product_id 99 might not exist

-- If the insert above fails, roll back only the item:
-- ROLLBACK TO SAVEPOINT order_saved;

-- Try a different product
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (1001, 42, 1, 99.99);

COMMIT;
\`\`\`

\`ROLLBACK TO SAVEPOINT order_saved\` undoes the failed item insert but preserves the order row, allowing a retry with different item data.

</details>

**3. Repeatable Read vs Read Committed**

Describe a scenario where \`REPEATABLE READ\` prevents a bug that \`READ COMMITTED\` would allow.

<details>
<summary>Hint</summary>

Think about a transaction that reads the same data twice — for example, checking a balance and then making a decision based on it.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Scenario: generating a financial report that sums account balances
-- Transaction A (report generator) under READ COMMITTED:

-- Step 1: Read total balance of accounts 1-500
SELECT SUM(balance) FROM accounts WHERE account_id BETWEEN 1 AND 500;
-- Returns $1,000,000

-- Meanwhile, Transaction B transfers $50,000 from account 300 to account 600
-- (account 600 is outside our range 1-500)

-- Step 2: Read total balance of accounts 501-1000
SELECT SUM(balance) FROM accounts WHERE account_id BETWEEN 501 AND 1000;
-- Under READ COMMITTED, this sees Transaction B's commit
-- account 300 lost $50,000, account 600 gained $50,000
-- But account 300 is in range 1-500 (already counted), account 600 is in 501-1000
-- Result: we COUNT the $50,000 twice — phantom money!

-- Under REPEATABLE READ, both SELECTs see the same snapshot from
-- before Transaction B committed. Total is always consistent.
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT SUM(balance) FROM accounts WHERE account_id BETWEEN 1 AND 500;
SELECT SUM(balance) FROM accounts WHERE account_id BETWEEN 501 AND 1000;
COMMIT;
-- Both reads see the pre-Transaction-B state: no phantom money.
\`\`\`

\`REPEATABLE READ\` takes a snapshot at transaction start. All reads within that transaction see the same data, preventing phantom inconsistencies in multi-step reports.

</details>

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

### Exercises

**1. Product summary view**

Create a view that shows each product with its total sales, average rating, and stock status.

<details>
<summary>Hint</summary>

Join \`products\`, \`order_items\`, and a \`reviews\` table (or simulate it). Use \`CASE\` to derive a stock status label from the \`stock\` column.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
CREATE VIEW product_summary AS
SELECT
    p.product_id,
    p.product_name,
    p.category,
    p.price,
    p.stock,
    CASE
        WHEN p.stock = 0 THEN 'Out of Stock'
        WHEN p.stock < 10 THEN 'Low Stock'
        ELSE 'In Stock'
    END AS stock_status,
    COALESCE(SUM(oi.quantity), 0) AS total_units_sold,
    COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS total_revenue
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name, p.category, p.price, p.stock;
\`\`\`

Products with no sales still appear with zero totals because of the \`LEFT JOIN\`. The \`stock_status\` label is derived at query time so it always reflects current stock.

</details>

**2. Materialized view for monthly revenue**

Create a materialized view for a monthly revenue dashboard.

<details>
<summary>Hint</summary>

Use \`CREATE MATERIALIZED VIEW ... AS SELECT DATE_TRUNC('month', ...), ...\` with \`GROUP BY\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
CREATE MATERIALIZED VIEW monthly_revenue_dashboard AS
SELECT
    DATE_TRUNC('month', o.order_date) AS month,
    p.category,
    COUNT(DISTINCT o.order_id)          AS order_count,
    SUM(oi.quantity)                    AS units_sold,
    SUM(oi.quantity * oi.unit_price)    AS revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p     ON oi.product_id = p.product_id
WHERE o.status = 'completed'
GROUP BY DATE_TRUNC('month', o.order_date), p.category
ORDER BY month, p.category;
\`\`\`

Because the result is stored physically, dashboard queries run against pre-computed data rather than re-joining millions of rows every time.

</details>

**3. Unique index and concurrent refresh**

Add a unique index to the materialized view and set up concurrent refresh.

<details>
<summary>Hint</summary>

A unique index is required for \`REFRESH MATERIALIZED VIEW CONCURRENTLY\`. The unique key should be the combination of columns that uniquely identifies each row.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Unique index required for CONCURRENTLY
CREATE UNIQUE INDEX idx_mrd_month_category
    ON monthly_revenue_dashboard (month, category);

-- Standard refresh (blocks reads while refreshing):
REFRESH MATERIALIZED VIEW monthly_revenue_dashboard;

-- Concurrent refresh (non-blocking — requires the unique index):
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue_dashboard;
\`\`\`

\`CONCURRENTLY\` swaps the old and new data atomically after building the new dataset in the background. Reads against the view are never blocked, making it safe to schedule via a cron job on a live system.

</details>

**4. Regular view vs materialized view**

When would you choose a regular view over a materialized view, and vice versa?

<details>
<summary>Hint</summary>

Consider freshness requirements, query complexity, write frequency, and whether the view's underlying data changes often.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Use a REGULAR VIEW when:
-- - You always need real-time data (e.g., current account balance)
-- - The underlying query is fast enough on its own
-- - The base tables are updated frequently and staleness is unacceptable
-- - You want the schema abstraction without storage cost

-- Use a MATERIALIZED VIEW when:
-- - The query is expensive (many JOINs, large aggregations)
-- - Slightly stale data is acceptable (e.g., yesterday's sales report)
-- - The view is queried much more often than the underlying data changes
-- - You need to add indexes to the result set for further filtering

-- Example decision:
-- "Current cart total" → regular view (must be real-time)
-- "Monthly sales by region for the last 2 years" → materialized view
--    (expensive to compute, refreshed nightly)
\`\`\`

The fundamental trade-off is freshness versus read performance. A materialized view is essentially a cache with a manual or scheduled invalidation mechanism.

</details>

---

## 6. Query Optimization

### Join Algorithm Decision

\`\`\`mermaid
flowchart LR
    A[Join Required] --> B{Table sizes and indexes?}
    B -->|"Small table + indexed column"| C[Nested Loop Join]
    B -->|"Large tables, no useful index"| D[Hash Join]
    B -->|"Both inputs pre-sorted"| E[Merge Join]
    C --> F["Best for selective lookups"]
    D --> G["Builds hash table from smaller side"]
    E --> H["Scans both in sorted order"]
\`\`\`

### Index B-tree Structure

\`\`\`mermaid
flowchart TB
    R["Root Node"] --> I1["Internal Node - Low Keys"]
    R --> I2["Internal Node - High Keys"]
    I1 --> L1["Leaf: rows 1-100"]
    I1 --> L2["Leaf: rows 101-200"]
    I2 --> L3["Leaf: rows 201-300"]
    I2 --> L4["Leaf: rows 301-400"]
    L1 ---|"linked"| L2
    L2 ---|"linked"| L3
    L3 ---|"linked"| L4
\`\`\`

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

### Exercises

**1. EXPLAIN ANALYZE before and after an index**

Run \`EXPLAIN ANALYZE\` on a query with and without an index. Compare the execution times and scan types.

<details>
<summary>Hint</summary>

Drop the index (if it exists), run \`EXPLAIN ANALYZE\`, create the index, then run the same \`EXPLAIN ANALYZE\` again.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Without index (Seq Scan):
DROP INDEX IF EXISTS idx_orders_customer;
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 100;
-- Seq Scan on orders  (cost=0.00..1500.00 rows=50 width=64)
--                     (actual time=0.123..45.678 rows=50 loops=1)

-- Create the index:
CREATE INDEX idx_orders_customer ON orders (customer_id);

-- With index (Index Scan):
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 100;
-- Index Scan using idx_orders_customer on orders
--   (cost=0.43..120.45 rows=50 width=64)
--   (actual time=0.023..0.456 rows=50 loops=1)
\`\`\`

The index reduces the actual time from tens of milliseconds (sequential scan of the whole table) to sub-millisecond (direct B-tree lookup). The savings grow proportionally with table size.

</details>

**2. Rewrite a Seq Scan query**

Find a query that uses \`Seq Scan\` due to a function on an indexed column and rewrite it to use the index.

<details>
<summary>Hint</summary>

Functions applied to indexed columns prevent index use. Rewrite the condition as a range instead.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- BAD: function on order_date prevents index use → Seq Scan
EXPLAIN ANALYZE
SELECT SUM(total) FROM orders
WHERE EXTRACT(YEAR FROM order_date) = 2025;

-- GOOD: rewrite as a range so the B-tree index on order_date is usable
EXPLAIN ANALYZE
SELECT SUM(total) FROM orders
WHERE order_date >= '2025-01-01'
  AND order_date < '2026-01-01';
\`\`\`

The range form lets the planner use a B-tree index scan, jumping directly to the start of 2025 data and scanning forward — avoiding a full table scan.

</details>

**3. Which queries use the composite index?**

Given \`CREATE INDEX idx_orders_status_date ON orders (status, order_date)\`, identify which queries can use it.

<details>
<summary>Hint</summary>

A composite index is usable from left to right. You can skip trailing columns but not leading ones. Equality filters allow use of subsequent columns; range filters do not.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- a. WHERE status = 'active'
--    YES — uses the leading column. Only the status part of the index is used.

-- b. WHERE order_date = '2025-01-01'
--    NO — skips the leading column (status). This query needs a separate index on order_date.

-- c. WHERE status = 'active' AND order_date > '2025-01-01'
--    YES — equality on the leading column, range on the second. Both columns used.

-- d. WHERE status IN ('active', 'pending') AND order_date > '2025-01-01'
--    YES — the planner can use the index for each value in the IN list (bitmap or multiple scans),
--    then combine results. Effective, but less clean than a single equality.
\`\`\`

The rule: put equality conditions first in a composite index, range conditions last. Never skip the leading column or the index cannot be used.

</details>

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

### Exercises

**1. Identify normal form violations**

Identify the normal form violations in this table:

| student_id | name  | courses       | advisor_name | advisor_dept |
|------------|-------|---------------|--------------|--------------|
| 1          | Alice | Math, Physics | Dr. Smith    | Science      |

<details>
<summary>Hint</summary>

Check for: multiple values in one cell (1NF), partial dependencies on the primary key (2NF), and transitive dependencies between non-key columns (3NF).

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Violation 1 (1NF): "courses" contains multiple values ("Math, Physics")
--   → Not atomic. Each cell must hold one value.

-- Violation 2 (2NF): Not applicable here since the key is student_id alone
--   (no composite key), so no partial dependency.

-- Violation 3 (3NF): advisor_dept depends on advisor_name, not on student_id.
--   This is a transitive dependency: student_id → advisor_name → advisor_dept.
\`\`\`

The table violates both 1NF (non-atomic \`courses\`) and 3NF (\`advisor_dept\` depends on \`advisor_name\`, not the primary key).

</details>

**2. Normalize to 3NF**

Normalize the table above to 3NF by creating appropriate tables.

<details>
<summary>Hint</summary>

Fix 1NF by extracting courses into a junction table. Fix 3NF by moving advisor info into its own table.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Fix 3NF: advisor info in its own table
CREATE TABLE advisors (
    advisor_id   SERIAL PRIMARY KEY,
    advisor_name VARCHAR(100) NOT NULL UNIQUE,
    advisor_dept VARCHAR(100) NOT NULL
);

-- Students reference their advisor
CREATE TABLE students (
    student_id  SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    advisor_id  INTEGER REFERENCES advisors(advisor_id)
);

-- Fix 1NF: courses in their own table
CREATE TABLE courses (
    course_id   SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL UNIQUE
);

-- Many-to-many: student enrollments
CREATE TABLE student_courses (
    student_id  INTEGER REFERENCES students(student_id),
    course_id   INTEGER REFERENCES courses(course_id),
    PRIMARY KEY (student_id, course_id)
);
\`\`\`

Updating an advisor's department now requires changing one row in \`advisors\` instead of updating every student row. Each course–student relationship is its own row with no comma-separated values.

</details>

**3. Strategic denormalization for e-commerce**

For a high-traffic e-commerce product page, what data would you denormalize and why?

<details>
<summary>Hint</summary>

Think about what data is read on every product page load and what joins would be needed to assemble it.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Data to denormalize onto the products table or a dedicated read model:

-- 1. Aggregate review stats (avg_rating, review_count)
--    Reason: every product page shows these; computing AVG/COUNT live on the
--    reviews table at every request is expensive. Update via trigger or background job.

-- 2. Category breadcrumb path
--    Reason: requires a recursive query at runtime. Pre-compute and store as text.

-- 3. Primary image URL
--    Reason: product_images is a separate table (one-to-many). Storing the
--    primary image URL directly on products eliminates a JOIN for every listing.

-- 4. Stock status ("In Stock" / "Low Stock" / "Out of Stock")
--    Reason: avoid a JOIN to inventory on every page. Update asynchronously
--    when stock changes.

-- Example denormalized products table additions:
ALTER TABLE products
    ADD COLUMN avg_rating       NUMERIC(3, 2),
    ADD COLUMN review_count     INTEGER DEFAULT 0,
    ADD COLUMN breadcrumb       TEXT,
    ADD COLUMN primary_image_url TEXT,
    ADD COLUMN stock_status     VARCHAR(20);
\`\`\`

Denormalize read-heavy, write-rarely data. Keep normalized anything that changes frequently and must be consistent (e.g., actual stock quantity, order totals).

</details>

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

### Exercises

**1. Product sales summary function**

Write a function that takes a \`product_id\` and returns its total sales, average order quantity, and number of orders.

<details>
<summary>Hint</summary>

Use \`RETURNS TABLE (...)\` with \`RETURN QUERY SELECT SUM(...), AVG(...), COUNT(...)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
CREATE OR REPLACE FUNCTION get_product_sales(p_product_id INTEGER)
RETURNS TABLE (
    total_revenue    DECIMAL,
    avg_quantity     NUMERIC,
    order_count      BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        SUM(oi.quantity * oi.unit_price),
        ROUND(AVG(oi.quantity), 2),
        COUNT(DISTINCT oi.order_id)
    FROM order_items oi
    WHERE oi.product_id = p_product_id;
END;
$$ LANGUAGE plpgsql;

-- Usage:
SELECT * FROM get_product_sales(42);
\`\`\`

Returns a single row with total revenue, average quantity per order, and the number of distinct orders containing that product.

</details>

**2. User creation with duplicate check**

Write a function with error handling that creates a user account, checking for duplicate email and username.

<details>
<summary>Hint</summary>

Check for duplicates explicitly before the INSERT, raising a descriptive exception for each case. Catch \`unique_violation\` as a fallback.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
CREATE OR REPLACE FUNCTION create_user_account(
    p_username VARCHAR,
    p_email    VARCHAR,
    p_password_hash TEXT
)
RETURNS INTEGER AS $$
DECLARE
    new_user_id INTEGER;
BEGIN
    -- Check for duplicate username
    IF EXISTS (SELECT 1 FROM users WHERE username = p_username) THEN
        RAISE EXCEPTION 'Username "%" is already taken', p_username;
    END IF;

    -- Check for duplicate email
    IF EXISTS (SELECT 1 FROM users WHERE email = p_email) THEN
        RAISE EXCEPTION 'Email "%" is already registered', p_email;
    END IF;

    INSERT INTO users (username, email, password_hash)
    VALUES (p_username, p_email, p_password_hash)
    RETURNING user_id INTO new_user_id;

    RETURN new_user_id;

EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Duplicate username or email (concurrent insert race)';
END;
$$ LANGUAGE plpgsql;

-- Usage:
SELECT create_user_account('alice', 'alice@example.com', 'hashed_pw');
\`\`\`

The explicit checks give clear error messages. The \`unique_violation\` handler is a safety net for concurrent inserts that pass the IF checks simultaneously.

</details>

**3. Batched refund procedure**

Write a procedure that processes refunds in batches, committing after each batch.

<details>
<summary>Hint</summary>

Use a \`FOR\` loop or \`LOOP ... EXIT WHEN\` with \`LIMIT batch_size\`. Call \`COMMIT\` inside the loop (only valid inside a procedure, not a function).

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
CREATE OR REPLACE PROCEDURE process_refunds_in_batches(batch_size INTEGER DEFAULT 100)
LANGUAGE plpgsql AS $$
DECLARE
    processed INTEGER;
    total     INTEGER := 0;
BEGIN
    LOOP
        -- Process one batch of pending refunds
        WITH batch AS (
            SELECT refund_id
            FROM refunds
            WHERE status = 'pending'
            ORDER BY created_at
            LIMIT batch_size
            FOR UPDATE SKIP LOCKED
        )
        UPDATE refunds r
        SET status = 'processed',
            processed_at = NOW()
        FROM batch
        WHERE r.refund_id = batch.refund_id;

        GET DIAGNOSTICS processed = ROW_COUNT;
        total := total + processed;

        COMMIT;  -- Release locks and let other transactions proceed

        EXIT WHEN processed = 0;

        PERFORM pg_sleep(0.05);  -- Brief pause to reduce contention
    END LOOP;

    RAISE NOTICE 'Total refunds processed: %', total;
END;
$$;

-- Call it:
CALL process_refunds_in_batches(100);
\`\`\`

\`SKIP LOCKED\` prevents this procedure from blocking on rows another worker is already processing. Committing after each batch keeps transactions short and prevents table bloat from long-lived transactions blocking VACUUM.

</details>

---

## Summary — Mid Level

You have now mastered intermediate SQL concepts:
- **Window functions** for row-by-row calculations without collapsing groups
- **CTEs** for readable, composable multi-step queries
- **LATERAL joins** for correlated set-returning subqueries in FROM
- **MERGE** for atomic insert/update/delete synchronization
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

### Exercises

**1. Read a complex execution plan**

Take a query with 3+ JOINs and run \`EXPLAIN ANALYZE\`. Identify: which join algorithm is used for each join, which tables use index vs. seq scans, and where the most time is spent.

<details>
<summary>Hint</summary>

Look for the node with the highest \`actual time\` value. Each join node shows its algorithm (Hash Join, Nested Loop, Merge Join) and its input nodes show the scan type.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
EXPLAIN ANALYZE
SELECT
    o.order_id,
    c.customer_name,
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= '2025-01-01';

-- What to look for in the output:
-- 1. The outermost node is the last operation (often Sort or Aggregate)
-- 2. Find "Hash Join", "Nested Loop", or "Merge Join" nodes — note which tables
-- 3. Find "Seq Scan" nodes on large tables — these are bottlenecks
-- 4. Find "(actual time=X..Y rows=Z loops=N)" — the node with highest Y*N is slowest
-- 5. Compare "rows=estimated" vs "(actual... rows=actual)" — large gaps = stale stats
\`\`\`

The execution plan is a tree read bottom-up. Each parent node consumes its children's output. The highest \`actual time\` in the plan is your primary optimization target.

</details>

**2. Force a different join strategy**

Force the planner to use a different join algorithm and compare execution times to understand why the planner chose its original strategy.

<details>
<summary>Hint</summary>

Use \`SET enable_hashjoin = off\` (or \`enable_nestloop\`, \`enable_mergejoin\`) to disable one algorithm, then re-run \`EXPLAIN ANALYZE\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Record the original plan and time
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
-- Suppose: Hash Join, actual time = 12ms

-- Force Nested Loop (disabling Hash Join)
SET enable_hashjoin = off;
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
-- Now: Nested Loop, actual time = 340ms

-- Restore default
RESET enable_hashjoin;
\`\`\`

The planner chose Hash Join because both tables are large and there is no index on \`orders.customer_id\`. Hash Join builds a hash table from \`customers\` once and probes it for every order row — O(N+M). Nested Loop would do a full scan of \`customers\` for each of the thousands of order rows — much slower without an index.

</details>

**3. Fix stale statistics**

Find a query where estimated rows differ significantly from actual rows, then run \`ANALYZE\` and re-check.

<details>
<summary>Hint</summary>

A large difference between \`rows=estimated\` and \`(actual... rows=actual)\` in \`EXPLAIN ANALYZE\` output means the planner's statistics are out of date. \`ANALYZE table_name\` refreshes them.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Identify the problem: look for large row estimate discrepancies
EXPLAIN ANALYZE
SELECT * FROM orders WHERE status = 'completed' AND order_date >= '2025-01-01';
-- e.g., rows=50 (estimated) vs (actual... rows=15000) — 300x off!

-- Check when the table was last analyzed
SELECT relname, last_analyze, last_autoanalyze, n_live_tup, n_dead_tup
FROM pg_stat_user_tables
WHERE relname = 'orders';

-- Refresh statistics
ANALYZE orders;

-- Re-run the plan — estimate should now be close to actual
EXPLAIN ANALYZE
SELECT * FROM orders WHERE status = 'completed' AND order_date >= '2025-01-01';
-- Now rows=14800 (estimated) vs (actual... rows=15000) — much closer
\`\`\`

Stale statistics cause the planner to choose suboptimal join algorithms and scan types. High-churn tables should be analyzed more frequently — tune \`autovacuum_analyze_scale_factor\` for those tables.

</details>

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

### Exercises

**1. GIN index on JSONB**

Create a GIN index on a JSONB column and demonstrate queries that use it versus queries that cannot use it.

<details>
<summary>Hint</summary>

GIN supports containment (\`@>\`), key existence (\`?\`), and array overlap (\`&&\`). It does NOT support plain equality or range comparisons on JSONB values.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Create GIN index
CREATE INDEX idx_events_payload ON events USING gin (payload);

-- Queries that USE the GIN index:

-- Containment: find events with a specific source
SELECT * FROM events WHERE payload @> '{"source": "google_ads"}';

-- Key existence: find events that have an error_code field
SELECT * FROM events WHERE payload ? 'error_code';

-- Array overlap (if payload contains a tags array)
SELECT * FROM events WHERE payload->'tags' ?| ARRAY['sql', 'performance'];

-- Queries that CANNOT use this GIN index:

-- Plain equality on a nested text value (no GIN support for this form)
SELECT * FROM events WHERE payload->>'user_id' = '42';
-- Fix: create an expression index instead:
CREATE INDEX idx_events_user_id ON events ((payload->>'user_id'));

-- Range comparison on a JSONB numeric value
SELECT * FROM events WHERE (payload->>'amount')::numeric > 100;
-- Fix: extract to a real column or use an expression index.
\`\`\`

GIN indexes excel at "does this document contain X?" queries. For queries that extract a single field and compare it, an expression B-tree index on that extracted value is more appropriate.

</details>

**2. Partial index for recent orders**

Create a partial index for orders from the last 30 days and compare its size to a full index on the same column.

<details>
<summary>Hint</summary>

Use \`WHERE order_date >= NOW() - INTERVAL '30 days'\` in the \`CREATE INDEX\` statement. Compare sizes with \`pg_relation_size\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Full index on order_date
CREATE INDEX idx_orders_date_full ON orders (order_date);

-- Partial index: only recent orders
CREATE INDEX idx_orders_date_recent ON orders (order_date)
WHERE order_date >= NOW() - INTERVAL '30 days';

-- Compare sizes
SELECT
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) AS index_size
FROM pg_indexes
WHERE tablename = 'orders'
  AND indexname IN ('idx_orders_date_full', 'idx_orders_date_recent');

-- On a table with 5 years of data, the partial index might be
-- 10-50x smaller than the full index, and queries for recent orders
-- will see better cache hit rates because the smaller index fits in RAM.
\`\`\`

A partial index is a powerful tool when most queries filter for a small, known subset of rows. The index is smaller, faster to scan, and cheaper to maintain on writes.

</details>

**3. Covering index for Index Only Scan**

Design a covering index for a frequently used query and verify it produces an \`Index Only Scan\`.

<details>
<summary>Hint</summary>

Include all columns the query needs — both the \`WHERE\` column(s) and the \`SELECT\` columns — using \`INCLUDE (...)\` so the planner never needs to access the table heap.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Query: the most-viewed API endpoint returns order summaries for a customer
SELECT customer_id, order_date, total, status
FROM orders
WHERE customer_id = 100
ORDER BY order_date DESC;

-- Without covering index: Index Scan + heap fetch for each row
CREATE INDEX idx_orders_customer ON orders (customer_id, order_date DESC);

-- With covering index: Index Only Scan (no heap access)
CREATE INDEX idx_orders_customer_covering ON orders (customer_id, order_date DESC)
INCLUDE (total, status);

-- Verify:
EXPLAIN ANALYZE
SELECT customer_id, order_date, total, status
FROM orders
WHERE customer_id = 100
ORDER BY order_date DESC;
-- Should show: Index Only Scan ... Heap Fetches: 0
\`\`\`

\`Heap Fetches: 0\` in the plan confirms the query was answered entirely from the index — no table pages were read.

</details>

**4. B-tree vs hash index on a UUID column**

Compare the size and equality-query performance of a B-tree versus a hash index on a UUID primary key.

<details>
<summary>Hint</summary>

Create both index types on the same column, compare sizes with \`pg_relation_size\`, and benchmark equality lookups with \`EXPLAIN ANALYZE\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- B-tree index (default)
CREATE INDEX idx_sessions_btree ON user_sessions USING btree (session_id);

-- Hash index (equality only, since PostgreSQL 10: WAL-safe)
CREATE INDEX idx_sessions_hash ON user_sessions USING hash (session_id);

-- Compare sizes
SELECT
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_indexes
WHERE tablename = 'user_sessions'
  AND indexname IN ('idx_sessions_btree', 'idx_sessions_hash');

-- Compare equality lookup performance
EXPLAIN ANALYZE
SELECT * FROM user_sessions WHERE session_id = 'some-uuid-here'::uuid;
-- Try with each index individually (drop the other, then test)
\`\`\`

For equality-only lookups on high-cardinality columns (like UUIDs), a hash index is typically the same speed or faster, and slightly smaller. However, a B-tree index is more versatile — it also supports range scans, \`ORDER BY\`, and \`IS NULL\` — making it the better default choice unless you are certain equality-only access is all you need.

</details>

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

### Exercises

**1. Partitioning strategy for high-volume logs**

Design a partitioning strategy for a table that stores 100 million log entries per month.

<details>
<summary>Hint</summary>

Consider the retention period, query patterns (time-range filters?), and how you will drop old data. Range partitioning by month is the standard approach for time-series logs.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Strategy: range partitioning by month on created_at
-- Reasons:
-- 1. Most queries filter by date range → partition pruning skips irrelevant months
-- 2. Old partitions can be dropped (not deleted row-by-row) in milliseconds
-- 3. Each partition can be vacuumed independently
-- 4. New partitions added monthly via automation (pg_partman)

CREATE TABLE app_logs (
    log_id      BIGSERIAL,
    level       VARCHAR(10) NOT NULL,
    message     TEXT NOT NULL,
    context     JSONB,
    created_at  TIMESTAMP NOT NULL,
    PRIMARY KEY (log_id, created_at)
) PARTITION BY RANGE (created_at);

-- Default partition catches any data outside defined ranges
CREATE TABLE app_logs_default PARTITION OF app_logs DEFAULT;

-- Index created once — automatically applied to each partition
CREATE INDEX ON app_logs (level, created_at);
CREATE INDEX ON app_logs USING gin (context);
\`\`\`

At 100M rows/month, a single partition is ~50-100 GB. Monthly partitions mean queries for "last 7 days" only scan the current (and possibly previous) partition rather than years of data.

</details>

**2. Monthly partitions for 2025**

Create monthly partitions for all 12 months of 2025 plus a default partition.

<details>
<summary>Hint</summary>

Each partition uses \`FOR VALUES FROM ('YYYY-MM-01') TO ('YYYY-MM-01' of next month)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
CREATE TABLE app_logs_2025_01 PARTITION OF app_logs
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
CREATE TABLE app_logs_2025_02 PARTITION OF app_logs
    FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
CREATE TABLE app_logs_2025_03 PARTITION OF app_logs
    FOR VALUES FROM ('2025-03-01') TO ('2025-04-01');
CREATE TABLE app_logs_2025_04 PARTITION OF app_logs
    FOR VALUES FROM ('2025-04-01') TO ('2025-05-01');
CREATE TABLE app_logs_2025_05 PARTITION OF app_logs
    FOR VALUES FROM ('2025-05-01') TO ('2025-06-01');
CREATE TABLE app_logs_2025_06 PARTITION OF app_logs
    FOR VALUES FROM ('2025-06-01') TO ('2025-07-01');
CREATE TABLE app_logs_2025_07 PARTITION OF app_logs
    FOR VALUES FROM ('2025-07-01') TO ('2025-08-01');
CREATE TABLE app_logs_2025_08 PARTITION OF app_logs
    FOR VALUES FROM ('2025-08-01') TO ('2025-09-01');
CREATE TABLE app_logs_2025_09 PARTITION OF app_logs
    FOR VALUES FROM ('2025-09-01') TO ('2025-10-01');
CREATE TABLE app_logs_2025_10 PARTITION OF app_logs
    FOR VALUES FROM ('2025-10-01') TO ('2025-11-01');
CREATE TABLE app_logs_2025_11 PARTITION OF app_logs
    FOR VALUES FROM ('2025-11-01') TO ('2025-12-01');
CREATE TABLE app_logs_2025_12 PARTITION OF app_logs
    FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');
\`\`\`

The upper bound is exclusive (\`TO\` is not included), so \`'2025-02-01'\` means up to but not including Feb 1st — i.e., all of January.

</details>

**3. Query that benefits from partition pruning**

Write a query that benefits from partition pruning and verify it with \`EXPLAIN ANALYZE\`.

<details>
<summary>Hint</summary>

The filter must reference the partition key (\`created_at\`) as a literal range so the planner can determine at plan time which partitions to skip.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Query with a time-range filter on the partition key
EXPLAIN ANALYZE
SELECT level, COUNT(*) AS count
FROM app_logs
WHERE created_at >= '2025-06-01' AND created_at < '2025-07-01'
GROUP BY level;

-- Expected output shows ONLY app_logs_2025_06:
-- Append
--   -> Seq Scan on app_logs_2025_06
--        Filter: (created_at >= '2025-06-01' AND created_at < '2025-07-01')
-- (All other 11 partitions are pruned — not even mentioned)

-- Confirm pruning is enabled:
SHOW enable_partition_pruning;  -- Should be 'on'
\`\`\`

Only one partition appears in the plan. All others are pruned at planning time, meaning the database never opens or reads them.

</details>

**4. Detach and archive old partitions**

Write a script to detach and archive partitions older than 1 year.

<details>
<summary>Hint</summary>

\`DETACH PARTITION\` separates the partition from the parent table into a standalone table. You can then rename it, move it to a cold tablespace, or \`DROP\` it.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Detach the old partition (it becomes a standalone table, data preserved)
ALTER TABLE app_logs DETACH PARTITION app_logs_2024_01;

-- Optionally: rename for clarity
ALTER TABLE app_logs_2024_01 RENAME TO app_logs_archive_2024_01;

-- Optionally: move to a cheaper tablespace
ALTER TABLE app_logs_archive_2024_01 SET TABLESPACE cold_storage;

-- Or DROP immediately if retention period has expired:
DROP TABLE app_logs_2024_01;

-- Automate with a DO block (example: drop all partitions older than 1 year)
DO $$
DECLARE
    partition_name TEXT;
    cutoff_date DATE := DATE_TRUNC('month', NOW() - INTERVAL '1 year');
BEGIN
    FOR partition_name IN
        SELECT child.relname
        FROM pg_inherits
        JOIN pg_class parent ON pg_inherits.inhparent = parent.oid
        JOIN pg_class child  ON pg_inherits.inhrelid  = child.oid
        WHERE parent.relname = 'app_logs'
          AND child.relname < 'app_logs_' || TO_CHAR(cutoff_date, 'YYYY_MM')
    LOOP
        EXECUTE 'ALTER TABLE app_logs DETACH PARTITION ' || partition_name;
        EXECUTE 'DROP TABLE ' || partition_name;
        RAISE NOTICE 'Dropped partition: %', partition_name;
    END LOOP;
END $$;
\`\`\`

\`DROP TABLE\` on a partition is instantaneous — it removes the partition's file without scanning rows. This is orders of magnitude faster than \`DELETE FROM app_logs WHERE created_at < ...\` on 100M rows.

</details>

---

## 4. Locking & Concurrency

\`\`\`interactive-flow
sqlQueryExecution
\`\`\`

### Transaction Isolation Levels

\`\`\`mermaid
stateDiagram-v2
    [*] --> ReadUncommitted
    ReadUncommitted --> ReadCommitted: Prevents dirty reads
    ReadCommitted --> RepeatableRead: Prevents non-repeatable reads
    RepeatableRead --> Serializable: Prevents phantom reads

    state ReadUncommitted {
        [*] --> DirtyReads: Allows dirty reads
    }
    state ReadCommitted {
        [*] --> NoDirty: Default in PostgreSQL
    }
    state RepeatableRead {
        [*] --> Snapshot: Snapshot isolation
    }
    state Serializable {
        [*] --> Full: Full isolation
    }
\`\`\`

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

### Exercises

**1. Job queue with SKIP LOCKED**

Implement a job queue using \`SELECT ... FOR UPDATE SKIP LOCKED\` so multiple workers can process jobs concurrently without conflicts.

<details>
<summary>Hint</summary>

Each worker claims one job atomically by locking it, processing it, then updating its status. \`SKIP LOCKED\` ensures two workers never claim the same job.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Schema
CREATE TABLE job_queue (
    job_id     BIGSERIAL PRIMARY KEY,
    payload    JSONB NOT NULL,
    status     VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    started_at TIMESTAMP,
    finished_at TIMESTAMP
);

-- Worker: claim and process one job
BEGIN;

UPDATE job_queue
SET status = 'processing', started_at = NOW()
WHERE job_id = (
    SELECT job_id
    FROM job_queue
    WHERE status = 'pending'
    ORDER BY created_at
    LIMIT 1
    FOR UPDATE SKIP LOCKED
)
RETURNING job_id, payload;

-- ... process the job using the returned payload in application code ...

UPDATE job_queue
SET status = 'done', finished_at = NOW()
WHERE job_id = :claimed_job_id;

COMMIT;
\`\`\`

\`SKIP LOCKED\` means any job already locked by another worker is invisible to this worker, so two workers can run this pattern simultaneously without blocking each other or claiming the same job.

</details>

**2. Deadlock and consistent lock ordering**

Demonstrate a deadlock scenario and show how to fix it with consistent lock ordering.

<details>
<summary>Hint</summary>

A deadlock occurs when two transactions each hold a lock the other needs. Fixing it means always acquiring locks in the same order (e.g., by ascending \`account_id\`).

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- DEADLOCK SCENARIO:
-- Transaction A: lock account 1, then try to lock account 2
-- Transaction B: lock account 2, then try to lock account 1
-- → Deadlock. PostgreSQL detects it and aborts one transaction.

-- FIX: always lock accounts in ascending account_id order
CREATE OR REPLACE FUNCTION transfer_funds(
    from_id INTEGER,
    to_id   INTEGER,
    amount  DECIMAL
) RETURNS void AS $$
BEGIN
    -- Lock in consistent order (lower ID first) regardless of direction
    IF from_id < to_id THEN
        PERFORM * FROM accounts WHERE account_id = from_id FOR UPDATE;
        PERFORM * FROM accounts WHERE account_id = to_id   FOR UPDATE;
    ELSE
        PERFORM * FROM accounts WHERE account_id = to_id   FOR UPDATE;
        PERFORM * FROM accounts WHERE account_id = from_id FOR UPDATE;
    END IF;

    UPDATE accounts SET balance = balance - amount WHERE account_id = from_id;
    UPDATE accounts SET balance = balance + amount WHERE account_id = to_id;
END;
$$ LANGUAGE plpgsql;
\`\`\`

When all callers acquire locks in the same order, a circular wait (the root cause of deadlocks) becomes impossible.

</details>

**3. Optimistic locking for cart checkout**

Implement optimistic locking for a shopping cart checkout that decrements product stock.

<details>
<summary>Hint</summary>

Read the current \`version\` (or \`updated_at\`) of the product row, attempt the UPDATE with a \`WHERE version = :known_version\` condition, and check if any rows were affected.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Step 1: Read current stock and version
SELECT product_id, stock, version
FROM products
WHERE product_id = 42;
-- Returns: stock = 5, version = 12

-- Step 2: Attempt the decrement with version check
UPDATE products
SET stock   = stock - 1,
    version = version + 1
WHERE product_id = 42
  AND version = 12     -- Must still be the version we read
  AND stock >= 1;      -- Must have stock available

-- Step 3: In application code, check affected rows
-- If 0 rows updated: someone else modified the product concurrently → retry
-- If 1 row updated: success

-- Full pattern in pseudocode:
-- retries = 0
-- while retries < 3:
--     row = SELECT product_id, stock, version FROM products WHERE product_id = 42
--     if row.stock < quantity: raise OutOfStock
--     affected = UPDATE products SET stock = stock - quantity, version = version + 1
--                WHERE product_id = 42 AND version = row.version AND stock >= quantity
--     if affected == 1: return success
--     retries += 1
-- raise ConcurrentModification
\`\`\`

Optimistic locking avoids holding a lock during the application-side computation, maximising concurrency. It is ideal when conflicts are rare (most checkouts succeed without contention).

</details>

**4. Advisory locks for cron job deduplication**

Use advisory locks to prevent a cron job from running twice concurrently.

<details>
<summary>Hint</summary>

Use \`pg_try_advisory_lock(id)\` — it returns \`false\` immediately if the lock is already held, instead of waiting.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- In the cron job's SQL (or called from application code at job start):

-- Use a unique numeric ID for this specific job type
-- Hash the job name to get a stable integer, or use a hardcoded constant
DO $$
DECLARE
    lock_id BIGINT := 1234567890;  -- Unique ID for "nightly_report" job
    acquired BOOLEAN;
BEGIN
    SELECT pg_try_advisory_lock(lock_id) INTO acquired;

    IF NOT acquired THEN
        RAISE NOTICE 'Job already running, skipping this execution.';
        RETURN;
    END IF;

    -- Job logic here
    RAISE NOTICE 'Running nightly report job...';
    -- ... actual work ...

    -- Lock is automatically released when the session ends,
    -- or release it explicitly:
    PERFORM pg_advisory_unlock(lock_id);
END $$;

-- For transaction-scoped advisory locks (auto-released at COMMIT/ROLLBACK):
BEGIN;
SELECT pg_advisory_xact_lock(1234567890);
-- If this returns (doesn't raise), we hold the lock for this transaction
-- ... job logic ...
COMMIT;  -- Lock released automatically
\`\`\`

\`pg_try_advisory_lock\` returns \`false\` without blocking if another session holds the same lock ID. This is ideal for cron jobs where you want to skip the run rather than queue behind a running instance.

</details>

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

-- pg_stat_io (PostgreSQL 16+): I/O statistics by backend type and context
-- Helps identify whether I/O bottlenecks are from clients, autovacuum, checkpointer, etc.
SELECT
    backend_type,
    object,
    context,
    reads,
    writes,
    extends,
    hits,
    ROUND(hits::numeric / NULLIF(hits + reads, 0) * 100, 2) AS hit_ratio_pct
FROM pg_stat_io
WHERE reads > 0 OR writes > 0
ORDER BY reads + writes DESC;
\`\`\`

**Why it matters:** Performance tuning is the difference between a database that costs $100/month and one that costs $10,000/month. Connection pooling, COPY for bulk operations, proper VACUUM, and pg_stat_statements are the tools that keep production databases healthy.

### Exercises

**1. Find slowest queries with pg_stat_statements**

Set up \`pg_stat_statements\` and identify the top 5 slowest queries in your application.

<details>
<summary>Hint</summary>

Enable the extension, then query \`pg_stat_statements\` ordering by \`total_exec_time DESC\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Enable the extension (requires adding to postgresql.conf:
-- shared_preload_libraries = 'pg_stat_statements')
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Top 5 queries by total execution time
SELECT
    LEFT(query, 120)                           AS query_preview,
    calls,
    ROUND(total_exec_time::numeric, 0)         AS total_ms,
    ROUND(mean_exec_time::numeric, 2)          AS avg_ms,
    ROUND(stddev_exec_time::numeric, 2)        AS stddev_ms,
    rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 5;

-- Top 5 by average execution time (worst per-call performance)
SELECT
    LEFT(query, 120)                           AS query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2)          AS avg_ms
FROM pg_stat_statements
WHERE calls > 10   -- Ignore one-off queries
ORDER BY mean_exec_time DESC
LIMIT 5;

-- Reset statistics after optimization to measure improvement
SELECT pg_stat_statements_reset();
\`\`\`

Focus first on queries with high \`total_exec_time\` — they have the most impact on overall database load. Then address queries with high \`avg_ms\` that are called frequently.

</details>

**2. COPY vs individual INSERTs**

Implement COPY-based data import and compare its performance to individual \`INSERT\` statements for 100,000 rows.

<details>
<summary>Hint</summary>

Write a CSV file and use \`COPY ... FROM\`. Compare wall-clock time against a loop of single-row \`INSERT\` statements.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Method 1: Individual INSERTs (slow — one transaction per row by default)
-- Approximate benchmark: ~100,000 ms (100 seconds) for 100k rows

-- Method 2: Multi-row INSERT (better — one transaction)
INSERT INTO products (product_name, category, price)
SELECT
    'Product ' || i,
    'Category ' || (i % 10),
    ROUND((random() * 100)::numeric, 2)
FROM generate_series(1, 100000) AS i;
-- Approximate benchmark: ~2-5 seconds

-- Method 3: COPY (fastest — bulk protocol, minimal WAL, no row-by-row overhead)
-- First, generate the CSV:
COPY (
    SELECT
        'Product ' || i AS product_name,
        'Category ' || (i % 10) AS category,
        ROUND((random() * 100)::numeric, 2) AS price
    FROM generate_series(1, 100000) AS i
) TO '/tmp/products_100k.csv' WITH (FORMAT csv, HEADER true);

-- Then load it:
COPY products (product_name, category, price)
FROM '/tmp/products_100k.csv'
WITH (FORMAT csv, HEADER true);
-- Approximate benchmark: ~0.5-1 second
\`\`\`

\`COPY\` is typically 10–100x faster than individual \`INSERT\` statements because it bypasses per-row overhead, uses an efficient binary protocol, and minimises WAL (write-ahead log) writes.

</details>

**3. Tune autovacuum for a high-churn table**

Check a table's dead tuple ratio and tune autovacuum for a high-churn table.

<details>
<summary>Hint</summary>

Check \`pg_stat_user_tables\` for \`n_dead_tup\` and \`last_autovacuum\`. Lower \`autovacuum_vacuum_scale_factor\` to trigger more frequent vacuuming.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Check dead tuple ratios
SELECT
    relname,
    n_live_tup,
    n_dead_tup,
    ROUND(n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100, 2) AS dead_pct,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY dead_pct DESC;

-- If orders table has 20%+ dead tuples and autovacuum is not keeping up:
ALTER TABLE orders SET (
    -- Vacuum when 5% of rows are dead (default: 20%)
    autovacuum_vacuum_scale_factor = 0.05,
    -- Analyze when 2% of rows have changed (default: 10%)
    autovacuum_analyze_scale_factor = 0.02,
    -- Less throttling for high-churn tables
    autovacuum_vacuum_cost_delay = 5
);

-- Force an immediate vacuum (use during maintenance window)
VACUUM ANALYZE orders;

-- Check bloat after vacuum
SELECT
    relname,
    pg_size_pretty(pg_total_relation_size(relname::regclass)) AS total_size,
    pg_size_pretty(pg_relation_size(relname::regclass))       AS table_size
FROM pg_stat_user_tables
WHERE relname = 'orders';
\`\`\`

A dead tuple ratio above 10-20% on a busy table is a sign that autovacuum needs to run more aggressively. High dead tuple counts slow down queries (more pages to scan) and waste disk space.

</details>

**4. PgBouncer in transaction mode**

Set up PgBouncer in transaction mode and measure the difference in maximum concurrency.

<details>
<summary>Hint</summary>

PgBouncer in transaction mode returns the server connection to the pool after each transaction completes. This means 1,000 application connections can share 20 server connections.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- pgbouncer.ini configuration for transaction mode:
-- [databases]
-- myapp = host=127.0.0.1 port=5432 dbname=myapp
--
-- [pgbouncer]
-- listen_port = 6432
-- listen_addr = 127.0.0.1
-- auth_type = md5
-- auth_file = /etc/pgbouncer/userlist.txt
-- pool_mode = transaction          <- key setting
-- max_client_conn = 1000           <- accept up to 1000 app connections
-- default_pool_size = 20           <- but only 20 real DB connections
-- server_idle_timeout = 600

-- Check active connections through PgBouncer (run against the pgbouncer admin):
-- SHOW POOLS;
-- SHOW STATS;

-- Verify from PostgreSQL side:
SELECT COUNT(*), state
FROM pg_stat_activity
WHERE backend_type = 'client backend'
GROUP BY state;
-- Should show only ~20 connections from PgBouncer, even with 1000 app clients
\`\`\`

Without PgBouncer, 1,000 concurrent app connections = 1,000 PostgreSQL processes consuming ~5 GB RAM and competing for CPU. With PgBouncer in transaction mode, the same 1,000 app connections share 20 server connections — 50x reduction in database-side resource usage.

</details>

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

### Exercises

**1. Zero-downtime column split**

Design a zero-downtime migration to split a \`name\` column into \`first_name\` and \`last_name\` columns.

<details>
<summary>Hint</summary>

Use the expand-and-contract pattern: add new columns → backfill → deploy code to write both → drop old column. Never rename in one step.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Step 1 (Migration): Add new nullable columns
ALTER TABLE users ADD COLUMN first_name VARCHAR(100);
ALTER TABLE users ADD COLUMN last_name  VARCHAR(100);

-- Step 2 (Migration): Backfill from existing name column
-- Simple split on first space (adjust for your data):
UPDATE users
SET
    first_name = SPLIT_PART(name, ' ', 1),
    last_name  = NULLIF(SUBSTRING(name FROM POSITION(' ' IN name) + 1), '');

-- Step 3 (Code deploy): Application writes to name, first_name, AND last_name
-- Application reads from first_name/last_name (falling back to name if NULL)

-- Step 4 (Migration): Add NOT NULL constraints after all data is backfilled
ALTER TABLE users ALTER COLUMN first_name SET NOT NULL;
ALTER TABLE users ALTER COLUMN last_name  SET NOT NOT NULL;

-- Step 5 (Code deploy): Application uses only first_name and last_name

-- Step 6 (Migration): Drop old column
ALTER TABLE users DROP COLUMN name;
\`\`\`

Each step is backward-compatible with the currently deployed code. If any step fails, the application continues working with the previous data model.

</details>

**2. Batched backfill with progress tracking**

Write a batched backfill script with progress tracking.

<details>
<summary>Hint</summary>

Process in batches using \`WHERE id > last_id LIMIT batch_size\`. Store progress in a tracking table or use \`RAISE NOTICE\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Progress tracking table
CREATE TABLE IF NOT EXISTS migration_progress (
    migration_name    VARCHAR(100) PRIMARY KEY,
    last_processed_id BIGINT      DEFAULT 0,
    total_processed   BIGINT      DEFAULT 0,
    started_at        TIMESTAMP   DEFAULT NOW(),
    updated_at        TIMESTAMP   DEFAULT NOW()
);

INSERT INTO migration_progress (migration_name)
VALUES ('backfill_first_last_name')
ON CONFLICT (migration_name) DO NOTHING;

-- Batched backfill procedure
DO $$
DECLARE
    batch_size   INTEGER := 10000;
    last_id      BIGINT;
    affected     INTEGER;
    total        BIGINT := 0;
BEGIN
    SELECT last_processed_id INTO last_id
    FROM migration_progress
    WHERE migration_name = 'backfill_first_last_name';

    LOOP
        UPDATE users
        SET
            first_name = SPLIT_PART(name, ' ', 1),
            last_name  = NULLIF(SUBSTRING(name FROM POSITION(' ' IN name) + 1), '')
        WHERE user_id > last_id
          AND user_id <= last_id + batch_size
          AND first_name IS NULL;

        GET DIAGNOSTICS affected = ROW_COUNT;
        total := total + affected;
        last_id := last_id + batch_size;

        UPDATE migration_progress
        SET last_processed_id = last_id,
            total_processed   = total_processed + affected,
            updated_at        = NOW()
        WHERE migration_name = 'backfill_first_last_name';

        RAISE NOTICE 'Processed up to id %, batch affected %, total %',
            last_id, affected, total;

        PERFORM pg_sleep(0.1);  -- Brief pause to allow autovacuum to run
        EXIT WHEN affected = 0 AND last_id > (SELECT MAX(user_id) FROM users);
    END LOOP;

    RAISE NOTICE 'Backfill complete. Total rows updated: %', total;
END $$;
\`\`\`

Storing progress in a table means the backfill is resumable — if it is interrupted, restart from \`last_processed_id\` rather than the beginning.

</details>

**3. Concurrent index creation with failure handling**

Create an index concurrently on a large table and handle the scenario where it fails partway through.

<details>
<summary>Hint</summary>

\`CREATE INDEX CONCURRENTLY\` can leave an \`INVALID\` index if it fails. Check \`pg_index.indisvalid\` and drop + recreate if needed.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Create the index without blocking writes
CREATE INDEX CONCURRENTLY idx_orders_customer_date
ON orders (customer_id, order_date DESC);

-- Check if the index was created successfully
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'orders' AND indexname = 'idx_orders_customer_date';

-- Check for INVALID indexes (left over from a failed CONCURRENTLY build)
SELECT indexrelid::regclass::text AS index_name, indisvalid
FROM pg_index
WHERE indrelid = 'orders'::regclass
  AND NOT indisvalid;

-- If the index is INVALID, drop it and retry:
DROP INDEX CONCURRENTLY IF EXISTS idx_orders_customer_date;
-- Wait for other long-running transactions to finish, then retry:
CREATE INDEX CONCURRENTLY idx_orders_customer_date
ON orders (customer_id, order_date DESC);
\`\`\`

An \`INVALID\` index is not used by the planner and wastes space. Always check \`indisvalid\` after a \`CONCURRENTLY\` build, especially in busy production systems.

</details>

**4. Add a foreign key without blocking writes**

Add a foreign key constraint to an existing table with millions of rows without blocking writes.

<details>
<summary>Hint</summary>

Use \`NOT VALID\` to add the constraint instantly (skipping existing row validation), then \`VALIDATE CONSTRAINT\` to check existing rows with a weaker lock.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Step 1: Add the constraint as NOT VALID
-- This is instant — it applies only to future inserts/updates, not existing rows
ALTER TABLE orders ADD CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    NOT VALID;

-- Step 2: Validate existing rows (takes ShareUpdateExclusiveLock — does not block reads or writes)
-- This can run during business hours on a live system
ALTER TABLE orders VALIDATE CONSTRAINT fk_orders_customer;

-- Check the constraint is now valid:
SELECT conname, convalidated
FROM pg_constraint
WHERE conrelid = 'orders'::regclass AND conname = 'fk_orders_customer';
-- convalidated should be true
\`\`\`

\`NOT VALID\` acquires only a brief \`AccessExclusiveLock\` to add the constraint metadata, then immediately releases it. \`VALIDATE CONSTRAINT\` uses a weaker lock that allows concurrent reads and writes while scanning the existing rows — safe on a live production table.

</details>

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
FROM articles
CROSS JOIN to_tsquery('english', 'postgresql & performance & tuning') AS query
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

### Exercises

**1. Temporal table with time-travel queries**

Implement a temporal table for products with time-travel query support.

<details>
<summary>Hint</summary>

Add \`valid_from\` and \`valid_to\` columns. An \`INSTEAD OF UPDATE\` trigger on a view closes the old version and inserts a new one. Query with \`WHERE valid_from <= :date AND valid_to > :date\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Temporal products table
CREATE TABLE products_history (
    product_id   INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price        DECIMAL(10, 2) NOT NULL,
    valid_from   TIMESTAMP NOT NULL DEFAULT NOW(),
    valid_to     TIMESTAMP NOT NULL DEFAULT 'infinity'
);

CREATE INDEX idx_ph_product_valid ON products_history (product_id, valid_from, valid_to);

-- View showing current state
CREATE VIEW products_current AS
SELECT * FROM products_history WHERE valid_to = 'infinity';

-- Trigger to handle updates as temporal inserts
CREATE OR REPLACE FUNCTION products_temporal_update()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products_history
    SET valid_to = NOW()
    WHERE product_id = OLD.product_id AND valid_to = 'infinity';

    INSERT INTO products_history (product_id, product_name, price)
    VALUES (OLD.product_id, NEW.product_name, NEW.price);

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_temporal
INSTEAD OF UPDATE ON products_current
FOR EACH ROW EXECUTE FUNCTION products_temporal_update();

-- Time-travel: what was the price on 2025-03-01?
SELECT product_id, product_name, price
FROM products_history
WHERE product_id = 42
  AND valid_from <= '2025-03-01'::timestamp
  AND valid_to   > '2025-03-01'::timestamp;

-- Full history of a product
SELECT product_name, price, valid_from, valid_to
FROM products_history
WHERE product_id = 42
ORDER BY valid_from;
\`\`\`

Each \`UPDATE\` through the view appends a new version row rather than overwriting the old one, preserving the complete price history.

</details>

**2. Audit logging query**

Attach audit logging to the \`orders\` table, then query "who changed order #12345 in the last 7 days?"

<details>
<summary>Hint</summary>

Use the generic \`audit_trigger_function\` from the section content — attach it to \`orders\`, then \`SELECT\` from \`audit_log\` filtered by \`table_name\`, \`record_id\`, and \`changed_at\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Attach the audit trigger (audit_trigger_function already defined in section content)
CREATE TRIGGER trg_orders_audit
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Query: who changed order #12345 in the last 7 days?
SELECT
    audit_id,
    action,
    changed_by,
    changed_at,
    old_data,
    new_data
FROM audit_log
WHERE table_name = 'orders'
  AND record_id  = '12345'
  AND changed_at >= NOW() - INTERVAL '7 days'
ORDER BY changed_at DESC;

-- What specifically changed? (Compare old vs new JSONB)
SELECT
    changed_at,
    changed_by,
    action,
    old_data - new_data AS removed_fields,
    new_data - old_data AS added_fields
FROM audit_log
WHERE table_name = 'orders' AND record_id = '12345'
ORDER BY changed_at DESC;
\`\`\`

The JSONB \`old_data\` and \`new_data\` columns capture the full row before and after each change, enabling "what exactly was different?" queries.

</details>

**3. JSONB user preferences**

Store user preferences as JSONB and write queries to find users with a specific preference, update a nested value, and aggregate preferences across all users.

<details>
<summary>Hint</summary>

Use \`@>\` for containment searches, \`jsonb_set\` for nested updates, and \`jsonb_each\` or \`jsonb_object_agg\` for aggregation.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Schema
ALTER TABLE users ADD COLUMN preferences JSONB NOT NULL DEFAULT '{}';
CREATE INDEX idx_users_prefs ON users USING gin (preferences);

-- a. Find users with a specific preference set
-- Users who have dark mode enabled
SELECT user_id, username
FROM users
WHERE preferences @> '{"theme": "dark"}';

-- Users who have email notifications on and language set to English
SELECT user_id, username
FROM users
WHERE preferences @> '{"notifications": {"email": true}, "language": "en"}';

-- b. Update a nested preference value
-- Set a user's timezone preference
UPDATE users
SET preferences = jsonb_set(
    preferences,
    '{timezone}',
    '"America/New_York"'
)
WHERE user_id = 42;

-- Toggle a nested notification setting
UPDATE users
SET preferences = jsonb_set(
    preferences,
    '{notifications, email}',
    'false'
)
WHERE user_id = 42;

-- c. Aggregate preferences across all users
-- Count how many users have each theme
SELECT
    preferences->>'theme' AS theme,
    COUNT(*) AS user_count
FROM users
WHERE preferences ? 'theme'
GROUP BY preferences->>'theme'
ORDER BY user_count DESC;

-- Distribution of language preferences
SELECT
    preferences->>'language' AS language,
    COUNT(*) AS user_count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS pct
FROM users
WHERE preferences ? 'language'
GROUP BY preferences->>'language'
ORDER BY user_count DESC;
\`\`\`

The GIN index on \`preferences\` makes the containment queries (\`@>\`) fast, even across millions of users.

</details>

**4. Full-text search with weighted ranking**

Implement full-text search for a blog with weighted ranking: title 3×, tags 2×, body 1×.

<details>
<summary>Hint</summary>

Use \`setweight(..., 'A')\` for title (highest), \`setweight(..., 'B')\` for tags, \`setweight(..., 'C')\` for body. \`ts_rank\` uses these weights automatically.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Add weighted search vector column
ALTER TABLE posts ADD COLUMN search_vector tsvector;

-- Backfill weighted vector (title=A, tags=B, body=C)
UPDATE posts
SET search_vector =
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(
        array_to_string(tags, ' '), ''
    )), 'B') ||
    setweight(to_tsvector('english', COALESCE(body, '')), 'C');

CREATE INDEX idx_posts_search ON posts USING gin (search_vector);

-- Keep vector updated on insert/update
CREATE OR REPLACE FUNCTION posts_search_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(
            array_to_string(NEW.tags, ' '), ''
        )), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.body, '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_posts_search
BEFORE INSERT OR UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION posts_search_update();

-- Search with ranking (weights: {D, C, B, A} = {0.1, 0.2, 0.4, 1.0})
SELECT
    post_id,
    title,
    ts_rank(search_vector, query, 1) AS rank,
    ts_headline('english', body, query,
        'StartSel=<mark>, StopSel=</mark>, MaxFragments=2'
    ) AS snippet
FROM posts
CROSS JOIN to_tsquery('english', 'postgresql & performance') AS query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 20;
\`\`\`

The \`setweight\` labels (A, B, C, D) map to multipliers (1.0, 0.4, 0.2, 0.1) used by \`ts_rank\`. A match in the title scores 10× more than a match in the body.

</details>

**5. Soft-delete with Row-Level Security**

Design a soft-delete system with Row-Level Security that automatically hides deleted records from all queries.

<details>
<summary>Hint</summary>

\`ALTER TABLE ... ENABLE ROW LEVEL SECURITY\` and \`CREATE POLICY ... USING (deleted_at IS NULL)\`. Roles with \`BYPASSRLS\` (like superusers) can still see deleted rows.

</details>

<details>
<summary>Answer</summary>

\`\`\`sql
-- Add soft-delete columns
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP;
ALTER TABLE users ADD COLUMN deleted_by INTEGER;

-- Partial index: fast lookups on active users
CREATE INDEX idx_users_active ON users (email) WHERE deleted_at IS NULL;

-- Partial unique constraint: unique email only among active users
CREATE UNIQUE INDEX idx_users_active_email ON users (email)
WHERE deleted_at IS NULL;

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;  -- applies to table owner too

-- Policy: SELECT only returns active (non-deleted) users
CREATE POLICY users_hide_deleted ON users
    FOR ALL
    USING (deleted_at IS NULL);

-- Admin role that can see deleted users:
CREATE ROLE admin_role;
ALTER ROLE admin_role BYPASSRLS;
-- When connected as admin_role, all rows are visible

-- Soft-delete operation
UPDATE users
SET deleted_at = NOW(), deleted_by = 1  -- 1 = acting admin user_id
WHERE user_id = 42;

-- From a normal user session: deleted user is invisible
SELECT * FROM users WHERE user_id = 42;  -- Returns 0 rows

-- From admin session: deleted user is visible
SET ROLE admin_role;
SELECT * FROM users WHERE user_id = 42;  -- Returns the row
RESET ROLE;

-- Restore a soft-deleted user
UPDATE users
SET deleted_at = NULL, deleted_by = NULL
WHERE user_id = 42;
\`\`\`

RLS policies apply to every query on the table from every role (unless \`BYPASSRLS\`), so application code never accidentally exposes deleted users — even if a developer forgets to add \`AND deleted_at IS NULL\` to a query.

</details>

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
