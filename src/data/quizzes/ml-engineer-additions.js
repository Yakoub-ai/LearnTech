/**
 * Additional quiz questions for the ML Engineer learning path.
 * These supplement the base questions in quizzes.js.
 */
export const additions = {
  beginner: [
    {
      question: 'Which statement best describes the relationship between AI, ML, and deep learning?',
      options: [
        'They are three completely separate fields with no overlap',
        'AI is the broadest field; ML is a subset of AI; deep learning is a subset of ML',
        'Deep learning is the broadest field that contains ML and AI',
        'ML and deep learning are the same thing'
      ],
      correctIndex: 1,
      explanation: 'AI is the broadest term covering any technique that simulates human intelligence. ML is a subset of AI where systems learn from data rather than following hand-coded rules. Deep learning is a subset of ML that uses multi-layer neural networks. Generative AI sits within deep learning.'
    },
    {
      question: 'A model achieves 99% accuracy on a fraud detection dataset where 99% of transactions are legitimate. What does this most likely indicate?',
      options: [
        'The model is excellent and ready for production',
        'The model may be predicting "not fraud" for every transaction and is useless for its purpose',
        'The dataset needs more features',
        'The model should be retrained with a higher learning rate'
      ],
      correctIndex: 1,
      explanation: 'On highly imbalanced datasets, accuracy is misleading. A model that predicts the majority class for every example achieves the majority class percentage as accuracy while completely failing at its actual goal. Precision, recall, and F1 are far more informative metrics for imbalanced problems like fraud detection.'
    },
    {
      question: 'What is the purpose of the validation set in a train/validation/test split?',
      options: [
        'To provide additional training data when the training set is too small',
        'To tune hyperparameters and make model selection decisions during development',
        'To give a final unbiased estimate of model performance before deployment',
        'To detect data drift after the model is deployed'
      ],
      correctIndex: 1,
      explanation: 'The validation set is used during development to tune hyperparameters and compare models. The test set is kept completely separate and used only once at the end to give an unbiased estimate of real-world performance. Using the test set for model selection decisions defeats its purpose.'
    },
    {
      question: 'In practice, which phase of an ML project typically consumes the most time?',
      options: [
        'Model selection',
        'Data preparation',
        'Hyperparameter tuning',
        'Deployment'
      ],
      correctIndex: 1,
      explanation: 'The content explicitly states that data work takes the majority of project time. Underestimating data preparation effort relative to model building is a common pitfall.'
    },
    {
      question: 'Why are vectorised NumPy operations faster than Python loops for numerical computation?',
      options: [
        'NumPy uses multiple CPU cores by default',
        'NumPy operations execute in compiled C code and operate on blocks of memory directly',
        'Python loops have a hard memory limit that NumPy avoids',
        'NumPy automatically parallelises operations across a GPU'
      ],
      correctIndex: 1,
      explanation: 'NumPy operations execute in compiled C code and operate on blocks of memory directly, making them orders of magnitude faster than Python loops which interpret each iteration individually.'
    },
    {
      question: 'What does "garbage in, garbage out" mean in the context of machine learning?',
      options: [
        'ML models produce nonsense output when run on GPU clusters',
        'The quality of training data directly determines model quality — poor data produces poor models',
        'Models trained quickly produce poor results',
        'Larger models always produce better output'
      ],
      correctIndex: 1,
      explanation: 'The industry expression "garbage in, garbage out" means the quality and quantity of training data directly determines model quality. Poor data produces poor models regardless of algorithm sophistication.'
    },
    {
      question: 'What is data leakage in machine learning and why is it dangerous?',
      options: [
        'Training data being stored insecurely on public servers',
        'Any inadvertent inclusion of test-set information in training or hyperparameter tuning, producing misleadingly optimistic evaluation scores',
        'Features that are correlated with each other in the training set',
        'A model that memorises training examples verbatim'
      ],
      correctIndex: 1,
      explanation: 'Data leakage occurs when information from the test or validation set influences the training process. This produces evaluation scores that appear excellent but do not reflect real-world performance. Common forms include fitting scalers on the full dataset before splitting and using future data in time-series problems.'
    }
  ],
  mid: [
    {
      question: 'What is the key difference between bagging (Random Forest) and boosting (XGBoost)?',
      options: [
        'Bagging trains trees sequentially; boosting trains trees in parallel',
        'Bagging trains many trees in parallel on random data subsets and aggregates predictions; boosting trains trees sequentially where each tree corrects the errors of the previous ones',
        'Bagging is only for regression; boosting is only for classification',
        'Bagging uses deep trees; boosting uses shallow trees'
      ],
      correctIndex: 1,
      explanation: 'Random Forest (bagging) trains many trees independently in parallel on random subsets of data and features, then aggregates by vote or averaging. This reduces variance. Gradient boosting trains trees sequentially, with each tree targeting the residual errors of the current ensemble. This reduces both bias and variance but is more sensitive to hyperparameters and overfitting.'
    },
    {
      question: 'Why must feature scaling steps such as standardisation be fit only on the training set, and then applied to the validation and test sets?',
      options: [
        'Because it is faster to compute scaling parameters on a smaller dataset',
        'Because fitting on the full dataset would leak information from the validation and test sets into the training process, making evaluation results unreliable',
        'Because the validation and test sets have different statistical distributions',
        'Because scikit-learn pipelines only support fitting on the training set'
      ],
      correctIndex: 1,
      explanation: 'Fitting a scaler on the full dataset allows statistics from the validation and test sets to influence the scaling parameters used during training. This is a form of data leakage that makes evaluation metrics appear better than they will be on truly unseen data. Fit on training only, then transform validation and test sets using those training-derived parameters.'
    },
    {
      question: 'In MLflow experiment tracking, what is the purpose of the Model Registry?',
      options: [
        'To store raw training datasets with version control',
        'To log metrics and parameters for each training run',
        'To provide versioned model storage with lifecycle stage transitions (Staging, Production, Archived) and audit history',
        'To schedule automated retraining jobs'
      ],
      correctIndex: 2,
      explanation: 'The MLflow Model Registry provides version control for trained models — separate from experiment runs. Each registered model version records its source run, training data, and metrics. Stage labels (None → Staging → Production → Archived) document the deployment state and who approved each transition, providing governance and traceability for production models.'
    },
    {
      question: 'Which types of ML algorithms require feature scaling, and which do not?',
      options: [
        'All ML algorithms require scaling',
        'Distance-based and gradient-based algorithms (SVMs, KNN, neural networks); tree-based models do not',
        'Only neural networks require scaling',
        'Tree-based models require scaling; linear models do not'
      ],
      correctIndex: 1,
      explanation: 'Scaling is required for distance-based (KNN, SVM) and gradient-based (neural networks, linear models) algorithms. Tree-based models split on thresholds, not distances, so they do not require scaling.'
    },
    {
      question: 'Why is ReLU preferred over sigmoid for hidden layers in deep networks?',
      options: [
        'ReLU outputs values between 0 and 1, matching probability scale',
        'ReLU avoids the vanishing gradient problem — its gradient is always 1 for positive inputs',
        'ReLU is simpler to compute than sigmoid',
        'Sigmoid causes exploding gradients in shallow networks'
      ],
      correctIndex: 1,
      explanation: 'ReLU avoids the vanishing gradient problem that plagued sigmoid and tanh in deep networks. For positive inputs its gradient is always 1, enabling stable gradient flow across many layers.'
    },
    {
      question: 'When should target encoding be preferred over one-hot encoding for a categorical feature?',
      options: [
        'When the categorical feature has a natural ordinal order',
        'When the feature has high cardinality — many unique values that would create thousands of columns with one-hot encoding',
        'When the feature has fewer than 5 unique values',
        'When the target variable is continuous'
      ],
      correctIndex: 1,
      explanation: 'One-hot encoding creates a binary column for each unique value and explodes dimensionality with high-cardinality features (e.g., postcode, customer ID). Target encoding replaces categories with the mean target value, avoiding this problem.'
    },
    {
      question: 'In a PyTorch training loop, what is the purpose of calling optimizer.zero_grad() before loss.backward()?',
      options: [
        'It resets the model weights to their initial values',
        'It clears the accumulated gradients from the previous iteration so they do not incorrectly accumulate across batches',
        'It sets the learning rate to zero to prevent weight updates',
        'It disables gradient computation for inference efficiency'
      ],
      correctIndex: 1,
      explanation: 'PyTorch accumulates gradients by default. Without calling zero_grad() before each backward pass, gradients from previous batches would add to current gradients, producing incorrect weight updates. This is a critical step in every training loop.'
    }
  ],
  senior: [
    {
      question: 'A deployed credit scoring model is flagged because it approves a significantly lower fraction of applications from one demographic group than others. You remove the protected attribute from the feature set. Why might the model still be biased?',
      options: [
        'The model needs to be retrained with more data from the affected group',
        'Removing a protected attribute does not remove bias if other features act as proxies — for example, postcode can proxy for ethnicity',
        'The issue is in the evaluation metric, not the model itself',
        'The model needs a higher regularisation penalty to reduce this type of error'
      ],
      correctIndex: 1,
      explanation: 'Proxy features are correlated with the protected attribute and carry the same discriminatory signal even when the protected attribute itself is excluded. Postcode, job title, and education level can all proxy for protected characteristics. Removing protected attributes is necessary but not sufficient — fairness tools like Fairlearn must be used to measure group outcomes and apply mitigation strategies such as threshold optimisation.'
    },
    {
      question: 'What is concept drift and how does it differ from feature drift?',
      options: [
        'Concept drift and feature drift are different names for the same phenomenon',
        'Feature drift is when input distributions change; concept drift is when the relationship between inputs and the target changes even if inputs look unchanged',
        'Concept drift is when the model architecture becomes outdated; feature drift is when new features are added',
        'Feature drift affects training data; concept drift affects test data only'
      ],
      correctIndex: 1,
      explanation: 'Feature drift (also called data drift) is when the statistical distribution of input features shifts from the training distribution. Concept drift is when the underlying relationship between features and the target variable changes — for example, a feature that predicted fraud reliably no longer does because fraudsters have adapted their behaviour. Concept drift is harder to detect because inputs may look statistically normal while model performance degrades silently.'
    },
    {
      question: 'Why does transformer self-attention have O(n²) complexity with respect to sequence length, and what practical consequence does this have?',
      options: [
        'Because transformers use n layers each with n neurons — more layers always means quadratic cost',
        'Because each token in the sequence attends to every other token, so the number of attention operations scales as n × n — this is why context window size is a hard practical constraint on cost and latency',
        'Because transformers use gradient descent which requires n² iterations to converge',
        'The complexity is O(n log n), not O(n²), due to the use of multi-head attention'
      ],
      correctIndex: 1,
      explanation: 'In self-attention, each of the n tokens in the input sequence computes attention scores against all n other tokens, resulting in an n × n attention matrix. This O(n²) cost in both compute and memory means that doubling the context window quadruples the attention computation. This motivates architectures like flash attention, sliding window attention, and other efficient attention variants that approximate the full attention matrix at lower cost.'
    },
    {
      question: 'Why is containerisation with Docker the standard approach for model serving in production?',
      options: [
        'Docker containers run faster than native Python processes',
        'Containerisation decouples the model from the infrastructure, ensuring the same image runs identically across dev, staging, and production',
        'Docker is the only tool that supports FastAPI',
        'Containers automatically scale horizontally without configuration'
      ],
      correctIndex: 1,
      explanation: 'Containerisation with Docker packages the model, dependencies, and serving framework together, decoupling it from the infrastructure. The same container image runs identically in development, staging, and production, eliminating environment-specific failures.'
    },
    {
      question: 'What is data drift in the context of deployed ML models?',
      options: [
        'Corruption of training data during storage',
        'Changes to the model weights after deployment',
        'The distribution of incoming production data diverging from the training distribution',
        'Gradual increase in model serving latency'
      ],
      correctIndex: 2,
      explanation: 'Data drift occurs when the statistical distribution of incoming production data diverges from the distribution the model was trained on. It is the most common cause of silent model degradation.'
    },
    {
      question: 'In distributed training across multiple GPUs, what is the purpose of the AllReduce operation?',
      options: [
        'It distributes the training dataset evenly across all GPUs before training begins',
        'It synchronises gradients across all participating GPUs so that each GPU applies the same averaged gradient update, keeping model copies consistent',
        'It reduces the model size by pruning unused weights across GPUs',
        'It selects the GPU with the fastest computation to serve as the master node'
      ],
      correctIndex: 1,
      explanation: 'In data-parallel distributed training, each GPU computes gradients on its own data shard. AllReduce aggregates (sums or averages) these gradients across all GPUs and distributes the result back, ensuring every GPU applies the same update. Without this synchronisation, model copies would diverge and training would fail.'
    },
    {
      question: 'What is the key advantage of canary deployment for ML models compared to a full traffic switch?',
      options: [
        'Canary deployment eliminates the need for offline evaluation entirely',
        'It routes a small percentage of production traffic to the new model version first, allowing teams to detect performance regressions before they affect all users',
        'Canary deployment automatically rolls back models that perform worse than the baseline',
        'It reduces the compute cost of serving the new model by limiting its traffic share'
      ],
      correctIndex: 1,
      explanation: 'Canary deployment exposes the new model to a small fraction of real traffic while the existing model continues serving the majority. If the canary model shows degraded metrics (latency, accuracy, business KPIs), the rollout is halted before widespread impact. This is especially important for ML models where offline evaluation may not fully predict production behaviour.'
    }
  ]
}
