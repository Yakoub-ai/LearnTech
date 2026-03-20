# ML Engineer – Beginner Concept Reference


This document provides in-depth explanations of the core concepts covered at the Beginner level of the ML Engineer learning path. Each section describes what a concept is, why it matters in practice, what you need to understand about it, and the mistakes engineers most commonly make when encountering it for the first time.

---

## Machine Learning – What It Is and How It Differs from Traditional Programming

Machine learning (ML) is a branch of computer science where a system learns patterns from data rather than following a set of hand-written rules. In traditional programming, a developer explicitly encodes every decision the program can make: if the input looks like X, return Y. In ML, the developer instead provides examples of inputs and desired outputs, and an algorithm finds the mapping between them automatically.

This distinction matters because many real-world problems are too complex or too variable to encode as explicit rules. Recognising whether an image contains a cat, predicting whether a loan will default, or deciding what product to recommend next would each require thousands of brittle, hand-crafted rules in a traditional approach. An ML model can learn those patterns directly from data.

**Code walkthrough:**

```python
# Step 1: Traditional programming — rules are hand-coded by the developer
# This works when the logic is simple and stable
def classify_claim_rules(amount, category):
    """Rule-based: every decision is an explicit if/else.
    Works for simple cases, but breaks when patterns are complex."""
    if amount > 50000:
        return "high_priority"
    elif category == "water_damage" and amount > 10000:
        return "medium_priority"
    else:
        return "low_priority"

# Step 2: Machine learning — the model learns the rules from data
# This works when patterns are complex or change over time
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# Training data: the model learns the mapping from examples
X_train = np.array([[55000, 1], [8000, 0], [12000, 1], [3000, 0], [75000, 1]])
y_train = np.array(["high", "low", "medium", "low", "high"])

model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Step 3: The model now makes predictions on NEW data it has never seen
# It learned the pattern — we did not code the rules explicitly
new_claim = np.array([[25000, 1]])  # $25k water damage claim
prediction = model.predict(new_claim)
print(f"ML prediction: {prediction[0]}")

# Step 4: When ML is NOT the right tool
# If you can write the rules in 10 lines and they rarely change,
# a rule-based approach is simpler, faster, and easier to debug
```

**Why it matters:** Everything you do in this role rests on understanding the difference between rule-based logic and learned behaviour. Knowing when ML is the right tool — and when a simpler rule-based approach is better — is a judgement you will exercise constantly.

**Key things to understand:**
- In traditional programming, logic flows from code. In ML, logic flows from data.
- ML models are not programmed; they are trained on examples.
- The quality and quantity of training data directly determines model quality.
- ML is not a replacement for all software engineering; it is a tool for specific problem types.

**Common pitfalls:**
- Assuming ML will always outperform a well-tuned rule-based system — for simple, stable problems it often will not.
- Treating ML as a black box without understanding what problem it is actually solving.
- Underestimating how much effort data preparation requires relative to model building.

---

## Supervised vs Unsupervised vs Reinforcement Learning

These three terms describe the fundamental modes by which ML models are trained, and they differ in what kind of signal the algorithm uses to learn.

Supervised learning is the most common approach. The training data consists of input-output pairs — for example, images labelled as "cat" or "not cat". The algorithm learns a function that maps inputs to outputs by minimising the difference between its predictions and the correct labels. There are two main task types: classification (predicting a discrete category, such as spam/not spam) and regression (predicting a continuous value, such as house price). Both are supervised learning — the difference is in the output type.

Unsupervised learning is used when labelled data is unavailable or impractical to obtain. The algorithm receives only inputs and must discover structure on its own. Common examples include clustering (grouping customers by purchasing behaviour using algorithms like K-means) and dimensionality reduction (compressing a high-dimensional dataset for visualisation using techniques like PCA). The algorithm is not told what the "right" answer is — it finds groupings or patterns inferred from the data distribution.

Reinforcement learning involves an agent that learns by interacting with an environment. The agent takes actions, receives rewards or penalties, and updates its behaviour to maximise cumulative reward over time. It is used for game-playing systems, robotics, and increasingly for fine-tuning large language models via techniques such as RLHF (reinforcement learning from human feedback).

**Code walkthrough:**

