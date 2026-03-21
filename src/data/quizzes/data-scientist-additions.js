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
  ],
}
