
# Data Scientist – Mid Concept Reference

This document gives in-depth explanations of the core concepts covered in the Mid level of the Data Scientist learning path. It assumes you are comfortable with the Beginner material and are ready to work with more complex modelling and data engineering tasks.

---

## Feature Engineering – Encoding, Scaling and Creating New Features

Feature engineering is the process of transforming raw data into representations that make it easier for a machine learning algorithm to learn. The algorithm itself is constrained; it can only work with what you give it. Thoughtful feature engineering often produces larger performance gains than switching to a more complex algorithm.

Raw data rarely arrives in a form that ML models can consume directly. Categorical variables must be converted to numbers. Continuous variables with very different ranges can cause gradient-based algorithms to converge slowly or unevenly. New features can be derived by combining existing ones, extracting date components, applying domain knowledge, or capturing non-linear relationships that a linear model would otherwise miss.

**Why it matters:**
The quality of your features determines the ceiling of your model's performance. No algorithm can extract a signal that is not represented in the input. Feature engineering is where domain knowledge meets machine learning, and it is frequently the difference between a model that works in a demo and one that works in production.

**Key things to understand:**
- One-hot encoding converts a categorical variable with k categories into k binary columns. It is appropriate for nominal categories with no inherent order. Beware of high-cardinality columns that produce hundreds of new columns.
- Ordinal encoding assigns integers to ordered categories (e.g., low=1, medium=2, high=3). Using it on nominal categories implies a false ordering that can confuse the model.
- `StandardScaler` (z-score standardisation) rescales features to zero mean and unit variance. `MinMaxScaler` rescales values to a fixed range, typically 0 to 1. Tree-based models do not require scaling; linear models and neural networks do.
- Creating interaction features (e.g., price per square metre from price and area) can expose relationships that neither column reveals alone.

**Code walkthrough:**

```python
# Step 1: Feature engineering pipeline — encoding, scaling, and feature creation
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Step 2: Raw data with mixed types — typical in insurance
df = pd.DataFrame({
    "age": [25, 45, 30, 55, None, 35],
    "annual_premium": [1200, 3500, 1800, 5000, 2200, 2800],
    "policy_type": ["auto", "home", "auto", "home", "auto", "life"],
    "incident_date": pd.to_datetime(["2024-01-15", "2024-06-20", "2024-12-25",
                                      "2024-03-10", "2024-08-05", "2024-11-15"]),
})

# Step 3: Create domain-specific features — domain knowledge is the key input
df["age"].fillna(df["age"].median(), inplace=True)
df["month"] = df["incident_date"].dt.month
df["is_winter"] = df["month"].isin([11, 12, 1, 2]).astype(int)
df["is_weekend"] = df["incident_date"].dt.dayofweek.isin([5, 6]).astype(int)

# Step 4: Build a ColumnTransformer — applies correct transforms to each column type
# Why a pipeline? It ensures the SAME transformations are applied at inference time
numeric_features = ["age", "annual_premium"]
categorical_features = ["policy_type"]

preprocessor = ColumnTransformer(transformers=[
    ("num", StandardScaler(), numeric_features),                # Zero mean, unit variance
    ("cat", OneHotEncoder(drop="first", sparse_output=False),   # Binary columns per category
     categorical_features),
])

# Step 5: Fit ONLY on training data — fitting on full data causes leakage
from sklearn.model_selection import train_test_split
X = df[numeric_features + categorical_features]
X_train, X_test = train_test_split(X, test_size=0.3, random_state=42)
X_train_transformed = preprocessor.fit_transform(X_train)   # fit + transform
X_test_transformed = preprocessor.transform(X_test)          # transform only
print(f"Features after transform: {X_train_transformed.shape[1]} columns")
```

**Common pitfalls:**
- Fitting the scaler or encoder on the entire dataset before splitting into train and test sets, causing data leakage.
- Generating too many features without understanding their relevance, increasing dimensionality and the risk of overfitting.
- Forgetting to apply the same transformations to new data at inference time, causing training-serving skew.
- Using mean imputation for missing values without checking whether missingness is informative.

---

## ML Algorithm Families – When to Use What

There is no single best machine learning algorithm. Each family of algorithms makes different assumptions about the data and is suited to different problem types, dataset sizes, and interpretability requirements. Understanding the trade-offs helps you select a reasonable starting point and explain your choice to stakeholders.

Linear models (logistic regression, linear regression, Ridge, Lasso) are fast, interpretable, and work well when the relationship between features and target is approximately linear. Tree-based models (decision trees, random forests, gradient boosting) handle non-linear relationships and interactions between features naturally and require less preprocessing. Support vector machines work well in high-dimensional spaces but can be slow on large datasets. Neural networks excel at unstructured data (images, text, audio) but require large amounts of data and are harder to interpret.

**Why it matters:**
Selecting an appropriate algorithm — and being able to justify that choice — is a core skill. Using an overly complex model wastes time and increases the risk of overfitting; using an overly simple model leaves predictive power on the table. Understanding algorithm families lets you navigate this trade-off deliberately.

**Key things to understand:**
- For tabular data in most business problems, gradient boosting (XGBoost, LightGBM, CatBoost) is a strong default choice because it handles mixed data types, missing values, and non-linear relationships.
- For interpretability requirements, linear models or shallow decision trees are easier to explain to non-technical audiences.
- Clustering algorithms (k-means, DBSCAN, hierarchical clustering) are used for unsupervised problems where no label exists.
- Dimensionality reduction algorithms (PCA, UMAP) are used to reduce the number of features while preserving as much information as possible.

