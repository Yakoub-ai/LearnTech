export const labs = [
  // ============================================================
  // ML-LAB-1: Train & Evaluate a Model (from interactiveLabs.js)
  // ============================================================
  {
    id: 'ml-lab-1',
    roleId: 'ml-engineer',
    level: 'beginner',
    title: 'Train & Evaluate a Model',
    description: 'Build a simple classifier from scratch: prepare data, train a model, and measure it with proper metrics.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before training a machine learning model, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+ and a virtual environment. This lab uses only the Python standard library (random, math, collections) — no external packages are required.',
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
        title: 'Step 2: Prepare Training Data',
        instruction: 'Create a function that splits a dataset into training and test sets.',
        starterCode: `# ML Pipeline — Step 2: Data Preparation
import random

def train_test_split(data, labels, test_ratio=0.2, seed=42):
    """Split data into training and test sets.

    Args:
        data: List of feature vectors
        labels: List of corresponding labels
        test_ratio: Fraction of data for testing
        seed: Random seed for reproducibility
    Returns:
        (train_data, train_labels, test_data, test_labels)
    """
    # TODO: Shuffle indices, split by ratio
    pass

# Sample dataset: classify fruits by weight and color score
data = [
    [150, 7], [170, 8], [140, 6], [130, 5],  # Apples
    [200, 3], [220, 2], [190, 4], [210, 3],  # Bananas
    [80, 9], [90, 8], [70, 7], [85, 9],      # Cherries
]
labels = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2]  # 0=Apple, 1=Banana, 2=Cherry

train_X, train_y, test_X, test_y = train_test_split(data, labels)
print(f"Training: {len(train_X)} samples")
print(f"Testing: {len(test_X)} samples")`,
        hints: [
          'Create indices list: list(range(len(data)))',
          'Use random.seed(seed) then random.shuffle(indices)',
          'Split point: int(len(indices) * (1 - test_ratio))'
        ],
        expectedOutput: `Training: 9 samples\nTesting: 3 samples`,
        solution: `import random

def train_test_split(data, labels, test_ratio=0.2, seed=42):
    random.seed(seed)
    indices = list(range(len(data)))
    random.shuffle(indices)

    split = int(len(indices) * (1 - test_ratio))
    train_idx = indices[:split]
    test_idx = indices[split:]

    train_data = [data[i] for i in train_idx]
    train_labels = [labels[i] for i in train_idx]
    test_data = [data[i] for i in test_idx]
    test_labels = [labels[i] for i in test_idx]

    return train_data, train_labels, test_data, test_labels

train_X, train_y, test_X, test_y = train_test_split(data, labels)
print(f"Training: {len(train_X)} samples")
print(f"Testing: {len(test_X)} samples")`
      },
      {
        title: 'Step 3: Implement K-Nearest Neighbors',
        instruction: 'Build a simple KNN classifier that predicts labels based on the k closest training examples.',
        starterCode: `# ML Pipeline — Step 3: KNN Classifier
import math

def euclidean_distance(a, b):
    """Calculate Euclidean distance between two vectors."""
    # TODO: sqrt(sum((ai - bi)^2))
    pass

def knn_predict(train_X, train_y, test_point, k=3):
    """Predict the label for a test point using KNN.

    1. Compute distance from test_point to all training points
    2. Find k nearest neighbors
    3. Return the most common label among neighbors
    """
    # TODO: Implement KNN prediction
    pass

# Test prediction
test_point = [160, 7]  # Should be Apple-like
prediction = knn_predict(train_X, train_y, test_point, k=3)
label_names = {0: 'Apple', 1: 'Banana', 2: 'Cherry'}
print(f"Point {test_point} → Predicted: {label_names[prediction]}")`,
        hints: [
          'Compute distances: [(euclidean_distance(x, test_point), label) for x, label in zip(train_X, train_y)]',
          'Sort by distance: distances.sort(key=lambda x: x[0])',
          'Most common: use Counter on the k nearest labels'
        ],
        expectedOutput: `Point [160, 7] → Predicted: Apple`,
        solution: `import math
from collections import Counter

def euclidean_distance(a, b):
    return math.sqrt(sum((ai - bi) ** 2 for ai, bi in zip(a, b)))

def knn_predict(train_X, train_y, test_point, k=3):
    distances = []
    for x, label in zip(train_X, train_y):
        dist = euclidean_distance(x, test_point)
        distances.append((dist, label))

    distances.sort(key=lambda x: x[0])
    k_nearest = [label for _, label in distances[:k]]

    counter = Counter(k_nearest)
    return counter.most_common(1)[0][0]

test_point = [160, 7]
prediction = knn_predict(train_X, train_y, test_point, k=3)
label_names = {0: 'Apple', 1: 'Banana', 2: 'Cherry'}
print(f"Point {test_point} → Predicted: {label_names[prediction]}")`
      }
    ]
  },

  // ============================================================
  // ML-LAB-2: MLflow Experiment Tracking (from ml-1)
  // ============================================================
  {
    id: 'ml-lab-2',
    roleId: 'ml-engineer',
    level: 'beginner',
    title: 'MLflow Experiment Tracking',
    description: 'Learn to track ML experiments systematically with MLflow: log parameters, metrics, and model artifacts so you can reproduce and compare runs.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before tracking experiments, ensure your ML engineering environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, scikit-learn, and MLflow. Set up a virtual environment and verify all dependencies are installed.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `pip install mlflow scikit-learn` to install dependencies',
          'Test: `mlflow --version` to verify experiment tracking is available'
        ],
        expectedOutput: `Python 3.12.x\nscikit-learn 1.x.x installed\nmlflow, version 2.x.x`,
        solution: null
      },
      {
        title: 'Step 2: Create an MLflow Experiment',
        instruction: `WHAT: Set up a named MLflow experiment and understand the experiment lifecycle.\nWHY: Named experiments group related runs so you can compare model versions across your team. Without explicit naming, all runs land in the "Default" experiment — making it impossible to find your results later.\nHOW: Call mlflow.set_experiment() before starting any run. MLflow creates the experiment if it does not exist and returns an Experiment object you can inspect.`,
        starterCode: `import mlflow

# TODO: Set an experiment named "iris-classification"
# TODO: Print the experiment ID and artifact location

# Hint: mlflow.set_experiment() returns an Experiment object
experiment = None  # Replace with actual call
print(f"Experiment ID: {experiment.experiment_id}")
print(f"Artifact Location: {experiment.artifact_location}")`,
        hints: [
          'Use mlflow.set_experiment("iris-classification") — it returns the Experiment object',
          'Access .experiment_id and .artifact_location on the returned object',
          'Experiments are stored in ./mlruns by default unless MLFLOW_TRACKING_URI is set'
        ],
        expectedOutput: `Experiment ID: 1\nArtifact Location: mlruns/1`,
        solution: `import mlflow

experiment = mlflow.set_experiment("iris-classification")
print(f"Experiment ID: {experiment.experiment_id}")
print(f"Artifact Location: {experiment.artifact_location}")`
      },
      {
        title: 'Step 3: Log Parameters and Metrics in a Run',
        instruction: `WHAT: Train a RandomForest classifier on Iris and log hyperparameters and metrics to MLflow.\nWHY: Logging params and metrics creates a permanent, searchable record of every training run. This is the foundation of reproducible ML — you can always recreate any past model and understand why it performed as it did.\nHOW: Use the mlflow.start_run() context manager. Inside it, call mlflow.log_param() for hyperparameters and mlflow.log_metric() for results. Always log both so you can correlate performance to configuration.`,
        starterCode: `import mlflow
import mlflow.sklearn
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score

mlflow.set_experiment("iris-classification")

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# TODO: Start an MLflow run named "rf-baseline"
# TODO: Train a RandomForestClassifier with n_estimators=50, max_depth=5
# TODO: Log params: n_estimators, max_depth
# TODO: Log metrics: accuracy, precision (weighted), recall (weighted)
# TODO: Log the model artifact with mlflow.sklearn.log_model
# TODO: Print the run ID

# Your code here`,
        hints: [
          'Use: with mlflow.start_run(run_name="rf-baseline") as run:',
          'Log params before training: mlflow.log_param("n_estimators", 50)',
          'Log metrics after scoring: mlflow.log_metric("accuracy", accuracy_score(y_test, y_pred))',
          'Save model: mlflow.sklearn.log_model(model, "model")',
          'Get run ID: run.info.run_id'
        ],
        expectedOutput: `Run logged with ID: <run-id>\nAccuracy: 1.0000\nPrecision: 1.0000\nRecall: 1.0000`,
        solution: `import mlflow
import mlflow.sklearn
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score

mlflow.set_experiment("iris-classification")

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

with mlflow.start_run(run_name="rf-baseline") as run:
    model = RandomForestClassifier(n_estimators=50, max_depth=5)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')

    mlflow.log_param("n_estimators", 50)
    mlflow.log_param("max_depth", 5)
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("precision", precision)
    mlflow.log_metric("recall", recall)

    mlflow.sklearn.log_model(model, "model")

    print(f"Run logged with ID: {run.info.run_id}")
    print(f"Accuracy: {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall: {recall:.4f}")`
      },
      {
        title: 'Step 4: Compare Runs Programmatically',
        instruction: `WHAT: Use the MLflow client API to search and compare runs within your experiment.\nWHY: The real value of experiment tracking is comparing multiple runs. Being able to query runs by metric thresholds lets you automate model selection and champion/challenger workflows without manually clicking through the UI.\nHOW: Use mlflow.MlflowClient().search_runs() with a filter string. Results include all logged params and metrics, letting you rank and select the best run by any metric.`,
        starterCode: `import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()

# TODO: Find the experiment by name "iris-classification"
# TODO: Search for all runs in that experiment, ordered by accuracy descending
# TODO: Print the top run's ID, accuracy, and n_estimators param

# Hint: client.get_experiment_by_name() and client.search_runs()`,
        hints: [
          'Get experiment: exp = client.get_experiment_by_name("iris-classification")',
          'Search runs: client.search_runs(experiment_ids=[exp.experiment_id], order_by=["metrics.accuracy DESC"])',
          'Access metrics on each run: run.data.metrics["accuracy"]',
          'Access params: run.data.params["n_estimators"]'
        ],
        expectedOutput: `Best run: <run-id>\n  Accuracy: 1.0000\n  n_estimators: 50`,
        solution: `import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()

exp = client.get_experiment_by_name("iris-classification")
runs = client.search_runs(
    experiment_ids=[exp.experiment_id],
    order_by=["metrics.accuracy DESC"]
)

if runs:
    best = runs[0]
    print(f"Best run: {best.info.run_id}")
    print(f"  Accuracy: {best.data.metrics['accuracy']:.4f}")
    print(f"  n_estimators: {best.data.params['n_estimators']}")`
      },
      {
        title: 'Step 5: Register a Model in the Model Registry',
        instruction: `WHAT: Promote your best run's model artifact to the MLflow Model Registry and assign it a "staging" alias.\nWHY: The Model Registry is the gateway between experimentation and deployment. It provides versioning, aliases (e.g. staging, production), and a single source of truth for production models. Every production deployment should pull from the registry, not directly from a run artifact.\nHOW: Use mlflow.register_model() with the run artifact URI, then use MlflowClient().set_registered_model_alias() to assign the "staging" alias. In production, you would gate this on passing an automated check suite.`,
        starterCode: `import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()

# Assume best_run_id was retrieved in the previous step
best_run_id = "<replace-with-your-run-id>"
model_uri = f"runs:/{best_run_id}/model"

# TODO: Register the model as "iris-classifier"
# TODO: Print the registered model version number
# TODO: Assign the "staging" alias to the registered version
# TODO: Print the alias assignment`,
        hints: [
          'Register: result = mlflow.register_model(model_uri, "iris-classifier")',
          'The result has .version attribute',
          'Assign alias: client.set_registered_model_alias(name="iris-classifier", alias="staging", version=result.version)',
          'Retrieve by alias: client.get_model_version_by_alias("iris-classifier", "staging").version'
        ],
        expectedOutput: `Registered model version: 1\nAlias 'staging' assigned to iris-classifier v1`,
        solution: `import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()

best_run_id = "<replace-with-your-run-id>"
model_uri = f"runs:/{best_run_id}/model"

result = mlflow.register_model(model_uri, "iris-classifier")
print(f"Registered model version: {result.version}")

client.set_registered_model_alias(
    name="iris-classifier",
    alias="staging",
    version=result.version
)

print(f"Alias 'staging' assigned to iris-classifier v{result.version}")`
      }
    ]
  },

  // ============================================================
  // ML-LAB-3: Model Serving with FastAPI (from ml-2)
  // ============================================================
  {
    id: 'ml-lab-3',
    roleId: 'ml-engineer',
    level: 'mid',
    title: 'Model Serving with FastAPI',
    description: 'Deploy a trained ML model as a production-ready REST API with FastAPI: request validation, lifespan model loading, health checks, and graceful error handling.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building the model server, ensure your ML engineering environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, FastAPI, uvicorn, pydantic, and mlflow. Install with `pip install fastapi uvicorn mlflow scikit-learn`.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `pip install fastapi uvicorn mlflow scikit-learn` to install dependencies',
          'Test: `python -c "import fastapi; import mlflow; print(\'Ready\')"` to verify setup'
        ],
        expectedOutput: `Python 3.12.x\nfastapi and uvicorn installed\nMLflow 2.x.x\nReady`,
        solution: null
      },
      {
        title: 'Step 2: Define Request and Response Schemas',
        instruction: `WHAT: Create Pydantic models for the prediction request and response payloads.\nWHY: Strict input/output schemas are the first line of defence for an ML API. They reject malformed inputs before they reach the model (preventing cryptic NumPy errors), and they produce self-documenting OpenAPI specs that consuming teams can rely on.\nHOW: Use pydantic BaseModel. Constrain the features list length to match your model's expected input dimensionality. Include a probabilities field in the response so callers can implement threshold-based fallback logic.`,
        starterCode: `from pydantic import BaseModel, Field
from typing import Annotated

# TODO: Define PredictionRequest with a 'features' field
#   - Must be a list of floats
#   - Iris model expects exactly 4 features
#   - Add a description for the OpenAPI docs

# TODO: Define PredictionResponse with:
#   - 'prediction': int (class index)
#   - 'label': str (human-readable class name)
#   - 'probabilities': list of floats (one per class)
#   - 'model_version': str

# Test your schemas
req = PredictionRequest(features=[5.1, 3.5, 1.4, 0.2])
print(f"Valid request: {req.features}")`,
        hints: [
          'Use Field(min_length=4, max_length=4) to enforce exactly 4 features',
          'list[float] is the correct type annotation for a JSON array of numbers',
          'Pydantic will automatically validate types and raise 422 on bad input',
          'Add description= parameter to Field() for OpenAPI documentation'
        ],
        expectedOutput: `Valid request: [5.1, 3.5, 1.4, 0.2]`,
        solution: `from pydantic import BaseModel, Field
from typing import Annotated

class PredictionRequest(BaseModel):
    features: Annotated[
        list[float],
        Field(min_length=4, max_length=4, description="Exactly 4 Iris feature values: sepal length, sepal width, petal length, petal width (all in cm)")
    ]

class PredictionResponse(BaseModel):
    prediction: int = Field(description="Predicted class index (0=setosa, 1=versicolor, 2=virginica)")
    label: str = Field(description="Human-readable class name")
    probabilities: list[float] = Field(description="Probability for each class")
    model_version: str = Field(description="Model version used for this prediction")

req = PredictionRequest(features=[5.1, 3.5, 1.4, 0.2])
print(f"Valid request: {req.features}")`
      },
      {
        title: 'Step 3: Build the FastAPI App with Lifespan Model Loading',
        instruction: `WHAT: Create the FastAPI app, load the model at startup using lifespan context, and expose a /health endpoint.\nWHY: Loading the model inside the request handler means cold-start latency on every call. Using FastAPI's lifespan context loads the model once at startup and stores it in app.state, giving you warm-path inference. This pattern also makes it easy to swap models via environment variables without changing handler logic.\nHOW: Use the @asynccontextmanager lifespan pattern (FastAPI's recommended approach since v0.95). Load the model from an MLflow run URI or a local path. Store it in app.state.model for access inside route handlers.`,
        starterCode: `from fastapi import FastAPI
from contextlib import asynccontextmanager
import mlflow.pyfunc
import os

# TODO: Implement the lifespan context manager
# - Load the model from env var MODEL_URI (default: "models:/iris-classifier/Staging")
# - Store in app.state.model
# - Print a startup message with the model URI
# - Handle load failures gracefully (set model to None, do not crash)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model at startup
    # TODO
    yield
    # Cleanup at shutdown (if needed)

app = FastAPI(
    title="Iris Classifier API",
    version="1.0.0",
    lifespan=lifespan
)

@app.get("/health")
def health():
    # TODO: Return status and whether model is loaded
    pass`,
        hints: [
          'model_uri = os.getenv("MODEL_URI", "models:/iris-classifier/Staging")',
          'app.state.model = mlflow.pyfunc.load_model(model_uri) — store before yield',
          'Wrap in try/except and set app.state.model = None on failure',
          'Health check: return {"status": "healthy", "model_loaded": app.state.model is not None}'
        ],
        expectedOutput: `{"status": "healthy", "model_loaded": true}`,
        solution: `from fastapi import FastAPI
from contextlib import asynccontextmanager
import mlflow.pyfunc
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    model_uri = os.getenv("MODEL_URI", "models:/iris-classifier/Staging")
    try:
        app.state.model = mlflow.pyfunc.load_model(model_uri)
        print(f"Model loaded from: {model_uri}")
    except Exception as e:
        print(f"Warning: Could not load model: {e}")
        app.state.model = None
    yield

app = FastAPI(
    title="Iris Classifier API",
    version="1.0.0",
    lifespan=lifespan
)

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": app.state.model is not None
    }`
      },
      {
        title: 'Step 4: Implement the Prediction Endpoint',
        instruction: `WHAT: Wire up the /predict POST endpoint to run inference and return a structured response.\nWHY: The prediction handler is where ML meets production. It must reshape inputs to match what the model expects, handle inference errors without crashing, and return structured output callers can act on. Returning probabilities — not just the predicted class — lets downstream systems implement confidence thresholds and human-in-the-loop review workflows.\nHOW: Access the loaded model via request.app.state.model. Use numpy to reshape the features list into a (1, 4) array. Check for predict_proba for probabilities and use argmax for the class label. Map the integer class to a human-readable label using a constant dict.`,
        starterCode: `from fastapi import FastAPI, HTTPException, Request
import numpy as np

IRIS_LABELS = {0: "setosa", 1: "versicolor", 2: "virginica"}

# Add this endpoint to your app from Step 3
# @app.post("/predict", response_model=PredictionResponse)
def predict(request: Request, body: PredictionRequest):
    # TODO: Check model is loaded (raise 503 if not)
    # TODO: Reshape features to (1, 4) numpy array
    # TODO: Get probabilities and predicted class
    # TODO: Return PredictionResponse with label and model_version
    pass

# Test the input reshaping logic (without running the server)
features = [5.1, 3.5, 1.4, 0.2]
X = np.array(features).reshape(1, -1)
print(f"Input shape: {X.shape}")`,
        hints: [
          'Check model: if request.app.state.model is None: raise HTTPException(status_code=503, detail="Model not loaded")',
          'Reshape: X = np.array(body.features).reshape(1, -1)',
          'Some mlflow pyfunc models use predict(); check for predict_proba with hasattr()',
          'model_version: use os.getenv("MODEL_VERSION", "staging-latest")'
        ],
        expectedOutput: `Input shape: (1, 4)\n{"prediction": 0, "label": "setosa", "probabilities": [0.97, 0.02, 0.01], "model_version": "staging-latest"}`,
        solution: `from fastapi import HTTPException, Request
import numpy as np
import os

IRIS_LABELS = {0: "setosa", 1: "versicolor", 2: "virginica"}

@app.post("/predict", response_model=PredictionResponse)
def predict(request: Request, body: PredictionRequest):
    if request.app.state.model is None:
        raise HTTPException(status_code=503, detail="Model not loaded — check /health")

    try:
        X = np.array(body.features).reshape(1, -1)
        raw_model = request.app.state.model._model_impl

        if hasattr(raw_model, "predict_proba"):
            probabilities = raw_model.predict_proba(X)[0].tolist()
            prediction = int(np.argmax(probabilities))
        else:
            prediction = int(request.app.state.model.predict(X)[0])
            probabilities = [0.0, 0.0, 0.0]
            probabilities[prediction] = 1.0

        return PredictionResponse(
            prediction=prediction,
            label=IRIS_LABELS[prediction],
            probabilities=probabilities,
            model_version=os.getenv("MODEL_VERSION", "staging-latest")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {str(e)}")`
      },
      {
        title: 'Step 5: Run and Test the API',
        instruction: `WHAT: Launch the FastAPI server with uvicorn and test the endpoints with curl or a test client.\nWHY: End-to-end testing confirms that schema validation, model loading, and inference all work together. The interactive /docs endpoint (Swagger UI) lets your team explore the API without writing a single line of client code.\nHOW: Start with uvicorn on port 8000. Use curl to hit /health and /predict. Intentionally send a bad request (wrong number of features) to verify the 422 validation response. Check the auto-generated docs at http://localhost:8000/docs.`,
        starterCode: `# Run in terminal (not in the code editor):
# uvicorn main:app --reload --port 8000

# Simulate and document the curl commands you would run
test_cases = [
    {
        "description": "Valid iris sample (setosa)",
        "payload": {"features": [5.1, 3.5, 1.4, 0.2]},
        "expected_label": "setosa"
    },
    {
        "description": "Valid iris sample (virginica)",
        "payload": {"features": [6.3, 3.3, 6.0, 2.5]},
        "expected_label": "virginica"
    },
    {
        "description": "Invalid: wrong feature count",
        "payload": {"features": [5.1, 3.5]},
        "expected_status": 422
    }
]

# Print each test case in a formatted table
for tc in test_cases:
    print(f"Test: {tc['description']}")
    print(f"  Payload: {tc['payload']}")
    print()`,
        hints: [
          'Start server: uvicorn main:app --reload --port 8000',
          'Health: curl http://localhost:8000/health',
          'Predict: curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d \'{"features": [5.1, 3.5, 1.4, 0.2]}\'',
          'Docs: open http://localhost:8000/docs in your browser',
          'Bad input returns 422 Unprocessable Entity with validation details'
        ],
        expectedOutput: `Test: Valid iris sample (setosa)\n  Payload: {'features': [5.1, 3.5, 1.4, 0.2]}\n\nTest: Valid iris sample (virginica)\n  Payload: {'features': [6.3, 3.3, 6.0, 2.5]}\n\nTest: Invalid: wrong feature count\n  Payload: {'features': [5.1, 3.5]}`,
        solution: `# Full test script for the running server
import urllib.request, json

BASE_URL = "http://localhost:8000"

def post_json(path, payload):
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        f"{BASE_URL}{path}",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read())

req = urllib.request.urlopen(f"{BASE_URL}/health")
health = json.loads(req.read())
print(f"Health: {health}")

tests = [
    {"features": [5.1, 3.5, 1.4, 0.2]},
    {"features": [6.3, 3.3, 6.0, 2.5]},
]
for t in tests:
    status, result = post_json("/predict", t)
    print(f"Status {status}: {result}")`
      }
    ]
  },

  // ============================================================
  // ML-LAB-4: Neural Network with PyTorch (from ml-3)
  // ============================================================
  {
    id: 'ml-lab-4',
    roleId: 'ml-engineer',
    level: 'senior',
    title: 'Neural Network Training with PyTorch',
    description: 'Build, train, and export a feedforward neural network using PyTorch 2.x: custom architecture with BatchNorm and Dropout, training loop with validation, learning rate scheduling, and TorchScript export.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building neural networks, ensure your ML engineering environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, PyTorch 2.x, and CUDA toolkit (optional, for GPU support). Verify your setup with the commands below.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `pip install torch torchvision torchaudio` to install PyTorch',
          'Test: `python -c "import torch; print(torch.__version__); print(torch.cuda.is_available())"` to verify GPU support'
        ],
        expectedOutput: `Python 3.12.x\n2.x.x+cu121 (or cpu)\nCUDA available: True (or False for CPU-only)`,
        solution: null
      },
      {
        title: 'Step 2: Define a Neural Network Architecture',
        instruction: `WHAT: Build a feedforward neural network class using nn.Module with configurable hidden layers, BatchNorm, and Dropout.\nWHY: Defining networks as nn.Module subclasses is the standard PyTorch pattern. It gives you automatic parameter tracking for optimizers, clean serialization with state_dict(), and compatibility with torch.compile() for 2x+ speedups in PyTorch 2.x.\nHOW: Override __init__() to register layers as attributes and forward() to define the computation graph. Use nn.Sequential for clean layer stacking. Add Dropout and BatchNorm between layers to regularize training and stabilize gradients.`,
        starterCode: `import torch
import torch.nn as nn

class FeedforwardNet(nn.Module):
    def __init__(self, input_size: int, hidden_sizes: list[int], output_size: int, dropout: float = 0.3):
        """
        Args:
            input_size: number of input features
            hidden_sizes: list of hidden layer sizes, e.g. [128, 64]
            output_size: number of output classes
            dropout: dropout probability (0 = disabled)
        """
        super().__init__()
        # TODO: Build self.network as an nn.Sequential
        # Pattern for each hidden layer: Linear -> BatchNorm1d -> ReLU -> Dropout
        # Final layer: Linear(last_hidden, output_size) — no activation (handled by loss fn)
        pass

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # TODO: Pass x through self.network
        pass

# Test: verify the architecture
model = FeedforwardNet(input_size=10, hidden_sizes=[128, 64], output_size=3)
x = torch.randn(8, 10)  # batch of 8 samples
out = model(x)
print(f"Input shape: {x.shape}")
print(f"Output shape: {out.shape}")
print(f"Parameters: {sum(p.numel() for p in model.parameters()):,}")`,
        hints: [
          'Build layers in a loop: for in_s, out_s in zip([input_size]+hidden_sizes, hidden_sizes)',
          'Each hidden block: nn.Linear(in_s, out_s), nn.BatchNorm1d(out_s), nn.ReLU(), nn.Dropout(dropout)',
          'Extend with layers.extend([...]) or build a flat list and pass to nn.Sequential(*layers)',
          'Output shape should be (batch_size, output_size) — e.g. (8, 3)'
        ],
        expectedOutput: `Input shape: torch.Size([8, 10])\nOutput shape: torch.Size([8, 3])\nParameters: 10,243`,
        solution: `import torch
import torch.nn as nn

class FeedforwardNet(nn.Module):
    def __init__(self, input_size: int, hidden_sizes: list[int], output_size: int, dropout: float = 0.3):
        super().__init__()
        layers = []
        in_size = input_size

        for out_size in hidden_sizes:
            layers.extend([
                nn.Linear(in_size, out_size),
                nn.BatchNorm1d(out_size),
                nn.ReLU(),
                nn.Dropout(dropout),
            ])
            in_size = out_size

        layers.append(nn.Linear(in_size, output_size))
        self.network = nn.Sequential(*layers)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.network(x)

model = FeedforwardNet(input_size=10, hidden_sizes=[128, 64], output_size=3)
x = torch.randn(8, 10)
out = model(x)
print(f"Input shape: {x.shape}")
print(f"Output shape: {out.shape}")
print(f"Parameters: {sum(p.numel() for p in model.parameters()):,}")`
      },
      {
        title: 'Step 3: Prepare Data with DataLoader',
        instruction: `WHAT: Wrap synthetic training data in TensorDataset and DataLoader with train/validation splits.\nWHY: DataLoader handles batching, shuffling, and multi-process data loading. Separating training from validation data is mandatory — without it, you cannot detect overfitting or tune hyperparameters reliably. Always shuffle training data; never shuffle validation data.\nHOW: Create a TensorDataset from X and y tensors. Use random_split() to allocate 80% for training and 20% for validation. Pass shuffle=True only to the training DataLoader.`,
        starterCode: `import torch
from torch.utils.data import DataLoader, TensorDataset, random_split

# Synthetic 3-class classification dataset
torch.manual_seed(42)
X = torch.randn(500, 10)
y = torch.randint(0, 3, (500,))

# TODO: Create a TensorDataset from X and y
# TODO: Split into 80% train, 20% validation using random_split
# TODO: Create train_loader (batch_size=32, shuffle=True) and val_loader (batch_size=64, shuffle=False)

dataset = None
train_dataset = None
val_dataset = None
train_loader = None
val_loader = None

print(f"Train samples: {len(train_dataset)}")
print(f"Val samples: {len(val_dataset)}")

X_batch, y_batch = next(iter(train_loader))
print(f"Batch X shape: {X_batch.shape}")
print(f"Batch y shape: {y_batch.shape}")`,
        hints: [
          'dataset = TensorDataset(X, y)',
          'train_size = int(0.8 * len(dataset)); val_size = len(dataset) - train_size',
          'train_dataset, val_dataset = random_split(dataset, [train_size, val_size])',
          'train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)'
        ],
        expectedOutput: `Train samples: 400\nVal samples: 100\nBatch X shape: torch.Size([32, 10])\nBatch y shape: torch.Size([32])`,
        solution: `import torch
from torch.utils.data import DataLoader, TensorDataset, random_split

torch.manual_seed(42)
X = torch.randn(500, 10)
y = torch.randint(0, 3, (500,))

dataset = TensorDataset(X, y)
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=64, shuffle=False)

print(f"Train samples: {len(train_dataset)}")
print(f"Val samples: {len(val_dataset)}")

X_batch, y_batch = next(iter(train_loader))
print(f"Batch X shape: {X_batch.shape}")
print(f"Batch y shape: {y_batch.shape}")`
      },
      {
        title: 'Step 4: Write the Training Loop with Validation',
        instruction: `WHAT: Implement a full training loop with per-epoch validation, loss tracking, and best-model checkpointing.\nWHY: Training without validation is running blind. The validation loop catches overfitting early. Saving the best checkpoint (by val loss) means you can stop training at any time and still recover the best-performing weights — critical for long GPU runs.\nHOW: Two phases per epoch: train phase (model.train(), compute loss, backward, optimizer.step()) and val phase (model.eval(), torch.no_grad()). Track running loss. Save state_dict() whenever val_loss improves.`,
        starterCode: `import torch
import torch.nn as nn
import torch.optim as optim

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = FeedforwardNet(10, [128, 64], 3).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=20)

best_val_loss = float("inf")
history = {"train_loss": [], "val_loss": [], "val_acc": []}

# TODO: Train for 20 epochs
# Each epoch:
#   - Train phase: model.train(), iterate train_loader, zero_grad, forward, loss, backward, step
#   - Val phase: model.eval(), torch.no_grad(), compute val loss and accuracy
#   - Step the scheduler
#   - Save checkpoint if val_loss improved (torch.save(model.state_dict(), "best_model.pt"))
#   - Append losses to history dict
#   - Print epoch summary every 5 epochs

for epoch in range(1, 21):
    # TODO: implement
    pass

print(f"Best val loss: {best_val_loss:.4f}")`,
        hints: [
          'Train: model.train(); for X_b, y_b in train_loader: optimizer.zero_grad(); loss = criterion(model(X_b.to(device)), y_b.to(device)); loss.backward(); optimizer.step()',
          'Val: model.eval(); with torch.no_grad(): compute val_loss and correct / total for accuracy',
          'Save: if val_loss < best_val_loss: best_val_loss = val_loss; torch.save(model.state_dict(), "best_model.pt")',
          'Print every 5 epochs: if epoch % 5 == 0: print(...)'
        ],
        expectedOutput: `Epoch  5 | Train Loss: 1.0842 | Val Loss: 1.0950 | Val Acc: 36.00%\nEpoch 10 | Train Loss: 1.0731 | Val Loss: 1.0888 | Val Acc: 36.00%\nEpoch 15 | Train Loss: 1.0673 | Val Loss: 1.0853 | Val Acc: 36.00%\nEpoch 20 | Train Loss: 1.0647 | Val Loss: 1.0831 | Val Acc: 36.00%\nBest val loss: 1.0831`,
        solution: `import torch
import torch.nn as nn
import torch.optim as optim

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = FeedforwardNet(10, [128, 64], 3).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=20)

best_val_loss = float("inf")
history = {"train_loss": [], "val_loss": [], "val_acc": []}

for epoch in range(1, 21):
    model.train()
    running_loss = 0.0
    for X_b, y_b in train_loader:
        X_b, y_b = X_b.to(device), y_b.to(device)
        optimizer.zero_grad()
        outputs = model(X_b)
        loss = criterion(outputs, y_b)
        loss.backward()
        optimizer.step()
        running_loss += loss.item() * len(X_b)
    train_loss = running_loss / len(train_dataset)

    model.eval()
    val_loss, correct, total = 0.0, 0, 0
    with torch.no_grad():
        for X_b, y_b in val_loader:
            X_b, y_b = X_b.to(device), y_b.to(device)
            outputs = model(X_b)
            val_loss += criterion(outputs, y_b).item() * len(X_b)
            preds = outputs.argmax(dim=1)
            correct += (preds == y_b).sum().item()
            total += len(y_b)
    val_loss /= len(val_dataset)
    val_acc = correct / total

    scheduler.step()
    history["train_loss"].append(train_loss)
    history["val_loss"].append(val_loss)
    history["val_acc"].append(val_acc)

    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), "best_model.pt")

    if epoch % 5 == 0:
        print(f"Epoch {epoch:2d} | Train Loss: {train_loss:.4f} | Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.2%}")

print(f"Best val loss: {best_val_loss:.4f}")`
      },
      {
        title: 'Step 5: Load the Best Checkpoint and Export to TorchScript',
        instruction: `WHAT: Load the saved best checkpoint, run a final inference check, and export the model to TorchScript for production deployment.\nWHY: TorchScript serializes the model's computation graph independent of the Python interpreter, enabling deployment in C++ services, mobile apps, and environments without a Python runtime. It is the standard export format for PyTorch models going to production.\nHOW: Load weights with model.load_state_dict(). Use torch.jit.script() to compile the model to TorchScript. Save with .save() and reload with torch.jit.load() to verify the export round-trips correctly.`,
        starterCode: `import torch

# TODO: Load best_model.pt weights into the model
# TODO: Set model to eval mode
# TODO: Run inference on a single test sample and print the predicted class
# TODO: Export model to TorchScript with torch.jit.script()
# TODO: Save the scripted model to "model_scripted.pt"
# TODO: Reload and verify the scripted model produces the same output

model.load_state_dict(None)  # Replace None with the correct call
model.eval()

test_input = torch.randn(1, 10)
with torch.no_grad():
    logits = model(test_input)
    pred_class = logits.argmax(dim=1).item()
    print(f"Predicted class: {pred_class}")

# Export to TorchScript
# TODO`,
        hints: [
          'Load: model.load_state_dict(torch.load("best_model.pt", map_location=device, weights_only=True))',
          'Export: scripted = torch.jit.script(model)',
          'Save: scripted.save("model_scripted.pt")',
          'Reload: reloaded = torch.jit.load("model_scripted.pt")',
          'Verify: assert torch.allclose(model(test_input), reloaded(test_input))'
        ],
        expectedOutput: `Predicted class: 1\nTorchScript model saved to model_scripted.pt\nOutputs match: True`,
        solution: `import torch

model.load_state_dict(torch.load("best_model.pt", map_location=device, weights_only=True))
model.eval()

test_input = torch.randn(1, 10)
with torch.no_grad():
    logits = model(test_input)
    pred_class = logits.argmax(dim=1).item()
    print(f"Predicted class: {pred_class}")

scripted = torch.jit.script(model)
scripted.save("model_scripted.pt")
print("TorchScript model saved to model_scripted.pt")

reloaded = torch.jit.load("model_scripted.pt")
reloaded.eval()
with torch.no_grad():
    orig_out = model(test_input)
    reload_out = reloaded(test_input)
    match = torch.allclose(orig_out, reload_out)
    print(f"Outputs match: {match}")`
      }
    ]
  },

  // ============================================================
  // ML-LAB-5: Model Evaluation Dashboard (from ml-4)
  // ============================================================
  {
    id: 'ml-lab-5',
    roleId: 'ml-engineer',
    level: 'mid',
    title: 'Model Evaluation Dashboard',
    description: 'Build a reusable ModelScorer class that computes a full suite of classification metrics, generates confusion matrices, enables side-by-side model comparisons, and logs results to MLflow.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building the evaluation dashboard, ensure your ML engineering environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, scikit-learn, numpy, and mlflow. These should already be installed if you followed the dev setup.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `pip install scikit-learn numpy mlflow` to install dependencies',
          'Test: `python -c "import sklearn; import numpy; print(\'Ready\')"` to verify setup'
        ],
        expectedOutput: `scikit-learn 1.x.x\nnumpy 2.x.x\nReady`,
        solution: null
      },
      {
        title: 'Step 2: Implement Core Metrics Computation',
        instruction: `WHAT: Build the score() method of a ModelScorer class that computes accuracy, precision, recall, F1, and AUC.\nWHY: Using a single scorer object rather than scattered metric calls enforces consistency — every model is measured the same way. Storing results in a dict allows downstream comparisons, serialization to JSON for logging, and automated model selection gates in CI/CD pipelines.\nHOW: Use sklearn.metrics functions. Always pass zero_division=0 to precision/recall/F1 to handle edge cases gracefully. For AUC, check whether the model exposes predict_proba and handle both binary and multi-class cases.`,
        starterCode: `import numpy as np
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score
)

class ModelScorer:
    """Score a classification model and produce a comprehensive report."""

    def __init__(self, model, class_names=None):
        self.model = model
        self.class_names = class_names
        self.results = {}

    def score(self, X_test, y_test):
        """Run predictions and compute all metrics.

        Returns:
            dict with keys: accuracy, precision, recall, f1, confusion_matrix,
            classification_report, and optionally auc
        """
        # TODO: Get predictions from self.model
        # TODO: Compute accuracy, precision (weighted), recall (weighted), f1 (weighted)
        # TODO: Compute confusion_matrix and classification_report
        # TODO: If model has predict_proba, compute AUC (handle binary vs multi-class)
        # TODO: Store everything in self.results and return it
        pass

# Test
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

scorer = ModelScorer(model, class_names=["setosa", "versicolor", "virginica"])
results = scorer.score(X_test, y_test)
print(f"Accuracy: {results['accuracy']:.4f}")
print(f"F1: {results['f1']:.4f}")
print(f"AUC: {results.get('auc', 'N/A')}")`,
        hints: [
          'y_pred = self.model.predict(X_test)',
          'accuracy_score, precision_score, recall_score, f1_score all accept average="weighted" and zero_division=0',
          'For AUC binary: roc_auc_score(y_test, y_proba[:, 1])',
          'For AUC multi-class: roc_auc_score(y_test, y_proba, multi_class="ovr", average="weighted")'
        ],
        expectedOutput: `Accuracy: 1.0000\nF1: 1.0000\nAUC: 1.0000`,
        solution: `import numpy as np
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score
)

class ModelScorer:
    def __init__(self, model, class_names=None):
        self.model = model
        self.class_names = class_names
        self.results = {}

    def score(self, X_test, y_test):
        y_pred = self.model.predict(X_test)

        self.results["accuracy"] = accuracy_score(y_test, y_pred)
        self.results["precision"] = precision_score(y_test, y_pred, average="weighted", zero_division=0)
        self.results["recall"] = recall_score(y_test, y_pred, average="weighted", zero_division=0)
        self.results["f1"] = f1_score(y_test, y_pred, average="weighted", zero_division=0)
        self.results["confusion_matrix"] = confusion_matrix(y_test, y_pred)
        self.results["classification_report"] = classification_report(
            y_test, y_pred, target_names=self.class_names, zero_division=0
        )

        if hasattr(self.model, "predict_proba"):
            y_proba = self.model.predict_proba(X_test)
            if y_proba.shape[1] == 2:
                self.results["auc"] = roc_auc_score(y_test, y_proba[:, 1])
            else:
                self.results["auc"] = roc_auc_score(
                    y_test, y_proba, multi_class="ovr", average="weighted"
                )

        return self.results`
      },
      {
        title: 'Step 3: Build the Formatted Report Printer',
        instruction: `WHAT: Add a print_report() method that renders a clean, human-readable metric summary.\nWHY: Raw dicts and numpy arrays are hard to read at a glance. A consistent report format lets you paste results directly into model cards, Slack channels, or PR descriptions without reformatting. Including the confusion matrix alongside per-class metrics surfaces class-level failure modes that aggregate scores hide.\nHOW: Format the scalar metrics with fixed decimal places. Print the confusion matrix with row/column headers if class_names are provided. Include the full classification_report string which already handles per-class breakdown.`,
        starterCode: `# Add this method to ModelScorer from Step 2

def print_report(self):
    """Display a formatted scoring report."""
    # TODO: Print a header with "MODEL EVALUATION REPORT"
    # TODO: Print accuracy, precision, recall, F1 (4 decimal places)
    # TODO: Print AUC if it was computed
    # TODO: Print confusion matrix (with class labels if available)
    # TODO: Print the classification report string
    pass

# Test
scorer.print_report()`,
        hints: [
          'Use "=" * 60 for section dividers and "-" * 60 for subsection dividers',
          'f"{self.results[\'accuracy\']:.4f}" for consistent decimal formatting',
          'Print AUC only if "auc" in self.results',
          'Print confusion matrix rows with zip(self.class_names, cm) for labeled output'
        ],
        expectedOutput: `============================================================\nMODEL EVALUATION REPORT\n============================================================\n  Accuracy:   1.0000\n  Precision:  1.0000\n  Recall:     1.0000\n  F1 Score:   1.0000\n  AUC:        1.0000\n------------------------------------------------------------\nConfusion Matrix:\n[[10  0  0]\n [ 0  9  0]\n [ 0  0 11]]\n------------------------------------------------------------\nPer-Class Report:\n              precision    recall  f1-score   support\n\n      setosa       1.00      1.00      1.00        10\n  versicolor       1.00      1.00      1.00         9\n   virginica       1.00      1.00      1.00        11\n\n    accuracy                           1.00        30`,
        solution: `    def print_report(self):
        print("=" * 60)
        print("MODEL EVALUATION REPORT")
        print("=" * 60)
        print(f"  Accuracy:   {self.results['accuracy']:.4f}")
        print(f"  Precision:  {self.results['precision']:.4f}")
        print(f"  Recall:     {self.results['recall']:.4f}")
        print(f"  F1 Score:   {self.results['f1']:.4f}")
        if "auc" in self.results:
            print(f"  AUC:        {self.results['auc']:.4f}")
        print("-" * 60)
        print("Confusion Matrix:")
        print(self.results["confusion_matrix"])
        print("-" * 60)
        print("Per-Class Report:")
        print(self.results["classification_report"])`
      },
      {
        title: 'Step 4: Implement Model Comparison',
        instruction: `WHAT: Add a compare() method that prints a delta table between two ModelScorer instances.\nWHY: Side-by-side comparison is the bread and butter of ML iteration. A delta column makes regressions immediately visible — a negative delta on F1 or AUC is a red flag that should block promotion to production. This pattern is the foundation of automated model validation in CI/CD.\nHOW: Iterate over a fixed list of comparable metrics. Compute the delta (this model minus other). Show a "+" prefix for positive deltas and print all values aligned in columns.`,
        starterCode: `# Add this method to ModelScorer from Step 2

def compare(self, other_scorer, model_a_name="Model A", model_b_name="Model B"):
    """Compare this model's metrics to another scorer's results.

    Prints a side-by-side table showing metric values and deltas.
    Positive delta means this model is better.
    """
    # TODO: Print a formatted comparison table
    # Columns: Metric | model_a_name | model_b_name | Delta
    # Rows: accuracy, precision, recall, f1, auc (if available in both)
    pass

# Test: compare RandomForest vs LogisticRegression
from sklearn.linear_model import LogisticRegression

lr = LogisticRegression(max_iter=200, random_state=42)
lr.fit(X_train, y_train)

scorer_lr = ModelScorer(lr, class_names=["setosa", "versicolor", "virginica"])
scorer_lr.score(X_test, y_test)

scorer.compare(scorer_lr, model_a_name="RandomForest", model_b_name="LogisticRegression")`,
        hints: [
          'metrics = ["accuracy", "precision", "recall", "f1"] + (["auc"] if "auc" in both)',
          'delta = self.results.get(m, 0) - other.results.get(m, 0)',
          'arrow = "+" if delta >= 0 else "" — prepend to the delta string',
          'Use f-string column widths: f"{metric:<15} {a:<15.4f} {b:<15.4f} {arrow}{delta:.4f}"'
        ],
        expectedOutput: `Metric          RandomForest    LogisticRegression Delta\n-------------------------------------------------------\naccuracy        1.0000          1.0000          +0.0000\nprecision       1.0000          1.0000          +0.0000\nrecall          1.0000          1.0000          +0.0000\nf1              1.0000          1.0000          +0.0000\nauc             1.0000          1.0000          +0.0000`,
        solution: `    def compare(self, other_scorer, model_a_name="Model A", model_b_name="Model B"):
        metrics = ["accuracy", "precision", "recall", "f1"]
        if "auc" in self.results and "auc" in other_scorer.results:
            metrics.append("auc")

        print(f"{'Metric':<15} {model_a_name:<15} {model_b_name:<15} {'Delta':<10}")
        print("-" * 55)
        for metric in metrics:
            a = self.results.get(metric, 0)
            b = other_scorer.results.get(metric, 0)
            delta = a - b
            arrow = "+" if delta >= 0 else ""
            print(f"{metric:<15} {a:<15.4f} {b:<15.4f} {arrow}{delta:.4f}")`
      },
      {
        title: 'Step 5: Integrate with MLflow for Automated Metric Logging',
        instruction: `WHAT: Extend ModelScorer to log all computed metrics to an active MLflow run.\nWHY: Manual copy-paste from a printed report into a tracking system is error-prone and does not scale. Programmatic logging creates an immutable, searchable audit trail. Teams can then query MLflow to find the best model across hundreds of experiments without reading logs.\nHOW: Add a log_to_mlflow() method that iterates self.results and calls mlflow.log_metric() for scalar values. Skip non-scalar entries (confusion_matrix is an ndarray, classification_report is a str). Log the confusion matrix as a JSON artifact.`,
        starterCode: `import mlflow
import json

# Add this method to ModelScorer

def log_to_mlflow(self, prefix: str = "test"):
    """Log all scalar metrics to the currently active MLflow run.

    Args:
        prefix: metric name prefix, e.g. "test" produces "test/accuracy"
    """
    # TODO: Iterate self.results
    # TODO: Skip non-scalar values (confusion_matrix is ndarray, classification_report is str)
    # TODO: Log each scalar with mlflow.log_metric(f"{prefix}/{key}", value)
    # TODO: Log confusion matrix as a JSON artifact (mlflow.log_text)
    pass

# Test
mlflow.set_experiment("iris-scoring")
with mlflow.start_run(run_name="rf-scoring"):
    scorer.log_to_mlflow(prefix="test")
    print("Metrics logged to MLflow")
    print(f"Run: {mlflow.active_run().info.run_id}")`,
        hints: [
          'Check type: if isinstance(value, (int, float)): mlflow.log_metric(...)',
          'numpy float64 is an instance of float — no special handling needed',
          'Log artifact: mlflow.log_text(json.dumps(self.results["confusion_matrix"].tolist()), "confusion_matrix.json")',
          'Skip: continue if key in ("confusion_matrix", "classification_report")'
        ],
        expectedOutput: `Metrics logged to MLflow\nRun: <run-id>`,
        solution: `import mlflow
import json
import numpy as np

    def log_to_mlflow(self, prefix: str = "test"):
        skip_keys = {"confusion_matrix", "classification_report"}
        for key, value in self.results.items():
            if key in skip_keys:
                continue
            if isinstance(value, (int, float, np.floating)):
                mlflow.log_metric(f"{prefix}/{key}", float(value))

        if "confusion_matrix" in self.results:
            cm_json = json.dumps(self.results["confusion_matrix"].tolist())
            mlflow.log_text(cm_json, "confusion_matrix.json")

mlflow.set_experiment("iris-scoring")
with mlflow.start_run(run_name="rf-scoring"):
    scorer.log_to_mlflow(prefix="test")
    print("Metrics logged to MLflow")
    print(f"Run: {mlflow.active_run().info.run_id}")`
      }
    ]
  },

  // ============================================================
  // ML-LAB-6: Feature Store Client (from ml-5)
  // ============================================================
  {
    id: 'ml-lab-6',
    roleId: 'ml-engineer',
    level: 'senior',
    title: 'Feature Store Client',
    description: 'Build a lightweight feature store with versioned feature sets, point-in-time correct lookups to prevent data leakage, and training set generation — core infrastructure for reproducible ML.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building the feature store, ensure your ML engineering environment is ready. Click "Go to Dev Setup" below for complete setup instructions. This lab uses only Python standard library modules (sqlite3, json, datetime) so no additional packages are required beyond a Python 3.12+ installation.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to verify Python 3.12+',
          'Test: `python -c "import sqlite3; print(sqlite3.sqlite_version)"` to verify SQLite is available'
        ],
        expectedOutput: `Python 3.12.x\n3.x.x (SQLite version)`,
        solution: null
      },
      {
        title: 'Step 2: Design the Feature Store Schema',
        instruction: `WHAT: Initialize a SQLite-backed feature store with tables for feature set metadata and feature values.\nWHY: A feature store decouples feature engineering from model training. By persisting features independently of training code, you can reuse the same features across multiple models and experiments without re-running expensive pipelines. The schema must support versioning and point-in-time lookups — the two properties that prevent training/serving skew and data leakage.\nHOW: Create two tables: feature_sets (metadata: name, version, schema, description) and feature_values (actual data: entity_id, features JSON, event_time). The (feature_set_name, entity_id, event_time) index is critical for efficient point-in-time queries.`,
        starterCode: `import sqlite3
import json
from datetime import datetime, timezone

class FeatureStore:
    """A minimal feature store for storing and retrieving ML features."""

    def __init__(self, db_path: str = ":memory:"):
        self.conn = sqlite3.connect(db_path)
        self._init_tables()

    def _init_tables(self):
        """Create the feature store schema.

        Tables needed:
        1. feature_sets: name, version (auto-incremented per name), schema_json,
                         description, created_at
           - UNIQUE constraint on (name, version)
        2. feature_values: feature_set_name, entity_id, features_json,
                           event_time (when the feature was valid),
                           ingested_at (when it was written to the store)
           - INDEX on (feature_set_name, entity_id, event_time) for fast lookups
        """
        # TODO: Write and execute the CREATE TABLE and CREATE INDEX statements
        # Use conn.executescript() for multiple statements
        pass

# Test: create store and verify tables exist
store = FeatureStore()
tables = store.conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
print(f"Tables created: {[t[0] for t in tables]}")`,
        hints: [
          'Use conn.executescript("""CREATE TABLE IF NOT EXISTS ...; CREATE TABLE IF NOT EXISTS ...;""")',
          'feature_sets: id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, version INTEGER, schema_json TEXT, description TEXT, created_at TEXT, UNIQUE(name, version)',
          'feature_values: id INTEGER PRIMARY KEY AUTOINCREMENT, feature_set_name TEXT, entity_id TEXT, features_json TEXT, event_time TEXT, ingested_at TEXT',
          'Index: CREATE INDEX IF NOT EXISTS idx_fv_lookup ON feature_values (feature_set_name, entity_id, event_time)'
        ],
        expectedOutput: `Tables created: ['feature_sets', 'feature_values']`,
        solution: `import sqlite3
import json
from datetime import datetime, timezone

class FeatureStore:
    def __init__(self, db_path: str = ":memory:"):
        self.conn = sqlite3.connect(db_path)
        self._init_tables()

    def _init_tables(self):
        self.conn.executescript("""
            CREATE TABLE IF NOT EXISTS feature_sets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                version INTEGER NOT NULL,
                schema_json TEXT NOT NULL,
                description TEXT,
                created_at TEXT NOT NULL,
                UNIQUE(name, version)
            );

            CREATE TABLE IF NOT EXISTS feature_values (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                feature_set_name TEXT NOT NULL,
                entity_id TEXT NOT NULL,
                features_json TEXT NOT NULL,
                event_time TEXT NOT NULL,
                ingested_at TEXT NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_fv_lookup
                ON feature_values (feature_set_name, entity_id, event_time);
        """)
        self.conn.commit()

store = FeatureStore()
tables = store.conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
print(f"Tables created: {[t[0] for t in tables]}")`
      },
      {
        title: 'Step 3: Implement Feature Set Registration and Ingestion',
        instruction: `WHAT: Build register_feature_set() to record feature schema metadata, and ingest() to write feature vectors for specific entities at specific timestamps.\nWHY: Schema registration creates a contract: any feature vector written to this feature set must conform to the declared types. Auto-incrementing versions means schema changes are non-destructive — old training data remains accessible under the previous version, enabling you to retrain historical models.\nHOW: For registration, query the current max version for the name and increment by 1. For ingestion, serialize the features dict to JSON and store with event_time as an ISO 8601 string. event_time is when the feature was valid in the real world — not when it was written. This distinction is what makes point-in-time lookups meaningful.`,
        starterCode: `# Add these methods to FeatureStore from Step 2

def register_feature_set(self, name: str, schema: dict, description: str = "") -> int:
    """Register a new version of a feature set.

    Auto-increments version number for each name.
    Returns: the new version number
    """
    # TODO: Query max version for this name (treat NULL as 0)
    # TODO: Insert new record with version = max + 1
    # TODO: Print "Registered {name} v{version}" and return version
    pass

def ingest(self, feature_set_name: str, entity_id: str, features: dict, event_time: str):
    """Ingest a feature vector for a given entity at a specific point in time.

    event_time: ISO 8601 string, e.g. "2025-01-15" — when the feature was valid
    """
    # TODO: Insert a row into feature_values
    # TODO: Serialize features as JSON; set ingested_at to datetime.now(timezone.utc).isoformat()
    pass

# Test
store = FeatureStore()
v1 = store.register_feature_set(
    "user_features",
    schema={"avg_purchase": "float", "visit_count": "int", "churn_risk": "float"},
    description="Aggregated user behavior features"
)
v2 = store.register_feature_set(
    "user_features",
    schema={"avg_purchase": "float", "visit_count": "int", "churn_risk": "float", "ltv": "float"},
    description="User features with lifetime value"
)
store.ingest("user_features", "user_001", {"avg_purchase": 45.5, "visit_count": 12, "churn_risk": 0.2}, "2025-01-15")
store.ingest("user_features", "user_001", {"avg_purchase": 52.0, "visit_count": 18, "churn_risk": 0.1}, "2025-03-01")
print(f"Versions registered: v{v1}, v{v2}")`,
        hints: [
          'Max version query: self.conn.execute("SELECT MAX(version) FROM feature_sets WHERE name = ?", (name,)).fetchone()[0]',
          'Handle None: version = (row[0] or 0) + 1',
          'Insert: self.conn.execute("INSERT INTO feature_sets (name, version, schema_json, description, created_at) VALUES (?, ?, ?, ?, ?)", (name, version, json.dumps(schema), description, datetime.now(timezone.utc).isoformat()))',
          'Always call self.conn.commit() after writes'
        ],
        expectedOutput: `Registered user_features v1\nRegistered user_features v2\nVersions registered: v1, v2`,
        solution: `    def register_feature_set(self, name: str, schema: dict, description: str = "") -> int:
        row = self.conn.execute(
            "SELECT MAX(version) FROM feature_sets WHERE name = ?", (name,)
        ).fetchone()
        version = (row[0] or 0) + 1

        self.conn.execute(
            "INSERT INTO feature_sets (name, version, schema_json, description, created_at) VALUES (?, ?, ?, ?, ?)",
            (name, version, json.dumps(schema), description, datetime.now(timezone.utc).isoformat())
        )
        self.conn.commit()
        print(f"Registered {name} v{version}")
        return version

    def ingest(self, feature_set_name: str, entity_id: str, features: dict, event_time: str):
        self.conn.execute(
            "INSERT INTO feature_values (feature_set_name, entity_id, features_json, event_time, ingested_at) VALUES (?, ?, ?, ?, ?)",
            (feature_set_name, entity_id, json.dumps(features), event_time, datetime.now(timezone.utc).isoformat())
        )
        self.conn.commit()`
      },
      {
        title: 'Step 4: Implement Point-in-Time Feature Retrieval',
        instruction: `WHAT: Build get_features() with an optional as_of timestamp for point-in-time correct lookups.\nWHY: Data leakage is one of the most common and costly mistakes in ML. If your training features include data that would not have been available at prediction time, your model will appear to perform far better in training than in production. Point-in-time lookups enforce a strict temporal boundary: features used to train a model at timestamp T only include data that existed before T.\nHOW: If as_of is provided, add a WHERE event_time <= as_of clause and ORDER BY event_time DESC LIMIT 1. This returns the most recent feature value that existed as of the query time. Without as_of, return the globally latest value.`,
        starterCode: `from typing import Optional

# Add this method to FeatureStore

def get_features(self, feature_set_name: str, entity_id: str, as_of: Optional[str] = None) -> dict:
    """Retrieve the latest features for an entity, optionally as of a point in time.

    Args:
        feature_set_name: which feature set to query
        entity_id: the entity to retrieve features for
        as_of: ISO 8601 timestamp; if provided, only returns features from before this time
               This prevents data leakage in training!
    Returns:
        dict of feature values, or {} if no features found
    """
    # TODO: Build the SQL query (with or without as_of constraint)
    # TODO: Deserialize features_json and return as dict
    pass

# Test: demonstrate point-in-time correctness
# At "2025-02-01", user_001 should have avg_purchase=45.5 (Jan data)
# Latest should have avg_purchase=52.0 (Mar data)
features_jan = store.get_features("user_features", "user_001", as_of="2025-02-01")
features_latest = store.get_features("user_features", "user_001")
features_missing = store.get_features("user_features", "user_999")

print(f"Features as of Feb 2025: {features_jan}")
print(f"Latest features: {features_latest}")
print(f"Unknown entity: {features_missing}")`,
        hints: [
          'With as_of: "SELECT features_json FROM feature_values WHERE feature_set_name = ? AND entity_id = ? AND event_time <= ? ORDER BY event_time DESC LIMIT 1"',
          'Without as_of: "SELECT features_json FROM feature_values WHERE feature_set_name = ? AND entity_id = ? ORDER BY event_time DESC LIMIT 1"',
          'row = self.conn.execute(query, params).fetchone()',
          'return json.loads(row[0]) if row else {}'
        ],
        expectedOutput: `Features as of Feb 2025: {'avg_purchase': 45.5, 'visit_count': 12, 'churn_risk': 0.2}\nLatest features: {'avg_purchase': 52.0, 'visit_count': 18, 'churn_risk': 0.1}\nUnknown entity: {}`,
        solution: `from typing import Optional

    def get_features(self, feature_set_name: str, entity_id: str, as_of: Optional[str] = None) -> dict:
        if as_of:
            row = self.conn.execute(
                "SELECT features_json FROM feature_values WHERE feature_set_name = ? AND entity_id = ? AND event_time <= ? ORDER BY event_time DESC LIMIT 1",
                (feature_set_name, entity_id, as_of)
            ).fetchone()
        else:
            row = self.conn.execute(
                "SELECT features_json FROM feature_values WHERE feature_set_name = ? AND entity_id = ? ORDER BY event_time DESC LIMIT 1",
                (feature_set_name, entity_id)
            ).fetchone()
        return json.loads(row[0]) if row else {}`
      },
      {
        title: 'Step 5: Build Training Set Generation and Feature Lineage',
        instruction: `WHAT: Implement get_training_set() for bulk point-in-time retrieval, and get_feature_lineage() to return the full history of feature values for an entity.\nWHY: Training set generation is the end-to-end workflow that combines everything. By generating all features as_of the label's timestamp, you ensure every training example was valid at the moment the label was captured. Feature lineage is the audit trail — it lets you explain why a model made a prediction and debug data quality issues by tracing feature values back through time.\nHOW: get_training_set() loops over entity IDs, calls get_features() with as_of, and builds a list of dicts. get_feature_lineage() returns all rows for an entity ordered by event_time, giving you the full history.`,
        starterCode: `# Add these methods to FeatureStore

def get_training_set(self, feature_set_name: str, entity_ids: list[str], as_of: str) -> list[dict]:
    """Build a point-in-time correct training dataset.

    For each entity, retrieves the features that existed as of the given timestamp.
    Entities with no features at that time are excluded.

    Returns: list of dicts, each with 'entity_id' plus feature key-value pairs
    """
    # TODO: Iterate entity_ids, call get_features() with as_of for each
    # TODO: Include entity_id in each row dict using dict unpacking
    # TODO: Skip entities with no features at that time
    # TODO: Print "Built training set: N rows as of {as_of}"
    pass

def get_feature_lineage(self, feature_set_name: str, entity_id: str) -> list[dict]:
    """Return the full history of feature values for an entity, ordered by event_time.

    Returns: list of dicts with 'event_time', 'ingested_at', and feature values
    """
    # TODO: Query all rows for this entity, ordered by event_time ASC
    # TODO: Return list of dicts including event_time and ingested_at metadata
    pass

# Test
entity_ids = ["user_001", "user_002", "user_999"]

training_set = store.get_training_set("user_features", entity_ids, as_of="2025-02-01")
print(f"Training rows: {training_set}")

lineage = store.get_feature_lineage("user_features", "user_001")
print(f"Lineage entries: {len(lineage)}")
for entry in lineage:
    print(f"  [{entry['event_time']}] {entry}")`,
        hints: [
          'get_training_set: rows = []; for eid in entity_ids: f = self.get_features(..., as_of=as_of); if f: rows.append({"entity_id": eid, **f})',
          'get_feature_lineage query: "SELECT features_json, event_time, ingested_at FROM feature_values WHERE feature_set_name = ? AND entity_id = ? ORDER BY event_time ASC"',
          'Parse each row: {"event_time": row[1], "ingested_at": row[2], **json.loads(row[0])}',
          'Only append rows where the features dict is non-empty'
        ],
        expectedOutput: `Built training set: 1 rows as of 2025-02-01\nTraining rows: [{'entity_id': 'user_001', 'avg_purchase': 45.5, 'visit_count': 12, 'churn_risk': 0.2}]\nLineage entries: 2\n  [2025-01-15] {'event_time': '2025-01-15', 'ingested_at': '...', 'avg_purchase': 45.5, 'visit_count': 12, 'churn_risk': 0.2}\n  [2025-03-01] {'event_time': '2025-03-01', 'ingested_at': '...', 'avg_purchase': 52.0, 'visit_count': 18, 'churn_risk': 0.1}`,
        solution: `    def get_training_set(self, feature_set_name: str, entity_ids: list[str], as_of: str) -> list[dict]:
        rows = []
        for eid in entity_ids:
            features = self.get_features(feature_set_name, eid, as_of=as_of)
            if features:
                rows.append({"entity_id": eid, **features})
        print(f"Built training set: {len(rows)} rows as of {as_of}")
        return rows

    def get_feature_lineage(self, feature_set_name: str, entity_id: str) -> list[dict]:
        rows = self.conn.execute(
            "SELECT features_json, event_time, ingested_at FROM feature_values WHERE feature_set_name = ? AND entity_id = ? ORDER BY event_time ASC",
            (feature_set_name, entity_id)
        ).fetchall()
        return [
            {"event_time": row[1], "ingested_at": row[2], **json.loads(row[0])}
            for row in rows
        ]`
      }
    ]
  }
];
