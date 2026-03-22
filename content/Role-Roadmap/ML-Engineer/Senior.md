# ML Engineer – Senior Concept Reference


This document provides in-depth explanations of the core concepts covered at the Senior level of the ML Engineer learning path. It assumes fluency with the Beginner and Mid concepts and focuses on advanced MLOps, model monitoring, responsible AI, algorithms, and enterprise governance.

---

## Algorithms and Dynamic Programming for ML Engineers

A solid foundation in algorithms and data structures makes ML engineers more effective at every level of the stack — from understanding how embedding search works internally, to writing performant data processing code, to debugging why a model training loop is slow.

Dynamic programming (DP) is a technique for solving problems by breaking them into overlapping subproblems, solving each subproblem once, and storing the result. It is applicable when a problem has optimal substructure (the optimal solution to the whole problem contains optimal solutions to its subproblems) and overlapping subproblems (the same subproblems recur). Classic examples include the longest common subsequence, the knapsack problem, and the edit distance between two strings — the last of which appears directly in NLP evaluation (Levenshtein distance).

For ML engineers, algorithmic thinking is relevant in: designing efficient data pipelines (understanding time and space complexity prevents accidentally writing O(n²) preprocessing steps), implementing custom loss functions or evaluation metrics, understanding the internals of approximate nearest-neighbour algorithms used in vector search (HNSW, IVF), and reasoning about the computational cost of transformer attention (which scales quadratically with sequence length).

Graph algorithms appear in agent orchestration (LangGraph is literally a directed graph traversal problem) and in knowledge graph construction.

**Code walkthrough:**

```python
# Step 1: Why algorithmic thinking matters for ML engineers
# An O(n^2) step that runs in 1s on 10k rows takes 2.8 hours on 1M rows
import time
import numpy as np
from functools import lru_cache

# Step 2: Bad O(n^2) — nested loop for pairwise distance computation
def pairwise_distances_naive(X):
    """This approach scales quadratically — infeasible at production scale."""
    n = len(X)
    distances = np.zeros((n, n))
    for i in range(n):
        for j in range(i + 1, n):
            distances[i, j] = np.sqrt(np.sum((X[i] - X[j]) ** 2))
            distances[j, i] = distances[i, j]
    return distances

# Step 3: Good O(n^2) but vectorised — same complexity, 100x faster in practice
from sklearn.metrics import pairwise_distances
# Uses optimised C code internally — same O(n^2) but constant factor matters

X_small = np.random.randn(1000, 10)
start = time.time()
_ = pairwise_distances(X_small, metric="euclidean")
print(f"Vectorised pairwise (1000 points): {time.time() - start:.3f}s")

# Step 4: Dynamic programming — edit distance used in NLP evaluation
# Memoisation avoids recomputing overlapping subproblems
@lru_cache(maxsize=None)
def edit_distance(s1: str, s2: str) -> int:
    """Levenshtein distance — appears directly in NLP evaluation metrics.
    Why DP? Without memoisation, this is exponential; with DP, it is O(m*n)."""
    if not s1: return len(s2)
    if not s2: return len(s1)
    if s1[0] == s2[0]:
        return edit_distance(s1[1:], s2[1:])
    return 1 + min(
        edit_distance(s1[1:], s2),      # Delete
        edit_distance(s1, s2[1:]),       # Insert
        edit_distance(s1[1:], s2[1:]),   # Replace
    )

# Step 5: Practical example — comparing model-generated text to reference
generated = "the claim was approved"
reference = "the claim was denied"
dist = edit_distance(generated, reference)
print(f"Edit distance: {dist} ('{generated}' -> '{reference}')")
```

**Why it matters:** Algorithmic complexity failures in ML systems are expensive and often only discovered at production scale. An O(n²) preprocessing step that runs in seconds on a development dataset can take hours on production data. Understanding these fundamentals prevents engineering decisions that are technically correct but operationally infeasible.

**Key things to understand:**
- Big-O notation is a tool for reasoning about scalability — know the complexity of the operations you use most often.
- Many ML operations are expressible as matrix operations; understanding linear algebra and matrix decomposition methods (SVD, PCA) is directly applicable.
- Memoisation (top-down DP with caching) is often easier to implement correctly than tabulation (bottom-up DP).

**Common pitfalls:**
- Writing preprocessing code without considering how it scales with dataset size, then discovering it is infeasible at production volume.
- Treating algorithmic knowledge as irrelevant to ML engineering — it surfaces in performance debugging, custom implementations, and system design.
- Memorising DP solutions without understanding the underlying recurrence relation, making it impossible to adapt them to novel problems.

---

## Model Monitoring and Data Drift

Model monitoring is the practice of continuously tracking the behaviour of deployed ML models to detect degradation before it impacts business outcomes. A model that performed well at training time can silently deteriorate as the real world changes around it — a phenomenon driven primarily by data drift.

Data drift occurs when the statistical distribution of incoming production data diverges from the distribution the model was trained on. There are several forms: feature drift (the distribution of input features changes), label drift (the distribution of the target variable changes), and concept drift (the relationship between features and the target changes). All three can cause a model that was accurate at deployment to produce increasingly unreliable predictions over time.

Detection methods include statistical tests (Kolmogorov-Smirnov test, Population Stability Index) applied to input feature distributions, monitoring prediction distributions for shifts (if the model suddenly predicts one class far more frequently, something has changed), and tracking business metrics (such as claim approval rates or customer complaint rates) that serve as proxies for model quality when ground truth labels are delayed.

Retraining triggers should be defined in advance. Common approaches include: scheduled retraining (weekly or monthly, regardless of drift detection), drift-triggered retraining (automatic retraining when a statistical test exceeds a threshold), and performance-triggered retraining (when a monitored metric drops below a defined threshold). The choice depends on the cost of retraining versus the cost of serving stale predictions.

Azure ML provides built-in model monitoring capabilities, including data drift detection across features, alerting when drift exceeds configurable thresholds, and integration with retraining pipelines. Setting up monitoring at deployment time — not as an afterthought — is a key MLOps maturity indicator.

**Code walkthrough:**