**Code walkthrough:**

```python
# Step 1: Compare algorithm families systematically — no single algorithm wins everywhere
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier

X, y = make_classification(n_samples=1000, n_features=20, n_informative=10, random_state=42)

# Step 2: Test each algorithm family with cross-validation
algorithms = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Decision Tree": DecisionTreeClassifier(max_depth=5, random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
    "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, random_state=42),
}

print(f"{'Algorithm':<25} {'Mean Accuracy':>15} {'Std':>8}")
print("-" * 50)
for name, model in algorithms.items():
    scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")
    print(f"{name:<25} {scores.mean():>15.4f} {scores.std():>8.4f}")

# Step 3: For tabular business data, gradient boosting is a strong default
# But always establish a simpler baseline first to justify complexity
# If Logistic Regression scores within 2% of Gradient Boosting,
# prefer the simpler model — it is easier to explain and maintain
```

**Common pitfalls:**
- Defaulting to the most complex model available without establishing a simpler baseline first.
- Applying a classification algorithm to a regression problem or vice versa, which produces meaningless results.
- Ignoring class imbalance when using algorithms that optimise accuracy, leading to a model that always predicts the majority class.
- Choosing an algorithm based on intuition and never revisiting the choice after seeing evaluation results.

---

## Model Evaluation and Cross-Validation

A model that performs perfectly on training data but fails on unseen data has learned to memorise rather than generalise. Rigorous evaluation is what separates a model that will work in production from one that only appears to work. The choice of evaluation metric and the evaluation strategy are both critical decisions.

For classification, common metrics include accuracy, precision, recall, F1-score, and the area under the ROC curve (AUC-ROC). Accuracy is misleading when classes are imbalanced. Precision measures how many predicted positives are actually positive; recall measures how many actual positives were correctly identified. The choice between them depends on the cost of false positives versus false negatives in your specific context.

For regression, common metrics include mean absolute error (MAE), mean squared error (MSE), root mean squared error (RMSE), and R-squared. MSE penalises large errors more heavily than MAE because of the squaring; choose the metric that matches how much you care about extreme errors.

**Why it matters:**
A model that looks good during development but fails in production is worse than no model at all, because it creates false confidence. Rigorous evaluation disciplines you to measure what actually matters — generalisation to new data — rather than what is easy to measure.

**Key things to understand:**
- K-fold cross-validation trains and evaluates the model k times on different splits of the data, giving a more reliable estimate of generalisation performance than a single train/test split.
- Stratified k-fold ensures each fold preserves the class distribution, which is important for imbalanced classification problems.
- Leave-one-out cross-validation (LOOCV) is a special case where k equals the number of samples; each observation serves as its own test set. It gives nearly unbiased estimates but is computationally expensive for large datasets.
- The test set must be held out until the very end of development. Using it to tune hyperparameters converts it into a de facto validation set and produces overly optimistic estimates.

**Code walkthrough:**

```python
# Step 1: Cross-validation — the reliable way to estimate model performance
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import make_scorer, f1_score, precision_score, recall_score
from sklearn.datasets import make_classification

# Imbalanced dataset — 5% positive class (like fraud detection)
X, y = make_classification(n_samples=2000, weights=[0.95, 0.05], random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)

# Step 2: Stratified K-Fold — preserves class distribution in each fold
# Why stratified? Without it, some folds may have ZERO minority class samples
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# Step 3: Evaluate MULTIPLE metrics — accuracy is misleading for imbalanced data
scorers = {
    "accuracy": "accuracy",
    "f1": "f1",
    "precision": "precision",
    "recall": "recall",
}

print(f"{'Metric':<12} {'Mean':>8} {'Std':>8}")
print("-" * 30)
for metric_name, scorer in scorers.items():
    scores = cross_val_score(model, X, y, cv=cv, scoring=scorer)
    print(f"{metric_name:<12} {scores.mean():>8.4f} {scores.std():>8.4f}")

# Step 4: Notice: accuracy is ~95% but recall may be much lower
# This means the model is predicting "not fraud" for nearly everything
# For fraud detection, RECALL is what matters — catching actual fraud

# Step 5: The test set must be held out until the VERY END
# Using it for hyperparameter tuning converts it into a validation set
# and produces overly optimistic performance estimates
```

**Common pitfalls:**
- Reporting only training accuracy or loss, which tells you nothing about generalisation.
- Using accuracy as the sole metric for an imbalanced problem where 95% of examples belong to one class.
- Performing hyperparameter tuning on the test set, inflating performance estimates.
- Forgetting to shuffle data before splitting, especially for time-ordered datasets where shuffling would constitute data leakage.

---

## Overfitting – Detection and Regularisation

Overfitting occurs when a model learns the training data too well, capturing noise and idiosyncrasies rather than the underlying pattern. An overfit model has low training error but high test error. It fails to generalise because it has effectively memorised the training set. Underfitting is the opposite: the model is too simple to capture the signal in the data, resulting in high error on both training and test sets.

