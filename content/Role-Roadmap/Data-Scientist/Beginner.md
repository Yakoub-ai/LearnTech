
# Data Scientist – Beginner Concept Reference

This document gives in-depth explanations of the core concepts covered in the Beginner level of the Data Scientist learning path. Use it alongside the linked resources to build a solid mental model before moving to Mid-level material.

---

## Python for Data Science – Key Libraries and Workflow

Python has become the dominant language for data science work because of its readable syntax, large ecosystem of specialised libraries, and strong community support. Unlike general-purpose software development, data science with Python typically follows a notebook-first workflow: you load data, explore it interactively, clean it, visualise it, and then build and evaluate models, often in a Jupyter Notebook or a similar environment before moving any production code to scripts.

The core libraries every data scientist must know are NumPy (numerical computing), Pandas (tabular data), Matplotlib, Seaborn, and Plotly (visualisation), and Scikit-learn (machine learning). These libraries are designed to work together: Pandas DataFrames can be passed directly to Scikit-learn estimators, and both build on NumPy arrays under the hood.

**Why it matters:**
Python is the lingua franca of data science. Every tool, tutorial, and job posting in the field assumes Python fluency. Knowing which library to reach for, and how they fit together, is what separates productive data scientists from those who spend hours fighting their environment.

**Key things to understand:**
- Python itself is not slow, but pure Python loops over large datasets are. The libraries listed above use compiled C or Fortran code internally, which is why they are fast.
- Virtual environments and package management (pip, conda) are essential from day one. Installing packages globally causes dependency conflicts that are hard to debug.
- Jupyter Notebooks are useful for exploration but are not suitable as the final form of production code. Learn when to graduate a notebook to a script or module.
- Reading error tracebacks carefully is a core skill. Python errors usually tell you exactly what went wrong and where.

**Code walkthrough:**

```python
# Step 1: The core data science workflow — load, explore, clean, visualise, model
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Step 2: Load data — Pandas is the primary tool for tabular data
df = pd.read_csv("insurance_claims.csv")

# Step 3: Explore — ALWAYS run these two commands on any new dataset
print(df.info())       # Column names, types, null counts
print(df.describe())   # Mean, std, min, max, quartiles for numeric columns

# Step 4: Clean — handle missing values and type issues
df["age"] = pd.to_numeric(df["age"], errors="coerce")  # Fix mixed types
df["age"].fillna(df["age"].median(), inplace=True)      # Impute missing

# Step 5: Visualise — spot patterns before modelling
plt.figure(figsize=(8, 5))
plt.scatter(df["age"], df["claim_amount"], alpha=0.5)
plt.xlabel("Age")
plt.ylabel("Claim Amount ($)")
plt.title("Age vs Claim Amount")
plt.savefig("scatter_age_claim.png", dpi=150, bbox_inches="tight")

# Step 6: Model — Scikit-learn integrates directly with Pandas
X = df[["age", "annual_premium"]].values
y = df["claim_amount"].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)
print(f"R² score: {model.score(X_test, y_test):.3f}")
```

**Common pitfalls:**
- Running notebook cells out of order and getting confused about the current state of variables.
- Installing packages with `pip` inside a conda environment without understanding the interaction between the two tools.
- Assuming code that works on a small sample will perform acceptably on the full dataset without testing.

---

## NumPy – Arrays, Vectorisation and Why It Replaces Loops

NumPy (Numerical Python) provides the `ndarray`, a fixed-type, multi-dimensional array that is the foundation of almost all numerical work in Python. The key idea is that operations on NumPy arrays are vectorised: instead of writing a loop in Python to apply a calculation to each element, you write a single expression and NumPy applies it across the entire array using compiled code. This is typically 10 to 100 times faster than an equivalent Python loop.

Understanding NumPy is important not just for using it directly, but because Pandas, Scikit-learn, TensorFlow, and PyTorch all rely on its array model. When you encounter a shape mismatch error or a broadcasting error in any of these libraries, the underlying concept is always NumPy broadcasting rules.

**Why it matters:**
NumPy is the numerical backbone of the entire Python data science ecosystem. You cannot work effectively with Pandas, Scikit-learn, or deep learning frameworks without understanding how NumPy arrays behave — their shape, dtype, and the rules governing operations between them.

