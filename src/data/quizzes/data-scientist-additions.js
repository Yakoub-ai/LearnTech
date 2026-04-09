export const additions = {
  beginner: [
    {
      question: 'According to the IBM Technology "AI, ML, Deep Learning and GenAI Explained" video, which of the following correctly describes the relationship between AI, machine learning, and deep learning?',
      options: [
        'They are separate fields that occasionally overlap but have no hierarchical relationship',
        'Machine learning is the broadest field; AI and deep learning are subsets of it',
        'AI is the broadest field; machine learning is a subset of AI; deep learning is a subset of machine learning',
        'Deep learning is the broadest field because it powers all modern AI applications'
      ],
      correctIndex: 2,
      explanation: 'The video uses a Venn diagram to show nesting: AI is the outer circle (any technique that simulates human intelligence), machine learning is inside AI (systems that learn from data rather than being explicitly programmed), and deep learning is inside ML (systems that use layered neural networks). Generative AI sits at the cutting edge of deep learning. This hierarchy is the foundational mental model for navigating the AI landscape.'
    },
    {
      question: 'In the "Machine Learning Simply Explained" video, what analogy is used to describe the role of a loss function during model training?',
      options: [
        'A compass pointing toward the nearest training example',
        'A parent telling a child "you were this close — try again", measuring how badly the model messed up so it knows what to fix',
        'A speedometer measuring how fast the model is processing data',
        'A map showing the shortest path between the current predictions and the correct answers'
      ],
      correctIndex: 1,
      explanation: 'The video explains that the loss function quantifies the model\'s errors — how wrong its predictions are compared to reality. It uses the analogy of a parent\'s correction: "you were this close, try again." After each batch, an optimiser (like gradient descent) adjusts the model\'s parameters to reduce that loss. This cycle repeats until performance reaches an acceptable level. Understanding the loss function is essential because it is the signal that drives all learning.'
    },
    {
      question: 'The "All ML Concepts Explained in 22 min" video states that truly understanding which concept "will make you a great data scientist and machine learning engineer"?',
      options: [
        'The difference between supervised and unsupervised learning',
        'How gradient descent finds the global minimum of a loss function',
        'The bias-variance trade-off and its relationship to model complexity',
        'The distinction between parameters and hyperparameters'
      ],
      correctIndex: 2,
      explanation: 'The video explicitly singles out the bias-variance trade-off as the most central concept in machine learning. A model with high bias makes oversimplified assumptions and underfits — poor performance on both training and test data. A model with high variance is too sensitive to training data and overfits — good training performance but poor generalisation. Finding the right model complexity to balance these forces determines whether a model actually works on unseen data, which is the whole point of machine learning.'
    },
    {
      question: 'What is the difference between model parameters and hyperparameters?',
      options: [
        'Parameters (weights/biases) are learned from data during training; hyperparameters (learning rate, depth) are set by the practitioner before training',
        'Parameters are set before training; hyperparameters are learned from data',
        'Parameters and hyperparameters are the same thing — both are tuned using gradient descent',
        'Hyperparameters only exist in deep learning models, not in classical ML algorithms'
      ],
      correctIndex: 0,
      explanation: 'Parameters are learned during training. Hyperparameters are set before training begins and control how training unfolds. Confusing them wastes effort: you cannot hand-tune a parameter, and you cannot train a hyperparameter with gradient descent.'
    },
    {
      question: 'Why must a test set be held out and used only once at the very end of model development?',
      options: [
        'Using the test set repeatedly to guide decisions converts it into a de facto validation set and produces overly optimistic performance estimates',
        'Test sets are computationally expensive to evaluate, so they should be reserved until the model is finalised',
        'Regulatory requirements for model submissions prohibit re-use of test data',
        'The test set is only used to tune hyperparameters, not to evaluate final performance'
      ],
      correctIndex: 0,
      explanation: 'The validation set is used during development to tune hyperparameters; the test set is held out to estimate performance on truly unseen data. Using the test set repeatedly for decisions makes it a de facto validation set and inflates estimates.'
    },
    {
      question: 'Which Python library provides the DataFrame abstraction that is the standard tool for tabular data manipulation in data science?',
      options: [
        'NumPy',
        'Pandas',
        'Scikit-learn',
        'Matplotlib'
      ],
      correctIndex: 1,
      explanation: 'Pandas provides the DataFrame — a labelled, two-dimensional data structure with columns of potentially different types. It is the standard tool for loading, cleaning, transforming, and exploring tabular data in Python. NumPy provides the underlying numerical arrays, Scikit-learn provides ML algorithms, and Matplotlib provides visualisation.'
    },
    {
      question: 'What is the practical difference between the mean and the median as measures of central tendency?',
      options: [
        'The mean is the arithmetic average and is sensitive to outliers; the median is the middle value when sorted and is robust to outliers — making it more appropriate for skewed distributions',
        'The mean is always larger than the median in any dataset',
        'The median can only be calculated for datasets with an odd number of observations',
        'The mean is used for continuous data; the median is used for categorical data'
      ],
      correctIndex: 0,
      explanation: 'The mean sums all values and divides by the count, so a single extreme outlier can pull it far from the centre of the data. The median is the middle value in a sorted dataset and is unaffected by outliers. For skewed distributions (e.g., income, housing prices), the median is typically a more representative measure of the "typical" value.'
    },
  ],
  mid: [
    {
      question: 'According to the "All ML Algorithms Explained in 17 min" video, what is the key structural difference between bagging (Random Forests) and boosting (Gradient Boosting)?',
      options: [
        'Bagging uses decision trees; boosting uses linear models',
        'Bagging trains trees in parallel on random data subsets; boosting trains trees sequentially, each correcting the errors of the previous one',
        'Bagging is only used for regression; boosting is only used for classification',
        'Bagging requires more data than boosting; boosting works better on small datasets'
      ],
      correctIndex: 1,
      explanation: 'The video clearly distinguishes the two ensemble strategies: bagging (Random Forests) trains many trees in parallel on different random subsets of the data, then averages their predictions — this reduces variance and makes the model robust. Boosting trains trees sequentially, where each new tree focuses on the examples the previous trees got wrong, building a strong model from many weak ones. Boosting typically achieves higher accuracy but is more prone to overfitting and is slower to train because of the sequential dependency.'
    },
    {
      question: 'The "All ML Algorithms Explained in 17 min" video explains that neural networks perform "implicit feature engineering." What does this mean in practice?',
      options: [
        'Neural networks automatically clean missing values from the training data before learning',
        'Neural networks learn intermediate representations of the data automatically through hidden layers, without a practitioner needing to define those features manually',
        'Neural networks use a kernel trick to create new polynomial features from the original inputs',
        'Neural networks are trained on pre-engineered feature sets provided by domain experts'
      ],
      correctIndex: 1,
      explanation: 'The video uses handwritten digit recognition to explain this: a logistic regression model only sees raw pixel intensities and cannot easily learn that "a vertical line without crossings" means the digit 1. A neural network adds hidden layers that automatically learn intermediate features — edges, curves, shapes — without the practitioner defining them. This is why deep learning dominates unstructured data (images, text, audio) where manual feature engineering is impractical. For tabular data, explicit feature engineering often remains more efficient.'
    },
    {
      question: 'In the context of PCA (Principal Component Analysis) as described in the "All ML Algorithms Explained in 17 min" video, what is the first principal component?',
      options: [
        'The feature in the original dataset with the highest correlation to the target variable',
        'The direction in the feature space along which the data has the greatest variance',
        'The combination of features that minimises the reconstruction error for all data points',
        'The axis that is orthogonal to the second principal component and passes through the data centroid'
      ],
      correctIndex: 1,
      explanation: 'The video explains PCA using a fish classification example: when height and length are highly correlated, you can replace both with a single "shape" feature. PCA finds this by identifying the direction of maximum variance in the data — the first principal component. Subsequent components are orthogonal to previous ones and explain progressively less variance. This allows you to discard dimensions that contribute little variance (and thus little information), reducing dimensionality while preserving the most important structure in the data.'
    },
    {
      question: 'What does k-fold cross-validation do, and why is it more reliable than a single train/test split?',
      options: [
        'It trains and evaluates the model k times on different splits of the data, giving a more reliable estimate of generalisation performance than a single split',
        'It divides the dataset into k equal parts and trains k separate final models that are each deployed for different user segments',
        'It repeats the same train/test split k times with different random seeds and averages the results',
        'It evaluates the model on k different metrics simultaneously to give a complete performance profile'
      ],
      correctIndex: 0,
      explanation: 'K-fold cross-validation creates k different splits of the data. The model is trained on k-1 folds and evaluated on the remaining fold, repeated k times. This produces k performance estimates whose average is more reliable than any single split.'
    },
    {
      question: 'What does a confusion matrix show for a binary classification problem?',
      options: [
        'The breakdown of true positives, false positives, true negatives, and false negatives — enabling calculation of precision, recall, and F1',
        'A visual representation of the decision boundary learned by the classifier',
        'The correlation between all pairs of input features that confuse the model during training',
        'The confidence scores assigned by the model to each prediction, sorted from highest to lowest'
      ],
      correctIndex: 0,
      explanation: 'A confusion matrix shows the four cells of actual vs. predicted classes: true positives (correctly predicted positive), false positives (incorrectly predicted positive), true negatives (correctly predicted negative), and false negatives (incorrectly predicted negative). These enable computation of precision, recall, and F1.'
    },
    {
      question: 'Why is it critical to fit a StandardScaler only on the training set and then apply (transform) it to both training and test sets?',
      options: [
        'Fitting on the full dataset leaks test set statistics (mean, standard deviation) into training, causing data leakage and overly optimistic performance estimates',
        'StandardScaler is computationally expensive, so fitting on the smaller training set is faster',
        'Test set values must be re-centred around zero independently to ensure fair comparison',
        'Fitting on the full dataset would cause the scaler to overfit to the training data'
      ],
      correctIndex: 0,
      explanation: 'Fitting a scaler on the full dataset means the mean and standard deviation used for scaling include information from the test set. This leaks test set statistics into the training process, causing the model to perform better on the test set than it would on truly unseen data — a form of data leakage that produces overly optimistic estimates.'
    },
    {
      question: 'What is the difference between one-hot encoding and ordinal encoding for categorical features, and when should you use each?',
      options: [
        'One-hot encoding creates binary columns for each category and is used for nominal features with no inherent order; ordinal encoding assigns integers and is used when categories have a meaningful ranking',
        'One-hot encoding is always preferred because it preserves more information than ordinal encoding',
        'Ordinal encoding creates binary columns; one-hot encoding assigns sequential integers',
        'Both produce identical results and the choice is purely a matter of convention'
      ],
      correctIndex: 0,
      explanation: 'One-hot encoding creates a separate binary column for each category value, making it suitable for nominal features like colour or country where no ordering exists. Ordinal encoding assigns integers (e.g., low=1, medium=2, high=3) and is appropriate when categories have a natural order. Using ordinal encoding on unordered categories introduces a false ordinal relationship that can mislead distance-based and linear models.'
    },
  ],
  senior: [
    {
      question: 'The "ML Foundations for AI Engineers" video uses AlphaGo to illustrate a fundamental limitation of supervised learning. What is that limitation, and how did DeepMind address it?',
      options: [
        'Supervised learning is too slow for real-time games; DeepMind used faster hardware to overcome the speed constraint',
        'Supervised learning models are bounded by the quality of their training labels — they cannot exceed human expert performance; DeepMind used reinforcement learning so the model could self-improve beyond human level by generating its own experience',
        'Supervised learning requires too much labelled data for complex games; DeepMind addressed this with unsupervised pre-training on game replays',
        'Supervised learning cannot handle the combinatorial complexity of chess; DeepMind switched to a rule-based search algorithm'
      ],
      correctIndex: 1,
      explanation: 'The video makes this point precisely: the supervised learning version of AlphaGo learned from human grandmaster games, reached grandmaster strength quickly, and then plateaued — it could not surpass the humans whose moves it learned from. The reinforcement learning version started much weaker but, by playing millions of games against itself and discovering strategies no human had conceived, eventually surpassed every human player. The lesson for senior practitioners is that when supervised learning hits a ceiling, the bottleneck is often the label quality and human expertise, not the algorithm. RL, self-supervised learning, and synthetic data generation are the paths forward.'
    },
    {
      question: 'In the context of MLOps and production model deployment, what is the distinction between "data drift" and "model drift", and why does it matter for retraining decisions?',
      options: [
        'Data drift and model drift are the same phenomenon — both describe the model\'s predictions becoming less accurate over time',
        'Data drift means the input feature distribution has shifted from training time; model drift means the relationship between inputs and outputs has changed. Both degrade performance but require different diagnostic steps and responses',
        'Data drift only affects real-time models; model drift only affects batch models',
        'Data drift is detectable automatically; model drift requires manual inspection of model weights'
      ],
      correctIndex: 1,
      explanation: 'Data drift (also called covariate shift) occurs when the distribution of input features changes from what the model was trained on — for example, a new customer demographic appearing in production that was rare during training. Model drift (also called concept drift) occurs when the underlying relationship between inputs and outputs has changed — for example, fraud patterns evolving such that the features that once indicated fraud no longer do. These require different responses: data drift may require retraining on newer data; model drift requires rethinking which features are relevant. Monitoring for both is a core MLOps responsibility.'
    },
    {
      question: 'When applying SHAP (SHapley Additive exPlanations) to a gradient boosting model, what does a negative SHAP value for a specific feature in a single prediction indicate?',
      options: [
        'The feature was not used by the model for this prediction',
        'The feature\'s value was below the dataset average for that feature',
        'The feature pushed the prediction lower than the model\'s average prediction (the base value) for this specific instance',
        'The feature has a negative correlation with the target variable across the entire dataset'
      ],
      correctIndex: 2,
      explanation: 'SHAP values are local, instance-level explanations. For a single prediction, each feature receives a SHAP value representing its contribution to pushing that prediction away from the model\'s average prediction (the base value). A positive SHAP value means that feature increased the prediction for this instance; a negative SHAP value means it decreased it. The sum of all feature SHAP values plus the base value equals the model\'s actual prediction for that instance. Crucially, a negative SHAP value does not mean the feature is globally unimportant or negatively correlated with the target — its effect depends on the specific feature value for that instance.'
    },
    {
      question: 'What is the difference between data drift and model drift, and why does it matter for retraining decisions?',
      options: [
        'Data drift and model drift are the same phenomenon — both describe the model\'s predictions becoming less accurate over time',
        'Data drift means the input feature distribution has shifted from training time; model drift means the relationship between inputs and outputs has changed. Both degrade performance but require different diagnostic steps and responses',
        'Data drift only affects real-time models; model drift only affects batch models',
        'Data drift is detectable automatically; model drift requires manual inspection of model weights'
      ],
      correctIndex: 1,
      explanation: 'Data drift (covariate shift) occurs when the distribution of input features changes from what the model was trained on. Model drift (concept drift) occurs when the underlying relationship between inputs and outputs has changed. Data drift may require retraining on newer data; model drift requires rethinking which features are relevant. Monitoring for both is a core production responsibility.'
    },
    {
      question: 'A team builds a RAG system and assumes it eliminates hallucination because answers are grounded in retrieved documents. What is wrong with this assumption?',
      options: [
        'The model can still generate content inconsistent with the retrieved context; RAG reduces but does not eliminate hallucination, and evaluation must separately measure retrieval quality and generation quality',
        'The assumption is correct: RAG grounds every output in retrieved text, so hallucination is not possible by definition',
        'The assumption is correct for factual queries but not for analytical queries where the model must reason over the retrieved content',
        'Hallucination is eliminated when the retrieval precision is above 0.9, which is achievable with a well-tuned embedding model'
      ],
      correctIndex: 0,
      explanation: 'RAG does not eliminate hallucination. The model can still generate content that is inconsistent with the retrieved context — it may ignore retrieved content, synthesise incorrectly, or fill gaps with fabricated information. Evaluation of RAG systems requires separately measuring retrieval quality (are the right chunks being retrieved?) and generation quality (is the model faithfully using the retrieved content?).'
    },
    {
      question: 'What is the difference between a Type I error and a Type II error in statistical hypothesis testing, and why does the distinction matter in experiment design?',
      options: [
        'A Type I error (false positive) rejects a true null hypothesis; a Type II error (false negative) fails to reject a false null hypothesis. The distinction matters because the business cost of each error type is often very different',
        'A Type I error occurs when sample size is too small; a Type II error occurs when sample size is too large',
        'Type I errors only occur in A/B tests; Type II errors only occur in observational studies',
        'Type I and Type II errors are the same thing measured at different confidence levels'
      ],
      correctIndex: 0,
      explanation: 'A Type I error (false positive, controlled by alpha/significance level) means concluding there is an effect when there is not — e.g., launching a feature that has no real impact. A Type II error (false negative, related to statistical power) means missing a real effect — e.g., failing to detect a genuinely beneficial feature. In experiment design, the acceptable rates of each error type drive sample size calculations, and the business cost of each type should inform which error to prioritise controlling.'
    },
    {
      question: 'Why is transfer learning particularly powerful for deep learning tasks in domains with limited labelled data?',
      options: [
        'Transfer learning uses a model pre-trained on a large dataset and fine-tunes it on the smaller target dataset, leveraging learned representations (edges, textures, language patterns) that transfer across tasks',
        'Transfer learning trains the model from scratch on the small dataset but uses a special loss function that compensates for limited data',
        'Transfer learning generates synthetic data to augment the small dataset before training',
        'Transfer learning is only applicable to image classification and cannot be used for NLP or other domains'
      ],
      correctIndex: 0,
      explanation: 'Transfer learning leverages a model that has already learned general representations from a large dataset (e.g., ImageNet for vision, large text corpora for NLP). The lower layers capture universal features (edges, textures, syntax patterns) that transfer well to new tasks. Fine-tuning the final layers on a small domain-specific dataset is dramatically more data-efficient than training from scratch, making it the standard approach when labelled data is scarce.'
    },
  ],
}