```python
# Step 1: Model monitoring — detect data drift BEFORE it impacts business outcomes
# A model that was accurate at deployment can silently deteriorate
import numpy as np
from scipy import stats

# Step 2: Statistical drift detection using Kolmogorov-Smirnov test
# Compares the distribution of a feature at training time vs production
def detect_feature_drift(training_values, production_values, threshold=0.05):
    """KS test: if p-value < threshold, the distributions are significantly different.
    Why per-feature? Aggregate metrics can miss drift in individual features."""
    statistic, p_value = stats.ks_2samp(training_values, production_values)
    is_drifted = p_value < threshold
    return {"statistic": statistic, "p_value": p_value, "drifted": is_drifted}

# Step 3: Population Stability Index (PSI) — common in insurance/finance
def calculate_psi(expected, actual, bins=10):
    """PSI measures how much a variable's distribution has shifted.
    PSI < 0.1: no significant change. PSI 0.1-0.25: moderate. PSI > 0.25: significant."""
    expected_pcts = np.histogram(expected, bins=bins)[0] / len(expected)
    actual_pcts = np.histogram(actual, bins=bins)[0] / len(actual)
    # Avoid division by zero
    expected_pcts = np.clip(expected_pcts, 0.001, None)
    actual_pcts = np.clip(actual_pcts, 0.001, None)
    psi = np.sum((actual_pcts - expected_pcts) * np.log(actual_pcts / expected_pcts))
    return psi

# Step 4: Monitor multiple features and alert on drift
np.random.seed(42)
training_age = np.random.normal(40, 10, 5000)       # Training distribution
production_age = np.random.normal(42, 12, 5000)      # Slight drift
production_age_severe = np.random.normal(50, 15, 5000)  # Severe drift

for name, prod_data in [("Slight", production_age), ("Severe", production_age_severe)]:
    result = detect_feature_drift(training_age, prod_data)
    psi = calculate_psi(training_age, prod_data)
    print(f"{name} drift — KS p-value: {result['p_value']:.4f}, PSI: {psi:.4f}, "
          f"Drifted: {result['drifted']}")

# Step 5: Define retraining triggers based on monitoring
RETRAIN_THRESHOLDS = {
    "psi_threshold": 0.25,        # Retrain if any feature PSI exceeds this
    "performance_drop": 0.05,     # Retrain if F1 drops by more than 5%
    "max_days_since_training": 90  # Retrain at least every 90 days
}
```

**Why it matters:** Models are not static assets. The world changes, data distributions shift, and models degrade. Without active monitoring, degraded models serve incorrect predictions for weeks or months before anyone notices — often only when a downstream business metric has already been damaged.

**Key things to understand:**
- Data drift is the most common cause of model degradation in production — it is not a question of if, but when.
- Monitoring must cover inputs (feature distributions), outputs (prediction distributions), and outcomes (business metrics).
- Ground truth labels are often delayed (e.g., whether a claim was fraudulent may not be known for months), making proxy metrics essential.
- Retraining is not free — it requires data preparation, validation, and deployment, all of which should be automated through the MLOps pipeline.

**Common pitfalls:**
- Deploying a model without any monitoring, assuming it will remain accurate indefinitely.
- Monitoring only aggregate metrics and missing drift in individual features that affects a subset of predictions.
- Setting retraining triggers too sensitively, causing unnecessary retraining on normal seasonal variation.
- Not automating the retraining pipeline, making each retraining cycle a manual, error-prone process.

---

## Responsible AI and Fairness

Responsible AI is the practice of designing, building, and deploying ML systems that are fair, transparent, accountable, and aligned with ethical and legal standards. Fairness in ML specifically addresses the risk that models systematically produce worse outcomes for certain groups — often along dimensions such as gender, ethnicity, age, or disability status.

Bias can enter the ML pipeline at multiple stages. Training data bias occurs when historical data reflects existing societal biases — for example, if past lending decisions were discriminatory, a model trained on that data will learn and perpetuate the discrimination. Feature bias occurs when input features serve as proxies for protected attributes — postcode can proxy for ethnicity, job title can proxy for gender. Algorithmic bias occurs when the model optimises an objective that inadvertently penalises certain groups — maximising overall accuracy on an imbalanced dataset can produce a model that performs well on the majority group but poorly on minority groups.

Fairness metrics quantify whether a model treats different groups equitably. Demographic parity requires that the positive prediction rate is equal across groups. Equalised odds requires that the true positive rate and false positive rate are equal across groups. These definitions can conflict — satisfying one may violate another — so the choice of fairness metric is a normative decision that must involve domain experts, legal counsel, and affected stakeholders.

Fairlearn is an open-source toolkit for assessing and improving the fairness of ML models. It provides metrics for measuring group fairness, visualisations for comparing model performance across groups, and mitigation algorithms (such as threshold optimisation and exponentiated gradient) that adjust model behaviour to improve fairness without retraining from scratch.

In insurance, fairness is not only an ethical imperative but a legal one. Anti-discrimination laws prohibit pricing or coverage decisions based on protected attributes. The EU AI Act classifies insurance AI systems as high-risk and requires conformity assessments that include fairness evaluation. Senior ML engineers must treat fairness as a first-class design constraint — integrated into the development process from the start, not checked as a post-hoc audit.

**Code walkthrough:**

```python
# Step 1: Assess model fairness across protected groups using Fairlearn
# Fairness is a design constraint, not a post-hoc audit
from fairlearn.metrics import MetricFrame, selection_rate, demographic_parity_difference
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd

# Step 2: Simulate insurance data with a sensitive attribute (gender)
np.random.seed(42)
n = 2000
data = pd.DataFrame({
    "age": np.random.randint(20, 70, n),
    "income": np.random.normal(50000, 15000, n).astype(int),
    "credit_score": np.random.randint(300, 850, n),
    "gender": np.random.choice(["M", "F"], n),  # Protected attribute
})
data["approved"] = ((data["credit_score"] > 600) & (data["income"] > 30000)).astype(int)

X = data[["age", "income", "credit_score"]]
y = data["approved"]
sensitive = data["gender"]

X_train, X_test, y_train, y_test, sens_train, sens_test = train_test_split(
    X, y, sensitive, test_size=0.3, random_state=42)

# Step 3: Train model and evaluate fairness metrics across groups
model = GradientBoostingClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Step 4: MetricFrame — compare metrics ACROSS protected groups
metric_frame = MetricFrame(
    metrics={"accuracy": lambda y_t, y_p: (y_t == y_p).mean(),
             "selection_rate": selection_rate},
    y_true=y_test,
    y_pred=y_pred,
    sensitive_features=sens_test,
)

print("Metrics by group:")
print(metric_frame.by_group)
print(f"\nDemographic parity difference: {demographic_parity_difference(y_test, y_pred, sensitive_features=sens_test):.4f}")
# A value close to 0 indicates similar approval rates across groups
# Values > 0.05 typically warrant investigation

# Step 5: Removing the protected attribute is NOT sufficient
# Proxy features (postcode, job title) can carry the same information
# Always measure fairness on model output, regardless of input features
```

**Why it matters:** Unfair ML systems cause real harm to individuals and expose organisations to legal, regulatory, and reputational risk. In regulated industries like insurance, deploying a biased model can result in discrimination claims, regulatory sanctions, and loss of customer trust. Senior engineers are expected to identify, measure, and mitigate fairness risks proactively.

**Key things to understand:**
- Fairness cannot be achieved by simply removing protected attributes from the feature set — proxy features can carry the same information.
- Different fairness metrics encode different definitions of "fair" — there is no single correct definition, and the choice must be context-specific.
- Fairlearn provides both assessment tools (metrics, visualisations) and mitigation algorithms (threshold optimisation, exponentiated gradient).
- The EU AI Act requires high-risk AI systems (including insurance AI) to demonstrate fairness, transparency, and human oversight.