**Key things to understand:**
- Arrays have a fixed dtype (e.g., float64, int32). Mixing types forces a cast, which can silently change values.
- Shape and axes: a 1-D array has shape `(n,)`, a 2-D array has shape `(rows, cols)`. For a 2-D array, `array[:, 0]` selects the first column and `array[0, :]` selects the first row.
- Broadcasting allows NumPy to perform operations on arrays of different but compatible shapes without copying data.
- `np.nan` is a float, not a missing value marker that affects integers. This distinction matters when cleaning data.

**Code walkthrough:**

```python
# Step 1: NumPy arrays — the foundation of ALL numerical computing in Python
import numpy as np

# Step 2: Create arrays and understand shape — this prevents countless errors
arr_1d = np.array([10, 20, 30, 40, 50])          # Shape: (5,)
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])         # Shape: (2, 3)
print(f"1D shape: {arr_1d.shape} | 2D shape: {arr_2d.shape}")

# Step 3: Vectorised operations — process millions of values in milliseconds
# NEVER use Python loops for numerical computation
prices = np.array([100.0, 250.5, 89.99, 175.0, 320.0])
# All these run in compiled C, not interpreted Python:
discounted = prices * 0.85                    # 15% discount to all
tax_included = prices * 1.25                  # Add 25% tax
clipped = np.clip(prices, 100, 300)           # Cap between 100-300

# Step 4: Indexing and slicing — note that slices are VIEWS, not copies
data = np.array([10, 20, 30, 40, 50])
subset = data[1:4]       # [20, 30, 40] — this is a VIEW
subset[0] = 999           # Modifies the ORIGINAL array!
print(f"Original after slice modification: {data}")  # [10, 999, 30, 40, 50]
safe_copy = data[1:4].copy()  # Use .copy() when you need independence

# Step 5: Broadcasting — operations between arrays of different shapes
# This is the concept that causes the most confusion but is essential to master
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])       # Shape: (2, 3)
row_means = matrix.mean(axis=1, keepdims=True)  # Shape: (2, 1)
centered = matrix - row_means       # Broadcasting: (2,3) - (2,1) works!
print(f"Centered:\n{centered}")
```

**Common pitfalls:**
- Confusing a 1-D array of shape `(n,)` with a 2-D column vector of shape `(n, 1)`. Many Scikit-learn functions require one form and not the other.
- Modifying a slice of an array and being surprised that the original array also changed, because NumPy slices return views, not copies. Note that this is different from pandas, which since version 3.0 uses Copy-on-Write by default — NumPy arrays still share memory on slicing, so changes to a slice always affect the original array.
- Using loops when a vectorised operation exists, negating the performance benefit of NumPy entirely.

---

## Pandas – Series, DataFrames and Data Wrangling

Pandas provides two primary data structures: the `Series` (a one-dimensional labelled array) and the `DataFrame` (a two-dimensional table with labelled rows and columns). Together they make it practical to load, inspect, clean, reshape, and summarise tabular data without writing SQL or using a spreadsheet application.

For a data scientist, most real-world projects involve imperfect data: missing values, inconsistent formats, duplicate rows, wrong data types, and outliers. Pandas provides the tools to diagnose and fix all of these. Mastering Pandas is therefore not optional; it is the skill that determines how quickly you can move from raw data to a form that is usable for analysis or modelling.

**Why it matters:**
Raw data is almost never clean or analysis-ready. Pandas is the primary tool for bridging that gap. The speed at which you can wrangle a messy dataset into a usable form directly determines how fast you can iterate on analysis and modelling.

**Key things to understand:**
- `df.info()` and `df.describe()` should be the first thing you run on any new dataset. They tell you shape, dtypes, null counts, and basic statistics.
- Selecting data: use `loc` for label-based selection (row and column names) and `iloc` for integer-position-based selection (row and column numbers). Mixing them up causes bugs that can be silent.
- `dropna()` removes rows or columns containing missing values; `fillna()` replaces them with a specified value or strategy. Choose based on whether the missingness is informative.
- `groupby()` is one of the most powerful operations: it splits the data by a key, applies a function, and combines the results. `merge()` joins two DataFrames on a key column (like SQL JOIN); `join()` merges on the index.

