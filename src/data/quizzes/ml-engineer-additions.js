/**
 * Additional quiz questions for the ML Engineer learning path.
 * These supplement the base questions in quizzes.js.
 */
export const mlEngineerAdditions = {
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
    }
  ]
}
