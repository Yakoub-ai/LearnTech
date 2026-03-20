export const quizzes = {
  'ai-engineer': {
    beginner: [
      {
        question: 'What is the primary difference between Large Language Models and traditional machine learning?',
        options: [
          'LLMs use neural networks while ML uses decision trees',
          'LLMs are trained on vast amounts of text data and generate human-like text, while traditional ML is task-specific',
          'LLMs require less computational power than traditional ML',
          'LLMs only work with text data, not numerical data'
        ],
        correctIndex: 1,
        explanation: 'LLMs are trained on large text corpora and can generate coherent text and understand context, whereas traditional ML models are typically trained for specific tasks like classification or regression.'
      },
      {
        question: 'What is "prompt engineering"?',
        options: [
          'Writing code to optimize LLM model weights',
          'The practice of crafting inputs (prompts) to get desired outputs from an LLM',
          'Designing the neural network architecture of an LLM',
          'Debugging code in Python for AI applications'
        ],
        correctIndex: 1,
        explanation: 'Prompt engineering involves crafting effective prompts and input instructions to guide LLMs to produce the desired outputs.'
      },
      {
        question: 'What does REST API stand for?',
        options: [
          'Representational State Transfer Application Programming Interface',
          'Resource Exchange Service Transmission API',
          'Reliable Endpoint Service Transfer',
          'Remote Execution Service Tool'
        ],
        correctIndex: 0,
        explanation: 'REST stands for Representational State Transfer and is an architectural style for APIs that uses HTTP methods (GET, POST, PUT, DELETE).'
      },
      {
        question: 'In zero-shot prompting, what do you provide to the LLM?',
        options: [
          'Multiple examples of correct answers before the actual question',
          'Just the task description without any examples',
          'All the training data used to train the model',
          'A Python script that solves the problem'
        ],
        correctIndex: 1,
        explanation: 'Zero-shot prompting asks the LLM to perform a task without providing examples, relying only on the task description.'
      },
      {
        question: 'What is an embedding?',
        options: [
          'A Python library for creating neural networks',
          'A numerical representation of text that captures semantic meaning',
          'A web development framework for frontend applications',
          'A database connection string'
        ],
        correctIndex: 1,
        explanation: 'Embeddings are vector representations of text that capture semantic meaning, enabling similarity search and semantic understanding.'
      }
    ],
    mid: [
      {
        question: 'What is the primary purpose of context engineering in RAG systems?',
        options: [
          'To make the API faster',
          'To effectively manage and structure the information provided to an LLM to improve output quality',
          'To encrypt sensitive data',
          'To reduce the number of parameters in the model'
        ],
        correctIndex: 1,
        explanation: 'Context engineering focuses on managing how information is presented to the LLM to maximize relevance and reduce hallucinations.'
      },
      {
        question: 'In a RAG (Retrieval-Augmented Generation) pipeline, what is the "chunking" step?',
        options: [
          'Splitting large documents into smaller, manageable pieces for embedding',
          'Breaking down the user query into sub-queries',
          'Dividing the model weights into smaller units',
          'Creating backups of data chunks'
        ],
        correctIndex: 0,
        explanation: 'Chunking breaks documents into smaller pieces that are embedded and stored for efficient retrieval during the generation phase.'
      },
      {
        question: 'What is LangGraph used for?',
        options: [
          'Visualizing language patterns in text',
          'Building agent workflows with state management and conditional edges',
          'Creating graphs of neural network architectures',
          'Monitoring language model performance'
        ],
        correctIndex: 1,
        explanation: 'LangGraph is a framework for building agent applications with explicit control flow, state management, and conditional logic.'
      },
      {
        question: 'How do embeddings enable semantic search?',
        options: [
          'By converting text to images for visual comparison',
          'By storing all text in a database and comparing strings',
          'By converting text to vectors where similarity can be measured numerically',
          'By using keyword matching algorithms'
        ],
        correctIndex: 2,
        explanation: 'Embeddings convert text into high-dimensional vectors where cosine similarity and other distance metrics can measure semantic relatedness.'
      },
      {
        question: 'What is the transformer architecture used for in LLMs?',
        options: [
          'Converting data between file formats',
          'Processing text in parallel with attention mechanisms to understand relationships between words',
          'Transforming raw images into text',
          'Converting embeddings back into text'
        ],
        correctIndex: 1,
        explanation: 'Transformers use self-attention mechanisms to process tokens in parallel and capture long-range dependencies in text.'
      }
    ],
    senior: [
      {
        question: 'What is a "prompt injection" vulnerability?',
        options: [
          'When the LLM refuses to follow instructions',
          'When a user tries to manipulate an LLM by inserting malicious instructions into the prompt',
          'When the API rate limit is exceeded',
          'When embeddings fail to generate'
        ],
        correctIndex: 1,
        explanation: 'Prompt injection attacks attempt to override an LLMs instructions by embedding malicious prompts, potentially bypassing safety guardrails.'
      },
      {
        question: 'What are RAGAS metrics used for?',
        options: [
          'Measuring API response latency',
          'Evaluating the quality of RAG pipelines through systematic metrics',
          'Counting the number of tokens in a response',
          'Testing the speed of embedding generation'
        ],
        correctIndex: 1,
        explanation: 'RAGAS (Retrieval-Augmented Generation Assessment) provides metrics to evaluate RAG system quality including faithfulness, context relevance, and answer relevance.'
      },
      {
        question: 'When is fine-tuning more appropriate than prompt engineering or RAG?',
        options: [
          'Always, for maximum performance',
          'When you need to change fundamental model behavior or knowledge for domain-specific tasks',
          'When you want to reduce latency',
          'When using open-source models only'
        ],
        correctIndex: 1,
        explanation: 'Fine-tuning is suitable when prompt engineering and RAG cannot achieve the desired behavior, and you need to adapt the model to specific domains.'
      },
      {
        question: 'What is LoRA (Low-Rank Adaptation)?',
        options: [
          'A method to reduce costs by using fewer GPUs',
          'A technique to fine-tune large models efficiently by only training low-rank decomposition matrices',
          'A data storage format',
          'A tokenization algorithm'
        ],
        correctIndex: 1,
        explanation: 'LoRA enables efficient fine-tuning by training only low-rank decomposition matrices rather than full model weights, reducing memory and compute.'
      },
      {
        question: 'In the context of enterprise AI governance, what should an AI checklist include?',
        options: [
          'Only performance metrics',
          'Legal and compliance considerations, security reviews, bias assessments, and deployment approval steps',
          'Just the names of team members',
          'Only cost estimates'
        ],
        correctIndex: 1,
        explanation: 'Enterprise AI checklists should cover risk assessment, compliance, security, bias, explainability, and deployment approval to ensure responsible AI.'
      }
    ]
  },

  'backend-developer': {
    beginner: [
      {
        question: 'What is the primary purpose of an API?',
        options: [
          'To store data on your computer',
          'To allow applications to communicate and exchange data',
          'To encrypt passwords',
          'To compile code'
        ],
        correctIndex: 1,
        explanation: 'An API (Application Programming Interface) defines how software components interact and exchange data.'
      },
      {
        question: 'What does HTTP stand for?',
        options: [
          'HyperText Transfer Protocol',
          'High Technology Transport Process',
          'Home Transfer Terminal Protocol',
          'Hyper Transfer Transmission Platform'
        ],
        correctIndex: 0,
        explanation: 'HTTP is the protocol used for transferring data on the web.'
      },
      {
        question: 'What is the difference between a GET and POST request?',
        options: [
          'GET is faster than POST',
          'GET retrieves data, POST sends data',
          'POST is more secure than GET',
          'They are identical'
        ],
        correctIndex: 1,
        explanation: 'GET requests retrieve data from the server, while POST requests submit data to the server.'
      },
      {
        question: 'What is a database?',
        options: [
          'A type of server software',
          'An organized collection of structured data stored and accessed electronically',
          'A programming language',
          'A web server'
        ],
        correctIndex: 1,
        explanation: 'A database is an organized system for storing and managing structured data efficiently.'
      },
      {
        question: 'What does OOP stand for in programming?',
        options: [
          'Object-Oriented Programming',
          'Online Operating Platform',
          'Open Object Process',
          'Organized Operational Procedures'
        ],
        correctIndex: 0,
        explanation: 'OOP is a programming paradigm based on objects and classes.'
      }
    ],
    mid: [
      {
        question: 'What is an ORM?',
        options: [
          'A testing framework',
          'Object-Relational Mapping tool that lets you interact with databases using objects',
          'A deployment tool',
          'A caching system'
        ],
        correctIndex: 1,
        explanation: 'ORMs abstract database interactions, allowing you to work with objects instead of raw SQL queries.'
      },
      {
        question: 'What is JWT authentication?',
        options: [
          'A JavaScript testing framework',
          'JSON Web Token - a stateless authentication mechanism',
          'Java Web Template language',
          'JavaScript Widget Toolkit'
        ],
        correctIndex: 1,
        explanation: 'JWT is a token-based authentication standard that is stateless and can be used across distributed systems.'
      },
      {
        question: 'What does CAP theorem state about distributed systems?',
        options: [
          'Systems need capitals letters in code',
          'You can achieve Consistency, Availability, and Partition Tolerance simultaneously',
          'You can guarantee only two of: Consistency, Availability, or Partition Tolerance',
          'Systems must be capitalized'
        ],
        correctIndex: 2,
        explanation: 'CAP theorem states that a distributed system can guarantee only two of three properties: Consistency, Availability, and Partition tolerance.'
      },
      {
        question: 'What is the purpose of Docker?',
        options: [
          'To write documentation',
          'To containerize applications for consistent deployment across environments',
          'To manage database backups',
          'To compile code'
        ],
        correctIndex: 1,
        explanation: 'Docker packages applications and dependencies in containers for consistent execution across different environments.'
      },
      {
        question: 'What is an SQL JOIN used for?',
        options: [
          'To connect multiple databases',
          'To combine rows from two or more tables based on related columns',
          'To insert data into a table',
          'To delete records'
        ],
        correctIndex: 1,
        explanation: 'JOINs combine data from multiple tables based on relationships between columns.'
      }
    ],
    senior: [
      {
        question: 'What are microservices?',
        options: [
          'Small services provided for free',
          'Architecture pattern where an application is built as small, independent, deployable services',
          'A type of database',
          'Testing framework components'
        ],
        correctIndex: 1,
        explanation: 'Microservices architecture breaks applications into small, independently deployable services that communicate via APIs.'
      },
      {
        question: 'What is Domain-Driven Design (DDD)?',
        options: [
          'A design pattern for User Interfaces',
          'An approach to architecture that aligns code organization with business domains',
          'A method for creating databases',
          'A testing strategy'
        ],
        correctIndex: 1,
        explanation: 'DDD structures systems around business domains using bounded contexts and ubiquitous language.'
      },
      {
        question: 'What is the difference between vertical and horizontal scaling?',
        options: [
          'One is for up scaling, one is for down scaling',
          'Vertical is adding resources to a single machine, horizontal is adding more machines',
          'They are the same thing',
          'Vertical is for databases, horizontal is for APIs'
        ],
        correctIndex: 1,
        explanation: 'Vertical scaling adds resources to a single server, while horizontal scaling adds more servers.'
      },
      {
        question: 'What is observability in systems?',
        options: [
          'The ability to observe code while it runs',
          'The ability to understand system behavior through logs, metrics, and traces',
          'A type of debugging tool',
          'A programming language feature'
        ],
        correctIndex: 1,
        explanation: 'Observability is built through structured logging, metrics collection, and distributed tracing.'
      },
      {
        question: 'What is an idempotent API operation?',
        options: [
          'An operation that requires multiple requests',
          'An operation that produces the same result regardless of how many times it is called',
          'An operation that fails sometimes',
          'An operation that requires authentication'
        ],
        correctIndex: 1,
        explanation: 'Idempotent operations guarantee the same outcome when called multiple times, important for safe retries.'
      }
    ]
  },

  'data-engineer': {
    beginner: [
      {
        question: 'What is a data pipeline?',
        options: [
          'A physical pipe carrying data',
          'A series of processes that move and transform data from source to destination',
          'A type of database',
          'A visualization tool'
        ],
        correctIndex: 1,
        explanation: 'Data pipelines orchestrate the movement and transformation of data through extract, transform, and load stages.'
      },
      {
        question: 'What does ETL stand for?',
        options: [
          'Extract, Transform, Load',
          'Evaluate, Test, Logfile',
          'Execute, Transmit, Link',
          'Encrypt, Tokenize, Label'
        ],
        correctIndex: 0,
        explanation: 'ETL is the process of extracting data from sources, transforming it, and loading it into a target system.'
      },
      {
        question: 'What is the difference between relational and non-relational databases?',
        options: [
          'Relational databases are faster',
          'Relational use structured tables with relationships, non-relational are flexible document/key-value stores',
          'Non-relational databases are always NoSQL',
          'They are the same thing'
        ],
        correctIndex: 1,
        explanation: 'Relational databases use tables with schemas and relationships, while non-relational databases offer flexible data models.'
      },
      {
        question: 'What is data modelling?',
        options: [
          'Making data look pretty',
          'Designing the structure of a database to support business requirements',
          'Training machine learning models with data',
          'Taking pictures of data'
        ],
        correctIndex: 1,
        explanation: 'Data modelling involves designing database schemas and relationships to support analytical and operational needs.'
      },
      {
        question: 'What is SQL?',
        options: [
          'A programming language for web development',
          'Standard Query Language used to interact with relational databases',
          'A data visualization tool',
          'A cloud service'
        ],
        correctIndex: 1,
        explanation: 'SQL is the standard language for querying and manipulating relational databases.'
      }
    ],
    mid: [
      {
        question: 'What is dimensional modelling?',
        options: [
          'Adding more dimensions to databases',
          'A design pattern using fact tables and dimension tables for analytical workloads',
          'A method to reduce database size',
          'A type of NoSQL database'
        ],
        correctIndex: 1,
        explanation: 'Dimensional modelling organizes data into fact tables (measurements) and dimension tables (descriptive attributes) for analytics.'
      },
      {
        question: 'What is dbt (data build tool)?',
        options: [
          'A type of database',
          'A framework for managing SQL transformation pipelines with version control and testing',
          'A visualization tool',
          'A cloud storage service'
        ],
        correctIndex: 1,
        explanation: 'dbt enables version-controlled, tested data transformations using SQL and templating.'
      },
      {
        question: 'What is Apache Spark used for?',
        options: [
          'Creating sparkly visualizations',
          'Distributed processing of large datasets across clusters',
          'Managing Apache web servers',
          'Storing compressed data'
        ],
        correctIndex: 1,
        explanation: 'Spark is a distributed computing framework for processing large-scale data in parallel.'
      },
      {
        question: 'What is Apache Airflow?',
        options: [
          'A weather forecasting tool',
          'A workflow orchestration platform for scheduling and monitoring data pipelines',
          'An airline company software',
          'A messaging system'
        ],
        correctIndex: 1,
        explanation: 'Airflow is used to define, schedule, and monitor complex data workflows as DAGs (Directed Acyclic Graphs).'
      },
      {
        question: 'What is data quality, and why does it matter?',
        options: [
          'Making data look good in presentations',
          'Ensuring data is accurate, complete, consistent, and fit for its intended use',
          'Having a large dataset',
          'Using expensive databases'
        ],
        correctIndex: 1,
        explanation: 'Data quality ensures that data is accurate and reliable for decision-making and analytics.'
      }
    ],
    senior: [
      {
        question: 'What is streaming data?',
        options: [
          'Watching videos online',
          'Data that is continuously generated and processed in real-time',
          'Data stored on a stream (river)',
          'Compressed data'
        ],
        correctIndex: 1,
        explanation: 'Streaming data is continuously generated and often requires real-time processing and analysis.'
      },
      {
        question: 'What is a lakehouse architecture?',
        options: [
          'A house built on a lake',
          'A hybrid approach combining data lake flexibility with data warehouse structure and ACID guarantees',
          'A type of cloud storage',
          'A database brand'
        ],
        correctIndex: 1,
        explanation: 'A lakehouse combines the scalability of data lakes with the structure and reliability of data warehouses.'
      },
      {
        question: 'What are the principles of Data Mesh?',
        options: [
          'Storing data in mesh networks',
          'Domain ownership, data as product, self-serve platform, and federated governance',
          'Using mesh topology for databases',
          'Merging multiple data sources'
        ],
        correctIndex: 1,
        explanation: 'Data Mesh treats data as a product and distributes ownership across domains with a self-serve platform.'
      },
      {
        question: 'What is Delta Lake?',
        options: [
          'A lake in the Delta region',
          'An open-source storage layer providing ACID transactions and time travel on data lakes',
          'A type of SQL database',
          'A cloud service'
        ],
        correctIndex: 1,
        explanation: 'Delta Lake adds reliability and performance features like ACID transactions to data lakes.'
      },
      {
        question: 'What is GDPR compliance in the context of data engineering?',
        options: [
          'General Data Protection Regulation - implementing right to erasure, data minimization, and purpose limitation',
          'Government Data Processing Rules',
          'General Database Privacy Regulation',
          'Guaranteed Data Protection Records'
        ],
        correctIndex: 0,
        explanation: 'GDPR compliance requires data minimization, purpose limitation, and the right to erasure in data pipelines.'
      }
    ]
  },

  'frontend-developer': {
    beginner: [
      {
        question: 'What is HTML?',
        options: [
          'A programming language',
          'HyperText Markup Language - used to structure content on web pages',
          'A styling language',
          'A web server'
        ],
        correctIndex: 1,
        explanation: 'HTML provides semantic structure to web pages using elements and tags.'
      },
      {
        question: 'What is the CSS box model?',
        options: [
          'A shipping box for CSS files',
          'A model that defines how elements are sized: content, padding, border, margin',
          'A database structure',
          'A JavaScript library'
        ],
        correctIndex: 1,
        explanation: 'The box model is fundamental to CSS layout, comprising content, padding, border, and margin.'
      },
      {
        question: 'What is the difference between var, let, and const in JavaScript?',
        options: [
          'They are all the same',
          'var is function-scoped, let and const are block-scoped; const cannot be reassigned',
          'const is the fastest',
          'var is newer than const'
        ],
        correctIndex: 1,
        explanation: 'var has function scope, while let and const have block scope. const prevents reassignment.'
      },
      {
        question: 'What is the DOM?',
        options: [
          'A type of domain',
          'Document Object Model - the representation of HTML elements as objects that JavaScript can interact with',
          'A database model',
          'A design pattern'
        ],
        correctIndex: 1,
        explanation: 'The DOM allows JavaScript to dynamically manipulate HTML and CSS.'
      },
      {
        question: 'What is asynchronous programming?',
        options: [
          'Programming without syntax',
          'Code that runs in parallel without blocking execution',
          'Programming that requires synchronization',
          'Slow programming'
        ],
        correctIndex: 1,
        explanation: 'Async allows long-running operations (like API calls) without blocking the main thread.'
      }
    ],
    mid: [
      {
        question: 'What is React?',
        options: [
          'A chemical reaction',
          'A JavaScript library for building user interfaces with reusable components',
          'A testing framework',
          'A database'
        ],
        correctIndex: 1,
        explanation: 'React is a library for building interactive UIs with components and state management.'
      },
      {
        question: 'What is the purpose of useState in React?',
        options: [
          'To use the state of the server',
          'To manage local component state in functional components',
          'To initialize a new user',
          'To test component state'
        ],
        correctIndex: 1,
        explanation: 'useState allows functional components to have local state that triggers re-renders on updates.'
      },
      {
        question: 'What does useEffect do?',
        options: [
          'It makes components have effects or animations',
          'It runs side effects like data fetching, subscriptions, or DOM updates',
          'It changes the visual effect of a component',
          'It tests the effectiveness of a component'
        ],
        correctIndex: 1,
        explanation: 'useEffect handles side effects after render, commonly used for fetching data and managing subscriptions.'
      },
      {
        question: 'What is TypeScript?',
        options: [
          'A type of script in movies',
          'A superset of JavaScript that adds static typing',
          'A testing framework',
          'A database query language'
        ],
        correctIndex: 1,
        explanation: 'TypeScript adds type safety to JavaScript, catching errors at compile time.'
      },
      {
        question: 'What is a Jest test?',
        options: [
          'A joke test',
          'A unit test written with the Jest testing framework',
          'A test of user interfaces',
          'A performance test'
        ],
        correctIndex: 1,
        explanation: 'Jest is a JavaScript testing framework for writing unit and integration tests.'
      }
    ],
    senior: [
      {
        question: 'What are the three Core Web Vitals?',
        options: [
          'Vitality, Vigor, Vim',
          'LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift)',
          'Loading, Interactivity, Stability',
          'Speed, Performance, Reliability'
        ],
        correctIndex: 1,
        explanation: 'Core Web Vitals are Google\'s key metrics for page experience and performance.'
      },
      {
        question: 'What is code splitting?',
        options: [
          'Breaking code into multiple files',
          'Dividing a bundle into smaller chunks loaded on-demand to improve initial load time',
          'Splitting code between frontend and backend',
          'Dividing code by function names'
        ],
        correctIndex: 1,
        explanation: 'Code splitting reduces initial bundle size by loading code only when needed.'
      },
      {
        question: 'What is WCAG compliance?',
        options: [
          'Web Content Accessibility Guidelines - standards for making web content accessible to all users',
          'Web Content and Graphics Guidelines',
          'Website Code and Guidelines',
          'Web Compliance Assessment Groups'
        ],
        correctIndex: 0,
        explanation: 'WCAG provides guidelines for accessible web design benefiting users with disabilities.'
      },
      {
        question: 'What is the purpose of ARIA attributes?',
        options: [
          'Styling web pages',
          'Accessible Rich Internet Applications - attributes that communicate purpose and state to assistive technologies',
          'Creating animations',
          'Storing data'
        ],
        correctIndex: 1,
        explanation: 'ARIA attributes enhance accessibility by providing semantic information to screen readers.'
      },
      {
        question: 'What is Server-Side Rendering (SSR)?',
        options: [
          'Running servers on the client',
          'Rendering React components on the server and sending HTML to the browser',
          'Rendering on the side of a server',
          'A type of database'
        ],
        correctIndex: 1,
        explanation: 'SSR improves initial load time and SEO by rendering components on the server.'
      }
    ]
  },

  'ml-engineer': {
    beginner: [
      {
        question: 'What is supervised learning?',
        options: [
          'Learning that is monitored by a supervisor',
          'Training on labeled data to predict outputs for new inputs',
          'Learning without any data',
          'A type of classroom learning'
        ],
        correctIndex: 1,
        explanation: 'Supervised learning uses labeled training data to learn input-output mappings.'
      },
      {
        question: 'What is unsupervised learning?',
        options: [
          'Learning without checking your work',
          'Training on unlabeled data to discover patterns and structure',
          'Learning that is not supervised',
          'A form of self-study'
        ],
        correctIndex: 1,
        explanation: 'Unsupervised learning finds patterns in unlabeled data, like clustering or dimensionality reduction.'
      },
      {
        question: 'What is NumPy?',
        options: [
          'A type of number',
          'A Python library for numerical computing and array operations',
          'A number format',
          'A database'
        ],
        correctIndex: 1,
        explanation: 'NumPy provides efficient numerical operations on arrays and matrices.'
      },
      {
        question: 'What is scikit-learn?',
        options: [
          'A learning style',
          'A Python library providing simple tools for machine learning',
          'A scientific calculator',
          'A database framework'
        ],
        correctIndex: 1,
        explanation: 'scikit-learn offers algorithms for classification, regression, clustering, and preprocessing.'
      },
      {
        question: 'What is data normalization?',
        options: [
          'Making data look normal',
          'Scaling features to similar ranges to improve model training',
          'Organizing data alphabetically',
          'Removing bad data'
        ],
        correctIndex: 1,
        explanation: 'Normalization ensures features are on comparable scales, improving model convergence and performance.'
      }
    ],
    mid: [
      {
        question: 'What is feature engineering?',
        options: [
          'Building bridges with features',
          'Creating new features from raw data to improve model performance',
          'Removing features from models',
          'Testing features'
        ],
        correctIndex: 1,
        explanation: 'Feature engineering involves creating meaningful features that help models learn better.'
      },
      {
        question: 'What is cross-validation?',
        options: [
          'Validating data across multiple countries',
          'Splitting data into folds to evaluate model performance reliably',
          'Validating data twice',
          'A type of database validation'
        ],
        correctIndex: 1,
        explanation: 'Cross-validation divides data into subsets to get more reliable performance estimates.'
      },
      {
        question: 'What is PyTorch?',
        options: [
          'A port for Python',
          'A deep learning framework built on tensors with automatic differentiation',
          'A Python torch tool',
          'A database for torch data'
        ],
        correctIndex: 1,
        explanation: 'PyTorch is a flexible framework for neural networks with dynamic computation graphs.'
      },
      {
        question: 'What is MLflow used for?',
        options: [
          'Flowing data through ML models',
          'Tracking and managing machine learning experiments, models, and deployments',
          'Flowing water in ML experiments',
          'A streaming platform'
        ],
        correctIndex: 1,
        explanation: 'MLflow provides tools for experiment tracking, model registry, and production deployment.'
      },
      {
        question: 'What is overfitting?',
        options: [
          'Fitting clothes too tightly',
          'A model fitting noise in training data and failing on new data',
          'Using too few features',
          'A type of data preprocessing'
        ],
        correctIndex: 1,
        explanation: 'Overfitting occurs when models memorize training data rather than learning generalizable patterns.'
      }
    ],
    senior: [
      {
        question: 'What is MLOps?',
        options: [
          'Operations on ML code',
          'Machine Learning Operations - practices for productionizing, monitoring, and maintaining ML systems',
          'A type of operation in ML algorithms',
          'Optimizing ML libraries'
        ],
        correctIndex: 1,
        explanation: 'MLOps applies DevOps principles to machine learning, managing models in production.'
      },
      {
        question: 'What is data drift?',
        options: [
          'Data floating away',
          'Changes in input data distribution that degrade model performance',
          'Data moving to a different location',
          'Slow data processing'
        ],
        correctIndex: 1,
        explanation: 'Data drift occurs when the distribution of input features changes, degrading model accuracy.'
      },
      {
        question: 'What is model monitoring?',
        options: [
          'Watching a model train',
          'Tracking model performance and data quality in production to detect degradation',
          'Monitoring server resources',
          'Testing models'
        ],
        correctIndex: 1,
        explanation: 'Model monitoring ensures deployed models maintain performance and alerts on degradation.'
      },
      {
        question: 'What is fairness in ML?',
        options: [
          'Being fair to data scientists',
          'Ensuring models do not discriminate unfairly against protected groups',
          'Using fair data',
          'Being honest about results'
        ],
        correctIndex: 1,
        explanation: 'Fairness in ML means models should not have systematic biases against protected groups.'
      },
      {
        question: 'What is the Big O complexity of a neural network forward pass?',
        options: [
          'O(1)',
          'O(n)',
          'Depends on architecture but typically O(n) where n is the number of parameters and inputs',
          'O(n²)'
        ],
        correctIndex: 2,
        explanation: 'Neural network complexity depends on the number of layers, parameters, and batch size.'
      }
    ]
  },

  'qa-test-engineer': {
    beginner: [
      {
        question: 'What is the test pyramid?',
        options: [
          'A pyramid where tests are stored',
          'A model with unit tests at base, integration tests in middle, E2E tests at top',
          'A type of testing strategy pyramid shape',
          'A pyramid for pyramiding tests'
        ],
        correctIndex: 1,
        explanation: 'The test pyramid suggests having many unit tests, fewer integration tests, and fewer E2E tests.'
      },
      {
        question: 'What is a unit test?',
        options: [
          'A test of military units',
          'Testing individual functions or methods in isolation',
          'A test that uses units of measurement',
          'A test for unit tests'
        ],
        correctIndex: 1,
        explanation: 'Unit tests verify the behavior of individual code units like functions or methods.'
      },
      {
        question: 'What is a bug report?',
        options: [
          'A report about insects',
          'A documented description of unexpected behavior including steps to reproduce',
          'A report on bugs in code',
          'A safety report'
        ],
        correctIndex: 1,
        explanation: 'A good bug report includes description, reproduction steps, expected vs actual behavior, and environment.'
      },
      {
        question: 'What does HTTP 404 mean?',
        options: [
          'A general success',
          'Resource Not Found',
          'Server Error',
          'Bad Request'
        ],
        correctIndex: 1,
        explanation: '404 indicates that the requested resource could not be found on the server.'
      },
      {
        question: 'What is black box testing?',
        options: [
          'Testing things in a black box',
          'Testing without knowledge of internal implementation, focusing on inputs and outputs',
          'Testing code without documentation',
          'A testing framework'
        ],
        correctIndex: 1,
        explanation: 'Black box testing treats the system as a "black box" and tests behavior without knowing internals.'
      }
    ],
    mid: [
      {
        question: 'What is Playwright used for?',
        options: [
          'Writing plays',
          'End-to-end testing across browsers with a modern automation framework',
          'Playing multimedia files',
          'A theater management tool'
        ],
        correctIndex: 1,
        explanation: 'Playwright enables automated testing of web applications across multiple browsers.'
      },
      {
        question: 'What is API testing?',
        options: [
          'Testing application programming interfaces for correctness, reliability, and security',
          'Testing appliances',
          'A programming test',
          'Testing application interfaces'
        ],
        correctIndex: 0,
        explanation: 'API testing verifies that APIs behave correctly, handle errors properly, and meet performance requirements.'
      },
      {
        question: 'What is performance testing?',
        options: [
          'Testing if software performs well with large loads and stress',
          'Testing if performers do a good job',
          'A type of unit test',
          'Testing performance reviews'
        ],
        correctIndex: 0,
        explanation: 'Performance testing measures response times, throughput, and resource usage under load.'
      },
      {
        question: 'What is BDD?',
        options: [
          'Behavior-Driven Development - writing tests in human-readable language using Gherkin',
          'Before Detailed Design',
          'Best Development Practices',
          'Build-Driven Development'
        ],
        correctIndex: 0,
        explanation: 'BDD uses plain language scenarios to define behavior, improving communication between testers and developers.'
      },
      {
        question: 'What is continuous testing?',
        options: [
          'Testing that never stops',
          'Running automated tests continuously throughout the development and deployment pipeline',
          'Always testing',
          'Testing in continuous loops'
        ],
        correctIndex: 1,
        explanation: 'Continuous testing integrates testing into CI/CD pipelines to catch issues early.'
      }
    ],
    senior: [
      {
        question: 'What is shift-left testing?',
        options: [
          'Moving tests to the left side of code',
          'Moving testing earlier in the development lifecycle to catch issues sooner',
          'Writing tests in left-to-right languages',
          'A type of test alignment'
        ],
        correctIndex: 1,
        explanation: 'Shift-left involves testing early, including in requirements and design phases.'
      },
      {
        question: 'What is accessibility testing?',
        options: [
          'Testing access to buildings',
          'Verifying that applications are usable by people with disabilities following WCAG standards',
          'Testing accessibility to servers',
          'A security test'
        ],
        correctIndex: 1,
        explanation: 'Accessibility testing ensures applications work for users with disabilities.'
      },
      {
        question: 'What is security testing?',
        options: [
          'Testing security guards',
          'Testing for vulnerabilities like injection, XSS, authentication flaws following OWASP guidelines',
          'Testing security cameras',
          'A type of performance test'
        ],
        correctIndex: 1,
        explanation: 'Security testing identifies vulnerabilities and weaknesses in application security.'
      },
      {
        question: 'What is visual regression testing?',
        options: [
          'Testing that visuals are bad',
          'Detecting unintended UI changes by comparing screenshots across releases',
          'Testing regression in visual design',
          'A type of performance test'
        ],
        correctIndex: 1,
        explanation: 'Visual regression tests catch unintended visual changes that functional tests might miss.'
      },
      {
        question: 'What metrics matter for test quality?',
        options: [
          'Only code coverage',
          'Defect escape rate, test coverage, mean time to detect, flaky test rate, and cycle time',
          'Just the number of tests',
          'Test execution speed only'
        ],
        correctIndex: 1,
        explanation: 'Effective quality metrics include escape rate, coverage, reliability, and velocity.'
      }
    ]
  },

  'security-engineer': {
    beginner: [
      {
        question: 'What is the CIA triad?',
        options: [
          'Central Intelligence Agency',
          'Confidentiality, Integrity, Availability - foundational security principles',
          'A government organization',
          'A triad of agencies'
        ],
        correctIndex: 1,
        explanation: 'The CIA triad represents the three core objectives of information security.'
      },
      {
        question: 'What is SQL injection?',
        options: [
          'Injecting SQL into databases',
          'An attack where malicious SQL code is inserted into input fields to manipulate queries',
          'Using injection to add SQL to code',
          'A database repair technique'
        ],
        correctIndex: 1,
        explanation: 'SQL injection attacks exploit unvalidated input to execute arbitrary SQL commands.'
      },
      {
        question: 'What is XSS (Cross-Site Scripting)?',
        options: [
          'Executing scripts between sites',
          'An attack where malicious scripts are injected into web pages viewed by users',
          'A scripting language',
          'Extra scripts'
        ],
        correctIndex: 1,
        explanation: 'XSS attacks inject malicious scripts that execute in victims\' browsers, stealing data or credentials.'
      },
      {
        question: 'What is encryption?',
        options: [
          'Making things smaller',
          'Converting readable data into unreadable ciphertext using an algorithm and key',
          'Compressing files',
          'Changing file formats'
        ],
        correctIndex: 1,
        explanation: 'Encryption protects data confidentiality by making it unreadable without the correct key.'
      },
      {
        question: 'What does HTTPS provide?',
        options: [
          'Faster internet',
          'HTTP with encryption (TLS/SSL) for secure data transmission',
          'A type of server',
          'File hosting'
        ],
        correctIndex: 1,
        explanation: 'HTTPS encrypts data in transit between clients and servers using TLS/SSL.'
      }
    ],
    mid: [
      {
        question: 'What is threat modelling?',
        options: [
          'Modeling threats like storms',
          'A systematic approach to identify and mitigate security threats in a system',
          'Creating models of threatened systems',
          'A risk assessment tool'
        ],
        correctIndex: 1,
        explanation: 'Threat modelling identifies potential security threats and designs mitigations.'
      },
      {
        question: 'What is STRIDE?',
        options: [
          'A walking gait',
          'Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege',
          'A stride in security',
          'Security threats in alphabetical order'
        ],
        correctIndex: 1,
        explanation: 'STRIDE is a framework for categorizing and identifying security threats.'
      },
      {
        question: 'What is OAuth 2.0?',
        options: [
          'An old security standard',
          'An authorization framework allowing secure third-party access without sharing passwords',
          'An encryption algorithm',
          'A type of firewall'
        ],
        correctIndex: 1,
        explanation: 'OAuth 2.0 enables secure delegated authorization for API access.'
      },
      {
        question: 'What is a Web Application Firewall (WAF)?',
        options: [
          'A wall made of web',
          'Security controls that monitor and filter HTTP traffic to protect against attacks',
          'A firewall for websites',
          'A browser extension'
        ],
        correctIndex: 1,
        explanation: 'A WAF sits between users and applications, filtering malicious requests.'
      },
      {
        question: 'What is SAST?',
        options: [
          'A satellite test',
          'Static Application Security Testing - analyzing source code for vulnerabilities',
          'A security standard',
          'A type of test'
        ],
        correctIndex: 1,
        explanation: 'SAST tools analyze source code to find security flaws without running the application.'
      }
    ],
    senior: [
      {
        question: 'What is Zero Trust architecture?',
        options: [
          'Never trusting anyone',
          'Security model that verifies every user and device, assumes breach, and enforces least privilege',
          'Architecture with no trust relationships',
          'A distrust framework'
        ],
        correctIndex: 1,
        explanation: 'Zero Trust never assumes trust; it continuously verifies identity and enforces strict access controls.'
      },
      {
        question: 'What is the MITRE ATT&CK framework?',
        options: [
          'An attack framework',
          'A knowledge base of adversary tactics and techniques used in real-world attacks',
          'A military attack plan',
          'An attack detection system'
        ],
        correctIndex: 1,
        explanation: 'MITRE ATT&CK maps real adversary behavior to help organizations understand threats.'
      },
      {
        question: 'What is incident response?',
        options: [
          'Responding to emergencies',
          'A structured process for detecting, containing, eradicating, and recovering from security incidents',
          'Responding to security alerts',
          'Handling security events'
        ],
        correctIndex: 1,
        explanation: 'Incident response follows phases: preparation, detection, containment, eradication, recovery, and lessons learned.'
      },
      {
        question: 'What is supply chain security?',
        options: [
          'Securing supply chains for shipping',
          'Protecting the entire software development and delivery pipeline from code to deployment',
          'Security for supply companies',
          'Securing chain links'
        ],
        correctIndex: 1,
        explanation: 'Supply chain security prevents tampering in the build, deployment, and dependency management processes.'
      },
      {
        question: 'What does SLSA stand for?',
        options: [
          'Secure Logging and Security Assessment',
          'Supply-chain Levels for Software Artifacts - framework for securing software supply chains',
          'Software Lifecycle Security Authentication',
          'Secure Liaison Software Architecture'
        ],
        correctIndex: 1,
        explanation: 'SLSA provides a framework for securing software artifacts throughout the supply chain.'
      }
    ]
  },

  'tech-lead-architect': {
    beginner: [
      {
        question: 'What is system design?',
        options: [
          'Designing computer systems',
          'Planning architecture of large-scale systems to meet functional and non-functional requirements',
          'Designing system backups',
          'A design pattern'
        ],
        correctIndex: 1,
        explanation: 'System design involves making high-level decisions about architecture, scalability, and reliability.'
      },
      {
        question: 'What is a distributed system?',
        options: [
          'A system spread across the country',
          'A system with multiple independent computers communicating over a network',
          'A distributed database',
          'A system with distributed permissions'
        ],
        correctIndex: 1,
        explanation: 'Distributed systems have multiple nodes that must coordinate and handle failures.'
      },
      {
        question: 'What is DevOps?',
        options: [
          'Development operations',
          'A culture and practice emphasizing collaboration between development and operations for continuous delivery',
          'A development tool',
          'Operations development'
        ],
        correctIndex: 1,
        explanation: 'DevOps promotes collaboration, automation, and continuous improvement in software delivery.'
      },
      {
        question: 'What is a microservice?',
        options: [
          'A small service charge',
          'A small, independent service that does one thing well and communicates via APIs',
          'A service that runs on microprocessors',
          'A service component'
        ],
        correctIndex: 1,
        explanation: 'Microservices break applications into small, independently deployable pieces.'
      },
      {
        question: 'What is load balancing?',
        options: [
          'Balancing loads on trucks',
          'Distributing incoming traffic across multiple servers to handle traffic and provide redundancy',
          'Balancing system loads',
          'A mechanical balancing system'
        ],
        correctIndex: 1,
        explanation: 'Load balancing distributes requests to ensure no single server is overwhelmed.'
      }
    ],
    mid: [
      {
        question: 'What is Domain-Driven Design (DDD)?',
        options: [
          'Designing domains',
          'An approach to architecture aligning code organization with business domains using bounded contexts',
          'A domain registration system',
          'A database design pattern'
        ],
        correctIndex: 1,
        explanation: 'DDD structures systems around business domains to improve maintainability and alignment.'
      },
      {
        question: 'What are bounded contexts?',
        options: [
          'Contexts that are bounded',
          'Explicit boundaries within which a domain model is defined and applicable',
          'Bounded computer memory',
          'Context limitations'
        ],
        correctIndex: 1,
        explanation: 'Bounded contexts define explicit boundaries for domain models and communication interfaces.'
      },
      {
        question: 'What is an ADR (Architecture Decision Record)?',
        options: [
          'A record of architecture',
          'A document that captures important architectural decisions, their context, and consequences',
          'A recording of architectural meetings',
          'An architecture review document'
        ],
        correctIndex: 1,
        explanation: 'ADRs document significant technical decisions and their trade-offs for future reference.'
      },
      {
        question: 'What is the Azure Well-Architected Framework?',
        options: [
          'A framework for building in Azure',
          'Framework based on five pillars: reliability, security, cost optimization, operational excellence, performance',
          'A building architecture standard',
          'A cloud design pattern'
        ],
        correctIndex: 1,
        explanation: 'The framework provides guidance on designing reliable, secure, efficient cloud systems.'
      },
      {
        question: 'What is OWASP Top 10?',
        options: [
          'The top 10 things to build',
          'A list of the most critical web application security risks',
          'A ranking of the top 10 websites',
          'A top 10 list of something'
        ],
        correctIndex: 1,
        explanation: 'OWASP Top 10 identifies the most critical security vulnerabilities in web applications.'
      }
    ],
    senior: [
      {
        question: 'What is an LLM agent architecture?',
        options: [
          'Architecture designed by agents',
          'A system design for autonomous agents using LLMs to plan and execute multi-step tasks',
          'An agent that manages architecture',
          'Architecture for agent systems'
        ],
        correctIndex: 1,
        explanation: 'LLM agent architecture enables autonomous systems that can reason and act.'
      },
      {
        question: 'What is context engineering?',
        options: [
          'Engineering contexts',
          'Structuring information provided to LLMs to maximize relevant output and minimize hallucinations',
          'Engineering a context management system',
          'Context configuration'
        ],
        correctIndex: 1,
        explanation: 'Context engineering optimizes how information is presented to LLMs for better results.'
      },
      {
        question: 'What should be included in a GenAI adoption strategy?',
        options: [
          'Just buying LLM APIs',
          'Risk assessment, compliance, organizational readiness, infrastructure planning, and governance',
          'Only technology decisions',
          'Just the budget'
        ],
        correctIndex: 1,
        explanation: 'Effective GenAI strategies address technology, governance, compliance, and organizational readiness.'
      },
      {
        question: 'What is incident management?',
        options: [
          'Managing incidents like car accidents',
          'A structured process for responding to service disruptions with detection, response, recovery, and learning',
          'Managing incident reports',
          'An incident tracking system'
        ],
        correctIndex: 1,
        explanation: 'Incident management coordinates rapid response to outages and learns from incidents.'
      },
      {
        question: 'What is a blameless postmortem?',
        options: [
          'A postmortem without blame',
          'A retrospective focused on learning from incidents rather than assigning blame',
          'A type of autopsy',
          'A meeting after problems'
        ],
        correctIndex: 1,
        explanation: 'Blameless postmortems foster learning and improvement by focusing on systems, not individuals.'
      }
    ]
  },
  'data-scientist': {
    beginner: [
      {
        question: 'What is the primary goal of Exploratory Data Analysis (EDA)?',
        options: [
          'To build the final production model',
          'To understand data patterns, spot anomalies, and form hypotheses before formal modeling',
          'To clean all missing values from a dataset',
          'To deploy a dashboard to stakeholders'
        ],
        correctIndex: 1,
        explanation: 'EDA is the initial investigation phase where you summarize data characteristics, discover patterns, detect outliers, and develop hypotheses that guide subsequent analysis.'
      },
      {
        question: 'Which measure of central tendency is most robust to outliers?',
        options: [
          'Mean',
          'Mode',
          'Median',
          'Standard deviation'
        ],
        correctIndex: 2,
        explanation: 'The median is the middle value of an ordered dataset and is not affected by extreme values, unlike the mean which can be heavily skewed by outliers.'
      },
      {
        question: 'When is a box plot more informative than a bar chart?',
        options: [
          'When comparing categorical counts across groups',
          'When you need to show the distribution, spread, and outliers of continuous data',
          'When displaying time series trends',
          'When showing proportions of a whole'
        ],
        correctIndex: 1,
        explanation: 'Box plots display the median, quartiles, range, and outliers of continuous data, providing a richer summary of distribution than a bar chart which typically shows only a single aggregate value.'
      },
      {
        question: 'A study finds that ice cream sales and drowning incidents are highly correlated. What is the best interpretation?',
        options: [
          'Ice cream consumption causes drowning',
          'Drowning causes people to buy ice cream',
          'A confounding variable (e.g., hot weather) likely drives both, so correlation does not imply causation',
          'The correlation is definitely spurious and should be ignored'
        ],
        correctIndex: 2,
        explanation: 'Correlation measures association, not causation. Here, a confounding variable like temperature increases both ice cream sales and swimming activity, which in turn increases drowning risk.'
      },
      {
        question: 'Which type of data is measured on a scale where differences are meaningful but there is no true zero?',
        options: [
          'Nominal data',
          'Ordinal data',
          'Interval data',
          'Ratio data'
        ],
        correctIndex: 2,
        explanation: 'Interval data (e.g., temperature in Celsius) has meaningful differences between values but no true zero point, meaning ratios are not meaningful. Ratio data (e.g., weight) has a true zero.'
      }
    ],
    mid: [
      {
        question: 'You have a highly imbalanced binary classification dataset (95% negative, 5% positive). Which metric is LEAST useful for evaluating model performance?',
        options: [
          'Accuracy',
          'Precision-Recall AUC',
          'F1 score',
          'ROC AUC'
        ],
        correctIndex: 0,
        explanation: 'Accuracy is misleading on imbalanced data because a naive classifier that always predicts the majority class achieves 95% accuracy. Metrics like PR-AUC, F1, and ROC-AUC better capture performance on the minority class.'
      },
      {
        question: 'What problem does k-fold cross-validation solve that a single train/test split does not?',
        options: [
          'It eliminates the need for a test set entirely',
          'It reduces variance in the performance estimate by evaluating on multiple different splits of the data',
          'It guarantees the model will not overfit',
          'It speeds up model training significantly'
        ],
        correctIndex: 1,
        explanation: 'K-fold cross-validation trains and evaluates the model on k different train/test partitions, providing a more reliable and lower-variance estimate of generalization performance than a single random split.'
      },
      {
        question: 'Which feature engineering technique is most appropriate for a "date of purchase" column when predicting weekly sales patterns?',
        options: [
          'Dropping the column since dates are not numeric',
          'Converting the date to a Unix timestamp',
          'Extracting cyclical features like day-of-week and month using sine/cosine encoding',
          'Label encoding the date string alphabetically'
        ],
        correctIndex: 2,
        explanation: 'Extracting cyclical components (day-of-week, month) with sine/cosine encoding preserves the periodic nature of time. A raw timestamp loses cyclical patterns, and label encoding has no meaningful order.'
      },
      {
        question: 'A p-value of 0.03 in a hypothesis test means:',
        options: [
          'There is a 3% probability that the null hypothesis is true',
          'There is a 97% probability that the alternative hypothesis is true',
          'If the null hypothesis were true, there is a 3% chance of observing results at least as extreme as those obtained',
          'The effect size is 0.03'
        ],
        correctIndex: 2,
        explanation: 'The p-value is the probability of observing data at least as extreme as the sample, assuming the null hypothesis is true. It does not give the probability that a hypothesis is true or false.'
      },
      {
        question: 'What is the main advantage of a Random Forest over a single Decision Tree?',
        options: [
          'Random Forests are always faster to train',
          'Random Forests are more interpretable',
          'Random Forests reduce overfitting by averaging many decorrelated trees trained on bootstrapped samples with feature subsets',
          'Random Forests do not require hyperparameter tuning'
        ],
        correctIndex: 2,
        explanation: 'Random Forests are an ensemble method that builds many decision trees on random subsets of data and features, then averages their predictions. This reduces the high variance and overfitting tendency of individual decision trees.'
      }
    ],
    senior: [
      {
        question: 'In causal inference, what is the fundamental problem that the "potential outcomes" framework addresses?',
        options: [
          'The inability to collect large enough sample sizes',
          'The fact that we can never observe both the treated and untreated outcome for the same unit simultaneously',
          'The difficulty of running SQL queries on observational data',
          'The challenge of building real-time prediction systems'
        ],
        correctIndex: 1,
        explanation: 'The fundamental problem of causal inference is that for any individual unit, we observe only one potential outcome (treated or untreated), never both. Techniques like matching, IV, and difference-in-differences attempt to estimate the unobserved counterfactual.'
      },
      {
        question: 'How does a Bayesian approach to A/B testing differ from a frequentist approach?',
        options: [
          'Bayesian testing does not require any data',
          'Bayesian testing provides a posterior probability distribution over the parameter of interest, allowing direct probability statements about which variant is better',
          'Bayesian testing always requires larger sample sizes',
          'Bayesian testing eliminates the need for a prior assumption'
        ],
        correctIndex: 1,
        explanation: 'Bayesian A/B testing combines prior beliefs with observed data to produce a posterior distribution, enabling statements like "there is a 95% probability that variant B is better." Frequentist testing only provides p-values and confidence intervals.'
      },
      {
        question: 'When modeling time series data, what does the "d" parameter represent in an ARIMA(p, d, q) model?',
        options: [
          'The number of autoregressive lag terms',
          'The number of moving average terms',
          'The order of differencing needed to make the series stationary',
          'The number of seasonal periods'
        ],
        correctIndex: 2,
        explanation: 'The "d" in ARIMA is the order of integration (differencing). A series is differenced d times to achieve stationarity, which is a requirement for the AR and MA components to work properly.'
      },
      {
        question: 'When applying PCA for dimensionality reduction, what does each principal component maximize?',
        options: [
          'The correlation with the target variable',
          'The variance explained in the remaining orthogonal direction after accounting for previous components',
          'The number of features that can be removed',
          'The accuracy of downstream classification models'
        ],
        correctIndex: 1,
        explanation: 'Each principal component is the direction of maximum variance in the data, subject to being orthogonal to all previous components. PCA is unsupervised and does not consider the target variable.'
      },
      {
        question: 'In experiment design, what is the purpose of a Minimum Detectable Effect (MDE) in power analysis?',
        options: [
          'It is the largest effect the experiment can detect',
          'It is the smallest effect size the experiment is designed to reliably detect at a given significance level and statistical power',
          'It determines the p-value threshold for the experiment',
          'It is the maximum number of users needed for the experiment'
        ],
        correctIndex: 1,
        explanation: 'MDE is the smallest practically significant effect size that the experiment is powered to detect. It drives sample size calculations: smaller MDEs require larger samples, and choosing the right MDE balances statistical rigor with business practicality.'
      }
    ]
  },
  'devops-platform-engineer': {
    beginner: [
      {
        question: 'What is the primary purpose of a CI/CD pipeline?',
        options: [
          'To replace all manual testing entirely',
          'To automate the process of building, testing, and deploying code changes reliably and frequently',
          'To monitor applications in production',
          'To manage cloud billing and cost optimization'
        ],
        correctIndex: 1,
        explanation: 'CI/CD (Continuous Integration / Continuous Delivery) pipelines automate the steps from code commit to deployment, enabling teams to ship changes quickly and with confidence through consistent build, test, and release processes.'
      },
      {
        question: 'What does a Dockerfile define?',
        options: [
          'The network configuration for a cloud server',
          'A set of instructions to build a Docker image, specifying the base image, dependencies, and commands to run',
          'A list of running containers on a host machine',
          'The DNS settings for a containerized application'
        ],
        correctIndex: 1,
        explanation: 'A Dockerfile is a text file containing sequential instructions (FROM, RUN, COPY, CMD, etc.) that Docker uses to build an image. Each instruction creates a layer in the resulting image.'
      },
      {
        question: 'In Git, what is the difference between "git merge" and "git rebase"?',
        options: [
          'They are identical operations with different names',
          'Merge creates a merge commit preserving branch history, while rebase replays commits on top of another branch creating a linear history',
          'Rebase is only used for deleting branches',
          'Merge can only be done on the main branch'
        ],
        correctIndex: 1,
        explanation: 'Git merge creates a new merge commit that combines two branches, preserving the full branch history. Git rebase moves or replays your commits onto the tip of another branch, resulting in a cleaner, linear commit history.'
      },
      {
        question: 'What is the purpose of an application health check endpoint (e.g., /health)?',
        options: [
          'To display the full application source code',
          'To provide a lightweight endpoint that load balancers and orchestrators use to verify the application is running and responsive',
          'To expose database credentials for debugging',
          'To serve the main homepage of the application'
        ],
        correctIndex: 1,
        explanation: 'Health check endpoints return a simple status (e.g., HTTP 200) to indicate the service is alive. Load balancers, container orchestrators, and monitoring tools poll these endpoints to route traffic and restart unhealthy instances.'
      },
      {
        question: 'Which Linux command displays real-time resource usage (CPU, memory) of running processes?',
        options: [
          'ls -la',
          'cat /etc/hosts',
          'top',
          'chmod 755'
        ],
        correctIndex: 2,
        explanation: 'The "top" command provides a dynamic, real-time view of running processes and their CPU, memory, and other resource usage. Tools like "htop" offer an enhanced interactive version.'
      }
    ],
    mid: [
      {
        question: 'In Kubernetes, what is the role of a ReplicaSet?',
        options: [
          'To store application configuration as key-value pairs',
          'To ensure a specified number of identical pod replicas are running at any given time',
          'To expose a service to external traffic',
          'To manage persistent storage volumes'
        ],
        correctIndex: 1,
        explanation: 'A ReplicaSet maintains a stable set of replica pods running at any given time. If a pod fails, the ReplicaSet controller automatically creates a replacement to maintain the desired count. Deployments manage ReplicaSets for rolling updates.'
      },
      {
        question: 'What is "state" in Terraform and why is it important?',
        options: [
          'State is the Terraform configuration language syntax',
          'State is a record of the infrastructure Terraform manages, mapping real-world resources to your configuration so it can plan accurate changes',
          'State is a log file of all Terraform commands ever run',
          'State is the cloud provider authentication credentials'
        ],
        correctIndex: 1,
        explanation: 'Terraform state tracks which real-world resources correspond to your configuration. Without state, Terraform cannot determine what changes to make (create, update, or destroy) when you run terraform plan/apply.'
      },
      {
        question: 'What distinguishes "observability" from traditional "monitoring"?',
        options: [
          'They are the same thing with different marketing names',
          'Observability uses logs, metrics, and traces together to let you ask arbitrary questions about system behavior, while monitoring checks known failure modes against predefined thresholds',
          'Monitoring is more modern than observability',
          'Observability only applies to serverless architectures'
        ],
        correctIndex: 1,
        explanation: 'Monitoring tells you when something is wrong based on predefined conditions. Observability, built on the three pillars of logs, metrics, and traces, lets you explore and diagnose novel issues by correlating signals to understand why something is wrong.'
      },
      {
        question: 'What is the purpose of a network ingress controller in Kubernetes?',
        options: [
          'To manage pod-to-pod communication within a cluster',
          'To manage external access to services in a cluster, typically HTTP/HTTPS routing, TLS termination, and load balancing',
          'To encrypt data at rest in etcd',
          'To scale the number of cluster nodes automatically'
        ],
        correctIndex: 1,
        explanation: 'An ingress controller processes Ingress resources to configure external access to cluster services. It handles HTTP routing, virtual hosting, TLS termination, and load balancing at the edge of the cluster.'
      },
      {
        question: 'Why should secrets NOT be stored in CI/CD pipeline configuration files or environment variable definitions in source control?',
        options: [
          'It makes the pipeline slower',
          'Secrets in source control can be exposed through repository access, git history, logs, and forks, violating the principle of least privilege',
          'Environment variables cannot hold secret values',
          'CI/CD systems cannot read environment variables'
        ],
        correctIndex: 1,
        explanation: 'Storing secrets in source control exposes them to anyone with repo access, in git history forever, and potentially in CI logs. Use dedicated secret management tools (Vault, cloud KMS, CI/CD secret stores) that provide encryption, access control, and audit trails.'
      }
    ],
    senior: [
      {
        question: 'What problem does a service mesh (e.g., Istio, Linkerd) solve that application-level libraries do not?',
        options: [
          'Service meshes replace container orchestration entirely',
          'Service meshes provide infrastructure-level traffic management, mTLS, and observability without requiring changes to application code',
          'Service meshes eliminate the need for Kubernetes',
          'Service meshes are only used for database connection pooling'
        ],
        correctIndex: 1,
        explanation: 'A service mesh uses sidecar proxies to handle cross-cutting concerns (mutual TLS, retries, circuit breaking, traffic shaping, distributed tracing) at the infrastructure layer, decoupling these from application code and applying them uniformly across all services.'
      },
      {
        question: 'In a GitOps workflow, what is the "single source of truth" for the desired state of infrastructure and applications?',
        options: [
          'The CI/CD server configuration',
          'A Git repository containing declarative configuration that an operator continuously reconciles with the live cluster state',
          'The cloud provider console settings',
          'The container image registry tags'
        ],
        correctIndex: 1,
        explanation: 'GitOps uses a Git repository as the single source of truth. An operator (e.g., ArgoCD, Flux) continuously watches the repo and reconciles the live cluster state to match the declared desired state, enabling audit trails and rollback via git revert.'
      },
      {
        question: 'What is the primary principle behind chaos engineering?',
        options: [
          'Randomly deleting production databases to test recovery',
          'Proactively injecting controlled failures into a system to uncover weaknesses before they cause real outages',
          'Writing as much error handling code as possible',
          'Running load tests with maximum possible traffic'
        ],
        correctIndex: 1,
        explanation: 'Chaos engineering systematically experiments on a system by injecting controlled faults (network latency, pod failures, resource exhaustion) to build confidence in its resilience. It follows a hypothesis-driven approach with careful blast radius control, not random destruction.'
      },
      {
        question: 'What is the relationship between SLIs, SLOs, and SLAs?',
        options: [
          'They are three names for the same reliability metric',
          'SLIs are quantitative measures of service behavior, SLOs are internal reliability targets set on SLIs, and SLAs are contractual commitments with consequences for missing targets',
          'SLAs are set first, then SLOs, then SLIs',
          'SLIs measure cost, SLOs measure speed, SLAs measure uptime'
        ],
        correctIndex: 1,
        explanation: 'SLIs (Service Level Indicators) are metrics like latency or error rate. SLOs (Service Level Objectives) are internal targets set on SLIs (e.g., 99.9% of requests under 200ms). SLAs (Service Level Agreements) are external contracts with penalties if SLOs are breached.'
      },
      {
        question: 'What distinguishes platform engineering from traditional DevOps?',
        options: [
          'Platform engineering replaces all DevOps practices',
          'Platform engineering builds self-service internal developer platforms (IDPs) that abstract infrastructure complexity, enabling development teams to provision and manage resources independently',
          'Platform engineering focuses only on monitoring and alerting',
          'Platform engineering eliminates the need for CI/CD pipelines'
        ],
        correctIndex: 1,
        explanation: 'Platform engineering creates golden paths and self-service tooling (internal developer platforms) that abstract away infrastructure complexity. Instead of every team managing their own DevOps, platform teams provide standardized, opinionated workflows that reduce cognitive load.'
      }
    ]
  },
  'marketing-technology-developer': {
    beginner: [
      {
        question: 'What does a web analytics tool like Google Analytics primarily track?',
        options: [
          'Server CPU and memory usage',
          'User interactions with a website such as page views, sessions, bounce rate, and conversion events',
          'Source code changes in a repository',
          'Email server delivery rates'
        ],
        correctIndex: 1,
        explanation: 'Web analytics tools track user behavior on websites, including page views, session duration, traffic sources, user demographics, and conversion events, enabling data-driven marketing decisions.'
      },
      {
        question: 'What do UTM parameters in a URL allow marketers to do?',
        options: [
          'Encrypt the URL to prevent unauthorized access',
          'Track the source, medium, campaign, term, and content that drove a user to the website',
          'Speed up page load times',
          'Block bots from visiting the page'
        ],
        correctIndex: 1,
        explanation: 'UTM (Urchin Tracking Module) parameters (utm_source, utm_medium, utm_campaign, utm_term, utm_content) are appended to URLs so analytics tools can attribute traffic to specific marketing channels and campaigns.'
      },
      {
        question: 'What is the difference between first-party and third-party cookies?',
        options: [
          'First-party cookies are larger in size than third-party cookies',
          'First-party cookies are set by the domain the user visits, while third-party cookies are set by external domains (e.g., ad networks) embedded on the page',
          'Third-party cookies are more secure than first-party cookies',
          'First-party cookies only work on mobile devices'
        ],
        correctIndex: 1,
        explanation: 'First-party cookies are created by the website domain the user is visiting and are used for functionality and analytics. Third-party cookies are set by external domains and are commonly used for cross-site tracking and advertising, and are being phased out by major browsers.'
      },
      {
        question: 'In A/B testing, why is it important to reach statistical significance before declaring a winner?',
        options: [
          'It is a legal requirement for all websites',
          'To ensure the observed difference is likely real and not due to random chance in the sample',
          'To make the test run faster',
          'Statistical significance is only needed for server-side tests'
        ],
        correctIndex: 1,
        explanation: 'Statistical significance indicates that the difference between variants is unlikely due to random variation. Ending tests too early risks acting on noise rather than a real effect, leading to incorrect business decisions.'
      },
      {
        question: 'What is the primary function of a Tag Management System (e.g., Google Tag Manager)?',
        options: [
          'To design website layouts and themes',
          'To manage and deploy marketing and analytics tags (JavaScript snippets) on a website without modifying the site codebase directly',
          'To manage product pricing tags in an e-commerce store',
          'To compile and minify JavaScript files'
        ],
        correctIndex: 1,
        explanation: 'A TMS provides a centralized interface to add, edit, and remove tracking tags (analytics, advertising pixels, etc.) without requiring code deployments, using triggers and variables to control when tags fire.'
      }
    ],
    mid: [
      {
        question: 'What is a Customer Data Platform (CDP) and how does it differ from a CRM?',
        options: [
          'A CDP and CRM are identical systems',
          'A CDP unifies customer data from all sources into persistent individual profiles for any system to use, while a CRM primarily manages direct sales interactions and relationships',
          'A CRM handles more data sources than a CDP',
          'A CDP is only used for email marketing'
        ],
        correctIndex: 1,
        explanation: 'A CDP ingests data from websites, apps, CRM, email, ads, and offline sources to build unified customer profiles accessible by all marketing tools. A CRM focuses on managing direct customer relationships and sales pipeline data.'
      },
      {
        question: 'In multi-touch attribution modeling, what does a "time decay" model assume?',
        options: [
          'All touchpoints receive equal credit for a conversion',
          'Only the first touchpoint receives credit',
          'Touchpoints closer in time to the conversion receive more credit than earlier touchpoints',
          'Only paid media touchpoints receive credit'
        ],
        correctIndex: 2,
        explanation: 'A time decay attribution model assigns increasing credit to touchpoints that occur closer to the conversion event, based on the assumption that more recent interactions had a greater influence on the purchase decision.'
      },
      {
        question: 'Under GDPR, what must a website obtain before setting non-essential cookies (e.g., advertising cookies)?',
        options: [
          'Nothing, cookies can always be set freely',
          'Explicit, informed, and freely given consent from the user before the cookies are placed',
          'Only a notification banner that the site uses cookies',
          'Approval from the web hosting provider'
        ],
        correctIndex: 1,
        explanation: 'GDPR requires explicit, informed, freely given consent before placing non-essential cookies. Users must be able to accept or reject specific cookie categories, and consent must be documented. Implied consent from continued browsing is not sufficient.'
      },
      {
        question: 'When integrating marketing tools via APIs, what is a webhook and when is it preferred over polling?',
        options: [
          'A webhook is a type of database query',
          'A webhook is a user-defined HTTP callback that is triggered by an event, preferred when you need real-time notifications without the overhead of continuously polling an API',
          'A webhook is the same as a REST GET request',
          'Webhooks are only used for payment processing'
        ],
        correctIndex: 1,
        explanation: 'Webhooks push data to your endpoint when an event occurs (e.g., form submission, purchase), eliminating the need to poll repeatedly. This is more efficient and provides near real-time data, whereas polling introduces latency and wastes API calls.'
      },
      {
        question: 'What is a "data layer" in the context of tag management and analytics?',
        options: [
          'A physical layer of servers in a data center',
          'A structured JavaScript object on the page that serves as a standardized intermediary between the website and marketing/analytics tags',
          'A CSS styling layer for data visualization',
          'A database table that stores analytics data'
        ],
        correctIndex: 1,
        explanation: 'A data layer (e.g., window.dataLayer) is a JavaScript object that holds structured information about the page, user, and events. Tags read from this layer rather than scraping the DOM, providing a reliable, standardized data contract between development and marketing.'
      }
    ],
    senior: [
      {
        question: 'What is the key technical challenge in implementing real-time website personalization at scale?',
        options: [
          'Choosing the right font for personalized content',
          'Making sub-100ms decisions that combine user identity resolution, segment evaluation, and content selection without impacting page load performance',
          'Creating enough variations of the homepage image',
          'Setting up A/B tests for each user individually'
        ],
        correctIndex: 1,
        explanation: 'Real-time personalization requires resolving user identity, evaluating segment membership, selecting content, and rendering it all within tight latency budgets. This demands edge computing, efficient data lookup (CDN/cache), and smart fallback strategies to avoid degrading user experience.'
      },
      {
        question: 'With the deprecation of third-party cookies, which approach enables privacy-preserving cross-site analytics?',
        options: [
          'Simply using larger third-party cookies',
          'Techniques like server-side tracking, first-party data strategies, privacy-preserving APIs (Topics, Attribution Reporting), and data clean rooms',
          'Disabling all analytics tracking entirely',
          'Switching from JavaScript to server-rendered pages'
        ],
        correctIndex: 1,
        explanation: 'Privacy-preserving analytics combines server-side tracking (moving logic off the client), first-party data enrichment, browser privacy APIs (Privacy Sandbox), and data clean rooms that enable aggregate analysis without exposing individual user data.'
      },
      {
        question: 'When designing a marketing automation architecture, what is the primary benefit of an event-driven approach over batch processing?',
        options: [
          'Event-driven systems are always cheaper to run',
          'Event-driven architectures enable real-time triggered communications (e.g., abandoned cart emails within minutes) and decoupled, scalable service interactions',
          'Batch processing cannot handle any marketing data',
          'Event-driven systems eliminate the need for a database'
        ],
        correctIndex: 1,
        explanation: 'Event-driven marketing automation reacts to user actions in real-time via message queues/streams, enabling timely triggered campaigns. Services are decoupled through events, improving scalability and allowing independent evolution of each component.'
      },
      {
        question: 'How can predictive analytics improve customer lifetime value (CLV) in a marketing technology stack?',
        options: [
          'By randomly assigning customers to segments',
          'By using historical behavioral data and ML models to forecast future purchase probability, churn risk, and optimal intervention timing for each customer',
          'By increasing ad spend across all channels equally',
          'By reducing the number of marketing emails sent'
        ],
        correctIndex: 1,
        explanation: 'Predictive CLV models use features like purchase recency, frequency, monetary value, and engagement patterns to forecast future customer value. This enables targeted retention campaigns, optimized acquisition spend, and personalized offers based on predicted behavior.'
      },
      {
        question: 'What is the main challenge in cross-channel orchestration for marketing campaigns?',
        options: [
          'Choosing between email and SMS as the only two channels',
          'Coordinating consistent, timely, and personalized messaging across email, SMS, push, ads, and web while respecting frequency caps, channel preferences, and a unified customer journey',
          'Sending the same message on all channels simultaneously',
          'Using a separate database for each channel'
        ],
        correctIndex: 1,
        explanation: 'Cross-channel orchestration must unify customer identity across channels, respect per-channel preferences and fatigue rules, sequence messages based on engagement signals, and maintain journey coherence so customers receive the right message on the right channel at the right time.'
      }
    ]
  }
};
