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
Row distribution: ~33% pending, ~20% cancelled, ~47% completed`,
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
  }
];
