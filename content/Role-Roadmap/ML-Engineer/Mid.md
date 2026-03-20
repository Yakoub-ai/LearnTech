# ML Engineer – Mid Concept Reference


This document provides in-depth explanations of the core concepts covered at the Mid level of the ML Engineer learning path. It assumes familiarity with the Beginner concepts and focuses on algorithm selection, feature engineering, neural networks, experiment tracking, and MLOps.

---

## ML Algorithms – Regression and Classification Families

Classical ML algorithms remain the workhorses of structured data problems. Understanding the algorithm families and when to apply them is a key Mid-level skill.

Regression algorithms predict a continuous numeric output. Linear regression fits a straight-line relationship between input features and the target. Regularised variants — Ridge (L2 penalty) and Lasso (L1 penalty) — reduce overfitting and, in the case of Lasso, can drive less important feature coefficients to zero, performing implicit feature selection. When the decision boundary between classes is linear, logistic regression is a natural fit for binary classification despite its name.

Classification algorithms predict a discrete category. Logistic regression, support vector machines (SVMs), k-nearest neighbours (KNN), and naive Bayes all belong to this family. SVMs are effective in high-dimensional spaces and work well when classes are clearly separable. KNN is non-parametric and requires no training but scales poorly — prediction cost grows with dataset size because it searches for the k closest training points at inference time.

A decision tree partitions the feature space by asking a series of yes/no questions at each node. At each split, it selects the feature and threshold that best separates the classes (using metrics such as Gini impurity or information gain). Decision trees are interpretable — you can trace exactly why a prediction was made — but they overfit easily.

Random forests address overfitting by training many decision trees on different random subsets of the training data and features, then aggregating their predictions by majority vote or averaging. The randomness decorrelates the individual trees, so their errors do not compound. This technique is called bagging (bootstrap aggregating). Random forests are robust, require little hyperparameter tuning, and handle missing data relatively well.

Gradient boosting also combines many weak learners (typically shallow trees), but sequentially rather than in parallel. Each new tree is trained to correct the residual errors of the ensemble so far. The result is a highly accurate model that can outperform random forests on many tabular datasets, at the cost of more hyperparameter sensitivity and longer training time. XGBoost, LightGBM, and CatBoost are the most widely used implementations.

**Code walkthrough:**

```python
# Step 1: Compare algorithm families on the same dataset
# Why compare? No single algorithm wins on every problem
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier

X, y = make_classification(n_samples=1000, n_features=20, n_informative=10, random_state=42)

# Step 2: Run each algorithm family through cross-validation
models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
    "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, random_state=42),
    "SVM (RBF kernel)": SVC(kernel="rbf"),
    "KNN (k=5)": KNeighborsClassifier(n_neighbors=5),
}

print(f"{'Algorithm':<25} {'Mean CV Accuracy':>18} {'Std':>8}")
print("-" * 55)
for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")
    print(f"{name:<25} {scores.mean():>18.4f} {scores.std():>8.4f}")

# Step 3: Feature importance from tree-based models
# Why useful? It reveals which inputs drive predictions
rf = RandomForestClassifier(n_estimators=100, random_state=42).fit(X, y)
importances = rf.feature_importances_
top_features = sorted(enumerate(importances), key=lambda x: x[1], reverse=True)[:5]
print("\nTop 5 features by importance:")
for idx, imp in top_features:
    print(f"  Feature {idx}: {imp:.4f}")
# Note: importance reflects correlation, NOT causation
```

**Why it matters:** No single algorithm works best for every problem. Choosing an algorithm that is appropriately matched to the data type, size, and interpretability requirements is a core engineering decision — defaulting to the most complex option is a common and costly mistake.

**Key things to understand:**
- The hierarchy for tree-based methods is: single decision tree → Random Forest (bagging, parallel) → Gradient Boosting (sequential). Complexity and accuracy generally increase along this hierarchy, as does the risk of overfitting.
- Random forests reduce variance; gradient boosting reduces both bias and variance together.
- Gradient boosting is more sensitive to hyperparameters and requires careful tuning to avoid overfitting.
- Feature importance scores from tree-based models are useful for understanding which inputs drive predictions, but reflect correlation, not causation.