Regularisation is the set of techniques used to reduce overfitting by penalising model complexity. L1 regularisation (Lasso) adds a penalty proportional to the absolute value of the model weights, which tends to drive some weights all the way to zero — effectively removing those features. This makes Lasso useful for automatic feature selection. L2 regularisation (Ridge) adds a penalty proportional to the square of the weights, which shrinks all weights toward zero but rarely eliminates them entirely.

**Why it matters:**
A model that cannot generalise is not a useful model. Overfitting is the most common failure mode in machine learning, and regularisation is the primary tool for controlling it. Understanding why a model overfits — and which regularisation technique to apply — is essential for building models that perform reliably outside the training set.

**Key things to understand:**
- Learning curves (plotting training and validation error as a function of training set size) are the most direct way to diagnose overfitting and underfitting.
- Dropout is a regularisation technique specific to neural networks: randomly setting a proportion of neurons to zero during each training step forces the network to learn redundant representations.
- Early stopping halts training when validation performance stops improving, preventing overfitting in iterative algorithms such as gradient boosting and neural networks.
- Collecting more training data is often the most effective remedy for overfitting, more so than tuning regularisation hyperparameters.

**Code walkthrough:**

```python
# Step 1: Detect overfitting with learning curves — the most direct diagnostic
from sklearn.model_selection import learning_curve
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
import numpy as np
import matplotlib.pyplot as plt

X, y = make_classification(n_samples=500, n_features=20, random_state=42)

# Step 2: Compare an overfit model vs a regularised model
models = {
    "Overfit (deep trees, no regularisation)": GradientBoostingClassifier(
        n_estimators=500, max_depth=10, learning_rate=0.5, random_state=42),
    "Regularised (shallow trees, low lr)": GradientBoostingClassifier(
        n_estimators=100, max_depth=3, learning_rate=0.05, random_state=42),
}

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
for ax, (name, model) in zip(axes, models.items()):
    train_sizes, train_scores, val_scores = learning_curve(
        model, X, y, cv=5, train_sizes=np.linspace(0.1, 1.0, 8), scoring="accuracy")

    ax.plot(train_sizes, train_scores.mean(axis=1), label="Training score")
    ax.plot(train_sizes, val_scores.mean(axis=1), label="Validation score")
    ax.fill_between(train_sizes, val_scores.mean(axis=1) - val_scores.std(axis=1),
                    val_scores.mean(axis=1) + val_scores.std(axis=1), alpha=0.2)
    ax.set_title(name)
    ax.set_xlabel("Training set size")
    ax.set_ylabel("Accuracy")
    ax.legend()
    # Step 3: The GAP between train and validation indicates overfitting
    gap = train_scores.mean(axis=1)[-1] - val_scores.mean(axis=1)[-1]
    ax.annotate(f"Gap: {gap:.3f}", xy=(0.5, 0.05), xycoords="axes fraction")

plt.tight_layout()
plt.savefig("learning_curves.png", dpi=150, bbox_inches="tight")

# Step 4: L1 (Lasso) vs L2 (Ridge) regularisation
from sklearn.linear_model import Lasso, Ridge
# Lasso (L1): drives some weights to ZERO — automatic feature selection
# Ridge (L2): shrinks all weights toward zero — keeps all features
```

**Common pitfalls:**
- Tuning model complexity or regularisation strength by observing test set performance, which defeats the purpose of the test set.
- Applying regularisation without scaling features first, because regularisation penalties are scale-dependent.
- Confusing model complexity with number of parameters: a highly regularised model with many parameters can underfit, while a less regularised model with fewer parameters can overfit.
- Assuming that cross-validation eliminates the risk of overfitting; it reduces it but does not eliminate it if you tune hyperparameters across many rounds.

---

## Relational Databases – Tables, Keys and Normal Forms

A relational database organises data into tables, where each table represents a single entity type and each row is one instance of that entity. Tables are linked through keys: a primary key uniquely identifies each row within its table, and a foreign key in one table references the primary key of another, establishing a relationship between them.

Data scientists need to understand relational databases because most enterprise data lives in them. Being able to read a schema, understand how tables relate to each other, and write queries to extract the data you need is a prerequisite for working in a business environment.

**Why it matters:**
The data you need for analysis rarely lives in a single flat file. It is distributed across tables in a relational database, and you need to understand the schema to join it correctly. Misunderstanding table relationships leads to incorrect query results — sometimes without any error message to warn you.

**Key things to understand:**
- Normalisation is the process of organising a database to reduce redundancy. The normal forms (1NF, 2NF, 3NF) define progressively stricter rules about how data should be structured. In practice, understanding why data is split into multiple tables helps you write correct joins.
- A one-to-many relationship is the most common: one customer can have many orders. A many-to-many relationship (e.g., students and courses) requires a junction table.
- Indices speed up queries but add overhead on writes. Understanding when indices exist and how they are used helps you write efficient queries.
- NULL in SQL is not a value but the absence of a value. Comparisons with NULL using `=` always return NULL (unknown), not true or false. Use `IS NULL` or `IS NOT NULL` instead.

**Code walkthrough:**