**Code walkthrough:**

```python
# Step 1: Load and clean data — the most common Pandas operations
import pandas as pd

# Step 2: Create a sample dataset to demonstrate key operations
df = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5, 5],  # Note: duplicate customer 5
    "age": [25, None, 35, 45, 28, 28],   # Note: missing value
    "claim_amount": [500, 1200, None, 800, 300, 300],
    "policy_type": ["auto", "home", "auto", "home", "auto", "auto"],
})

# Step 3: Inspect data quality — always the FIRST step
print(f"Shape: {df.shape}")
print(f"Missing values:\n{df.isnull().sum()}\n")
print(f"Duplicates: {df.duplicated().sum()}")

# Step 4: Clean — handle missing values, duplicates, and types
df.drop_duplicates(inplace=True)
df["age"].fillna(df["age"].median(), inplace=True)
df["claim_amount"].fillna(0, inplace=True)

# Step 5: Select and filter with .loc (label-based) — the correct way
# .loc for labels, .iloc for integer positions — never mix them
high_claims = df.loc[df["claim_amount"] > 500, ["customer_id", "claim_amount"]]
print(f"High-value claims:\n{high_claims}\n")

# Step 6: groupby — split, apply, combine (the most powerful operation)
summary = df.groupby("policy_type").agg(
    avg_claim=("claim_amount", "mean"),
    total_claims=("claim_amount", "sum"),
    num_customers=("customer_id", "count"),
)
print(f"Summary by policy type:\n{summary}\n")

# Step 7: merge — join DataFrames like SQL JOIN
premiums = pd.DataFrame({"policy_type": ["auto", "home"], "avg_premium": [1200, 2400]})
enriched = pd.merge(df, premiums, on="policy_type", how="left")
enriched["claim_ratio"] = enriched["claim_amount"] / enriched["avg_premium"]
print(enriched[["customer_id", "claim_amount", "avg_premium", "claim_ratio"]])
```

**Common pitfalls:**
- Chained assignment (e.g., `df[df['x'] > 0]['y'] = 1`) no longer works in pandas 3.0+, which adopted Copy-on-Write as the default behaviour. The old `SettingWithCopyWarning` no longer exists. The correct pattern is to use `.loc` on the original DataFrame directly (e.g., `df.loc[df['x'] > 0, 'y'] = 1`) for single-step assignment.
- Forgetting that `merge()` defaults to an inner join, silently dropping rows that do not match.
- Treating object-dtype columns as strings without checking for mixed types or unexpected values first.
- Performing expensive operations row-by-row using `iterrows` instead of using vectorised Pandas methods.

---

## Data Visualisation – Purpose, Chart Types and Interpretation

Data visualisation translates numbers into images that human perception can process quickly. A well-chosen chart can reveal a pattern, outlier, or relationship in seconds that would take minutes to find by reading a table. For a data scientist, visualisation serves two distinct purposes: exploratory analysis (understanding the data yourself) and communication (explaining findings to others).

Different chart types suit different questions. Bar charts compare discrete categories. Line charts show trends over time. Scatter plots reveal relationships between two continuous variables. Histograms and box plots describe the distribution of a single variable. Heatmaps show correlation matrices or grid-based data. Choosing the wrong chart type obscures rather than reveals the underlying truth.

**Why it matters:**
Insights that cannot be communicated are worthless. Visualisation is the primary language for translating analytical findings into business understanding. It is also the fastest way to spot data quality problems, outliers, and unexpected patterns before they corrupt your model.

**Key things to understand:**
- Matplotlib is the foundational Python plotting library; its `pyplot` interface provides a MATLAB-like workflow. Seaborn is built on top of Matplotlib and provides a higher-level API with better statistical chart defaults and more attractive styling. Plotly creates interactive charts suitable for dashboards and web applications.
- Always label axes and include units. A chart without axis labels is uninterpretable.
- Scale matters: a y-axis that does not start at zero can visually exaggerate differences. This is sometimes intentional, but always be aware of it.
- Colour choice affects accessibility. Avoid red-green combinations for audiences that may include colour-blind readers.

**Code walkthrough:**