**Common pitfalls:**
- Applying gradient boosting without tuning the learning rate and number of estimators, producing overfit models.
- Choosing complex ensembles when a single decision tree would be sufficiently accurate and far more interpretable.
- Applying a linear model (linear regression, logistic regression) to strongly non-linear data without feature transformations.

---

## ML Algorithms – Clustering and Unsupervised Methods

Clustering algorithms group data points into clusters based on similarity, without using labels. They are the primary unsupervised learning tool for exploratory analysis, customer segmentation, anomaly detection, and data preprocessing.

K-means is the most widely used clustering algorithm. It requires specifying k (the number of clusters) upfront. The algorithm initialises k centroids, assigns each point to its nearest centroid, recomputes centroids as the mean of their assigned points, and repeats until assignments stabilise. K-means is fast and scales well, but its results depend on the initial centroid placement (mitigated by running it multiple times), it assumes roughly spherical, equally sized clusters, and choosing the wrong k produces meaningless results. The elbow method and silhouette score help select a reasonable k.

DBSCAN (Density-Based Spatial Clustering of Applications with Noise) takes a different approach. It does not require specifying the number of clusters upfront. Instead, it identifies clusters as dense regions of points separated by low-density regions. Points in sparse regions are labelled as noise (outliers) rather than forced into a cluster. DBSCAN handles clusters of arbitrary shape and is robust to outliers, but its two hyperparameters (minimum points and the neighbourhood radius epsilon) require careful tuning.

Dimensionality reduction methods such as PCA (Principal Component Analysis) are also unsupervised. PCA finds the directions of maximum variance in the data and projects it onto a lower-dimensional space. It is used for visualisation, noise reduction, and as a preprocessing step before training.

**Code walkthrough:**

```python
# Step 1: K-means clustering — requires specifying k upfront
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import numpy as np

# Simulate customer data: annual premium, number of claims, years as customer
np.random.seed(42)
customer_data = np.vstack([
    np.random.randn(100, 3) * [500, 1, 2] + [2000, 1, 5],   # Low-risk group
    np.random.randn(80, 3) * [1000, 2, 3] + [5000, 4, 10],   # Medium-risk group
    np.random.randn(40, 3) * [2000, 3, 1] + [10000, 8, 2],   # High-risk group
])

# Step 2: ALWAYS scale features before clustering — distance-based algorithms
# are sensitive to feature magnitude (premium in thousands vs claims in single digits)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(customer_data)

# Step 3: Use the elbow method and silhouette score to choose k
for k in range(2, 7):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = km.fit_predict(X_scaled)
    sil = silhouette_score(X_scaled, labels)
    print(f"k={k}: Silhouette={sil:.3f}, Inertia={km.inertia_:.0f}")

# Step 4: DBSCAN — does NOT require specifying number of clusters
# Finds dense regions automatically and labels sparse points as noise (-1)
dbscan = DBSCAN(eps=0.8, min_samples=5)
db_labels = dbscan.fit_predict(X_scaled)
n_clusters = len(set(db_labels)) - (1 if -1 in db_labels else 0)
n_noise = (db_labels == -1).sum()
print(f"\nDBSCAN found {n_clusters} clusters and {n_noise} noise points")
```

**Why it matters:** Many real-world problems involve unlabelled data. Clustering enables discovery — finding structure in data that no one has categorised yet. Understanding the differences between algorithms prevents common failures such as forcing arbitrary cluster shapes with K-means when DBSCAN would be more appropriate.

**Key things to understand:**
- K-means requires specifying k upfront; DBSCAN does not.
- K-means assumes clusters are spherical and roughly equal in size; DBSCAN makes no such assumption.
- DBSCAN can identify noise points (outliers) explicitly; K-means forces every point into a cluster.
- Evaluating clustering quality is harder than evaluating supervised models — there is no ground truth. Silhouette score and inertia are common proxies.