```python
# Step 1: Supervised learning — classification (predict a category)
# Requires labelled data: input-output pairs
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load labelled data — each flower has features AND a known species label
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)  # Learn the mapping: features -> species
print(f"Classification accuracy: {accuracy_score(y_test, clf.predict(X_test)):.2f}")

# Step 2: Supervised learning — regression (predict a continuous number)
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import numpy as np

# Predict claim amount from features — the target is a number, not a category
X_claims = np.array([[25, 2], [45, 5], [30, 1], [60, 8]])  # age, num_prior_claims
y_amounts = np.array([2000, 8000, 1500, 12000])  # claim amounts

reg = LinearRegression()
reg.fit(X_claims, y_amounts)
predicted = reg.predict(np.array([[35, 3]]))
print(f"Predicted claim amount: ${predicted[0]:.0f}")

# Step 3: Unsupervised learning — clustering (no labels, discover structure)
from sklearn.cluster import KMeans

# No labels! The algorithm finds groups on its own
customer_data = np.array([[25, 30000], [45, 80000], [22, 28000], [50, 95000], [30, 35000]])
kmeans = KMeans(n_clusters=2, random_state=42, n_init=10)
clusters = kmeans.fit_predict(customer_data)
print(f"Cluster assignments: {clusters}")
# Output might be [0, 1, 0, 1, 0] — two natural groups discovered
```

**Why it matters:** Choosing the wrong learning paradigm for a problem will lead to failure regardless of how well the rest of the pipeline is built.

**Key things to understand:**
- Supervised learning requires labelled data, which is expensive to produce.
- Classification predicts a category; regression predicts a continuous number — both are supervised tasks.
- Unsupervised learning outputs are harder to evaluate because there is no ground truth.
- Reinforcement learning is the most complex to implement and debug.

**Common pitfalls:**
- Attempting to apply supervised learning without investing in data labelling quality.
- Conflating clustering (unsupervised) with classification (supervised) — they look similar but clustering has no predefined classes.
- Treating reinforcement learning as a go-to approach when simpler supervised methods would suffice.

---

## The ML Training Pipeline – Data, Features, Model, Evaluation

Building an ML model is not a single step — it is a sequential pipeline. Understanding each stage and how they interact is essential before writing a line of model code.

Data collection and preparation is almost always the longest phase. Raw data is messy: it contains missing values, inconsistent formatting, duplicates, and noise. Engineers must clean it, handle missing entries (by imputation or removal), and split it into training, validation, and test sets. The split ensures that the model is evaluated on data it has never seen during training.

Feature engineering transforms raw data into a format the model can learn from. A column of raw timestamps, for instance, is rarely useful as-is; extracting the hour of day, day of week, or whether a date is a public holiday may each be far more informative. Numerical features may need scaling. Categorical features need encoding (for example, one-hot encoding or ordinal encoding).

Model training is the phase where the algorithm processes the training data and adjusts its internal parameters to minimise a loss function — a measure of how wrong its predictions are. This process is iterative. After training, the model is evaluated against held-out data; those results feed back into earlier stages (more data, different features, a different model) until performance meets requirements. The full cycle is: data collection → preprocessing and cleaning → feature engineering → model selection → training → evaluation → deployment → monitoring.

**Code walkthrough:**

```python
# Step 1: Data loading and initial inspection — always start here
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load data and immediately inspect it — never skip this step
df = pd.read_csv("claims_data.csv")
print(df.info())      # Data types, null counts, memory usage
print(df.describe())  # Statistics: mean, std, min, max, quartiles
print(f"Missing values:\n{df.isnull().sum()}")

# Step 2: Data cleaning — handle missing values BEFORE splitting
# Why before splitting? Because the cleaning strategy should be decided
# on the full picture, but fitted only on training data
df["age"].fillna(df["age"].median(), inplace=True)
df.drop_duplicates(inplace=True)

# Step 3: Feature engineering — transform raw data into model-ready features
df["claim_to_premium_ratio"] = df["claim_amount"] / df["annual_premium"]
df["is_weekend"] = pd.to_datetime(df["incident_date"]).dt.dayofweek >= 5

# Step 4: Train/test split — MUST happen before any model-dependent preprocessing
X = df[["age", "claim_amount", "claim_to_premium_ratio", "is_weekend"]]
y = df["is_fraud"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# Step 5: Scale features — fit on training data ONLY, then transform both
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # fit + transform on train
X_test_scaled = scaler.transform(X_test)         # transform only on test

# Step 6: Train, evaluate, iterate
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)
print(classification_report(y_test, model.predict(X_test_scaled)))
```