**Common pitfalls:**
- Assuming that removing protected attributes from the model eliminates bias — correlated features can serve as proxies.
- Optimising for a single fairness metric without considering the trade-offs with other fairness definitions and model performance.
- Treating fairness as a post-deployment check rather than a design constraint throughout the ML lifecycle.
- Not involving non-technical stakeholders (legal, compliance, affected communities) in defining what fairness means for a given application.

---

## Enterprise GenAI Adoption – Strategy, Risk and Governance

Senior engineers are expected to contribute to decisions about how AI is adopted at an organisational level. This requires understanding the strategic, risk, and governance dimensions of GenAI — not just the technical ones.

Strategic adoption involves identifying use cases where GenAI creates genuine value, distinguishing between tasks where GenAI offers a reliable improvement and tasks where the error rate is too high for the risk tolerance of the business. Productivity augmentation (drafting, summarising, coding assistance) generally has a lower risk threshold than autonomous decision-making in regulated processes.

Risk dimensions include: accuracy and hallucination risk (the model produces incorrect output that a user acts on), data privacy risk (sensitive data is sent to an external model API or used in training), regulatory and compliance risk (output violates laws or policies), reputational risk (offensive or inappropriate output is attributed to the organisation), and security risk (prompt injection, data exfiltration via agent tools).

Governance frameworks address these risks through policies that define which use cases are permitted, what data classifications may be used with which AI systems, how AI-generated output must be reviewed before acting on it, and how incidents are reported and investigated. The [Secure AI Framework (SAIF)](../Prerequisites/Secure-AI-Framework.md) and the NIST AI Risk Management Framework provide the governance structures for securing AI systems. The SAIF defines nine areas — from user awareness and prompt/output validation through to secure model selection — that must be addressed for each AI use case, with the required rigour determined by the use case's risk-level classification.

Responsible AI and fairness are increasingly integral to governance. AI systems used in high-risk domains — such as credit scoring, claims assessment, and underwriting, all relevant to insurance — must be evaluated for bias and fairness across protected groups. This involves measuring fairness metrics (demographic parity, equalised odds) and implementing bias detection in both training data and model outputs. The EU AI Act imposes specific obligations for high-risk AI systems, including transparency, human oversight, and documentation requirements. Senior engineers should treat fairness and regulatory compliance as first-class design constraints, not post-hoc audits.

**Code walkthrough:**

```python
# Step 1: AI use case risk assessment — codify the evaluation process for
# enterprise GenAI adoption decisions
# Senior ML engineers contribute to these decisions, not just implement them
from dataclasses import dataclass
from enum import Enum

class RiskLevel(Enum):
    LOW = "low"           # Internal productivity tools, summarisation
    MEDIUM = "medium"     # Customer-facing content generation with human review
    HIGH = "high"         # Automated decisions affecting individuals (pricing, claims)
    PROHIBITED = "prohibited"  # Social scoring, manipulative AI

@dataclass
class UseCaseAssessment:
    name: str
    data_classification: str    # public, internal, confidential, restricted
    affects_individuals: bool   # Triggers EU AI Act high-risk classification
    human_in_loop: bool
    risk_level: RiskLevel

# Step 2: Evaluate a proposed GenAI use case against governance criteria
def assess_use_case(name: str, affects_individuals: bool,
                    data_classification: str, has_human_review: bool) -> UseCaseAssessment:
    """Why assess before building? Starting without governance approval
    creates compliance debt that is expensive to resolve retroactively."""
    if affects_individuals and data_classification in ("confidential", "restricted"):
        risk = RiskLevel.HIGH
    elif affects_individuals and has_human_review:
        risk = RiskLevel.MEDIUM
    elif data_classification in ("public", "internal"):
        risk = RiskLevel.LOW
    else:
        risk = RiskLevel.MEDIUM
    return UseCaseAssessment(
        name=name, data_classification=data_classification,
        affects_individuals=affects_individuals, human_in_loop=has_human_review,
        risk_level=risk
    )

# Step 3: Example assessments for common insurance GenAI use cases
use_cases = [
    assess_use_case("Internal policy search assistant", affects_individuals=False,
                    data_classification="internal", has_human_review=False),
    assess_use_case("Claims summary generator", affects_individuals=True,
                    data_classification="confidential", has_human_review=True),
    assess_use_case("Automated premium recommendation", affects_individuals=True,
                    data_classification="restricted", has_human_review=False),
]
for uc in use_cases:
    print(f"{uc.name:35s} | Risk: {uc.risk_level.value:8s} | Human review: {uc.human_in_loop}")

# Step 4: Governance gate — block high-risk use cases without required controls
def check_governance_gate(uc: UseCaseAssessment) -> tuple[bool, list[str]]:
    """Why a gate? Without enforcement, governance becomes aspirational.
    This runs in CI before any high-risk AI feature is deployed."""
    issues = []
    if uc.risk_level == RiskLevel.HIGH and not uc.human_in_loop:
        issues.append("High-risk AI requires human-in-the-loop (EU AI Act Art.14)")
    if uc.data_classification in ("confidential", "restricted") and \
       uc.risk_level == RiskLevel.LOW:
        issues.append("Confidential data with low-risk classification — review required")
    return len(issues) == 0, issues

for uc in use_cases:
    passed, issues = check_governance_gate(uc)
    if not passed:
        print(f"BLOCKED: {uc.name} — {issues}")
```

**Why it matters:** Technical capability without governance creates legal and reputational exposure. Senior engineers shape not only what gets built but whether it is built in a way that the organisation can stand behind. The engineers who understand both dimensions are the ones who earn trust to build consequential systems.

**Key things to understand:**
- Governance is an enabler, not a blocker — clear policies allow teams to move faster with confidence.
- Risk assessments for AI use cases must consider both the failure mode of the model and the downstream consequences of acting on its output.
- AI governance must be revisited regularly as model capabilities, regulatory landscapes, and internal risk appetites evolve.

**Common pitfalls:**
- Treating AI governance as a one-time approval process rather than an ongoing operational practice.
- Building governance frameworks that are so restrictive they drive teams to use AI tools outside sanctioned channels.
- Ignoring data classification when selecting which content is allowed to be sent to external AI APIs.

---

## MLOps – Model Serving and Deployment Patterns

Getting a model to production is not the finish line — it is the starting line. MLOps (Machine Learning Operations) is the practice of reliably deploying, monitoring, and iterating on ML models in production. A model that is accurate in a notebook but unavailable, slow, or untested in production creates zero business value.

**Serving patterns** vary by latency requirements and data volume. Online serving (synchronous REST or gRPC endpoints) handles real-time requests in milliseconds — used for fraud detection, recommendation scoring, and search ranking. Batch serving processes large datasets on a schedule — used for daily churn predictions, overnight report generation. Streaming serving (Kafka + Flink/Spark Structured Streaming) processes events as they arrive — used for real-time bidding and IoT anomaly detection. Choosing the wrong pattern is a common and expensive mistake.

