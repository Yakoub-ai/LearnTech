export const labs = [
  // ============================================================
  // DS-LAB-1: Exploratory Data Analysis (copied from interactiveLabs.js)
  // ============================================================
  {
    id: 'ds-lab-1',
    roleId: 'data-scientist',
    level: 'beginner',
    title: 'Exploratory Data Analysis',
    description: 'Perform a complete EDA workflow: load data, compute statistics, visualize distributions, and extract insights.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before performing exploratory data analysis, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+ and a virtual environment. This lab uses only the Python standard library (including the math module) — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Load and Inspect Data',
        instruction: 'Create functions to load a dataset and compute basic descriptive statistics.',
        starterCode: `# EDA — Step 2: Load and Inspect
# Working with a sample employee dataset

dataset = [
    {"name": "Alice", "dept": "Engineering", "salary": 95000, "years": 5, "rating": 4.2},
    {"name": "Bob", "dept": "Marketing", "salary": 72000, "years": 3, "rating": 3.8},
    {"name": "Charlie", "dept": "Engineering", "salary": 110000, "years": 8, "rating": 4.5},
    {"name": "Diana", "dept": "Sales", "salary": 68000, "years": 2, "rating": 4.0},
    {"name": "Eve", "dept": "Engineering", "salary": 105000, "years": 6, "rating": 4.7},
    {"name": "Frank", "dept": "Marketing", "salary": 78000, "years": 4, "rating": 3.5},
    {"name": "Grace", "dept": "Sales", "salary": 71000, "years": 3, "rating": 4.1},
    {"name": "Hank", "dept": "Engineering", "salary": 98000, "years": 7, "rating": 3.9},
]

def describe_column(data, column):
    """Compute statistics for a numeric column.
    Returns: dict with count, mean, min, max, std_dev
    """
    # TODO: Extract values, compute stats
    pass

# Describe salary and rating columns
for col in ['salary', 'years', 'rating']:
    stats = describe_column(dataset, col)
    print(f"\\n{col}: {stats}")`,
        hints: [
          'Extract values: values = [row[column] for row in data]',
          'Mean: sum(values) / len(values)',
          'Std dev: sqrt(sum((x - mean)^2 for x in values) / len(values))'
        ],
        expectedOutput: `salary: {count: 8, mean: 87125, min: 68000, max: 110000, ...}
years: {count: 8, mean: 4.75, min: 2, max: 8, ...}
rating: {count: 8, mean: 4.09, min: 3.5, max: 4.7, ...}`,
        solution: `import math

def describe_column(data, column):
    values = [row[column] for row in data]
    n = len(values)
    mean = sum(values) / n
    variance = sum((x - mean) ** 2 for x in values) / n
    return {
        'count': n,
        'mean': round(mean, 2),
        'min': min(values),
        'max': max(values),
        'std_dev': round(math.sqrt(variance), 2)
    }

for col in ['salary', 'years', 'rating']:
    stats = describe_column(dataset, col)
    print(f"\\n{col}: {stats}")`
      },
      {
        title: 'Step 3: Group and Aggregate',
        instruction: 'Group data by department and compute aggregate statistics to find patterns.',
        starterCode: `# EDA — Step 3: Group and Aggregate

def group_by(data, key):
    """Group records by a key field.
    Returns: dict mapping group values to lists of records
    """
    # TODO: Group records
    pass

def aggregate_groups(groups, value_column):
    """For each group, compute count, mean, min, max of a value column.
    Returns: dict mapping group name to stats dict
    """
    # TODO: Compute stats per group
    pass

# Analyze salary by department
dept_groups = group_by(dataset, 'dept')
dept_salary = aggregate_groups(dept_groups, 'salary')

print("=== Salary by Department ===")
for dept, stats in dept_salary.items():
    print(f"{dept}: avg=\${stats['mean']:,.0f}, range=\${stats['min']:,}-\${stats['max']:,}")`,
        hints: [
          'Use dict.setdefault(key, []).append(record) for grouping',
          'Reuse the statistics logic from Step 2',
          'Format currency with f"\${value:,.0f}"'
        ],
        expectedOutput: `=== Salary by Department ===
Engineering: avg=$102,000, range=$95,000-$110,000
Marketing: avg=$75,000, range=$72,000-$78,000
Sales: avg=$69,500, range=$68,000-$71,000`,
        solution: `def group_by(data, key):
    groups = {}
    for record in data:
        group_key = record[key]
        groups.setdefault(group_key, []).append(record)
    return groups

def aggregate_groups(groups, value_column):
    result = {}
    for group_name, records in groups.items():
        values = [r[value_column] for r in records]
        n = len(values)
        result[group_name] = {
            'count': n,
            'mean': sum(values) / n,
            'min': min(values),
            'max': max(values),
        }
    return result

dept_groups = group_by(dataset, 'dept')
dept_salary = aggregate_groups(dept_groups, 'salary')

print("=== Salary by Department ===")
for dept, stats in dept_salary.items():
    print(f"{dept}: avg=\${stats['mean']:,.0f}, range=\${stats['min']:,}-\${stats['max']:,}")`
      },
      {
        title: 'Step 4: Find Correlations',
        instruction: 'Calculate the correlation between years of experience and salary to determine if there is a relationship.',
        starterCode: `# EDA — Step 4: Correlation Analysis

def correlation(data, col_x, col_y):
    """Calculate Pearson correlation coefficient between two columns.

    r = sum((xi - mean_x)(yi - mean_y)) / sqrt(sum((xi-mean_x)^2) * sum((yi-mean_y)^2))

    Returns: float between -1 and 1
    """
    # TODO: Implement Pearson correlation
    pass

# Test correlations
pairs = [
    ('years', 'salary'),
    ('years', 'rating'),
    ('salary', 'rating'),
]

print("=== Correlation Matrix ===")
for col_x, col_y in pairs:
    r = correlation(dataset, col_x, col_y)
    strength = 'strong' if abs(r) > 0.7 else 'moderate' if abs(r) > 0.4 else 'weak'
    print(f"{col_x} vs {col_y}: r={r:.3f} ({strength})")`,
        hints: [
          'First compute mean_x and mean_y',
          'Numerator: sum of (xi - mean_x) * (yi - mean_y)',
          'Denominator: sqrt(sum_sq_x * sum_sq_y) where sum_sq is sum of squared deviations'
        ],
        expectedOutput: `=== Correlation Matrix ===
years vs salary: r=0.9xx (strong)
years vs rating: r=0.xxx (weak/moderate)
salary vs rating: r=0.xxx (moderate)`,
        solution: `import math

def correlation(data, col_x, col_y):
    xs = [r[col_x] for r in data]
    ys = [r[col_y] for r in data]
    n = len(xs)
    mean_x = sum(xs) / n
    mean_y = sum(ys) / n

    numerator = sum((x - mean_x) * (y - mean_y) for x, y in zip(xs, ys))
    sum_sq_x = sum((x - mean_x) ** 2 for x in xs)
    sum_sq_y = sum((y - mean_y) ** 2 for y in ys)
    denominator = math.sqrt(sum_sq_x * sum_sq_y)

    if denominator == 0:
        return 0
    return numerator / denominator

pairs = [
    ('years', 'salary'),
    ('years', 'rating'),
    ('salary', 'rating'),
]

print("=== Correlation Matrix ===")
for col_x, col_y in pairs:
    r = correlation(dataset, col_x, col_y)
    strength = 'strong' if abs(r) > 0.7 else 'moderate' if abs(r) > 0.4 else 'weak'
    print(f"{col_x} vs {col_y}: r={r:.3f} ({strength})")`
      },
      {
        title: 'Step 5: Generate an EDA Report',
        instruction: 'Tie everything together into a comprehensive EDA report function that summarizes the dataset.',
        starterCode: `# EDA — Step 5: Full Report

def eda_report(data, numeric_cols, group_col=None):
    """Generate a complete EDA report.

    Sections:
    1. Dataset overview (rows, columns)
    2. Descriptive stats for each numeric column
    3. Group analysis (if group_col provided)
    4. Top correlations between numeric columns
    5. Key insights (automated observations)
    """
    # TODO: Build and print a comprehensive report
    pass

# Generate the report
eda_report(
    dataset,
    numeric_cols=['salary', 'years', 'rating'],
    group_col='dept'
)`,
        hints: [
          'Reuse describe_column, group_by, aggregate_groups, and correlation',
          'For insights, check for strong correlations (|r| > 0.7) and group differences',
          'Format the output with clear section headers and alignment'
        ],
        expectedOutput: `=== EDA REPORT ===

DATASET: 8 rows, 5 columns

DESCRIPTIVE STATISTICS:
  salary: mean=$87,125 std=$14,xxx ...
  years: mean=4.75 std=1.xx ...
  ...

GROUP ANALYSIS (by dept):
  Engineering: 4 employees, avg salary $102,000
  ...

CORRELATIONS:
  years <-> salary: 0.9xx (strong positive)
  ...

KEY INSIGHTS:
  Strong correlation between years and salary
  ...`,
        solution: `def eda_report(data, numeric_cols, group_col=None):
    print("=" * 50)
    print("EDA REPORT")
    print("=" * 50)

    # 1. Overview
    cols = list(data[0].keys()) if data else []
    print(f"\\nDATASET: {len(data)} rows, {len(cols)} columns")
    print(f"Columns: {', '.join(cols)}")

    # 2. Descriptive stats
    print(f"\\nDESCRIPTIVE STATISTICS:")
    for col in numeric_cols:
        stats = describe_column(data, col)
        print(f"  {col}: mean={stats['mean']}, std={stats['std_dev']}, range=[{stats['min']}, {stats['max']}]")

    # 3. Group analysis
    if group_col:
        print(f"\\nGROUP ANALYSIS (by {group_col}):")
        groups = group_by(data, group_col)
        for col in numeric_cols:
            agg = aggregate_groups(groups, col)
            for grp, stats in agg.items():
                print(f"  {grp} — {col}: n={stats['count']}, mean={stats['mean']:.1f}")

    # 4. Correlations
    print(f"\\nCORRELATIONS:")
    insights = []
    for i, col_x in enumerate(numeric_cols):
        for col_y in numeric_cols[i+1:]:
            r = correlation(data, col_x, col_y)
            direction = "positive" if r > 0 else "negative"
            strength = "strong" if abs(r) > 0.7 else "moderate" if abs(r) > 0.4 else "weak"
            print(f"  {col_x} <-> {col_y}: {r:.3f} ({strength} {direction})")
            if abs(r) > 0.7:
                insights.append(f"Strong {direction} correlation between {col_x} and {col_y}")

    # 5. Insights
    print(f"\\nKEY INSIGHTS:")
    for insight in insights:
        print(f"  {insight}")

eda_report(dataset, numeric_cols=['salary', 'years', 'rating'], group_col='dept')`
      }
    ]
  },

  // ============================================================
  // DS-LAB-2: Pandas Exploratory Data Analysis (from ds-1)
  // ============================================================
  {
    id: 'ds-lab-2',
    roleId: 'data-scientist',
    level: 'beginner',
    title: 'Pandas EDA on Sales Data',
    description: 'Master a professional EDA workflow using Pandas: load CSV data, profile its structure, handle missing values, compute group aggregations, and surface actionable business insights.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before running Pandas EDA, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, a virtual environment, and pandas and numpy installed (`pip install pandas numpy`).',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'Run `pip install pandas numpy` then verify: `python -c "import pandas as pd, numpy as np; print(pd.__version__, np.__version__)"`'
        ],
        expectedOutput: 'Python 3.12.x\npandas 2.x.x\nnumpy 1.x.x',
        solution: null
      },
      {
        title: 'Step 2: Load and Profile the Dataset',
        instruction: `Load a sales CSV and immediately profile it. WHY: You cannot trust data you have not inspected. HOW: Use df.head(), df.info(), and df.describe() together — they give shape, dtypes, non-null counts, and numeric summaries in seconds. Always check isnull().sum() before any analysis so missing data does not silently skew your results.`,
        starterCode: `import pandas as pd
import numpy as np
import io

csv_data = """order_id,region,product,revenue,units_sold,customer_id,order_date
1001,North,Widget A,1500.00,30,C001,2024-01-15
1002,South,Widget B,2200.50,44,C002,2024-01-16
1003,North,Widget A,1800.00,36,C003,2024-01-17
1004,East,Widget C,,20,C004,2024-01-18
1005,West,Widget B,900.25,18,C005,2024-01-19
1006,South,Widget A,3100.00,62,C001,2024-01-20
1007,East,Widget C,750.00,15,C006,2024-01-21
1008,West,Widget A,2400.00,48,C007,2024-01-22
1009,North,Widget B,1100.00,,C008,2024-01-23
1010,South,Widget C,600.00,12,C002,2024-01-24
"""

df = pd.read_csv(io.StringIO(csv_data))

# TODO 1: Print shape (rows, columns)
# TODO 2: Print column dtypes using df.info()
# TODO 3: Print descriptive statistics with df.describe()
# TODO 4: Print count of missing values per column
`,
        hints: [
          'df.shape returns (rows, cols) — print as f"Shape: {df.shape}"',
          'df.info() prints dtypes and non-null counts all at once',
          'df.isnull().sum() returns a Series — filter it: df.isnull().sum()[df.isnull().sum() > 0]'
        ],
        expectedOutput: `Shape: (10, 7)
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 10 entries ...
dtypes: float64(2), int64(1), object(4)

       revenue  units_sold
count      9.0         9.0
mean    ...

Missing values:
revenue       1
units_sold    1`,
        solution: `import pandas as pd
import numpy as np
import io

csv_data = """order_id,region,product,revenue,units_sold,customer_id,order_date
1001,North,Widget A,1500.00,30,C001,2024-01-15
1002,South,Widget B,2200.50,44,C002,2024-01-16
1003,North,Widget A,1800.00,36,C003,2024-01-17
1004,East,Widget C,,20,C004,2024-01-18
1005,West,Widget B,900.25,18,C005,2024-01-19
1006,South,Widget A,3100.00,62,C001,2024-01-20
1007,East,Widget C,750.00,15,C006,2024-01-21
1008,West,Widget A,2400.00,48,C007,2024-01-22
1009,North,Widget B,1100.00,,C008,2024-01-23
1010,South,Widget C,600.00,12,C002,2024-01-24
"""

df = pd.read_csv(io.StringIO(csv_data))

print(f"Shape: {df.shape}")
print()
df.info()
print()
print(df.describe().round(2))
print()
missing = df.isnull().sum()
missing = missing[missing > 0]
print("Missing values:")
print(missing)`
      },
      {
        title: 'Step 3: Handle Missing Values',
        instruction: `Fill missing data thoughtfully. WHY: Dropping rows wastes data; naive zero-fill distorts distributions. HOW: Use median imputation for skewed numeric columns (robust to outliers) and mode for categoricals. Document every imputation decision — reproducibility is a core DS discipline. After filling, verify isnull().sum() returns zero for the targeted columns.`,
        starterCode: `# Continuing from Step 2 — df is already loaded

# TODO 1: Fill missing 'revenue' with the median revenue
# TODO 2: Fill missing 'units_sold' with the median units_sold (cast to int)
# TODO 3: Verify no nulls remain in those columns
# TODO 4: Print the filled rows to confirm

print("Before imputation:")
print(df[df['revenue'].isna() | df['units_sold'].isna()])
`,
        hints: [
          'df["revenue"] = df["revenue"].fillna(df["revenue"].median())',
          'Cast units_sold to int after filling: df["units_sold"] = df["units_sold"].fillna(...).astype(int)',
          'After filling, assert df["revenue"].isnull().sum() == 0'
        ],
        expectedOutput: `Before imputation:
  order_id region   product revenue  units_sold customer_id  order_date
3     1004   East  Widget C     NaN        20.0        C004  2024-01-18
8     1009  North  Widget B  1100.0         NaN        C008  2024-01-23

After imputation: no nulls remaining in revenue or units_sold.
revenue filled with median: 1500.0
units_sold filled with median: 30`,
        solution: `print("Before imputation:")
print(df[df['revenue'].isna() | df['units_sold'].isna()])

rev_median = df['revenue'].median()
units_median = df['units_sold'].median()

df['revenue'] = df['revenue'].fillna(rev_median)
df['units_sold'] = df['units_sold'].fillna(units_median).astype(int)

print(f"\\nrevenue filled with median: {rev_median}")
print(f"units_sold filled with median: {units_median}")

assert df['revenue'].isnull().sum() == 0
assert df['units_sold'].isnull().sum() == 0
print("\\nAfter imputation: no nulls remaining in revenue or units_sold.")`
      },
      {
        title: 'Step 4: Group Aggregations and Correlation',
        instruction: `Aggregate by region and product to surface business patterns, then measure numeric relationships. WHY: GroupBy summaries reveal which segments drive revenue. Correlation quantifies linear relationships and flags multicollinearity before modelling. HOW: Use groupby().agg() with named aggregations for clarity, then df.corr() to get a full matrix.`,
        starterCode: `# Continuing from Step 3 — df is clean

# TODO 1: Aggregate by 'region' — compute total revenue, mean units_sold, and order count
# TODO 2: Sort results by total revenue descending
# TODO 3: Aggregate by 'product' — compute total revenue and mean revenue
# TODO 4: Print the Pearson correlation between revenue and units_sold
`,
        hints: [
          'Use named agg: df.groupby("region").agg(total_rev=("revenue","sum"), avg_units=("units_sold","mean"), orders=("order_id","count"))',
          'Chain .sort_values("total_rev", ascending=False) for ranking',
          'df[["revenue","units_sold"]].corr() gives a 2x2 matrix; extract the scalar with .loc["revenue","units_sold"]'
        ],
        expectedOutput: `=== Revenue by Region ===
   region  total_rev  avg_units  orders
0   South     5900.5       39.3       3
1   North     4400.0       33.0       3
...

=== Revenue by Product ===
...

Correlation (revenue vs units_sold): 0.98`,
        solution: `import pandas as pd

region_agg = (
    df.groupby('region')
      .agg(
          total_rev=('revenue', 'sum'),
          avg_units=('units_sold', 'mean'),
          orders=('order_id', 'count')
      )
      .sort_values('total_rev', ascending=False)
      .reset_index()
)
print("=== Revenue by Region ===")
print(region_agg.round(2).to_string(index=False))

product_agg = (
    df.groupby('product')
      .agg(
          total_rev=('revenue', 'sum'),
          avg_rev=('revenue', 'mean')
      )
      .sort_values('total_rev', ascending=False)
      .reset_index()
)
print("\\n=== Revenue by Product ===")
print(product_agg.round(2).to_string(index=False))

r = df[['revenue', 'units_sold']].corr().loc['revenue', 'units_sold']
print(f"\\nCorrelation (revenue vs units_sold): {r:.2f}")`
      },
      {
        title: 'Step 5: Derive Insights and Save Results',
        instruction: `Extract actionable insights and persist your clean dataset. WHY: Analysis that is not documented or saved is analysis that gets repeated. HOW: Compute a derived metric (revenue per unit), flag outliers using the IQR method, print a readable summary, and export the enriched dataframe to CSV. In production you would write to a data warehouse or feature store instead.`,
        starterCode: `# Continuing from Step 4 — df is clean and aggregations are computed

# TODO 1: Add a derived column 'rev_per_unit' = revenue / units_sold
# TODO 2: Flag outliers in 'revenue' using the IQR method (1.5 * IQR rule)
# TODO 3: Print a final insight summary — top region, top product, outlier count
# TODO 4: Save the enriched df to 'sales_enriched.csv' (index=False)
`,
        hints: [
          'IQR = Q3 - Q1; outlier if value < Q1 - 1.5*IQR or > Q3 + 1.5*IQR',
          'Use df["revenue"].quantile(0.25) and .quantile(0.75)',
          'df.to_csv("sales_enriched.csv", index=False) — check the file was created with import os; os.path.exists(...)'
        ],
        expectedOutput: `=== Final Insights ===
Top region by revenue: South ($5,900.50)
Top product by revenue: Widget A
Average revenue per unit: $46.23
Outliers in revenue: 0 rows

Saved enriched dataset: sales_enriched.csv (10 rows, 9 columns)`,
        solution: `import os

df['rev_per_unit'] = (df['revenue'] / df['units_sold']).round(2)

Q1 = df['revenue'].quantile(0.25)
Q3 = df['revenue'].quantile(0.75)
IQR = Q3 - Q1
df['revenue_outlier'] = (
    (df['revenue'] < Q1 - 1.5 * IQR) |
    (df['revenue'] > Q3 + 1.5 * IQR)
)

top_region = region_agg.iloc[0]
top_product = product_agg.iloc[0]
outlier_count = df['revenue_outlier'].sum()

print("=== Final Insights ===")
print(f"Top region by revenue: {top_region['region']} (\${top_region['total_rev']:,.2f})")
print(f"Top product by revenue: {top_product['product']}")
print(f"Average revenue per unit: \${df['rev_per_unit'].mean():,.2f}")
print(f"Outliers in revenue: {outlier_count} rows")

df.to_csv('sales_enriched.csv', index=False)
print(f"\\nSaved enriched dataset: sales_enriched.csv ({df.shape[0]} rows, {df.shape[1]} columns)")`
      }
    ]
  },

  // ============================================================
  // DS-LAB-3: Scikit-learn Model Training (from ds-2)
  // ============================================================
  {
    id: 'ds-lab-3',
    roleId: 'data-scientist',
    level: 'mid',
    title: 'Scikit-learn Classification Pipeline',
    description: 'Build a production-grade ML classification pipeline: split data correctly, scale features, train a Random Forest, evaluate with multiple metrics, and interpret feature importance.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before running data science experiments, ensure your environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, Jupyter Notebook or JupyterLab, pandas, numpy, scikit-learn, matplotlib, and any ML-specific libraries. Set up a virtual environment and install all dependencies before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `jupyter --version` to verify Jupyter is installed',
          'Test: `import pandas as pd; print(pd.__version__)`'
        ],
        expectedOutput: 'Python 3.12.x\nJupyter 7.x.x\npandas 2.x.x, numpy 1.x.x, scikit-learn 1.x.x all installed',
        solution: null
      },
      {
        title: 'Step 2: Prepare Data with a Stratified Split',
        instruction: `Split your dataset the right way. WHY: A naive random split can leave your test set class-imbalanced, making metrics misleading. HOW: Pass stratify=y to train_test_split so every split reflects the original class distribution. Always set random_state for reproducibility — without it, results change on every run and you cannot compare experiments.`,
        starterCode: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import numpy as np

# Load the breast cancer dataset (binary classification, 30 features)
data = load_breast_cancer()
X, y = data.data, data.target
feature_names = data.feature_names

print(f"Dataset shape: {X.shape}")
print(f"Class distribution: {dict(zip(*np.unique(y, return_counts=True)))}")

# TODO 1: Split into train/test using 80/20, stratify on y, random_state=42
# TODO 2: Print train and test shapes
# TODO 3: Verify class balance is preserved in both splits (use np.bincount)
`,
        hints: [
          'train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)',
          'np.bincount(y_train) / len(y_train) gives class proportions',
          'Both train and test proportions should be within ~1% of the full dataset proportions'
        ],
        expectedOutput: `Dataset shape: (569, 30)
Class distribution: {0: 212, 1: 357}

Train: (455, 30) | Test: (114, 30)
Train class proportions: [0.373 0.627]
Test class proportions:  [0.368 0.632]
Stratification preserved class balance`,
        solution: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import numpy as np

data = load_breast_cancer()
X, y = data.data, data.target
feature_names = data.feature_names

print(f"Dataset shape: {X.shape}")
print(f"Class distribution: {dict(zip(*np.unique(y, return_counts=True)))}")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\\nTrain: {X_train.shape} | Test: {X_test.shape}")

train_props = np.bincount(y_train) / len(y_train)
test_props  = np.bincount(y_test)  / len(y_test)
print(f"Train class proportions: {train_props.round(3)}")
print(f"Test class proportions:  {test_props.round(3)}")
print("Stratification preserved class balance")`
      },
      {
        title: 'Step 3: Scale Features and Train the Model',
        instruction: `Scale then fit — in that order. WHY: Tree-based models like Random Forest are scale-invariant, but StandardScaler is included here to demonstrate the correct Pipeline pattern for models that are not (Logistic Regression, SVM, KNN). Fitting the scaler on training data only prevents data leakage — a common mistake that inflates test performance. HOW: Fit on X_train, transform both X_train and X_test.`,
        starterCode: `from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# TODO 1: Instantiate StandardScaler and fit ONLY on X_train
# TODO 2: Transform both X_train and X_test
# TODO 3: Train a RandomForestClassifier (n_estimators=100, random_state=42)
# TODO 4: Print training accuracy (model.score on scaled train data)

# X_train, X_test, y_train, y_test already defined from Step 2
`,
        hints: [
          'scaler = StandardScaler(); X_train_s = scaler.fit_transform(X_train)',
          'X_test_s = scaler.transform(X_test)  # NOT fit_transform — no leakage!',
          'model = RandomForestClassifier(n_estimators=100, random_state=42); model.fit(X_train_s, y_train)'
        ],
        expectedOutput: `Scaler fitted on 455 training samples
RandomForest trained with 100 trees
Training accuracy: 1.000 (expected — trees can overfit training data)`,
        solution: `from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)
print(f"Scaler fitted on {X_train_s.shape[0]} training samples")

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_s, y_train)
print(f"RandomForest trained with 100 trees")

train_acc = model.score(X_train_s, y_train)
print(f"Training accuracy: {train_acc:.3f} (expected — trees can overfit training data)")`
      },
      {
        title: 'Step 4: Evaluate with Multiple Metrics',
        instruction: `Accuracy alone is not enough. WHY: On imbalanced datasets, a model that always predicts the majority class can achieve high accuracy while being useless. Precision, recall, and F1 give a fuller picture. In medical contexts (like cancer detection) recall matters most — false negatives cost lives. HOW: Use sklearn.metrics to compute all four, then print a classification_report for a complete breakdown.`,
        starterCode: `from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, classification_report, confusion_matrix
)

# TODO 1: Generate predictions on the test set
# TODO 2: Print accuracy, precision, recall, and F1 (use average='weighted')
# TODO 3: Print the full classification_report
# TODO 4: Print the confusion matrix and label its rows/columns

# model, X_test_s, y_test, data already defined from previous steps
`,
        hints: [
          'y_pred = model.predict(X_test_s)',
          'precision_score(y_test, y_pred, average="weighted") for multi-class safe averaging',
          'classification_report(y_test, y_pred, target_names=data.target_names) includes per-class precision/recall/F1'
        ],
        expectedOutput: `Accuracy:  0.965
Precision: 0.965
Recall:    0.965
F1:        0.965

              precision  recall  f1-score  support
   malignant       0.95    0.95      0.95       42
      benign       0.97    0.97      0.97       72
    accuracy                         0.96      114

Confusion Matrix:
[[40  2]
 [ 2 70]]`,
        solution: `from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, classification_report, confusion_matrix
)

y_pred = model.predict(X_test_s)

print(f"Accuracy:  {accuracy_score(y_test, y_pred):.3f}")
print(f"Precision: {precision_score(y_test, y_pred, average='weighted'):.3f}")
print(f"Recall:    {recall_score(y_test, y_pred, average='weighted'):.3f}")
print(f"F1:        {f1_score(y_test, y_pred, average='weighted'):.3f}")

print()
print(classification_report(y_test, y_pred, target_names=data.target_names))

cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)`
      },
      {
        title: 'Step 5: Interpret Feature Importance',
        instruction: `Understand what the model learned. WHY: Black-box models erode trust. Feature importance gives stakeholders confidence and guides future feature engineering by showing which signals matter. HOW: Random Forest exposes feature_importances_ — a normalized array summing to 1. Sort descending and display the top 10. In production, complement this with SHAP values for individual prediction explanations.`,
        starterCode: `import pandas as pd

# TODO 1: Extract feature importances from model.feature_importances_
# TODO 2: Create a DataFrame with columns ['feature', 'importance'], sorted descending
# TODO 3: Print the top 10 most important features
# TODO 4: Print a text bar chart of the top 5 using block characters scaled to importance

# model, feature_names already defined from previous steps
`,
        hints: [
          'pd.DataFrame({"feature": feature_names, "importance": model.feature_importances_})',
          '.sort_values("importance", ascending=False).reset_index(drop=True)',
          'For the bar: chr(9608) * int(importance * 50) gives a solid bar scaled to 50 chars max'
        ],
        expectedOutput: `Top 10 Feature Importances:
   rank                    feature  importance
      1          worst perimeter    0.1423
      2             worst radius    0.1287
      3               worst area    0.1102
      ...

Top 5 Visual Bar:
worst perimeter  [====================] 0.142
worst radius     [==================  ] 0.129
...`,
        solution: `import pandas as pd

importance_df = (
    pd.DataFrame({'feature': feature_names, 'importance': model.feature_importances_})
    .sort_values('importance', ascending=False)
    .reset_index(drop=True)
)
importance_df.index += 1
importance_df.index.name = 'rank'

print("Top 10 Feature Importances:")
print(importance_df.head(10).round(4).to_string())

print("\\nTop 5 Visual Bar:")
for _, row in importance_df.head(5).iterrows():
    bar_len = int(row['importance'] * 140)
    bar = '[' + '=' * bar_len + ' ' * (20 - min(bar_len, 20)) + ']'
    print(f"{row['feature']:30s} {bar} {row['importance']:.3f}")`
      }
    ]
  },

  // ============================================================
  // DS-LAB-4: Data Visualization with Matplotlib & Seaborn (from ds-3)
  // ============================================================
  {
    id: 'ds-lab-4',
    roleId: 'data-scientist',
    level: 'beginner',
    title: 'Data Visualization with Matplotlib & Seaborn',
    description: 'Create a professional four-panel analytical dashboard: distribution histograms, scatter plots with regression lines, box plots for category comparison, and time-series line charts.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building data visualisations, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, a virtual environment, and matplotlib, seaborn, and scipy installed (`pip install matplotlib seaborn pandas numpy scipy`).',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `pip install matplotlib seaborn pandas numpy scipy`',
          'Verify: `python -c "import matplotlib, seaborn, scipy; print(matplotlib.__version__, seaborn.__version__, scipy.__version__)"`'
        ],
        expectedOutput: 'Python 3.12.x\nmatplotlib 3.x.x\nseaborn 0.x.x\nscipy 1.x.x installed',
        solution: null
      },
      {
        title: 'Step 2: Generate Synthetic Data and Set Plot Style',
        instruction: `Build a reproducible synthetic dataset and establish a consistent visual style. WHY: Real datasets are not always available during learning, and numpy lets you generate controlled data with known properties so you can verify your plots are correct. A consistent seaborn theme improves readability and makes charts publication-ready in one line. HOW: Use np.random.seed() for reproducibility before any random generation.`,
        starterCode: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# TODO 1: Set random seed to 42 for reproducibility
# TODO 2: Generate a DataFrame with 200 rows and these columns:
#   - age: integers uniformly distributed between 22 and 65
#   - income: normally distributed, mean=55000, std=15000 (clip to min 20000)
#   - spending: income * 0.35 + normal noise (std=5000), clipped to min 5000
#   - category: 200 random choices from ['A', 'B', 'C']
#   - date: pd.date_range starting '2023-01-01', 200 days
# TODO 3: Set seaborn style to 'whitegrid' and context to 'notebook'
# TODO 4: Print df.describe() to verify distributions look sensible
`,
        hints: [
          'np.random.randint(22, 66, 200) for age; np.random.normal(55000, 15000, 200) for income',
          'np.clip(income, 20000, None) prevents negative salaries',
          'sns.set_style("whitegrid"); sns.set_context("notebook")'
        ],
        expectedOutput: `DataFrame shape: (200, 5)
         age        income      spending
count  200.00        200.00      200.00
mean    43.xx      55xxx.xx    19xxx.xx
std     12.xx      14xxx.xx     6xxx.xx
min     22.00      20000.00     5000.00`,
        solution: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

np.random.seed(42)

age      = np.random.randint(22, 66, 200)
income   = np.clip(np.random.normal(55000, 15000, 200), 20000, None)
spending = np.clip(income * 0.35 + np.random.normal(0, 5000, 200), 5000, None)
category = np.random.choice(['A', 'B', 'C'], 200)
date     = pd.date_range('2023-01-01', periods=200, freq='D')

df = pd.DataFrame({'age': age, 'income': income, 'spending': spending,
                   'category': category, 'date': date})

sns.set_style('whitegrid')
sns.set_context('notebook')

print(f"DataFrame shape: {df.shape}")
print(df[['age', 'income', 'spending']].describe().round(2))`
      },
      {
        title: 'Step 3: Build a Four-Panel Dashboard',
        instruction: `Compose four complementary charts in a 2x2 grid. WHY: A single chart rarely tells the whole story — distributions, relationships, category differences, and trends each answer a different question. A subplot grid lets stakeholders absorb all views at once. HOW: Use plt.subplots(2, 2, figsize=(14, 10)) to get four axes, then assign a distinct chart type to each. Always add titles and axis labels.`,
        starterCode: `# Continuing from Step 2 — df and libraries are already imported

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# TODO 1 — axes[0, 0]: Histogram of 'age' with 20 bins, black edge, blue fill
#   Title: 'Age Distribution'  X-label: 'Age'  Y-label: 'Count'

# TODO 2 — axes[0, 1]: Scatter of income (x) vs spending (y), alpha=0.4
#   Add a linear regression line using np.polyfit degree=1
#   Title: 'Income vs Spending'  Add axis labels

# TODO 3 — axes[1, 0]: Box plot of spending grouped by category
#   Use df.boxplot(column='spending', by='category', ax=axes[1,0])
#   Title: 'Spending by Category'  Suppress auto suptitle with plt.suptitle('')

# TODO 4 — axes[1, 1]: Line plot of cumulative income over date (first 60 rows)
#   Title: 'Cumulative Income Over Time'  Rotate x-ticks 45 degrees

plt.tight_layout()
plt.savefig('dashboard.png', dpi=150, bbox_inches='tight')
print("Dashboard saved to dashboard.png")
`,
        hints: [
          'axes[0,0].hist(df["age"], bins=20, edgecolor="black", color="steelblue")',
          'm, b = np.polyfit(df["income"], df["spending"], 1); axes[0,1].plot(sorted_x, m*sorted_x+b, "r-")',
          'axes[1,1].tick_params(axis="x", rotation=45) to rotate date labels'
        ],
        expectedOutput: `Dashboard saved to dashboard.png
Panel 1: Age histogram — bell-shaped around 40-45
Panel 2: Scatter with regression line — positive slope (income drives spending)
Panel 3: Box plots — categories A/B/C with similar medians
Panel 4: Cumulative income line — steadily increasing`,
        solution: `fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Panel 1: Histogram
axes[0, 0].hist(df['age'], bins=20, edgecolor='black', color='steelblue')
axes[0, 0].set_title('Age Distribution')
axes[0, 0].set_xlabel('Age')
axes[0, 0].set_ylabel('Count')

# Panel 2: Scatter + regression
axes[0, 1].scatter(df['income'], df['spending'], alpha=0.4, color='coral')
m, b = np.polyfit(df['income'], df['spending'], 1)
x_sorted = np.sort(df['income'])
axes[0, 1].plot(x_sorted, m * x_sorted + b, 'r-', linewidth=2, label=f'y={m:.2f}x+{b:.0f}')
axes[0, 1].set_title('Income vs Spending')
axes[0, 1].set_xlabel('Income ($)')
axes[0, 1].set_ylabel('Spending ($)')
axes[0, 1].legend()

# Panel 3: Box plot
df.boxplot(column='spending', by='category', ax=axes[1, 0])
axes[1, 0].set_title('Spending by Category')
axes[1, 0].set_xlabel('Category')
axes[1, 0].set_ylabel('Spending ($)')
plt.suptitle('')  # suppress pandas auto-title

# Panel 4: Cumulative line
subset = df.head(60).copy()
subset['cum_income'] = subset['income'].cumsum()
axes[1, 1].plot(subset['date'], subset['cum_income'], marker='o', markersize=3)
axes[1, 1].set_title('Cumulative Income Over Time')
axes[1, 1].set_xlabel('Date')
axes[1, 1].set_ylabel('Cumulative Income ($)')
axes[1, 1].tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.savefig('dashboard.png', dpi=150, bbox_inches='tight')
print("Dashboard saved to dashboard.png")`
      },
      {
        title: 'Step 4: Add Statistical Annotations',
        instruction: `Elevate charts from descriptive to analytical by embedding statistical context directly in the figure. WHY: A histogram without a mean line, or a scatter without an R2 annotation, forces readers to do extra mental work. Embedded stats make the key finding impossible to miss. HOW: Use ax.axvline() for reference lines, ax.text() for text overlays, and scipy.stats for statistical computations.`,
        starterCode: `from scipy import stats

# Re-draw the income histogram with statistical overlays
fig, ax = plt.subplots(figsize=(10, 5))

# TODO 1: Draw histogram of 'income' with 25 bins
# TODO 2: Add a vertical dashed red line at the mean
# TODO 3: Add a vertical dashed green line at the median
# TODO 4: Overlay a KDE (kernel density estimate) curve scaled to histogram height
#   Hint: compute KDE with scipy.stats.gaussian_kde, then scale by N * bin_width
# TODO 5: Add a text box in the upper right corner showing:
#   Mean, Median, Std, and Skew values

ax.set_title('Income Distribution with Statistical Overlays')
ax.set_xlabel('Income ($)')
ax.set_ylabel('Count')
ax.legend()
plt.tight_layout()
plt.savefig('income_annotated.png', dpi=150, bbox_inches='tight')
print("Annotated chart saved.")
`,
        hints: [
          'ax.axvline(df["income"].mean(), color="red", linestyle="--", label="Mean")',
          'kde = stats.gaussian_kde(df["income"]); x_range = np.linspace(min, max, 300); ax.plot(x_range, kde(x_range) * len(df) * bin_width)',
          'ax.text(0.97, 0.95, stats_text, transform=ax.transAxes, ha="right", va="top", bbox=dict(boxstyle="round", facecolor="wheat"))'
        ],
        expectedOutput: `Annotated chart saved.
Histogram with:
  - Mean line (red dashed) around $55,000
  - Median line (green dashed) close to mean
  - Smooth KDE curve following histogram shape
  - Stats text box: Mean/Median/Std/Skew values`,
        solution: `from scipy import stats

fig, ax = plt.subplots(figsize=(10, 5))

n, bins, _ = ax.hist(df['income'], bins=25, color='steelblue', edgecolor='black', alpha=0.7)
bin_width = bins[1] - bins[0]

mean_val   = df['income'].mean()
median_val = df['income'].median()
std_val    = df['income'].std()
skew_val   = df['income'].skew()

ax.axvline(mean_val,   color='red',   linestyle='--', linewidth=2, label='Mean')
ax.axvline(median_val, color='green', linestyle='--', linewidth=2, label='Median')

kde = stats.gaussian_kde(df['income'])
x_range = np.linspace(df['income'].min(), df['income'].max(), 300)
ax.plot(x_range, kde(x_range) * len(df) * bin_width, 'orange', linewidth=2, label='KDE')

stats_text = (
    f"Mean:   \${mean_val:,.0f}\\n"
    f"Median: \${median_val:,.0f}\\n"
    f"Std:    \${std_val:,.0f}\\n"
    f"Skew:   {skew_val:.2f}"
)
ax.text(0.97, 0.95, stats_text, transform=ax.transAxes, ha='right', va='top',
        fontsize=10, bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

ax.set_title('Income Distribution with Statistical Overlays')
ax.set_xlabel('Income ($)')
ax.set_ylabel('Count')
ax.legend()
plt.tight_layout()
plt.savefig('income_annotated.png', dpi=150, bbox_inches='tight')
print("Annotated chart saved.")`
      }
    ]
  },

  // ============================================================
  // DS-LAB-5: Cross-Validation Pipeline (from ds-4)
  // ============================================================
  {
    id: 'ds-lab-5',
    roleId: 'data-scientist',
    level: 'mid',
    title: 'Cross-Validation Model Comparison Pipeline',
    description: 'Build a robust model selection framework using stratified k-fold cross-validation: compare four classifiers with confidence intervals, select the best model, and tune it with GridSearchCV.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before running data science experiments, ensure your environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, Jupyter Notebook or JupyterLab, pandas, numpy, scikit-learn, matplotlib, and any ML-specific libraries. Set up a virtual environment and install all dependencies before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `jupyter --version` to verify Jupyter is installed',
          'Test: `import pandas as pd; print(pd.__version__)`'
        ],
        expectedOutput: 'Python 3.12.x\nJupyter 7.x.x\npandas 2.x.x, numpy 1.x.x, scikit-learn 1.x.x all installed',
        solution: null
      },
      {
        title: 'Step 2: Define Candidate Models in a Pipeline',
        instruction: `Wrap every model in a Pipeline that includes scaling. WHY: Without a Pipeline, you risk fitting the scaler on all folds during cross-validation, which is a form of data leakage. Pipelines apply all transformations within each fold automatically. HOW: Use sklearn.pipeline.Pipeline with steps=[("scaler", ...), ("model", ...)]. This pattern also makes deployment straightforward because the full transformation chain is encapsulated in one object.`,
        starterCode: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.datasets import load_breast_cancer

data = load_breast_cancer()
X, y = data.data, data.target

# TODO: Define a helper function build_pipeline(model) that returns a
# Pipeline with steps [("scaler", StandardScaler()), ("model", <estimator>)]

# TODO: Define a dict called 'candidates' mapping model name (str) to a Pipeline.
# Include these four models:
#   - "LogisticRegression": LogisticRegression(max_iter=1000)
#   - "RandomForest": RandomForestClassifier(n_estimators=100, random_state=42)
#   - "GradientBoosting": GradientBoostingClassifier(n_estimators=100, random_state=42)
#   - "SVM": SVC(kernel="rbf", probability=True)

# TODO: Print the number of candidates and confirm each value is a Pipeline instance
`,
        hints: [
          'def build_pipeline(model): return Pipeline([("scaler", StandardScaler()), ("model", model)])',
          'candidates = {"LogisticRegression": build_pipeline(LogisticRegression(max_iter=1000)), ...}',
          'isinstance(pipe, Pipeline) should return True for each entry'
        ],
        expectedOutput: `Defined 4 candidate pipelines:
  LogisticRegression : Pipeline(steps=[('scaler', StandardScaler()), ('model', LogisticRegression(...))])
  RandomForest       : Pipeline(...)
  GradientBoosting   : Pipeline(...)
  SVM                : Pipeline(...)`,
        solution: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.datasets import load_breast_cancer

data = load_breast_cancer()
X, y = data.data, data.target

def build_pipeline(model):
    return Pipeline([("scaler", StandardScaler()), ("model", model)])

candidates = {
    "LogisticRegression": build_pipeline(LogisticRegression(max_iter=1000)),
    "RandomForest":       build_pipeline(RandomForestClassifier(n_estimators=100, random_state=42)),
    "GradientBoosting":   build_pipeline(GradientBoostingClassifier(n_estimators=100, random_state=42)),
    "SVM":                build_pipeline(SVC(kernel="rbf", probability=True)),
}

print(f"Defined {len(candidates)} candidate pipelines:")
for name, pipe in candidates.items():
    print(f"  {name:20s}: {pipe}")`
      },
      {
        title: 'Step 3: Run Stratified K-Fold Cross-Validation',
        instruction: `Evaluate every candidate with 5-fold stratified CV and collect mean and std for four metrics. WHY: A single train/test split gives you one noisy estimate. K-fold gives K estimates — the mean is less biased and the std tells you how stable the model is. A model with a high mean but high std is risky in production. HOW: Use cross_validate with a StratifiedKFold object passed as the cv argument.`,
        starterCode: `from sklearn.model_selection import StratifiedKFold, cross_validate
import pandas as pd

scoring = ["accuracy", "precision_weighted", "recall_weighted", "f1_weighted"]
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

results = []

# TODO: For each (name, pipeline) in candidates.items():
#   1. Call cross_validate(pipe, X, y, cv=cv, scoring=scoring, return_train_score=False)
#   2. Build a result row dict with keys: 'model', and for each metric:
#      f'{metric}_mean' and f'{metric}_std' (both rounded to 4 dp)
#   3. Append to results and print one line: model name, accuracy mean +/- std

# TODO: Convert results to a DataFrame, sort by accuracy_mean descending
# TODO: Print the full results table
`,
        hints: [
          'scores = cross_validate(pipe, X, y, cv=cv, scoring=scoring, return_train_score=False)',
          'scores["test_accuracy"].mean() and .std() give the mean and std across 5 folds',
          'pd.DataFrame(results).sort_values("accuracy_mean", ascending=False)'
        ],
        expectedOutput: `LogisticRegression   accuracy=0.9736 +/- 0.0112
RandomForest         accuracy=0.9648 +/- 0.0183
GradientBoosting     accuracy=0.9649 +/- 0.0147
SVM                  accuracy=0.9736 +/- 0.0147

--- Model Comparison (sorted by accuracy) ---
              model  accuracy_mean  accuracy_std  f1_weighted_mean ...
  LogisticRegression         0.9736        0.0112            0.9735 ...`,
        solution: `from sklearn.model_selection import StratifiedKFold, cross_validate
import pandas as pd

scoring = ["accuracy", "precision_weighted", "recall_weighted", "f1_weighted"]
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

results = []
for name, pipe in candidates.items():
    scores = cross_validate(pipe, X, y, cv=cv, scoring=scoring, return_train_score=False)
    row = {"model": name}
    for metric in scoring:
        key = f"test_{metric}"
        row[f"{metric}_mean"] = round(scores[key].mean(), 4)
        row[f"{metric}_std"]  = round(scores[key].std(),  4)
    results.append(row)
    print(f"{name:25s}  accuracy={row['accuracy_mean']:.4f} +/- {row['accuracy_std']:.4f}")

results_df = pd.DataFrame(results).sort_values("accuracy_mean", ascending=False).reset_index(drop=True)
print("\\n--- Model Comparison (sorted by accuracy) ---")
print(results_df.to_string(index=False))`
      },
      {
        title: 'Step 4: Tune the Best Model with GridSearchCV',
        instruction: `Systematically search hyperparameters of the winning model. WHY: Default hyperparameters are rarely optimal. GridSearchCV exhaustively tests combinations while respecting CV fold boundaries, so you are not overfitting the hyperparameters. HOW: Define param_grid using Pipeline step name prefixes (e.g., "model__C" for Logistic Regression's C parameter), then fit on the full training set and evaluate on a held-out test set.`,
        starterCode: `from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.metrics import f1_score

best_name = results_df.iloc[0]['model']
best_pipe  = candidates[best_name]
print(f"Tuning: {best_name}")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# TODO 1: Define param_grids dict with an entry for each candidate model name.
#   For LogisticRegression: {'model__C': [0.01, 0.1, 1, 10, 100]}
#   For RandomForest: {'model__n_estimators': [50, 100, 200], 'model__max_depth': [None, 5, 10]}
#   For GradientBoosting: {'model__learning_rate': [0.05, 0.1, 0.2], 'model__n_estimators': [100, 200]}
#   For SVM: {'model__C': [0.1, 1, 10], 'model__gamma': ['scale', 'auto']}

# TODO 2: Select param_grid = param_grids[best_name]
# TODO 3: Run GridSearchCV with cv=5, scoring='f1_weighted', n_jobs=-1, fit on X_train/y_train
# TODO 4: Print best_params_, best_score_, and test F1 vs baseline F1
`,
        hints: [
          'param_grids = {"LogisticRegression": {"model__C": [0.01, 0.1, 1, 10, 100]}, ...}; param_grid = param_grids[best_name]',
          'gs = GridSearchCV(best_pipe, param_grid, cv=5, scoring="f1_weighted", n_jobs=-1); gs.fit(X_train, y_train)',
          'tuned_f1 = f1_score(y_test, gs.predict(X_test), average="weighted")'
        ],
        expectedOutput: `Tuning: LogisticRegression
Best params: {'model__C': 10}
Best CV F1 (weighted): 0.9780
Test F1 (weighted): 0.9737
Improvement over default: +0.0044 F1`,
        solution: `from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.metrics import f1_score

best_name = results_df.iloc[0]['model']
best_pipe  = candidates[best_name]
print(f"Tuning: {best_name}")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

param_grids = {
    "LogisticRegression": {"model__C": [0.01, 0.1, 1, 10, 100]},
    "RandomForest":       {"model__n_estimators": [50, 100, 200], "model__max_depth": [None, 5, 10]},
    "GradientBoosting":   {"model__learning_rate": [0.05, 0.1, 0.2], "model__n_estimators": [100, 200]},
    "SVM":                {"model__C": [0.1, 1, 10], "model__gamma": ["scale", "auto"]},
}
param_grid = param_grids[best_name]

gs = GridSearchCV(best_pipe, param_grid, cv=5, scoring="f1_weighted", n_jobs=-1)
gs.fit(X_train, y_train)

baseline_f1   = results_df.iloc[0]["f1_weighted_mean"]
tuned_test_f1 = f1_score(y_test, gs.predict(X_test), average="weighted")

print(f"Best params: {gs.best_params_}")
print(f"Best CV F1 (weighted): {gs.best_score_:.4f}")
print(f"Test F1 (weighted): {tuned_test_f1:.4f}")
print(f"Improvement over default: {tuned_test_f1 - baseline_f1:+.4f} F1")`
      },
      {
        title: 'Step 5: Export a Model Card as JSON',
        instruction: `Document and export your experiment results. WHY: Reproducibility is the cornerstone of scientific ML practice. A model card captures everything a future team member or compliance reviewer needs: what was trained, with what parameters, on what data, and with what performance. HOW: Collect all metadata into a Python dict and write it to a JSON file. JSON is the standard choice for model metadata — it is human-readable, version-control friendly, and safe for sharing.`,
        starterCode: `import json
import os
from datetime import datetime

# Using gs, best_name, tuned_test_f1, X_train, X_test from Step 4

# TODO 1: Build a model_card dict containing:
#   - model_name (str)
#   - best_params (dict from gs.best_params_)
#   - cv_f1_score (float, 4dp, from gs.best_score_)
#   - test_f1_score (float, 4dp)
#   - trained_on (today's date as YYYY-MM-DD string)
#   - dataset (str: "breast_cancer")
#   - n_features (int: number of input features)
#   - n_train_samples (int)
#   - n_test_samples (int)
#   - scoring_metric (str: "f1_weighted")

# TODO 2: Write the dict to 'model_card.json' with indent=2
#   Ensure all values are JSON-serializable (convert numpy types to Python native)

# TODO 3: Re-read the file and print its contents to verify round-trip fidelity
# TODO 4: Print file size in bytes
`,
        hints: [
          'Use float(round(value, 4)) to ensure numpy floats serialize correctly',
          'with open("model_card.json", "w") as f: json.dump(model_card, f, indent=2)',
          'os.path.getsize("model_card.json") returns size in bytes'
        ],
        expectedOutput: `Model card written: model_card.json (XXX bytes)

Contents verified:
{
  "model_name": "LogisticRegression",
  "best_params": {"model__C": 10},
  "cv_f1_score": 0.978,
  "test_f1_score": 0.9737,
  "trained_on": "2025-xx-xx",
  "dataset": "breast_cancer",
  "n_features": 30,
  "n_train_samples": 455,
  "n_test_samples": 114,
  "scoring_metric": "f1_weighted"
}`,
        solution: `import json
import os
from datetime import datetime

model_card = {
    "model_name":       best_name,
    "best_params":      {k: (int(v) if hasattr(v, 'item') else v) for k, v in gs.best_params_.items()},
    "cv_f1_score":      float(round(gs.best_score_, 4)),
    "test_f1_score":    float(round(tuned_test_f1, 4)),
    "trained_on":       datetime.today().strftime('%Y-%m-%d'),
    "dataset":          "breast_cancer",
    "n_features":       int(X.shape[1]),
    "n_train_samples":  int(X_train.shape[0]),
    "n_test_samples":   int(X_test.shape[0]),
    "scoring_metric":   "f1_weighted",
}

with open('model_card.json', 'w') as f:
    json.dump(model_card, f, indent=2)

size = os.path.getsize('model_card.json')
print(f"Model card written: model_card.json ({size} bytes)")

with open('model_card.json') as f:
    verified = json.load(f)

print("\\nContents verified:")
print(json.dumps(verified, indent=2))`
      }
    ]
  },

  // ============================================================
  // DS-LAB-6: Feature Engineering Toolkit (from ds-5)
  // ============================================================
  {
    id: 'ds-lab-6',
    roleId: 'data-scientist',
    level: 'senior',
    title: 'Feature Engineering Toolkit',
    description: 'Build a reusable, chainable FeatureEngineer class that extracts temporal features, creates numeric interactions, bins continuous variables, encodes categoricals, and imputes missing values — then measure the impact on model performance.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before running data science experiments, ensure your environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, Jupyter Notebook or JupyterLab, pandas, numpy, scikit-learn, matplotlib, and any ML-specific libraries. Set up a virtual environment and install all dependencies before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `jupyter --version` to verify Jupyter is installed',
          'Test: `import pandas as pd; print(pd.__version__)`'
        ],
        expectedOutput: 'Python 3.12.x\nJupyter 7.x.x\npandas 2.x.x, numpy 1.x.x, scikit-learn 1.x.x all installed',
        solution: null
      },
      {
        title: 'Step 2: Generate Synthetic E-Commerce Data',
        instruction: `Create a realistic e-commerce dataset with the characteristics that make feature engineering worthwhile. WHY: Real-world tabular data has messy dates, missing values, categorical variables, and numeric columns that interact in non-linear ways. Synthesizing this data lets you control ground truth and verify that your feature engineering actually captures the signal. HOW: Use numpy and pandas to build a 500-row dataset with intentional messiness.`,
        starterCode: `import pandas as pd
import numpy as np

np.random.seed(42)
N = 500

# TODO: Build a DataFrame with these columns:
#   - order_date: random dates between 2023-01-01 and 2024-12-31
#   - quantity: random integers 1-20
#   - unit_price: random floats 5.0-200.0 rounded to 2 dp
#   - category: random choice from ['Electronics', 'Clothing', 'Books', 'Home', 'Sports']
#   - region: random choice from ['North', 'South', 'East', 'West']
#   - age: random integers 18-70; introduce 30 NaN values at random positions
#   - income: normally distributed mean=60000 std=20000; clip to min 15000; introduce 25 NaN values
#   - total_spent: quantity * unit_price + small noise (std=10), clipped to min 1.0, rounded to 2 dp

# TODO: Print shape and first 3 rows
# TODO: Print missing value counts per column
`,
        hints: [
          'For random dates: pd.to_datetime("2023-01-01") + pd.to_timedelta(np.random.randint(0, 730, N), unit="D")',
          'To introduce NaN: idx = np.random.choice(N, 30, replace=False); df.loc[idx, "age"] = np.nan',
          'total_spent = (df["quantity"] * df["unit_price"] + np.random.normal(0, 10, N)).clip(1.0).round(2)'
        ],
        expectedOutput: `Shape: (500, 8)
   order_date  quantity  unit_price    category region   age    income  total_spent
0  2023-04-17        12       45.32  Electronics  North  34.0  72000.0       544.84
...

Missing values:
age       30
income    25`,
        solution: `import pandas as pd
import numpy as np

np.random.seed(42)
N = 500

order_date  = pd.to_datetime('2023-01-01') + pd.to_timedelta(np.random.randint(0, 730, N), unit='D')
quantity    = np.random.randint(1, 21, N)
unit_price  = np.round(np.random.uniform(5.0, 200.0, N), 2)
category    = np.random.choice(['Electronics', 'Clothing', 'Books', 'Home', 'Sports'], N)
region      = np.random.choice(['North', 'South', 'East', 'West'], N)
age         = np.random.randint(18, 71, N).astype(float)
income      = np.clip(np.random.normal(60000, 20000, N), 15000, None)
total_spent = np.clip(quantity * unit_price + np.random.normal(0, 10, N), 1.0, None).round(2)

df = pd.DataFrame({
    'order_date': order_date, 'quantity': quantity, 'unit_price': unit_price,
    'category': category, 'region': region, 'age': age,
    'income': income, 'total_spent': total_spent
})

df.loc[np.random.choice(N, 30, replace=False), 'age']    = np.nan
df.loc[np.random.choice(N, 25, replace=False), 'income'] = np.nan

print(f"Shape: {df.shape}")
print(df.head(3).to_string())
print("\\nMissing values:")
print(df.isnull().sum()[df.isnull().sum() > 0])`
      },
      {
        title: 'Step 3: Build the Chainable FeatureEngineer Class',
        instruction: `Implement a FeatureEngineer with four transformation methods, each returning self for chaining. WHY: Encapsulating transformations in a class with a fluent interface makes pipelines readable, testable, and reusable across projects. You can read fe.add_date_features(...).add_interactions(...).encode_categorical(...) like a declarative specification of exactly what transformations were applied — invaluable for audits and code reviews. HOW: Every method mutates self.df and then returns self.`,
        starterCode: `from sklearn.preprocessing import LabelEncoder

class FeatureEngineer:
    """Chainable feature engineering toolkit for tabular datasets."""

    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()
        self.label_encoders: dict = {}

    def add_date_features(self, date_col: str):
        """Extract year, month, day-of-week, is_weekend, quarter, days_since_max.
        Adds 6 new columns. Returns self for chaining.
        """
        # TODO: Parse date_col with pd.to_datetime, then add 6 temporal features
        pass

    def add_numeric_interactions(self, col_a: str, col_b: str):
        """Create product, ratio, and sum of two numeric columns.
        Guards against division by zero. Returns self for chaining.
        """
        # TODO: Add 3 interaction columns
        pass

    def encode_categorical(self, columns: list):
        """Label-encode each column; store encoder in self.label_encoders.
        Fills NaN with '__MISSING__' before encoding. Returns self.
        """
        # TODO: Fit LabelEncoder per column, store in self.label_encoders
        pass

    def impute_missing(self, strategy: dict):
        """Fill NaN values. strategy maps column_name -> 'mean'|'median'|'mode'|'zero'.
        Returns self for chaining.
        """
        # TODO: Apply the specified fill method per column
        pass

    def get_dataframe(self) -> pd.DataFrame:
        return self.df
`,
        hints: [
          'dt = pd.to_datetime(self.df[date_col]); self.df[f"{date_col}_year"] = dt.dt.year; etc.',
          'self.df[f"{col_a}_div_{col_b}"] = self.df[col_a] / self.df[col_b].replace(0, np.nan)',
          'Return self at the end of each method to enable chaining'
        ],
        expectedOutput: `FeatureEngineer class implemented:
  add_date_features     => 6 temporal features per date column
  add_numeric_interactions => 3 interaction features per pair
  encode_categorical    => label-encodes + stores encoders
  impute_missing        => fills using mean/median/mode/zero`,
        solution: `from sklearn.preprocessing import LabelEncoder

class FeatureEngineer:
    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()
        self.label_encoders: dict = {}

    def add_date_features(self, date_col: str):
        dt = pd.to_datetime(self.df[date_col])
        self.df[f"{date_col}_year"]       = dt.dt.year
        self.df[f"{date_col}_month"]      = dt.dt.month
        self.df[f"{date_col}_dayofweek"]  = dt.dt.dayofweek
        self.df[f"{date_col}_is_weekend"] = dt.dt.dayofweek.isin([5, 6]).astype(int)
        self.df[f"{date_col}_quarter"]    = dt.dt.quarter
        self.df[f"{date_col}_days_since"] = (dt.max() - dt).dt.days
        print(f"  [date] Added 6 features from '{date_col}'")
        return self

    def add_numeric_interactions(self, col_a: str, col_b: str):
        self.df[f"{col_a}_x_{col_b}"]    = self.df[col_a] * self.df[col_b]
        self.df[f"{col_a}_div_{col_b}"]  = self.df[col_a] / self.df[col_b].replace(0, np.nan)
        self.df[f"{col_a}_plus_{col_b}"] = self.df[col_a] + self.df[col_b]
        print(f"  [interact] Added 3 features for '{col_a}' x '{col_b}'")
        return self

    def encode_categorical(self, columns: list):
        for col in columns:
            le = LabelEncoder()
            filled = self.df[col].fillna('__MISSING__')
            self.df[f"{col}_encoded"] = le.fit_transform(filled)
            self.label_encoders[col] = le
        print(f"  [encode] Encoded {len(columns)} categorical columns")
        return self

    def impute_missing(self, strategy: dict):
        for col, method in strategy.items():
            if method == 'mean':
                self.df[col] = self.df[col].fillna(self.df[col].mean())
            elif method == 'median':
                self.df[col] = self.df[col].fillna(self.df[col].median())
            elif method == 'mode':
                self.df[col] = self.df[col].fillna(self.df[col].mode()[0])
            elif method == 'zero':
                self.df[col] = self.df[col].fillna(0)
        print(f"  [impute] Imputed {len(strategy)} columns")
        return self

    def get_dataframe(self) -> pd.DataFrame:
        return self.df

print("FeatureEngineer class implemented.")`
      },
      {
        title: 'Step 4: Apply the Pipeline and Audit Results',
        instruction: `Run the full feature engineering chain and verify every transformation. WHY: You must confirm that NaN counts dropped to zero, new columns have sensible ranges, and encodings are consistent before using them in a model. A silent bug in feature engineering — like an off-by-one in binning or a NaN leaking through — can corrupt your entire downstream analysis. HOW: Use isnull().sum(), describe(), and value_counts() to audit each transformation group.`,
        starterCode: `# df and FeatureEngineer class are defined from previous steps

fe = FeatureEngineer(df)

# TODO: Apply all four methods in a single chained expression:
#   1. add_date_features("order_date")
#   2. add_numeric_interactions("quantity", "unit_price")
#   3. encode_categorical(["category", "region"])
#   4. impute_missing({"age": "median", "income": "mean"})

enriched = fe.get_dataframe()

# TODO: Print original vs enriched column counts
# TODO: Assert no NaN remains in 'age' or 'income'
# TODO: Print describe() for the three interaction features
# TODO: Print value_counts() for 'category_encoded' to confirm encoding
`,
        hints: [
          'fe.add_date_features(...).add_numeric_interactions(...).encode_categorical(...).impute_missing(...)',
          'assert enriched["age"].isnull().sum() == 0, "age still has NaN"',
          'enriched[["quantity_x_unit_price","quantity_div_unit_price","quantity_plus_unit_price"]].describe()'
        ],
        expectedOutput: `  [date] Added 6 features from 'order_date'
  [interact] Added 3 features for 'quantity' x 'unit_price'
  [encode] Encoded 2 categorical columns
  [impute] Imputed 2 columns

Original columns: 8  =>  Enriched columns: 19  (+11 features)

No NaN remaining in age or income.

Interaction features:
       quantity_x_unit_price  quantity_div_unit_price  quantity_plus_unit_price
count          500.000000               500.000000                500.000000
mean          1021.xx                    0.18xx                   114.xx`,
        solution: `fe = FeatureEngineer(df)
(fe.add_date_features('order_date')
   .add_numeric_interactions('quantity', 'unit_price')
   .encode_categorical(['category', 'region'])
   .impute_missing({'age': 'median', 'income': 'mean'}))

enriched = fe.get_dataframe()

orig_cols = len(df.columns)
enr_cols  = len(enriched.columns)
print(f"\\nOriginal columns: {orig_cols}  =>  Enriched columns: {enr_cols}  (+{enr_cols - orig_cols} features)")

assert enriched['age'].isnull().sum() == 0, "age still has NaN"
assert enriched['income'].isnull().sum() == 0, "income still has NaN"
print("No NaN remaining in age or income.")

interaction_cols = ['quantity_x_unit_price', 'quantity_div_unit_price', 'quantity_plus_unit_price']
print("\\nInteraction features:")
print(enriched[interaction_cols].describe().round(2))

print("\\ncategory_encoded value counts:")
print(enriched['category_encoded'].value_counts().sort_index())`
      },
      {
        title: 'Step 5: Measure Feature Engineering Impact on Model Performance',
        instruction: `Quantify whether your new features actually improved the model. WHY: Feature engineering is only valuable if it demonstrably helps a downstream model. This is the scientific rigour that separates professional data scientists from hobbyists — always measure the delta. A feature that adds noise can actually hurt performance. HOW: Train an identical Pipeline twice — once on raw numeric features, once on all engineered numeric features — and compare 5-fold cross-validated R2 scores.`,
        starterCode: `from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import numpy as np

target = 'total_spent'

# --- Baseline: raw numeric features only ---
raw_features = ['quantity', 'unit_price', 'age', 'income']
df_raw_clean = df[raw_features + [target]].dropna()
X_raw = df_raw_clean[raw_features].values
y_raw = df_raw_clean[target].values

# --- Engineered: all numeric columns from enriched df ---
# TODO 1: Select numeric columns from enriched (exclude target column)
# TODO 2: Drop any remaining NaN rows
# TODO 3: Build a Pipeline: StandardScaler + GradientBoostingRegressor(n_estimators=100, random_state=42)
# TODO 4: Run cross_val_score for BOTH (raw and engineered) with cv=5, scoring='r2'
# TODO 5: Print mean R2 +/- std for both and the delta
# TODO 6: Print a conclusion: did feature engineering help?
`,
        hints: [
          'numeric_cols = enriched.select_dtypes(include=[np.number]).columns.tolist(); remove target',
          'cross_val_score(pipe, X, y, cv=5, scoring="r2") returns an array of 5 R2 values',
          'delta = engineered_mean - baseline_mean; print with +/- sign using f"{delta:+.4f}"'
        ],
        expectedOutput: `Baseline  (4 raw features):    R2 = 0.9783 +/- 0.0045
Engineered (19 features):     R2 = 0.9821 +/- 0.0038

Delta R2: +0.0038  => feature engineering improved performance
Engineered model is more stable (lower variance across folds)`,
        solution: `from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import numpy as np

target = 'total_spent'

raw_features = ['quantity', 'unit_price', 'age', 'income']
df_raw_clean = df[raw_features + [target]].dropna()
X_raw = df_raw_clean[raw_features].values
y_raw = df_raw_clean[target].values

numeric_cols = enriched.select_dtypes(include=[np.number]).columns.tolist()
numeric_cols = [c for c in numeric_cols if c != target]
df_eng_clean = enriched[numeric_cols + [target]].dropna()
X_eng = df_eng_clean[numeric_cols].values
y_eng = df_eng_clean[target].values

pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  GradientBoostingRegressor(n_estimators=100, random_state=42))
])

raw_scores = cross_val_score(pipe, X_raw, y_raw, cv=5, scoring='r2')
eng_scores = cross_val_score(pipe, X_eng, y_eng, cv=5, scoring='r2')

raw_mean, raw_std = raw_scores.mean(), raw_scores.std()
eng_mean, eng_std = eng_scores.mean(), eng_scores.std()
delta = eng_mean - raw_mean

print(f"Baseline  ({len(raw_features)} raw features):    R2 = {raw_mean:.4f} +/- {raw_std:.4f}")
print(f"Engineered ({len(numeric_cols)} features):     R2 = {eng_mean:.4f} +/- {eng_std:.4f}")
print(f"\\nDelta R2: {delta:+.4f}  => {'feature engineering improved performance' if delta > 0 else 'no improvement — revisit features'}")
if eng_std < raw_std:
    print("Engineered model is more stable (lower variance across folds)")`
      }
    ]
  }
];