```python
# Step 1: Four essential chart types — each answers a different question
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

np.random.seed(42)
df = pd.DataFrame({
    "age": np.random.normal(40, 12, 500).astype(int),
    "claim_amount": np.random.exponential(3000, 500),
    "policy_type": np.random.choice(["Auto", "Home", "Health", "Life"], 500),
})

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Step 2: Histogram — shows distribution of a single variable
# Why this first? Understanding distribution shape is prerequisite to modelling
axes[0, 0].hist(df["claim_amount"], bins=30, edgecolor="black", alpha=0.7)
axes[0, 0].set_xlabel("Claim Amount ($)")
axes[0, 0].set_ylabel("Frequency")
axes[0, 0].set_title("Distribution of Claim Amounts (right-skewed)")

# Step 3: Box plot — shows median, quartiles, and outliers per group
# Why box plots? They reveal group differences AND outliers simultaneously
sns.boxplot(data=df, x="policy_type", y="claim_amount", ax=axes[0, 1])
axes[0, 1].set_title("Claim Amounts by Policy Type")

# Step 4: Scatter plot — reveals relationships between two continuous variables
axes[1, 0].scatter(df["age"], df["claim_amount"], alpha=0.3)  # alpha for overplotting
axes[1, 0].set_xlabel("Age")
axes[1, 0].set_ylabel("Claim Amount ($)")
axes[1, 0].set_title("Age vs Claim Amount")

# Step 5: Bar chart — compares discrete categories
counts = df["policy_type"].value_counts()
axes[1, 1].bar(counts.index, counts.values, color="steelblue")
axes[1, 1].set_ylabel("Number of Claims")
axes[1, 1].set_title("Claims Count by Policy Type")

plt.tight_layout()
plt.savefig("four_charts.png", dpi=150, bbox_inches="tight")
# Always label axes and include units — a chart without labels is uninterpretable
```

**Common pitfalls:**
- Using a pie chart for more than four or five categories, making it impossible to compare slices accurately.
- Overplotting in scatter plots when there are many data points, masking the true density of the data. Use alpha (transparency) or a hexbin plot instead.
- Presenting a chart to a non-technical audience without a title or annotation that explains the key message.
- Conflating correlation shown in a scatter plot with a causal relationship.

---

## Descriptive Statistics – Mean, Median, Mode, Variance, Standard Deviation and IQR

Descriptive statistics summarise the key properties of a dataset in a compact form. Before building any model, you need to understand what your data looks like: where it centres, how spread out it is, whether it is symmetric, and whether it has outliers. Skipping this step leads to models that appear to work but are actually fitting to noise or dominated by a few extreme values.

The mean is the arithmetic average of all values; the median is the middle value when data is sorted; the mode is the most frequently occurring value. When a distribution is skewed, these three measures diverge. A right-skewed distribution (long tail to the right, like income data) has a mean that is higher than the median, because extreme high values pull the mean up. Variance measures how far values typically lie from the mean on average (in squared units); standard deviation is the square root of variance and is expressed in the same units as the data. The interquartile range (IQR) is Q3 minus Q1 and measures the spread of the middle 50% of the data; it is robust to outliers in a way that variance and standard deviation are not.

**Why it matters:**
You cannot build a good model without first understanding your data. Descriptive statistics are the vocabulary for that understanding. They expose problems such as outliers, skew, and data entry errors that would otherwise silently distort your analysis.

**Key things to understand:**
- Mean, median, and mode are all measures of central tendency but tell different stories. The mean is sensitive to outliers; the median is not. The mode is most useful for categorical or discrete data.
- Variance is the average of squared deviations from the mean; standard deviation is its square root. A low standard deviation means values cluster tightly around the mean.
- IQR = Q3 − Q1. It captures the spread of the central 50% of the data and is the basis for the standard definition of outliers in box plots (values beyond 1.5 × IQR from the quartiles).
- Distribution shape matters: normal, uniform, Poisson, and exponential distributions arise in different real-world processes, and the right model depends on the right distributional assumption.

**Code walkthrough:**