**Deployment strategies** control risk when releasing new model versions. A canary deployment routes a small fraction of traffic (e.g., 10 %) to the new version and compares metrics against the baseline before promoting. A/B testing routes different user segments to different model versions and uses statistical testing to determine the winner. Shadow mode runs the new model in parallel without serving its predictions to users — the cheapest way to validate a new model against live production traffic before going live.

**Why it matters:** Production ML failures are rarely due to model accuracy — they are due to poor deployment practices. Models degrade as data distributions drift. Serving infrastructure becomes a bottleneck under load. Without canary deployments, a bad model release can cause an outage affecting all users simultaneously.

**Key things to understand:**
- The difference between online, batch, and streaming serving — and how to choose between them based on latency SLAs and data volume.
- How canary deployments and shadow mode reduce the blast radius of a bad model release.
- Why model serving code (input validation, feature engineering at inference time) needs the same engineering rigour as application code.
- The role of a feature store in ensuring training/serving consistency — the most common source of silent model failures.
- How to instrument a serving endpoint with structured logging so that predictions can be audited and model performance can be monitored offline.

**Code walkthrough:**

```python
# Step 1: Load model from MLflow Model Registry — avoids raw serialisation files
# Why: Loading from the registry gives you version control, lineage, and stage promotion
#      (None → Staging → Production → Archived) without managing files manually.
import mlflow.sklearn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, field_validator
import logging
import random
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("model_server")

MODEL_URI = "models:/fraud_detector/Production"  # MLflow registry URI
model = mlflow.sklearn.load_model(MODEL_URI)

# Step 2: Define a typed request schema with input validation
# Why: Validating inputs at the boundary prevents silent errors where the model
#      receives out-of-range features and produces nonsense predictions silently.
class FraudPredictionRequest(BaseModel):
    transaction_amount: float
    hour_of_day: int
    merchant_category: str

    @field_validator("hour_of_day")
    @classmethod
    def hour_must_be_valid(cls, v: int) -> int:
        if not (0 <= v <= 23):
            raise ValueError(f"hour_of_day must be 0–23, got {v}")
        return v

    @field_validator("transaction_amount")
    @classmethod
    def amount_must_be_positive(cls, v: float) -> float:
        if v <= 0:
            raise ValueError(f"transaction_amount must be > 0, got {v}")
        return v

app = FastAPI(title="Fraud Detector Serving API")

# Step 3: Canary routing — send 10 % of traffic to challenger model
# Why: Canary deployments limit blast radius. If the challenger model has
#      a bug or degraded performance, only 10 % of users are affected.
CANARY_FRACTION = 0.10
challenger_model = mlflow.sklearn.load_model("models:/fraud_detector_v2/Staging")

def route_to_model(request: FraudPredictionRequest):
    """Returns (prediction, model_version) — challenger or champion."""
    use_challenger = random.random() < CANARY_FRACTION
    chosen_model = challenger_model if use_challenger else model
    version = "challenger_v2" if use_challenger else "champion_v1"

    features = [[
        request.transaction_amount,
        request.hour_of_day,
        hash(request.merchant_category) % 50,  # ordinal encoding placeholder
    ]]
    score = chosen_model.predict_proba(features)[0][1]  # fraud probability
    return score, version

# Step 4: Serve predictions with structured logging for offline monitoring
# Why: Every prediction must be logged with its inputs and the model version
#      that produced it. This audit trail lets you reconstruct model behaviour
#      during an incident and compute offline metrics after ground truth arrives.
@app.post("/predict")
async def predict(request: FraudPredictionRequest):
    try:
        score, version = route_to_model(request)
        prediction = "FRAUD" if score > 0.5 else "LEGIT"

        logger.info(json.dumps({
            "event": "prediction",
            "model_version": version,
            "transaction_amount": request.transaction_amount,
            "hour_of_day": request.hour_of_day,
            "fraud_score": round(score, 4),
            "prediction": prediction,
        }))

        return {"prediction": prediction, "fraud_score": round(score, 4), "model_version": version}
    except Exception as e:
        logger.error(json.dumps({"event": "prediction_error", "error": str(e)}))
        raise HTTPException(status_code=500, detail="Prediction failed")

@app.get("/health")
async def health():
    """Liveness probe — readiness checks should also validate model is loaded."""
    return {"status": "ok", "model_uri": MODEL_URI}
```

**Common pitfalls:**
- **Training/serving skew**: The feature engineering applied at training time is not replicated exactly at inference time. A feature store (Feast, Tecton) solves this — it serves the same features at both training and inference time.
- **No input validation**: Models receive malformed or out-of-distribution inputs and produce silently wrong predictions. Pydantic validators catch this at the API boundary.
- **Big-bang deployments**: Releasing a new model to 100 % of traffic simultaneously. One bad model can cause a production incident for all users. Always use canary or blue-green deployments.
- **Not logging predictions**: Without prediction logs, you cannot compute offline model performance metrics once ground truth arrives, audit model decisions, or debug production issues.
- **Ignoring latency under load**: A model that scores in 20 ms in isolation may time out at p99 under production traffic. Load test serving endpoints before releasing.

---

## Experiment Tracking – MLflow and Reproducible ML

An experiment is only as valuable as your ability to reproduce it. In early ML work it is tempting to iterate quickly in notebooks — changing hyperparameters, re-running cells, and noting results in a spreadsheet. This breaks down fast: you cannot reproduce the run that produced your best model, you cannot compare runs systematically, and you cannot hand off work to a colleague or a CI/CD pipeline.

**Experiment tracking** solves this by systematically recording every training run: the hyperparameters used, the metrics achieved, the dataset version, the code commit, and the resulting model artefact. MLflow is the most widely adopted open-source tracking tool; it provides a tracking API, a model registry, a UI for comparing runs, and integrations with major ML frameworks.

The **MLflow model registry** provides a staging workflow: a trained model moves from `None` (registered but unreviewed) → `Staging` (undergoing evaluation) → `Production` (serving live traffic) → `Archived` (superseded). Serving infrastructure loads models by stage name (`models:/fraud_detector/Production`) rather than by a specific version number, so promoting a new version in the registry is sufficient to update what the serving tier uses — no deployment pipeline change required.

**Why it matters:** Reproducibility is a professional standard in ML engineering. Regulators increasingly require that decisions made by ML models can be explained and audited — which requires knowing exactly which model version made a decision and what data it was trained on. Experiment tracking is the foundation of that audit trail.

**Key things to understand:**
- How to use `mlflow.start_run()` as a context manager to ensure runs are always closed, even if training raises an exception.
- The difference between `log_param` (hyperparameter — set before training) and `log_metric` (evaluation result — computed after training). Metrics can be logged at multiple steps to produce a training curve.
- How `mlflow.models.infer_signature` captures the input/output schema of a model — this schema is validated at serving time, preventing type mismatches.
- The model registry promotion workflow and why serving infrastructure should reference stage names rather than version numbers.
- How to tag runs with the git commit hash so you can always trace a run back to the exact code that produced it.