```python
# Step 1: Work with relational data in Python — understand schema relationships
import pandas as pd

# Step 2: Simulate normalised tables — data is split to reduce redundancy
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4],
    "name": ["Alice", "Bob", "Charlie", "Diana"],
    "segment": ["premium", "standard", "premium", "standard"],
})

policies = pd.DataFrame({
    "policy_id": ["P001", "P002", "P003", "P004", "P005"],
    "customer_id": [1, 1, 2, 3, None],  # Note: P005 has no customer (NULL FK)
    "policy_type": ["auto", "home", "auto", "home", "auto"],
    "annual_premium": [1200, 2400, 900, 3100, 1500],
})

# Step 3: JOIN carefully — the join type determines which rows appear
# INNER JOIN: only rows with matches in BOTH tables
inner = pd.merge(customers, policies, on="customer_id", how="inner")
print(f"Inner join: {len(inner)} rows (P005 dropped — no matching customer)")

# LEFT JOIN: all customers, even those with no policies
left = pd.merge(customers, policies, on="customer_id", how="left")
print(f"Left join:  {len(left)} rows (Diana included with NaN policy)")

# Step 4: Watch for row multiplication — a common source of bugs
# Customer 1 (Alice) has 2 policies, so she appears TWICE after the join
print(f"Alice appears {len(inner[inner['name'] == 'Alice'])} times after join")
# This inflates aggregations if you are not careful
```

**Common pitfalls:**
- Joining on a column that is not unique in one of the tables, causing row multiplication (a Cartesian product effect).
- Treating a foreign key column as reliably populated when it can contain NULLs, causing records to be silently dropped in inner joins.
- Pulling entire large tables into memory in Python to do a join that could have been done in SQL, wasting memory and network bandwidth.
- Confusing the logical schema (what the data represents) with the physical schema (how it is stored), which can lead to misinterpreting query results.

---

## SQL for Data Science – Aggregations, Joins, Window Functions

SQL is the standard language for querying relational databases. For a data scientist, SQL is both an extraction tool (getting data out of a database for analysis) and an analysis tool in its own right. Many aggregations and transformations that you might perform in Pandas can be pushed down to the database, where they run more efficiently on large datasets.

Aggregation functions (COUNT, SUM, AVG, MIN, MAX) summarise groups of rows into a single value. GROUP BY determines what the groups are. HAVING filters groups after aggregation, analogous to WHERE filtering rows before aggregation. Joins combine rows from two or more tables based on a matching condition. Window functions perform calculations across a set of rows related to the current row without collapsing them into a single value, making them far more powerful than GROUP BY for many analytical queries.

**Why it matters:**
SQL is a non-negotiable skill for any data scientist working in a business context. Being able to write efficient queries means you can access the data you need quickly, perform aggregations close to the source, and avoid pulling unnecessary data across the network into Python.

**Key things to understand:**
- INNER JOIN returns only rows with matching values in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right; unmatched rows have NULLs for right-table columns.
- Window functions use the OVER clause to define the partition and ordering. ROW_NUMBER, RANK, LAG, LEAD, and running totals are common use cases.
- CTEs (Common Table Expressions, defined with the WITH keyword) make complex queries more readable by breaking them into named intermediate steps.
- Query execution order is not the same as the order you write clauses: FROM and JOIN are processed first, then WHERE, then GROUP BY, then HAVING, then SELECT, then ORDER BY.

**Code walkthrough:**

```sql
-- Step 1: Aggregation with GROUP BY — summarise data by groups
-- This runs in the database, much faster than pulling all rows into Python
SELECT
    policy_type,
    COUNT(*) AS num_claims,
    AVG(claim_amount) AS avg_claim,
    SUM(claim_amount) AS total_claims
FROM claims
GROUP BY policy_type
HAVING COUNT(*) > 10   -- HAVING filters AFTER aggregation (WHERE filters before)
ORDER BY total_claims DESC;

-- Step 2: JOIN two tables — combine claims with policy details
SELECT
    c.claim_id,
    c.claim_amount,
    p.policy_type,
    p.annual_premium,
    c.claim_amount / p.annual_premium AS claim_to_premium_ratio
FROM claims c
INNER JOIN policies p ON c.policy_id = p.policy_id
WHERE c.claim_date >= '2024-01-01';

-- Step 3: Window functions — compute values ACROSS rows without collapsing them
-- Far more powerful than GROUP BY for analytical queries
SELECT
    claim_id,
    claim_date,
    claim_amount,
    -- Running total of claims per customer, ordered by date
    SUM(claim_amount) OVER (PARTITION BY customer_id ORDER BY claim_date) AS cumulative_claims,
    -- Rank claims by amount within each policy type
    ROW_NUMBER() OVER (PARTITION BY policy_type ORDER BY claim_amount DESC) AS rank_in_type,
    -- Compare each claim to the customer's average
    claim_amount - AVG(claim_amount) OVER (PARTITION BY customer_id) AS diff_from_avg
FROM claims;

-- Step 4: CTE (Common Table Expression) — makes complex queries readable
WITH monthly_claims AS (
    SELECT
        DATE_TRUNC('month', claim_date) AS month,
        COUNT(*) AS claim_count,
        SUM(claim_amount) AS total_amount
    FROM claims
    GROUP BY DATE_TRUNC('month', claim_date)
)
SELECT
    month,
    claim_count,
    total_amount,
    LAG(total_amount) OVER (ORDER BY month) AS prev_month_total,
    total_amount - LAG(total_amount) OVER (ORDER BY month) AS month_over_month_change
FROM monthly_claims
ORDER BY month;
```

**Common pitfalls:**
- Using SELECT * in queries that retrieve large tables into memory, transferring far more data than needed.
- Placing an aggregation condition in WHERE instead of HAVING, causing a syntax error or incorrect results.
- Writing a subquery that runs once per row of the outer query (a correlated subquery) when a join or window function would be dramatically faster.
- Forgetting that NULL values are excluded from most aggregate functions, which can cause counts and averages to silently undercount.