```python
# Step 1: Compute descriptive statistics — the vocabulary for understanding data
import numpy as np
import pandas as pd

# Simulate claim amounts — right-skewed, like real insurance data
np.random.seed(42)
claims = np.random.exponential(scale=3000, size=1000)

# Step 2: Measures of central tendency — they tell different stories
mean = np.mean(claims)
median = np.median(claims)
print(f"Mean:   ${mean:,.0f}")
print(f"Median: ${median:,.0f}")
print(f"Difference: ${mean - median:,.0f}")
# For skewed data, the mean is pulled toward the tail
# The median is more representative of the "typical" claim

# Step 3: Measures of spread — how dispersed is the data?
variance = np.var(claims)
std_dev = np.std(claims)
q1 = np.percentile(claims, 25)
q3 = np.percentile(claims, 75)
iqr = q3 - q1

print(f"\nStd Dev: ${std_dev:,.0f} (same units as data)")
print(f"IQR:     ${iqr:,.0f} (spread of middle 50%)")
print(f"Q1: ${q1:,.0f} | Q3: ${q3:,.0f}")

# Step 4: Detect outliers using the IQR method
# Values beyond 1.5 * IQR from the quartiles are considered outliers
lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr
outliers = claims[(claims < lower_fence) | (claims > upper_fence)]
print(f"\nOutliers: {len(outliers)} of {len(claims)} ({len(outliers)/len(claims)*100:.1f}%)")
print(f"Outlier range: below ${lower_fence:,.0f} or above ${upper_fence:,.0f}")

# Step 5: Pandas .describe() gives you all of this in one call
series = pd.Series(claims, name="claim_amount")
print(f"\n{series.describe()}")
```

**Common pitfalls:**
- Using the mean as the summary statistic for a heavily skewed variable, giving a misleading picture of the typical value.
- Ignoring outliers when computing variance, which inflates the estimate and distorts downstream analyses.
- Assuming all data is normally distributed simply because many statistical tests assume this, without checking.
- Reporting statistics without their sample size, making it impossible to judge statistical reliability.

---

## The Normal Distribution – The Bell Curve and Why It Appears Everywhere

The normal distribution (also called the Gaussian distribution) is a continuous probability distribution shaped like a symmetric bell curve. It is defined entirely by two parameters: its mean (the centre of the curve) and its standard deviation (which controls the width). For a normal distribution, the mean, median, and mode are all equal and sit at the peak of the curve.

The normal distribution appears in nature, measurement error, and many real-world phenomena because of the central limit theorem: the average of a large number of independent random variables tends toward a normal distribution regardless of the original distribution of those variables. This is why so many statistical tests assume normality and why the normal distribution is the starting point for understanding other distributions.

**Why it matters:**
Many statistical tests and modelling techniques assume normally distributed data or residuals. Knowing what a normal distribution looks like, and how to check whether your data follows one, helps you apply the right test and spot violations that would invalidate your results.

**Key things to understand:**
- The 68-95-99.7 rule: approximately 68% of data falls within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3. This provides immediate intuition about how extreme a given value is.
- A perfectly normal distribution is symmetric: the left and right halves are mirror images of each other, and skewness is zero.
- Real data is rarely perfectly normal. Use a histogram or a Q-Q plot to assess whether the normality assumption is reasonable for your data.
- Standardising a normal variable (subtracting the mean and dividing by the standard deviation) produces a standard normal distribution with mean 0 and standard deviation 1, which is what z-score tables are based on.

**Code walkthrough:**