**Code walkthrough:**

```python
# Step 1: Configure MLflow tracking and start a reproducible run
# Why: Setting the experiment groups all related runs together in the UI.
#      Tagging the git commit hash means you can always trace a run back
#      to the exact code that produced it — essential for audits and debugging.
import mlflow
import mlflow.sklearn
from mlflow.models import infer_signature
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, f1_score
import subprocess

mlflow.set_tracking_uri("http://localhost:5000")   # MLflow server URI
mlflow.set_experiment("fraud-detection-v2")

def get_git_commit() -> str:
    try:
        return subprocess.check_output(["git", "rev-parse", "HEAD"]).decode().strip()
    except Exception:
        return "unknown"

# Step 2: Train a model inside a tracked run
# Why: Everything inside the context manager is associated with a single run ID.
#      If training raises an exception, MLflow still closes the run cleanly (status=FAILED)
#      so the tracking server does not accumulate zombie runs.
X, y = make_classification(n_samples=10_000, n_features=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

hyperparams = {"n_estimators": 200, "max_depth": 5, "learning_rate": 0.05}

with mlflow.start_run(tags={"git_commit": get_git_commit(), "dataset_version": "v2.1"}):

    # Step 3: Log hyperparameters and train
    # Why: Logging params before training means they are recorded even if training fails.
    #      This lets you diagnose which hyperparameters caused failures.
    mlflow.log_params(hyperparams)

    clf = GradientBoostingClassifier(**hyperparams, random_state=42)
    clf.fit(X_train, y_train)

    # Step 4: Log evaluation metrics and register the model with its input/output schema
    # Why: infer_signature captures the expected input dtype and shape.
    #      The registry makes the model accessible to serving infrastructure by stage name
    #      ("models:/fraud_detector/Production") rather than by a fragile file path.
    y_proba = clf.predict_proba(X_test)[:, 1]
    y_pred = clf.predict(X_test)

    mlflow.log_metric("roc_auc", roc_auc_score(y_test, y_proba))
    mlflow.log_metric("f1_score", f1_score(y_test, y_pred))

    signature = infer_signature(X_train, clf.predict(X_train))
    model_info = mlflow.sklearn.log_model(
        sk_model=clf,
        artifact_path="fraud_detector",
        signature=signature,
        registered_model_name="fraud_detector",
    )
    print(f"Logged model: {model_info.model_uri}")

# Step 5: Promote the new version to Staging via the Model Registry API
# Why: Serving infrastructure loads "models:/fraud_detector/Staging" —
#      promoting in the registry is sufficient to update what gets served.
#      No redeployment of serving infrastructure is required.
client = mlflow.MlflowClient()
latest = client.get_latest_versions("fraud_detector", stages=["None"])[0]
client.transition_model_version_stage(
    name="fraud_detector",
    version=latest.version,
    stage="Staging",
    archive_existing_versions=False,  # keep previous Staging version for comparison
)
print(f"Promoted version {latest.version} to Staging")
```

**Common pitfalls:**
- **Logging metrics outside a run**: Calls to `mlflow.log_metric` outside `mlflow.start_run()` silently do nothing or attach to a stale run. Always use the context manager.
- **Forgetting to log the dataset version**: Metrics are meaningless without knowing which data they were computed on. Log a dataset hash or version tag on every run.
- **Promoting to Production manually without evaluation gates**: The registry workflow should require a human or automated approval step before transitioning from Staging to Production. Skipping this means bad models can reach production.
- **Not using `infer_signature`**: Without a model signature, the serving tier cannot validate that inputs match what the model expects, leading to silent type-coercion bugs.
- **Treating the experiment as a scratch pad**: Runs without meaningful names, tags, or parameter logging are useless for comparison. Treat each run as a reproducible record from the start.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems, particularly those used in insurance underwriting, claims assessment, and pricing, require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from ML engineers building models to business users employing AI-assisted tools in their daily work.

**Code walkthrough:**

```python
# Step 1: ML pipeline CI/CD — automate the full lifecycle from data to deployment
# Why CI/CD for ML? Manual retraining is error-prone and unscalable
import yaml

# Step 2: Define the ML pipeline as a configuration — version-controlled like code
ML_PIPELINE_CONFIG = {
    "pipeline": "fraud-detection-retrain",
    "trigger": {
        "schedule": "weekly",
        "drift_threshold": 0.25,  # PSI threshold triggers retraining
    },
    "stages": {
        "data_validation": {
            "script": "validate_data.py",
            "checks": ["schema_match", "null_rate < 0.05", "min_rows > 10000"],
        },
        "training": {
            "script": "train_model.py",
            "params_from": "params.yaml",
            "experiment_tracking": "mlflow",
        },
        "evaluation": {
            "script": "evaluate_model.py",
            "gate": {"f1_score": ">= 0.85", "fairness_psi": "< 0.1"},
        },
        "registration": {
            "script": "register_model.py",
            "registry": "mlflow",
            "stage": "staging",
        },
        "deployment": {
            "script": "deploy_model.py",
            "strategy": "canary",  # Route 10% traffic first, then 100%
            "rollback_on": "f1_drop > 0.05",
        },
    }
}

# Step 3: Quality gates — the model must pass ALL checks before deployment
def check_quality_gates(metrics: dict, gates: dict) -> tuple[bool, list[str]]:
    """Why gates? A model that passes training metrics can still fail in production.
    Gates enforce minimum standards before any model reaches users."""
    failures = []
    for metric_name, threshold_str in gates.items():
        op = ">=" if ">=" in threshold_str else "<"
        threshold = float(threshold_str.replace(">=", "").replace("<", "").strip())
        value = metrics.get(metric_name, 0)
        if op == ">=" and value < threshold:
            failures.append(f"{metric_name}: {value:.4f} < {threshold}")
        elif op == "<" and value >= threshold:
            failures.append(f"{metric_name}: {value:.4f} >= {threshold}")
    return len(failures) == 0, failures

# Example gate check
metrics = {"f1_score": 0.87, "fairness_psi": 0.08}
passed, issues = check_quality_gates(metrics, ML_PIPELINE_CONFIG["stages"]["evaluation"]["gate"])
print(f"Quality gates: {'PASSED' if passed else 'FAILED'}")
```

**Why it matters:** The AI Policy is the organisation's binding commitment to responsible AI use. It translates regulatory requirements (EU AI Act, GDPR) into concrete obligations that apply to every ML project. Senior ML engineers must understand these obligations because they directly affect model development — from training data governance and fairness evaluation to deployment documentation and monitoring.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- GDPR obligations apply to all ML systems that process personal data — this includes training data, feature stores, model inputs, and logged predictions.
- The policy requires transparency: affected parties must be informed when AI has influenced a decision affecting them, which has direct implications for model documentation and explainability.