**Common pitfalls:**
- Applying K-means to data with non-spherical or highly variable cluster sizes, producing meaningless groupings.
- Forgetting to scale features before clustering — algorithms that use distance metrics are sensitive to feature scale.
- Treating clustering output as definitive categories without validating that the clusters correspond to meaningful real-world distinctions.

---

## Neural Networks – Layers, Activation Functions and Backpropagation

Neural networks are the building blocks of deep learning. Understanding how they work mechanically is essential before working with more complex architectures such as transformers.

A neural network consists of layers of artificial neurons. Each neuron computes a weighted sum of its inputs, adds a bias term, and then passes the result through an activation function. The input layer receives the raw features, hidden layers learn intermediate representations, and the output layer produces the prediction. Activation functions introduce non-linearity, which allows the network to learn complex mappings. Without them, stacking multiple layers would reduce to a single linear transformation. Common activation functions include ReLU (Rectified Linear Unit, used in hidden layers), sigmoid (used for binary output), and softmax (used in the output layer for multi-class classification).

Training a neural network means finding the weights that minimise a loss function. This is done through backpropagation combined with an optimiser such as stochastic gradient descent (SGD) or Adam. Backpropagation computes the gradient of the loss with respect to each weight by applying the chain rule of calculus layer by layer from output back to input. The optimiser then updates the weights in the direction that reduces the loss.

**Code walkthrough:**

```python
# Step 1: Build a neural network from scratch concepts using PyTorch
# Understanding the mechanics helps you diagnose training problems
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Step 2: Prepare data — neural networks require scaled numeric input
X, y = make_classification(n_samples=1000, n_features=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = torch.FloatTensor(scaler.fit_transform(X_train))
X_test = torch.FloatTensor(scaler.transform(X_test))
y_train = torch.FloatTensor(y_train)
y_test = torch.FloatTensor(y_test)

# Step 3: Define the network — each layer transforms the representation
class FraudDetector(nn.Module):
    def __init__(self):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(20, 64),    # Input: 20 features -> 64 hidden neurons
            nn.ReLU(),            # Non-linearity — without this, layers collapse to one
            nn.Dropout(0.3),      # Regularisation: randomly zero 30% of neurons
            nn.Linear(64, 32),    # Hidden layer 2
            nn.ReLU(),
            nn.Linear(32, 1),     # Output: single probability
            nn.Sigmoid(),         # Squash to 0-1 for binary classification
        )

    def forward(self, x):
        return self.network(x).squeeze()

# Step 4: Training loop — backpropagation adjusts weights to minimise loss
model = FraudDetector()
criterion = nn.BCELoss()      # Binary cross-entropy for classification
optimizer = optim.Adam(model.parameters(), lr=0.001)  # Learning rate is critical

for epoch in range(50):
    model.train()
    optimizer.zero_grad()              # Reset gradients
    predictions = model(X_train)       # Forward pass
    loss = criterion(predictions, y_train)  # Compute loss
    loss.backward()                    # Backpropagation: compute gradients
    optimizer.step()                   # Update weights
    if (epoch + 1) % 10 == 0:
        model.eval()
        with torch.no_grad():
            test_pred = (model(X_test) > 0.5).float()
            acc = (test_pred == y_test).float().mean()
            print(f"Epoch {epoch+1}: Loss={loss:.4f}, Test Acc={acc:.4f}")
```

**Why it matters:** Neural networks are the foundation of every deep learning system, including LLMs, image classifiers, and speech models. Understanding backpropagation and gradient descent gives you the mental model needed to diagnose training problems, choose architectures, and understand why regularisation techniques work.

**Key things to understand:**
- The input layer, hidden layers, and output layer each play a distinct role. Depth (more hidden layers) allows the network to represent more complex functions.
- The choice of loss function must match the task: cross-entropy for classification, mean squared error for regression.
- Learning rate is the most important hyperparameter to get right — too high causes instability, too low causes slow convergence.
- Batch normalisation and dropout are regularisation techniques that stabilise and improve training.

**Common pitfalls:**
- Using sigmoid or tanh activations in hidden layers of deep networks, causing vanishing gradients. ReLU and its variants are generally preferred.
- Not normalising input features, leading to slow or unstable training.
- Treating neural network training as deterministic — results vary across runs due to random weight initialisation; set seeds for reproducibility.