---

## Intermediate ML – Ensembles, Gradient Boosting and Stacking

Ensemble methods combine the predictions of multiple models to produce a single prediction that is typically more accurate and more robust than any individual model. The intuition is that different models make different errors; by combining them, errors can cancel out. The three main ensemble strategies are bagging, boosting, and stacking.

Bagging trains multiple instances of the same algorithm on different random subsets of the training data and averages their predictions. Random forests are the canonical example. Boosting trains models sequentially, where each model focuses on the examples the previous models got wrong. Gradient boosting (XGBoost, LightGBM, CatBoost) is the most widely used boosting approach in practice and consistently wins tabular data competitions. Stacking trains a meta-model that takes the predictions of several base models as its input features.

**Why it matters:**
Ensemble methods are consistently among the best-performing approaches on structured tabular data. Understanding how and why they work — and their failure modes — is what lets you use them confidently rather than treating them as a black box that you tune until something works.

**Key things to understand:**
- Gradient boosting is sensitive to hyperparameters (learning rate, number of trees, tree depth, regularisation). A low learning rate with more trees generally outperforms a high learning rate with fewer trees, at the cost of training time.
- Random forests are less prone to overfitting than gradient boosting because of their parallel bagging approach, making them a lower-risk default.
- Stacking requires careful cross-validation to avoid leakage: the base model predictions used to train the meta-model must come from out-of-fold predictions, not in-sample predictions.
- Feature importance from tree-based ensembles can be misleading for highly correlated features, because importance is split between correlated features rather than attributed to one.

**Code walkthrough:**

```python
# Step 1: Gradient Boosting with hyperparameter tuning — the tabular data workhorse
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.model_selection import GridSearchCV, cross_val_score
from sklearn.datasets import make_classification
import numpy as np

X, y = make_classification(n_samples=1000, n_features=20, random_state=42)

# Step 2: Hyperparameter tuning — gradient boosting is sensitive to these
# Low learning rate + more trees generally outperforms high lr + fewer trees
param_grid = {
    "n_estimators": [100, 200],
    "learning_rate": [0.05, 0.1],
    "max_depth": [3, 5],
    "subsample": [0.8, 1.0],  # Row subsampling reduces overfitting
}

gb = GradientBoostingClassifier(random_state=42)
grid_search = GridSearchCV(gb, param_grid, cv=5, scoring="f1", n_jobs=-1, verbose=0)
grid_search.fit(X, y)

print(f"Best params: {grid_search.best_params_}")
print(f"Best F1 score: {grid_search.best_score_:.4f}")

# Step 3: Compare against a simpler baseline — Random Forest
# RF is less prone to overfitting and needs less tuning
rf_scores = cross_val_score(RandomForestClassifier(n_estimators=100, random_state=42),
                            X, y, cv=5, scoring="f1")
print(f"\nRandom Forest F1 (no tuning): {rf_scores.mean():.4f}")
print(f"Gradient Boosting F1 (tuned):  {grid_search.best_score_:.4f}")
print(f"Improvement: {grid_search.best_score_ - rf_scores.mean():.4f}")
# If the improvement is small, prefer the simpler Random Forest

# Step 4: Feature importance — understand what drives predictions
best_model = grid_search.best_estimator_
importances = best_model.feature_importances_
top_5 = np.argsort(importances)[-5:][::-1]
for idx in top_5:
    print(f"  Feature {idx}: importance = {importances[idx]:.4f}")
```

**Common pitfalls:**
- Using gradient boosting with its default hyperparameters on a small dataset and assuming the defaults are appropriate.
- Adding more models to a stack without checking whether they contribute diversity; correlated models do not improve ensemble performance.
- Interpreting ensemble feature importance as a causal explanation rather than a measure of predictive contribution.
- Neglecting the cost of inference: a large ensemble may be too slow to serve predictions in a real-time system.

---

## A/B Testing and Experiment Design

A/B testing is a controlled experiment where you split a population into a control group (which experiences no change) and a treatment group (which experiences the change you want to evaluate). By comparing the outcome metric between the two groups, you can determine whether the change had a statistically significant effect. Experiment design is the discipline of setting up these tests so that the results are valid and actionable.

**Why it matters:**
Data scientists in insurance are frequently asked to evaluate changes — a new pricing model, a revised policy wording, a marketing campaign — and determine whether they actually work. A/B testing provides the rigorous framework for answering "did this change make a difference?" without being misled by noise, trends, or confirmation bias.

**Key things to understand:**
- Sample size must be calculated before the experiment starts, based on the expected effect size, the desired statistical power (typically 80%), and the significance level. Running an experiment with too few observations wastes time because you cannot detect a real effect even if one exists.
- Statistical power is the probability of detecting an effect when one truly exists. Low power means a high risk of false negatives (concluding "no effect" when there is one).
- Peeking at results before the predetermined sample size is reached and stopping early when results look significant inflates the false positive rate. Define the stopping rule before the experiment begins and follow it.
- When testing multiple variants or metrics simultaneously, the probability of at least one false positive increases. Apply corrections such as the Bonferroni method (dividing the significance threshold by the number of comparisons) to control for this.
- In insurance contexts, A/B tests are used to evaluate pricing model changes on conversion and loss ratios, test marketing interventions for cross-selling, and assess the impact of policy or process changes on customer behaviour.