**Common pitfalls:**
- Starting model development without registering the use case in the AI Register, which creates compliance risk and may require retroactive governance work.
- Treating the AI Policy as a legal concern rather than a design constraint — the policy's requirements must be built into the ML lifecycle from the start.
- Assuming that internal-only ML models are exempt from the policy; the governance requirements apply to all AI use, not just customer-facing systems.

---

## EU Compliance for ML Engineers

Senior ML Engineers are at the intersection of model development and regulatory compliance under the EU AI Act. The Act (Regulation 2024/1689) establishes a comprehensive framework for AI systems deployed in the EU, and ML Engineers are responsible for implementing many of its technical requirements. For insurance organisations, the EU AI Act classifies AI systems used in credit scoring, insurance pricing, claims assessment, and underwriting as high-risk under Annex III. High-risk systems must comply with Articles 9-15 before deployment, covering risk management, data governance, technical documentation, record-keeping, transparency, human oversight, and accuracy and robustness. The August 2026 deadline for high-risk AI system compliance means ML Engineers must build these requirements into their MLOps pipelines now.

A model registry that satisfies EU AI Act requirements goes beyond simple version tracking. Article 11 and Annex IV require detailed technical documentation including: the general description and intended purpose of the AI system, the design specifications and development process, information about training data and its governance, evaluation metrics and benchmarks, information about human oversight measures, and the expected level of accuracy and robustness. The model registry must capture all of this metadata alongside the model artifacts, creating a complete provenance record that can be presented during a conformity assessment. Every model version deployed to production must be traceable back to its training data, training code, evaluation results, and the specific conformity evidence that justified its deployment.

Conformity assessment is the regulatory gate that high-risk AI systems must pass before deployment. For most insurance AI applications, this is a self-assessment (the provider conducts the assessment internally, following the procedures in Annex VI), but it must be thorough and documented. ML Engineers contribute to the conformity assessment by providing: evidence that training data meets the quality requirements of Article 10, evaluation results demonstrating accuracy and robustness (Article 15), fairness assessments across protected groups, documentation of the monitoring system that will detect degradation in production, and evidence that human oversight mechanisms are technically implemented and tested. The conformity assessment must be repeated whenever the AI system is substantially modified — which includes significant retraining on new data.

GDPR obligations apply to every stage of the ML pipeline. Training data that contains personal data must be processed under a lawful basis, with purpose limitation and data minimisation enforced. Feature stores that hold personal data must support the right to erasure and the right to access. Model predictions that affect individuals must be logged for transparency, and the system must support the right to explanation under Article 22. ML Engineers must also ensure that models do not memorise and reproduce personal data from their training sets — a risk that requires specific evaluation and mitigation, particularly for large language models.

**Code walkthrough:**

```python
# EU AI Act model registry and conformity assessment tracking
# Implements Article 11 (Technical Documentation) and Article 12 (Record-Keeping)
from dataclasses import dataclass, field
from datetime import date, datetime, timezone
from enum import Enum

class ConformityStatus(Enum):
    NOT_ASSESSED = "not_assessed"
    IN_PROGRESS = "in_progress"
    COMPLIANT = "compliant"
    NON_COMPLIANT = "non_compliant"
    REASSESSMENT_REQUIRED = "reassessment_required"

@dataclass
class EUAIActModelEntry:
    """Model registry entry that satisfies EU AI Act Annex IV documentation."""
    model_id: str
    model_version: str
    intended_purpose: str
    risk_classification: str  # "high", "limited", "minimal"
    training_data_version: str
    training_data_governance: dict  # Article 10 compliance evidence
    evaluation_metrics: dict
    fairness_assessment: dict
    human_oversight_mechanism: str
    monitoring_plan: str
    conformity_status: ConformityStatus
    conformity_date: date = None
    annex_iv_documentation_path: str = ""

@dataclass
class ConformityAssessment:
    """Self-assessment under EU AI Act Annex VI for high-risk AI systems."""
    model_entry: EUAIActModelEntry
    assessed_by: str
    assessment_date: date
    checks: dict = field(default_factory=dict)

    def run_assessment(self) -> tuple[bool, list[str]]:
        """Verify all EU AI Act requirements for high-risk systems."""
        gaps = []

        # Article 9: Risk management system
        if not self.checks.get("risk_management_documented"):
            gaps.append("Art.9: Risk management system not documented")

        # Article 10: Data governance
        dg = self.model_entry.training_data_governance
        if not dg.get("bias_checked"):
            gaps.append("Art.10: Training data bias assessment missing")
        if not dg.get("representativeness_verified"):
            gaps.append("Art.10: Training data representativeness not verified")

        # Article 13: Transparency
        if not self.model_entry.intended_purpose:
            gaps.append("Art.13: Intended purpose not documented")

        # Article 14: Human oversight
        if not self.model_entry.human_oversight_mechanism:
            gaps.append("Art.14: Human oversight mechanism not defined")

        # Article 15: Accuracy and robustness
        metrics = self.model_entry.evaluation_metrics
        if metrics.get("accuracy", 0) < metrics.get("minimum_threshold", 0.8):
            gaps.append("Art.15: Model accuracy below minimum threshold")

        compliant = len(gaps) == 0
        self.model_entry.conformity_status = (
            ConformityStatus.COMPLIANT if compliant
            else ConformityStatus.NON_COMPLIANT
        )
        self.model_entry.conformity_date = self.assessment_date
        return compliant, gaps
```

> **Why it matters:** The EU AI Act imposes penalties of up to 35 million EUR or 7% of global annual turnover for non-compliance with high-risk AI system requirements. For insurance companies, where most customer-facing AI falls under the high-risk category, this means every model deployed in production must pass a documented conformity assessment. ML Engineers who integrate conformity tracking, fairness evaluation, and documentation into their standard MLOps pipelines make compliance a routine part of the development process rather than a last-minute scramble before audit.

---

## LLM Fine-Tuning – LoRA, QLoRA and PEFT

Large language model fine-tuning has become a core senior ML engineering skill as organisations adapt foundation models to domain-specific tasks. Full fine-tuning updates every parameter in a model — for a 7B parameter model this requires 56+ GB of GPU memory just for the model weights in float16, plus optimiser states and gradients. This is impractical for most teams.

**Parameter-Efficient Fine-Tuning (PEFT)** methods solve this by updating only a small fraction of the model's parameters while freezing the rest. The most widely adopted PEFT method is **LoRA (Low-Rank Adaptation)**, which injects small trainable matrices into the attention layers of a frozen model. Instead of updating the full weight matrix W (dimensions d x d), LoRA decomposes the update into two small matrices A (d x r) and B (r x d) where r << d (typically 8-64). The number of trainable parameters drops from millions to thousands, and memory requirements decrease proportionally.

**QLoRA** combines LoRA with 4-bit quantisation of the base model. The frozen model weights are stored in 4-bit NormalFloat format, reducing memory by 4x compared to float16. Only the LoRA adapter weights remain in higher precision. This allows fine-tuning a 70B parameter model on a single 48GB GPU — a task that would otherwise require multiple high-end GPUs.