**Why it matters:** Skipping or rushing any stage of the pipeline consistently produces worse results than spending more time on the stage that actually limits model quality — which is usually data quality and feature design, not model choice.

**Key things to understand:**
- The pipeline is iterative, not linear — results from evaluation feed back into earlier stages.
- Data quality has a larger impact on final model performance than algorithm choice.
- Test set data must never influence any decision made before final evaluation.
- Deployment and monitoring are part of the pipeline, not afterthoughts — models degrade as real-world data drifts from training data.

**Common pitfalls:**
- Data leakage: allowing test data to influence the training process, producing misleadingly high evaluation scores.
- Skipping exploratory data analysis before modelling.
- Evaluating a model on the training set and mistaking that for generalisation.

---

## Overfitting, Underfitting and the Bias-Variance Trade-off

These three concepts describe the central tension in training any ML model: a model that is too simple fails to capture the patterns in the data, while a model that is too complex memorises the training data and fails to generalise.

Underfitting occurs when the model is not expressive enough to capture the underlying pattern. A linear model applied to inherently non-linear data will underfit. The model will perform poorly on both training and test data. This reflects high bias — the model has made overly strong assumptions about the data.

Overfitting occurs when the model has learned the training data too well, including its noise and random fluctuations. It performs well on training data but poorly on new, unseen data. This reflects high variance — small changes in the training data produce large changes in the model. Common causes of overfitting include using a model that is too complex relative to the amount of training data. Solutions include collecting more data, applying regularisation (L1/Lasso shrinks some weights to zero; L2/Ridge penalises large weights), using dropout in neural networks, and early stopping during training.

The bias-variance trade-off captures the fact that reducing one type of error tends to increase the other. The goal is to find the sweet spot — a model complex enough to capture real patterns, but regularised enough not to memorise noise.

Cross-validation is the standard technique for estimating how well a model generalises before committing to a final evaluation. In k-fold cross-validation, the training data is divided into k equal folds. The model is trained k times; each time, a different fold is held out as the validation set and the remaining k-1 folds are used for training. The k validation scores are averaged to produce a more reliable generalisation estimate than a single split. This is important because a single train-validation split can be misleading if the split was lucky or unlucky.

**Code walkthrough:**

```python
# Step 1: Demonstrate overfitting vs good generalisation
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, learning_curve
from sklearn.datasets import make_classification
import numpy as np

# Create a dataset with some noise — like real-world data
X, y = make_classification(n_samples=500, n_features=20, n_informative=10,
                           n_redundant=5, random_state=42)

# Step 2: An overfit model — unlimited depth memorises training noise
overfit_model = DecisionTreeClassifier(max_depth=None, random_state=42)
overfit_scores = cross_val_score(overfit_model, X, y, cv=5, scoring="accuracy")
print(f"Overfit tree — CV accuracy: {overfit_scores.mean():.3f} (+/- {overfit_scores.std():.3f})")

# Step 3: A regularised model — max_depth limits complexity
regularised_model = DecisionTreeClassifier(max_depth=5, random_state=42)
regularised_scores = cross_val_score(regularised_model, X, y, cv=5, scoring="accuracy")
print(f"Regularised tree — CV accuracy: {regularised_scores.mean():.3f} (+/- {regularised_scores.std():.3f})")

# Step 4: Cross-validation gives a reliable generalisation estimate
# Why k-fold? A single train/test split can be misleadingly lucky or unlucky
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
cv_scores = cross_val_score(rf_model, X, y, cv=5, scoring="accuracy")
print(f"Random Forest — CV accuracy: {cv_scores.mean():.3f} (+/- {cv_scores.std():.3f})")
print(f"Individual fold scores: {cv_scores}")

# Step 5: Learning curves diagnose overfitting visually
# Gap between train and validation = overfitting
# Both low = underfitting
train_sizes, train_scores, val_scores = learning_curve(
    rf_model, X, y, cv=5, train_sizes=np.linspace(0.1, 1.0, 10), scoring="accuracy"
)
print(f"\nAt full data — Train: {train_scores[-1].mean():.3f}, Val: {val_scores[-1].mean():.3f}")
print(f"Gap: {train_scores[-1].mean() - val_scores[-1].mean():.3f} (smaller = less overfitting)")
```