---

## Feature Engineering – Transforming Raw Data into Model-Ready Features

Feature engineering is the process of transforming raw data into features that better represent the underlying problem to the model, improving predictive performance. It is often the single highest-leverage activity in an ML project — a well-engineered feature set can make a simple model outperform a complex one trained on raw data.

Feature types fall into several categories. Numerical features (age, income, temperature) may need scaling (standardisation to zero mean and unit variance, or min-max normalisation to a fixed range) so that algorithms sensitive to feature magnitude — such as SVMs, KNN, and neural networks — treat all features equally. Categorical features (country, product type, day of week) must be encoded numerically. One-hot encoding creates a binary column for each category; ordinal encoding assigns integers to ordered categories. High-cardinality categorical features (such as postcode or customer ID) require special handling — target encoding, frequency encoding, or embedding layers are common approaches.

Feature creation involves deriving new features from existing ones. Date columns can be decomposed into year, month, day of week, and binary flags for weekends or holidays. Text columns can be converted to word counts, TF-IDF vectors, or embeddings. Interaction features (multiplying two features together) capture relationships that the model might not learn on its own.

Feature selection removes features that add noise without predictive value. Techniques include correlation analysis (removing features highly correlated with each other), mutual information (measuring how much a feature tells you about the target), and model-based selection (using feature importance from a tree-based model to filter). Reducing the feature set improves training speed, reduces overfitting, and makes the model more interpretable.

Domain knowledge is the most important input to feature engineering. An engineer who understands the business problem will create features that capture the relevant signal — for example, in insurance, the ratio of claim amount to policy premium may be far more predictive than either value alone.

**Code walkthrough:**

```python
# Step 1: Feature engineering pipeline — from raw data to model-ready features
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier

# Simulate raw insurance data
df = pd.DataFrame({
    "age": [25, 45, 30, 55, 35],
    "annual_premium": [1200, 3500, 1800, 5000, 2200],
    "claim_amount": [500, 0, 2000, 800, 0],
    "policy_type": ["auto", "home", "auto", "home", "auto"],
    "incident_date": pd.to_datetime(["2024-01-15", "2024-06-20", "2024-12-25", "2024-03-10", "2024-08-05"]),
})

# Step 2: Create domain-specific features — this is where expertise matters
# A ratio often captures more signal than either raw feature alone
df["claim_to_premium_ratio"] = df["claim_amount"] / df["annual_premium"]
df["has_claim"] = (df["claim_amount"] > 0).astype(int)

# Step 3: Extract temporal features from dates
df["month"] = df["incident_date"].dt.month
df["is_weekend"] = df["incident_date"].dt.dayofweek.isin([5, 6]).astype(int)
df["is_winter"] = df["month"].isin([11, 12, 1, 2]).astype(int)

# Step 4: Build a preprocessing pipeline — ensures consistency at inference time
# Why a pipeline? It applies the SAME transformations to training and new data
numeric_features = ["age", "annual_premium", "claim_to_premium_ratio"]
categorical_features = ["policy_type"]

preprocessor = ColumnTransformer(transformers=[
    ("num", StandardScaler(), numeric_features),
    ("cat", OneHotEncoder(drop="first", sparse_output=False), categorical_features),
])

# Step 5: Combine preprocessing + model into a single pipeline
full_pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(n_estimators=100, random_state=42)),
])
print("Pipeline ready. Feature engineering is applied automatically at train and predict time.")
```

**Why it matters:** Models learn from the features they are given. No algorithm can extract signal that the features do not contain. Feature engineering is where domain expertise meets data science, and it is the stage where experienced ML engineers consistently add the most value.

**Key things to understand:**
- Scaling is required for distance-based and gradient-based algorithms but generally not for tree-based models.
- One-hot encoding can explode dimensionality with high-cardinality features — alternative encodings are needed in those cases.
- Feature creation is guided by domain knowledge — automated feature generation tools exist but rarely replace expert intuition.
- Feature selection should be performed on the training set only; applying it to the full dataset before splitting causes data leakage.