The Hugging Face `transformers` and `peft` libraries provide the standard implementation. Training uses the same PyTorch training loop patterns from mid-level, with the addition of PEFT configuration and quantisation setup.

**Code walkthrough:**

```python
# Step 1: Fine-tune an LLM with LoRA using Hugging Face PEFT
# Why LoRA? It reduces trainable parameters by 99%+ while preserving model quality
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from datasets import load_dataset
import torch

# Step 2: Load base model — freeze all parameters by default
model_name = "meta-llama/Llama-3.1-8B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,      # bfloat16 is preferred over float16 for training
    device_map="auto",                # Distribute across available GPUs
)

# Step 3: Configure LoRA — the key hyperparameters
# r: rank of the LoRA matrices (higher = more capacity, more memory)
# lora_alpha: scaling factor (higher = stronger adaptation)
# target_modules: which layers to adapt (attention layers are most effective)
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,                              # Rank — 8-64 is typical
    lora_alpha=32,                     # Scaling factor — typically 2x rank
    lora_dropout=0.05,                 # Dropout on LoRA layers for regularisation
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],  # Attention projections
    bias="none",                       # Do not train bias terms
)

# Step 4: Wrap the model with LoRA — only adapter weights are trainable
peft_model = get_peft_model(model, lora_config)
peft_model.print_trainable_parameters()
# Output: "trainable params: 6,553,600 || all params: 8,030,261,248 || trainable%: 0.0816"

# Step 5: Training with the standard Hugging Face Trainer
from trl import SFTTrainer  # Supervised fine-tuning trainer from TRL library

training_args = TrainingArguments(
    output_dir="./insurance-llm-lora",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,     # Effective batch size: 4 * 4 = 16
    learning_rate=2e-4,                # Higher LR than full fine-tuning is typical for LoRA
    bf16=True,                         # Use bfloat16 mixed precision
    logging_steps=10,
    save_strategy="epoch",
    warmup_ratio=0.03,
    lr_scheduler_type="cosine",
)

# trainer = SFTTrainer(
#     model=peft_model,
#     args=training_args,
#     train_dataset=train_dataset,
#     tokenizer=tokenizer,
#     max_seq_length=2048,
# )
# trainer.train()

# Step 6: Save and load LoRA adapters — only the small adapter weights are saved
# peft_model.save_pretrained("./insurance-llm-lora-adapter")
# To load: model = AutoModelForCausalLM.from_pretrained(model_name)
#           model = PeftModel.from_pretrained(model, "./insurance-llm-lora-adapter")

# Step 7: QLoRA — 4-bit quantisation for training 70B+ models on single GPU
from transformers import BitsAndBytesConfig

qlora_config = BitsAndBytesConfig(
    load_in_4bit=True,                         # 4-bit quantisation
    bnb_4bit_quant_type="nf4",                # NormalFloat4 — optimal for LLM weights
    bnb_4bit_compute_dtype=torch.bfloat16,    # Compute in bfloat16
    bnb_4bit_use_double_quant=True,           # Quantise the quantisation constants too
)
# model_4bit = AutoModelForCausalLM.from_pretrained(
#     model_name, quantization_config=qlora_config, device_map="auto"
# )
```

**Why it matters:** LLM fine-tuning is increasingly part of the senior ML engineer's toolkit. Domain-specific fine-tuning (insurance terminology, claims processing, underwriting guidelines) produces models that outperform prompting alone on specialised tasks. LoRA and QLoRA make this feasible on realistic hardware budgets.

**Key things to understand:**
- LoRA reduces trainable parameters by 99%+ with minimal quality loss for most tasks.
- QLoRA adds 4-bit quantisation, enabling 70B+ model fine-tuning on a single 48GB GPU.
- The rank `r` controls capacity — higher rank means more parameters and more adaptation ability, but diminishing returns beyond r=64 for most tasks.
- LoRA adapters are tiny (tens of MB) and can be swapped at serving time, enabling multi-tenant model serving from a single base model.

**Common pitfalls:**
- Setting the learning rate too low (using full fine-tuning defaults) — LoRA typically needs higher learning rates (1e-4 to 3e-4).
- Targeting only a subset of attention projections when the task requires broader adaptation — experiment with including MLP layers.
- Not evaluating catastrophic forgetting — the model may lose general capabilities while gaining domain-specific ones.
- Skipping evaluation on a held-out test set and relying only on training loss, which does not capture overfitting to the fine-tuning data.

---

## Distributed Training and GPU Management

When a single GPU is not enough — either because the model does not fit in memory or training takes too long — distributed training across multiple GPUs or nodes becomes necessary. This is a core senior skill as model sizes continue to grow.

**Data parallelism** is the simplest and most common form of distributed training. The model is replicated on each GPU, and each GPU processes a different batch of data. After the forward-backward pass, gradients are averaged across all GPUs (all-reduce), and each replica updates its weights identically. PyTorch's `DistributedDataParallel` (DDP) implements this efficiently. Training throughput scales near-linearly with the number of GPUs.

**Model parallelism** splits the model itself across GPUs when it does not fit on a single device. Pipeline parallelism splits the model by layers (GPU 0 runs layers 1-12, GPU 1 runs layers 13-24). Tensor parallelism splits individual layers across GPUs (each GPU computes part of a matrix multiplication). DeepSpeed and FSDP (Fully Sharded Data Parallelism) combine aspects of both data and model parallelism for maximum efficiency.

**GPU cost optimisation** is increasingly important. Spot/preemptible instances cost 60-80% less than on-demand but can be reclaimed. Checkpointing every N steps allows training to resume after preemption. Right-sizing GPU selection (A100 vs H100, 40GB vs 80GB) based on actual memory requirements prevents overspending.

**Code walkthrough:**

