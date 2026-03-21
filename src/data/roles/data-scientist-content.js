export const content = {
  overview: `# Data Scientist – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Data Scientists analyse data to generate insights and build predictive models. The role covers statistics, data manipulation, machine learning, visualisation, and communicating findings to business stakeholders.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| Python Foundations | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python Foundations | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| Python for Data Science | [Python Full Course for Beginners – Programming with Mosh](https://www.youtube.com/watch?v=_uQrJ0TkZlc) | Video |
| ML Overview | [All ML Concepts Explained in 22 min](https://www.youtube.com/watch?v=Fa_V9fP2tpU) | Video |
| AI vs ML vs Deep Learning | [AI, ML, Deep Learning and GenAI Explained – IBM Technology](https://www.youtube.com/watch?v=qYNweeDHiyU) | Video |
| NumPy | [NumPy – Official Tutorials](https://numpy.org/learn/) | Interactive |
| Data Manipulation | [Kaggle Learn – Pandas](https://www.kaggle.com/learn/pandas) | Interactive |
| Data Visualization | [Kaggle Learn – Data Visualization](https://www.kaggle.com/learn/data-visualization) | Interactive |
| Statistics Refresher | [Khan Academy – Statistics and Probability](https://www.khanacademy.org/math/statistics-probability) | Interactive |

### After completing Beginner you should be able to:

- Write Python scripts to load, clean and manipulate data using NumPy and Pandas
- Create data visualisations to communicate patterns
- Apply basic statistical concepts (distributions, mean, variance, correlation)
- Explain what machine learning is and when to use it

For deep explanations of each concept, see the [Beginner Concept Reference](Data-Scientist/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| Feature Engineering | [Kaggle Learn – Feature Engineering](https://www.kaggle.com/learn/feature-engineering) | Interactive |
| ML Algorithms | [All ML Algorithms Explained in 17 min](https://www.youtube.com/watch?v=E0Hmnixke2g) | Video |
| ML Course | [Scikit-Learn Course – Machine Learning in Python – freeCodeCamp](https://www.youtube.com/watch?v=pqNCD_5r0IU) | Video |
| Intermediate ML | [Kaggle Learn – Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) | Interactive |
| Relational Databases | [freeCodeCamp – Relational Databases](https://www.freecodecamp.org/learn/relational-databases-v9/) | Interactive |
| SQL for Data Science | [SQLBolt – Interactive SQL Tutorial](https://sqlbolt.com/) | Interactive |
| Algorithms and Data Structures | [Algorithms and Data Structures Pt.1 – Pluralsight](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) | Course |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Generative AI for Data Science | [Generative AI for Data Science – Pluralsight](https://app.pluralsight.com/paths/skills/generative-ai-for-data-science) | Course |
| Time-Series Analysis | [Kaggle Learn – Time Series](https://www.kaggle.com/learn/time-series) | Interactive |
| Class Imbalance | [imbalanced-learn Documentation](https://imbalanced-learn.org/stable/) | Docs |

### After completing Mid you should be able to:

- Engineer features from raw data to improve model performance
- Select and evaluate ML algorithms for different problem types
- Query relational databases with SQL including joins and aggregations
- Explain what a data science project pipeline looks like end to end
- Apply time-series techniques to forecast trends and detect seasonality in sequential data

For deep explanations of each concept, see the [Mid Concept Reference](Data-Scientist/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| ML Foundations for AI Engineers | [ML Foundations for AI Engineers (34 min)](https://www.youtube.com/watch?v=BUTjcAjfMgY) | Video |
| MLOps | [End-to-end MLOps with Azure ML – Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/build-first-machine-operations-workflow/) | Interactive |
| RAG Systems | [RAG for Developers – Pluralsight](https://app.pluralsight.com/paths/skills/retrieval-augmented-generation-rag-for-developers) | Course |
| Context Engineering | [Context Engineering – Pluralsight](https://app.pluralsight.com/paths/skills/context-engineering) | Course |
| LangGraph | [LangGraph – Pluralsight](https://app.pluralsight.com/paths/skills/langgraph) | Course |
| AI Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| LLM Security | [Architecting Resilient LLM Agents](https://arxiv.org/abs/2509.08646) | Paper |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) (Internal – requires company access) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) (Internal – requires company access) | Internal |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| Explainable AI (XAI) | [SHAP Documentation](https://shap.readthedocs.io/en/latest/) | Docs |
| Survival Analysis | [lifelines Documentation](https://lifelines.readthedocs.io/en/latest/) | Docs |

### After completing Senior you should be able to:

- Design and deploy an end-to-end MLOps pipeline
- Implement a RAG-based system for data retrieval
- Evaluate AI architecture patterns relevant to data science workloads
- Apply AI governance and policy requirements to a data project
- Use SHAP to produce and interpret explanations for model predictions in a business context
- Apply survival analysis techniques to model time-to-event data such as customer lapse or claims development

For deep explanations of each concept, see the [Senior Concept Reference](Data-Scientist/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
  beginner: `
# Data Scientist – Beginner Concept Reference

This document gives in-depth explanations of the core concepts covered in the Beginner level of the Data Scientist learning path. Use it alongside the linked resources to build a solid mental model before moving to Mid-level material.

---

## Video: AI, ML, Deep Learning and GenAI Explained (IBM Technology)

> [AI, ML, Deep Learning and GenAI Explained – IBM Technology](https://www.youtube.com/watch?v=qYNweeDHiyU)

This video from IBM Technology traces the full landscape from traditional AI to modern generative AI, using clear analogies and a Venn-diagram framing. The key mental model it builds is one of nested fields: AI is the broadest umbrella (any technique that makes a machine simulate human intelligence), machine learning is a subset of AI that learns from data rather than following hand-coded rules, deep learning is a subset of ML that uses layered neural networks inspired by the brain, and generative AI (large language models, image generators, deep fakes) sits at the cutting edge of deep learning.

The presenter is candid about what makes deep learning hard to interpret: because there are so many hidden layers of neural network, it can be difficult to decompose exactly why a result was produced. This unpredictability mirrors how human brains work — and is a key reason why explainability techniques (covered at Senior level) matter so much in practice.

On generative AI, the video makes an important philosophical point: even though generative models recombine existing patterns rather than creating from scratch, that does not make them non-creative. Just as all music recombines notes that already exist, LLMs and image generators can produce genuinely novel outputs. The appropriate framing is not "is it original?" but "is it useful and safe?"

**Why it matters:** This framing — AI ⊃ ML ⊃ Deep Learning ⊃ Generative AI — is the mental map every data scientist needs to navigate job descriptions, tooling decisions, and stakeholder conversations. When a colleague says "we should use AI for this", knowing where your proposed solution sits on this map tells you immediately what the feasibility, data requirements, and interpretability trade-offs are.

---

## Video: Machine Learning Simply Explained

> [Machine Learning Simply Explained](https://www.youtube.com/watch?v=Au1OxVSyGas)

This video breaks machine learning down into four core components — data, algorithms, models, and training and evaluation — and explains them through concrete analogies that stick. Some key insights worth anchoring early:

**Data quality beats data quantity.** The video is emphatic: "you put garbage data in, you often get garbage data out." A dataset full of errors, biases, or irrelevant features cannot be rescued by a more sophisticated algorithm. This is the primary reason data analyst and data scientist roles exist — someone has to ensure quality before modelling begins.

**Algorithms are the chef; data is the ingredients; the model is the dish.** This layered analogy makes the relationships concrete: the algorithm (chef) processes the data (ingredients) to produce a trained model (dish) that can then be served to make predictions. The complexity of the dish depends on the complexity of the goal — from a simple linear regression line to a deep network with billions of parameters.

**A loss function is the model's feedback signal.** During training, a loss function measures how wrong the model's predictions are. An optimiser (such as gradient descent) then adjusts the model's internal parameters in the direction that reduces that loss. This cycle — predict, measure error, adjust — repeats across many passes through the training data until performance reaches an acceptable level. The video compares it to tuning an AM/FM radio: tiny nudges until the station comes through clearly.

**The four types of machine learning.** The video covers supervised learning (learning from labelled examples — classification and regression), unsupervised learning (finding structure in unlabelled data — clustering and anomaly detection), reinforcement learning (trial-and-error learning with rewards and penalties), and semi-supervised learning (a mix of labelled and unlabelled data). Supervised learning dominates most business applications.

**Why it matters:** These four components — data, algorithm, model, training/evaluation — are the checklist you return to every time a model underperforms. Bad data? Fix the data first. Wrong algorithm for the problem type? Switch the chef. Poor training procedure? Adjust the loss function or the number of epochs. Having this mental framework makes debugging methodical rather than guesswork.

---

## Video: All ML Concepts Explained in 22 Minutes

> [All ML Concepts Explained in 22 min](https://www.youtube.com/watch?v=Fa_V9fP2tpU)

This rapid-fire glossary video is a reference companion rather than a narrative. It is most useful as a vocabulary check: by the end of the Beginner level you should be able to recall and explain every term it covers. Some of the most important concepts it defines, with additional depth:

**The bias-variance trade-off is one of the most central concepts in ML.** The video states this explicitly, and it is worth understanding deeply. A model with high bias makes oversimplified assumptions (underfitting — poor performance on both training and test data). A model with high variance is overly sensitive to training data (overfitting — good training performance, poor test performance). The goal is to find a model complex enough to capture real patterns but not so complex it memorises noise. Learning curves — plotting error against training set size — are the most direct way to diagnose which problem you have.

**Parameters vs hyperparameters.** Parameters (weights and biases) are learned during training from the data. Hyperparameters (learning rate, number of layers, batch size, regularisation strength) are set by the practitioner before training begins and control how training unfolds. Confusing these two categories leads to wasted effort: you cannot tune a parameter by hand, and you cannot train a hyperparameter with gradient descent.

**Gradient descent is how almost all modern ML models learn.** The algorithm calculates the direction in which the loss function decreases most steeply (the gradient), then takes a step in that direction scaled by the learning rate. Too large a learning rate and the model overshoots the minimum; too small and training takes unnecessarily long or gets stuck. Variants like momentum-based gradient descent (inspired by a ball rolling down a mountain that can overshoot local minima) address the local minima problem.

**Validation vs test sets serve different purposes.** The validation set is used during development to tune hyperparameters and make modelling decisions. The test set is held out until the very end and used only once to estimate how the final model will perform on truly unseen data. Using the test set repeatedly for decisions converts it into a de facto validation set and produces overly optimistic estimates.

**Why it matters:** The concepts in this video are the shared language of the ML community. Job interviews, research papers, library documentation, and team code reviews all assume fluency with these terms. Treating this video as a vocabulary test — pausing and trying to define each term before the video does — is a productive way to identify gaps before they become blockers.

---

## Python for Data Science – Key Libraries and Workflow

Python has become the dominant language for data science work because of its readable syntax, large ecosystem of specialised libraries, and strong community support. Unlike general-purpose software development, data science with Python typically follows a notebook-first workflow: you load data, explore it interactively, clean it, visualise it, and then build and evaluate models, often in a Jupyter Notebook or a similar environment before moving any production code to scripts.

The core libraries every data scientist must know are NumPy (numerical computing), Pandas (tabular data), Matplotlib, Seaborn, and Plotly (visualisation), and Scikit-learn (machine learning). These libraries are designed to work together: Pandas DataFrames can be passed directly to Scikit-learn estimators, and both build on NumPy arrays under the hood.

**Why it matters:**
Python is the lingua franca of data science. Every tool, tutorial, and job posting in the field assumes Python fluency. Knowing which library to reach for, and how they fit together, is what separates productive data scientists from those who spend hours fighting their environment.

**Key things to understand:**
- Python itself is not slow, but pure Python loops over large datasets are. The libraries listed above use compiled C or Fortran code internally, which is why they are fast.
- Virtual environments and package management (pip, conda) are essential from day one. Installing packages globally causes dependency conflicts that are hard to debug.
- Jupyter Notebooks are useful for exploration but are not suitable as the final form of production code. Learn when to graduate a notebook to a script or module.
- Reading error tracebacks carefully is a core skill. Python errors usually tell you exactly what went wrong and where.

**Common pitfalls:**
- Running notebook cells out of order and getting confused about the current state of variables.
- Installing packages with \`pip\` inside a conda environment without understanding the interaction between the two tools.
- Assuming code that works on a small sample will perform acceptably on the full dataset without testing.

---

## NumPy – Arrays, Vectorisation and Why It Replaces Loops

NumPy (Numerical Python) provides the \`ndarray\`, a fixed-type, multi-dimensional array that is the foundation of almost all numerical work in Python. The key idea is that operations on NumPy arrays are vectorised: instead of writing a loop in Python to apply a calculation to each element, you write a single expression and NumPy applies it across the entire array using compiled code. This is typically 10 to 100 times faster than an equivalent Python loop.

Understanding NumPy is important not just for using it directly, but because Pandas, Scikit-learn, TensorFlow, and PyTorch all rely on its array model. When you encounter a shape mismatch error or a broadcasting error in any of these libraries, the underlying concept is always NumPy broadcasting rules.

**Why it matters:**
NumPy is the numerical backbone of the entire Python data science ecosystem. You cannot work effectively with Pandas, Scikit-learn, or deep learning frameworks without understanding how NumPy arrays behave — their shape, dtype, and the rules governing operations between them.

**Key things to understand:**
- Arrays have a fixed dtype (e.g., float64, int32). Mixing types forces a cast, which can silently change values.
- Shape and axes: a 1-D array has shape \`(n,)\`, a 2-D array has shape \`(rows, cols)\`. For a 2-D array, \`array[:, 0]\` selects the first column and \`array[0, :]\` selects the first row.
- Broadcasting allows NumPy to perform operations on arrays of different but compatible shapes without copying data.
- \`np.nan\` is a float, not a missing value marker that affects integers. This distinction matters when cleaning data.

**Common pitfalls:**
- Confusing a 1-D array of shape \`(n,)\` with a 2-D column vector of shape \`(n, 1)\`. Many Scikit-learn functions require one form and not the other.
- Modifying a slice of an array and being surprised that the original array also changed, because NumPy slices return views, not copies. Note that this is different from pandas, which since version 3.0 uses Copy-on-Write by default — NumPy arrays still share memory on slicing, so changes to a slice always affect the original array.
- Using loops when a vectorised operation exists, negating the performance benefit of NumPy entirely.

---

## Pandas – Series, DataFrames and Data Wrangling

Pandas provides two primary data structures: the \`Series\` (a one-dimensional labelled array) and the \`DataFrame\` (a two-dimensional table with labelled rows and columns). Together they make it practical to load, inspect, clean, reshape, and summarise tabular data without writing SQL or using a spreadsheet application.

For a data scientist, most real-world projects involve imperfect data: missing values, inconsistent formats, duplicate rows, wrong data types, and outliers. Pandas provides the tools to diagnose and fix all of these. Mastering Pandas is therefore not optional; it is the skill that determines how quickly you can move from raw data to a form that is usable for analysis or modelling.

**Why it matters:**
Raw data is almost never clean or analysis-ready. Pandas is the primary tool for bridging that gap. The speed at which you can wrangle a messy dataset into a usable form directly determines how fast you can iterate on analysis and modelling.

**Key things to understand:**
- \`df.info()\` and \`df.describe()\` should be the first thing you run on any new dataset. They tell you shape, dtypes, null counts, and basic statistics.
- Selecting data: use \`loc\` for label-based selection (row and column names) and \`iloc\` for integer-position-based selection (row and column numbers). Mixing them up causes bugs that can be silent.
- \`dropna()\` removes rows or columns containing missing values; \`fillna()\` replaces them with a specified value or strategy. Choose based on whether the missingness is informative.
- \`groupby()\` is one of the most powerful operations: it splits the data by a key, applies a function, and combines the results. \`merge()\` joins two DataFrames on a key column (like SQL JOIN); \`join()\` merges on the index.

**Common pitfalls:**
- Chained assignment (e.g., \`df[df['x'] > 0]['y'] = 1\`) no longer works in pandas 3.0+, which adopted Copy-on-Write as the default behaviour. The old \`SettingWithCopyWarning\` no longer exists. The correct pattern is to use \`.loc\` on the original DataFrame directly (e.g., \`df.loc[df['x'] > 0, 'y'] = 1\`) for single-step assignment.
- Forgetting that \`merge()\` defaults to an inner join, silently dropping rows that do not match.
- Treating object-dtype columns as strings without checking for mixed types or unexpected values first.
- Performing expensive operations row-by-row using \`iterrows\` instead of using vectorised Pandas methods.

---

## Data Visualisation – Purpose, Chart Types and Interpretation

Data visualisation translates numbers into images that human perception can process quickly. A well-chosen chart can reveal a pattern, outlier, or relationship in seconds that would take minutes to find by reading a table. For a data scientist, visualisation serves two distinct purposes: exploratory analysis (understanding the data yourself) and communication (explaining findings to others).

Different chart types suit different questions. Bar charts compare discrete categories. Line charts show trends over time. Scatter plots reveal relationships between two continuous variables. Histograms and box plots describe the distribution of a single variable. Heatmaps show correlation matrices or grid-based data. Choosing the wrong chart type obscures rather than reveals the underlying truth.

**Why it matters:**
Insights that cannot be communicated are worthless. Visualisation is the primary language for translating analytical findings into business understanding. It is also the fastest way to spot data quality problems, outliers, and unexpected patterns before they corrupt your model.

**Key things to understand:**
- Matplotlib is the foundational Python plotting library; its \`pyplot\` interface provides a MATLAB-like workflow. Seaborn is built on top of Matplotlib and provides a higher-level API with better statistical chart defaults and more attractive styling. Plotly creates interactive charts suitable for dashboards and web applications.
- Always label axes and include units. A chart without axis labels is uninterpretable.
- Scale matters: a y-axis that does not start at zero can visually exaggerate differences. This is sometimes intentional, but always be aware of it.
- Colour choice affects accessibility. Avoid red-green combinations for audiences that may include colour-blind readers.

**Common pitfalls:**
- Using a pie chart for more than four or five categories, making it impossible to compare slices accurately.
- Overplotting in scatter plots when there are many data points, masking the true density of the data. Use alpha (transparency) or a hexbin plot instead.
- Presenting a chart to a non-technical audience without a title or annotation that explains the key message.
- Conflating correlation shown in a scatter plot with a causal relationship.

---

## Descriptive Statistics – Mean, Median, Mode, Variance, Standard Deviation and IQR

Descriptive statistics summarise the key properties of a dataset in a compact form. Before building any model, you need to understand what your data looks like: where it centres, how spread out it is, whether it is symmetric, and whether it has outliers. Skipping this step leads to models that appear to work but are actually fitting to noise or dominated by a few extreme values.

The mean is the arithmetic average of all values; the median is the middle value when data is sorted; the mode is the most frequently occurring value. When a distribution is skewed, these three measures diverge. A right-skewed distribution (long tail to the right, like income data) has a mean that is higher than the median, because extreme high values pull the mean up. Variance measures how far values typically lie from the mean on average (in squared units); standard deviation is the square root of variance and is expressed in the same units as the data. The interquartile range (IQR) is Q3 minus Q1 and measures the spread of the middle 50% of the data; it is robust to outliers in a way that variance and standard deviation are not.

**Why it matters:**
You cannot build a good model without first understanding your data. Descriptive statistics are the vocabulary for that understanding. They expose problems such as outliers, skew, and data entry errors that would otherwise silently distort your analysis.

**Key things to understand:**
- Mean, median, and mode are all measures of central tendency but tell different stories. The mean is sensitive to outliers; the median is not. The mode is most useful for categorical or discrete data.
- Variance is the average of squared deviations from the mean; standard deviation is its square root. A low standard deviation means values cluster tightly around the mean.
- IQR = Q3 − Q1. It captures the spread of the central 50% of the data and is the basis for the standard definition of outliers in box plots (values beyond 1.5 × IQR from the quartiles).
- Distribution shape matters: normal, uniform, Poisson, and exponential distributions arise in different real-world processes, and the right model depends on the right distributional assumption.

**Common pitfalls:**
- Using the mean as the summary statistic for a heavily skewed variable, giving a misleading picture of the typical value.
- Ignoring outliers when computing variance, which inflates the estimate and distorts downstream analyses.
- Assuming all data is normally distributed simply because many statistical tests assume this, without checking.
- Reporting statistics without their sample size, making it impossible to judge statistical reliability.

---

## The Normal Distribution – The Bell Curve and Why It Appears Everywhere

The normal distribution (also called the Gaussian distribution) is a continuous probability distribution shaped like a symmetric bell curve. It is defined entirely by two parameters: its mean (the centre of the curve) and its standard deviation (which controls the width). For a normal distribution, the mean, median, and mode are all equal and sit at the peak of the curve.

The normal distribution appears in nature, measurement error, and many real-world phenomena because of the central limit theorem: the average of a large number of independent random variables tends toward a normal distribution regardless of the original distribution of those variables. This is why so many statistical tests assume normality and why the normal distribution is the starting point for understanding other distributions.

**Why it matters:**
Many statistical tests and modelling techniques assume normally distributed data or residuals. Knowing what a normal distribution looks like, and how to check whether your data follows one, helps you apply the right test and spot violations that would invalidate your results.

**Key things to understand:**
- The 68-95-99.7 rule: approximately 68% of data falls within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3. This provides immediate intuition about how extreme a given value is.
- A perfectly normal distribution is symmetric: the left and right halves are mirror images of each other, and skewness is zero.
- Real data is rarely perfectly normal. Use a histogram or a Q-Q plot to assess whether the normality assumption is reasonable for your data.
- Standardising a normal variable (subtracting the mean and dividing by the standard deviation) produces a standard normal distribution with mean 0 and standard deviation 1, which is what z-score tables are based on.

**Common pitfalls:**
- Applying a parametric test that assumes normality to data that is clearly skewed or heavy-tailed without checking the assumption.
- Confusing the normal distribution with any symmetric distribution — uniformly distributed data is also symmetric but very different from normal.
- Assuming that a large sample size automatically makes the normality assumption safe; the central limit theorem applies to sample means, not to individual observations.
- Treating a Q-Q plot as binary (normal vs. not normal) rather than as a diagnostic for the degree and nature of any departure from normality.

---

## Inferential Statistics – Hypothesis Testing, p-values and Confidence Intervals

Descriptive statistics describe what you observed. Inferential statistics help you reason about what is likely true in the broader population, based on a sample. Hypothesis testing is the formal procedure for deciding whether an observed effect is likely real or could plausibly be due to random chance.

The null hypothesis (H0) states that there is no effect or no difference. The alternative hypothesis (H1) states the opposite — that there is an effect. A test statistic is computed from the data, and the p-value is the probability of observing a result at least as extreme as the one found, assuming the null hypothesis is true. If the p-value is below a chosen threshold (commonly 0.05), the result is called statistically significant. A Type I error is rejecting a true null hypothesis (a false positive). A Type II error is failing to reject a false null hypothesis (a false negative).

**Why it matters:**
Business decisions based on data — A/B tests, product changes, clinical decisions — require a principled way to distinguish real effects from random noise. Hypothesis testing provides that framework. Misunderstanding p-values is one of the most common sources of incorrect conclusions in data-driven work.

**Key things to understand:**
- A p-value is not the probability that the null hypothesis is true. It is the probability of the data given the null hypothesis. This distinction is subtle but critical.
- Statistical significance does not imply practical significance. A tiny effect can be statistically significant with a large enough sample.
- The 0.05 threshold is a widely used convention, not a scientific law. The appropriate threshold depends on the cost of false positives versus false negatives in your context.
- Confidence intervals give a range of plausible values for a population parameter and are often more informative than a binary significant/not-significant decision.

**Common pitfalls:**
- Interpreting a p-value above 0.05 as proof that there is no effect, rather than simply insufficient evidence for one.
- Choosing the significance threshold after seeing the data, which invalidates the test.
- Running the same hypothesis test repeatedly as data comes in and stopping as soon as significance is reached (p-hacking).
- Ignoring assumptions of the test, such as independence of observations or normality of residuals, which can invalidate the result.

---

## Correlation vs Causation

Correlation measures the degree to which two variables move together. A positive correlation means that when one increases, the other tends to increase. A negative correlation means the opposite. The Pearson correlation coefficient ranges from -1 (perfect negative linear relationship) to +1 (perfect positive linear relationship), with 0 indicating no linear relationship. Correlation is easy to compute and easy to misinterpret.

Causation means that a change in one variable directly produces a change in another. Establishing causation requires more than observing that two things tend to move together; it requires ruling out confounding variables (third variables that influence both), reverse causation (the effect driving the cause), and coincidence. The gold standard for establishing causation is a randomised controlled experiment, which is often impossible in business data science.

**Why it matters:**
Mistaking correlation for causation leads to bad decisions. Acting on a spurious correlation — for example, increasing one metric because it correlates with revenue, when actually a third factor drives both — wastes resources and can cause harm. Understanding the distinction protects you from this class of error.

**Key things to understand:**
- Two variables can be correlated for three reasons: A causes B, B causes A, or a confounding variable C causes both. Correlation alone cannot distinguish these cases.
- Spurious correlations exist between completely unrelated variables simply because both trend over time (e.g., ice cream sales and drowning rates both increase in summer, because both are driven by warm weather).
- In predictive modelling, correlation is often enough: you do not need to understand causation to make a good prediction. However, for decision-making, causation is essential.
- Correlation measures only linear relationships. Two variables can have a strong non-linear relationship with a Pearson correlation near zero.

**Common pitfalls:**
- Presenting a correlation in a business report as evidence that one variable is causing another without appropriate caveats.
- Ignoring the possibility of confounding variables in feature selection, which can lead to models that appear predictive but fail when conditions change.
- Treating a high correlation coefficient as automatically meaningful without checking whether the relationship is linear and the sample is large enough.
- Forgetting that correlation can be driven by a small number of extreme outliers; always inspect the scatter plot alongside the correlation coefficient.

---

## What Machine Learning Is and When to Use It

Machine learning is the practice of writing algorithms that improve their performance on a task by learning patterns from data, rather than being explicitly programmed with rules. Instead of a developer writing \`if price > X then classify as expensive\`, an ML model infers that boundary from thousands of labelled examples.

There are three broad categories of machine learning. Supervised learning uses labelled data to learn a mapping from inputs to outputs (e.g., predicting house prices, classifying email as spam). Unsupervised learning finds structure in unlabelled data (e.g., customer segmentation, anomaly detection). Reinforcement learning trains an agent to take actions that maximise a reward signal over time, which is less common in typical business data science.

**Why it matters:**
Machine learning is the engine behind predictive analytics, personalisation, automation, and a growing share of business intelligence. Understanding what it is — and crucially, when it is and is not the right tool — is what lets you apply it appropriately rather than reaching for it by default.

**Key things to understand:**
- Machine learning is not always the right tool. If a rule-based system or simple statistical model can solve the problem reliably, that is often preferable.
- Data quality is more important than algorithm choice. A sophisticated model trained on dirty data will perform worse than a simple model trained on clean data.
- Every supervised learning problem requires a clearly defined target variable and a source of labelled training examples.
- Model evaluation must be done on data the model has not seen during training, otherwise you are measuring memorisation, not learning.

**Common pitfalls:**
- Applying ML to a problem that has too little data for a model to learn meaningful patterns, resulting in poor generalisation.
- Leaking information from the test set into training (data leakage), which produces optimistic evaluation metrics that do not hold in production.
- Choosing a model based on popularity rather than suitability for the problem type and data characteristics.
- Skipping baseline comparisons: always compare an ML model against a simple baseline (e.g., predicting the mean, or a rule-based approach) to confirm that complexity is justified.
`,
  mid: `
# Data Scientist – Mid Concept Reference

This document gives in-depth explanations of the core concepts covered in the Mid level of the Data Scientist learning path. It assumes you are comfortable with the Beginner material and are ready to work with more complex modelling and data engineering tasks.

---

## Video: All ML Algorithms Explained in 17 Minutes

> [All ML Algorithms Explained in 17 min](https://www.youtube.com/watch?v=E0Hmnixke2g)

This video by an experienced data scientist and ML bootcamp instructor provides exactly the practical orientation needed at Mid level: a decision framework for choosing an algorithm, not just a catalogue of what they are.

The presenter opens with a strategic point that is easy to overlook: there is no universally best algorithm. Every family makes different assumptions and involves different trade-offs across dataset size, problem type, interpretability requirements, and training speed. The skill is matching the right tool to the problem.

**The supervised/unsupervised split is the first decision.** Before choosing an algorithm, you must know whether you have labelled data (supervised) or not (unsupervised). Within supervised learning, the second decision is regression (continuous target) vs classification (categorical target). This two-level decision tree narrows your options dramatically.

**Linear and logistic regression are foundational, not simplistic.** The video explains that linear regression is the "mother of all ML algorithms" because almost all complex models — including neural networks — are extensions of it. Neural networks add hidden layers of intermediate features, implicitly engineering representations that linear regression cannot. Understanding the linear case first gives you a foundation for understanding everything else.

**Tree-based ensembles are the workhorse for tabular data.** The video explains bagging (Random Forests — parallel trees on random subsets, voting on the output) and boosting (Gradient Boosting — sequential trees, each correcting the errors of the last) as the two main ensemble strategies. Boosted trees often reach higher accuracy but are more prone to overfitting; Random Forests are more robust by default. For most structured business data problems, one of these two approaches will be your starting point.

**SVMs and kernel functions enable non-linear boundaries.** The video explains the kernel trick as a way of implicitly creating non-linear features without computing them explicitly — making SVMs powerful in high-dimensional spaces where linear boundaries are insufficient.

**Unsupervised learning: clustering vs dimensionality reduction.** K-means clustering groups data points by similarity without labels. PCA (Principal Component Analysis) reduces dimensionality by finding the directions of maximum variance and projecting data onto a smaller number of components, removing redundant correlated features. Both are preprocessing tools as much as they are end goals.

**Why it matters:** Mid-level data scientists are expected to select and justify algorithm choices, not just execute a tutorial. This video gives you the vocabulary and decision logic to do that. When asked "why did you choose XGBoost over Random Forest?", you should be able to answer in terms of the trade-offs the video covers: boosting vs bagging, overfitting risk, training speed, and hyperparameter sensitivity.

---

## Video: Machine Learning Concepts – Animated Reference

> [Machine Learning Concepts – Animated Reference](https://www.youtube.com/watch?v=PcbuKRNtCUc)

> ⚠️ No auto-transcript available for this video. Watch it for supplementary context.

This animated reference covers the full vocabulary of machine learning — including terms that the other videos introduce but do not fully define. It is best used as a glossary companion at the mid level, particularly for the following concepts that become important in more complex modelling work:

- **Cross-validation** — splitting data into multiple subsets and evaluating the model on different combinations to produce a more reliable performance estimate than a single split
- **Dropout** — a regularisation technique for neural networks that randomly disables neurons during training, forcing the network to learn redundant representations and reducing overfitting
- **Confusion matrix** — a table that shows the breakdown of true positives, false positives, true negatives, and false negatives, enabling calculation of precision, recall, and F1
- **AUC-ROC** — the area under the receiver operating characteristic curve, measuring aggregate classification performance across all possible thresholds; a useful summary metric when class balance varies
- **Grid search** — exhaustive hyperparameter tuning by evaluating all combinations of specified values; effective but computationally expensive for large search spaces
- **Anomaly detection** — identifying data points that deviate significantly from the majority of the data, with applications in fraud detection and system monitoring

**Why it matters:** At Mid level, you will encounter these terms in library documentation, code reviews, and model evaluation conversations. Having clean definitions anchored by visual examples accelerates the integration of these concepts into working memory.

---

## Note: Scikit-Learn Course

> ⚠️ No auto-transcript available for this video. Watch it for supplementary context.

The [Scikit-Learn Course – Machine Learning in Python – freeCodeCamp](https://www.youtube.com/watch?v=pqNCD_5r0IU) is a comprehensive hands-on walkthrough of Scikit-learn's API covering preprocessing, model training, cross-validation, and pipelines. Work through it alongside the Kaggle Intermediate ML course for maximum practical reinforcement.

---

## Feature Engineering – Encoding, Scaling and Creating New Features

Feature engineering is the process of transforming raw data into representations that make it easier for a machine learning algorithm to learn. The algorithm itself is constrained; it can only work with what you give it. Thoughtful feature engineering often produces larger performance gains than switching to a more complex algorithm.

Raw data rarely arrives in a form that ML models can consume directly. Categorical variables must be converted to numbers. Continuous variables with very different ranges can cause gradient-based algorithms to converge slowly or unevenly. New features can be derived by combining existing ones, extracting date components, applying domain knowledge, or capturing non-linear relationships that a linear model would otherwise miss.

**Why it matters:**
The quality of your features determines the ceiling of your model's performance. No algorithm can extract a signal that is not represented in the input. Feature engineering is where domain knowledge meets machine learning, and it is frequently the difference between a model that works in a demo and one that works in production.

**Key things to understand:**
- One-hot encoding converts a categorical variable with k categories into k binary columns. It is appropriate for nominal categories with no inherent order. Beware of high-cardinality columns that produce hundreds of new columns.
- Ordinal encoding assigns integers to ordered categories (e.g., low=1, medium=2, high=3). Using it on nominal categories implies a false ordering that can confuse the model.
- \`StandardScaler\` (z-score standardisation) rescales features to zero mean and unit variance. \`MinMaxScaler\` rescales values to a fixed range, typically 0 to 1. Tree-based models do not require scaling; linear models and neural networks do.
- Creating interaction features (e.g., price per square metre from price and area) can expose relationships that neither column reveals alone.

**Common pitfalls:**
- Fitting the scaler or encoder on the entire dataset before splitting into train and test sets, causing data leakage.
- Generating too many features without understanding their relevance, increasing dimensionality and the risk of overfitting.
- Forgetting to apply the same transformations to new data at inference time, causing training-serving skew.
- Using mean imputation for missing values without checking whether missingness is informative.

---

## ML Algorithm Families – When to Use What

There is no single best machine learning algorithm. Each family of algorithms makes different assumptions about the data and is suited to different problem types, dataset sizes, and interpretability requirements. Understanding the trade-offs helps you select a reasonable starting point and explain your choice to stakeholders.

Linear models (logistic regression, linear regression, Ridge, Lasso) are fast, interpretable, and work well when the relationship between features and target is approximately linear. Tree-based models (decision trees, random forests, gradient boosting) handle non-linear relationships and interactions between features naturally and require less preprocessing. Support vector machines work well in high-dimensional spaces but can be slow on large datasets. Neural networks excel at unstructured data (images, text, audio) but require large amounts of data and are harder to interpret.

**Why it matters:**
Selecting an appropriate algorithm — and being able to justify that choice — is a core skill. Using an overly complex model wastes time and increases the risk of overfitting; using an overly simple model leaves predictive power on the table. Understanding algorithm families lets you navigate this trade-off deliberately.

**Key things to understand:**
- For tabular data in most business problems, gradient boosting (XGBoost, LightGBM, CatBoost) is a strong default choice because it handles mixed data types, missing values, and non-linear relationships.
- For interpretability requirements, linear models or shallow decision trees are easier to explain to non-technical audiences.
- Clustering algorithms (k-means, DBSCAN, hierarchical clustering) are used for unsupervised problems where no label exists.
- Dimensionality reduction algorithms (PCA, UMAP) are used to reduce the number of features while preserving as much information as possible.

**Common pitfalls:**
- Defaulting to the most complex model available without establishing a simpler baseline first.
- Applying a classification algorithm to a regression problem or vice versa, which produces meaningless results.
- Ignoring class imbalance when using algorithms that optimise accuracy, leading to a model that always predicts the majority class.
- Choosing an algorithm based on intuition and never revisiting the choice after seeing evaluation results.

---

## Model Evaluation and Cross-Validation

A model that performs perfectly on training data but fails on unseen data has learned to memorise rather than generalise. Rigorous evaluation is what separates a model that will work in production from one that only appears to work. The choice of evaluation metric and the evaluation strategy are both critical decisions.

For classification, common metrics include accuracy, precision, recall, F1-score, and the area under the ROC curve (AUC-ROC). Accuracy is misleading when classes are imbalanced. Precision measures how many predicted positives are actually positive; recall measures how many actual positives were correctly identified. The choice between them depends on the cost of false positives versus false negatives in your specific context.

For regression, common metrics include mean absolute error (MAE), mean squared error (MSE), root mean squared error (RMSE), and R-squared. MSE penalises large errors more heavily than MAE because of the squaring; choose the metric that matches how much you care about extreme errors.

**Why it matters:**
A model that looks good during development but fails in production is worse than no model at all, because it creates false confidence. Rigorous evaluation disciplines you to measure what actually matters — generalisation to new data — rather than what is easy to measure.

**Key things to understand:**
- K-fold cross-validation trains and evaluates the model k times on different splits of the data, giving a more reliable estimate of generalisation performance than a single train/test split.
- Stratified k-fold ensures each fold preserves the class distribution, which is important for imbalanced classification problems.
- Leave-one-out cross-validation (LOOCV) is a special case where k equals the number of samples; each observation serves as its own test set. It gives nearly unbiased estimates but is computationally expensive for large datasets.
- The test set must be held out until the very end of development. Using it to tune hyperparameters converts it into a de facto validation set and produces overly optimistic estimates.

**Common pitfalls:**
- Reporting only training accuracy or loss, which tells you nothing about generalisation.
- Using accuracy as the sole metric for an imbalanced problem where 95% of examples belong to one class.
- Performing hyperparameter tuning on the test set, inflating performance estimates.
- Forgetting to shuffle data before splitting, especially for time-ordered datasets where shuffling would constitute data leakage.

---

## Overfitting – Detection and Regularisation

Overfitting occurs when a model learns the training data too well, capturing noise and idiosyncrasies rather than the underlying pattern. An overfit model has low training error but high test error. It fails to generalise because it has effectively memorised the training set. Underfitting is the opposite: the model is too simple to capture the signal in the data, resulting in high error on both training and test sets.

Regularisation is the set of techniques used to reduce overfitting by penalising model complexity. L1 regularisation (Lasso) adds a penalty proportional to the absolute value of the model weights, which tends to drive some weights all the way to zero — effectively removing those features. This makes Lasso useful for automatic feature selection. L2 regularisation (Ridge) adds a penalty proportional to the square of the weights, which shrinks all weights toward zero but rarely eliminates them entirely.

**Why it matters:**
A model that cannot generalise is not a useful model. Overfitting is the most common failure mode in machine learning, and regularisation is the primary tool for controlling it. Understanding why a model overfits — and which regularisation technique to apply — is essential for building models that perform reliably outside the training set.

**Key things to understand:**
- Learning curves (plotting training and validation error as a function of training set size) are the most direct way to diagnose overfitting and underfitting.
- Dropout is a regularisation technique specific to neural networks: randomly setting a proportion of neurons to zero during each training step forces the network to learn redundant representations.
- Early stopping halts training when validation performance stops improving, preventing overfitting in iterative algorithms such as gradient boosting and neural networks.
- Collecting more training data is often the most effective remedy for overfitting, more so than tuning regularisation hyperparameters.

**Common pitfalls:**
- Tuning model complexity or regularisation strength by observing test set performance, which defeats the purpose of the test set.
- Applying regularisation without scaling features first, because regularisation penalties are scale-dependent.
- Confusing model complexity with number of parameters: a highly regularised model with many parameters can underfit, while a less regularised model with fewer parameters can overfit.
- Assuming that cross-validation eliminates the risk of overfitting; it reduces it but does not eliminate it if you tune hyperparameters across many rounds.

---

## Relational Databases – Tables, Keys and Normal Forms

A relational database organises data into tables, where each table represents a single entity type and each row is one instance of that entity. Tables are linked through keys: a primary key uniquely identifies each row within its table, and a foreign key in one table references the primary key of another, establishing a relationship between them.

Data scientists need to understand relational databases because most enterprise data lives in them. Being able to read a schema, understand how tables relate to each other, and write queries to extract the data you need is a prerequisite for working in a business environment.

**Why it matters:**
The data you need for analysis rarely lives in a single flat file. It is distributed across tables in a relational database, and you need to understand the schema to join it correctly. Misunderstanding table relationships leads to incorrect query results — sometimes without any error message to warn you.

**Key things to understand:**
- Normalisation is the process of organising a database to reduce redundancy. The normal forms (1NF, 2NF, 3NF) define progressively stricter rules about how data should be structured. In practice, understanding why data is split into multiple tables helps you write correct joins.
- A one-to-many relationship is the most common: one customer can have many orders. A many-to-many relationship (e.g., students and courses) requires a junction table.
- Indices speed up queries but add overhead on writes. Understanding when indices exist and how they are used helps you write efficient queries.
- NULL in SQL is not a value but the absence of a value. Comparisons with NULL using \`=\` always return NULL (unknown), not true or false. Use \`IS NULL\` or \`IS NOT NULL\` instead.

**Common pitfalls:**
- Joining on a column that is not unique in one of the tables, causing row multiplication (a Cartesian product effect).
- Treating a foreign key column as reliably populated when it can contain NULLs, causing records to be silently dropped in inner joins.
- Pulling entire large tables into memory in Python to do a join that could have been done in SQL, wasting memory and network bandwidth.
- Confusing the logical schema (what the data represents) with the physical schema (how it is stored), which can lead to misinterpreting query results.

---

## SQL for Data Science – Aggregations, Joins, Window Functions

SQL is the standard language for querying relational databases. For a data scientist, SQL is both an extraction tool (getting data out of a database for analysis) and an analysis tool in its own right. Many aggregations and transformations that you might perform in Pandas can be pushed down to the database, where they run more efficiently on large datasets.

Aggregation functions (COUNT, SUM, AVG, MIN, MAX) summarise groups of rows into a single value. GROUP BY determines what the groups are. HAVING filters groups after aggregation, analogous to WHERE filtering rows before aggregation. Joins combine rows from two or more tables based on a matching condition. Window functions perform calculations across a set of rows related to the current row without collapsing them into a single value, making them far more powerful than GROUP BY for many analytical queries.

**Why it matters:**
SQL is a non-negotiable skill for any data scientist working in a business context. Being able to write efficient queries means you can access the data you need quickly, perform aggregations close to the source, and avoid pulling unnecessary data across the network into Python.

**Key things to understand:**
- INNER JOIN returns only rows with matching values in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right; unmatched rows have NULLs for right-table columns.
- Window functions use the OVER clause to define the partition and ordering. ROW_NUMBER, RANK, LAG, LEAD, and running totals are common use cases.
- CTEs (Common Table Expressions, defined with the WITH keyword) make complex queries more readable by breaking them into named intermediate steps.
- Query execution order is not the same as the order you write clauses: FROM and JOIN are processed first, then WHERE, then GROUP BY, then HAVING, then SELECT, then ORDER BY.

**Common pitfalls:**
- Using SELECT * in queries that retrieve large tables into memory, transferring far more data than needed.
- Placing an aggregation condition in WHERE instead of HAVING, causing a syntax error or incorrect results.
- Writing a subquery that runs once per row of the outer query (a correlated subquery) when a join or window function would be dramatically faster.
- Forgetting that NULL values are excluded from most aggregate functions, which can cause counts and averages to silently undercount.

---

## Intermediate ML – Ensembles, Gradient Boosting and Stacking

Ensemble methods combine the predictions of multiple models to produce a single prediction that is typically more accurate and more robust than any individual model. The intuition is that different models make different errors; by combining them, errors can cancel out. The three main ensemble strategies are bagging, boosting, and stacking.

Bagging trains multiple instances of the same algorithm on different random subsets of the training data and averages their predictions. Random forests are the canonical example. Boosting trains models sequentially, where each model focuses on the examples the previous models got wrong. Gradient boosting (XGBoost, LightGBM, CatBoost) is the most widely used boosting approach in practice and consistently wins tabular data competitions. Stacking trains a meta-model that takes the predictions of several base models as its input features.

**Why it matters:**
Ensemble methods are consistently among the best-performing approaches on structured tabular data. Understanding how and why they work — and their failure modes — is what lets you use them confidently rather than treating them as a black box that you tune until something works.

**Key things to understand:**
- Gradient boosting is sensitive to hyperparameters (learning rate, number of trees, tree depth, regularisation). A low learning rate with more trees generally outperforms a high learning rate with fewer trees, at the cost of training time.
- Random forests are less prone to overfitting than gradient boosting because of their parallel bagging approach, making them a lower-risk default.
- Stacking requires careful cross-validation to avoid leakage: the base model predictions used to train the meta-model must come from out-of-fold predictions, not in-sample predictions.
- Feature importance from tree-based ensembles can be misleading for highly correlated features, because importance is split between correlated features rather than attributed to one.

**Common pitfalls:**
- Using gradient boosting with its default hyperparameters on a small dataset and assuming the defaults are appropriate.
- Adding more models to a stack without checking whether they contribute diversity; correlated models do not improve ensemble performance.
- Interpreting ensemble feature importance as a causal explanation rather than a measure of predictive contribution.
- Neglecting the cost of inference: a large ensemble may be too slow to serve predictions in a real-time system.

---

## A/B Testing and Experiment Design

A/B testing is a controlled experiment where you split a population into a control group (which experiences no change) and a treatment group (which experiences the change you want to evaluate). By comparing the outcome metric between the two groups, you can determine whether the change had a statistically significant effect. Experiment design is the discipline of setting up these tests so that the results are valid and actionable.

**Why it matters:**
Data scientists in insurance are frequently asked to evaluate changes — a new pricing model, a revised policy wording, a marketing campaign — and determine whether they actually work. A/B testing provides the rigorous framework for answering "did this change make a difference?" without being misled by noise, trends, or confirmation bias.

**Key things to understand:**
- Sample size must be calculated before the experiment starts, based on the expected effect size, the desired statistical power (typically 80%), and the significance level. Running an experiment with too few observations wastes time because you cannot detect a real effect even if one exists.
- Statistical power is the probability of detecting an effect when one truly exists. Low power means a high risk of false negatives (concluding "no effect" when there is one).
- Peeking at results before the predetermined sample size is reached and stopping early when results look significant inflates the false positive rate. Define the stopping rule before the experiment begins and follow it.
- When testing multiple variants or metrics simultaneously, the probability of at least one false positive increases. Apply corrections such as the Bonferroni method (dividing the significance threshold by the number of comparisons) to control for this.
- In insurance contexts, A/B tests are used to evaluate pricing model changes on conversion and loss ratios, test marketing interventions for cross-selling, and assess the impact of policy or process changes on customer behaviour.

**Common pitfalls:**
- Stopping an experiment as soon as the p-value drops below 0.05 rather than waiting for the pre-determined sample size, which dramatically increases the false positive rate.
- Failing to account for multiple comparisons when testing several metrics or variants, leading to spurious "significant" results.
- Not checking that control and treatment groups are properly randomised, which introduces selection bias and invalidates the results.
- Ignoring practical significance: a statistically significant effect that is too small to matter operationally does not justify the cost of implementation.

---

## AI-Assisted Analysis – Practical Use in Data Science Workflows

AI tools, particularly large language models, have become practical aids in data science work. They can accelerate code writing, explain unfamiliar APIs and error messages, suggest analytical approaches, and help draft summaries of findings. Used thoughtfully, they compress the time between a question and a working prototype.

The key to using these tools effectively is understanding their limitations. Language models generate plausible-sounding output, but they do not execute code or check their own answers against data. They can hallucinate function names, invent parameter values, or suggest approaches that are subtly wrong for your specific context. The data scientist remains responsible for verifying every output.

**Why it matters:**
AI-assisted development is rapidly becoming a baseline expectation, not an advanced skill. Data scientists who use these tools effectively work faster. Those who use them carelessly introduce subtle bugs and incorrect analysis into their work. The skill is knowing how to use them appropriately.

**Key things to understand:**
- AI tools are most reliable for well-defined, bounded tasks: writing boilerplate code, translating between SQL and Pandas, explaining what a specific function does, or generating a starting point for a visualisation.
- For analysis-level tasks (interpreting model results, drawing conclusions from data), AI-generated text should be treated as a draft that requires domain expert review.
- Providing clear, specific prompts with relevant context (column names, dataset description, what you have already tried) produces much better results than vague requests.
- Code generated by AI tools must be tested. Run it on a small representative sample, inspect the output, and verify it matches your expectation before applying it to the full dataset.

**Common pitfalls:**
- Copying AI-generated code into a notebook without reading it, missing bugs or inappropriate assumptions.
- Using AI tools to summarise or interpret data without having inspected the data yourself, potentially missing context the model cannot see.
- Treating AI suggestions as authoritative; the model does not know your business context, data quirks, or the history of previous analytical decisions.
- Sharing sensitive or proprietary data in prompts without checking your organisation's data handling policies for the tool in question.

---

## Time-Series Analysis and Forecasting

Time-series analysis deals with data points collected over time — measurements where the order matters. Unlike cross-sectional data (where each observation is independent), time-series data has inherent temporal structure: trends, seasonality, autocorrelation, and non-stationarity. Forecasting future values based on historical patterns is one of the most practical applications of data science in insurance.

In an insurance context, time-series data is everywhere: monthly claims volumes, daily premium income, quarterly loss ratios, seasonal patterns in car accidents or water damage claims, and reserve development over time. Being able to model and forecast these patterns supports pricing, reserving, capacity planning, and fraud detection.

**Why it matters:**
Time-series forecasting is one of the most directly valuable skills for a data scientist in insurance. Accurate forecasts of claims frequency, severity, and reserve development directly impact financial planning and regulatory reporting. Understanding the temporal structure of your data prevents you from applying cross-sectional methods where they do not apply.

**Key things to understand:**
- Stationarity: a time series is stationary when its statistical properties (mean, variance) do not change over time. Most forecasting methods assume stationarity, so you must detect and handle trends and seasonality first (differencing, decomposition)
- ARIMA (AutoRegressive Integrated Moving Average): the classical framework for time-series modelling. AR models use past values, MA models use past errors, and the I (integrated) part handles differencing for non-stationary series. Understanding ARIMA builds intuition even if you use more modern methods
- Prophet (by Meta): a practical, robust forecasting tool designed for business time series with strong seasonal patterns and missing data. It handles holidays, changepoints, and multiple seasonalities automatically. Good default choice for business forecasting tasks
- Seasonality: recurring patterns at fixed intervals (weekly, monthly, yearly). Insurance claims often show strong seasonality — water damage peaks in spring, traffic accidents increase in winter
- Train/test splitting for time series: you cannot randomly split time-series data. The test set must be the most recent observations, and the training set must precede it temporally. Cross-validation must also respect temporal ordering (expanding window or sliding window)
- Evaluation metrics: MAE (Mean Absolute Error), RMSE (Root Mean Squared Error), MAPE (Mean Absolute Percentage Error). Always compare against a naive baseline (e.g., "same as last year") to verify your model adds value

**Common pitfalls:**
- Using random train/test splits on time-series data, which leaks future information into the training set and produces overly optimistic evaluation metrics
- Ignoring stationarity and applying methods that assume it without checking — leading to spurious results and unreliable forecasts
- Overfitting to historical patterns that do not repeat — pandemic effects, regulatory changes, or one-time events should not be extrapolated
- Not accounting for external regressors (weather, economic indicators) that explain variation better than the time series alone

---

## Class Imbalance

Class imbalance occurs when one class in a classification problem significantly outnumbers the other. In insurance, this is the norm rather than the exception: fraud is rare (perhaps 1–5% of claims), customer churn affects a minority of policyholders, and catastrophic claims are infrequent. Standard classification algorithms trained on imbalanced data tend to predict the majority class almost exclusively, achieving high accuracy but failing to detect the minority class that you actually care about.

**Why it matters:**
If you train a fraud detection model on a dataset where 2% of claims are fraudulent, a model that simply predicts "not fraud" for every claim achieves 98% accuracy — and catches zero fraud. Class imbalance handling is essential for building models that are actually useful for the minority-class problems that dominate insurance data science.

**Key things to understand:**
- SMOTE (Synthetic Minority Oversampling Technique): generates synthetic examples of the minority class by interpolating between existing minority examples. imbalanced-learn provides SMOTE and its variants (Borderline-SMOTE, SMOTE-ENN). Always apply SMOTE only to the training set, never the test set
- Threshold tuning: instead of using the default 0.5 classification threshold, adjust the threshold to balance precision and recall for your specific business needs. A fraud detection model might use a lower threshold (0.3) to catch more fraud at the cost of more false positives
- Precision-recall trade-off: precision (of predicted frauds, how many are actually fraud?) and recall (of actual frauds, how many did the model catch?). Use precision-recall curves and F1/F-beta scores instead of accuracy for imbalanced problems
- Class weights: most sklearn classifiers accept a \`class_weight='balanced'\` parameter that automatically adjusts the loss function to penalise minority-class misclassification more heavily. This is often the simplest and most effective approach
- Cost-sensitive learning: when the business cost of a false negative (missing a fraud) differs greatly from a false positive (investigating a legitimate claim), incorporate these costs directly into model training or threshold selection
- Evaluation metrics: avoid accuracy. Use precision, recall, F1-score, AUC-PR (Area Under the Precision-Recall Curve), and confusion matrices. AUC-ROC can be misleading when the positive class is very rare

**Common pitfalls:**
- Reporting accuracy as the primary metric for imbalanced classification — a model can achieve 99% accuracy and be completely useless if it never detects the minority class
- Applying SMOTE to the entire dataset before splitting into train/test, which leaks synthetic information into the test set and inflates performance estimates
- Over-sampling the minority class so aggressively that the model overfits to synthetic examples and generalises poorly to real data
- Not considering the business impact of false positives — in fraud detection, every false positive means a legitimate customer is flagged for investigation, which has a cost and customer experience impact
`,
  senior: `
# Data Scientist – Senior Concept Reference

This document gives in-depth explanations of the core concepts covered in the Senior level of the Data Scientist learning path. It assumes you are comfortable with the Mid material and are ready to work on production systems, advanced AI architectures, and governance responsibilities.

---

## Video: ML Foundations for AI Engineers

> [ML Foundations for AI Engineers (34 min)](https://www.youtube.com/watch?v=BUTjcAjfMgY)

This video is aimed specifically at engineers who are familiar with building AI systems and want to solidify their understanding of the ML foundations underneath. It bridges the gap between practical ML skills and production AI engineering — which is exactly the transition Senior data scientists need to make.

Several themes in the video connect directly to senior-level work:

**Supervised learning has a ceiling imposed by human expertise.** The video uses AlphaGo as its canonical example: the supervised learning version learned from human grandmaster games and quickly became very strong — but never exceeded human grandmaster level, because it was bounded by the quality of the labels it learned from. The reinforcement learning version started poorly but, by playing itself millions of times and discovering its own strategies, eventually surpassed every human player in history. The lesson for senior practitioners is profound: when you hit the ceiling of supervised learning performance, the bottleneck is often the labelling, not the algorithm. Reinforcement learning, self-supervised learning, and synthetic data generation are the levers for going beyond that ceiling.

**Neural networks perform implicit feature engineering.** The video reinforces the key insight from the All Algorithms video: unlike linear models where a practitioner manually defines which features to include, deep neural networks automatically learn hierarchical feature representations from raw inputs. This is why they dominate image, text, and audio tasks where hand-engineering features is impractical. Understanding this distinction helps senior engineers decide when a deep learning approach is justified versus when a well-engineered tabular feature set with gradient boosting is more efficient.

**Model evaluation design is a senior-level responsibility.** At the senior level, you are not just running evaluation — you are designing the evaluation framework for the team. This includes deciding the right metrics for the business problem (not just accuracy), designing train/validation/test splits that reflect production conditions, setting evaluation standards before development begins, and communicating results to non-technical stakeholders in ways that support good decisions.

**Production ML requires operational thinking from the start.** The video emphasises that moving from research to production requires a different mindset: thinking about latency, throughput, monitoring, versioning, and graceful degradation. This directly motivates the MLOps material that follows.

**Why it matters:** Senior data scientists are expected to reason about ML systems from first principles, not just apply recipes. This video builds the foundational intuition — about learning types, feature representations, and evaluation design — that supports that deeper reasoning.

---

## MLOps – Model Deployment, Versioning, Monitoring and Retraining

MLOps (Machine Learning Operations) is the set of practices and tools that bridge the gap between experimental model development and reliable production operation. A model that performs well in a notebook is not a finished product; it needs to be packaged, versioned, deployed, monitored, and eventually retrained. Without MLOps discipline, models silently degrade in production and failures are hard to diagnose.

The core concerns of MLOps are reproducibility (can you recreate the exact model from a given point in time?), deployment (how does the model serve predictions to consumers?), monitoring (is the model still performing as expected?), and retraining (when and how does the model get updated?). These concerns map to a set of tools and practices: experiment tracking (MLflow, Azure ML), model registries, CI/CD pipelines for model retraining, and data and model drift monitoring.

**Why it matters:**
A model that works in a notebook is only a prototype. The actual product is the end-to-end system that trains, deploys, monitors, and retrains the model reliably over time. MLOps is the engineering discipline that makes that system possible. Without it, models degrade silently, reproduce inconsistently, and are expensive to update.

**Key things to understand:**
- Data drift means the distribution of input features has changed from what the model was trained on. Model drift means the relationship between inputs and outputs has changed. Both degrade model performance but require different responses.
- A model registry tracks versions of trained models along with their evaluation metrics, training data provenance, and deployment status. It is the source of truth for what is running in production.
- Containerisation (Docker) is the standard way to package a model and its dependencies so that it runs consistently across development, staging, and production environments.
- Feature stores are a mechanism for sharing and reusing feature engineering logic across teams and ensuring consistency between training-time and serving-time feature values.

**Common pitfalls:**
- Deploying a model without any monitoring in place, leaving you blind to degradation until a business stakeholder reports a problem.
- Retraining on new data without checking whether the new data is of acceptable quality, potentially making performance worse.
- Versioning the model weights but not the training code, preprocessing logic, or feature definitions, making it impossible to reproduce earlier versions.
- Treating model deployment as a one-time event rather than an ongoing operational responsibility.

---

## Retrieval-Augmented Generation (RAG) Applied to Data Science

Retrieval-Augmented Generation (RAG) combines a retrieval system with a generative language model. Instead of relying solely on the knowledge encoded in the model's weights, RAG retrieves relevant documents or data from an external store at query time and passes them to the model as context. The model then generates a response grounded in that retrieved content.

For data scientists, RAG is relevant in several scenarios: building internal knowledge assistants that answer questions about documentation or reports, augmenting analytical queries with domain context, and creating systems that can answer questions about private datasets that a general-purpose model was never trained on. RAG is often the right architectural choice when you need a model to work with proprietary or frequently-changing information, or when you need to combine structured and unstructured data sources in a single query interface.

**Why it matters:**
Most organisations have large volumes of internal documents, reports, and knowledge bases that a general-purpose LLM has never seen. RAG provides a principled way to make that private knowledge accessible through a natural language interface without fine-tuning the model or exposing sensitive data in training. It is rapidly becoming a standard component of enterprise AI systems.

**Key things to understand:**
- The retrieval component typically uses a vector database to store embeddings of documents or data chunks. At query time, the query is embedded and the closest vectors are retrieved.
- Chunking strategy (how documents are split before embedding) has a large impact on retrieval quality. Chunks that are too large include irrelevant content; chunks that are too small lose context.
- The quality of the embedding model determines how semantically accurate retrieval is. Using a general-purpose embedding model may underperform a domain-specific one for specialised content.
- RAG does not eliminate hallucination; the model can still generate content that is inconsistent with the retrieved context. Evaluation of RAG systems requires measuring both retrieval quality and generation quality separately.

**Common pitfalls:**
- Treating RAG as a drop-in solution for any knowledge problem without evaluating whether the retrieval step is actually finding the right content.
- Neglecting to filter or rank retrieved chunks before passing them to the model, leading to context windows filled with marginally relevant material.
- Assuming that a RAG system is more accurate than a fine-tuned model in all cases; the right choice depends on how frequently the knowledge changes and the volume of proprietary data.
- Ignoring latency: retrieval and embedding generation add round-trip time. For real-time applications this must be profiled and optimised.

---

## Context Engineering for Data Applications

Context engineering is the discipline of deliberately designing the information that is passed to a language model at inference time in order to maximise the quality and relevance of its output. It goes beyond prompt writing to include decisions about what data to include, how to structure and format it, how much context to provide, and how to handle the limitations of the model's context window.

In data science applications, context engineering matters because models are stateless: every call starts fresh. If you want a model to reason about a specific dataset, query result, or business problem, all the relevant information must be in the context. The design of that context determines whether the model produces a useful answer or a generic one.

**Why it matters:**
The same underlying model can produce dramatically different outputs depending on how its context is constructed. Context engineering is the lever that determines whether an LLM integration is genuinely useful or merely impressive in a demo. It is a practical engineering discipline, not a soft skill, and it compounds: well-engineered contexts are reusable, testable, and versionable.

**Key things to understand:**
- System prompts define the model's role, constraints, output format, and relevant background. They are part of the context and should be treated as engineering artefacts, not afterthoughts.
- Structured context (presenting data as a formatted table or JSON rather than prose) improves the model's ability to reason over it accurately.
- Context window limits require prioritisation: when relevant information exceeds what fits, you must choose what to include and in what order. Recent or highly relevant content should generally appear closer to the query.
- Few-shot examples embedded in the context can steer output format and reasoning style more reliably than instructions alone.

**Common pitfalls:**
- Writing a prompt once and never iterating, even when outputs are inconsistent or incorrect. Context engineering requires experimentation and evaluation.
- Overloading the context with every potentially relevant piece of information, which degrades performance and increases cost.
- Failing to version and track prompts and context templates alongside model versions, making it impossible to diagnose which change caused a regression in output quality.
- Assuming that longer context always produces better results; models can lose attention to information buried in the middle of a long context window.

---

## LangGraph – Building Data-Aware Agent Workflows

LangGraph is a framework for building stateful, multi-step agent workflows using language models. While simple chains execute a fixed sequence of steps, LangGraph enables branching, looping, and conditional logic, making it suitable for workflows where the sequence of steps depends on intermediate outputs or external tool calls.

For data scientists, LangGraph is relevant for building agentic systems that can reason over data: workflows that query a database, inspect the results, decide whether to refine the query, invoke a calculation, and then synthesise an answer. These patterns move beyond single-shot prompting toward systems that can handle multi-step analytical tasks.

**Why it matters:**
Many real analytical tasks require more than a single model call: they require iteration, tool use, conditional branching, and the ability to recover from partial failures. LangGraph provides the primitives to build such workflows in a structured, inspectable way. For data scientists building AI-powered data products, it is an important step beyond basic prompt engineering.

**Key things to understand:**
- LangGraph models workflows as directed graphs where nodes are functions or agent steps and edges define the flow of control. Conditional edges allow the graph to branch based on the state at runtime.
- State is an explicit, typed object that is passed between nodes and persisted across steps. Designing the state schema carefully is one of the most important decisions in building a LangGraph application.
- Tool calling is the mechanism by which agents interact with external systems: databases, APIs, code executors, or retrieval systems. Each tool is defined with a name, description, and input schema that the model uses to decide when and how to call it.
- Human-in-the-loop patterns allow a LangGraph workflow to pause at defined points, present its current state to a human, and resume after receiving approval or correction. This is important for high-stakes data decisions.

**Common pitfalls:**
- Designing workflows with insufficient error handling, so that a single failed tool call causes the entire workflow to abort without a useful error message.
- Building agents that loop indefinitely when no termination condition is met, consuming tokens and compute without producing an output.
- Giving tools descriptions that are ambiguous or overlapping, causing the model to call the wrong tool or repeatedly call tools unnecessarily.
- Not logging the full execution trace of agent workflows, making debugging very difficult when something goes wrong.

---

## AI Architecture Patterns for Data Products

As AI capabilities mature, data products increasingly combine traditional machine learning with language models, retrieval systems, and agentic workflows. Understanding the established architectural patterns helps senior data scientists design systems that are maintainable, scalable, and appropriate for the problem at hand rather than reaching for the most complex solution.

Key patterns include: the pipeline pattern (linear sequence of data transformations and model calls), the RAG pattern (retrieval-augmented generation as described above), the agent pattern (an LLM with tool access that plans and executes multi-step tasks), the multi-agent pattern (coordinating multiple specialised agents for parallel or sequential subtasks), and the human-in-the-loop pattern (inserting human review or approval at defined points in a workflow).

**Why it matters:**
Architecture decisions made early in a project are expensive to reverse later. Choosing a multi-agent pattern for a problem that a simple pipeline could solve adds unnecessary complexity and cost. Conversely, choosing a pipeline for a problem that requires adaptive reasoning leads to brittle, hard-to-maintain workarounds. Pattern literacy lets you make that choice deliberately.

**Key things to understand:**
- Pattern selection should be driven by the complexity of the problem, not by novelty. A simple pipeline is easier to test, monitor, and debug than a multi-agent system and is preferable when it is sufficient.
- Observability is an architectural requirement, not an afterthought. Every AI system should emit logs and traces that allow you to reconstruct what happened in any given execution.
- Cost and latency are first-class design constraints. Each LLM call has a financial and temporal cost; architecture decisions that minimise unnecessary calls without degrading output quality are important.
- Fallback and graceful degradation strategies should be designed into the system: what happens if a model call fails, returns an unhelpful response, or exceeds the latency budget?

**Common pitfalls:**
- Choosing a multi-agent architecture for a task that a single well-prompted model or a simple pipeline could handle, adding unnecessary complexity.
- Designing a system with no mechanism to update or redeploy components independently, making iterative improvement expensive.
- Failing to account for the different failure modes of AI components (non-deterministic outputs, context-dependent behaviour) compared to traditional software components.
- Ignoring the downstream consumers of the data product when designing the interface, leading to integration problems after the system is built.

---

## LLM Security – Risks Relevant to a Data Scientist

Language models introduce security risks that are distinct from those of traditional software. A data scientist integrating an LLM into a data pipeline or analytical tool must understand these risks in order to design systems that are resilient to exploitation and that protect sensitive data.

The most significant risks are prompt injection (an attacker embeds instructions in external content that the model processes, hijacking its behaviour), data exfiltration via model outputs (the model inadvertently reveals sensitive information from its context or training), insecure tool use (an agent with database or API access is manipulated into performing unauthorised operations), and supply chain risks from third-party models or plugins.

**Why it matters:**
LLM-integrated systems process untrusted external content and often have access to sensitive databases, APIs, and internal tools. This makes them a high-value target for adversarial manipulation. Understanding LLM-specific attack vectors — particularly prompt injection — is essential before connecting any language model to data systems with real business impact.

**Key things to understand:**
- Prompt injection can occur through any external content that enters the model's context: user inputs, retrieved documents, database values, API responses, or file contents. Treat all external content as untrusted.
- The principle of least privilege applies to agent tool access just as it does to traditional software. An agent that only needs to read a specific table should not have credentials to write to any table or to access other systems.
- Output validation is a defensive layer: checking that model outputs conform to an expected format, range, or schema before acting on them can prevent injected instructions from producing harmful downstream effects.
- Logging all inputs and outputs of LLM calls is essential for security auditing and incident investigation. Ensure logs do not themselves contain sensitive data in plaintext.

**Common pitfalls:**
- Assuming that security review is unnecessary for a system that uses an LLM only internally, without user-facing inputs. Internal data pipelines can still be vulnerable if they process content from external sources.
- Concatenating user-supplied strings directly into a system prompt without sanitisation, making prompt injection trivial.
- Storing API keys or model credentials in notebooks, scripts, or version control rather than in a secrets management system.
- Building a prototype without security considerations and then attempting to harden it before production, which is typically more expensive and less effective than designing security in from the start.

---

## AI Governance – Policy, Checklists and the Secure AI Framework

AI governance refers to the policies, processes, and accountability structures that ensure AI systems are developed and operated in a way that is responsible, compliant, and aligned with organisational values. For a senior data scientist, governance is not an abstract concern; it directly affects what you can build, how you can use data, and what approvals are required before deploying a model.

Key governance dimensions include data privacy and consent (are you authorised to use this data for this purpose?), fairness and bias (does the model treat different groups equitably?), transparency (can the model's decisions be explained to affected parties?), accountability (who is responsible if the model causes harm?), and compliance (does the system meet applicable legal and regulatory requirements?).

**Why it matters:**
Governance failures in AI systems — biased decisions, privacy breaches, unintended discrimination — can cause real harm to real people and carry significant legal and reputational consequences for the organisation. Senior data scientists who understand governance requirements can design systems that avoid these failures from the outset, rather than discovering them at the point of deployment.

**Key things to understand:**
- A Secure AI Framework (SAIF) provides a structured set of controls for securing AI systems across their lifecycle: data ingestion, model training, deployment, and monitoring. Applying it means asking specific security questions at each stage rather than treating security as a post-hoc review.
- AI checklists operationalise governance requirements into concrete questions that must be answered before a project proceeds to the next stage. They are tools for making governance practical rather than aspirational.
- Risk tiering is the practice of applying different levels of scrutiny to AI systems based on their potential impact. A model that affects credit decisions requires more rigorous oversight than a model that recommends internal search results.
- Model cards and datasheets for datasets are documentation artefacts that capture the intended use, limitations, evaluation results, and known risks of a model or dataset. Producing them is increasingly a governance requirement.

**Common pitfalls:**
- Treating governance as a final approval gate rather than an ongoing process integrated throughout the project lifecycle, which leads to expensive rework when issues are identified late.
- Conflating legal compliance with ethical responsibility: a system can be legally compliant but still produce outcomes that are unfair or harmful.
- Ignoring governance requirements for internal tools on the assumption that they will never be customer-facing, when internal decisions can still affect customers indirectly.
- Delegating governance entirely to a separate team rather than embedding governance thinking into the day-to-day decisions of the data science team itself.

---

## Explainable AI (XAI)

Explainable AI (XAI) refers to methods and techniques that make the outputs of machine learning models understandable to humans. As ML models are increasingly used to make consequential decisions — insurance pricing, claims approval, risk assessment — the ability to explain why a model made a particular prediction becomes as important as the prediction itself.

SHAP (SHapley Additive exPlanations) is the most widely adopted explanation framework. Based on cooperative game theory (Shapley values), SHAP assigns each feature an importance value for a particular prediction. It provides both local explanations (why did the model predict X for this specific customer?) and global explanations (which features are most important across all predictions?).

LIME (Local Interpretable Model-agnostic Explanations) takes a different approach: it creates a simple, interpretable model (like linear regression) that approximates the complex model's behaviour in the neighbourhood of a specific prediction. LIME is model-agnostic and faster than exact SHAP computation, but its explanations can be less stable.

**Why it matters:**
In insurance, model explainability is not optional. Swedish and EU regulations increasingly require that automated decisions affecting individuals can be explained. Customers have the right to understand why their premium was set at a particular level or why a claim was flagged. Beyond compliance, explainability builds trust with business stakeholders, helps data scientists debug models, and enables domain experts to validate that models are learning genuine patterns rather than spurious correlations.

**Key things to understand:**
- SHAP values: for a given prediction, SHAP assigns each feature a value representing its contribution to pushing the prediction away from the average. Positive SHAP values push the prediction higher, negative values push it lower. The sum of all SHAP values plus the base value equals the model's prediction
- Global vs local explanations: global explanations summarise feature importance across the entire dataset (SHAP summary plots, feature importance rankings). Local explanations explain a single prediction (SHAP waterfall plots, force plots). Both are needed — global for model understanding, local for individual decision justification
- SHAP for tree models (TreeSHAP): an efficient algorithm for computing exact SHAP values for tree-based models (XGBoost, LightGBM, Random Forest). Much faster than the model-agnostic KernelSHAP
- LIME: creates interpretable approximations of individual predictions. Useful when exact SHAP is computationally expensive or when you need a simpler explanation format
- Interaction effects: SHAP interaction values reveal how pairs of features jointly affect predictions — important for understanding complex relationships in insurance data (e.g., age and vehicle type jointly affecting accident risk)
- Explanation consumers: different audiences need different explanation formats. A data scientist needs SHAP summary plots; a claims handler needs a plain-language explanation of why a claim was flagged; an auditor needs documented evidence that the model is not discriminatory

**Common pitfalls:**
- Treating feature importance rankings as causal explanations — SHAP shows what the model uses for predictions, not what causes the outcome. Correlated features share importance in ways that can be misleading
- Generating explanations without validating them with domain experts — a model might achieve good predictions by using proxy variables in ways that are technically valid but ethically problematic
- Using only global explanations when local explanations are what regulations and customers require
- Computing exact SHAP values for very large datasets or complex models without considering computational cost — use sampling or approximations for production systems

---

## Survival Analysis for Insurance

Survival analysis is a statistical framework for analysing time-to-event data — data where the outcome of interest is the time until a specific event occurs. In medical research, the event is often death (hence "survival" analysis), but the framework applies to any time-to-event problem. In insurance, the events are customer lapse, claims occurrence, claims settlement, equipment failure, or policy renewal.

The key challenge that survival analysis addresses is censoring: for many observations, the event has not yet occurred at the time of analysis. A customer who has been with the company for 3 years without lapsing is not a "non-event" — they simply have not lapsed yet. Standard classification or regression methods cannot handle censored observations correctly; survival analysis can.

**Why it matters:**
Insurance is fundamentally about modelling when events occur and how likely they are over time. Customer retention (when will a customer leave?), claims development (how long until a claim is settled?), and reserve estimation (how will outstanding claims develop?) are all time-to-event problems. Survival analysis provides the correct statistical framework for these questions — using standard regression or classification methods for time-to-event data produces biased and unreliable results.

**Key things to understand:**
- Censoring: right-censoring occurs when the observation period ends before the event occurs (a customer is still active when you analyse the data). Left-censoring occurs when the event may have occurred before observation began. Right-censoring is most common in insurance applications
- Kaplan-Meier estimator: a non-parametric method for estimating the survival function (the probability of surviving beyond time t). Produces the characteristic step-function survival curve. Useful for comparing survival between groups (e.g., male vs female policyholders) using the log-rank test
- Cox Proportional Hazards model: the workhorse of survival analysis. A semi-parametric model that estimates how covariates (age, policy type, claim history) affect the hazard rate (the instantaneous risk of the event occurring). The proportional hazards assumption means that covariate effects are constant over time
- Hazard function vs survival function: the hazard function describes the instantaneous risk of the event at time t, given survival up to that point. The survival function describes the probability of the event not having occurred by time t. They are mathematically related — knowing one gives you the other
- lifelines: a Python library that implements Kaplan-Meier, Cox PH, and other survival models with a scikit-learn-compatible API. It handles censored data natively and provides plotting, statistical tests, and model diagnostics
- Insurance applications: customer lapse modelling (which policyholders are at risk of not renewing?), claims development (how long will it take for open claims to settle?), IBNR estimation (Incurred But Not Reported claims), and equipment/warranty failure modelling

**Common pitfalls:**
- Ignoring censored observations — dropping them from the dataset or treating them as non-events biases survival estimates downward (you underestimate the true survival time)
- Violating the proportional hazards assumption in Cox models without checking — use Schoenfeld residuals or log-log plots to verify. If violated, consider time-varying covariates or stratification
- Confusing survival analysis with simple duration calculations — the average time to event is not the median survival time when censoring is present
- Not considering competing risks — a customer who dies is not the same as a customer who lapses, but both end the observation. Competing risks models handle this correctly

---

## AI Policy — Organisational Principles

The organisation's AI Policy establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems, particularly those used in insurance pricing, claims assessment, and underwriting, require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from data scientists building predictive models to business users employing AI-assisted analytics tools.

**Why it matters:** The AI Policy is the organisation's binding commitment to responsible AI use. For data scientists, this policy directly affects how models are developed, evaluated, and deployed — particularly the requirements around fairness evaluation, model documentation, and the registration of AI use cases in the AI Register.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- GDPR obligations apply to all ML systems that process personal data — this includes training data, feature engineering, model predictions, and logged outputs.
- The policy requires transparency and explainability: affected parties must be informed when AI has influenced a decision affecting them, reinforcing the importance of the XAI practices covered earlier in this document.

**Common pitfalls:**
- Starting model development without registering the use case in the AI Register, which creates compliance risk.
- Treating the AI Policy as separate from the AI Governance practices already covered above — they are complementary, and compliance requires both.
- Assuming that research or exploratory models are exempt from the policy; any model that may influence business decisions falls under scope.

---

## Language Deep Dives

- [Python Deep Dive](/language/python) — Essential for data analysis, visualization, and modelling
- [SQL Deep Dive](/language/sql) — Query and aggregate data for analysis
`,
}