```python
# Step 1: Understand the normal distribution and how to check for normality
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)

# Step 2: Generate normal data and visualise the bell curve
normal_data = np.random.normal(loc=50000, scale=10000, size=1000)  # Mean=50k, Std=10k

# Step 3: The 68-95-99.7 rule — immediate intuition about any value
mean, std = np.mean(normal_data), np.std(normal_data)
within_1_std = np.sum((normal_data >= mean - std) & (normal_data <= mean + std)) / len(normal_data)
within_2_std = np.sum((normal_data >= mean - 2*std) & (normal_data <= mean + 2*std)) / len(normal_data)
print(f"Within 1 std: {within_1_std:.1%} (expected ~68%)")
print(f"Within 2 std: {within_2_std:.1%} (expected ~95%)")

# Step 4: Z-scores — standardise to compare across different scales
# A z-score of 2.5 means the value is 2.5 standard deviations from the mean
value = 75000
z_score = (value - mean) / std
print(f"\n${value:,} has z-score = {z_score:.2f}")
print(f"Probability of seeing a value this extreme: {2 * (1 - stats.norm.cdf(abs(z_score))):.4f}")

# Step 5: Check if YOUR data is actually normal — use a Q-Q plot
# Real data is rarely perfectly normal; the question is "close enough?"
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Normal data — points should follow the diagonal line
stats.probplot(normal_data, dist="norm", plot=axes[0])
axes[0].set_title("Q-Q Plot: Normal Data (points follow the line)")

# Skewed data — deviations from the line reveal non-normality
skewed_data = np.random.exponential(scale=10000, size=1000)
stats.probplot(skewed_data, dist="norm", plot=axes[1])
axes[1].set_title("Q-Q Plot: Skewed Data (tails deviate from line)")

plt.tight_layout()
plt.savefig("qq_plots.png", dpi=150, bbox_inches="tight")
```

**Common pitfalls:**
- Applying a parametric test that assumes normality to data that is clearly skewed or heavy-tailed without checking the assumption.
- Confusing the normal distribution with any symmetric distribution — uniformly distributed data is also symmetric but very different from normal.
- Assuming that a large sample size automatically makes the normality assumption safe; the central limit theorem applies to sample means, not to individual observations.
- Treating a Q-Q plot as binary (normal vs. not normal) rather than as a diagnostic for the degree and nature of any departure from normality.

---

## Inferential Statistics – Hypothesis Testing, p-values and Confidence Intervals

Descriptive statistics describe what you observed. Inferential statistics help you reason about what is likely true in the broader population, based on a sample. Hypothesis testing is the formal procedure for deciding whether an observed effect is likely real or could plausibly be due to random chance.

The null hypothesis (H0) states that there is no effect or no difference. The alternative hypothesis (H1) states the opposite — that there is an effect. A test statistic is computed from the data, and the p-value is the probability of observing a result at least as extreme as the one found, assuming the null hypothesis is true. If the p-value is below a chosen threshold (commonly 0.05), the result is called statistically significant. A Type I error is rejecting a true null hypothesis (a false positive). A Type II error is failing to reject a false null hypothesis (a false negative).

**Why it matters:**
Business decisions based on data — A/B tests, product changes, clinical decisions — require a principled way to distinguish real effects from random noise. Hypothesis testing provides that framework. Misunderstanding p-values is one of the most common sources of incorrect conclusions in data-driven work.

**Key things to understand:**
- A p-value is not the probability that the null hypothesis is true. It is the probability of the data given the null hypothesis. This distinction is subtle but critical.
- Statistical significance does not imply practical significance. A tiny effect can be statistically significant with a large enough sample.
- The 0.05 threshold is a widely used convention, not a scientific law. The appropriate threshold depends on the cost of false positives versus false negatives in your context.
- Confidence intervals give a range of plausible values for a population parameter and are often more informative than a binary significant/not-significant decision.

**Code walkthrough:**

```python
# Step 1: Hypothesis testing — is there a real difference, or just random noise?
from scipy import stats
import numpy as np

np.random.seed(42)

# Step 2: Example — do customers with claims > $5000 have different ages?
# H0: No difference in age between high-claim and low-claim groups
# H1: There IS a difference
high_claim_ages = np.random.normal(45, 10, 150)   # High-claim customers
low_claim_ages = np.random.normal(40, 12, 300)     # Low-claim customers

# Step 3: Two-sample t-test — compare means of two groups
t_stat, p_value = stats.ttest_ind(high_claim_ages, low_claim_ages)
print(f"T-statistic: {t_stat:.3f}")
print(f"P-value: {p_value:.4f}")
print(f"Significant at 0.05? {'Yes' if p_value < 0.05 else 'No'}")

# Step 4: CRITICAL — p-value is NOT the probability that H0 is true
# It is the probability of seeing data THIS extreme IF H0 were true
# A small p-value means the data is unlikely under H0, not that H0 is false

# Step 5: Confidence interval — often more informative than a binary yes/no
mean_diff = np.mean(high_claim_ages) - np.mean(low_claim_ages)
se = np.sqrt(np.var(high_claim_ages)/len(high_claim_ages) + np.var(low_claim_ages)/len(low_claim_ages))
ci_lower = mean_diff - 1.96 * se
ci_upper = mean_diff + 1.96 * se
print(f"\nMean age difference: {mean_diff:.1f} years")
print(f"95% CI: [{ci_lower:.1f}, {ci_upper:.1f}]")
print("If the CI does not include 0, the difference is statistically significant")

# Step 6: Statistical significance ≠ practical significance
# A 0.5-year age difference can be significant with n=100,000 but meaningless
# Always ask: "Is this difference large enough to matter for the business?"
```