**Why it matters:** Overfitting is the most common failure mode in ML. A model that performs brilliantly on the training set but fails on real data delivers no value — and can actively mislead stakeholders who only see the training metrics.

**Key things to understand:**
- High training accuracy alongside low test accuracy is a strong signal of overfitting.
- Regularisation techniques (L1, L2, dropout) are tools for controlling overfitting.
- Cross-validation (k-fold) gives a more reliable estimate of generalisation than a single train-test split.
- More training data generally reduces overfitting.
- Early stopping halts training when validation performance stops improving, preventing further overfitting.

**Common pitfalls:**
- Tuning hyperparameters to maximise test set performance, which causes the test set to leak into model selection and defeats its purpose.
- Adding more model complexity as a first response to underfitting without first checking data quality.
- Ignoring learning curves, which visually diagnose both underfitting and overfitting.

---

## Python for ML – NumPy Arrays and Vectorised Operations

NumPy is the foundational numerical computing library for Python and underpins virtually every ML and data science library in the ecosystem, including scikit-learn, Pandas, and PyTorch. Its central data structure is the ndarray (n-dimensional array), and its defining characteristic is vectorised computation.

Vectorised operations allow mathematical operations to be applied to entire arrays at once, without writing explicit Python loops. This matters because Python loops are slow for numerical work — they interpret each iteration individually. NumPy operations, by contrast, execute in compiled C code and operate on blocks of memory directly, making them orders of magnitude faster.

An array of a million floating-point numbers can be multiplied by a scalar, squared, or added to another array in a single line, and the operation will complete in milliseconds rather than seconds. Broadcasting is NumPy's mechanism for performing operations between arrays of different but compatible shapes — for example, adding a 1D array of shape (3,) to a 2D array of shape (4, 3) without explicitly repeating the 1D array. Understanding broadcasting rules prevents a common class of shape mismatch errors.

**Code walkthrough:**

```python
# Step 1: NumPy arrays vs Python lists — why arrays are essential for ML
import numpy as np
import time

# Step 2: Vectorised operations are orders of magnitude faster than loops
data = np.random.randn(1_000_000)  # 1 million random numbers

# SLOW: Python loop — processes one element at a time
start = time.time()
result_loop = [x ** 2 + 2 * x + 1 for x in data]
loop_time = time.time() - start

# FAST: NumPy vectorised — processes all elements in compiled C code
start = time.time()
result_numpy = data ** 2 + 2 * data + 1
numpy_time = time.time() - start

print(f"Python loop: {loop_time:.3f}s | NumPy: {numpy_time:.4f}s")
print(f"NumPy is {loop_time / numpy_time:.0f}x faster")

# Step 3: Broadcasting — operations between arrays of different shapes
# This avoids explicitly repeating arrays, saving memory and time
features = np.array([[1.0, 200, 0.5],
                     [2.0, 300, 0.8],
                     [1.5, 250, 0.6]])  # Shape: (3, 3)

# Normalise each column: subtract mean, divide by std
# Broadcasting handles the shape mismatch automatically
means = features.mean(axis=0)   # Shape: (3,) — one mean per column
stds = features.std(axis=0)     # Shape: (3,)
normalised = (features - means) / stds  # (3,3) - (3,) = broadcasts correctly
print(f"Normalised:\n{normalised}")

# Step 4: Slicing returns VIEWS, not copies — a common trap
original = np.array([10, 20, 30, 40, 50])
slice_view = original[1:4]
slice_view[0] = 999  # This MODIFIES the original array!
print(f"Original after modifying slice: {original}")  # [10, 999, 30, 40, 50]
```