**Code walkthrough:**

```python
# Step 1: Sample size calculation — MUST be done BEFORE the experiment starts
from scipy import stats
import numpy as np

def calculate_sample_size(baseline_rate, min_detectable_effect, alpha=0.05, power=0.80):
    """Why calculate upfront? Running an underpowered experiment wastes time —
    you cannot detect a real effect even if one exists."""
    p1 = baseline_rate
    p2 = baseline_rate + min_detectable_effect
    # Using the formula for two-proportion z-test
    z_alpha = stats.norm.ppf(1 - alpha / 2)
    z_beta = stats.norm.ppf(power)
    p_avg = (p1 + p2) / 2
    n = ((z_alpha * np.sqrt(2 * p_avg * (1 - p_avg)) +
          z_beta * np.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) /
         (p2 - p1)) ** 2
    return int(np.ceil(n))

# Example: current conversion rate is 5%, we want to detect a 1% lift
n_per_group = calculate_sample_size(baseline_rate=0.05, min_detectable_effect=0.01)
print(f"Required sample size per group: {n_per_group:,}")

# Step 2: Analyse A/B test results — AFTER reaching the required sample size
np.random.seed(42)
control = np.random.binomial(1, 0.05, n_per_group)       # 5% conversion
treatment = np.random.binomial(1, 0.06, n_per_group)      # 6% conversion

# Step 3: Two-proportion z-test
from statsmodels.stats.proportion import proportions_ztest
count = np.array([treatment.sum(), control.sum()])
nobs = np.array([len(treatment), len(control)])
z_stat, p_value = proportions_ztest(count, nobs, alternative="larger")

print(f"\nControl conversion:   {control.mean():.4f}")
print(f"Treatment conversion: {treatment.mean():.4f}")
print(f"Lift: {(treatment.mean() - control.mean()) / control.mean() * 100:.1f}%")
print(f"P-value: {p_value:.4f}")
print(f"Significant at 0.05? {'Yes' if p_value < 0.05 else 'No'}")

# Step 4: Check PRACTICAL significance — not just statistical significance
# A 0.1% lift that is statistically significant may not justify implementation cost
```

**Common pitfalls:**
- Stopping an experiment as soon as the p-value drops below 0.05 rather than waiting for the pre-determined sample size, which dramatically increases the false positive rate.
- Failing to account for multiple comparisons when testing several metrics or variants, leading to spurious "significant" results.
- Not checking that control and treatment groups are properly randomised, which introduces selection bias and invalidates the results.
- Ignoring practical significance: a statistically significant effect that is too small to matter operationally does not justify the cost of implementation.

---

## AI-Assisted Analysis – Practical Use in Data Science Workflows

AI tools, particularly large language models, have become practical aids in data science work. They can accelerate code writing, explain unfamiliar APIs and error messages, suggest analytical approaches, and help draft summaries of findings. Used thoughtfully, they compress the time between a question and a working prototype.

The key to using these tools effectively is understanding their limitations. Language models generate plausible-sounding output, but they do not execute code or check their own answers against data. They can hallucinate function names, invent parameter values, or suggest approaches that are subtly wrong for your specific context. The data scientist remains responsible for verifying every output.

**Why it matters:**
AI-assisted development is rapidly becoming a baseline expectation, not an advanced skill. Data scientists who use these tools effectively work faster. Those who use them carelessly introduce subtle bugs and incorrect analysis into their work. The skill is knowing how to use them appropriately.

**Key things to understand:**
- AI tools are most reliable for well-defined, bounded tasks: writing boilerplate code, translating between SQL and Pandas, explaining what a specific function does, or generating a starting point for a visualisation.
- For analysis-level tasks (interpreting model results, drawing conclusions from data), AI-generated text should be treated as a draft that requires domain expert review.
- Providing clear, specific prompts with relevant context (column names, dataset description, what you have already tried) produces much better results than vague requests.
- Code generated by AI tools must be tested. Run it on a small representative sample, inspect the output, and verify it matches your expectation before applying it to the full dataset.

**Code walkthrough:**

```python
# Step 1: Effective AI-assisted analysis — specific prompts get useful results
# The key skill is knowing what to verify vs what to trust

# Step 2: Example — using AI to generate a starting point for analysis code
good_prompt = """I have a pandas DataFrame 'claims_df' with columns:
- claim_id (int), customer_id (int), claim_amount (float),
- claim_date (datetime), policy_type (str: 'auto', 'home', 'health'),
- is_fraud (bool)

Write code to:
1. Show the fraud rate by policy_type
2. Create a box plot of claim_amount by policy_type, coloured by is_fraud
3. Calculate the mean claim amount for fraud vs non-fraud cases

Use seaborn for the plot. Include axis labels and a title."""

# Step 3: ALWAYS verify AI-generated code before running on real data
def verify_ai_output(df, generated_code_output):
    """Checklist for verifying AI-generated analysis code:
    1. Does it handle missing values? (AI often assumes clean data)
    2. Are the column names correct? (AI may hallucinate column names)
    3. Does the logic match your intent? (Read every line)
    4. Run on a small sample first before the full dataset"""
    checks = {
        "columns_exist": all(col in df.columns for col in ["claim_amount", "policy_type"]),
        "no_missing_critical": df["claim_amount"].notna().all(),
        "sample_size_adequate": len(df) > 100,
    }
    for check, passed in checks.items():
        status = "PASS" if passed else "FAIL"
        print(f"  [{status}] {check}")
    return all(checks.values())

# Step 4: Tasks where AI tools are MOST reliable
RELIABLE_TASKS = [
    "Translating SQL queries to Pandas and vice versa",
    "Writing boilerplate plot code (matplotlib/seaborn)",
    "Explaining error messages and stack traces",
    "Generating docstrings for existing functions",
]

# Step 5: Tasks where AI tools need CAREFUL verification
VERIFY_CAREFULLY = [
    "Statistical test selection — AI may suggest wrong test for your data",
    "Interpreting model results — AI lacks your domain context",
    "Data cleaning decisions — AI cannot see data quality issues you know about",
]
```