**Common pitfalls:**
- Applying feature engineering steps (such as scaling or target encoding) before the train-test split, leaking information from the test set.
- Creating features that inadvertently encode the target variable, producing artificially high metrics that collapse on new data.
- Over-engineering features for tree-based models that handle raw features well, adding complexity without performance gain.
- Ignoring domain knowledge and relying solely on automated feature generation.

---

## Experiment Tracking – Reproducibility and Systematic Model Development

Experiment tracking is the practice of systematically recording the parameters, metrics, code versions, data versions, and artifacts associated with every model training run. It is the foundation of reproducible ML development — without it, successful experiments cannot be reliably recreated, and comparing different approaches becomes guesswork.

MLflow is the most widely adopted open-source experiment tracking framework. It provides four core components: Tracking (logging parameters, metrics, and artifacts), Projects (packaging code for reproducibility), Models (a standard format for model packaging and serving), and a Model Registry (versioned model storage with stage transitions). Azure ML provides equivalent functionality integrated into the Azure ecosystem, with experiment tracking, model registration, and managed compute for training.

A well-structured experiment tracking workflow logs: the hyperparameters used (learning rate, batch size, number of estimators), the evaluation metrics on both validation and test sets, the dataset version or hash, the code commit hash, and the trained model artifact. This creates a complete audit trail from result back to the exact conditions that produced it.

Parameter logging should be comprehensive from the start. Engineers commonly begin by logging only a few key parameters, then discover months later that a critical parameter was not recorded and the experiment cannot be reproduced. Logging everything is cheap; not logging is expensive.

**Code walkthrough:**

```python
# Step 1: Set up MLflow experiment tracking — do this BEFORE training
# Why first? Because retroactively reconstructing experiments is always more expensive
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import cross_val_score
from sklearn.datasets import make_classification

mlflow.set_experiment("fraud-detection-v2")

X, y = make_classification(n_samples=1000, weights=[0.95, 0.05], random_state=42)

# Step 2: Log EVERYTHING — parameters, metrics, artifacts, and data version
# Logging is cheap; not logging is expensive when you need to reproduce results
experiments = [
    {"name": "rf_baseline", "model": RandomForestClassifier(n_estimators=100, random_state=42),
     "params": {"algorithm": "random_forest", "n_estimators": 100, "max_depth": None}},
    {"name": "gb_tuned", "model": GradientBoostingClassifier(n_estimators=200, learning_rate=0.05, max_depth=4, random_state=42),
     "params": {"algorithm": "gradient_boosting", "n_estimators": 200, "learning_rate": 0.05, "max_depth": 4}},
]

for exp in experiments:
    with mlflow.start_run(run_name=exp["name"]):
        # Step 3: Log all hyperparameters — not just the ones you think matter
        mlflow.log_params(exp["params"])
        mlflow.log_param("data_version", "claims_v2_2025-01-15")

        # Step 4: Log cross-validation metrics
        scores = cross_val_score(exp["model"], X, y, cv=5, scoring="f1")
        mlflow.log_metric("f1_mean", scores.mean())
        mlflow.log_metric("f1_std", scores.std())

        # Step 5: Log the trained model artifact — enables reproduction
        exp["model"].fit(X, y)
        mlflow.sklearn.log_model(exp["model"], "model")

        print(f"{exp['name']}: F1={scores.mean():.4f} (+/- {scores.std():.4f})")

# Step 6: Compare runs in the MLflow UI: mlflow ui --port 5000
# Visual comparison across metrics and parameters is invaluable
```

**Why it matters:** ML development is inherently experimental — engineers try many combinations of data, features, algorithms, and hyperparameters. Without systematic tracking, this experimentation degenerates into an uncontrolled search where previous results cannot be compared, reproduced, or built upon. Experiment tracking transforms ML development from art into engineering.

**Key things to understand:**
- Every training run should be logged automatically — manual logging is error-prone and inconsistent.
- MLflow's tracking UI allows visual comparison of runs across metrics and parameters.
- The model registry provides version control for models with stage labels (Staging, Production, Archived).
- Azure ML integrates experiment tracking with managed compute, enabling training runs to be submitted and tracked from a single interface.