**Common pitfalls:**
- Interpreting a p-value above 0.05 as proof that there is no effect, rather than simply insufficient evidence for one.
- Choosing the significance threshold after seeing the data, which invalidates the test.
- Running the same hypothesis test repeatedly as data comes in and stopping as soon as significance is reached (p-hacking).
- Ignoring assumptions of the test, such as independence of observations or normality of residuals, which can invalidate the result.

---

## Correlation vs Causation

Correlation measures the degree to which two variables move together. A positive correlation means that when one increases, the other tends to increase. A negative correlation means the opposite. The Pearson correlation coefficient ranges from -1 (perfect negative linear relationship) to +1 (perfect positive linear relationship), with 0 indicating no linear relationship. Correlation is easy to compute and easy to misinterpret.

Causation means that a change in one variable directly produces a change in another. Establishing causation requires more than observing that two things tend to move together; it requires ruling out confounding variables (third variables that influence both), reverse causation (the effect driving the cause), and coincidence. The gold standard for establishing causation is a randomised controlled experiment, which is often impossible in business data science.

**Why it matters:**
Mistaking correlation for causation leads to bad decisions. Acting on a spurious correlation — for example, increasing one metric because it correlates with revenue, when actually a third factor drives both — wastes resources and can cause harm. Understanding the distinction protects you from this class of error.

**Key things to understand:**
- Two variables can be correlated for three reasons: A causes B, B causes A, or a confounding variable C causes both. Correlation alone cannot distinguish these cases.
- Spurious correlations exist between completely unrelated variables simply because both trend over time (e.g., ice cream sales and drowning rates both increase in summer, because both are driven by warm weather).
- In predictive modelling, correlation is often enough: you do not need to understand causation to make a good prediction. However, for decision-making, causation is essential.
- Correlation measures only linear relationships. Two variables can have a strong non-linear relationship with a Pearson correlation near zero.

**Code walkthrough:**

```python
# Step 1: Compute correlation — and understand what it does and does NOT tell you
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

np.random.seed(42)

# Step 2: Create data with different types of relationships
n = 200
temperature = np.random.normal(20, 10, n)            # Temperature in Celsius
ice_cream_sales = 50 + 3 * temperature + np.random.normal(0, 10, n)  # Correlated with temp
drowning_incidents = 5 + 0.8 * temperature + np.random.normal(0, 5, n)  # Also correlated with temp!

df = pd.DataFrame({
    "temperature": temperature,
    "ice_cream_sales": ice_cream_sales,
    "drowning_incidents": drowning_incidents,
})

# Step 3: Compute Pearson correlation matrix
corr_matrix = df.corr()
print("Correlation matrix:")
print(corr_matrix.round(3))

# Step 4: Ice cream sales and drowning are correlated — but one does NOT cause the other
# Both are driven by the CONFOUNDING variable: temperature
print(f"\nIce cream ↔ Drowning correlation: {corr_matrix.loc['ice_cream_sales', 'drowning_incidents']:.3f}")
print("This is a SPURIOUS correlation — temperature drives both!")

# Step 5: Visualise with a heatmap — standard way to show correlations
plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, cmap="coolwarm", center=0, fmt=".2f")
plt.title("Correlation Matrix — Correlation ≠ Causation")
plt.tight_layout()
plt.savefig("correlation_heatmap.png", dpi=150, bbox_inches="tight")

# Step 6: Pearson only measures LINEAR relationships
# A perfect U-shape has Pearson ≈ 0 despite a strong relationship
x = np.linspace(-3, 3, 200)
y_nonlinear = x ** 2 + np.random.normal(0, 0.5, 200)
print(f"\nNon-linear relationship — Pearson r: {np.corrcoef(x, y_nonlinear)[0,1]:.3f}")
print("Near-zero correlation despite a clear pattern — always plot the data!")
```

