export const devSetupGuides = {
  'ai-engineer': {
    title: 'AI Engineer Development Setup',
    prerequisites: [
      'Python 3.9+',
      'pip package manager',
      'Git for version control',
      'Text editor or IDE (VS Code, PyCharm)'
    ],
    steps: [
      {
        title: 'Install Python and Virtual Environment',
        description: 'Set up a Python virtual environment to isolate project dependencies.',
        commands: [
          {
            cmd: 'python --version',
            description: 'Verify Python is installed (should be 3.9 or higher)'
          },
          {
            cmd: 'python -m venv ai-env',
            description: 'Create a virtual environment named ai-env'
          },
          {
            cmd: 'source ai-env/bin/activate',
            description: 'Activate the virtual environment (Linux/Mac)'
          }
        ],
        verification: {
          cmd: 'python -c "import sys; print(sys.prefix)"',
          expected: 'Path should point to your ai-env directory'
        }
      },
      {
        title: 'Install Core AI/ML Libraries',
        description: 'Install essential Python packages for AI development.',
        commands: [
          {
            cmd: 'pip install --upgrade pip',
            description: 'Upgrade pip to the latest version'
          },
          {
            cmd: 'pip install openai langchain langchain-community langgraph python-dotenv requests',
            description: 'Install LLM and RAG libraries'
          },
          {
            cmd: 'pip install numpy pandas scikit-learn',
            description: 'Install data manipulation and ML foundations'
          }
        ],
        verification: {
          cmd: 'python -c "import langchain; import openai; print(\'Success\')"',
          expected: 'Success message printed'
        }
      },
      {
        title: 'Set Up Environment Variables',
        description: 'Configure API keys and sensitive credentials securely.',
        commands: [
          {
            cmd: 'cp .env.example .env',
            description: 'Copy example environment file'
          },
          {
            cmd: 'echo "OPENAI_API_KEY=your_key_here" >> .env',
            description: 'Add OpenAI API key to .env file'
          },
          {
            cmd: 'python -c "from dotenv import load_dotenv; load_dotenv(); import os; print(os.getenv(\'OPENAI_API_KEY\'))"',
            description: 'Test that environment variables load correctly'
          }
        ],
        verification: {
          cmd: 'cat .env | grep OPENAI_API_KEY',
          expected: 'OPENAI_API_KEY variable should be defined'
        }
      },
      {
        title: 'Create Your First RAG Script',
        description: 'Set up a simple RAG pipeline to test the environment.',
        commands: [
          {
            cmd: 'cat > test_rag.py << \'EOF\'\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\nfrom langchain_openai import OpenAIEmbeddings\nprint("RAG environment ready!")\nEOF',
            description: 'Create a basic RAG test script'
          },
          {
            cmd: 'python test_rag.py',
            description: 'Run the test script'
          }
        ],
        verification: {
          cmd: 'python test_rag.py 2>&1 | grep "ready"',
          expected: 'RAG environment ready! message'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'OpenAI API key not working',
        solution: 'Verify the key is valid at platform.openai.com/account/api-keys. Check .env file formatting (no quotes around key).'
      },
      {
        problem: 'Module not found errors',
        solution: 'Ensure virtual environment is activated. Run: source ai-env/bin/activate (Linux/Mac) or ai-env\\Scripts\\activate (Windows)'
      },
      {
        problem: 'pip install hangs or fails',
        solution: 'Update pip first: pip install --upgrade pip. Check internet connection and try: pip install -U --no-cache-dir package_name'
      },
      {
        problem: 'LangChain compatibility issues',
        solution: 'Reinstall with compatible versions: pip install "langchain==0.1.0" "langchain-community==0.1.0"'
      }
    ]
  },

  'backend-developer': {
    title: 'Backend Developer Development Setup',
    prerequisites: [
      'Python 3.10+',
      'pip package manager',
      'Git for version control',
      'PostgreSQL or SQLite (optional for databases)',
      'Docker (for containerization)',
      'Postman or curl (for API testing)'
    ],
    steps: [
      {
        title: 'Set Up Python Environment',
        description: 'Initialize a virtual environment for backend development.',
        commands: [
          {
            cmd: 'python --version',
            description: 'Verify Python 3.10+ is installed'
          },
          {
            cmd: 'python -m venv backend-env',
            description: 'Create isolated virtual environment'
          },
          {
            cmd: 'source backend-env/bin/activate',
            description: 'Activate the environment'
          }
        ],
        verification: {
          cmd: 'which python',
          expected: 'Should point to backend-env/bin/python'
        }
      },
      {
        title: 'Install FastAPI and Django',
        description: 'Set up both popular Python web frameworks.',
        commands: [
          {
            cmd: 'pip install fastapi uvicorn',
            description: 'Install FastAPI async framework'
          },
          {
            cmd: 'pip install django djangorestframework',
            description: 'Install Django framework'
          },
          {
            cmd: 'pip install sqlalchemy psycopg2-binary pytest',
            description: 'Install ORM, database driver, and testing framework'
          }
        ],
        verification: {
          cmd: 'python -c "import fastapi; import django; print(\'Frameworks ready\')"',
          expected: 'Frameworks ready message'
        }
      },
      {
        title: 'Create FastAPI Project',
        description: 'Bootstrap a new FastAPI application.',
        commands: [
          {
            cmd: 'mkdir my-api && cd my-api',
            description: 'Create project directory'
          },
          {
            cmd: 'cat > main.py << \'EOF\'\nfrom fastapi import FastAPI\napp = FastAPI()\n@app.get("/health")\nasync def health_check():\n    return {"status": "ok"}\nEOF',
            description: 'Create basic FastAPI application'
          },
          {
            cmd: 'uvicorn main:app --reload',
            description: 'Start development server'
          }
        ],
        verification: {
          cmd: 'curl http://localhost:8000/health',
          expected: '{"status":"ok"}'
        }
      },
      {
        title: 'Set Up Database Connection',
        description: 'Configure SQLAlchemy for database access.',
        commands: [
          {
            cmd: 'cat > database.py << \'EOF\'\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.orm import declarative_base, sessionmaker\nDATABASE_URL = "sqlite:///./test.db"\nengine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})\nSessionLocal = sessionmaker(bind=engine)\nBase = declarative_base()\nEOF',
            description: 'Create database configuration file'
          },
          {
            cmd: 'python -c "from database import engine, Base; Base.metadata.create_all(engine); print(\'Database ready\')"',
            description: 'Initialize database'
          }
        ],
        verification: {
          cmd: 'ls -la test.db',
          expected: 'Database file should exist'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Port 8000 already in use',
        solution: 'Run on different port: uvicorn main:app --port 8001 --reload'
      },
      {
        problem: 'Database connection errors',
        solution: 'Verify DATABASE_URL in database.py. For PostgreSQL: postgresql://user:password@localhost/dbname'
      },
      {
        problem: 'Module import errors',
        solution: 'Check virtual environment is activated and requirements are installed'
      },
      {
        problem: 'CORS errors',
        solution: 'Add CORS middleware: from fastapi.middleware.cors import CORSMiddleware'
      }
    ]
  },

  'data-engineer': {
    title: 'Data Engineer Development Setup',
    prerequisites: [
      'Python 3.9+',
      'Java 8+ (for Spark)',
      'pip package manager',
      'Git for version control',
      'PostgreSQL or MySQL (for databases)',
      'Docker (for containerization)'
    ],
    steps: [
      {
        title: 'Set Up Python Environment',
        description: 'Create isolated Python environment for data engineering.',
        commands: [
          {
            cmd: 'python -m venv data-env',
            description: 'Create virtual environment'
          },
          {
            cmd: 'source data-env/bin/activate',
            description: 'Activate environment'
          },
          {
            cmd: 'pip install --upgrade pip',
            description: 'Update pip'
          }
        ],
        verification: {
          cmd: 'python --version',
          expected: 'Should show Python 3.9 or higher'
        }
      },
      {
        title: 'Install Data Manipulation Libraries',
        description: 'Install core data engineering tools.',
        commands: [
          {
            cmd: 'pip install pandas numpy sqlalchemy psycopg2-binary',
            description: 'Install data manipulation libraries'
          },
          {
            cmd: 'pip install dbt-core dbt-postgres',
            description: 'Install dbt for data transformation'
          },
          {
            cmd: 'pip install apache-airflow great-expectations',
            description: 'Install orchestration and data quality tools'
          }
        ],
        verification: {
          cmd: 'python -c "import pandas; import dbt; print(\'Data tools ready\')"',
          expected: 'Data tools ready message'
        }
      },
      {
        title: 'Set Up Apache Spark',
        description: 'Configure Spark for distributed data processing.',
        commands: [
          {
            cmd: 'pip install pyspark',
            description: 'Install PySpark'
          },
          {
            cmd: 'python -c "from pyspark.sql import SparkSession; spark = SparkSession.builder.appName(\'test\').getOrCreate(); print(\'Spark ready\')"',
            description: 'Test Spark initialization'
          }
        ],
        verification: {
          cmd: 'python -c "import pyspark; print(pyspark.__version__)"',
          expected: 'Should print Spark version'
        }
      },
      {
        title: 'Initialize dbt Project',
        description: 'Set up a dbt project structure.',
        commands: [
          {
            cmd: 'dbt init my_project',
            description: 'Create new dbt project'
          },
          {
            cmd: 'cd my_project && cat > profiles.yml << \'EOF\'\nmy_project:\n  target: dev\n  outputs:\n    dev:\n      type: postgres\n      host: localhost\n      port: 5432\nEOF',
            description: 'Configure dbt database connection'
          }
        ],
        verification: {
          cmd: 'dbt --version',
          expected: 'Should show dbt version'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Spark Java errors',
        solution: 'Ensure Java 8+ is installed: java -version. Set JAVA_HOME environment variable.'
      },
      {
        problem: 'Database connection fails',
        solution: 'Verify PostgreSQL is running and credentials in profiles.yml are correct'
      },
      {
        problem: 'dbt initialization fails',
        solution: 'Ensure database is accessible and credentials are correct before running dbt init'
      },
      {
        problem: 'Memory errors with large datasets',
        solution: 'Increase Spark driver memory: spark-submit --driver-memory 4g script.py'
      }
    ]
  },

  'data-scientist': {
    title: 'Data Scientist Development Setup',
    prerequisites: [
      'Python 3.9+',
      'pip package manager',
      'Jupyter Notebook or JupyterLab',
      'Git for version control',
      'Text editor or IDE'
    ],
    steps: [
      {
        title: 'Create Virtual Environment',
        description: 'Set up isolated Python environment.',
        commands: [
          {
            cmd: 'python -m venv ds-env',
            description: 'Create virtual environment'
          },
          {
            cmd: 'source ds-env/bin/activate',
            description: 'Activate the environment'
          }
        ],
        verification: {
          cmd: 'which python',
          expected: 'Should point to ds-env'
        }
      },
      {
        title: 'Install Data Science Stack',
        description: 'Install NumPy, Pandas, Scikit-learn, and visualization libraries.',
        commands: [
          {
            cmd: 'pip install numpy pandas scikit-learn',
            description: 'Install core data science libraries'
          },
          {
            cmd: 'pip install matplotlib seaborn plotly jupyter jupyterlab',
            description: 'Install visualization and notebook tools'
          },
          {
            cmd: 'pip install scipy statsmodels',
            description: 'Install statistical libraries'
          }
        ],
        verification: {
          cmd: 'python -c "import numpy; import pandas; import sklearn; print(\'DS stack ready\')"',
          expected: 'DS stack ready message'
        }
      },
      {
        title: 'Install Machine Learning Libraries',
        description: 'Add advanced ML and deep learning frameworks.',
        commands: [
          {
            cmd: 'pip install xgboost lightgbm catboost',
            description: 'Install gradient boosting libraries'
          },
          {
            cmd: 'pip install torch torchvision',
            description: 'Install PyTorch for deep learning'
          },
          {
            cmd: 'pip install tensorflow',
            description: 'Install TensorFlow (alternative to PyTorch)'
          }
        ],
        verification: {
          cmd: 'python -c "import xgboost; import torch; print(\'ML libraries ready\')"',
          expected: 'ML libraries ready message'
        }
      },
      {
        title: 'Launch Jupyter Notebook',
        description: 'Start Jupyter environment for interactive analysis.',
        commands: [
          {
            cmd: 'mkdir notebooks && cd notebooks',
            description: 'Create notebooks directory'
          },
          {
            cmd: 'jupyter notebook',
            description: 'Launch Jupyter notebook server'
          }
        ],
        verification: {
          cmd: 'jupyter --version',
          expected: 'Should show Jupyter version'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Kernel crashes when importing libraries',
        solution: 'Ensure virtual environment is activated. Reinstall: pip install --upgrade --force-reinstall numpy pandas'
      },
      {
        problem: 'Jupyter kernel not found',
        solution: 'Install ipykernel: pip install ipykernel && python -m ipykernel install --user'
      },
      {
        problem: 'TensorFlow/PyTorch GPU errors',
        solution: 'Use CPU version for development. For GPU: pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118'
      },
      {
        problem: 'Memory issues with large datasets',
        solution: 'Use chunking: pd.read_csv(file, chunksize=10000) or dask for parallel processing'
      }
    ]
  },

  'devops-platform-engineer': {
    title: 'DevOps / Platform Engineer Development Setup',
    prerequisites: [
      'Docker Desktop',
      'Git for version control',
      'Azure CLI (if using Azure)',
      'kubectl (for Kubernetes)',
      'Terraform or Bicep (IaC tools)',
      'Text editor or IDE'
    ],
    steps: [
      {
        title: 'Install Docker',
        description: 'Set up Docker for containerization.',
        commands: [
          {
            cmd: 'docker --version',
            description: 'Verify Docker installation'
          },
          {
            cmd: 'docker run hello-world',
            description: 'Test Docker with hello-world container'
          }
        ],
        verification: {
          cmd: 'docker ps',
          expected: 'Should show container list (may be empty)'
        }
      },
      {
        title: 'Install Kubernetes Tools',
        description: 'Set up kubectl and local Kubernetes cluster.',
        commands: [
          {
            cmd: 'kubectl version --client',
            description: 'Check kubectl installation'
          },
          {
            cmd: 'docker ps',
            description: 'Docker Desktop should have Kubernetes enabled'
          },
          {
            cmd: 'kubectl cluster-info',
            description: 'Verify cluster connection'
          }
        ],
        verification: {
          cmd: 'kubectl get nodes',
          expected: 'Should list cluster nodes'
        }
      },
      {
        title: 'Install Infrastructure as Code Tools',
        description: 'Set up Terraform and Azure CLI.',
        commands: [
          {
            cmd: 'terraform --version',
            description: 'Verify Terraform installation'
          },
          {
            cmd: 'az --version',
            description: 'Verify Azure CLI installation'
          },
          {
            cmd: 'az login',
            description: 'Authenticate with Azure'
          }
        ],
        verification: {
          cmd: 'az account show',
          expected: 'Should show current Azure subscription'
        }
      },
      {
        title: 'Create First Docker Image',
        description: 'Build and run a Docker container.',
        commands: [
          {
            cmd: 'cat > Dockerfile << \'EOF\'\nFROM python:3.11-slim\nWORKDIR /app\nCOPY . .\nRUN pip install flask\nCMD ["python", "app.py"]\nEOF',
            description: 'Create a Dockerfile'
          },
          {
            cmd: 'cat > app.py << \'EOF\'\nfrom flask import Flask\napp = Flask(__name__)\n@app.route("/")\ndef hello():\n    return "Hello DevOps!"\nif __name__ == "__main__":\n    app.run(host="0.0.0.0")\nEOF',
            description: 'Create simple Flask application'
          },
          {
            cmd: 'docker build -t my-app:1.0 .',
            description: 'Build Docker image'
          }
        ],
        verification: {
          cmd: 'docker images | grep my-app',
          expected: 'Should list my-app image'
        }
      },
      {
        title: 'Deploy to Local Kubernetes',
        description: 'Deploy application to Kubernetes.',
        commands: [
          {
            cmd: 'cat > deployment.yaml << \'EOF\'\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: my-app\n  template:\n    metadata:\n      labels:\n        app: my-app\n    spec:\n      containers:\n      - name: my-app\n        image: my-app:1.0\nEOF',
            description: 'Create Kubernetes deployment'
          },
          {
            cmd: 'kubectl apply -f deployment.yaml',
            description: 'Apply deployment'
          }
        ],
        verification: {
          cmd: 'kubectl get pods',
          expected: 'Should list running pod'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Docker daemon not running',
        solution: 'Start Docker Desktop or run: sudo systemctl start docker'
      },
      {
        problem: 'kubectl connection refused',
        solution: 'Ensure Kubernetes is enabled in Docker Desktop settings'
      },
      {
        problem: 'Image pull errors in Kubernetes',
        solution: 'Use imagePullPolicy: Never for local images in deployment.yaml'
      },
      {
        problem: 'Terraform state conflicts',
        solution: 'Use terraform lock and remote state backend: terraform backend config -backend-config=...'
      }
    ]
  },

  'frontend-developer': {
    title: 'Frontend Developer Development Setup',
    prerequisites: [
      'Node.js 18+ with npm',
      'Git for version control',
      'VS Code or preferred code editor',
      'Browser DevTools familiarity',
      'Package manager (npm or yarn)'
    ],
    steps: [
      {
        title: 'Install Node.js and npm',
        description: 'Verify Node.js and npm are installed.',
        commands: [
          {
            cmd: 'node --version',
            description: 'Check Node.js version (should be 18+)'
          },
          {
            cmd: 'npm --version',
            description: 'Verify npm is installed'
          },
          {
            cmd: 'npm config get registry',
            description: 'Check npm registry configuration'
          }
        ],
        verification: {
          cmd: 'which node && which npm',
          expected: 'Should show paths to node and npm'
        }
      },
      {
        title: 'Create React Project',
        description: 'Bootstrap a new React application.',
        commands: [
          {
            cmd: 'npx create-react-app my-frontend',
            description: 'Create new React project with Create React App'
          },
          {
            cmd: 'cd my-frontend',
            description: 'Navigate to project directory'
          },
          {
            cmd: 'npm start',
            description: 'Start development server'
          }
        ],
        verification: {
          cmd: 'curl http://localhost:3000',
          expected: 'React app should be accessible'
        }
      },
      {
        title: 'Install TypeScript',
        description: 'Add TypeScript support to React project.',
        commands: [
          {
            cmd: 'npm install --save typescript @types/react @types/react-dom',
            description: 'Install TypeScript dependencies'
          },
          {
            cmd: 'npx tsc --init',
            description: 'Create tsconfig.json'
          }
        ],
        verification: {
          cmd: 'npm run build',
          expected: 'Build should complete without errors'
        }
      },
      {
        title: 'Set Up Testing Framework',
        description: 'Configure Jest and React Testing Library.',
        commands: [
          {
            cmd: 'npm install --save-dev jest @testing-library/react @testing-library/jest-dom',
            description: 'Install testing libraries'
          },
          {
            cmd: 'cat > src/App.test.tsx << \'EOF\'\nimport { render, screen } from "@testing-library/react";\nimport App from "./App";\n\ntest("renders learn react link", () => {\n  render(<App />);\n  expect(screen.getByText(/learn react/i)).toBeInTheDocument();\n});\nEOF',
            description: 'Create sample test'
          },
          {
            cmd: 'npm test',
            description: 'Run tests'
          }
        ],
        verification: {
          cmd: 'npm test -- --listTests',
          expected: 'Should list test files'
        }
      },
      {
        title: 'Install Styling Tools',
        description: 'Add Tailwind CSS for styling.',
        commands: [
          {
            cmd: 'npm install -D tailwindcss postcss autoprefixer',
            description: 'Install Tailwind CSS'
          },
          {
            cmd: 'npx tailwindcss init -p',
            description: 'Generate Tailwind configuration'
          }
        ],
        verification: {
          cmd: 'ls -la tailwind.config.js postcss.config.js',
          expected: 'Config files should exist'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'npm install hangs',
        solution: 'Clear cache: npm cache clean --force and retry'
      },
      {
        problem: 'Port 3000 already in use',
        solution: 'Run on different port: PORT=3001 npm start'
      },
      {
        problem: 'TypeScript errors in React',
        solution: 'Ensure .tsx file extension is used and tsconfig.json includes React settings'
      },
      {
        problem: 'CSS not applying with Tailwind',
        solution: 'Verify tailwind.config.js content paths are correct'
      }
    ]
  },

  'ml-engineer': {
    title: 'ML Engineer Development Setup',
    prerequisites: [
      'Python 3.10+',
      'pip package manager',
      'Jupyter Notebook or JupyterLab',
      'Git for version control',
      'CUDA toolkit (optional, for GPU support)'
    ],
    steps: [
      {
        title: 'Create Python Virtual Environment',
        description: 'Set up isolated environment for ML development.',
        commands: [
          {
            cmd: 'python -m venv ml-env',
            description: 'Create virtual environment'
          },
          {
            cmd: 'source ml-env/bin/activate',
            description: 'Activate environment'
          }
        ],
        verification: {
          cmd: 'python --version',
          expected: 'Should show Python 3.10+'
        }
      },
      {
        title: 'Install Core ML Libraries',
        description: 'Install scikit-learn, PyTorch, and data handling.',
        commands: [
          {
            cmd: 'pip install numpy pandas scikit-learn',
            description: 'Install fundamental ML libraries'
          },
          {
            cmd: 'pip install torch torchvision torchaudio',
            description: 'Install PyTorch for deep learning'
          },
          {
            cmd: 'pip install matplotlib seaborn plotly',
            description: 'Install visualization libraries'
          }
        ],
        verification: {
          cmd: 'python -c "import sklearn; import torch; print(\'ML stack ready\')"',
          expected: 'ML stack ready message'
        }
      },
      {
        title: 'Install MLOps Tools',
        description: 'Set up MLflow for experiment tracking.',
        commands: [
          {
            cmd: 'pip install mlflow',
            description: 'Install MLflow for tracking experiments'
          },
          {
            cmd: 'mlflow --version',
            description: 'Verify MLflow installation'
          },
          {
            cmd: 'mlflow ui',
            description: 'Start MLflow tracking server'
          }
        ],
        verification: {
          cmd: 'curl http://localhost:5000',
          expected: 'MLflow UI should be accessible'
        }
      },
      {
        title: 'Create Training Script',
        description: 'Set up basic ML training pipeline.',
        commands: [
          {
            cmd: 'cat > train.py << \'EOF\'\nimport mlflow\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nwith mlflow.start_run():\n    model = RandomForestClassifier(n_estimators=10)\n    model.fit(X_train, y_train)\n    score = model.score(X_test, y_test)\n    mlflow.log_metric("accuracy", score)\n    print(f"Accuracy: {score}")\nEOF',
            description: 'Create training script with MLflow'
          },
          {
            cmd: 'python train.py',
            description: 'Run training script'
          }
        ],
        verification: {
          cmd: 'ls -la mlruns/',
          expected: 'MLflow run artifacts should be stored'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'PyTorch takes long time to install',
        solution: 'Use pre-built wheels: pip install torch --index-url https://download.pytorch.org/whl/cpu'
      },
      {
        problem: 'CUDA/GPU not detected',
        solution: 'For CPU-only development, this is fine. For GPU: install CUDA toolkit and verify with torch.cuda.is_available()'
      },
      {
        problem: 'MLflow models directory conflicts',
        solution: 'Use mlflow.set_tracking_uri() to set custom directory'
      },
      {
        problem: 'Model serialization errors',
        solution: 'Use joblib: joblib.dump(model, "model.pkl") instead of pickle'
      }
    ]
  },

  'marketing-technology-developer': {
    title: 'Marketing Technology Developer Development Setup',
    prerequisites: [
      'Python 3.9+',
      'pip package manager',
      'Google Analytics account (for testing)',
      'Postman or curl (for API testing)',
      'Text editor or IDE'
    ],
    steps: [
      {
        title: 'Set Up Python Environment',
        description: 'Create virtual environment for marketing tech development.',
        commands: [
          {
            cmd: 'python -m venv martech-env',
            description: 'Create virtual environment'
          },
          {
            cmd: 'source martech-env/bin/activate',
            description: 'Activate environment'
          }
        ],
        verification: {
          cmd: 'which python',
          expected: 'Should point to martech-env'
        }
      },
      {
        title: 'Install Data and Analytics Libraries',
        description: 'Install libraries for data manipulation and analysis.',
        commands: [
          {
            cmd: 'pip install pandas numpy scikit-learn',
            description: 'Install data processing libraries'
          },
          {
            cmd: 'pip install matplotlib seaborn plotly',
            description: 'Install visualization tools'
          },
          {
            cmd: 'pip install google-analytics-python-api',
            description: 'Install Google Analytics API client'
          }
        ],
        verification: {
          cmd: 'python -c "import pandas; import matplotlib; print(\'Analytics stack ready\')"',
          expected: 'Analytics stack ready message'
        }
      },
      {
        title: 'Set Up Google Analytics Connection',
        description: 'Configure GA4 API credentials.',
        commands: [
          {
            cmd: 'cat > .env << \'EOF\'\nGA4_PROPERTY_ID=your_property_id\nGA4_MEASUREMENT_ID=your_measurement_id\nEOF',
            description: 'Create GA4 configuration'
          },
          {
            cmd: 'pip install google-analytics-python-api python-dotenv',
            description: 'Install GA4 client libraries'
          }
        ],
        verification: {
          cmd: 'python -c "from dotenv import load_dotenv; load_dotenv(); import os; print(os.getenv(\'GA4_PROPERTY_ID\'))"',
          expected: 'Should print property ID'
        }
      },
      {
        title: 'Create A/B Testing Framework',
        description: 'Set up statistical testing utilities.',
        commands: [
          {
            cmd: 'pip install scipy statsmodels',
            description: 'Install statistical testing libraries'
          },
          {
            cmd: 'cat > ab_test.py << \'EOF\'\nfrom scipy import stats\nimport numpy as np\n\n# Sample A/B test\ncontrol = [1, 0, 1, 1, 0, 1]\nvariant = [1, 1, 1, 0, 1, 1]\n\nstat, pvalue = stats.ttest_ind(control, variant)\nprint(f"P-value: {pvalue}")\nEOF',
            description: 'Create A/B testing script'
          },
          {
            cmd: 'python ab_test.py',
            description: 'Test A/B testing functionality'
          }
        ],
        verification: {
          cmd: 'python -c "from scipy import stats; print(\'Statistical testing ready\')"',
          expected: 'Statistical testing ready message'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'GA4 API authentication fails',
        solution: 'Verify credentials in .env file and ensure Google Analytics API is enabled'
      },
      {
        problem: 'Statistical test libraries conflict',
        solution: 'Install specific versions: pip install scipy==1.11.0 statsmodels==0.14.0'
      },
      {
        problem: 'DataFrame operations slow',
        solution: 'Use vectorized operations instead of loops. Consider dask for large datasets.'
      },
      {
        problem: 'Visualization not displaying',
        solution: 'In Jupyter: %matplotlib inline or use plotly for interactive charts'
      }
    ]
  },

  'qa-test-engineer': {
    title: 'QA / Test Engineer Development Setup',
    prerequisites: [
      'Node.js 16+ with npm',
      'Python 3.9+',
      'Git for version control',
      'VS Code or IDE with debugging support',
      'Chrome/Firefox browsers'
    ],
    steps: [
      {
        title: 'Set Up Node Environment',
        description: 'Create environment for JavaScript-based testing.',
        commands: [
          {
            cmd: 'node --version',
            description: 'Verify Node.js 16+ is installed'
          },
          {
            cmd: 'npm init -y',
            description: 'Initialize npm project'
          }
        ],
        verification: {
          cmd: 'npm -v',
          expected: 'Should show npm version'
        }
      },
      {
        title: 'Install E2E Testing Frameworks',
        description: 'Set up Playwright for automated testing.',
        commands: [
          {
            cmd: 'npm install --save-dev @playwright/test',
            description: 'Install Playwright'
          },
          {
            cmd: 'npx playwright install',
            description: 'Download browser binaries'
          },
          {
            cmd: 'npm install --save-dev cypress',
            description: 'Install Cypress as alternative'
          }
        ],
        verification: {
          cmd: 'npx playwright --version',
          expected: 'Should show Playwright version'
        }
      },
      {
        title: 'Install API Testing Tools',
        description: 'Set up Postman CLI for API testing.',
        commands: [
          {
            cmd: 'npm install --save-dev postman-cli',
            description: 'Install Postman CLI'
          },
          {
            cmd: 'pip install requests pytest',
            description: 'Install Python API testing libraries'
          }
        ],
        verification: {
          cmd: 'npx postman --version',
          expected: 'Should show Postman version'
        }
      },
      {
        title: 'Set Up Performance Testing',
        description: 'Install k6 for load testing.',
        commands: [
          {
            cmd: 'npm install --save-dev k6',
            description: 'Install k6 package'
          },
          {
            cmd: 'cat > test.js << \'EOF\'\nimport http from "k6/http";\nimport { check } from "k6";\n\nexport default function() {\n  const res = http.get("https://httpbin.org/get");\n  check(res, { "status is 200": (r) => r.status === 200 });\n}\nEOF',
            description: 'Create sample k6 test'
          }
        ],
        verification: {
          cmd: 'npx k6 --version',
          expected: 'Should show k6 version'
        }
      },
      {
        title: 'Create Test Structure',
        description: 'Set up test directory and configuration.',
        commands: [
          {
            cmd: 'mkdir -p tests/e2e tests/api tests/unit',
            description: 'Create test directories'
          },
          {
            cmd: 'cat > playwright.config.ts << \'EOF\'\nimport { defineConfig, devices } from "@playwright/test";\n\nexport default defineConfig({\n  testDir: "./tests/e2e",\n  use: { baseURL: "http://localhost:3000" },\n});\nEOF',
            description: 'Create Playwright configuration'
          }
        ],
        verification: {
          cmd: 'ls -la tests/',
          expected: 'Test directories should exist'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Browser download hangs',
        solution: 'Run: npx playwright install --with-deps'
      },
      {
        problem: 'Playwright timeouts on slow network',
        solution: 'Increase timeout in config: timeout: 60000'
      },
      {
        problem: 'k6 VU errors',
        solution: 'Check system resources. Increase ulimit: ulimit -n 65536'
      },
      {
        problem: 'API test credentials exposed',
        solution: 'Use environment variables and .env files with gitignore'
      }
    ]
  },

  'security-engineer': {
    title: 'Security Engineer Development Setup',
    prerequisites: [
      'Linux system (native or VM)',
      'Python 3.9+',
      'Git for version control',
      'Docker (for vulnerable app testing)',
      'Network analysis tools (Wireshark optional)'
    ],
    steps: [
      {
        title: 'Set Up Python Security Environment',
        description: 'Create environment for security tools.',
        commands: [
          {
            cmd: 'python -m venv security-env',
            description: 'Create virtual environment'
          },
          {
            cmd: 'source security-env/bin/activate',
            description: 'Activate environment'
          }
        ],
        verification: {
          cmd: 'which python',
          expected: 'Should point to security-env'
        }
      },
      {
        title: 'Install Security Scanning Tools',
        description: 'Install SAST/DAST and vulnerability scanning.',
        commands: [
          {
            cmd: 'pip install bandit',
            description: 'Install Bandit for Python code security'
          },
          {
            cmd: 'pip install safety',
            description: 'Install Safety for dependency vulnerabilities'
          },
          {
            cmd: 'pip install requests cryptography',
            description: 'Install testing and crypto libraries'
          }
        ],
        verification: {
          cmd: 'bandit --version && safety --version',
          expected: 'Should show version numbers'
        }
      },
      {
        title: 'Set Up OWASP Testing Environment',
        description: 'Install tools for penetration testing.',
        commands: [
          {
            cmd: 'pip install requests-oauthlib pyjwt',
            description: 'Install OAuth and JWT testing libraries'
          },
          {
            cmd: 'docker pull owasp/zap2docker-stable',
            description: 'Pull OWASP ZAP Docker image'
          }
        ],
        verification: {
          cmd: 'python -c "import jwt; print(\'Security stack ready\')"',
          expected: 'Security stack ready message'
        }
      },
      {
        title: 'Create Security Test Scripts',
        description: 'Build reusable security testing utilities.',
        commands: [
          {
            cmd: 'cat > test_security.py << \'EOF\'\nimport jwt\nfrom datetime import datetime, timedelta\n\n# Test JWT creation and validation\nsecret = "test-secret-key"\npayload = {"user_id": 1, "exp": datetime.utcnow() + timedelta(hours=1)}\ntoken = jwt.encode(payload, secret, algorithm="HS256")\nprint(f"Generated token: {token}")\n\ndecoded = jwt.decode(token, secret, algorithms=["HS256"])\nprint(f"Decoded: {decoded}")\nEOF',
            description: 'Create JWT testing script'
          },
          {
            cmd: 'python test_security.py',
            description: 'Run security test'
          }
        ],
        verification: {
          cmd: 'ls -la test_security.py',
          expected: 'Script should exist'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Bandit false positives',
        solution: 'Create .bandit config file to exclude low-severity issues'
      },
      {
        problem: 'OWASP ZAP container errors',
        solution: 'Ensure Docker daemon is running and sufficient disk space available'
      },
      {
        problem: 'JWT signature verification fails',
        solution: 'Verify algorithm matches (HS256 vs RS256) and use correct secret/key'
      },
      {
        problem: 'Network scanning blocked by firewall',
        solution: 'Use localhost for testing or request firewall exceptions'
      }
    ]
  },

  'tech-lead-architect': {
    title: 'Tech Lead / Architect Development Setup',
    prerequisites: [
      'Multiple tech stacks (Python, Node.js, Docker)',
      'System design knowledge',
      'Cloud platform CLI (Azure, AWS, GCP)',
      'Collaboration tools (GitHub, Jira, Confluence)',
      'Diagramming tools (Lucidchart, Draw.io)'
    ],
    steps: [
      {
        title: 'Set Up Multi-Language Environment',
        description: 'Configure environments for architecture guidance.',
        commands: [
          {
            cmd: 'node --version && python --version && docker --version',
            description: 'Verify key tooling is installed'
          },
          {
            cmd: 'mkdir -p ~/projects/architecture-examples',
            description: 'Create architecture examples directory'
          }
        ],
        verification: {
          cmd: 'ls -la ~/projects/architecture-examples',
          expected: 'Directory should exist'
        }
      },
      {
        title: 'Install Architecture Documentation Tools',
        description: 'Set up tools for ADRs and diagrams.',
        commands: [
          {
            cmd: 'npm install --global mermaid-cli',
            description: 'Install Mermaid for diagrams'
          },
          {
            cmd: 'pip install adr-tools',
            description: 'Install Architecture Decision Record tools'
          }
        ],
        verification: {
          cmd: 'mmdc --version && adr --version',
          expected: 'Should show version numbers'
        }
      },
      {
        title: 'Configure Cloud CLI Tools',
        description: 'Set up access to cloud platforms.',
        commands: [
          {
            cmd: 'az --version',
            description: 'Verify Azure CLI'
          },
          {
            cmd: 'aws --version',
            description: 'Verify AWS CLI'
          },
          {
            cmd: 'gcloud --version',
            description: 'Verify Google Cloud SDK'
          }
        ],
        verification: {
          cmd: 'az account show || echo "Run az login"',
          expected: 'Should show current account'
        }
      },
      {
        title: 'Create System Design Documentation Template',
        description: 'Set up template for architecture decisions.',
        commands: [
          {
            cmd: 'adr init docs/adr',
            description: 'Initialize ADR directory'
          },
          {
            cmd: 'adr new "Use PostgreSQL for primary datastore"',
            description: 'Create sample ADR'
          }
        ],
        verification: {
          cmd: 'ls -la docs/adr/',
          expected: 'ADR files should exist'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Multiple Node versions cause conflicts',
        solution: 'Use nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash'
      },
      {
        problem: 'Cloud CLI authentication fails',
        solution: 'Authenticate each platform: az login, aws configure, gcloud auth login'
      },
      {
        problem: 'Mermaid diagram rendering issues',
        solution: 'Ensure Node.js v14+ installed and try: mmdc -i diagram.mmd -o diagram.png'
      },
      {
        problem: 'ADR tools not found',
        solution: 'Verify npm global install: npm list -g adr-tools'
      }
    ]
  }
};