**Why it matters:** NumPy is the foundation of the entire Python ML stack. You will encounter ndarrays constantly — as model inputs, as outputs, as intermediate representations. Fluency with vectorised operations is the difference between code that runs in milliseconds and code that runs in minutes.

**Key things to understand:**
- NumPy arrays are homogeneous: all elements must be the same data type. This enables the memory efficiency that makes vectorised operations fast.
- Broadcasting rules govern how NumPy handles operations between arrays of different shapes. Understanding broadcasting prevents shape mismatch errors.
- Avoid Python loops over array elements wherever possible; always seek a vectorised equivalent.
- Array indexing and slicing in NumPy follows the same principles as Python list indexing but extends to multiple dimensions.

**Common pitfalls:**
- Confusing 1D arrays with column or row vectors, leading to shape errors in matrix operations.
- Using Python lists where NumPy arrays are needed, then being surprised by element-wise multiplication not working as expected.
- Copying arrays unintentionally — NumPy slices are views, not copies, so modifying a slice modifies the original.

---

## Pandas – DataFrames and Data Manipulation

Pandas provides the DataFrame, a two-dimensional, labelled data structure that is the standard tool for tabular data manipulation in Python. If NumPy is the foundation for numerical computation, Pandas is the foundation for data preparation. A Series is a single labelled column — a DataFrame is a collection of Series sharing the same index.

A DataFrame behaves like a spreadsheet with named columns and an index. It can hold columns of different types — integers, floats, strings, datetimes — in the same structure. Most real-world datasets arrive as CSV or database tables and are loaded directly into a DataFrame.

Core operations include: filtering rows with boolean conditions, selecting columns, handling missing values with `fillna` or `dropna`, grouping and aggregating with `groupby`, joining multiple DataFrames with `merge`, reshaping with `pivot_table`, and applying custom functions with `apply`. Row selection by label uses `.loc`; by integer position uses `.iloc` — confusing these two is a frequent source of bugs. These operations compose into the data preparation workflows that precede model training.

**Code walkthrough:**

```python
# Step 1: Load data and inspect immediately — this is always the first step
import pandas as pd

df = pd.read_csv("insurance_claims.csv")

# Step 2: First two commands on ANY new dataset — understand shape and types
print(df.info())       # Columns, dtypes, null counts
print(df.describe())   # Statistical summary of numeric columns

# Step 3: Handling missing values — decide strategy based on the data
print(f"Missing values:\n{df.isnull().sum()}\n")

# fillna: replace missing values (use median for skewed numeric data)
df["claim_amount"].fillna(df["claim_amount"].median(), inplace=True)

# dropna: remove rows where critical columns are missing
df.dropna(subset=["policy_id"], inplace=True)

# Step 4: Filtering with boolean conditions using .loc
# .loc = label-based selection; .iloc = integer position-based
high_value = df.loc[df["claim_amount"] > 10000, ["policy_id", "claim_amount", "status"]]
print(f"High-value claims: {len(high_value)}")

# Step 5: groupby — split data, apply function, combine results
# This is one of the most powerful operations in Pandas
avg_by_type = df.groupby("claim_type")["claim_amount"].agg(["mean", "median", "count"])
print(avg_by_type)

# Step 6: merge — join two DataFrames like SQL JOIN
policies = pd.DataFrame({"policy_id": ["P001", "P002"], "premium": [1200, 2400]})
claims = pd.DataFrame({"policy_id": ["P001", "P001", "P002"], "amount": [500, 800, 3000]})
merged = pd.merge(claims, policies, on="policy_id", how="left")
merged["claim_to_premium"] = merged["amount"] / merged["premium"]
print(merged)
```

**Why it matters:** The majority of time in any ML project is spent preparing data. Fluency in Pandas directly translates to speed and correctness in data work.

**Key things to understand:**
- A DataFrame is a table; a Series is a single column. Both share the same index-based alignment system.
- `.loc` selects by label; `.iloc` selects by integer position — they are not interchangeable.
- Operations that look like they modify a DataFrame in place often do not — always assign results back or use `inplace=True` explicitly.
- Pandas is not designed for very large datasets (beyond memory). At that scale, tools like Polars, Dask, or Spark are more appropriate.