**Common pitfalls:**
- Starting a project without experiment tracking and trying to retroactively reconstruct what was tried — this is always more expensive than setting up tracking from day one.
- Logging metrics but not parameters, making it impossible to reproduce a good result.
- Not versioning the training data alongside the model, so the same code with different data produces different results with no explanation.
- Treating experiment tracking as overhead rather than infrastructure — it pays for itself within the first week of any serious project.

---

## MLOps Fundamentals – Operationalising ML Models

MLOps is the set of practices for deploying, monitoring, and maintaining ML models in production. Training a model is only part of the job — getting it into production reliably and keeping it healthy over time is where most operational effort is spent.

Experiment tracking tools such as MLflow and Azure ML allow engineers to log parameters, metrics, and artifacts (trained model files, plots, data snapshots) for every training run. This makes experiments reproducible: any result can be traced back to the exact code, data, and hyperparameters that produced it.

A model registry is a versioned store of trained models with metadata — who trained it, when, on what data, with what performance metrics. It provides a single source of truth for which model version is deployed to which environment. Azure ML and MLflow both provide model registry functionality.

Model serving is the process of deploying a trained model as an API endpoint that other systems can call. The standard approach is containerisation with Docker: the model, its dependencies, and a serving framework are packaged into a container image that can be deployed consistently across environments. This decouples the model from the infrastructure it runs on.

Model monitoring detects problems after deployment. Data drift occurs when the distribution of incoming data changes relative to the training data, causing model performance to degrade silently. Model monitoring tracks input distributions, prediction distributions, and performance metrics over time to detect drift and trigger retraining or alerts.

**Code walkthrough:**

```python
# Step 1: Model registry — version control for trained models
# Just like Git versions code, the registry versions models
import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()

# Step 2: Register a model after training — links experiment run to a named model
model_uri = "runs:/abc123def456/model"  # From an MLflow experiment run
model_name = "fraud-detector"

# Register creates version 1, subsequent calls create version 2, 3, etc.
result = mlflow.register_model(model_uri, model_name)
print(f"Registered: {result.name} version {result.version}")

# Step 3: Stage transitions — control which version serves production traffic
# Staging -> Production -> Archived lifecycle
client.transition_model_version_stage(
    name=model_name,
    version=result.version,
    stage="Staging"  # Test here before promoting to Production
)

# Step 4: Docker containerisation — package model + dependencies for deployment
# This ensures the model runs the SAME way everywhere
DOCKERFILE = """
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY model/ ./model/
COPY serve.py .
EXPOSE 8000
CMD ["uvicorn", "serve:app", "--host", "0.0.0.0", "--port", "8000"]
"""

# Step 5: Monitor after deployment — models degrade silently
# Track input distributions, prediction distributions, and business metrics
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset

# Compare current production data against training data distribution
drift_report = Report(metrics=[DataDriftPreset()])
# drift_report.run(reference_data=training_df, current_data=production_df)
# if drift detected -> trigger retraining pipeline
print("Monitoring configured: checking for data drift daily")
```

**Why it matters:** A model that is not deployed is not delivering value. MLOps practices bridge the gap between experimentation and production, ensuring that models are reproducible, deployable, and maintainable over their full lifecycle.

**Key things to understand:**
- Experiment tracking is non-negotiable for reproducibility — without it, successful experiments cannot be reliably recreated.
- Model registries provide version control for models the same way Git provides version control for code.
- Containerisation with Docker ensures that the model runs the same way in development, staging, and production.
- Data drift is the most common cause of silent model degradation in production — monitoring must be active, not reactive.

**Common pitfalls:**
- Training models in notebooks without logging parameters or metrics, making it impossible to reproduce results later.
- Deploying models manually instead of through a reproducible, containerised pipeline.
- Not monitoring model performance after deployment, allowing degraded models to serve incorrect predictions for weeks or months.
- Treating MLOps as a separate concern from model development — it should be considered from the start of a project, not added after the model is trained.
