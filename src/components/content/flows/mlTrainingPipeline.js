import { MarkerType } from '@xyflow/react'

const nodeDefaults = {
  style: {
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 13,
    fontFamily: 'Inter, system-ui, sans-serif',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface-2)',
    color: 'var(--color-text)',
    cursor: 'pointer',
  },
}

const primaryStyle = {
  ...nodeDefaults.style,
  background: '#6366f1',
  color: '#fff',
  border: '1px solid #4f46e5',
}

const accentStyle = {
  ...nodeDefaults.style,
  background: '#0ea5e9',
  color: '#fff',
  border: '1px solid #0284c7',
}

const greenStyle = {
  ...nodeDefaults.style,
  background: '#10b981',
  color: '#fff',
  border: '1px solid #059669',
}

const amberStyle = {
  ...nodeDefaults.style,
  background: '#f59e0b',
  color: '#fff',
  border: '1px solid #d97706',
}

const nodes = [
  {
    id: 'data',
    position: { x: 0, y: 0 },
    data: {
      label: '📦 Raw Data',
      detail: 'Raw data from databases, APIs, files, or streaming sources. Data quality determines model quality — garbage in, garbage out.',
      tips: ['Audit data for bias and representativeness', 'Track data provenance and lineage', 'Ensure legal compliance (GDPR, licensing)'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'preprocess',
    position: { x: 200, y: 0 },
    data: {
      label: '🧹 Preprocessing',
      detail: 'Clean data by handling missing values (imputation or removal), removing duplicates, correcting inconsistencies, and normalising formats. Split into train/validation/test sets.',
      code: 'from sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = \\\n  train_test_split(X, y, test_size=0.2,\n                   random_state=42,\n                   stratify=y)',
      tips: ['Never use test data for any decisions during training', 'Stratify splits for imbalanced datasets', 'Handle missing values before splitting to avoid data leakage'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'features',
    position: { x: 400, y: 0 },
    data: {
      label: '🔧 Feature Engineering',
      detail: 'Transform raw data into informative features the model can learn from. Feature quality has a larger impact on performance than model choice.',
      code: '# Scaling\nfrom sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X_train)\n\n# Encoding\nfrom sklearn.preprocessing import OneHotEncoder\nenc = OneHotEncoder(sparse_output=False)\nX_cat = enc.fit_transform(X_train[cat_cols])',
      tips: ['Extract temporal features: hour, day of week, is_holiday', 'Scale numerical features (StandardScaler, MinMaxScaler)', 'One-hot encode categoricals; use target encoding for high cardinality'],
    },
    style: accentStyle,
  },
  {
    id: 'select',
    position: { x: 600, y: 0 },
    data: {
      label: '🎯 Model Selection',
      detail: 'Choose an algorithm class based on the problem type (classification, regression, clustering) and data characteristics. Start simple, increase complexity only if needed.',
      tips: ['Classification: logistic regression → random forest → gradient boosting → neural nets', 'Regression: linear → ridge/lasso → XGBoost → deep learning', 'Start with a simple baseline to benchmark against'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'train',
    position: { x: 200, y: 160 },
    data: {
      label: '🏋️ Training',
      detail: 'The algorithm processes training data iteratively (epochs), adjusting internal weights to minimise a loss function. Each pass through a subset of data is a batch.',
      code: 'model = xgb.XGBClassifier(\n  n_estimators=500,\n  learning_rate=0.05,\n  max_depth=6,\n  early_stopping_rounds=20\n)\nmodel.fit(\n  X_train, y_train,\n  eval_set=[(X_val, y_val)],\n  verbose=50\n)',
      tips: ['Use early stopping to prevent overfitting', 'Monitor training AND validation loss — divergence signals overfitting', 'Log all hyperparameters for reproducibility'],
    },
    style: primaryStyle,
  },
  {
    id: 'evaluate',
    position: { x: 400, y: 160 },
    data: {
      label: '📊 Evaluation',
      detail: 'Measure model performance on held-out data using metrics appropriate for the problem. Results feed back into earlier stages to guide iteration.',
      code: 'from sklearn.metrics import (\n  classification_report,\n  roc_auc_score\n)\n\ny_pred = model.predict(X_test)\nprint(classification_report(\n  y_test, y_pred\n))\nauc = roc_auc_score(y_test, y_prob)',
      tips: ['Classification: precision, recall, F1, AUC-ROC', 'Regression: MSE, RMSE, MAE, R²', 'Use cross-validation for robust estimates'],
    },
    style: amberStyle,
  },
  {
    id: 'deploy',
    position: { x: 600, y: 160 },
    data: {
      label: '🚀 Deployment',
      detail: 'Serve the trained model in production via an API endpoint, batch pipeline, or embedded system. Package the model with its preprocessing pipeline for consistency.',
      tips: ['Serve via REST API (FastAPI, Flask) or gRPC', 'Version models and track which version is in production', 'Use A/B testing or shadow mode before full rollout'],
    },
    style: greenStyle,
  },
  {
    id: 'monitor',
    position: { x: 400, y: 300 },
    data: {
      label: '📡 Monitoring',
      detail: 'Continuously track model performance, data drift, and prediction distributions in production. Degradation triggers retraining with fresh data.',
      tips: ['Monitor for data drift (input distribution changes)', 'Monitor for concept drift (relationship between input and output changes)', 'Set alerts for performance drops below threshold', 'Log predictions and ground truth for ongoing evaluation'],
    },
    style: primaryStyle,
  },
]

const edgeDefaults = {
  style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-primary)' },
  animated: true,
}

const edges = [
  { id: 'e1', source: 'data', target: 'preprocess', label: 'clean', ...edgeDefaults },
  { id: 'e2', source: 'preprocess', target: 'features', label: 'transform', ...edgeDefaults },
  { id: 'e3', source: 'features', target: 'select', label: 'choose', ...edgeDefaults },
  { id: 'e4', source: 'select', target: 'train', label: 'fit', ...edgeDefaults },
  { id: 'e5', source: 'train', target: 'evaluate', label: 'predict', ...edgeDefaults },
  { id: 'e6', source: 'evaluate', target: 'deploy', label: 'meets threshold', ...edgeDefaults },
  { id: 'e7', source: 'evaluate', target: 'features', label: 'iterate', ...edgeDefaults, animated: false, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
  { id: 'e8', source: 'deploy', target: 'monitor', label: 'track', ...edgeDefaults },
  { id: 'e9', source: 'monitor', target: 'data', label: 'drift detected', ...edgeDefaults, animated: false, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
]

export default {
  title: 'ML Training Pipeline — From Data to Production',
  nodes,
  edges,
}
