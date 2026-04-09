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
    id: 'question',
    position: { x: 0, y: 0 },
    data: {
      label: '🎯 Business Question',
      detail: 'Every analysis starts with a clear question. What decision will this analysis inform? A vague question produces a vague analysis.',
      tips: ['Frame as a specific, answerable question', 'Identify who needs the answer and what action they will take', 'Define success criteria upfront'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'collect',
    position: { x: 200, y: 0 },
    data: {
      label: '📥 Data Collection',
      detail: 'Gather data from databases (SQL), APIs, files (CSV, Excel, JSON), or web scraping. Understand what each column represents and how it was generated.',
      code: 'import pandas as pd\n\n# From CSV\ndf = pd.read_csv("data.csv")\n\n# From SQL\ndf = pd.read_sql(\n  "SELECT * FROM orders\n   WHERE date > \'2024-01-01\'",\n  connection\n)',
      tips: ['Document the data source, query, and collection date', 'Check row counts against expectations', 'Understand the data generation process to avoid survivorship bias'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'clean',
    position: { x: 400, y: 0 },
    data: {
      label: '🧹 Data Cleaning',
      detail: 'Handle missing values, remove duplicates, correct data types, fix inconsistencies, and deal with outliers. This step typically consumes 60-80% of analysis time.',
      code: '# Check missing values\ndf.isnull().sum()\n\n# Drop duplicates\ndf = df.drop_duplicates()\n\n# Fix types\ndf["date"] = pd.to_datetime(df["date"])\ndf["price"] = pd.to_numeric(\n  df["price"], errors="coerce"\n)',
      tips: ['Missing data is not random — investigate WHY values are missing', 'Document every cleaning decision and its rationale', 'Outliers may be errors or genuine rare events — investigate before removing'],
    },
    style: accentStyle,
  },
  {
    id: 'eda',
    position: { x: 600, y: 0 },
    data: {
      label: '🔍 Exploratory Analysis',
      detail: 'Explore distributions, relationships, and patterns using summary statistics and visualisations. EDA generates hypotheses and reveals data quality issues.',
      code: 'import matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Distribution\ndf["revenue"].hist(bins=50)\n\n# Correlation\nsns.heatmap(\n  df.corr(numeric_only=True),\n  annot=True, cmap="coolwarm"\n)\n\n# Grouped comparison\ndf.groupby("segment")["revenue"]\\\n  .describe()',
      tips: ['Always visualise before modelling — patterns jump out of plots', 'Check correlations between features and with the target', 'Use .describe(), .value_counts(), and .info() as first steps'],
    },
    style: primaryStyle,
  },
  {
    id: 'model',
    position: { x: 200, y: 160 },
    data: {
      label: '🧮 Modelling',
      detail: 'Apply statistical or machine learning models to answer the question. May be as simple as a t-test or as complex as a gradient-boosted classifier.',
      code: 'from sklearn.linear_model import \\\n  LinearRegression\nfrom sklearn.model_selection import \\\n  cross_val_score\n\nmodel = LinearRegression()\nscores = cross_val_score(\n  model, X, y, cv=5,\n  scoring="r2"\n)\nprint(f"R² = {scores.mean():.3f}")',
      tips: ['Simple models you can explain beat complex models you cannot', 'Validate with held-out data or cross-validation', 'Statistical significance is not the same as practical significance'],
    },
    style: primaryStyle,
  },
  {
    id: 'visualise',
    position: { x: 400, y: 160 },
    data: {
      label: '📊 Visualisation',
      detail: 'Create clear, publication-quality charts that communicate findings. Choose chart types that match the data and the message.',
      code: 'fig, ax = plt.subplots(figsize=(10, 6))\nsns.barplot(\n  data=df, x="category",\n  y="revenue", hue="segment",\n  ax=ax\n)\nax.set_title("Revenue by Category")\nax.set_ylabel("Revenue ($)")\nplt.tight_layout()\nplt.savefig("report_fig.png", dpi=150)',
      tips: ['Label axes, add titles, use colour intentionally', 'Bar charts for comparison, line charts for trends, scatter for relationships', 'Avoid 3D charts, pie charts with many slices, and dual axes'],
    },
    style: amberStyle,
  },
  {
    id: 'communicate',
    position: { x: 600, y: 160 },
    data: {
      label: '📝 Communication',
      detail: 'Present findings to stakeholders in a format they can act on. Lead with the answer and recommendation, then show supporting evidence.',
      tips: ['Structure: answer → evidence → methodology → limitations', 'Use notebooks for technical audiences, slide decks for executives', 'State assumptions and limitations explicitly', 'Include next steps and recommendations'],
    },
    style: greenStyle,
  },
  {
    id: 'iterate',
    position: { x: 400, y: 300 },
    data: {
      label: '🔄 Iterate',
      detail: 'Analysis is rarely a single pass. New findings raise new questions, and stakeholder feedback refines the focus. The cycle continues until the decision is made.',
      tips: ['Keep analysis reproducible with scripts, not manual steps', 'Version control your notebooks and data processing code', 'Document decisions and dead ends for future reference'],
    },
    style: nodeDefaults.style,
  },
]

const edgeDefaults = {
  style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-primary)' },
  animated: true,
}

const edges = [
  { id: 'e1', source: 'question', target: 'collect', label: 'gather', ...edgeDefaults },
  { id: 'e2', source: 'collect', target: 'clean', label: 'inspect', ...edgeDefaults },
  { id: 'e3', source: 'clean', target: 'eda', label: 'explore', ...edgeDefaults },
  { id: 'e4', source: 'eda', target: 'model', label: 'hypothesise', ...edgeDefaults },
  { id: 'e5', source: 'model', target: 'visualise', label: 'results', ...edgeDefaults },
  { id: 'e6', source: 'visualise', target: 'communicate', label: 'present', ...edgeDefaults },
  { id: 'e7', source: 'communicate', target: 'iterate', label: 'feedback', ...edgeDefaults },
  { id: 'e8', source: 'iterate', target: 'question', label: 'refine question', ...edgeDefaults, animated: false, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
]

export default {
  title: 'Data Analysis Pipeline — From Question to Insight',
  nodes,
  edges,
}
