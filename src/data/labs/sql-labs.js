export const labs = [
  // ============================================================
  // SQL LAB 1 — Query Challenge Gauntlet (from interactiveLabs.js)
  // ============================================================
  {
    id: 'sql-lab-1',
    languageId: 'sql',
    level: 'beginner',
    title: 'Query Challenge Gauntlet',
    description: 'Master SQL fundamentals through progressive query challenges: SELECT, filtering, JOINs, and aggregation.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your SQL Environment',
        setupReference: true,
        instruction: 'Before writing SQL queries, ensure your database environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: PostgreSQL 16+ (or SQLite via sqliteonline.com for zero install), a database client (DBeaver, pgAdmin, or psql CLI), and a sample database to practice with. Complete all setup steps and verify your database connection before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Beginners: visit https://sqliteonline.com/ — no install required',
          'Advanced: run `psql -U postgres -c "SELECT version();"` to test your PostgreSQL connection'
        ],
        expectedOutput: 'PostgreSQL 16.x installed (or SQLite Online open in browser)\nConnection test successful\nReady to write SQL queries',
        solution: null
      },
      {
        title: 'Step 2: SELECT and Filtering',
        instruction: 'Write queries to select, filter, and sort data from an employees table. The SELECT statement is the foundation of SQL — it retrieves rows from one or more tables. Filtering with WHERE and sorting with ORDER BY let you find exactly the rows you need without pulling everything into application memory.',
        starterCode: `-- Given table: employees
-- Columns: id, name, department, salary, hire_date, is_active

-- TODO: Query 1: Select all active employees, ordered by salary descending

-- TODO: Query 2: Find employees hired after 2023-01-01 with salary > 70000

-- TODO: Query 3: Find employees whose name starts with 'A' or 'M'

-- TODO: Query 4: Select name and salary, renaming salary as "annual_pay"`,
        hints: [
          'WHERE is_active = true for active employees',
          'Use AND to combine conditions: hire_date > \'2023-01-01\' AND salary > 70000',
          'LIKE \'A%\' matches names starting with A; combine with OR'
        ],
        expectedOutput: `Query 1: All active employees sorted by salary (highest first)
Query 2: Recent high-earners
Query 3: Names starting with A or M
Query 4: Name and annual_pay columns`,
        solution: `-- Query 1
SELECT * FROM employees
WHERE is_active = true
ORDER BY salary DESC;

-- Query 2
SELECT * FROM employees
WHERE hire_date > '2023-01-01'
  AND salary > 70000;

-- Query 3
SELECT * FROM employees
WHERE name LIKE 'A%' OR name LIKE 'M%';

-- Query 4
SELECT name, salary AS annual_pay
FROM employees;`
      },
      {
        title: 'Step 3: JOINs',
        instruction: 'Write queries that combine data from multiple tables using different JOIN types. JOINs are how relational databases connect normalised data — instead of duplicating department names in every employee row, you store them once and link them with foreign keys. Understanding which JOIN type to use prevents silent data loss or inflation.',
        starterCode: `-- Tables:
-- employees (id, name, department_id, salary)
-- departments (id, name, budget)
-- projects (id, name, lead_id)

-- TODO: Query 1: List all employees with their department name
-- (Use INNER JOIN)

-- TODO: Query 2: List ALL departments, even those with no employees
-- (Use LEFT JOIN from departments)

-- TODO: Query 3: Find employees who are project leads
-- Show: employee name, project name

-- TODO: Query 4: Find departments where the total salary exceeds the budget`,
        hints: [
          'INNER JOIN departments d ON e.department_id = d.id',
          'LEFT JOIN keeps all rows from the left table even with no match',
          'JOIN projects p ON e.id = p.lead_id links employees to projects'
        ],
        expectedOutput: `Query 1: Employee names with department names
Query 2: All departments including those with 0 employees
Query 3: Project leads with their project names
Query 4: Over-budget departments`,
        solution: `-- Query 1: Employees with department names
SELECT e.name AS employee, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- Query 2: All departments (including empty ones)
SELECT d.name AS department, COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name;

-- Query 3: Project leads
SELECT e.name AS lead_name, p.name AS project_name
FROM employees e
INNER JOIN projects p ON e.id = p.lead_id;

-- Query 4: Over-budget departments
SELECT d.name, d.budget, SUM(e.salary) AS total_salary
FROM departments d
INNER JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name, d.budget
HAVING SUM(e.salary) > d.budget;`
      },
      {
        title: 'Step 4: GROUP BY and Aggregation',
        instruction: 'Use aggregate functions and GROUP BY to analyze data patterns. Aggregation collapses many rows into summary statistics — essential for dashboards, reports, and analytics. HAVING filters on aggregated values (like COUNT or SUM) after grouping, while WHERE filters individual rows before grouping.',
        starterCode: `-- TODO: Query 1: Count employees per department, sorted by count descending

-- TODO: Query 2: Find the min, max, and average salary per department

-- TODO: Query 3: Find departments with more than 5 employees

-- TODO: Query 4: For each department, find the highest-paid employee
-- (Use a subquery or window function)`,
        hints: [
          'GROUP BY department_id with COUNT(*) for employee counts',
          'Use MIN(salary), MAX(salary), AVG(salary) in SELECT',
          'HAVING COUNT(*) > 5 filters groups (WHERE filters rows)'
        ],
        expectedOutput: `Query 1: Department employee counts
Query 2: Salary ranges per department
Query 3: Large departments only
Query 4: Top earner per department`,
        solution: `-- Query 1: Employee count per department
SELECT d.name, COUNT(*) AS employee_count
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.id, d.name
ORDER BY employee_count DESC;

-- Query 2: Salary stats per department
SELECT d.name,
  MIN(e.salary) AS min_salary,
  MAX(e.salary) AS max_salary,
  ROUND(AVG(e.salary), 2) AS avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.id, d.name;

-- Query 3: Departments with 5+ employees
SELECT d.name, COUNT(*) AS headcount
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.id, d.name
HAVING COUNT(*) > 5;

-- Query 4: Highest-paid per department (window function)
SELECT name, department_id, salary
FROM (
  SELECT e.name, e.department_id, e.salary,
    RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS rk
  FROM employees e
) ranked
WHERE rk = 1;`
      }
    ]
  },

  // ============================================================
  // SQL LAB 2 — Basic CRUD Operations (from sq-1)
  // ============================================================
  {
    id: 'sql-lab-2',
    languageId: 'sql',
    level: 'beginner',
    title: 'Basic CRUD Operations',
    description: 'Build a solid foundation in SQL by creating tables with constraints, inserting records, querying and filtering data, updating rows safely, and aggregating results.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your SQL Environment',
        setupReference: true,
        instruction: 'Before writing SQL queries, ensure your PostgreSQL environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: PostgreSQL 16+ and a database client (DBeaver, pgAdmin, or psql CLI). This lab uses PostgreSQL-specific syntax (SERIAL PRIMARY KEY) — SQLite is not compatible.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `psql -U postgres -c "SELECT version();"` to verify PostgreSQL 16+',
          'Create a practice database: `psql -U postgres -c "CREATE DATABASE practice;"`'
        ],
        expectedOutput: 'PostgreSQL 16.x\nDatabase connection verified\nReady to write SQL queries',
        solution: null
      },
      {
        title: 'Step 2: Create a Table with Constraints',
        instruction: 'Define an employees table with appropriate data types and constraints. Constraints enforce data integrity at the database level — a CHECK constraint prevents negative salaries even if application code has a bug. SERIAL generates auto-incrementing primary keys, UNIQUE prevents duplicate emails, and DEFAULT sets a fallback value when none is provided.',
        starterCode: `-- TODO: Create an employees table with:
-- id: auto-incrementing primary key
-- name: up to 100 chars, required
-- email: up to 150 chars, unique, required
-- department: up to 50 chars, defaults to 'General'
-- salary: decimal(10,2), must be positive
-- hire_date: date, defaults to today
-- is_active: boolean, defaults to true`,
        hints: [
          'Use SERIAL PRIMARY KEY for auto-incrementing id',
          'VARCHAR(n) NOT NULL for required text fields',
          'CHECK (salary > 0) enforces the positive salary constraint'
        ],
        expectedOutput: `Table "employees" created successfully
Columns: id, name, email, department, salary, hire_date, is_active
Constraints: PRIMARY KEY, UNIQUE (email), CHECK (salary > 0)`,
        solution: `CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    department VARCHAR(50) DEFAULT 'General',
    salary NUMERIC(10,2) CHECK (salary > 0),
    hire_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE
);`
      },
      {
        title: 'Step 3: INSERT, SELECT, and Filter',
        instruction: 'Insert sample employee records and write SELECT queries to filter and sort the data. Providing explicit column lists in INSERT is a best practice — it insulates your queries from future schema changes and makes the code self-documenting. Always qualify your WHERE conditions to avoid full table scans on large datasets.',
        starterCode: `-- TODO: Insert 5 employees across Engineering, Design, and Marketing
-- departments with realistic salaries

-- TODO: Query 1: Select Engineering employees earning over 90,000,
-- ordered by salary descending

-- TODO: Query 2: Select name and department for all active employees`,
        hints: [
          'INSERT INTO employees (name, email, department, salary) VALUES (...)',
          'WHERE department = \'Engineering\' AND salary > 90000',
          'SELECT name, department FROM employees WHERE is_active = TRUE'
        ],
        expectedOutput: `INSERT 0 5
Query 1: Engineering employees earning > 90,000 sorted by salary DESC
Query 2: Names and departments of all active employees`,
        solution: `INSERT INTO employees (name, email, department, salary)
VALUES
    ('Alice Smith', 'alice@company.com', 'Engineering', 95000),
    ('Bob Jones', 'bob@company.com', 'Design', 82000),
    ('Charlie Brown', 'charlie@company.com', 'Engineering', 88000),
    ('Diana Ross', 'diana@company.com', 'Marketing', 78000),
    ('Eve Wilson', 'eve@company.com', 'Engineering', 105000);

-- Query 1
SELECT name, department, salary
FROM employees
WHERE department = 'Engineering'
  AND salary > 90000
ORDER BY salary DESC;

-- Query 2
SELECT name, department
FROM employees
WHERE is_active = TRUE;`
      },
      {
        title: 'Step 4: UPDATE and DELETE Safely',
        instruction: 'Modify and remove rows using UPDATE and DELETE with precise WHERE conditions. Always wrap destructive operations in a transaction and verify the affected row count before committing. A missing WHERE clause in DELETE removes every row — always test with a SELECT first using the same WHERE condition.',
        starterCode: `-- TODO: Give a 10% raise to Engineering employees earning over 100,000
-- and move them to 'Senior Engineering'

-- TODO: Delete employees who are inactive AND were hired more than 2 years ago
-- (Use CURRENT_DATE - INTERVAL '2 years')

-- TODO: Verify the changes with a SELECT`,
        hints: [
          'UPDATE employees SET salary = salary * 1.10, department = \'Senior Engineering\' WHERE ...',
          'DELETE FROM employees WHERE is_active = FALSE AND hire_date < CURRENT_DATE - INTERVAL \'2 years\'',
          'Run a SELECT with the same WHERE clause first to preview affected rows'
        ],
        expectedOutput: `UPDATE 1
DELETE 0
Verification SELECT: Eve Wilson now in Senior Engineering with updated salary`,
        solution: `-- Update high earners in Engineering
UPDATE employees
SET salary = salary * 1.10,
    department = 'Senior Engineering'
WHERE department = 'Engineering'
  AND salary > 100000;

-- Delete stale inactive employees
DELETE FROM employees
WHERE is_active = FALSE
  AND hire_date < CURRENT_DATE - INTERVAL '2 years';

-- Verify
SELECT name, department, salary
FROM employees
ORDER BY department, salary DESC;`
      },
      {
        title: 'Step 5: Aggregate Queries',
        instruction: 'Use GROUP BY with aggregate functions to summarise department statistics. Aggregation is how databases replace code that loops through rows — pushing computation into the database is far faster than fetching all rows and summing in application memory. HAVING filters on group-level expressions after aggregation, unlike WHERE which filters individual rows before grouping.',
        starterCode: `-- TODO: For each department, calculate:
-- - Number of active employees (headcount)
-- - Average salary (rounded to 2 decimal places)
-- - Maximum salary

-- Only include departments with more than 1 active employee
-- Order by average salary descending`,
        hints: [
          'GROUP BY department after filtering WHERE is_active = TRUE',
          'ROUND(AVG(salary), 2) for the average',
          'HAVING COUNT(*) > 1 filters after aggregation'
        ],
        expectedOutput: `department       | headcount | avg_salary | max_salary
Engineering      |     2     |  91500.00  |   95000.00
(only departments with >1 active employee shown)`,
        solution: `SELECT
    department,
    COUNT(*) AS headcount,
    ROUND(AVG(salary), 2) AS avg_salary,
    MAX(salary) AS max_salary
FROM employees
WHERE is_active = TRUE
GROUP BY department
HAVING COUNT(*) > 1
ORDER BY avg_salary DESC;`
      }
    ]
  },

  // ============================================================
  // SQL LAB 3 — JOIN Types Explained (from sq-2)
  // ============================================================
  {
    id: 'sql-lab-3',
    languageId: 'sql',
    level: 'beginner',
    title: 'JOIN Types Explained',
    description: 'Master all SQL JOIN types with practical examples — INNER, LEFT, RIGHT, FULL OUTER, self-joins, and multi-table joins — understanding exactly which rows each type returns.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your SQL Environment',
        setupReference: true,
        instruction: 'Before writing SQL queries, ensure your PostgreSQL environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: PostgreSQL 16+ and a database client (DBeaver, pgAdmin, or psql CLI). This lab uses PostgreSQL-specific syntax (SERIAL PRIMARY KEY) — SQLite is not compatible.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `psql -U postgres -c "SELECT version();"` to verify PostgreSQL 16+',
          'Create a practice database: `psql -U postgres -c "CREATE DATABASE practice;"`'
        ],
        expectedOutput: 'PostgreSQL 16.x\nDatabase connection verified\nReady to write SQL queries',
        solution: null
      },
      {
        title: 'Step 2: Create the Schema and Seed Data',
        instruction: 'Create three related tables — departments, employees, and projects — with foreign key constraints linking them. Foreign keys enforce referential integrity: you cannot insert an employee with a department_id that does not exist in departments, and you cannot delete a department that still has employees without handling the dependency first.',
        starterCode: `-- TODO: Create the departments table (id SERIAL PK, name VARCHAR(50) NOT NULL, budget NUMERIC(12,2))

-- TODO: Create the employees table
-- (id SERIAL PK, name VARCHAR(100), department_id INT → departments.id, manager_id INT → employees.id)

-- TODO: Create the projects table
-- (id SERIAL PK, name VARCHAR(100), department_id INT → departments.id)

-- TODO: Insert 3 departments (Engineering budget 500000, Design budget 200000, Marketing budget 150000)
-- Insert 4 employees (2 in Engineering, 1 in Design, 1 with no department)
-- Insert 2 projects`,
        hints: [
          'REFERENCES departments(id) adds a foreign key constraint',
          'manager_id REFERENCES employees(id) is a self-referencing foreign key',
          'One employee should have department_id = NULL to demonstrate LEFT JOIN behaviour'
        ],
        expectedOutput: `Tables created: departments, employees, projects
3 departments inserted
4 employees inserted (1 with no department)
2 projects inserted`,
        solution: `CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    budget NUMERIC(12,2)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department_id INT REFERENCES departments(id),
    manager_id INT REFERENCES employees(id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department_id INT REFERENCES departments(id)
);

INSERT INTO departments (name, budget) VALUES
    ('Engineering', 500000),
    ('Design', 200000),
    ('Marketing', 150000);

INSERT INTO employees (name, department_id, manager_id) VALUES
    ('Alice', 1, NULL),
    ('Bob', 1, 1),
    ('Carol', 2, NULL),
    ('Dave', NULL, NULL);  -- no department assigned

INSERT INTO projects (name, department_id) VALUES
    ('Platform Rewrite', 1),
    ('Brand Refresh', 2);`
      },
      {
        title: 'Step 3: INNER, LEFT, and RIGHT JOINs',
        instruction: 'Write queries using INNER JOIN, LEFT JOIN, and RIGHT JOIN to understand the difference in which rows each type includes. INNER JOIN returns only matching rows from both sides — use it when you only care about employees that have a department. LEFT JOIN returns all rows from the left table (employees) plus any matching rows from the right — Dave with no department will appear with NULL in the department column.',
        starterCode: `-- TODO: Query 1 (INNER JOIN): List employees WITH their department name
-- Dave (no department) should NOT appear

-- TODO: Query 2 (LEFT JOIN): List ALL employees, including Dave (no department)
-- Show department as NULL where unassigned

-- TODO: Query 3 (RIGHT JOIN → or LEFT JOIN reversed): List ALL departments,
-- even those with no employees. Show employee count per department.`,
        hints: [
          'INNER JOIN departments d ON e.department_id = d.id',
          'LEFT JOIN keeps all employees — rows with no match get NULL for department columns',
          'For RIGHT JOIN: swap table order or use LEFT JOIN with departments on the left'
        ],
        expectedOutput: `Query 1 (INNER JOIN): 3 rows — Alice, Bob, Carol with department names
Query 2 (LEFT JOIN): 4 rows — Dave appears with NULL department
Query 3: All 3 departments with employee counts (Marketing shows 0)`,
        solution: `-- Query 1: INNER JOIN — only employees with a department
SELECT e.name AS employee, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- Query 2: LEFT JOIN — all employees including unassigned
SELECT e.name AS employee, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;

-- Query 3: All departments with employee count
SELECT d.name AS department, COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name
ORDER BY employee_count DESC;`
      },
      {
        title: 'Step 4: FULL OUTER JOIN and Self-Join',
        instruction: 'Use FULL OUTER JOIN to include unmatched rows from both sides simultaneously, and self-join to traverse hierarchical relationships within a single table. A self-join treats the same table as two separate logical tables using aliases — this is the standard pattern for employee-manager relationships, bill-of-materials trees, and any parent-child structure stored in one table.',
        starterCode: `-- TODO: Query 1 (FULL OUTER JOIN): Show all employees AND all departments,
-- using COALESCE to replace NULL with descriptive text:
-- employees with no dept → '(unassigned)', dept with no employees → '(vacant)'

-- TODO: Query 2 (Self-join): List each employee alongside their manager's name
-- Employees with no manager should still appear (use LEFT JOIN)`,
        hints: [
          'FULL OUTER JOIN employees e ON e.department_id = d.id',
          'COALESCE(e.name, \'(vacant)\') returns the first non-NULL value',
          'Self-join: FROM employees e LEFT JOIN employees m ON e.manager_id = m.id'
        ],
        expectedOutput: `Query 1 (FULL OUTER JOIN): All employees and departments, NULLs replaced
Query 2 (Self-join): Employee names paired with their manager names
  Alice → (no manager)
  Bob → Alice`,
        solution: `-- Query 1: FULL OUTER JOIN
SELECT
    COALESCE(e.name, '(vacant)') AS employee,
    COALESCE(d.name, '(unassigned)') AS department
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

-- Query 2: Self-join for org hierarchy
SELECT
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
ORDER BY manager NULLS LAST, employee;`
      },
      {
        title: 'Step 5: Multi-Table Join',
        instruction: 'Chain multiple JOINs to produce a report that spans all three tables. Multi-table joins are evaluated left to right — each JOIN adds another table to the running result set. Keep the JOIN chain readable by using consistent table aliases and aligning ON conditions under the JOIN keyword. Only project departments with assigned employees will appear in an INNER JOIN chain.',
        starterCode: `-- TODO: Write a single query that joins employees, departments, and projects
-- Show: employee name, department name, project name
-- Only include rows where all three are linked
-- Order by department name, then employee name`,
        hints: [
          'Start with employees e, JOIN departments d ON e.department_id = d.id',
          'Then JOIN projects p ON p.department_id = d.id',
          'ORDER BY d.name, e.name'
        ],
        expectedOutput: `employee | department  | project
Alice    | Engineering | Platform Rewrite
Bob      | Engineering | Platform Rewrite
Carol    | Design      | Brand Refresh`,
        solution: `SELECT
    e.name AS employee,
    d.name AS department,
    p.name AS project
FROM employees e
JOIN departments d ON e.department_id = d.id
JOIN projects p ON p.department_id = d.id
ORDER BY d.name, e.name;`
      }
    ]
  },

  // ============================================================
  // SQL LAB 4 — Window Functions for Analytics (from sq-3)
  // ============================================================
  {
    id: 'sql-lab-4',
    languageId: 'sql',
    level: 'mid',
    title: 'Window Functions for Analytics',
    description: 'Use window functions to rank results, compare adjacent rows with LAG and LEAD, compute running totals, and calculate moving averages — without collapsing rows like GROUP BY does.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your SQL Environment',
        setupReference: true,
        instruction: 'Before writing SQL queries, ensure your PostgreSQL environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: PostgreSQL 16+ and a database client (DBeaver, pgAdmin, or psql CLI). This lab uses PostgreSQL-specific syntax (SERIAL PRIMARY KEY) — SQLite is not compatible.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `psql -U postgres -c "SELECT version();"` to verify PostgreSQL 16+',
          'Create a practice database: `psql -U postgres -c "CREATE DATABASE practice;"`'
        ],
        expectedOutput: 'PostgreSQL 16.x\nDatabase connection verified\nReady to write SQL queries',
        solution: null
      },
      {
        title: 'Step 2: Create the Sales Table and Seed Data',
        instruction: 'Create a sales table and insert realistic data across multiple salespeople, regions, and dates. Window functions operate over the full result set (or a partition of it) while keeping individual rows intact — unlike GROUP BY which reduces many rows to one. This means you can show per-row detail alongside aggregate statistics in the same query.',
        starterCode: `-- TODO: Create a sales table with columns:
-- id SERIAL PK, salesperson VARCHAR(50), region VARCHAR(20),
-- amount NUMERIC(10,2), sale_date DATE

-- TODO: Insert at least 10 rows across 2 salespeople (Alice, Bob),
-- 2 regions (North, South), with amounts between 500 and 5000,
-- and dates ranging over the last 3 months`,
        hints: [
          'CREATE TABLE sales (id SERIAL PRIMARY KEY, salesperson VARCHAR(50), region VARCHAR(20), amount NUMERIC(10,2), sale_date DATE)',
          'Insert rows with explicit sale_date values like \'2025-01-15\'',
          'Vary regions and salespeople so partitioned window functions produce visible results'
        ],
        expectedOutput: `Table "sales" created
INSERT 0 10 (or more rows)
Data spread across Alice/Bob, North/South regions, multiple dates`,
        solution: `CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    salesperson VARCHAR(50),
    region VARCHAR(20),
    amount NUMERIC(10,2),
    sale_date DATE
);

INSERT INTO sales (salesperson, region, amount, sale_date) VALUES
    ('Alice', 'North', 2500.00, '2025-01-05'),
    ('Alice', 'North', 3200.00, '2025-01-20'),
    ('Alice', 'South', 1800.00, '2025-02-03'),
    ('Alice', 'South', 4100.00, '2025-02-18'),
    ('Alice', 'North', 2900.00, '2025-03-10'),
    ('Bob',   'North', 3100.00, '2025-01-08'),
    ('Bob',   'South', 2200.00, '2025-01-25'),
    ('Bob',   'North', 1500.00, '2025-02-12'),
    ('Bob',   'South', 3800.00, '2025-02-28'),
    ('Bob',   'North', 2700.00, '2025-03-15');`
      },
      {
        title: 'Step 3: Ranking Within Groups',
        instruction: 'Use ROW_NUMBER, RANK, and DENSE_RANK to rank sales within each region, then filter to get the top performer per region. Understanding the difference matters: ROW_NUMBER always assigns unique numbers (even to ties), RANK skips numbers after a tie (1,1,3), and DENSE_RANK never skips (1,1,2). Use RANK or DENSE_RANK when ties must be treated equally.',
        starterCode: `-- TODO: Query 1: For each sale, show:
-- salesperson, region, amount,
-- ROW_NUMBER within region (by amount DESC),
-- RANK within region (by amount DESC),
-- DENSE_RANK within region (by amount DESC)

-- TODO: Query 2: Find the top-selling salesperson per region
-- by total amount (use ROW_NUMBER on aggregated data)`,
        hints: [
          'PARTITION BY region ORDER BY amount DESC inside the OVER clause',
          'Wrap Query 2 in a subquery/CTE and filter WHERE rn = 1',
          'GROUP BY salesperson, region first, then apply ROW_NUMBER() OVER (PARTITION BY region ORDER BY SUM(amount) DESC)'
        ],
        expectedOutput: `Query 1: Each sale row with all three rank values
Query 2: One row per region showing the top-selling salesperson and their total`,
        solution: `-- Query 1: All three ranking functions
SELECT
    salesperson,
    region,
    amount,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY amount DESC) AS row_num,
    RANK()       OVER (PARTITION BY region ORDER BY amount DESC) AS rank,
    DENSE_RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS dense_rank
FROM sales;

-- Query 2: Top performer per region
SELECT * FROM (
    SELECT
        salesperson,
        region,
        SUM(amount) AS total_sales,
        ROW_NUMBER() OVER (PARTITION BY region ORDER BY SUM(amount) DESC) AS rn
    FROM sales
    GROUP BY salesperson, region
) ranked
WHERE rn = 1;`
      },
      {
        title: 'Step 4: LAG and LEAD for Row Comparisons',
        instruction: 'Use LAG and LEAD to compare each sale with the previous and next row — without a self-join. LAG(col, n) looks n rows back, LEAD(col, n) looks n rows forward, both within the window defined by OVER. This is the standard pattern for computing period-over-period change: daily revenue differences, month-over-month growth, or detecting anomalous spikes.',
        starterCode: `-- TODO: For Alice's sales ordered by date, show:
-- sale_date, amount,
-- the previous sale amount (prev_amount),
-- the next sale amount (next_amount),
-- the change from the previous sale (amount - prev_amount)`,
        hints: [
          'LAG(amount, 1) OVER (ORDER BY sale_date) gives the previous row\'s amount',
          'LEAD(amount, 1) OVER (ORDER BY sale_date) gives the next row\'s amount',
          'Filter WHERE salesperson = \'Alice\' to limit to one salesperson\'s data'
        ],
        expectedOutput: `sale_date   | amount  | prev_amount | next_amount | change
2025-01-05  | 2500.00 | NULL        | 3200.00     | NULL
2025-01-20  | 3200.00 | 2500.00     | 1800.00     | +700.00
2025-02-03  | 1800.00 | 3200.00     | 4100.00     | -1400.00
...`,
        solution: `SELECT
    sale_date,
    amount,
    LAG(amount, 1)  OVER (ORDER BY sale_date) AS prev_amount,
    LEAD(amount, 1) OVER (ORDER BY sale_date) AS next_amount,
    amount - LAG(amount, 1) OVER (ORDER BY sale_date) AS change
FROM sales
WHERE salesperson = 'Alice'
ORDER BY sale_date;`
      },
      {
        title: 'Step 5: Running Totals and Moving Averages',
        instruction: 'Compute a cumulative running total and a 7-day moving average using frame specifications. The ROWS BETWEEN clause defines the window frame relative to the current row — ROWS UNBOUNDED PRECEDING includes all rows from the start of the partition. Moving averages smooth out noise in time-series data and are far more efficient to compute in the database than in application code.',
        starterCode: `-- TODO: Query 1: Running total — for all sales ordered by date,
-- show sale_date, amount, and the cumulative SUM to date

-- TODO: Query 2: 7-day moving average — for all sales ordered by date,
-- show sale_date, amount, and a 7-row moving average (ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)
-- round to 2 decimal places`,
        hints: [
          'SUM(amount) OVER (ORDER BY sale_date ROWS UNBOUNDED PRECEDING) for running total',
          'AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) for 7-day moving average',
          'ROUND(..., 2) wraps the AVG call'
        ],
        expectedOutput: `Query 1:
sale_date   | amount  | running_total
2025-01-05  | 2500.00 | 2500.00
2025-01-08  | 3100.00 | 5600.00
...

Query 2:
sale_date   | amount  | moving_avg_7d
...`,
        solution: `-- Query 1: Running total
SELECT
    sale_date,
    amount,
    SUM(amount) OVER (ORDER BY sale_date ROWS UNBOUNDED PRECEDING) AS running_total
FROM sales
ORDER BY sale_date;

-- Query 2: 7-row moving average
SELECT
    sale_date,
    amount,
    ROUND(
        AVG(amount) OVER (
            ORDER BY sale_date
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 2
    ) AS moving_avg_7d
FROM sales
ORDER BY sale_date;`
      }
    ]
  },

  // ============================================================
  // SQL LAB 5 — Recursive CTE for Hierarchy (from sq-4)
  // ============================================================
  {
    id: 'sql-lab-5',
    languageId: 'sql',
    level: 'mid',
    title: 'Recursive CTE for Hierarchy',
    description: 'Traverse hierarchical data — org charts, category trees, and bill-of-materials — using recursive Common Table Expressions (CTEs). Learn to compute depth, build path strings, and aggregate across the full tree.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your SQL Environment',
        setupReference: true,
        instruction: 'Before writing SQL queries, ensure your PostgreSQL environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: PostgreSQL 16+ and a database client (DBeaver, pgAdmin, or psql CLI). This lab uses PostgreSQL-specific syntax (SERIAL PRIMARY KEY) — SQLite is not compatible.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `psql -U postgres -c "SELECT version();"` to verify PostgreSQL 16+',
          'Create a practice database: `psql -U postgres -c "CREATE DATABASE practice;"`'
        ],
        expectedOutput: 'PostgreSQL 16.x\nDatabase connection verified\nReady to write SQL queries',
        solution: null
      },
      {
        title: 'Step 2: Create the Org Chart Table',
        instruction: 'Create a self-referencing table where manager_id points back to the same table\'s id column. This adjacency-list pattern is the standard way to store trees in a relational database — each node stores only a reference to its direct parent, not the full path. Querying the full tree requires a recursive CTE because the depth is variable and unknown at query time.',
        starterCode: `-- TODO: Create an org_chart table:
-- id SERIAL PK, name VARCHAR(100), title VARCHAR(100),
-- manager_id INT (nullable FK to org_chart.id)

-- TODO: Insert 8 nodes forming this tree:
-- CEO Alice (no manager)
--   ├── VP Bob (Engineering)
--   │     ├── Dir Dave (Backend)
--   │     │     └── Lead Frank (Tech Lead)
--   │     │           ├── Dev Grace (Senior)
--   │     │           └── Dev Heidi (Junior)
--   │     └── Dir Eve (Frontend)
--   └── VP Carol (Marketing)`,
        hints: [
          'manager_id INT REFERENCES org_chart(id) — self-referencing FK',
          'The root node (CEO) has manager_id = NULL',
          'Use explicit id values in INSERT so manager_id references are predictable'
        ],
        expectedOutput: `Table "org_chart" created with self-referencing FK
INSERT 0 8
Tree has 3 levels below the CEO`,
        solution: `CREATE TABLE org_chart (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    title VARCHAR(100),
    manager_id INT REFERENCES org_chart(id)
);

INSERT INTO org_chart (id, name, title, manager_id) VALUES
    (1, 'CEO Alice',  'CEO',            NULL),
    (2, 'VP Bob',     'VP Engineering', 1),
    (3, 'VP Carol',   'VP Marketing',   1),
    (4, 'Dir Dave',   'Dir Backend',    2),
    (5, 'Dir Eve',    'Dir Frontend',   2),
    (6, 'Lead Frank', 'Tech Lead',      4),
    (7, 'Dev Grace',  'Senior Dev',     6),
    (8, 'Dev Heidi',  'Junior Dev',     6);`
      },
      {
        title: 'Step 3: Write the Recursive CTE',
        instruction: 'Build a recursive CTE that traverses the entire org tree, computing depth and a path string at each level. A recursive CTE has two parts separated by UNION ALL: the base case (anchor) selects the root nodes, and the recursive case joins back to the CTE itself to add the next level of children. PostgreSQL stops recursing when no new rows are added.',
        starterCode: `-- TODO: Write a recursive CTE named "org_tree" that:
-- 1. Base case: selects the CEO (manager_id IS NULL) with depth = 0 and path = name
-- 2. Recursive case: joins org_chart to org_tree on manager_id = id,
--    increments depth, and appends ' > ' || name to the path

-- Final SELECT: show name indented by depth (use REPEAT('  ', depth) || name),
-- title, depth, and path, ordered by path`,
        hints: [
          'WITH RECURSIVE org_tree AS ( SELECT ... UNION ALL SELECT ... FROM org_chart JOIN org_tree ON ... )',
          'depth + 1 in the recursive arm',
          'REPEAT(\'  \', depth) || name produces the indented display name'
        ],
        expectedOutput: `indented_name          | title          | depth | path
CEO Alice              | CEO            |   0   | CEO Alice
  VP Bob               | VP Engineering |   1   | CEO Alice > VP Bob
    Dir Dave            | Dir Backend    |   2   | CEO Alice > VP Bob > Dir Dave
      Lead Frank        | Tech Lead      |   3   | CEO Alice > VP Bob > Dir Dave > Lead Frank
        Dev Grace       | Senior Dev     |   4   | ...
        Dev Heidi       | Junior Dev     |   4   | ...`,
        solution: `WITH RECURSIVE org_tree AS (
    -- Base case: root nodes
    SELECT id, name, title, manager_id,
           0 AS depth,
           name AS path
    FROM org_chart
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: children of current level
    SELECT e.id, e.name, e.title, e.manager_id,
           t.depth + 1,
           t.path || ' > ' || e.name
    FROM org_chart e
    INNER JOIN org_tree t ON e.manager_id = t.id
)
SELECT
    REPEAT('  ', depth) || name AS indented_name,
    title,
    depth,
    path
FROM org_tree
ORDER BY path;`
      },
      {
        title: 'Step 4: Find All Direct and Indirect Reports',
        instruction: 'Write a recursive CTE that finds every person who reports to a specific manager — both direct reports and reports of reports at any depth. This is the "subtree query" pattern: start with the manager\'s direct reports as the base case, then recursively add their reports until no new rows are returned.',
        starterCode: `-- TODO: Write a recursive CTE named "reports" that finds
-- ALL employees who report to VP Bob (id = 2),
-- including indirect reports at any depth.
-- Show: name, title`,
        hints: [
          'Base case: SELECT from org_chart WHERE manager_id = 2',
          'Recursive case: JOIN org_chart e ON e.manager_id = r.id',
          'Final SELECT picks name and title from the CTE'
        ],
        expectedOutput: `name       | title
Dir Dave   | Dir Backend
Dir Eve    | Dir Frontend
Lead Frank | Tech Lead
Dev Grace  | Senior Dev
Dev Heidi  | Junior Dev`,
        solution: `WITH RECURSIVE reports AS (
    -- Direct reports of VP Bob
    SELECT id, name, title, manager_id
    FROM org_chart
    WHERE manager_id = 2

    UNION ALL

    -- Their reports, recursively
    SELECT e.id, e.name, e.title, e.manager_id
    FROM org_chart e
    INNER JOIN reports r ON e.manager_id = r.id
)
SELECT name, title FROM reports
ORDER BY title;`
      },
      {
        title: 'Step 5: Count Total Reports Per Manager',
        instruction: 'Compute the total number of direct and indirect reports for every person in the tree. Use a downward recursive CTE: the base case seeds one row per employee (root_id = their own id, current_id = their own id), and the recursive arm extends each subtree by finding direct reports of the current node. The final GROUP BY root_id counts all descendants — subtract 1 to exclude the root itself. This reveals the true span of control: CEO Alice manages 7 people through 4 levels; VP Carol has none.',
        starterCode: `-- TODO: Write a recursive CTE named "subordinates" where:
-- Base case: SELECT manager_id, id AS subordinate_id FROM org_chart WHERE manager_id IS NOT NULL
-- Recursive case: JOIN org_chart oc ON oc.manager_id = s.subordinate_id
-- Final: LEFT JOIN back to org_chart, COUNT(subordinate_id) per manager
-- Show: name AS manager, title, total_reports — ordered by total_reports DESC, name`,
        hints: [
          'Base case: all direct reporting pairs — SELECT manager_id, id AS subordinate_id FROM org_chart WHERE manager_id IS NOT NULL',
          'Recursive arm: find each subordinate\'s own direct reports — JOIN org_chart oc ON oc.manager_id = s.subordinate_id',
          'Final: LEFT JOIN subordinates s ON s.manager_id = oc.id, then COUNT(s.subordinate_id) to get total reports per manager'
        ],
        expectedOutput: `manager     | title          | total_reports
CEO Alice   | CEO            |     7
VP Bob      | VP Engineering |     5
Dir Dave    | Dir Backend    |     3
Lead Frank  | Tech Lead      |     2
Dev Grace   | Senior Dev     |     0
Dev Heidi   | Junior Dev     |     0
Dir Eve     | Dir Frontend   |     0
VP Carol    | VP Marketing   |     0`,
        solution: `WITH RECURSIVE subordinates AS (
    -- Base: each employee who is a manager (has at least one direct report)
    SELECT manager_id AS manager_id, id AS subordinate_id
    FROM org_chart
    WHERE manager_id IS NOT NULL

    UNION ALL

    -- Recursive: walk down to their reports' reports
    SELECT s.manager_id, oc.id
    FROM subordinates s
    JOIN org_chart oc ON oc.manager_id = s.subordinate_id
)
SELECT
    oc.name AS manager,
    oc.title,
    COUNT(s.subordinate_id) AS total_reports
FROM org_chart oc
LEFT JOIN subordinates s ON s.manager_id = oc.id
GROUP BY oc.id, oc.name, oc.title
ORDER BY total_reports DESC, oc.name;`
      }
    ]
  },

  // ============================================================
  // SQL LAB 6 — Query Optimization with EXPLAIN (from sq-5)
  // ============================================================
  {
    id: 'sql-lab-6',
    languageId: 'sql',
    level: 'senior',
    title: 'Query Optimization with EXPLAIN',
    description: 'Learn to read EXPLAIN ANALYZE output, design effective indexes (composite, covering, partial, expression), and rewrite slow queries — measuring the impact of every change.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your SQL Environment',
        setupReference: true,
        instruction: 'Before writing SQL queries, ensure your database environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: PostgreSQL 16+ (EXPLAIN ANALYZE requires a live PostgreSQL instance — SQLite does not support it), a database client (DBeaver, pgAdmin, or psql CLI), and a sample database to practice with. Complete all setup steps and verify your database connection before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'EXPLAIN ANALYZE requires PostgreSQL — SQLite Online is not sufficient for this lab',
          'Run `psql -U postgres -c "SELECT version();"` to verify your PostgreSQL 16+ connection'
        ],
        expectedOutput: 'PostgreSQL 16.x installed\nConnection test: PostgreSQL 16.x on x86_64-linux\nReady to use EXPLAIN ANALYZE',
        solution: null
      },
      {
        title: 'Step 2: Create the Orders Table',
        instruction: 'Create a large orders table that simulates a real production dataset. Query optimization only matters at scale — a sequential scan of 100 rows is fast, but the same scan across 1 million rows can take seconds. Use generate_series to produce realistic volume so that EXPLAIN ANALYZE shows meaningful cost differences between unoptimised and optimised queries.',
        starterCode: `-- TODO: Create the orders table:
-- id SERIAL PK, customer_id INT NOT NULL, product_id INT NOT NULL,
-- quantity INT NOT NULL, total_amount NUMERIC(10,2),
-- status VARCHAR(20) DEFAULT 'pending', created_at TIMESTAMP DEFAULT NOW()

-- TODO: Populate the table with at least 100,000 rows using generate_series.
-- Distribute status values across 'pending', 'completed', 'cancelled'.
-- Vary customer_id from 1-10000 and product_id from 1-5000.`,
        hints: [
          'INSERT INTO orders SELECT ... FROM generate_series(1, 100000) AS s',
          'Use CASE WHEN s % 3 = 0 THEN \'completed\' WHEN s % 5 = 0 THEN \'cancelled\' ELSE \'pending\' END for status distribution',
          'NOW() - (random() * INTERVAL \'365 days\') generates random timestamps in the last year'
        ],
        expectedOutput: `Table "orders" created
INSERT 0 100000
Row distribution: ~53% pending, ~13% cancelled, ~33% completed`,
        solution: `CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total_amount NUMERIC(10,2),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO orders (customer_id, product_id, quantity, total_amount, status, created_at)
SELECT
    (random() * 9999 + 1)::INT,
    (random() * 4999 + 1)::INT,
    (random() * 9 + 1)::INT,
    ROUND((random() * 9900 + 100)::NUMERIC, 2),
    CASE
        WHEN s % 3 = 0 THEN 'completed'
        WHEN s % 5 = 0 THEN 'cancelled'
        ELSE 'pending'
    END,
    NOW() - (random() * INTERVAL '365 days')
FROM generate_series(1, 100000) AS s;`
      },
      {
        title: 'Step 3: Read EXPLAIN ANALYZE Output',
        instruction: 'Run EXPLAIN ANALYZE on a typical analytics query before adding any indexes and learn to interpret the output. Key metrics to locate: Seq Scan means no index was used (expensive at scale), cost=X..Y shows estimated rows and cost units, actual time=X..Y shows real wall-clock time in milliseconds, and rows= shows the actual row count vs the planner estimate. Note the total execution time — you will compare it after adding indexes.',
        starterCode: `-- TODO: Run EXPLAIN ANALYZE on this query and note:
-- 1. The scan type (Seq Scan vs Index Scan vs Bitmap Index Scan)
-- 2. The estimated vs actual rows
-- 3. The total execution time

EXPLAIN ANALYZE
SELECT customer_id, SUM(total_amount) AS total_spent
FROM orders
WHERE status = 'completed'
  AND created_at >= '2025-01-01'
GROUP BY customer_id
HAVING SUM(total_amount) > 1000
ORDER BY total_spent DESC
LIMIT 10;`,
        hints: [
          'Look for "Seq Scan on orders" — this means PostgreSQL is reading every row',
          'Note the "actual time" on the Seq Scan node — this is your baseline',
          'The Filter line shows how many rows were removed after scanning (rows removed by filter)'
        ],
        expectedOutput: `Seq Scan on orders (cost=... rows=... width=...)
  Filter: ((status)::text = 'completed') AND (created_at >= '2025-01-01')
  Rows Removed by Filter: ~80000
...
Planning Time: X ms
Execution Time: Y ms  ← record this baseline`,
        solution: `-- Run this and study the output carefully
EXPLAIN ANALYZE
SELECT customer_id, SUM(total_amount) AS total_spent
FROM orders
WHERE status = 'completed'
  AND created_at >= '2025-01-01'
GROUP BY customer_id
HAVING SUM(total_amount) > 1000
ORDER BY total_spent DESC
LIMIT 10;

-- Key things to note in the output:
-- • "Seq Scan" = full table read — all 100k rows scanned
-- • "Rows Removed by Filter" = wasted work
-- • Execution Time baseline (record this for comparison)`
      },
      {
        title: 'Step 4: Create Indexes and Measure the Impact',
        instruction: 'Design and create targeted indexes for the query, then run EXPLAIN ANALYZE again to measure the improvement. A composite index on (status, created_at) matches the WHERE clause column order — PostgreSQL can use it to jump directly to completed orders in the date range. A covering index additionally includes customer_id and total_amount, allowing an Index Only Scan that never touches the heap (main table data).',
        starterCode: `-- TODO: Create a composite index on (status, created_at)
-- Name it: idx_orders_status_date

-- TODO: Create a covering index that includes all columns used by the query:
-- status, created_at, customer_id, total_amount
-- Name it: idx_orders_covering

-- TODO: Run EXPLAIN ANALYZE again with the SAME query from Step 3
-- and note:
-- 1. Has the scan type changed to Bitmap Index Scan or Index Only Scan?
-- 2. What is the new execution time vs the baseline?`,
        hints: [
          'CREATE INDEX idx_orders_status_date ON orders(status, created_at)',
          'CREATE INDEX idx_orders_covering ON orders(status, created_at, customer_id, total_amount)',
          'A covering index enables Index Only Scan — the fastest possible access path'
        ],
        expectedOutput: `Indexes created: idx_orders_status_date, idx_orders_covering
EXPLAIN ANALYZE shows: Bitmap Index Scan or Index Only Scan (no more Seq Scan)
Execution time reduced significantly (often 10x-100x for selective queries)`,
        solution: `-- Composite index: matches WHERE status = ... AND created_at >= ...
CREATE INDEX idx_orders_status_date ON orders(status, created_at);

-- Covering index: all columns needed, enables Index Only Scan
CREATE INDEX idx_orders_covering ON orders(status, created_at, customer_id, total_amount);

-- Re-run the same EXPLAIN ANALYZE query
EXPLAIN ANALYZE
SELECT customer_id, SUM(total_amount) AS total_spent
FROM orders
WHERE status = 'completed'
  AND created_at >= '2025-01-01'
GROUP BY customer_id
HAVING SUM(total_amount) > 1000
ORDER BY total_spent DESC
LIMIT 10;`
      },
      {
        title: 'Step 5: Partial Indexes, Expression Indexes, and Index Auditing',
        instruction: 'Apply advanced index strategies: partial indexes for selective filters, expression indexes for computed columns, and query the pg_stat_user_indexes catalog to audit which indexes are actually being used. Unused indexes waste disk space and slow down every INSERT/UPDATE/DELETE because PostgreSQL must maintain them. Regular index audits are a standard database maintenance task.',
        starterCode: `-- TODO: Create a partial index on created_at for pending orders only
-- (WHERE status = 'pending') — smaller and faster for a common filter
-- Name it: idx_orders_pending_date

-- TODO: Create an expression index on DATE_TRUNC('month', created_at)
-- for queries that filter by month
-- Name it: idx_orders_month

-- TODO: Query pg_stat_user_indexes to find:
-- index name, times used (idx_scan), rows read (idx_tup_read), and index size
-- for the public schema, ordered by idx_scan DESC

-- TODO: Write a query to identify unused indexes (idx_scan = 0)`,
        hints: [
          'CREATE INDEX idx_orders_pending_date ON orders(created_at) WHERE status = \'pending\'',
          'CREATE INDEX idx_orders_month ON orders(DATE_TRUNC(\'month\', created_at))',
          'SELECT indexrelname, idx_scan, idx_tup_read, pg_size_pretty(pg_relation_size(indexrelid)) FROM pg_stat_user_indexes WHERE schemaname = \'public\''
        ],
        expectedOutput: `Partial index created: idx_orders_pending_date (smaller than full index)
Expression index created: idx_orders_month

index_name              | times_used | rows_read | size
idx_orders_covering     |     12     |   50000   | 8192 kB
idx_orders_status_date  |      8     |   60000   | 6144 kB
idx_orders_pending_date |      0     |       0   |  512 kB  ← unused (no pending queries run yet)
idx_orders_month        |      0     |       0   |  768 kB  ← unused`,
        solution: `-- Partial index: only indexes pending orders (smaller, faster for that filter)
CREATE INDEX idx_orders_pending_date ON orders(created_at)
WHERE status = 'pending';

-- Expression index: supports DATE_TRUNC('month', created_at) in WHERE clauses
CREATE INDEX idx_orders_month ON orders(DATE_TRUNC('month', created_at));

-- Audit index usage
SELECT
    indexrelname AS index_name,
    idx_scan AS times_used,
    idx_tup_read AS rows_read,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- Find unused indexes (candidates for removal)
SELECT
    indexrelname AS unused_index,
    pg_size_pretty(pg_relation_size(indexrelid)) AS wasted_space
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
  AND idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;`
      }
    ]
  },

  // ============================================================
  // SQL LAB 7 — Subqueries & CTEs
  // ============================================================
  {
    id: 'sql-lab-7',
    languageId: 'sql',
    level: 'beginner',
    title: 'Subqueries & CTEs',
    description: 'Learn to write scalar subqueries, correlated subqueries, and Common Table Expressions (CTEs) to break complex queries into readable, reusable building blocks.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before you begin, make sure your PostgreSQL environment is ready. Head to the <strong>Dev Setup</strong> tab for step-by-step instructions.',
        starterCode: null,
        hints: [],
        expectedOutput: 'A running PostgreSQL instance with psql access.',
        solution: null
      },
      {
        title: 'Step 2: Scalar Subqueries in SELECT',
        instruction: 'A scalar subquery returns exactly one row and one column — you can use it anywhere a single value is expected, including the SELECT list. Here, add a column to each employee row showing the average salary of their department. This avoids a self-join and keeps the query readable. The subquery runs once per row, so it is convenient for small tables; for large tables a window function is more efficient.',
        starterCode: `-- Setup: create and populate the schema
CREATE TABLE departments (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE employees (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    department_id INT REFERENCES departments(id),
    salary        NUMERIC(10,2) NOT NULL
);

INSERT INTO departments (name) VALUES
    ('Engineering'),
    ('Design'),
    ('Marketing');

INSERT INTO employees (name, department_id, salary) VALUES
    ('Alice',   1, 95000),
    ('Bob',     1, 85000),
    ('Carol',   1, 105000),
    ('Dave',    2, 72000),
    ('Eve',     2, 78000),
    ('Frank',   3, 65000),
    ('Grace',   3, 68000);

-- TODO: Write a SELECT that returns each employee's name, salary,
-- and a column "dept_avg_salary" showing the average salary of
-- their own department, using a scalar subquery in the SELECT list.`,
        hints: [
          'A scalar subquery in SELECT looks like: SELECT name, (SELECT AVG(...) FROM ... WHERE ...) AS alias',
          'Correlate the subquery to the outer row with: WHERE department_id = e.department_id',
          'Alias the outer table: FROM employees e'
        ],
        expectedOutput: `name  | salary   | dept_avg_salary
------+----------+----------------
Alice | 95000.00 | 95000.00
Bob   | 85000.00 | 95000.00
Carol | 105000.00| 95000.00
Dave  | 72000.00 | 75000.00
...`,
        solution: `SELECT
    e.name,
    e.salary,
    (
        SELECT AVG(e2.salary)
        FROM employees e2
        WHERE e2.department_id = e.department_id
    ) AS dept_avg_salary
FROM employees e
ORDER BY e.department_id, e.salary DESC;`
      },
      {
        title: 'Step 3: Subqueries in WHERE (IN / NOT IN)',
        instruction: 'Subqueries in the WHERE clause let you filter rows based on the result of another query. IN returns rows whose column value appears in the subquery result set. NOT IN is useful for finding "missing" relationships — but beware: NOT IN returns no rows at all if the subquery contains any NULL values. Always filter NULLs out of NOT IN subqueries, or prefer NOT EXISTS instead.',
        starterCode: `-- Using the employees and departments tables from Step 2.

-- TODO: Query 1 — Find all employees who earn more than the
-- company-wide average salary. Use a subquery in the WHERE clause.

-- TODO: Query 2 — Find departments that have NO employees.
-- Use NOT IN with a subquery that lists all department_id values
-- present in the employees table. Filter out NULLs in the subquery.`,
        hints: [
          'WHERE salary > (SELECT AVG(salary) FROM employees)',
          'WHERE id NOT IN (SELECT department_id FROM employees WHERE department_id IS NOT NULL)',
          'Always add WHERE department_id IS NOT NULL inside a NOT IN subquery to avoid returning zero rows'
        ],
        expectedOutput: `Query 1: Employees above company average (e.g. Alice, Carol)
Query 2: Departments with no employees (none in this seed data — try deleting an employee to test)`,
        solution: `-- Query 1: above-average earners
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;

-- Query 2: departments with no employees
SELECT name
FROM departments
WHERE id NOT IN (
    SELECT department_id
    FROM employees
    WHERE department_id IS NOT NULL
);`
      },
      {
        title: 'Step 4: Correlated Subqueries',
        instruction: 'A correlated subquery references a column from the outer query — it re-executes for every row the outer query processes. Use this to compute per-row context that depends on the outer row\'s values. Here, rank each employee within their department: count how many employees in the same department earn strictly more than this employee, then add 1 to get the rank. This is a classic interview pattern and teaches how correlation works before window functions are introduced.',
        starterCode: `-- Using the employees table from Step 2.

-- TODO: Write a query that returns each employee's name,
-- department_id, salary, and "dept_rank" — their salary rank
-- within their department (1 = highest earner).
-- Use a correlated subquery in the SELECT list:
-- count employees in the same department who earn MORE,
-- then +1 gives the rank.`,
        hints: [
          'SELECT name, department_id, salary, (SELECT COUNT(*) + 1 FROM ...) AS dept_rank',
          'Correlate on both department_id AND salary: WHERE department_id = e.department_id AND salary > e.salary',
          'This is equivalent to RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)'
        ],
        expectedOutput: `name  | department_id | salary    | dept_rank
------+---------------+-----------+----------
Carol | 1             | 105000.00 | 1
Alice | 1             |  95000.00 | 2
Bob   | 1             |  85000.00 | 3
Eve   | 2             |  78000.00 | 1
...`,
        solution: `SELECT
    e.name,
    e.department_id,
    e.salary,
    (
        SELECT COUNT(*) + 1
        FROM employees e2
        WHERE e2.department_id = e.department_id
          AND e2.salary > e.salary
    ) AS dept_rank
FROM employees e
ORDER BY e.department_id, dept_rank;`
      },
      {
        title: 'Step 5: CTEs with WITH',
        instruction: 'Common Table Expressions (CTEs) defined with the WITH clause give a subquery a name, making complex queries dramatically easier to read and maintain. You can chain multiple CTEs in one WITH block — each CTE can reference the CTEs defined before it. Rewrite the correlated subquery from Step 4 as a CTE, then chain a second CTE to find the single top earner in each department.',
        starterCode: `-- Using the employees and departments tables from Step 2.

-- TODO Part A: Rewrite the dept_rank correlated subquery from Step 4
-- as a CTE called "ranked_employees". Then SELECT from it,
-- filtering to WHERE dept_rank = 1 to get top earners per department.

-- TODO Part B: Chain a second CTE called "dept_names" that joins
-- ranked_employees with departments to also show the department name.
-- Final SELECT: department name, top earner's name, and their salary.`,
        hints: [
          'WITH ranked_employees AS ( ... ), dept_names AS ( ... ) SELECT ... FROM dept_names',
          'The second CTE can JOIN ranked_employees with departments on department_id = id',
          'CTEs are evaluated once and referenced by name — they act like temporary views'
        ],
        expectedOutput: `dept_name   | top_earner | salary
------------+------------+-----------
Engineering | Carol      | 105000.00
Design      | Eve        |  78000.00
Marketing   | Grace      |  68000.00`,
        solution: `WITH ranked_employees AS (
    SELECT
        e.name,
        e.department_id,
        e.salary,
        (
            SELECT COUNT(*) + 1
            FROM employees e2
            WHERE e2.department_id = e.department_id
              AND e2.salary > e.salary
        ) AS dept_rank
    FROM employees e
),
dept_top_earners AS (
    SELECT
        d.name  AS dept_name,
        re.name AS top_earner,
        re.salary
    FROM ranked_employees re
    JOIN departments d ON d.id = re.department_id
    WHERE re.dept_rank = 1
)
SELECT dept_name, top_earner, salary
FROM dept_top_earners
ORDER BY salary DESC;`
      }
    ]
  },

  // ============================================================
  // SQL LAB 8 — Transactions & Integrity
  // ============================================================
  {
    id: 'sql-lab-8',
    languageId: 'sql',
    level: 'mid',
    title: 'Transactions & Integrity',
    description: 'Master PostgreSQL transaction control — BEGIN/COMMIT/ROLLBACK, SAVEPOINTs for partial rollback, and constraint types that enforce business rules at the database level.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before you begin, make sure your PostgreSQL environment is ready. Head to the <strong>Dev Setup</strong> tab for step-by-step instructions.',
        starterCode: null,
        hints: [],
        expectedOutput: 'A running PostgreSQL instance with psql access.',
        solution: null
      },
      {
        title: 'Step 2: Basic Transaction — Transfer Money',
        instruction: 'A transaction groups multiple SQL statements into an atomic unit: either all succeed (COMMIT) or all are reverted (ROLLBACK). This is critical for financial operations — if you debit one account but the credit fails, you must roll back the debit. PostgreSQL wraps every statement in an implicit transaction; use explicit BEGIN/COMMIT to group multiple statements. Run the failing version first to see the inconsistent state it would create without a transaction.',
        starterCode: `-- Setup: create accounts table
CREATE TABLE accounts (
    id      SERIAL PRIMARY KEY,
    owner   VARCHAR(50) NOT NULL,
    balance NUMERIC(12,2) NOT NULL DEFAULT 0
);

INSERT INTO accounts (owner, balance) VALUES
    ('Alice', 1000.00),
    ('Bob',     500.00);

-- TODO: Write a transaction that transfers $200 from Alice to Bob.
-- Step 1: BEGIN the transaction
-- Step 2: Deduct $200 from Alice
-- Step 3: Add $200 to Bob
-- Step 4: COMMIT

-- Then write a second version that shows ROLLBACK:
-- Deduct $200 from Alice, then deliberately ROLLBACK.
-- Verify Alice still has her original balance.`,
        hints: [
          'BEGIN; ... COMMIT; wraps the two UPDATEs in one atomic operation',
          'To test rollback: BEGIN; UPDATE accounts SET balance = balance - 200 WHERE owner = \'Alice\'; ROLLBACK;',
          'After ROLLBACK, run SELECT * FROM accounts to verify balances are unchanged'
        ],
        expectedOutput: `After COMMIT: Alice=800.00, Bob=700.00
After ROLLBACK test: Alice=1000.00 (original balance restored)`,
        solution: `-- Successful transfer
BEGIN;

UPDATE accounts SET balance = balance - 200 WHERE owner = 'Alice';
UPDATE accounts SET balance = balance + 200 WHERE owner = 'Bob';

COMMIT;

-- Verify
SELECT owner, balance FROM accounts ORDER BY owner;

-- Rollback demo: start a transfer but abort it
BEGIN;

UPDATE accounts SET balance = balance - 200 WHERE owner = 'Alice';

-- Something went wrong — roll back the entire transaction
ROLLBACK;

-- Alice's balance is unchanged
SELECT owner, balance FROM accounts ORDER BY owner;`
      },
      {
        title: 'Step 3: SAVEPOINTs for Partial Rollback',
        instruction: 'SAVEPOINTs let you mark an intermediate point inside a transaction so you can roll back to that point without aborting the whole transaction. This is useful when inserting a batch of rows where some may violate constraints — roll back just the bad insert and continue processing the rest. Real-world use: importing CSV rows where some are invalid; skip the bad rows rather than rejecting the entire batch.',
        starterCode: `-- Using the accounts table from Step 2.

-- TODO: Open a transaction and:
-- 1. Insert a new account for 'Carol' with balance 300
-- 2. Create a SAVEPOINT called after_carol
-- 3. Insert a new account for 'Dave' with balance -50  (intentionally bad)
-- 4. ROLLBACK TO SAVEPOINT after_carol  (undo Dave's insert only)
-- 5. Insert a valid account for 'Eve' with balance 250
-- 6. COMMIT

-- Verify: Carol and Eve exist, Dave does not.`,
        hints: [
          'SAVEPOINT after_carol; — marks the point after Carol\'s insert',
          'ROLLBACK TO SAVEPOINT after_carol; — undoes Dave\'s insert but keeps Carol\'s',
          'RELEASE SAVEPOINT after_carol; is optional cleanup before COMMIT'
        ],
        expectedOutput: `owner | balance
------+---------
Alice | 800.00
Bob   | 700.00
Carol | 300.00
Eve   | 250.00
(Dave is NOT present)`,
        solution: `BEGIN;

INSERT INTO accounts (owner, balance) VALUES ('Carol', 300.00);

SAVEPOINT after_carol;

-- This insert is "bad" — we'll roll it back
INSERT INTO accounts (owner, balance) VALUES ('Dave', -50.00);

-- Oops — roll back only to after_carol
ROLLBACK TO SAVEPOINT after_carol;

-- Continue with a valid insert
INSERT INTO accounts (owner, balance) VALUES ('Eve', 250.00);

COMMIT;

-- Verify
SELECT owner, balance FROM accounts ORDER BY owner;`
      },
      {
        title: 'Step 4: Foreign Key Constraints & ON DELETE CASCADE',
        instruction: 'Foreign key constraints enforce referential integrity at the database level — the database rejects any insert or update that would create a dangling reference. ON DELETE CASCADE automatically deletes child rows when the parent is deleted. This is convenient but powerful: accidentally deleting a parent row can silently wipe thousands of child rows. Always choose the ON DELETE behaviour that matches your business rules (CASCADE, SET NULL, RESTRICT, or the default NO ACTION).',
        starterCode: `-- TODO: Create two tables: customers and orders.
-- customers: id SERIAL PK, name VARCHAR(100)
-- orders: id SERIAL PK, customer_id INT FK → customers(id) ON DELETE CASCADE,
--         amount NUMERIC(10,2)

-- TODO: Insert 2 customers and 3 orders (at least 2 orders for the same customer).

-- TODO: DELETE one customer.
-- Then SELECT from orders to show that their orders were also deleted (cascade).

-- TODO: Try to insert an order with a customer_id that doesn't exist.
-- Observe the foreign key violation error.`,
        hints: [
          'REFERENCES customers(id) ON DELETE CASCADE — adds the FK with cascade behaviour',
          'After deleting a customer, SELECT * FROM orders to see cascade in action',
          'INSERT INTO orders (customer_id, amount) VALUES (999, 100) will fail with: "violates foreign key constraint"'
        ],
        expectedOutput: `Before delete: 3 orders exist
After deleting customer 1: only orders for customer 2 remain
FK violation test: ERROR: insert or update on table "orders" violates foreign key constraint`,
        solution: `CREATE TABLE customers (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    id          SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    amount      NUMERIC(10,2) NOT NULL
);

INSERT INTO customers (name) VALUES ('Alice'), ('Bob');

INSERT INTO orders (customer_id, amount) VALUES
    (1, 150.00),
    (1, 200.00),
    (2, 75.00);

-- Delete Alice — her orders cascade-delete automatically
DELETE FROM customers WHERE id = 1;

SELECT * FROM orders;  -- only Bob's order remains

-- FK violation: customer 999 doesn't exist
INSERT INTO orders (customer_id, amount) VALUES (999, 100.00);`
      },
      {
        title: 'Step 5: CHECK Constraints',
        instruction: 'CHECK constraints let you encode business rules inside the schema itself, so the database enforces them regardless of which application or script inserts data. Rules enforced in the schema are more reliable than application-layer validation alone — they cannot be bypassed by a migration script or a direct psql session. Common patterns: non-negative balances, valid email format, enumerated status values.',
        starterCode: `-- TODO: Create a "bank_accounts" table with these CHECK constraints:
-- - balance must be >= 0
-- - email must contain '@' (use LIKE '%@%')
-- - account_type must be one of: 'checking', 'savings', 'business'

-- TODO: Insert a valid row to confirm it works.

-- TODO: Try to insert a row with balance = -100. Observe the violation.
-- TODO: Try to insert a row with email = 'not-an-email'. Observe the violation.
-- TODO: Try to insert a row with account_type = 'crypto'. Observe the violation.`,
        hints: [
          'CHECK (balance >= 0) — added inline or as a table-level constraint',
          'CHECK (email LIKE \'%@%\') — a simple format check; production apps use stricter regex via CHECK or a domain',
          'CHECK (account_type IN (\'checking\', \'savings\', \'business\')) — enumeration constraint',
          'See: PostgreSQL docs "CHECK Constraints" — https://www.postgresql.org/docs/current/ddl-constraints.html'
        ],
        expectedOutput: `Valid insert: success
balance = -100: ERROR: new row violates check constraint "bank_accounts_balance_check"
bad email: ERROR: new row violates check constraint "bank_accounts_email_check"
bad type: ERROR: new row violates check constraint "bank_accounts_account_type_check"`,
        solution: `CREATE TABLE bank_accounts (
    id           SERIAL PRIMARY KEY,
    owner        VARCHAR(100) NOT NULL,
    email        VARCHAR(200) NOT NULL CHECK (email LIKE '%@%'),
    balance      NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (balance >= 0),
    account_type VARCHAR(20) NOT NULL
        CHECK (account_type IN ('checking', 'savings', 'business'))
);

-- Valid insert
INSERT INTO bank_accounts (owner, email, balance, account_type)
VALUES ('Alice', 'alice@example.com', 500.00, 'checking');

-- Constraint violations (each will ERROR — run them one at a time)
INSERT INTO bank_accounts (owner, email, balance, account_type)
VALUES ('Bob', 'bob@example.com', -100.00, 'savings');

INSERT INTO bank_accounts (owner, email, balance, account_type)
VALUES ('Carol', 'not-an-email', 200.00, 'checking');

INSERT INTO bank_accounts (owner, email, balance, account_type)
VALUES ('Dave', 'dave@example.com', 300.00, 'crypto');`
      }
    ]
  },

  // ============================================================
  // SQL LAB 9 — Schema Design
  // ============================================================
  {
    id: 'sql-lab-9',
    languageId: 'sql',
    level: 'mid',
    title: 'Schema Design',
    description: 'Learn to design well-structured relational schemas: identify and fix normalization violations, choose correct index types, and understand when denormalization makes sense.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before you begin, make sure your PostgreSQL environment is ready. Head to the <strong>Dev Setup</strong> tab for step-by-step instructions.',
        starterCode: null,
        hints: [],
        expectedOutput: 'A running PostgreSQL instance with psql access.',
        solution: null
      },
      {
        title: 'Step 2: Identify Normalization Violations',
        instruction: 'Normalization eliminates redundancy and update anomalies. 1NF requires atomic values and no repeating groups. 2NF requires every non-key column to depend on the whole primary key (relevant when the PK is composite). 3NF requires no transitive dependencies — non-key columns must not depend on other non-key columns. Violations cause update anomalies: change a customer\'s city in one row but not another, and the data becomes inconsistent. Identify all violations in the table below before writing any SQL.',
        starterCode: `-- This poorly designed orders table violates multiple normal forms.
-- Study it carefully.

CREATE TABLE orders_bad (
    order_id        INT,
    product_id      INT,
    -- Repeating group violation (1NF): multiple values in one column
    product_tags    VARCHAR(200),   -- stores 'electronics,sale,featured'
    -- Partial dependency (2NF): product_name depends only on product_id,
    --   not the full (order_id, product_id) composite key
    product_name    VARCHAR(100),
    unit_price      NUMERIC(10,2),
    quantity        INT,
    -- Transitive dependency (3NF): customer_city depends on customer_id,
    --   not on the order
    customer_id     INT,
    customer_name   VARCHAR(100),
    customer_city   VARCHAR(50),
    customer_country VARCHAR(50),
    PRIMARY KEY (order_id, product_id)
);

-- TODO: In comments below this CREATE TABLE, write out:
-- 1. Which columns violate 1NF and why
-- 2. Which columns violate 2NF and why
-- 3. Which columns violate 3NF and why
-- (No SQL needed yet — this is an analysis step)`,
        hints: [
          '1NF violation: product_tags stores a comma-separated list — not atomic. Each tag should be its own row in a join table.',
          '2NF violation: product_name and unit_price depend only on product_id, not on (order_id, product_id). They belong in a products table.',
          '3NF violation: customer_city and customer_country depend on customer_id (a non-key column), not on the composite PK. They belong in a customers table.'
        ],
        expectedOutput: `Analysis documented in comments:
-- 1NF violation: product_tags (non-atomic, comma-separated list)
-- 2NF violation: product_name, unit_price (depend only on product_id, not full PK)
-- 3NF violation: customer_name, customer_city, customer_country (depend on customer_id, not the PK)`,
        solution: `-- 1NF violation:
--   product_tags VARCHAR(200) stores 'electronics,sale,featured' — multiple values
--   in one column. Not atomic. Fix: create a product_tags join table.

-- 2NF violation (composite PK is order_id + product_id):
--   product_name and unit_price depend only on product_id, not on order_id.
--   Changing a product's name would require updating every row with that product.
--   Fix: move them to a separate products table.

-- 3NF violation:
--   customer_name, customer_city, customer_country depend on customer_id
--   (a non-key attribute), not on the composite PK (order_id, product_id).
--   Changing a customer's city would require updating every order row.
--   Fix: move them to a separate customers table.`
      },
      {
        title: 'Step 3: Normalize to 3NF',
        instruction: 'Decompose the problematic orders_bad table into properly normalized tables. Each table should have a single, clear responsibility. The order_items table becomes a pure junction table: it records which product appeared in which order, plus the quantity. No redundant customer or product data lives in order_items — changes to a product\'s name or a customer\'s city are made in exactly one place.',
        starterCode: `-- TODO: Create these 4 tables in 3NF:
--
-- 1. customers (id, name, city, country)
-- 2. products   (id, name, unit_price)
-- 3. orders     (id, customer_id FK→customers, order_date DATE)
-- 4. order_items (order_id FK→orders, product_id FK→products,
--                 quantity INT, PRIMARY KEY (order_id, product_id))
-- 5. product_tags (product_id FK→products, tag VARCHAR(50),
--                  PRIMARY KEY (product_id, tag))
--
-- After creating the tables, insert sample data:
-- 2 customers, 2 products, 1 order with 2 line items, tags for each product.`,
        hints: [
          'order_items has a composite PK: PRIMARY KEY (order_id, product_id)',
          'product_tags eliminates the comma-separated list: one row per tag per product',
          'orders.order_date DEFAULT CURRENT_DATE is a convenient default',
          'Use REFERENCES with ON DELETE CASCADE where child rows should not orphan'
        ],
        expectedOutput: `Tables created: customers, products, orders, order_items, product_tags
Sample data inserted — query with JOINs to reconstruct original order view`,
        solution: `CREATE TABLE customers (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    city    VARCHAR(50),
    country VARCHAR(50)
);

CREATE TABLE products (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0)
);

CREATE TABLE orders (
    id          SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(id),
    order_date  DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE order_items (
    order_id   INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id),
    quantity   INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE product_tags (
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tag        VARCHAR(50) NOT NULL,
    PRIMARY KEY (product_id, tag)
);

-- Sample data
INSERT INTO customers (name, city, country) VALUES
    ('Alice', 'Stockholm', 'Sweden'),
    ('Bob',   'Oslo',      'Norway');

INSERT INTO products (name, unit_price) VALUES
    ('Laptop',  999.00),
    ('Monitor', 349.00);

INSERT INTO orders (customer_id, order_date) VALUES (1, '2024-06-01');

INSERT INTO order_items (order_id, product_id, quantity) VALUES
    (1, 1, 1),
    (1, 2, 2);

INSERT INTO product_tags (product_id, tag) VALUES
    (1, 'electronics'), (1, 'sale'),
    (2, 'electronics'), (2, 'featured');`
      },
      {
        title: 'Step 4: Choose Appropriate Indexes',
        instruction: 'Indexes speed up reads at the cost of write overhead and storage. Choosing the right index type and column order is one of the highest-leverage tuning decisions you can make. A composite index on (a, b) can satisfy queries on (a) alone or (a, b) together — but NOT on (b) alone. Put the most selective column first. Partial indexes index only a subset of rows, making them smaller and faster for filtered queries. Use EXPLAIN ANALYZE to confirm an index is actually used.',
        starterCode: `-- Using the normalized tables from Step 3.
-- Analyze these three common query patterns and add the right indexes:

-- Pattern 1: "Find all orders for a given customer"
--   SELECT * FROM orders WHERE customer_id = $1;
-- Pattern 2: "Find all order_items for a given order, most recent first"
--   SELECT * FROM order_items WHERE order_id = $1;
--   (order_items doesn't have a date, but orders does — join needed)
-- Pattern 3: "Find all orders placed in the last 30 days"
--   SELECT * FROM orders WHERE order_date >= CURRENT_DATE - INTERVAL '30 days';

-- TODO: Create the following indexes:
-- 1. Single-column index on orders(customer_id) — for Pattern 1
-- 2. The composite PK on order_items already covers Pattern 2 — verify it exists
-- 3. Partial index on orders(order_date) WHERE order_date >= '2024-01-01'
--    — for Pattern 3, covering only recent orders

-- After creating indexes, run EXPLAIN ANALYZE on Pattern 1 and Pattern 3
-- to confirm "Index Scan" appears in the plan.`,
        hints: [
          'CREATE INDEX idx_orders_customer ON orders(customer_id);',
          'The PRIMARY KEY (order_id, product_id) on order_items is already an index — check with \\d order_items in psql',
          'CREATE INDEX idx_orders_recent ON orders(order_date) WHERE order_date >= \'2024-01-01\';',
          'EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 1; — look for "Index Scan using idx_orders_customer"'
        ],
        expectedOutput: `Indexes created:
  idx_orders_customer on orders(customer_id)
  idx_orders_recent   on orders(order_date) WHERE order_date >= '2024-01-01'
EXPLAIN ANALYZE output shows "Index Scan" for both queries`,
        solution: `-- Single-column index for customer lookups
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Partial index for recent-order queries (only indexes rows after 2024-01-01)
CREATE INDEX idx_orders_recent ON orders(order_date)
WHERE order_date >= '2024-01-01';

-- Verify the order_items composite PK index exists
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'order_items';

-- Confirm index usage with EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 1;

EXPLAIN ANALYZE
SELECT * FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days';`
      },
      {
        title: 'Step 5: Denormalization Decision',
        instruction: 'Normalization minimises redundancy; denormalization deliberately reintroduces it to improve read performance. A common pattern is storing a precomputed aggregate — like a user\'s total order count — on the parent row so dashboards can read it without a GROUP BY scan. The trade-off: you must keep the cached value in sync on every write, which adds complexity. Denormalization is appropriate for read-heavy reporting workloads where the aggregate is queried far more often than it changes.',
        starterCode: `-- TODO Part A: Add a "total_orders" column to the customers table.
-- ALTER TABLE customers ADD COLUMN total_orders INT NOT NULL DEFAULT 0;

-- TODO Part B: Backfill the column from the actual orders data.
-- UPDATE customers SET total_orders = (
--     SELECT COUNT(*) FROM orders WHERE customer_id = customers.id
-- );

-- TODO Part C: Write a query that shows customer name and total_orders
-- side-by-side with the live COUNT(*) to verify they match.

-- TODO Part D: In a comment, answer:
-- When is this denormalization a good idea?
-- When would you avoid it and query the live count instead?`,
        hints: [
          'The backfill UPDATE uses a correlated subquery — the same pattern from Lab 7 Step 2',
          'To keep total_orders in sync in production: use a trigger or update it in the same transaction as the INSERT INTO orders',
          'Good for: dashboard widgets, leaderboards, reporting tables queried millions of times per day',
          'Avoid when: order inserts are very frequent (lock contention on the customers row), or the count must be 100% real-time'
        ],
        expectedOutput: `total_orders column added and backfilled
name  | total_orders | live_count
------+--------------+------------
Alice |            1 |          1
Bob   |            0 |          0`,
        solution: `-- Part A: Add the column
ALTER TABLE customers ADD COLUMN total_orders INT NOT NULL DEFAULT 0;

-- Part B: Backfill from live data
UPDATE customers
SET total_orders = (
    SELECT COUNT(*) FROM orders WHERE orders.customer_id = customers.id
);

-- Part C: Verify the cached value matches the live count
SELECT
    c.name,
    c.total_orders            AS cached_count,
    COUNT(o.id)               AS live_count
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name, c.total_orders
ORDER BY c.name;

-- Part D: Analysis
-- GOOD for denormalization:
--   - Read-heavy dashboards where total_orders is displayed on every page load
--   - The count changes infrequently relative to how often it is read
--   - You control all writes through an application layer (triggers or app code keep it in sync)
--
-- AVOID denormalization when:
--   - High-frequency inserts would cause lock contention on the customers row
--   - You need the count to be strictly real-time (billing, rate-limiting)
--   - Multiple uncoordinated processes write orders (cache gets out of sync)`
      }
    ]
  },

  // ============================================================
  // SQL LAB 10 — Zero-Downtime Migrations
  // ============================================================
  {
    id: 'sql-lab-10',
    languageId: 'sql',
    level: 'senior',
    title: 'Zero-Downtime Migrations',
    description: 'Learn safe, production-grade schema migration patterns: add columns without table locks, build indexes concurrently, and validate constraints without blocking reads or writes.',
    estimatedMinutes: 40,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before you begin, make sure your PostgreSQL environment is ready. Head to the <strong>Dev Setup</strong> tab for step-by-step instructions.',
        starterCode: null,
        hints: [],
        expectedOutput: 'A running PostgreSQL instance with psql access.',
        solution: null
      },
      {
        title: 'Step 2: The Naive Approach and Its Problems',
        instruction: 'When you run ALTER TABLE ADD COLUMN with a NOT NULL constraint and no DEFAULT, PostgreSQL must rewrite the entire table to fill in the value for every existing row. On a table with millions of rows, this holds an AccessExclusiveLock for minutes — blocking every SELECT, INSERT, UPDATE, and DELETE. In PostgreSQL 11+, adding a column with a constant DEFAULT is safe (stored as metadata, no rewrite), but a volatile default or removing the DEFAULT later can still trigger a rewrite. Understanding what causes a lock is the first step to avoiding it.',
        starterCode: `-- Setup: simulate a large-ish table
CREATE TABLE user_events (
    id         BIGSERIAL PRIMARY KEY,
    user_id    INT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert enough rows to make the problem visible
INSERT INTO user_events (user_id, event_type)
SELECT
    (random() * 10000)::INT,
    (ARRAY['click','view','purchase','login'])[ceil(random()*4)::INT]
FROM generate_series(1, 100000);

-- TODO: Run the UNSAFE migration and observe the lock.
-- In one psql session, run:
--   ALTER TABLE user_events ADD COLUMN processed BOOLEAN NOT NULL DEFAULT false;
-- In PostgreSQL 11+ this is actually safe for a constant DEFAULT.
-- Now try the UNSAFE version that forces a table rewrite:
--   ALTER TABLE user_events ADD COLUMN score INT NOT NULL;
-- (No DEFAULT — PostgreSQL cannot fill in the value without a rewrite)

-- TODO: In a comment, explain WHY this blocks and what the safe alternative is.`,
        hints: [
          'ALTER TABLE acquires AccessExclusiveLock — the strongest lock, incompatible with all other operations',
          'In PostgreSQL 11+, ADD COLUMN ... DEFAULT <constant> is safe (no rewrite); ADD COLUMN NOT NULL without a default still rewrites on older versions',
          'Check lock activity with: SELECT pid, query, wait_event_type, wait_event FROM pg_stat_activity WHERE wait_event IS NOT NULL;',
          'See: PostgreSQL docs "ALTER TABLE" — https://www.postgresql.org/docs/current/sql-altertable.html'
        ],
        expectedOutput: `user_events table created with 100,000 rows
Unsafe ALTER TABLE observed to lock the table
Explanation documented in comments:
-- AccessExclusiveLock blocks all concurrent queries for the duration of the rewrite`,
        solution: `-- The unsafe migration
-- ALTER TABLE user_events ADD COLUMN score INT NOT NULL;
-- This fails without a DEFAULT and would require a full table rewrite with a lock
-- on PostgreSQL 10 and below even with a constant DEFAULT.

-- Why it blocks:
-- PostgreSQL acquires AccessExclusiveLock for the entire duration of the table rewrite.
-- Every other session — reads included — must wait. On a 100M-row table this can
-- take minutes, causing timeouts and cascading failures in production.

-- PostgreSQL 11+ improvement:
-- ADD COLUMN ... DEFAULT <constant> is safe: the default is stored as table metadata
-- and returned for existing rows without rewriting any data.
-- But: if you later ALTER COLUMN SET DEFAULT to a volatile expression, or add NOT NULL
-- to an existing nullable column without a backfill, you still risk a full rewrite.

-- The safe pattern (previewed in Step 3):
-- 1. Add the column as nullable, no default — instant metadata-only operation
-- 2. Backfill in small batches (no long lock)
-- 3. Add NOT NULL in a separate transaction once every row has a value

-- Check for lock contention during migrations:
SELECT pid, query, wait_event_type, wait_event
FROM pg_stat_activity
WHERE wait_event IS NOT NULL;`
      },
      {
        title: 'Step 3: Safe Column Addition — Nullable First, Backfill, Then NOT NULL',
        instruction: 'The production-safe pattern for adding a required column to a large table has three steps, each in a separate transaction: (1) add the column as nullable — this is a metadata-only change with a brief lock; (2) backfill existing rows in small batches so each batch holds the lock for only milliseconds; (3) add the NOT NULL constraint once every row has a value. Step 3 still needs a brief lock to validate the constraint, but since all rows already have a value, the validation is instant.',
        starterCode: `-- Using user_events from Step 2.

-- TODO Step A: Add the column as nullable (no DEFAULT, no NOT NULL)
-- ALTER TABLE user_events ADD COLUMN score INT;
-- This is a metadata-only change — completes in milliseconds.

-- TODO Step B: Backfill in batches of 10,000 rows.
-- Write a DO block (or just repeated UPDATE statements) that updates
-- score for rows where score IS NULL, 10,000 at a time.
-- Use a WHERE id BETWEEN range approach or a loop.

-- TODO Step C: In a new transaction, add the NOT NULL constraint.
-- ALTER TABLE user_events ALTER COLUMN score SET NOT NULL;
-- This validates that no NULLs remain — fast since we already backfilled.

-- TODO Step D: Verify with:
-- SELECT COUNT(*) FROM user_events WHERE score IS NULL;  -- should be 0`,
        hints: [
          'Step A: ALTER TABLE user_events ADD COLUMN score INT; — no NOT NULL, no DEFAULT',
          'Step B batch update: UPDATE user_events SET score = 0 WHERE id IN (SELECT id FROM user_events WHERE score IS NULL LIMIT 10000);',
          'Repeat the batch UPDATE until 0 rows are affected — each iteration holds a row-level lock for milliseconds',
          'Step C: ALTER TABLE user_events ALTER COLUMN score SET NOT NULL; — validates instantly since no NULLs remain',
          'See: PostgreSQL docs "ALTER TABLE ... SET NOT NULL" — https://www.postgresql.org/docs/current/sql-altertable.html'
        ],
        expectedOutput: `Step A: ALTER TABLE completes instantly (metadata-only)
Step B: Batched UPDATEs each affect 10,000 rows; repeat until 0 rows updated
Step C: SET NOT NULL completes instantly (no NULLs to find)
Verification: SELECT COUNT(*) WHERE score IS NULL → 0`,
        solution: `-- Step A: Add nullable column (instant metadata change)
ALTER TABLE user_events ADD COLUMN score INT;

-- Step B: Backfill in batches — each batch completes quickly
-- Run this repeatedly until 0 rows are updated
DO $$
DECLARE
    rows_updated INT;
BEGIN
    LOOP
        UPDATE user_events
        SET score = 0
        WHERE id IN (
            SELECT id FROM user_events
            WHERE score IS NULL
            LIMIT 10000
        );
        GET DIAGNOSTICS rows_updated = ROW_COUNT;
        EXIT WHEN rows_updated = 0;
        RAISE NOTICE 'Updated % rows', rows_updated;
    END LOOP;
END $$;

-- Step C: Add NOT NULL — validates instantly since all rows now have a value
ALTER TABLE user_events ALTER COLUMN score SET NOT NULL;

-- Step D: Verify no NULLs remain
SELECT COUNT(*) AS null_count FROM user_events WHERE score IS NULL;`
      },
      {
        title: 'Step 4: CREATE INDEX CONCURRENTLY',
        instruction: 'A standard CREATE INDEX acquires a ShareLock on the table, blocking all writes for the duration of the build. On a large table that can take many minutes. CREATE INDEX CONCURRENTLY builds the index in the background using multiple table scans — it only takes brief locks at the start and end. Reads and writes continue normally throughout. The trade-off: the build takes longer (roughly 2x), and if it fails you are left with an INVALID index that must be dropped and rebuilt. Always check pg_indexes after a concurrent build to confirm the index is VALID.',
        starterCode: `-- Using user_events from Step 2.

-- TODO: Create an index on user_events(user_id) using CREATE INDEX CONCURRENTLY.
-- This should complete without blocking any reads or writes.

-- After the index is built, verify it appears in pg_indexes and is valid:
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'user_events';

-- TODO: Also check for INVALID indexes (a concurrent build that was interrupted
-- leaves an invalid index that must be cleaned up):
-- SELECT indexname, indisvalid
-- FROM pg_class c
-- JOIN pg_index i ON i.indexrelid = c.oid
-- JOIN pg_class t ON t.oid = i.indrelid
-- WHERE t.relname = 'user_events';

-- TODO: Run EXPLAIN ANALYZE on a query filtering by user_id to confirm
-- the index is used.`,
        hints: [
          'CREATE INDEX CONCURRENTLY idx_user_events_user_id ON user_events(user_id);',
          'Cannot run inside a transaction block — run it outside BEGIN/COMMIT',
          'If interrupted, DROP INDEX CONCURRENTLY idx_user_events_user_id; then rebuild',
          'indisvalid = true in pg_index confirms the index is usable',
          'See: PostgreSQL docs "CREATE INDEX CONCURRENTLY" — https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY'
        ],
        expectedOutput: `Index created without blocking writes
pg_indexes shows: idx_user_events_user_id on user_events(user_id)
indisvalid = true
EXPLAIN ANALYZE shows "Index Scan using idx_user_events_user_id"`,
        solution: `-- Build the index without blocking writes
-- NOTE: must run outside a transaction block
CREATE INDEX CONCURRENTLY idx_user_events_user_id
ON user_events(user_id);

-- Verify the index exists and is valid
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'user_events';

-- Check for INVALID indexes (concurrent build interrupted)
SELECT
    c.relname  AS index_name,
    i.indisvalid AS is_valid
FROM pg_class c
JOIN pg_index i ON i.indexrelid = c.oid
JOIN pg_class t ON t.oid = i.indrelid
WHERE t.relname = 'user_events';

-- Confirm the index is used by the query planner
EXPLAIN ANALYZE
SELECT * FROM user_events WHERE user_id = 42;`
      },
      {
        title: 'Step 5: Constraint Validation Split — NOT VALID + VALIDATE CONSTRAINT',
        instruction: 'Adding a foreign key or CHECK constraint normally acquires a ShareRowExclusiveLock and scans every existing row to validate it — blocking writes for the duration. The NOT VALID option splits this into two steps: (1) add the constraint with NOT VALID — this immediately enforces it on new inserts and updates but skips the historical scan, taking only a brief lock; (2) VALIDATE CONSTRAINT — scans existing rows in a separate transaction using a weaker lock that allows concurrent reads and writes. This is the safe pattern for adding constraints to live, high-traffic tables.',
        starterCode: `-- Setup: create a referenced table and a large child table
CREATE TABLE users (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO users (name)
SELECT 'user_' || i FROM generate_series(1, 1000) i;

-- Add user_id to user_events (from previous steps)
-- (If user_events already has a user_id column as INT, we can add the FK)

-- TODO Step A: Add the FK constraint with NOT VALID.
-- This enforces the FK on new rows immediately but skips scanning existing rows.
-- ALTER TABLE user_events
--   ADD CONSTRAINT fk_user_events_user
--   FOREIGN KEY (user_id) REFERENCES users(id)
--   NOT VALID;

-- TODO Step B: In a separate transaction, validate the constraint.
-- PostgreSQL acquires only ShareUpdateExclusiveLock — reads and writes continue.
-- ALTER TABLE user_events VALIDATE CONSTRAINT fk_user_events_user;

-- TODO Step C: Confirm the constraint is now valid using pg_constraint:
-- SELECT conname, convalidated
-- FROM pg_constraint
-- WHERE conrelid = 'user_events'::regclass;`,
        hints: [
          'ADD CONSTRAINT ... NOT VALID — enforces on new writes immediately; skips historical scan',
          'VALIDATE CONSTRAINT — held lock is ShareUpdateExclusiveLock, compatible with reads and most writes',
          'If validation finds a bad row, it will ERROR — fix the data first, then re-validate',
          'convalidated = true in pg_constraint means the constraint covers all rows',
          'See: PostgreSQL docs "ALTER TABLE ... NOT VALID" — https://www.postgresql.org/docs/current/sql-altertable.html'
        ],
        expectedOutput: `Step A: FK added with NOT VALID — completes instantly, no historical scan
Step B: VALIDATE CONSTRAINT — runs without blocking reads or writes
Step C: pg_constraint shows convalidated = true for fk_user_events_user`,
        solution: `-- Ensure user_id values in user_events are within the users range
-- (Our seed data used random() * 10000 but only 1000 users exist — fix first)
UPDATE user_events SET user_id = (user_id % 1000) + 1;

-- Step A: Add FK as NOT VALID — new inserts/updates are checked immediately,
-- but existing rows are NOT scanned yet (fast, minimal lock)
ALTER TABLE user_events
    ADD CONSTRAINT fk_user_events_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    NOT VALID;

-- Step B: Validate the constraint in a separate transaction.
-- Uses ShareUpdateExclusiveLock — reads and writes are NOT blocked.
ALTER TABLE user_events VALIDATE CONSTRAINT fk_user_events_user;

-- Step C: Confirm constraint is fully valid
SELECT
    conname        AS constraint_name,
    contype        AS type,        -- 'f' = foreign key
    convalidated   AS is_valid
FROM pg_constraint
WHERE conrelid = 'user_events'::regclass;`
      }
    ]
  }
];