**Common pitfalls:**
- Presenting a correlation in a business report as evidence that one variable is causing another without appropriate caveats.
- Ignoring the possibility of confounding variables in feature selection, which can lead to models that appear predictive but fail when conditions change.
- Treating a high correlation coefficient as automatically meaningful without checking whether the relationship is linear and the sample is large enough.
- Forgetting that correlation can be driven by a small number of extreme outliers; always inspect the scatter plot alongside the correlation coefficient.

---

## What Machine Learning Is and When to Use It

Machine learning is the practice of writing algorithms that improve their performance on a task by learning patterns from data, rather than being explicitly programmed with rules. Instead of a developer writing `if price > X then classify as expensive`, an ML model infers that boundary from thousands of labelled examples.

There are three broad categories of machine learning. Supervised learning uses labelled data to learn a mapping from inputs to outputs (e.g., predicting house prices, classifying email as spam). Unsupervised learning finds structure in unlabelled data (e.g., customer segmentation, anomaly detection). Reinforcement learning trains an agent to take actions that maximise a reward signal over time, which is less common in typical business data science.

**Why it matters:**
Machine learning is the engine behind predictive analytics, personalisation, automation, and a growing share of business intelligence. Understanding what it is — and crucially, when it is and is not the right tool — is what lets you apply it appropriately rather than reaching for it by default.

**Key things to understand:**
- Machine learning is not always the right tool. If a rule-based system or simple statistical model can solve the problem reliably, that is often preferable.
- Data quality is more important than algorithm choice. A sophisticated model trained on dirty data will perform worse than a simple model trained on clean data.
- Every supervised learning problem requires a clearly defined target variable and a source of labelled training examples.
- Model evaluation must be done on data the model has not seen during training, otherwise you are measuring memorisation, not learning.

**Code walkthrough:**

```python
# Step 1: A complete ML workflow — from data to evaluation
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.dummy import DummyRegressor
import numpy as np

np.random.seed(42)

# Step 2: Generate sample data — predict claim amount from customer features
n = 500
X = np.column_stack([
    np.random.randint(18, 70, n),           # age
    np.random.normal(50000, 15000, n),      # income
    np.random.randint(0, 10, n),            # years_as_customer
])
y = 200 + 15 * X[:, 0] + 0.02 * X[:, 1] - 50 * X[:, 2] + np.random.normal(0, 500, n)

# Step 3: ALWAYS split data before anything else — prevent data leakage
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: ALWAYS start with a baseline — "predict the mean" is the simplest model
# If your ML model cannot beat this, it is not learning anything useful
baseline = DummyRegressor(strategy="mean")
baseline.fit(X_train, y_train)
baseline_pred = baseline.predict(X_test)
print(f"Baseline (predict mean) — MAE: ${mean_absolute_error(y_test, baseline_pred):,.0f}")

# Step 5: Try a simple model first — linear regression
lr = LinearRegression()
lr.fit(X_train, y_train)
lr_pred = lr.predict(X_test)
print(f"Linear Regression      — MAE: ${mean_absolute_error(y_test, lr_pred):,.0f}, R²: {r2_score(y_test, lr_pred):.3f}")

# Step 6: Try a more complex model — only if the simple one is insufficient
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
rf_pred = rf.predict(X_test)
print(f"Random Forest          — MAE: ${mean_absolute_error(y_test, rf_pred):,.0f}, R²: {r2_score(y_test, rf_pred):.3f}")

# If Linear Regression performs comparably, prefer it — simpler is better
```

**Common pitfalls:**
- Applying ML to a problem that has too little data for a model to learn meaningful patterns, resulting in poor generalisation.
- Leaking information from the test set into training (data leakage), which produces optimistic evaluation metrics that do not hold in production.
- Choosing a model based on popularity rather than suitability for the problem type and data characteristics.
- Skipping baseline comparisons: always compare an ML model against a simple baseline (e.g., predicting the mean, or a rule-based approach) to confirm that complexity is justified.