**Common pitfalls:**
- The `SettingWithCopyWarning`: modifying a slice of a DataFrame instead of the original. Use `.loc` for explicit selection.
- Forgetting to reset the index after filtering, causing confusing downstream behaviour.
- Using `iterrows()` for row-by-row operations instead of vectorised Pandas methods or `apply()`, which is dramatically slower.

---

## Model Evaluation – Accuracy, Precision, Recall, F1, RMSE and Confusion Matrices

Choosing the right evaluation metric is as important as choosing the right model. A single number can conceal critical information about how a model behaves on different subsets of the data.

**Classification metrics.** Accuracy is the fraction of predictions that are correct. It is intuitive but misleading on imbalanced datasets. A model that always predicts "not fraud" on a dataset where 99% of transactions are legitimate achieves 99% accuracy while being completely useless.

A confusion matrix breaks down predictions into four categories for a binary classifier: true positives (TP — correctly predicted positive), true negatives (TN — correctly predicted negative), false positives (FP — predicted positive, actually negative), and false negatives (FN — predicted negative, actually positive). All other classification metrics derive from these four numbers.

Precision is the fraction of positive predictions that are actually positive: **Precision = TP / (TP + FP)**. High precision means: when the model says yes, it is usually right. Recall (also called sensitivity) is the fraction of actual positives the model correctly identifies: **Recall = TP / (TP + FN)**. High recall means: the model rarely misses a real positive. There is a trade-off — increasing the threshold for a positive prediction raises precision and lowers recall, and vice versa.

The F1 score is the harmonic mean of precision and recall: **F1 = 2 × (Precision × Recall) / (Precision + Recall)**. It is useful when both matter and you want a single number that balances them. The harmonic mean penalises extreme imbalances between precision and recall more than a simple average would.

**Regression metrics.** When the target is a continuous value rather than a category, accuracy and F1 do not apply. Root Mean Squared Error (RMSE) is the most common regression metric: it is the square root of the average squared difference between predicted and actual values. Squaring the errors gives larger errors disproportionately more weight, making RMSE sensitive to outliers. Mean Absolute Error (MAE) averages the absolute differences and is more robust to outliers.

**Code walkthrough:**

```python
# Step 1: Build a confusion matrix — this reveals what accuracy hides
from sklearn.metrics import confusion_matrix, classification_report, ConfusionMatrixDisplay
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification
import matplotlib.pyplot as plt

# Create imbalanced data — 95% class 0, 5% class 1 (like fraud detection)
X, y = make_classification(n_samples=1000, weights=[0.95, 0.05], random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Step 2: Confusion matrix — the foundation of all classification metrics
cm = confusion_matrix(y_test, y_pred)
print(f"Confusion Matrix:\n{cm}")
print(f"  TN={cm[0,0]}  FP={cm[0,1]}")
print(f"  FN={cm[1,0]}  TP={cm[1,1]}")

# Step 3: Classification report — precision, recall, F1 per class
# Why this matters: accuracy can be 95% while catching ZERO fraud cases
report = classification_report(y_test, y_pred, target_names=["legitimate", "fraud"])
print(report)

# Step 4: Visualise the confusion matrix — always inspect visually
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=["legitimate", "fraud"])
disp.plot(cmap="Blues")
plt.title("Fraud Detection — Confusion Matrix")
plt.savefig("confusion_matrix.png", dpi=150, bbox_inches="tight")

# Step 5: Save the model for later use — pickle or joblib
import joblib
joblib.dump(model, "fraud_detector_v1.joblib")
# Load it back: model = joblib.load("fraud_detector_v1.joblib")
print("Model saved successfully")
```

**Why it matters:** Using the wrong metric can make a useless model look good, or make a good model look worse than a naive baseline. Metric choice is a business decision as much as a technical one — it encodes which types of errors are acceptable.

**Key things to understand:**
- Always examine the full confusion matrix, not just aggregate metrics.
- Precision = TP / (TP + FP); Recall = TP / (TP + FN); F1 is their harmonic mean.
- RMSE is for regression tasks (continuous output); accuracy and F1 are for classification tasks.
- Choose metrics that align with the business cost of each error type. In medical diagnosis, a false negative (missed disease) may be far more costly than a false positive.
- For multi-class problems, precision, recall, and F1 can be computed per class or averaged (macro, micro, weighted).