**Common pitfalls:**
- Copying AI-generated code into a notebook without reading it, missing bugs or inappropriate assumptions.
- Using AI tools to summarise or interpret data without having inspected the data yourself, potentially missing context the model cannot see.
- Treating AI suggestions as authoritative; the model does not know your business context, data quirks, or the history of previous analytical decisions.
- Sharing sensitive or proprietary data in prompts without checking your organisation's data handling policies for the tool in question.

---

## Time-Series Analysis and Forecasting

Time-series analysis deals with data points collected over time — measurements where the order matters. Unlike cross-sectional data (where each observation is independent), time-series data has inherent temporal structure: trends, seasonality, autocorrelation, and non-stationarity. Forecasting future values based on historical patterns is one of the most practical applications of data science in insurance.

In an insurance context, time-series data is everywhere: monthly claims volumes, daily premium income, quarterly loss ratios, seasonal patterns in car accidents or water damage claims, and reserve development over time. Being able to model and forecast these patterns supports pricing, reserving, capacity planning, and fraud detection.

**Why it matters:**
Time-series forecasting is one of the most directly valuable skills for a data scientist in insurance. Accurate forecasts of claims frequency, severity, and reserve development directly impact financial planning and regulatory reporting. Understanding the temporal structure of your data prevents you from applying cross-sectional methods where they do not apply.

**Key things to understand:**
- Stationarity: a time series is stationary when its statistical properties (mean, variance) do not change over time. Most forecasting methods assume stationarity, so you must detect and handle trends and seasonality first (differencing, decomposition)
- ARIMA (AutoRegressive Integrated Moving Average): the classical framework for time-series modelling. AR models use past values, MA models use past errors, and the I (integrated) part handles differencing for non-stationary series. Understanding ARIMA builds intuition even if you use more modern methods
- Prophet (by Meta): a practical, robust forecasting tool designed for business time series with strong seasonal patterns and missing data. It handles holidays, changepoints, and multiple seasonalities automatically. Good default choice for business forecasting tasks
- Seasonality: recurring patterns at fixed intervals (weekly, monthly, yearly). Insurance claims often show strong seasonality — water damage peaks in spring, traffic accidents increase in winter
- Train/test splitting for time series: you cannot randomly split time-series data. The test set must be the most recent observations, and the training set must precede it temporally. Cross-validation must also respect temporal ordering (expanding window or sliding window)
- Evaluation metrics: MAE (Mean Absolute Error), RMSE (Root Mean Squared Error), MAPE (Mean Absolute Percentage Error). Always compare against a naive baseline (e.g., "same as last year") to verify your model adds value

**Code walkthrough:**

```python
# Step 1: Time-series analysis — temporal order MUST be preserved
import pandas as pd
import numpy as np
from statsmodels.tsa.seasonal import seasonal_decompose

# Step 2: Generate monthly claims data with trend and seasonality
np.random.seed(42)
dates = pd.date_range("2020-01-01", periods=48, freq="MS")  # 4 years monthly
trend = np.linspace(100, 200, 48)
seasonality = 20 * np.sin(2 * np.pi * np.arange(48) / 12)  # Yearly cycle
noise = np.random.normal(0, 10, 48)
claims = pd.Series(trend + seasonality + noise, index=dates, name="claims_count")

# Step 3: Decompose into trend, seasonal, and residual components
# This reveals the structure the model needs to capture
decomposition = seasonal_decompose(claims, model="additive", period=12)
print(f"Trend range: {decomposition.trend.dropna().min():.0f} to {decomposition.trend.dropna().max():.0f}")
print(f"Seasonal amplitude: {decomposition.seasonal.max():.0f}")

# Step 4: Train/test split for time series — NEVER random split!
# The test set must be the most RECENT observations
train = claims[:"2022-12"]
test = claims["2023-01":]
print(f"\nTrain: {train.index[0].date()} to {train.index[-1].date()} ({len(train)} months)")
print(f"Test:  {test.index[0].date()} to {test.index[-1].date()} ({len(test)} months)")

# Step 5: Forecast with Prophet — practical for business time series
from prophet import Prophet

df_prophet = pd.DataFrame({"ds": train.index, "y": train.values})
model = Prophet(yearly_seasonality=True, weekly_seasonality=False, daily_seasonality=False)
model.fit(df_prophet)

future = model.make_future_dataframe(periods=len(test), freq="MS")
forecast = model.predict(future)

# Step 6: Evaluate against naive baseline — "same as last year"
from sklearn.metrics import mean_absolute_error
naive_pred = claims.shift(12).loc[test.index]  # Last year's values
prophet_pred = forecast.set_index("ds").loc[test.index, "yhat"]
print(f"\nNaive baseline MAE:  {mean_absolute_error(test, naive_pred.dropna()):.1f}")
print(f"Prophet MAE:         {mean_absolute_error(test, prophet_pred):.1f}")
```

