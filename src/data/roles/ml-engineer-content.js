export const content = {
  overview: `# ML Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

ML Engineers build, train, evaluate, and deploy machine learning models. The role covers data preparation, feature engineering, model selection, training, evaluation, MLOps, and production monitoring.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| ML Fundamentals | [Machine Learning Explained Simply (12 min)](https://www.youtube.com/watch?v=Au1OxVSyGas) | Video |
| ML Concepts Overview | [All ML Concepts Explained in 22 min](https://www.youtube.com/watch?v=Fa_V9fP2tpU) | Video |
| AI vs ML vs Deep Learning | [AI, ML, Deep Learning and GenAI Explained](https://www.youtube.com/watch?v=qYNweeDHiyU) | Video |
| Python for ML | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python for ML | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| NumPy | [NumPy – Official Tutorials](https://numpy.org/learn/) | Interactive |
| Data Manipulation | [Kaggle Learn – Pandas](https://www.kaggle.com/learn/pandas) | Interactive |
| Data Visualization | [Kaggle Learn – Data Visualization](https://www.kaggle.com/learn/data-visualization) | Interactive |
| Interactive ML Practice | [Kaggle Learn – Intro to ML](https://www.kaggle.com/learn/intro-to-machine-learning) | Interactive |
| scikit-learn | [scikit-learn – Getting Started](https://scikit-learn.org/stable/getting_started.html) | Docs |
| Algorithms Visual | [Essential ML Concepts Animated](https://www.youtube.com/watch?v=PcbuKRNtCUc) | Video |

### After completing Beginner you should be able to:

- Explain supervised vs unsupervised learning and give examples of each
- Describe the ML training pipeline (data, features, model, evaluation)
- Write Python scripts using NumPy and Pandas for data manipulation
- Train and evaluate a basic ML model using scikit-learn
- Create basic data visualisations to explore and communicate patterns

For deep explanations of each concept, see the [Beginner Concept Reference](ML-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| All ML Algorithms | [All ML Algorithms Explained in 17 min](https://www.youtube.com/watch?v=E0Hmnixke2g) | Video |
| Feature Engineering | [Kaggle Learn – Feature Engineering](https://www.kaggle.com/learn/feature-engineering) | Interactive |
| Intermediate ML Practice | [Kaggle Learn – Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) | Interactive |
| Neural Networks / Deep Learning | [PyTorch – Official Tutorials](https://pytorch.org/tutorials/) | Docs |
| Experiment Tracking | [MLflow – Getting Started](https://mlflow.org/docs/latest/getting-started/index.html) | Docs |
| MLOps | [End-to-end MLOps with Azure ML – Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/build-first-machine-operations-workflow/) | Interactive |
| Algorithms and Data Structures | [Algorithms and Data Structures Pt.1 – Pluralsight](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) | Course |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |

### After completing Mid you should be able to:

- Compare and select appropriate ML algorithms for structured data problems
- Engineer features from raw data to improve model performance
- Train and evaluate neural networks using PyTorch
- Track experiments systematically using MLflow or Azure ML
- Deploy a model as a containerised API endpoint using MLOps practices

For deep explanations of each concept, see the [Mid Concept Reference](ML-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| ML Foundations for AI Engineers | [ML Foundations for AI Engineers (34 min)](https://www.youtube.com/watch?v=BUTjcAjfMgY) | Video |
| Advanced MLOps | [Microsoft Learn – MLOps maturity model](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/mlops-maturity-model) | Docs |
| Model Monitoring | [Microsoft Learn – Monitor models with Azure ML](https://learn.microsoft.com/en-us/azure/machine-learning/concept-model-monitoring) | Docs |
| Responsible AI | [Fairlearn – Fairness in ML](https://fairlearn.org/) | Docs |
| Dynamic Programming | [Dynamic Programming – Full Course](https://www.youtube.com/watch?v=66hDgWottdA) | Video |
| Algorithms and Data Structures | [Part 1](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) / [Part 2](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-two/course-overview) | Course |
| AI Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Enterprise GenAI Strategy | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |

### After completing Senior you should be able to:

- Design and operate an end-to-end MLOps pipeline with experiment tracking, model registry, and automated deployment
- Detect and respond to data drift and model degradation in production
- Evaluate ML models for fairness and bias across protected groups
- Recognise algorithm complexity issues and propose solutions with better Big O profiles
- Apply AI governance and policy requirements to ML projects

For deep explanations of each concept, see the [Senior Concept Reference](ML-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
  beginner: `# ML Engineer – Beginner Concept Reference


This document provides in-depth explanations of the core concepts covered at the Beginner level of the ML Engineer learning path. Each section describes what a concept is, why it matters in practice, what you need to understand about it, and the mistakes engineers most commonly make when encountering it for the first time.

---

## Machine Learning – What It Is and How It Differs from Traditional Programming

Machine learning (ML) is a branch of computer science where a system learns patterns from data rather than following a set of hand-written rules. In traditional programming, a developer explicitly encodes every decision the program can make: if the input looks like X, return Y. In ML, the developer instead provides examples of inputs and desired outputs, and an algorithm finds the mapping between them automatically.

This distinction matters because many real-world problems are too complex or too variable to encode as explicit rules. Recognising whether an image contains a cat, predicting whether a loan will default, or deciding what product to recommend next would each require thousands of brittle, hand-crafted rules in a traditional approach. An ML model can learn those patterns directly from data.

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

Core operations include: filtering rows with boolean conditions, selecting columns, handling missing values with \`fillna\` or \`dropna\`, grouping and aggregating with \`groupby\`, joining multiple DataFrames with \`merge\`, reshaping with \`pivot_table\`, and applying custom functions with \`apply\`. Row selection by label uses \`.loc\`; by integer position uses \`.iloc\` — confusing these two is a frequent source of bugs. These operations compose into the data preparation workflows that precede model training.

**Why it matters:** The majority of time in any ML project is spent preparing data. Fluency in Pandas directly translates to speed and correctness in data work.

**Key things to understand:**
- A DataFrame is a table; a Series is a single column. Both share the same index-based alignment system.
- \`.loc\` selects by label; \`.iloc\` selects by integer position — they are not interchangeable.
- Operations that look like they modify a DataFrame in place often do not — always assign results back or use \`inplace=True\` explicitly.
- Pandas is not designed for very large datasets (beyond memory). At that scale, tools like Polars, Dask, or Spark are more appropriate.

**Common pitfalls:**
- The \`SettingWithCopyWarning\`: modifying a slice of a DataFrame instead of the original. Use \`.loc\` for explicit selection.
- Forgetting to reset the index after filtering, causing confusing downstream behaviour.
- Using \`iterrows()\` for row-by-row operations instead of vectorised Pandas methods or \`apply()\`, which is dramatically slower.

---

## Model Evaluation – Accuracy, Precision, Recall, F1, RMSE and Confusion Matrices

Choosing the right evaluation metric is as important as choosing the right model. A single number can conceal critical information about how a model behaves on different subsets of the data.

**Classification metrics.** Accuracy is the fraction of predictions that are correct. It is intuitive but misleading on imbalanced datasets. A model that always predicts "not fraud" on a dataset where 99% of transactions are legitimate achieves 99% accuracy while being completely useless.

A confusion matrix breaks down predictions into four categories for a binary classifier: true positives (TP — correctly predicted positive), true negatives (TN — correctly predicted negative), false positives (FP — predicted positive, actually negative), and false negatives (FN — predicted negative, actually positive). All other classification metrics derive from these four numbers.

Precision is the fraction of positive predictions that are actually positive: **Precision = TP / (TP + FP)**. High precision means: when the model says yes, it is usually right. Recall (also called sensitivity) is the fraction of actual positives the model correctly identifies: **Recall = TP / (TP + FN)**. High recall means: the model rarely misses a real positive. There is a trade-off — increasing the threshold for a positive prediction raises precision and lowers recall, and vice versa.

The F1 score is the harmonic mean of precision and recall: **F1 = 2 × (Precision × Recall) / (Precision + Recall)**. It is useful when both matter and you want a single number that balances them. The harmonic mean penalises extreme imbalances between precision and recall more than a simple average would.

**Regression metrics.** When the target is a continuous value rather than a category, accuracy and F1 do not apply. Root Mean Squared Error (RMSE) is the most common regression metric: it is the square root of the average squared difference between predicted and actual values. Squaring the errors gives larger errors disproportionately more weight, making RMSE sensitive to outliers. Mean Absolute Error (MAE) averages the absolute differences and is more robust to outliers.

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

**Why it matters:** These distinctions come up constantly in stakeholder conversations, architecture decisions, and when reading research. Conflating them leads to misapplied mental models — for example, assuming that because a product uses "AI", it must involve neural networks, or assuming all GenAI limitations apply to traditional ML models.

**Key things to understand:**
- In practice, modern generative AI is built on deep learning, which is a branch of machine learning, which is a branch of AI. The boundaries are not absolute — some generative techniques do not rely on deep learning — but the general nesting holds.
- "AI" in a product description rarely means anything more specific than "it uses some form of learned model."
- Deep learning requires significantly more data and compute than classical ML methods, but it tends to outperform them when both are available.

**Common pitfalls:**
- Using "AI" and "ML" interchangeably in technical conversations, which obscures what is actually being built.
- Assuming all AI problems require deep learning — many are solved adequately by simpler models.
- Conflating generative AI with the broader field of ML, leading to misapplied mental models about how non-generative models work.
`,
  mid: `# ML Engineer – Mid Concept Reference


This document provides in-depth explanations of the core concepts covered at the Mid level of the ML Engineer learning path. It assumes familiarity with the Beginner concepts and focuses on algorithm selection, feature engineering, neural networks, experiment tracking, and MLOps.

---

## ML Algorithms – Regression and Classification Families

Classical ML algorithms remain the workhorses of structured data problems. Understanding the algorithm families and when to apply them is a key Mid-level skill.

Regression algorithms predict a continuous numeric output. Linear regression fits a straight-line relationship between input features and the target. Regularised variants — Ridge (L2 penalty) and Lasso (L1 penalty) — reduce overfitting and, in the case of Lasso, can drive less important feature coefficients to zero, performing implicit feature selection. When the decision boundary between classes is linear, logistic regression is a natural fit for binary classification despite its name.

Classification algorithms predict a discrete category. Logistic regression, support vector machines (SVMs), k-nearest neighbours (KNN), and naive Bayes all belong to this family. SVMs are effective in high-dimensional spaces and work well when classes are clearly separable. KNN is non-parametric and requires no training but scales poorly — prediction cost grows with dataset size because it searches for the k closest training points at inference time.

A decision tree partitions the feature space by asking a series of yes/no questions at each node. At each split, it selects the feature and threshold that best separates the classes (using metrics such as Gini impurity or information gain). Decision trees are interpretable — you can trace exactly why a prediction was made — but they overfit easily.

Random forests address overfitting by training many decision trees on different random subsets of the training data and features, then aggregating their predictions by majority vote or averaging. The randomness decorrelates the individual trees, so their errors do not compound. This technique is called bagging (bootstrap aggregating). Random forests are robust, require little hyperparameter tuning, and handle missing data relatively well.

Gradient boosting also combines many weak learners (typically shallow trees), but sequentially rather than in parallel. Each new tree is trained to correct the residual errors of the ensemble so far. The result is a highly accurate model that can outperform random forests on many tabular datasets, at the cost of more hyperparameter sensitivity and longer training time. XGBoost, LightGBM, and CatBoost are the most widely used implementations.

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
`,
  senior: `# ML Engineer – Senior Concept Reference


This document provides in-depth explanations of the core concepts covered at the Senior level of the ML Engineer learning path. It assumes fluency with the Beginner and Mid concepts and focuses on advanced MLOps, model monitoring, responsible AI, algorithms, and enterprise governance.

---

## Algorithms and Dynamic Programming for ML Engineers

A solid foundation in algorithms and data structures makes ML engineers more effective at every level of the stack — from understanding how embedding search works internally, to writing performant data processing code, to debugging why a model training loop is slow.

Dynamic programming (DP) is a technique for solving problems by breaking them into overlapping subproblems, solving each subproblem once, and storing the result. It is applicable when a problem has optimal substructure (the optimal solution to the whole problem contains optimal solutions to its subproblems) and overlapping subproblems (the same subproblems recur). Classic examples include the longest common subsequence, the knapsack problem, and the edit distance between two strings — the last of which appears directly in NLP evaluation (Levenshtein distance).

For ML engineers, algorithmic thinking is relevant in: designing efficient data pipelines (understanding time and space complexity prevents accidentally writing O(n²) preprocessing steps), implementing custom loss functions or evaluation metrics, understanding the internals of approximate nearest-neighbour algorithms used in vector search (HNSW, IVF), and reasoning about the computational cost of transformer attention (which scales quadratically with sequence length).

Graph algorithms appear in agent orchestration (LangGraph is literally a directed graph traversal problem) and in knowledge graph construction.

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

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems, particularly those used in insurance underwriting, claims assessment, and pricing, require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from ML engineers building models to business users employing AI-assisted tools in their daily work.

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

## Language Deep Dives

- [Python Deep Dive](/language/python) — The primary language for ML development
- [SQL Deep Dive](/language/sql) — Feature extraction and data preparation
`,
}