**Common pitfalls:**
- Optimising for accuracy on an imbalanced dataset without checking class-level performance.
- Reporting only the best metric without acknowledging the trade-offs.
- Evaluating on the training set rather than a held-out test set.
- Using RMSE for a classification task or accuracy for a regression task.

---

## The Difference Between AI, ML, Deep Learning and Generative AI

These four terms are used interchangeably in popular media, but they describe distinct and nested concepts. Understanding the hierarchy prevents confusion when reading technical literature or discussing systems with stakeholders.

Artificial intelligence (AI) is the broadest term. It refers to any technique that enables machines to perform tasks that would otherwise require human intelligence. Rule-based expert systems from the 1980s are AI. Modern neural networks are AI. The term says nothing about the method used.

Machine learning is a subset of AI that covers systems which learn from data rather than following hand-coded rules. All ML is AI, but not all AI is ML.

Deep learning is a subset of ML that uses artificial neural networks with many layers (hence "deep"). Deep learning has driven most of the major advances in computer vision, speech recognition, and natural language processing over the past decade. It is particularly effective when large amounts of data and compute are available.

Generative AI is a subset of deep learning concerned with models that generate new content — text, images, audio, code — rather than simply classifying or predicting. Large language models such as frontier models from OpenAI and Anthropic, image generation models, and audio synthesis models are all examples of generative AI. The current wave of generative AI is built almost entirely on the transformer architecture.

**Code walkthrough:**

```python
# Step 1: Compare the four levels — AI > ML > Deep Learning > Generative AI
# Each level uses progressively more complex techniques

# Level 1: AI (rule-based) — no learning from data
def rule_based_ai(temperature):
    """This IS artificial intelligence — but it is NOT machine learning.
    The rules are hand-coded, not learned from data."""
    if temperature > 38.0:
        return "fever_detected"
    return "normal"

# Level 2: ML (classical) — learns patterns from tabular data
from sklearn.ensemble import GradientBoostingClassifier
# Learns from features like age, blood pressure, symptoms
# Does NOT use neural networks — uses decision trees internally
gbm = GradientBoostingClassifier(n_estimators=100)

# Level 3: Deep Learning — neural networks with many layers
import torch.nn as nn
# Used for images, audio, text — requires much more data and compute
deep_model = nn.Sequential(
    nn.Linear(784, 256),   # Input layer
    nn.ReLU(),
    nn.Linear(256, 128),   # Hidden layer 1
    nn.ReLU(),
    nn.Linear(128, 10),    # Output layer (10 classes)
)

# Level 4: Generative AI — creates NEW content (text, images, code)
from anthropic import Anthropic
client = Anthropic()
# This GENERATES new text — it does not classify or predict a number
# Built on deep learning (transformer architecture)

# Step 2: The key insight — each level is a SUBSET of the one above
hierarchy = {
    "AI": "Any technique enabling machine-like intelligence (broadest)",
    "ML": "Subset of AI — systems that learn from data",
    "Deep Learning": "Subset of ML — uses multi-layer neural networks",
    "Generative AI": "Subset of DL — generates new content (text, images)",
}
for level, description in hierarchy.items():
    print(f"  {level:20s} | {description}")
```

**Why it matters:** These distinctions come up constantly in stakeholder conversations, architecture decisions, and when reading research. Conflating them leads to misapplied mental models — for example, assuming that because a product uses "AI", it must involve neural networks, or assuming all GenAI limitations apply to traditional ML models.

**Key things to understand:**
- In practice, modern generative AI is built on deep learning, which is a branch of machine learning, which is a branch of AI. The boundaries are not absolute — some generative techniques do not rely on deep learning — but the general nesting holds.
- "AI" in a product description rarely means anything more specific than "it uses some form of learned model."
- Deep learning requires significantly more data and compute than classical ML methods, but it tends to outperform them when both are available.

**Common pitfalls:**
- Using "AI" and "ML" interchangeably in technical conversations, which obscures what is actually being built.
- Assuming all AI problems require deep learning — many are solved adequately by simpler models.
- Conflating generative AI with the broader field of ML, leading to misapplied mental models about how non-generative models work.