```python
# Step 1: Distributed training with PyTorch DDP — the production standard
# DDP replicates the model on each GPU and synchronises gradients after each step
import torch
import torch.distributed as dist
import torch.nn as nn
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data import DataLoader, DistributedSampler
import os

def setup_distributed():
    """Initialise distributed training — called once per process."""
    dist.init_process_group(backend="nccl")  # NCCL is fastest for GPU-to-GPU communication
    local_rank = int(os.environ["LOCAL_RANK"])
    torch.cuda.set_device(local_rank)
    return local_rank

def train_distributed():
    local_rank = setup_distributed()
    device = torch.device(f"cuda:{local_rank}")

    # Step 2: Wrap model with DDP — handles gradient synchronisation automatically
    model = FraudDetector().to(device)
    model = DDP(model, device_ids=[local_rank])

    # Step 3: DistributedSampler ensures each GPU sees different data
    # Without this, all GPUs would train on the same batches — defeating the purpose
    sampler = DistributedSampler(train_dataset, shuffle=True)
    train_loader = DataLoader(
        train_dataset, batch_size=256, sampler=sampler,
        num_workers=4, pin_memory=True,
    )

    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3)

    for epoch in range(10):
        sampler.set_epoch(epoch)  # Ensures different shuffling per epoch across GPUs
        model.train()
        for features, labels in train_loader:
            features, labels = features.to(device), labels.to(device)
            optimizer.zero_grad()
            loss = nn.BCELoss()(model(features), labels)
            loss.backward()  # DDP automatically synchronises gradients here
            optimizer.step()

        # Only save checkpoint from rank 0 to avoid file conflicts
        if local_rank == 0:
            torch.save(model.module.state_dict(), f"model_epoch_{epoch}.pt")

    dist.destroy_process_group()

# Launch: torchrun --nproc_per_node=4 train.py
# This starts 4 processes, one per GPU

# Step 4: DeepSpeed ZeRO — memory-efficient distributed training
# ZeRO partitions optimizer states, gradients, and parameters across GPUs
# ZeRO Stage 1: Partition optimizer states (saves ~4x memory)
# ZeRO Stage 2: + Partition gradients (saves ~8x memory)
# ZeRO Stage 3: + Partition parameters (saves ~Nx memory for N GPUs)
DEEPSPEED_CONFIG = {
    "bf16": {"enabled": True},
    "zero_optimization": {
        "stage": 2,
        "offload_optimizer": {"device": "cpu"},  # Offload optimizer states to CPU
        "contiguous_gradients": True,
        "overlap_comm": True,
    },
    "train_batch_size": 64,
    "gradient_accumulation_steps": 4,
}

# Step 5: GPU cost optimisation — right-size and use spot instances
GPU_COST_COMPARISON = {
    "A100 40GB on-demand": {"cost_per_hour": 3.67, "memory": "40GB"},
    "A100 80GB on-demand": {"cost_per_hour": 5.12, "memory": "80GB"},
    "H100 80GB on-demand": {"cost_per_hour": 8.50, "memory": "80GB"},
    "A100 40GB spot":      {"cost_per_hour": 1.10, "memory": "40GB"},  # 70% savings
}
# Rule of thumb: use spot instances + frequent checkpointing for training
# Use on-demand for serving (no preemption tolerance)
```

**Why it matters:** Model sizes and dataset sizes continue to grow. A senior ML engineer who cannot scale training beyond a single GPU is limited in what they can build. Distributed training is also the foundation for LLM fine-tuning of large models.

**Key things to understand:**
- DDP is the default for multi-GPU training — it scales near-linearly and requires minimal code changes.
- `DistributedSampler` ensures each GPU processes different data — without it, distributed training gives no speedup.
- DeepSpeed ZeRO stages progressively reduce memory by partitioning optimizer states, gradients, and parameters across GPUs.
- GPU cost optimisation (spot instances, right-sizing, checkpoint-and-resume) can reduce training costs by 60-80%.

**Common pitfalls:**
- Forgetting `sampler.set_epoch(epoch)`, causing all epochs to use the same data ordering and reducing model quality.
- Saving checkpoints from all ranks instead of just rank 0, causing file corruption from concurrent writes.
- Using `model.state_dict()` instead of `model.module.state_dict()` with DDP, which saves the wrapper instead of the actual model.
- Not accounting for gradient synchronisation overhead when benchmarking — DDP adds communication cost that reduces per-GPU throughput.

---

## Feature Stores – Training-Serving Consistency

A feature store is a centralised system for managing, storing, and serving ML features. It solves the most common source of silent model failures: **training-serving skew**, where the features computed during training differ from the features computed during inference.

**Feast** is the most widely adopted open-source feature store. It provides an offline store (for training) and an online store (for low-latency serving) from the same feature definitions. Features are defined once, computed once, and served consistently to both training pipelines and serving endpoints. **Tecton** is the leading managed feature store, providing real-time feature computation, monitoring, and enterprise support.

Feature stores also enable **feature reuse** across teams and models. A carefully engineered feature (e.g., "customer's 90-day rolling claim frequency") can be computed once and served to multiple models — fraud detection, churn prediction, and pricing — without each team re-implementing the same transformation.

**Code walkthrough:**

```python
# Step 1: Define features in Feast — the open-source feature store
# Why Feast? It guarantees the same feature values at training and serving time,
# eliminating the most common source of silent model failures.
from feast import Entity, Feature, FeatureView, FileSource, Field
from feast.types import Float32, Int64, String
from datetime import timedelta

# Step 2: Define entities (the primary keys for feature lookup)
customer = Entity(name="customer_id", join_keys=["customer_id"])

# Step 3: Define a feature view — maps raw data to named, typed features
customer_features = FeatureView(
    name="customer_features",
    entities=[customer],
    ttl=timedelta(days=1),  # Features older than 1 day are considered stale
    schema=[
        Field(name="claim_count_90d", dtype=Int64),
        Field(name="avg_claim_amount", dtype=Float32),
        Field(name="policy_tenure_years", dtype=Float32),
        Field(name="risk_segment", dtype=String),
    ],
    source=FileSource(
        path="data/customer_features.parquet",
        timestamp_field="event_timestamp",
    ),
)

# Step 4: Use the SAME features for training and serving
from feast import FeatureStore

store = FeatureStore(repo_path="feature_repo/")

# Training: get historical features for a training dataset
# entity_df has customer_id and event_timestamp columns
# training_features = store.get_historical_features(
#     entity_df=training_entity_df,
#     features=["customer_features:claim_count_90d",
#               "customer_features:avg_claim_amount",
#               "customer_features:policy_tenure_years"],
# ).to_df()

# Serving: get the latest feature values for real-time prediction
# online_features = store.get_online_features(
#     features=["customer_features:claim_count_90d",
#               "customer_features:avg_claim_amount"],
#     entity_rows=[{"customer_id": "C12345"}],
# ).to_dict()

# The critical guarantee: training and serving use the SAME feature definitions
# and the SAME computation logic — no training-serving skew possible
```

**Why it matters:** Training-serving skew is the number one cause of silent model degradation that does not show up in any monitoring metric — the model simply produces worse predictions because it receives slightly different features at serving time than it was trained on. Feature stores eliminate this entire class of failure.

**Key things to understand:**
- Feature stores separate feature computation from feature consumption — features are defined once and served consistently.
- The offline store serves historical feature values for training; the online store serves the latest values for real-time inference.
- Feature TTL (time-to-live) prevents serving stale features — if no fresh value is available within the TTL, the feature store returns null rather than a dangerously outdated value.
- Feature stores enable cross-team feature reuse, reducing duplicated effort and ensuring consistency across models.

**Common pitfalls:**
- Implementing the same feature transformation separately in training code and serving code — this is exactly the problem feature stores are designed to prevent.
- Not setting appropriate TTL values, allowing stale features to be served without warning.
- Over-engineering the feature store before the team has enough features to justify it — start with a simple approach and adopt Feast when feature management becomes a bottleneck.
- Ignoring feature freshness requirements — some features need real-time computation (last 5 minutes of activity) while others can be batch-computed daily.