**Common pitfalls:**
- Using random train/test splits on time-series data, which leaks future information into the training set and produces overly optimistic evaluation metrics
- Ignoring stationarity and applying methods that assume it without checking — leading to spurious results and unreliable forecasts
- Overfitting to historical patterns that do not repeat — pandemic effects, regulatory changes, or one-time events should not be extrapolated
- Not accounting for external regressors (weather, economic indicators) that explain variation better than the time series alone

---

## Class Imbalance

Class imbalance occurs when one class in a classification problem significantly outnumbers the other. In insurance, this is the norm rather than the exception: fraud is rare (perhaps 1–5% of claims), customer churn affects a minority of policyholders, and catastrophic claims are infrequent. Standard classification algorithms trained on imbalanced data tend to predict the majority class almost exclusively, achieving high accuracy but failing to detect the minority class that you actually care about.

**Why it matters:**
If you train a fraud detection model on a dataset where 2% of claims are fraudulent, a model that simply predicts "not fraud" for every claim achieves 98% accuracy — and catches zero fraud. Class imbalance handling is essential for building models that are actually useful for the minority-class problems that dominate insurance data science.

**Key things to understand:**
- SMOTE (Synthetic Minority Oversampling Technique): generates synthetic examples of the minority class by interpolating between existing minority examples. imbalanced-learn provides SMOTE and its variants (Borderline-SMOTE, SMOTE-ENN). Always apply SMOTE only to the training set, never the test set
- Threshold tuning: instead of using the default 0.5 classification threshold, adjust the threshold to balance precision and recall for your specific business needs. A fraud detection model might use a lower threshold (0.3) to catch more fraud at the cost of more false positives
- Precision-recall trade-off: precision (of predicted frauds, how many are actually fraud?) and recall (of actual frauds, how many did the model catch?). Use precision-recall curves and F1/F-beta scores instead of accuracy for imbalanced problems
- Class weights: most sklearn classifiers accept a `class_weight='balanced'` parameter that automatically adjusts the loss function to penalise minority-class misclassification more heavily. This is often the simplest and most effective approach
- Cost-sensitive learning: when the business cost of a false negative (missing a fraud) differs greatly from a false positive (investigating a legitimate claim), incorporate these costs directly into model training or threshold selection
- Evaluation metrics: avoid accuracy. Use precision, recall, F1-score, AUC-PR (Area Under the Precision-Recall Curve), and confusion matrices. AUC-ROC can be misleading when the positive class is very rare

**Code walkthrough:**

```python
# Step 1: Handle class imbalance — the norm in insurance data
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, precision_recall_curve
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
import numpy as np

# 2% fraud rate — "predict not fraud" gets 98% accuracy and catches NOTHING
X, y = make_classification(n_samples=5000, weights=[0.98, 0.02],
                           n_features=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,
                                                     stratify=y, random_state=42)
print(f"Training set: {sum(y_train==0)} legitimate, {sum(y_train==1)} fraud")

# Step 2: Approach 1 — class_weight='balanced' (simplest, often sufficient)
model_weighted = RandomForestClassifier(n_estimators=100, class_weight="balanced", random_state=42)
model_weighted.fit(X_train, y_train)
print("\nApproach 1: class_weight='balanced'")
print(classification_report(y_test, model_weighted.predict(X_test), target_names=["legit", "fraud"]))

# Step 3: Approach 2 — SMOTE (generate synthetic minority examples)
# CRITICAL: apply SMOTE ONLY to training data, NEVER to test data
smote_pipeline = ImbPipeline([
    ("smote", SMOTE(random_state=42)),
    ("classifier", RandomForestClassifier(n_estimators=100, random_state=42)),
])
smote_pipeline.fit(X_train, y_train)
print("Approach 2: SMOTE")
print(classification_report(y_test, smote_pipeline.predict(X_test), target_names=["legit", "fraud"]))

# Step 4: Threshold tuning — adjust the decision boundary for your business needs
probas = model_weighted.predict_proba(X_test)[:, 1]
# Lower threshold = catch more fraud (higher recall) but more false alarms
for threshold in [0.3, 0.5, 0.7]:
    preds = (probas >= threshold).astype(int)
    tp = ((preds == 1) & (y_test == 1)).sum()
    fp = ((preds == 1) & (y_test == 0)).sum()
    fn = ((preds == 0) & (y_test == 1)).sum()
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    print(f"Threshold {threshold}: Precision={precision:.3f}, Recall={recall:.3f}")
```

**Common pitfalls:**
- Reporting accuracy as the primary metric for imbalanced classification — a model can achieve 99% accuracy and be completely useless if it never detects the minority class
- Applying SMOTE to the entire dataset before splitting into train/test, which leaks synthetic information into the test set and inflates performance estimates
- Over-sampling the minority class so aggressively that the model overfits to synthetic examples and generalises poorly to real data
- Not considering the business impact of false positives — in fraud detection, every false positive means a legitimate customer is flagged for investigation, which has a cost and customer experience impact
