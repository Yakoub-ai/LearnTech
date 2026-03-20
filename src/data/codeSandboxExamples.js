export const codeSandboxExamples = {
  'ai-engineer': [
    {
      id: 'ai-1',
      title: 'Basic Prompt to OpenAI API',
      language: 'python',
      level: 'beginner',
      code: `from openai import OpenAI

client = OpenAI(api_key="your-api-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ],
    temperature=0.7,
    max_tokens=150
)

print(response.choices[0].message.content)`,
      description: 'Send a prompt to OpenAI API and retrieve a response.'
    },
    {
      id: 'ai-2',
      title: 'RAG Pipeline with LangChain',
      language: 'python',
      level: 'mid',
      code: `from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

# Load documents
loader = TextLoader("document.txt")
documents = loader.load()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(documents)

# Create embeddings and vector store
embeddings = OpenAIEmbeddings()
vector_store = FAISS.from_documents(chunks, embeddings)

# Create QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(),
    chain_type="stuff",
    retriever=vector_store.as_retriever()
)

# Ask a question
result = qa_chain.run("What is the main topic of the document?")
print(result)`,
      description: 'Build a complete RAG pipeline for document-based question answering.'
    },
    {
      id: 'ai-3',
      title: 'Few-Shot Prompting Example',
      language: 'python',
      level: 'senior',
      code: `from openai import OpenAI

client = OpenAI(api_key="your-api-key")

# Few-shot examples to guide the model
examples = [
    {"input": "The weather is beautiful", "sentiment": "positive"},
    {"input": "I hate waiting in traffic", "sentiment": "negative"},
    {"input": "It was just okay", "sentiment": "neutral"}
]

prompt = "Classify the sentiment of the following text:\\n"
for example in examples:
    prompt += f"Text: {example['input']}\\nSentiment: {example['sentiment']}\\n"
prompt += f"Text: This movie was amazing!\\nSentiment:"

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": prompt}],
    temperature=0
)

print(response.choices[0].message.content)`,
      description: 'Use few-shot examples to improve model performance on specific tasks.'
    },
    {
      id: 'ai-4',
      title: 'Streaming Chat Response',
      language: 'python',
      level: 'mid',
      code: `# WHAT YOU'LL LEARN:
# - How to stream responses from OpenAI for real-time output
# - Managing chat history for multi-turn conversations
# - Handling streaming errors gracefully

from openai import OpenAI
import openai
import sys

client = OpenAI(api_key="your-api-key")

class StreamingChat:
    """A chat client that streams responses token by token."""

    def __init__(self, model="gpt-4", system_prompt="You are a helpful assistant."):
        self.model = model
        self.history = [{"role": "system", "content": system_prompt}]

    def add_message(self, role, content):
        """Append a message to the conversation history."""
        self.history.append({"role": role, "content": content})

    def stream_response(self, user_message):
        """Send a message and stream the response in real time."""
        self.add_message("user", user_message)
        collected_content = []

        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=self.history,
                stream=True,
                temperature=0.7,
                max_tokens=500
            )

            for chunk in response:
                delta = chunk.choices[0].delta
                if delta.content:
                    token = delta.content
                    collected_content.append(token)
                    # Print each token as it arrives
                    sys.stdout.write(token)
                    sys.stdout.flush()

                # Check if the stream is finished
                if chunk.choices[0].finish_reason == "stop":
                    break

        except openai.RateLimitError:
            print("\\nRate limit reached. Please wait and retry.")
            return None
        except openai.APIError as e:
            print(f"\\nAPI error: {e}")
            return None

        # Save assistant reply to history
        full_reply = "".join(collected_content)
        self.add_message("assistant", full_reply)
        print()  # newline after stream ends
        return full_reply


# Usage example
chat = StreamingChat(system_prompt="You are a concise technical tutor.")
reply = chat.stream_response("Explain how transformers work in 3 sentences.")
reply = chat.stream_response("Now explain attention heads.")

# EXERCISE:
# Try modifying this to add a token counter that tracks total
# tokens used across the conversation. Hint: len(collected_content)
# gives you an approximation per response.`,
      description: 'Stream OpenAI chat completions token-by-token with conversation history.'
    },
    {
      id: 'ai-5',
      title: 'Agent with Tool Use',
      language: 'python',
      level: 'senior',
      code: `# WHAT YOU'LL LEARN:
# - Building an AI agent that can call external tools
# - Defining function schemas for the OpenAI function-calling API
# - Parsing and dispatching tool calls in a loop

from openai import OpenAI
import json

client = OpenAI(api_key="your-api-key")

# Define the tools the agent can use
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name"},
                    "units": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["city"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_database",
            "description": "Search a product database by query",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"},
                    "max_results": {"type": "integer", "default": 5}
                },
                "required": ["query"]
            }
        }
    }
]

def get_weather(city, units="celsius"):
    """Simulated weather lookup."""
    return {"city": city, "temp": 22, "units": units, "condition": "sunny"}

def search_database(query, max_results=5):
    """Simulated database search."""
    return {"results": [f"Product matching '{query}'" for _ in range(max_results)]}

# Map function names to callables
tool_dispatch = {
    "get_weather": get_weather,
    "search_database": search_database,
}

def run_agent(user_prompt):
    """Run the agent loop: send message, handle tool calls, return final answer."""
    messages = [
        {"role": "system", "content": "You are a helpful assistant with access to tools."},
        {"role": "user", "content": user_prompt}
    ]

    while True:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )
        msg = response.choices[0].message

        # If the model wants to call a tool
        if msg.tool_calls:
            messages.append(msg)
            for tool_call in msg.tool_calls:
                fn_name = tool_call.function.name
                fn_args = json.loads(tool_call.function.arguments)
                result = tool_dispatch[fn_name](**fn_args)
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(result)
                })
        else:
            # No more tool calls, return the final answer
            return msg.content

# Run the agent
answer = run_agent("What's the weather in Paris and find me winter jackets?")
print(answer)

# EXERCISE:
# Add a third tool called "send_email" that accepts to, subject, and body.
# Then ask the agent: "Email me a summary of the weather in Tokyo."`,
      description: 'Build a function-calling AI agent that dispatches to external tools in a loop.'
    }
  ],

  'backend-developer': [
    {
      id: 'be-1',
      title: 'FastAPI Endpoint with Validation',
      language: 'python',
      level: 'beginner',
      code: `from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: Optional[int] = None

@app.post("/users/")
async def create_user(user: User):
    return {"message": f"User {user.name} created", "user": user}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id, "name": "John Doe"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`,
      description: 'Create a FastAPI endpoint with request validation using Pydantic models.'
    },
    {
      id: 'be-2',
      title: 'SQLAlchemy ORM Model and Query',
      language: 'python',
      level: 'mid',
      code: `from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, Session
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)

Base.metadata.create_all(engine)

# Create a user
db = SessionLocal()
user = User(name="Alice", email="alice@example.com")
db.add(user)
db.commit()

# Query users
users = db.query(User).filter(User.name == "Alice").all()
print(users)`,
      description: 'Define ORM models and perform database operations with SQLAlchemy.'
    },
    {
      id: 'be-3',
      title: 'JWT Authentication',
      language: 'python',
      level: 'senior',
      code: `from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthCredentials
import jwt
from datetime import datetime, timedelta

app = FastAPI()
security = HTTPBearer()

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/login")
async def login(username: str):
    token = create_token({"sub": username})
    return {"access_token": token}

@app.get("/protected")
async def protected_route(payload: dict = Depends(verify_token)):
    return {"message": f"Hello {payload['sub']}"}`,
      description: 'Implement JWT-based authentication for protecting API routes.'
    },
    {
      id: 'be-4',
      title: 'Database Migration Script',
      language: 'python',
      level: 'mid',
      code: `# WHAT YOU'LL LEARN:
# - Writing forward and rollback database migrations
# - Tracking migration history in a metadata table
# - Safe schema changes with transaction support

import sqlite3
from datetime import datetime

class MigrationRunner:
    """A lightweight migration runner for SQLite (pattern applies to any DB)."""

    def __init__(self, db_path):
        self.conn = sqlite3.connect(db_path)
        self.cursor = self.conn.cursor()
        self._ensure_migration_table()

    def _ensure_migration_table(self):
        """Create the migrations tracking table if it doesn't exist."""
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS schema_migrations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                applied_at TEXT NOT NULL
            )
        """)
        self.conn.commit()

    def is_applied(self, name):
        """Check whether a migration has already been applied."""
        self.cursor.execute(
            "SELECT 1 FROM schema_migrations WHERE name = ?", (name,)
        )
        return self.cursor.fetchone() is not None

    def apply(self, name, up_sql, down_sql=None):
        """Apply a migration if it hasn't been run yet."""
        if self.is_applied(name):
            print(f"  SKIP  {name} (already applied)")
            return

        try:
            self.cursor.executescript(up_sql)
            self.cursor.execute(
                "INSERT INTO schema_migrations (name, applied_at) VALUES (?, ?)",
                (name, datetime.utcnow().isoformat())
            )
            self.conn.commit()
            print(f"  UP    {name}")
        except Exception as e:
            self.conn.rollback()
            print(f"  FAIL  {name}: {e}")
            raise

    def rollback(self, name, down_sql):
        """Roll back a previously applied migration."""
        if not self.is_applied(name):
            print(f"  SKIP  {name} (not applied)")
            return

        try:
            self.cursor.executescript(down_sql)
            self.cursor.execute(
                "DELETE FROM schema_migrations WHERE name = ?", (name,)
            )
            self.conn.commit()
            print(f"  DOWN  {name}")
        except Exception as e:
            self.conn.rollback()
            print(f"  FAIL  {name}: {e}")
            raise

    def close(self):
        self.conn.close()


# Define migrations as (name, up_sql, down_sql)
migrations = [
    (
        "001_create_users",
        "CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, name TEXT);",
        "DROP TABLE IF EXISTS users;"
    ),
    (
        "002_add_created_at",
        "ALTER TABLE users ADD COLUMN created_at TEXT DEFAULT CURRENT_TIMESTAMP;",
        # SQLite doesn't support DROP COLUMN easily; recreate table in real scenario
        None
    ),
]

# Run all migrations forward
runner = MigrationRunner("app.db")
for name, up, down in migrations:
    runner.apply(name, up, down)
runner.close()

# EXERCISE:
# Add a "003_create_posts" migration that creates a posts table
# with id, user_id (foreign key), title, and body columns.`,
      description: 'Build a lightweight database migration runner with forward and rollback support.'
    },
    {
      id: 'be-5',
      title: 'Rate Limiter Middleware',
      language: 'python',
      level: 'senior',
      code: `# WHAT YOU'LL LEARN:
# - Implementing a sliding-window rate limiter
# - Using in-memory storage (easily swappable with Redis)
# - Building ASGI middleware for FastAPI

import time
from collections import defaultdict
from fastapi import FastAPI, Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

class RateLimiter:
    """Sliding-window rate limiter backed by in-memory storage."""

    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        # key -> list of request timestamps
        self.requests: dict[str, list[float]] = defaultdict(list)

    def _cleanup(self, key: str):
        """Remove timestamps outside the current window."""
        cutoff = time.time() - self.window_seconds
        self.requests[key] = [
            ts for ts in self.requests[key] if ts > cutoff
        ]

    def is_allowed(self, key: str) -> tuple[bool, dict]:
        """Check if the request is allowed and return rate-limit headers."""
        self._cleanup(key)
        current_count = len(self.requests[key])
        remaining = max(0, self.max_requests - current_count)

        if current_count >= self.max_requests:
            retry_after = self.requests[key][0] + self.window_seconds - time.time()
            return False, {
                "X-RateLimit-Limit": str(self.max_requests),
                "X-RateLimit-Remaining": "0",
                "Retry-After": str(int(retry_after) + 1),
            }

        self.requests[key].append(time.time())
        return True, {
            "X-RateLimit-Limit": str(self.max_requests),
            "X-RateLimit-Remaining": str(remaining - 1),
        }


class RateLimitMiddleware(BaseHTTPMiddleware):
    """FastAPI middleware that applies rate limiting per client IP."""

    def __init__(self, app, max_requests=100, window_seconds=60):
        super().__init__(app)
        self.limiter = RateLimiter(max_requests, window_seconds)

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host
        allowed, headers = self.limiter.is_allowed(client_ip)

        if not allowed:
            response = JSONResponse(
                status_code=429,
                content={"detail": "Too many requests. Please slow down."}
            )
            for key, value in headers.items():
                response.headers[key] = value
            return response

        response = await call_next(request)
        for key, value in headers.items():
            response.headers[key] = value
        return response


# Wire it up
app = FastAPI()
app.add_middleware(RateLimitMiddleware, max_requests=10, window_seconds=60)

@app.get("/")
async def root():
    return {"message": "Hello, you are within the rate limit!"}

@app.get("/health")
async def health():
    return {"status": "ok"}

# EXERCISE:
# Swap the in-memory dict for Redis using the redis-py library.
# Hint: use a sorted set with timestamps as scores for each key.`,
      description: 'Implement sliding-window rate limiting as FastAPI middleware with proper headers.'
    }
  ],

  'data-engineer': [
    {
      id: 'de-1',
      title: 'SQL Query with Joins and Aggregation',
      language: 'sql',
      level: 'beginner',
      code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) as total_orders,
    SUM(o.amount) as total_spent,
    AVG(o.amount) as avg_order_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(o.order_id) > 5
ORDER BY total_spent DESC
LIMIT 10;`,
      description: 'Perform complex SQL aggregations with joins and filtering.'
    },
    {
      id: 'de-2',
      title: 'PySpark ETL Pipeline',
      language: 'python',
      level: 'mid',
      code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, avg, date_format

spark = SparkSession.builder.appName("ETL").getOrCreate()

# Extract
raw_data = spark.read.csv("data.csv", header=True)

# Transform
transformed = (raw_data
    .filter(col("amount") > 0)
    .withColumn("transaction_date", date_format(col("timestamp"), "yyyy-MM-dd"))
    .groupBy("customer_id", "transaction_date")
    .agg(
        sum("amount").alias("total"),
        avg("amount").alias("avg_amount")
    ))

# Load
transformed.write.mode("overwrite").parquet("output/transactions")

spark.stop()`,
      description: 'Build a scalable ETL pipeline using Apache Spark.'
    },
    {
      id: 'de-3',
      title: 'Apache Airflow DAG',
      language: 'python',
      level: 'senior',
      code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-engineer',
    'retries': 1,
    'retry_delay': timedelta(minutes=5)
}

def extract_data():
    print("Extracting data from source...")
    # Your extraction logic here

def transform_data():
    print("Transforming data...")
    # Your transformation logic here

def load_data():
    print("Loading data to warehouse...")
    # Your loading logic here

with DAG(
    'etl_pipeline',
    default_args=default_args,
    schedule_interval='0 0 * * *',
    start_date=datetime(2024, 1, 1)
) as dag:
    extract = PythonOperator(task_id='extract', python_callable=extract_data)
    transform = PythonOperator(task_id='transform', python_callable=transform_data)
    load = PythonOperator(task_id='load', python_callable=load_data)

    extract >> transform >> load`,
      description: 'Define and schedule an ETL workflow using Apache Airflow.'
    },
    {
      id: 'de-4',
      title: 'Data Quality Checks',
      language: 'python',
      level: 'mid',
      code: `# WHAT YOU'LL LEARN:
# - Building reusable data quality validation functions
# - Checking for nulls, duplicates, schema drift, and value ranges
# - Generating a summary report of all quality issues

import pandas as pd
from dataclasses import dataclass, field

@dataclass
class QualityResult:
    check_name: str
    passed: bool
    details: str

class DataQualityChecker:
    """Run a suite of quality checks against a pandas DataFrame."""

    def __init__(self, df: pd.DataFrame):
        self.df = df
        self.results: list[QualityResult] = []

    def check_nulls(self, columns: list[str], max_null_pct: float = 0.0):
        """Ensure null percentage stays below threshold."""
        for col in columns:
            if col not in self.df.columns:
                self.results.append(QualityResult(
                    f"null_check:{col}", False, f"Column '{col}' missing"
                ))
                continue
            null_pct = self.df[col].isnull().mean()
            passed = null_pct <= max_null_pct
            self.results.append(QualityResult(
                f"null_check:{col}", passed,
                f"Null%={null_pct:.2%} (max={max_null_pct:.2%})"
            ))

    def check_unique(self, columns: list[str]):
        """Ensure no duplicate rows for a given key."""
        dup_count = self.df.duplicated(subset=columns, keep=False).sum()
        passed = dup_count == 0
        self.results.append(QualityResult(
            f"unique_check:{','.join(columns)}", passed,
            f"Duplicate rows: {dup_count}"
        ))

    def check_value_range(self, column: str, min_val=None, max_val=None):
        """Ensure values fall within an expected range."""
        violations = 0
        if min_val is not None:
            violations += (self.df[column] < min_val).sum()
        if max_val is not None:
            violations += (self.df[column] > max_val).sum()
        passed = violations == 0
        self.results.append(QualityResult(
            f"range_check:{column}", passed,
            f"Out-of-range rows: {violations}"
        ))

    def check_schema(self, expected_columns: list[str]):
        """Verify the DataFrame has exactly the expected columns."""
        actual = set(self.df.columns)
        expected = set(expected_columns)
        missing = expected - actual
        extra = actual - expected
        passed = not missing and not extra
        self.results.append(QualityResult(
            "schema_check", passed,
            f"Missing: {missing or 'none'}, Extra: {extra or 'none'}"
        ))

    def report(self):
        """Print a formatted report of all quality checks."""
        print(f"{'CHECK':<35} {'STATUS':<8} DETAILS")
        print("-" * 80)
        for r in self.results:
            status = "PASS" if r.passed else "FAIL"
            print(f"{r.check_name:<35} {status:<8} {r.details}")
        failed = sum(1 for r in self.results if not r.passed)
        print(f"\\nTotal: {len(self.results)} checks, {failed} failed")
        return failed == 0


# Usage
df = pd.read_csv("sales_data.csv")
checker = DataQualityChecker(df)
checker.check_schema(["order_id", "customer_id", "amount", "order_date"])
checker.check_nulls(["order_id", "amount"], max_null_pct=0.01)
checker.check_unique(["order_id"])
checker.check_value_range("amount", min_val=0, max_val=100000)
all_passed = checker.report()

# EXERCISE:
# Add a check_freshness method that verifies the most recent
# date in a date column is within N days of today.`,
      description: 'Build a reusable data quality framework with null, uniqueness, range, and schema checks.'
    },
    {
      id: 'de-5',
      title: 'Incremental Load Pattern',
      language: 'python',
      level: 'senior',
      code: `# WHAT YOU'LL LEARN:
# - Implementing incremental (delta) loads instead of full refreshes
# - Using high-water marks to track the last loaded record
# - Upserting new/changed records into a target table

import sqlite3
from datetime import datetime

class IncrementalLoader:
    """Load only new or updated rows from source to target using a watermark."""

    def __init__(self, source_db: str, target_db: str):
        self.source = sqlite3.connect(source_db)
        self.target = sqlite3.connect(target_db)
        self._ensure_watermark_table()

    def _ensure_watermark_table(self):
        """Create the watermark tracking table in the target database."""
        self.target.execute("""
            CREATE TABLE IF NOT EXISTS _watermarks (
                table_name TEXT PRIMARY KEY,
                last_value TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)
        self.target.commit()

    def get_watermark(self, table_name: str) -> str:
        """Retrieve the last watermark value for a table."""
        row = self.target.execute(
            "SELECT last_value FROM _watermarks WHERE table_name = ?",
            (table_name,)
        ).fetchone()
        return row[0] if row else "1970-01-01T00:00:00"

    def set_watermark(self, table_name: str, value: str):
        """Update the watermark after a successful load."""
        self.target.execute("""
            INSERT INTO _watermarks (table_name, last_value, updated_at)
            VALUES (?, ?, ?)
            ON CONFLICT(table_name) DO UPDATE SET
                last_value = excluded.last_value,
                updated_at = excluded.updated_at
        """, (table_name, value, datetime.utcnow().isoformat()))
        self.target.commit()

    def extract_delta(self, table_name: str, watermark_col: str):
        """Pull rows from source where watermark_col > last watermark."""
        wm = self.get_watermark(table_name)
        query = f"SELECT * FROM {table_name} WHERE {watermark_col} > ? ORDER BY {watermark_col}"
        rows = self.source.execute(query, (wm,)).fetchall()
        columns = [d[0] for d in self.source.execute(f"SELECT * FROM {table_name} LIMIT 0").description]
        print(f"  Extracted {len(rows)} new rows from {table_name} (watermark > {wm})")
        return columns, rows

    def upsert(self, table_name: str, columns: list, rows: list, key_col: str):
        """Insert or replace rows into the target table."""
        if not rows:
            print(f"  No new data for {table_name}")
            return
        placeholders = ", ".join(["?"] * len(columns))
        col_list = ", ".join(columns)
        self.target.executemany(
            f"INSERT OR REPLACE INTO {table_name} ({col_list}) VALUES ({placeholders})",
            rows
        )
        self.target.commit()
        print(f"  Upserted {len(rows)} rows into target.{table_name}")

    def run(self, table_name: str, watermark_col: str, key_col: str):
        """Execute a full incremental load cycle for one table."""
        print(f"Loading {table_name}...")
        columns, rows = self.extract_delta(table_name, watermark_col)
        self.upsert(table_name, columns, rows, key_col)
        if rows:
            # The watermark column is the last value from the ordered results
            wm_idx = columns.index(watermark_col)
            new_wm = rows[-1][wm_idx]
            self.set_watermark(table_name, str(new_wm))
            print(f"  New watermark: {new_wm}")

    def close(self):
        self.source.close()
        self.target.close()


# Usage
loader = IncrementalLoader("source.db", "warehouse.db")
loader.run("orders", watermark_col="updated_at", key_col="order_id")
loader.run("customers", watermark_col="updated_at", key_col="customer_id")
loader.close()

# EXERCISE:
# Add a dry_run mode that extracts and logs the delta
# but skips the upsert and watermark update.`,
      description: 'Implement incremental data loads using watermark-based change detection and upserts.'
    }
  ],

  'data-scientist': [
    {
      id: 'ds-1',
      title: 'Pandas Exploratory Data Analysis',
      language: 'python',
      level: 'beginner',
      code: `import pandas as pd
import numpy as np

# Load data
df = pd.read_csv("sales_data.csv")

# Basic exploration
print(df.head())
print(df.info())
print(df.describe())

# Missing values
print(df.isnull().sum())

# Correlations
print(df.corr())

# Group by analysis
sales_by_region = df.groupby('region').agg({
    'revenue': 'sum',
    'units_sold': 'mean',
    'customer_id': 'count'
})

print(sales_by_region)`,
      description: 'Perform exploratory data analysis using Pandas.'
    },
    {
      id: 'ds-2',
      title: 'Scikit-learn Model Training',
      language: 'python',
      level: 'mid',
      code: `from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score

# Load and prepare data
X = features_data  # Your feature matrix
y = target_data    # Your target variable

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate
y_pred = model.predict(X_test_scaled)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(f"Precision: {precision_score(y_test, y_pred)}")
print(f"Recall: {recall_score(y_test, y_pred)}")`,
      description: 'Train and evaluate a machine learning model with scikit-learn.'
    },
    {
      id: 'ds-3',
      title: 'Data Visualization with Matplotlib',
      language: 'python',
      level: 'senior',
      code: `import matplotlib.pyplot as plt
import seaborn as sns

# Set style
sns.set_style("whitegrid")

# Create figure with subplots
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Histogram
axes[0, 0].hist(df['age'], bins=30, edgecolor='black')
axes[0, 0].set_title('Age Distribution')

# Scatter plot
axes[0, 1].scatter(df['income'], df['spending'], alpha=0.5)
axes[0, 1].set_title('Income vs Spending')

# Box plot
axes[1, 0].boxplot([df[df['category'] == cat]['value'] for cat in df['category'].unique()])
axes[1, 0].set_title('Value by Category')

# Line plot
axes[1, 1].plot(df['date'], df['revenue'], marker='o')
axes[1, 1].set_title('Revenue Over Time')

plt.tight_layout()
plt.show()`,
      description: 'Create comprehensive data visualizations with Matplotlib and Seaborn.'
    },
    {
      id: 'ds-4',
      title: 'Cross-Validation Pipeline',
      language: 'python',
      level: 'mid',
      code: `# WHAT YOU'LL LEARN:
# - Building a robust cross-validation pipeline with multiple models
# - Using stratified k-fold to preserve class balance
# - Comparing models with confidence intervals on metrics

import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedKFold, cross_validate
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC

def build_pipeline(model):
    """Wrap any estimator in a standardized pipeline."""
    return Pipeline([
        ("scaler", StandardScaler()),
        ("model", model)
    ])

# Define candidate models
candidates = {
    "LogisticRegression": LogisticRegression(max_iter=1000),
    "RandomForest": RandomForestClassifier(n_estimators=100, random_state=42),
    "GradientBoosting": GradientBoostingClassifier(n_estimators=100, random_state=42),
    "SVM": SVC(kernel="rbf", probability=True),
}

# Load data (replace with your own dataset)
from sklearn.datasets import load_breast_cancer
data = load_breast_cancer()
X, y = data.data, data.target

# Stratified K-Fold preserves class distribution in every fold
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# Scoring metrics to evaluate
scoring = ["accuracy", "precision_weighted", "recall_weighted", "f1_weighted"]

results = []
for name, model in candidates.items():
    pipe = build_pipeline(model)
    scores = cross_validate(pipe, X, y, cv=cv, scoring=scoring, return_train_score=False)

    row = {"model": name}
    for metric in scoring:
        key = f"test_{metric}"
        mean = scores[key].mean()
        std = scores[key].std()
        row[f"{metric}_mean"] = round(mean, 4)
        row[f"{metric}_std"] = round(std, 4)
    results.append(row)
    print(f"{name:25s}  accuracy={row['accuracy_mean']:.4f} +/- {row['accuracy_std']:.4f}")

# Summary table
results_df = pd.DataFrame(results).sort_values("accuracy_mean", ascending=False)
print("\\n--- Model Comparison ---")
print(results_df.to_string(index=False))

# Best model
best = results_df.iloc[0]
print(f"\\nBest model: {best['model']} (accuracy={best['accuracy_mean']})")

# EXERCISE:
# Add a "NaiveBayes" candidate using GaussianNB and re-run.
# Which model wins on recall? Why might that matter in medical diagnosis?`,
      description: 'Compare multiple ML models using stratified cross-validation with confidence intervals.'
    },
    {
      id: 'ds-5',
      title: 'Feature Engineering Toolkit',
      language: 'python',
      level: 'senior',
      code: `# WHAT YOU'LL LEARN:
# - Creating date-based, numerical, and categorical features
# - Handling missing values with smart imputation strategies
# - Building a reusable feature engineering class

import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

class FeatureEngineer:
    """Reusable feature engineering toolkit for tabular datasets."""

    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()
        self.label_encoders: dict[str, LabelEncoder] = {}

    def add_date_features(self, date_col: str):
        """Extract rich temporal features from a date column."""
        dt = pd.to_datetime(self.df[date_col])
        self.df[f"{date_col}_year"] = dt.dt.year
        self.df[f"{date_col}_month"] = dt.dt.month
        self.df[f"{date_col}_dayofweek"] = dt.dt.dayofweek
        self.df[f"{date_col}_is_weekend"] = dt.dt.dayofweek.isin([5, 6]).astype(int)
        self.df[f"{date_col}_quarter"] = dt.dt.quarter
        # Days since earliest date (recency feature)
        self.df[f"{date_col}_days_since"] = (dt.max() - dt).dt.days
        print(f"  Added 6 date features from '{date_col}'")
        return self

    def add_numeric_interactions(self, col_a: str, col_b: str):
        """Create interaction features between two numeric columns."""
        self.df[f"{col_a}_x_{col_b}"] = self.df[col_a] * self.df[col_b]
        self.df[f"{col_a}_div_{col_b}"] = self.df[col_a] / self.df[col_b].replace(0, np.nan)
        self.df[f"{col_a}_plus_{col_b}"] = self.df[col_a] + self.df[col_b]
        print(f"  Added 3 interaction features for '{col_a}' x '{col_b}'")
        return self

    def add_binned_feature(self, col: str, bins: int = 5, labels=None):
        """Bin a continuous feature into discrete buckets."""
        self.df[f"{col}_binned"] = pd.qcut(
            self.df[col], q=bins, labels=labels, duplicates="drop"
        )
        print(f"  Binned '{col}' into {bins} quantile groups")
        return self

    def encode_categorical(self, columns: list[str]):
        """Label-encode categorical columns and store encoders for inverse transform."""
        for col in columns:
            le = LabelEncoder()
            # Handle NaN by filling with a placeholder
            filled = self.df[col].fillna("__MISSING__")
            self.df[f"{col}_encoded"] = le.fit_transform(filled)
            self.label_encoders[col] = le
        print(f"  Encoded {len(columns)} categorical columns")
        return self

    def impute_missing(self, strategy: dict[str, str]):
        """Impute missing values. strategy maps column -> 'mean'|'median'|'mode'|'zero'."""
        for col, method in strategy.items():
            if method == "mean":
                self.df[col].fillna(self.df[col].mean(), inplace=True)
            elif method == "median":
                self.df[col].fillna(self.df[col].median(), inplace=True)
            elif method == "mode":
                self.df[col].fillna(self.df[col].mode()[0], inplace=True)
            elif method == "zero":
                self.df[col].fillna(0, inplace=True)
        print(f"  Imputed {len(strategy)} columns")
        return self

    def get_dataframe(self) -> pd.DataFrame:
        return self.df


# Usage
df = pd.read_csv("ecommerce_data.csv")
fe = FeatureEngineer(df)
fe.add_date_features("order_date")
fe.add_numeric_interactions("quantity", "unit_price")
fe.add_binned_feature("total_spent", bins=4)
fe.encode_categorical(["category", "region"])
fe.impute_missing({"age": "median", "income": "mean"})

enriched_df = fe.get_dataframe()
print(f"\\nOriginal columns: {len(df.columns)}, Enriched columns: {len(enriched_df.columns)}")

# EXERCISE:
# Add a method add_rolling_features(col, window) that computes
# a rolling mean and rolling std over a sorted DataFrame.`,
      description: 'Build a reusable feature engineering toolkit for date, numeric, and categorical transformations.'
    }
  ],

  'devops-platform-engineer': [
    {
      id: 'devops-1',
      title: 'Dockerfile for Python Application',
      language: 'dockerfile',
      level: 'beginner',
      code: `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD python -c "import requests; requests.get('http://localhost:8000/health')"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
      description: 'Create a production-ready Docker image with health checks.'
    },
    {
      id: 'devops-2',
      title: 'Docker Compose Multi-Service Setup',
      language: 'yaml',
      level: 'mid',
      code: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/app
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./app:/app

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  postgres_data:`,
      description: 'Orchestrate multiple services with Docker Compose.'
    },
    {
      id: 'devops-3',
      title: 'GitHub Actions CI/CD Workflow',
      language: 'yaml',
      level: 'senior',
      code: `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.11

      - name: Install dependencies
        run: |
          pip install -r requirements.txt

      - name: Run tests
        run: pytest

      - name: Build and push Docker image
        if: github.ref == 'refs/heads/main'
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: myrepo/app:latest`,
      description: 'Implement continuous integration and deployment with GitHub Actions.'
    },
    {
      id: 'dv-4',
      title: 'Terraform Module',
      language: 'hcl',
      level: 'mid',
      code: `# WHAT YOU'LL LEARN:
# - Structuring a reusable Terraform module
# - Defining input variables with validation and defaults
# - Outputting resource attributes for downstream consumption

# ============================================================
# variables.tf - Input variables for the web-app module
# ============================================================

variable "app_name" {
  description = "Name of the application"
  type        = string
  validation {
    condition     = length(var.app_name) > 0 && length(var.app_name) <= 32
    error_message = "app_name must be between 1 and 32 characters."
  }
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "staging"
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "environment must be dev, staging, or production."
  }
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "min_instances" {
  description = "Minimum number of instances in the ASG"
  type        = number
  default     = 1
}

variable "max_instances" {
  description = "Maximum number of instances in the ASG"
  type        = number
  default     = 4
}

# ============================================================
# main.tf - Core resources
# ============================================================

locals {
  common_tags = {
    Application = var.app_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_launch_template" "app" {
  name_prefix   = "\${var.app_name}-\${var.environment}-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type

  tag_specifications {
    resource_type = "instance"
    tags          = local.common_tags
  }

  user_data = base64encode(<<-EOF
    #!/bin/bash
    yum update -y
    yum install -y docker
    systemctl start docker
    docker pull myrepo/\${var.app_name}:latest
    docker run -d -p 80:8000 myrepo/\${var.app_name}:latest
  EOF
  )
}

resource "aws_autoscaling_group" "app" {
  name                = "\${var.app_name}-\${var.environment}-asg"
  min_size            = var.min_instances
  max_size            = var.max_instances
  desired_capacity    = var.min_instances
  vpc_zone_identifier = var.subnet_ids

  launch_template {
    id      = aws_launch_template.app.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "\${var.app_name}-\${var.environment}"
    propagate_at_launch = true
  }
}

# ============================================================
# outputs.tf - Values exposed to callers of this module
# ============================================================

output "asg_name" {
  description = "Name of the Auto Scaling Group"
  value       = aws_autoscaling_group.app.name
}

output "launch_template_id" {
  description = "ID of the launch template"
  value       = aws_launch_template.app.id
}

# EXERCISE:
# Add an aws_lb (Application Load Balancer) resource that
# distributes traffic across the ASG instances on port 80.`,
      description: 'Build a reusable Terraform module with validated inputs, an ASG, and outputs.'
    },
    {
      id: 'dv-5',
      title: 'Kubernetes Deployment Manifest',
      language: 'yaml',
      level: 'senior',
      code: `# WHAT YOU'LL LEARN:
# - Writing a production-grade Kubernetes Deployment
# - Configuring health probes, resource limits, and rolling updates
# - Using ConfigMaps and Secrets for configuration

# ============================================================
# ConfigMap for non-sensitive configuration
# ============================================================
apiVersion: v1
kind: ConfigMap
metadata:
  name: webapp-config
  namespace: production
  labels:
    app: webapp
data:
  LOG_LEVEL: "info"
  MAX_CONNECTIONS: "100"
  FEATURE_FLAGS: "new-dashboard=true,beta-api=false"
---
# ============================================================
# Deployment with best-practice settings
# ============================================================
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
  namespace: production
  labels:
    app: webapp
    version: v1.2.0
spec:
  replicas: 3
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
        version: v1.2.0
    spec:
      serviceAccountName: webapp-sa
      terminationGracePeriodSeconds: 60
      containers:
        - name: webapp
          image: registry.example.com/webapp:v1.2.0
          ports:
            - containerPort: 8000
              protocol: TCP
          envFrom:
            - configMapRef:
                name: webapp-config
            - secretRef:
                name: webapp-secrets
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 10
            failureThreshold: 3
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8000
            initialDelaySeconds: 15
            periodSeconds: 20
            failureThreshold: 3
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sh", "-c", "sleep 10"]
---
# ============================================================
# Service to expose the Deployment
# ============================================================
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
  namespace: production
spec:
  selector:
    app: webapp
  ports:
    - port: 80
      targetPort: 8000
      protocol: TCP
  type: ClusterIP
---
# ============================================================
# HorizontalPodAutoscaler
# ============================================================
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webapp-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70

# EXERCISE:
# Add a PodDisruptionBudget that ensures at least 2 pods
# are always available during voluntary disruptions.`,
      description: 'Create a production Kubernetes deployment with probes, resource limits, HPA, and rolling updates.'
    }
  ],

  'frontend-developer': [
    {
      id: 'fe-1',
      title: 'React Component with Hooks',
      language: 'jsx',
      level: 'beginner',
      code: `import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-card">
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}`,
      description: 'Create a React functional component with useState and useEffect hooks.'
    },
    {
      id: 'fe-2',
      title: 'Fetching Data with Error Handling',
      language: 'jsx',
      level: 'mid',
      code: `import { useEffect, useState } from 'react';

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Network response failed');

        const data = await response.json();
        if (isMounted) {
          setPosts(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setPosts([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
      description: 'Implement proper data fetching with error handling and cleanup.'
    },
    {
      id: 'fe-3',
      title: 'Jest Unit Test for React Component',
      language: 'jsx',
      level: 'senior',
      code: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders login form with email and password inputs', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});`,
      description: 'Write unit tests for React components using Jest and React Testing Library.'
    },
    {
      id: 'fe-4',
      title: 'Custom Hook with Tests',
      language: 'jsx',
      level: 'mid',
      code: `// WHAT YOU'LL LEARN:
// - Extracting reusable logic into a custom React hook
// - Managing loading, error, and data states in one place
// - Testing hooks with renderHook from React Testing Library

import { useState, useEffect, useCallback } from 'react';

// ============================================================
// Custom Hook: useFetch
// ============================================================

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Expose a refetch function for manual retry
  return { data, loading, error, refetch: fetchData };
}

// ============================================================
// Tests: useFetch.test.js
// ============================================================

import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';

// Mock the global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useFetch', () => {
  it('returns data on successful fetch', async () => {
    const mockData = { users: [{ id: 1, name: 'Alice' }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('/api/users'));

    // Initially loading
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('returns error on failed fetch', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useFetch('/api/missing'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('HTTP 404: Not Found');
  });

  it('supports manual refetch', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ count: 1 }),
    });

    const { result } = renderHook(() => useFetch('/api/count'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Trigger refetch
    await result.current.refetch();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

// EXERCISE:
// Extend useFetch to accept a "skip" option that prevents
// automatic fetching on mount (useful for conditional queries).`,
      description: 'Build a custom useFetch hook with loading/error states and comprehensive tests.'
    },
    {
      id: 'fe-5',
      title: 'Accessible Form Component',
      language: 'jsx',
      level: 'senior',
      code: `// WHAT YOU'LL LEARN:
// - Building fully accessible forms following WAI-ARIA guidelines
// - Managing field-level validation with clear error announcements
// - Using aria-describedby, aria-invalid, and live regions

import React, { useState, useRef } from 'react';

export function AccessibleContactForm({ onSubmit }) {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const errorSummaryRef = useRef(null);

  const validators = {
    name: (v) => (v.trim().length < 2 ? 'Name must be at least 2 characters' : ''),
    email: (v) => (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) ? '' : 'Enter a valid email address'),
    message: (v) => (v.trim().length < 10 ? 'Message must be at least 10 characters' : ''),
  };

  function validate() {
    const newErrors = {};
    for (const [field, validator] of Object.entries(validators)) {
      const error = validator(values[field]);
      if (error) newErrors[field] = error;
    }
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error on change for this field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus the error summary so screen readers announce it
      errorSummaryRef.current?.focus();
      return;
    }

    setSubmitted(true);
    onSubmit?.(values);
  }

  const errorIds = Object.keys(errors);

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      {/* Error summary - announced by screen readers */}
      {errorIds.length > 0 && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          aria-label={\`Form has \${errorIds.length} error(s)\`}
          style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', border: '1px solid red' }}
        >
          <p>Please fix the following errors:</p>
          <ul>
            {errorIds.map((field) => (
              <li key={field}>
                <a href={\`#field-\${field}\`}>{errors[field]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Name field */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="field-name">Name *</label>
        <input
          id="field-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'error-name' : undefined}
        />
        {errors.name && <span id="error-name" role="alert" style={{ color: 'red' }}>{errors.name}</span>}
      </div>

      {/* Email field */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="field-email">Email *</label>
        <input
          id="field-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'error-email' : undefined}
        />
        {errors.email && <span id="error-email" role="alert" style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      {/* Message field */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="field-message">Message *</label>
        <textarea
          id="field-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'error-message' : undefined}
        />
        {errors.message && <span id="error-message" role="alert" style={{ color: 'red' }}>{errors.message}</span>}
      </div>

      <button type="submit">Send Message</button>

      {/* Success announcement for screen readers */}
      {submitted && (
        <p role="status" aria-live="polite" style={{ color: 'green' }}>
          Thank you! Your message has been sent.
        </p>
      )}
    </form>
  );
}

// EXERCISE:
// Add a phone number field with a custom validator that accepts
// international formats (e.g., +1-555-123-4567). Use aria-describedby
// to link a hint like "Format: +1-555-123-4567" to the input.`,
      description: 'Build a fully accessible contact form with ARIA attributes, error summaries, and screen reader support.'
    }
  ],

  'ml-engineer': [
    {
      id: 'ml-1',
      title: 'MLflow Experiment Tracking',
      language: 'python',
      level: 'beginner',
      code: `import mlflow
import mlflow.sklearn
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score

mlflow.set_experiment("iris-classification")

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

with mlflow.start_run(run_name="rf-baseline"):
    model = RandomForestClassifier(n_estimators=50, max_depth=5)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')

    mlflow.log_param("n_estimators", 50)
    mlflow.log_param("max_depth", 5)
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("precision", precision)
    mlflow.log_metric("recall", recall)

    mlflow.sklearn.log_model(model, "model")

    print(f"Run logged with ID: {mlflow.active_run().info.run_id}")`,
      description: 'Track ML experiments and model artifacts with MLflow.'
    },
    {
      id: 'ml-2',
      title: 'Model Serving with FastAPI',
      language: 'python',
      level: 'mid',
      code: `from fastapi import FastAPI
from pydantic import BaseModel
import mlflow.pyfunc
import numpy as np

app = FastAPI()

# Load model
model = mlflow.pyfunc.load_model("runs:/abc123/model")

class PredictionRequest(BaseModel):
    features: list[float]

class PredictionResponse(BaseModel):
    prediction: int
    probability: list[float]

@app.post("/predict")
def predict(request: PredictionRequest):
    features = np.array(request.features).reshape(1, -1)
    prediction = model.predict(features)

    return PredictionResponse(
        prediction=int(prediction[0]),
        probability=prediction.tolist()
    )

@app.get("/health")
def health():
    return {"status": "healthy"}`,
      description: 'Deploy a trained model as a REST API with FastAPI.'
    },
    {
      id: 'ml-3',
      title: 'Neural Network with PyTorch',
      language: 'python',
      level: 'senior',
      code: `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

# Create synthetic data
X = torch.randn(100, 10)
y = torch.randint(0, 3, (100,))
dataset = TensorDataset(X, y)
loader = DataLoader(dataset, batch_size=32)

# Train model
model = SimpleNN(10, 64, 3)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    for batch_X, batch_y in loader:
        optimizer.zero_grad()
        outputs = model(batch_X)
        loss = criterion(outputs, batch_y)
        loss.backward()
        optimizer.step()
    print(f"Epoch {epoch+1}: Loss = {loss.item():.4f}")`,
      description: 'Build and train a neural network using PyTorch.'
    },
    {
      id: 'ml-4',
      title: 'Model Evaluation Dashboard',
      language: 'python',
      level: 'mid',
      code: `# WHAT YOU'LL LEARN:
# - Computing and displaying a full suite of classification metrics
# - Generating a confusion matrix and per-class report
# - Building a reusable evaluator for comparing model versions

import numpy as np
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score
)

class ModelEvaluator:
    """Evaluate a classification model and produce a comprehensive report."""

    def __init__(self, model, class_names=None):
        self.model = model
        self.class_names = class_names
        self.results = {}

    def evaluate(self, X_test, y_test):
        """Run predictions and compute all metrics."""
        y_pred = self.model.predict(X_test)

        # Basic metrics
        self.results["accuracy"] = accuracy_score(y_test, y_pred)
        self.results["precision"] = precision_score(y_test, y_pred, average="weighted", zero_division=0)
        self.results["recall"] = recall_score(y_test, y_pred, average="weighted", zero_division=0)
        self.results["f1"] = f1_score(y_test, y_pred, average="weighted", zero_division=0)

        # Confusion matrix
        self.results["confusion_matrix"] = confusion_matrix(y_test, y_pred)

        # Per-class report
        self.results["classification_report"] = classification_report(
            y_test, y_pred,
            target_names=self.class_names,
            zero_division=0
        )

        # AUC (for binary or multi-class with predict_proba)
        if hasattr(self.model, "predict_proba"):
            y_proba = self.model.predict_proba(X_test)
            if y_proba.shape[1] == 2:
                self.results["auc"] = roc_auc_score(y_test, y_proba[:, 1])
            else:
                self.results["auc"] = roc_auc_score(
                    y_test, y_proba, multi_class="ovr", average="weighted"
                )

        return self.results

    def print_report(self):
        """Display a formatted evaluation report."""
        print("=" * 60)
        print("MODEL EVALUATION REPORT")
        print("=" * 60)
        print(f"  Accuracy:   {self.results['accuracy']:.4f}")
        print(f"  Precision:  {self.results['precision']:.4f}")
        print(f"  Recall:     {self.results['recall']:.4f}")
        print(f"  F1 Score:   {self.results['f1']:.4f}")
        if "auc" in self.results:
            print(f"  AUC:        {self.results['auc']:.4f}")
        print("-" * 60)
        print("Confusion Matrix:")
        print(self.results["confusion_matrix"])
        print("-" * 60)
        print("Per-Class Report:")
        print(self.results["classification_report"])

    def compare(self, other_evaluator):
        """Compare this model's metrics to another evaluator's."""
        print(f"{'Metric':<15} {'This Model':<15} {'Other Model':<15} {'Delta':<10}")
        print("-" * 55)
        for metric in ["accuracy", "precision", "recall", "f1"]:
            a = self.results.get(metric, 0)
            b = other_evaluator.results.get(metric, 0)
            delta = a - b
            arrow = "+" if delta >= 0 else ""
            print(f"{metric:<15} {a:<15.4f} {b:<15.4f} {arrow}{delta:.4f}")


# Usage
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

evaluator = ModelEvaluator(model, class_names=["setosa", "versicolor", "virginica"])
evaluator.evaluate(X_test, y_test)
evaluator.print_report()

# EXERCISE:
# Train a second model (e.g., LogisticRegression), create another
# evaluator, and use the compare() method to see which performs better.`,
      description: 'Build a reusable model evaluation dashboard that computes metrics, confusion matrices, and model comparisons.'
    },
    {
      id: 'ml-5',
      title: 'Feature Store Client',
      language: 'python',
      level: 'senior',
      code: `# WHAT YOU'LL LEARN:
# - Designing a lightweight feature store abstraction
# - Storing and retrieving versioned feature sets
# - Point-in-time lookups to prevent data leakage in training

import sqlite3
import json
from datetime import datetime
from typing import Optional

class FeatureStore:
    """A minimal feature store for storing and retrieving ML features."""

    def __init__(self, db_path: str = "feature_store.db"):
        self.conn = sqlite3.connect(db_path)
        self._init_tables()

    def _init_tables(self):
        """Create the feature store schema."""
        self.conn.executescript("""
            CREATE TABLE IF NOT EXISTS feature_sets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                version INTEGER NOT NULL,
                schema_json TEXT NOT NULL,
                description TEXT,
                created_at TEXT NOT NULL,
                UNIQUE(name, version)
            );

            CREATE TABLE IF NOT EXISTS feature_values (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                feature_set_name TEXT NOT NULL,
                entity_id TEXT NOT NULL,
                features_json TEXT NOT NULL,
                event_time TEXT NOT NULL,
                ingested_at TEXT NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_fv_lookup
                ON feature_values (feature_set_name, entity_id, event_time);
        """)
        self.conn.commit()

    def register_feature_set(self, name: str, schema: dict, description: str = ""):
        """Register a new version of a feature set."""
        # Auto-increment version
        row = self.conn.execute(
            "SELECT MAX(version) FROM feature_sets WHERE name = ?", (name,)
        ).fetchone()
        version = (row[0] or 0) + 1

        self.conn.execute(
            "INSERT INTO feature_sets (name, version, schema_json, description, created_at) VALUES (?, ?, ?, ?, ?)",
            (name, version, json.dumps(schema), description, datetime.utcnow().isoformat())
        )
        self.conn.commit()
        print(f"Registered {name} v{version}")
        return version

    def ingest(self, feature_set_name: str, entity_id: str, features: dict, event_time: str):
        """Ingest a feature vector for a given entity and timestamp."""
        self.conn.execute(
            "INSERT INTO feature_values (feature_set_name, entity_id, features_json, event_time, ingested_at) VALUES (?, ?, ?, ?, ?)",
            (feature_set_name, entity_id, json.dumps(features), event_time, datetime.utcnow().isoformat())
        )
        self.conn.commit()

    def get_features(self, feature_set_name: str, entity_id: str, as_of: Optional[str] = None) -> dict:
        """Retrieve the latest features for an entity, optionally as of a point in time."""
        if as_of:
            # Point-in-time lookup: only features that existed before as_of
            row = self.conn.execute(
                "SELECT features_json FROM feature_values WHERE feature_set_name = ? AND entity_id = ? AND event_time <= ? ORDER BY event_time DESC LIMIT 1",
                (feature_set_name, entity_id, as_of)
            ).fetchone()
        else:
            row = self.conn.execute(
                "SELECT features_json FROM feature_values WHERE feature_set_name = ? AND entity_id = ? ORDER BY event_time DESC LIMIT 1",
                (feature_set_name, entity_id)
            ).fetchone()

        return json.loads(row[0]) if row else {}

    def get_training_set(self, feature_set_name: str, entity_ids: list[str], as_of: str) -> list[dict]:
        """Build a training dataset with point-in-time correct features."""
        rows = []
        for eid in entity_ids:
            features = self.get_features(feature_set_name, eid, as_of=as_of)
            if features:
                rows.append({"entity_id": eid, **features})
        print(f"Built training set: {len(rows)} rows as of {as_of}")
        return rows

    def list_feature_sets(self):
        """List all registered feature sets and their versions."""
        rows = self.conn.execute(
            "SELECT name, version, description, created_at FROM feature_sets ORDER BY name, version"
        ).fetchall()
        for name, ver, desc, created in rows:
            print(f"  {name} v{ver} - {desc} ({created})")


# Usage
store = FeatureStore()

store.register_feature_set(
    "user_features",
    schema={"avg_purchase": "float", "visit_count": "int", "churn_risk": "float"},
    description="Aggregated user behavior features"
)

# Ingest historical features
store.ingest("user_features", "user_001", {"avg_purchase": 45.5, "visit_count": 12, "churn_risk": 0.2}, "2025-01-15")
store.ingest("user_features", "user_001", {"avg_purchase": 52.0, "visit_count": 18, "churn_risk": 0.1}, "2025-03-01")

# Point-in-time retrieval (prevents data leakage)
features_jan = store.get_features("user_features", "user_001", as_of="2025-02-01")
print(f"Features as of Feb 2025: {features_jan}")

features_now = store.get_features("user_features", "user_001")
print(f"Latest features: {features_now}")

# EXERCISE:
# Add a delete_feature_set method and a get_feature_lineage method
# that returns the full history of feature values for an entity.`,
      description: 'Build a lightweight feature store with versioning, point-in-time lookups, and training set generation.'
    }
  ],

  'security-engineer': [
    {
      id: 'sec-1',
      title: 'Input Validation and Sanitization',
      language: 'python',
      level: 'beginner',
      code: `from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, constr
import html

app = FastAPI()

class UserInput(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    bio: constr(max_length=500)

@app.post("/users")
def create_user(user: UserInput):
    # Pydantic validates input automatically
    # Sanitize user-provided content to prevent XSS
    sanitized_bio = html.escape(user.bio)

    return {
        "username": user.username,
        "email": user.email,
        "bio": sanitized_bio
    }`,
      description: 'Implement input validation and sanitization to prevent attacks.'
    },
    {
      id: 'sec-2',
      title: 'JWT Token Implementation',
      language: 'python',
      level: 'mid',
      code: `from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from datetime import datetime, timedelta
import jwt

app = FastAPI()
security = HTTPBearer()

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
EXPIRATION_HOURS = 24

def create_access_token(user_id: str) -> str:
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=EXPIRATION_HOURS),
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_access_token(credentials: HTTPAuthCredentials = Depends(security)) -> dict:
    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/login")
def login(username: str):
    token = create_access_token(username)
    return {"access_token": token, "token_type": "bearer"}

@app.get("/protected")
def protected_route(payload: dict = Depends(verify_access_token)):
    return {"message": f"Hello {payload['user_id']}"}`,
      description: 'Implement secure JWT authentication with proper expiration.'
    },
    {
      id: 'sec-3',
      title: 'OWASP Security Headers',
      language: 'python',
      level: 'senior',
      code: `from fastapi import FastAPI
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)

        # Prevent clickjacking
        response.headers["X-Frame-Options"] = "DENY"

        # Prevent MIME type sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"

        # Enable XSS protection
        response.headers["X-XSS-Protection"] = "1; mode=block"

        # Content Security Policy
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline';"
        )

        # HSTS for HTTPS enforcement
        response.headers["Strict-Transport-Security"] = (
            "max-age=31536000; includeSubDomains"
        )

        return response

app.add_middleware(SecurityHeadersMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://example.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)`,
      description: 'Add OWASP security headers to prevent common web vulnerabilities.'
    },
    {
      id: 'se-4',
      title: 'CSRF Protection Middleware',
      language: 'python',
      level: 'mid',
      code: `# WHAT YOU'LL LEARN:
# - How Cross-Site Request Forgery attacks work
# - Implementing the synchronizer token pattern
# - Validating CSRF tokens in middleware for state-changing requests

import secrets
import hashlib
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

class CSRFProtectionMiddleware(BaseHTTPMiddleware):
    """Middleware that enforces CSRF tokens on state-changing HTTP methods."""

    SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}
    TOKEN_HEADER = "X-CSRF-Token"
    COOKIE_NAME = "csrf_token"

    def __init__(self, app, secret_key: str):
        super().__init__(app)
        self.secret_key = secret_key

    def _generate_token(self) -> str:
        """Generate a cryptographically secure CSRF token."""
        random_bytes = secrets.token_bytes(32)
        return hashlib.sha256(random_bytes + self.secret_key.encode()).hexdigest()

    def _tokens_match(self, cookie_token: str, header_token: str) -> bool:
        """Constant-time comparison to prevent timing attacks."""
        return secrets.compare_digest(cookie_token, header_token)

    async def dispatch(self, request: Request, call_next):
        # Always allow safe (read-only) methods through
        if request.method in self.SAFE_METHODS:
            response = await call_next(request)
            # Set a CSRF cookie if one doesn't exist yet
            if self.COOKIE_NAME not in request.cookies:
                token = self._generate_token()
                response.set_cookie(
                    key=self.COOKIE_NAME,
                    value=token,
                    httponly=False,  # JavaScript needs to read this
                    samesite="strict",
                    secure=True,
                    max_age=3600
                )
            return response

        # For state-changing methods, validate the CSRF token
        cookie_token = request.cookies.get(self.COOKIE_NAME)
        header_token = request.headers.get(self.TOKEN_HEADER)

        if not cookie_token or not header_token:
            return JSONResponse(
                status_code=403,
                content={"detail": "CSRF token missing. Include X-CSRF-Token header."}
            )

        if not self._tokens_match(cookie_token, header_token):
            return JSONResponse(
                status_code=403,
                content={"detail": "CSRF token mismatch. Request rejected."}
            )

        # Token is valid, proceed with the request
        response = await call_next(request)

        # Rotate the token after every state-changing request
        new_token = self._generate_token()
        response.set_cookie(
            key=self.COOKIE_NAME,
            value=new_token,
            httponly=False,
            samesite="strict",
            secure=True,
            max_age=3600
        )
        return response


# Wire up the middleware
app = FastAPI()
app.add_middleware(CSRFProtectionMiddleware, secret_key="your-secret-key-here")

@app.get("/csrf-token")
async def get_csrf_token(request: Request):
    """Endpoint for SPAs to read the current CSRF token."""
    token = request.cookies.get("csrf_token", "not-set-yet")
    return {"csrf_token": token}

@app.post("/transfer")
async def transfer_funds(request: Request):
    body = await request.json()
    return {"status": "ok", "amount": body.get("amount")}

# EXERCISE:
# Add a whitelist of paths (e.g., /webhooks) that skip CSRF
# validation. This is useful for third-party webhook receivers.`,
      description: 'Implement CSRF protection middleware with token rotation and constant-time comparison.'
    },
    {
      id: 'se-5',
      title: 'Secret Scanning Script',
      language: 'python',
      level: 'senior',
      code: `# WHAT YOU'LL LEARN:
# - Detecting hardcoded secrets and credentials in source code
# - Using regex patterns for common secret formats
# - Generating actionable reports with severity levels

import re
import os
from dataclasses import dataclass
from pathlib import Path

@dataclass
class SecretFinding:
    file_path: str
    line_number: int
    pattern_name: str
    severity: str
    matched_text: str

# Patterns to detect common secret types
SECRET_PATTERNS = {
    "AWS Access Key": {
        "regex": r"AKIA[0-9A-Z]{16}",
        "severity": "critical"
    },
    "AWS Secret Key": {
        "regex": r"(?i)aws_secret_access_key\\s*=\\s*['\"][A-Za-z0-9/+=]{40}['\"]",
        "severity": "critical"
    },
    "GitHub Token": {
        "regex": r"gh[pousr]_[A-Za-z0-9_]{36,}",
        "severity": "critical"
    },
    "Generic API Key": {
        "regex": r"(?i)(api[_-]?key|apikey)\\s*[=:]\\s*['\"][A-Za-z0-9]{20,}['\"]",
        "severity": "high"
    },
    "Private Key Header": {
        "regex": r"-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----",
        "severity": "critical"
    },
    "Password in Config": {
        "regex": r"(?i)(password|passwd|pwd)\\s*[=:]\\s*['\"][^'\"]{8,}['\"]",
        "severity": "high"
    },
    "Database Connection String": {
        "regex": r"(?i)(mysql|postgres|mongodb)://[^\\s'\"]+:[^\\s'\"]+@",
        "severity": "high"
    },
    "Slack Webhook": {
        "regex": r"https://hooks\\.slack\\.com/services/T[A-Z0-9]+/B[A-Z0-9]+/[A-Za-z0-9]+",
        "severity": "medium"
    },
}

# File extensions to scan
SCAN_EXTENSIONS = {".py", ".js", ".ts", ".json", ".yaml", ".yml", ".env", ".cfg", ".ini", ".toml"}

# Directories to skip
SKIP_DIRS = {"node_modules", ".git", "__pycache__", "venv", ".venv", "dist", "build"}


def scan_file(file_path: str) -> list[SecretFinding]:
    """Scan a single file for secret patterns."""
    findings = []
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            for line_num, line in enumerate(f, start=1):
                for pattern_name, config in SECRET_PATTERNS.items():
                    matches = re.finditer(config["regex"], line)
                    for match in matches:
                        # Mask the middle of the matched secret
                        text = match.group()
                        masked = text[:6] + "***" + text[-4:] if len(text) > 12 else "***"
                        findings.append(SecretFinding(
                            file_path=file_path,
                            line_number=line_num,
                            pattern_name=pattern_name,
                            severity=config["severity"],
                            matched_text=masked
                        ))
    except (PermissionError, OSError):
        pass
    return findings


def scan_directory(root_path: str) -> list[SecretFinding]:
    """Recursively scan a directory for secrets."""
    all_findings = []
    for dirpath, dirnames, filenames in os.walk(root_path):
        # Prune directories we want to skip
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]

        for filename in filenames:
            ext = Path(filename).suffix
            if ext in SCAN_EXTENSIONS:
                full_path = os.path.join(dirpath, filename)
                findings = scan_file(full_path)
                all_findings.extend(findings)

    return all_findings


def print_report(findings: list[SecretFinding]):
    """Print a formatted report of all findings."""
    if not findings:
        print("No secrets detected. All clear!")
        return

    # Sort by severity
    severity_order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
    findings.sort(key=lambda f: severity_order.get(f.severity, 99))

    print(f"{'SEVERITY':<12} {'PATTERN':<28} {'FILE':<40} {'LINE':<6}")
    print("-" * 90)
    for f in findings:
        short_path = f.file_path[-38:] if len(f.file_path) > 38 else f.file_path
        print(f"{f.severity.upper():<12} {f.pattern_name:<28} {short_path:<40} {f.line_number:<6}")

    critical = sum(1 for f in findings if f.severity == "critical")
    high = sum(1 for f in findings if f.severity == "high")
    print(f"\\nTotal: {len(findings)} findings ({critical} critical, {high} high)")


# Usage
findings = scan_directory("./src")
print_report(findings)

# EXERCISE:
# Add a --fix mode that replaces detected secrets with
# environment variable references (e.g., os.environ["AWS_KEY"]).`,
      description: 'Scan source code for hardcoded secrets using regex patterns with severity-ranked reporting.'
    }
  ],

  'qa-test-engineer': [
    {
      id: 'qa-1',
      title: 'Jest Unit Test',
      language: 'javascript',
      level: 'beginner',
      code: `function sum(a, b) {
  return a + b;
}

function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

describe('Math functions', () => {
  test('sum should add two numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(-1, 1)).toBe(0);
  });
});

describe('Validation functions', () => {
  test('validateEmail should accept valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  test('validateEmail should reject invalid emails', () => {
    expect(validateEmail('invalid.email')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
  });
});`,
      description: 'Write comprehensive unit tests using Jest.'
    },
    {
      id: 'qa-2',
      title: 'Playwright E2E Test',
      language: 'javascript',
      level: 'mid',
      code: `import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\\/dashboard/);
    await expect(page.locator('text=Welcome User')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('should persist login session', async ({ page, context }) => {
    // Complete login
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\\/dashboard/);

    // Check session persists
    const newPage = await context.newPage();
    await newPage.goto('http://localhost:3000/dashboard');
    await expect(newPage).toHaveURL(/\\/dashboard/);
  });
});`,
      description: 'Create end-to-end tests with Playwright for user workflows.'
    },
    {
      id: 'qa-3',
      title: 'k6 Performance Test',
      language: 'javascript',
      level: 'senior',
      code: `import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const responseTimes = new Trend('response_times');

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 100 },
    { duration: '30s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    'errors': ['rate<0.1']
  }
};

export default function () {
  group('User Flow', () => {
    const res = http.get('https://api.example.com/users');

    check(res, {
      'status is 200': (r) => r.status === 200,
      'response time < 500ms': (r) => r.timings.duration < 500
    }) || errorRate.add(1);

    responseTimes.add(res.timings.duration);
    sleep(1);

    http.post('https://api.example.com/login', {
      username: 'user@example.com',
      password: 'password123'
    });
    sleep(2);
  });
}`,
      description: 'Perform load testing and performance measurement with k6.'
    },
    {
      id: 'qa-4',
      title: 'API Contract Test',
      language: 'javascript',
      level: 'mid',
      code: `// WHAT YOU'LL LEARN:
// - Validating API responses against a contract (schema)
// - Testing status codes, headers, and response body structure
// - Building reusable schema validators for REST endpoints

const Ajv = require('ajv');
const axios = require('axios');

const ajv = new Ajv({ allErrors: true });

// ============================================================
// Define API contracts as JSON Schema
// ============================================================

const userSchema = {
  type: 'object',
  required: ['id', 'name', 'email', 'created_at'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    created_at: { type: 'string', format: 'date-time' },
    role: { type: 'string', enum: ['admin', 'user', 'viewer'] }
  },
  additionalProperties: false
};

const userListSchema = {
  type: 'object',
  required: ['data', 'pagination'],
  properties: {
    data: { type: 'array', items: userSchema },
    pagination: {
      type: 'object',
      required: ['page', 'per_page', 'total'],
      properties: {
        page: { type: 'integer', minimum: 1 },
        per_page: { type: 'integer', minimum: 1 },
        total: { type: 'integer', minimum: 0 }
      }
    }
  }
};

// ============================================================
// Contract test runner
// ============================================================

const BASE_URL = 'http://localhost:8000/api';

async function contractTest(name, { method, path, expectedStatus, schema, headers }) {
  try {
    const response = await axios({
      method,
      url: BASE_URL + path,
      validateStatus: () => true // Don't throw on non-2xx
    });

    const errors = [];

    // Check status code
    if (response.status !== expectedStatus) {
      errors.push(\`Status: expected \${expectedStatus}, got \${response.status}\`);
    }

    // Check required headers
    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        if (response.headers[key.toLowerCase()] !== value) {
          errors.push(\`Header \${key}: expected "\${value}", got "\${response.headers[key.toLowerCase()]}"\`);
        }
      }
    }

    // Validate response body against schema
    if (schema) {
      const validate = ajv.compile(schema);
      const valid = validate(response.data);
      if (!valid) {
        validate.errors.forEach(err => {
          errors.push(\`Schema: \${err.instancePath} \${err.message}\`);
        });
      }
    }

    // Report
    const status = errors.length === 0 ? 'PASS' : 'FAIL';
    console.log(\`[\${status}] \${name}\`);
    errors.forEach(e => console.log(\`        \${e}\`));
    return errors.length === 0;

  } catch (err) {
    console.log(\`[ERROR] \${name}: \${err.message}\`);
    return false;
  }
}

// ============================================================
// Run the contract test suite
// ============================================================

async function runSuite() {
  console.log('API Contract Tests\\n' + '='.repeat(50));

  const results = await Promise.all([
    contractTest('GET /users returns paginated list', {
      method: 'GET',
      path: '/users',
      expectedStatus: 200,
      schema: userListSchema,
      headers: { 'content-type': 'application/json' }
    }),
    contractTest('GET /users/1 returns a single user', {
      method: 'GET',
      path: '/users/1',
      expectedStatus: 200,
      schema: userSchema
    }),
    contractTest('GET /users/99999 returns 404', {
      method: 'GET',
      path: '/users/99999',
      expectedStatus: 404,
      schema: null
    }),
    contractTest('POST /users without body returns 422', {
      method: 'POST',
      path: '/users',
      expectedStatus: 422,
      schema: null
    })
  ]);

  const passed = results.filter(Boolean).length;
  console.log(\`\\n\${passed}/\${results.length} contract tests passed\`);
}

runSuite();

// EXERCISE:
// Add a contract test for PUT /users/:id that sends a valid
// update payload and validates the response matches userSchema.`,
      description: 'Validate API responses against JSON Schema contracts with status and header checks.'
    },
    {
      id: 'qa-5',
      title: 'Visual Regression Test',
      language: 'javascript',
      level: 'senior',
      code: `// WHAT YOU'LL LEARN:
// - Capturing screenshots for visual regression testing
// - Comparing images pixel-by-pixel with tolerance thresholds
// - Organizing baseline vs. current screenshots for CI pipelines

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const BASELINE_DIR = path.join(__dirname, '__baselines__');
const CURRENT_DIR = path.join(__dirname, '__current__');
const DIFF_DIR = path.join(__dirname, '__diffs__');

// Ensure output directories exist
[BASELINE_DIR, CURRENT_DIR, DIFF_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

/**
 * Compare two PNG buffers and return the mismatch percentage.
 */
function compareScreenshots(baselineBuffer, currentBuffer, diffPath) {
  const baseline = PNG.sync.read(baselineBuffer);
  const current = PNG.sync.read(currentBuffer);

  // Images must be the same dimensions
  if (baseline.width !== current.width || baseline.height !== current.height) {
    return { match: false, mismatchPercentage: 100, reason: 'dimension mismatch' };
  }

  const { width, height } = baseline;
  const diff = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    baseline.data, current.data, diff.data,
    width, height,
    { threshold: 0.1, includeAA: false }
  );

  // Write diff image for inspection
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const mismatchPercentage = (mismatchedPixels / totalPixels) * 100;

  return { match: mismatchPercentage < 0.5, mismatchPercentage, mismatchedPixels };
}

/**
 * Visual regression test helper.
 * On first run, saves baseline. On subsequent runs, compares.
 */
async function visualTest(page, name, options = {}) {
  const { selector = null, threshold = 0.5 } = options;

  const screenshotOptions = { fullPage: !selector };
  if (selector) {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible' });
    screenshotOptions.clip = await element.boundingBox();
  }

  const currentBuffer = await page.screenshot(screenshotOptions);
  const baselinePath = path.join(BASELINE_DIR, \`\${name}.png\`);
  const currentPath = path.join(CURRENT_DIR, \`\${name}.png\`);
  const diffPath = path.join(DIFF_DIR, \`\${name}-diff.png\`);

  fs.writeFileSync(currentPath, currentBuffer);

  // If no baseline exists, save current as baseline
  if (!fs.existsSync(baselinePath)) {
    fs.writeFileSync(baselinePath, currentBuffer);
    console.log(\`  [NEW BASELINE] \${name}\`);
    return { isNew: true };
  }

  const baselineBuffer = fs.readFileSync(baselinePath);
  const result = compareScreenshots(baselineBuffer, currentBuffer, diffPath);

  console.log(\`  [\${result.match ? 'PASS' : 'FAIL'}] \${name} - \${result.mismatchPercentage.toFixed(2)}% diff\`);
  return result;
}

// ============================================================
// Test Suite
// ============================================================

test.describe('Visual Regression Tests', () => {
  test('Homepage renders correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const result = await visualTest(page, 'homepage-full');
    if (!result.isNew) {
      expect(result.match).toBe(true);
    }
  });

  test('Navigation bar is consistent', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const result = await visualTest(page, 'navbar', { selector: 'nav' });
    if (!result.isNew) {
      expect(result.match).toBe(true);
    }
  });

  test('Login form layout is stable', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    const result = await visualTest(page, 'login-form', { selector: 'form' });
    if (!result.isNew) {
      expect(result.match).toBe(true);
    }
  });

  test('Dashboard renders after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\\/dashboard/);

    const result = await visualTest(page, 'dashboard');
    if (!result.isNew) {
      expect(result.mismatchPercentage).toBeLessThan(1.0);
    }
  });
});

// EXERCISE:
// Add a test for dark mode by toggling a theme switcher
// before capturing the screenshot. Compare it against a
// separate baseline called "homepage-dark".`,
      description: 'Implement pixel-level visual regression testing with baselines, diffs, and threshold control.'
    }
  ],

  'marketing-technology-developer': [
    {
      id: 'martech-1',
      title: 'Google Analytics 4 Event Tracking',
      language: 'javascript',
      level: 'beginner',
      code: `// Initialize GA4
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

// Track custom events
function trackPurchase(itemId, price, currency) {
  gtag('event', 'purchase', {
    'value': price,
    'currency': currency,
    'items': [{
      'item_id': itemId,
      'item_name': 'Product Name',
      'price': price,
      'quantity': 1
    }]
  });
}

function trackVideoView(videoId, videoTitle) {
  gtag('event', 'video_view', {
    'video_id': videoId,
    'video_title': videoTitle,
    'value': 1
  });
}

// Track user engagement
function trackUserTiming(eventName, milliseconds) {
  gtag('event', 'user_timing', {
    'name': eventName,
    'value': milliseconds
  });
}`,
      description: 'Implement Google Analytics 4 custom event tracking.'
    },
    {
      id: 'martech-2',
      title: 'A/B Test Implementation',
      language: 'python',
      level: 'mid',
      code: `import numpy as np
from scipy import stats

class ABTest:
    def __init__(self, control_name, variant_name):
        self.control_name = control_name
        self.variant_name = variant_name
        self.control_data = []
        self.variant_data = []

    def add_control_conversion(self, value):
        self.control_data.append(value)

    def add_variant_conversion(self, value):
        self.variant_data.append(value)

    def calculate_statistics(self):
        n_control = len(self.control_data)
        n_variant = len(self.variant_data)

        mean_control = np.mean(self.control_data)
        mean_variant = np.mean(self.variant_data)

        # T-test
        t_stat, p_value = stats.ttest_ind(
            self.control_data,
            self.variant_data
        )

        # Confidence interval
        se = np.sqrt(
            np.var(self.control_data, ddof=1) / n_control +
            np.var(self.variant_data, ddof=1) / n_variant
        )
        ci_lower = (mean_variant - mean_control) - 1.96 * se
        ci_upper = (mean_variant - mean_control) + 1.96 * se

        return {
            'control_mean': mean_control,
            'variant_mean': mean_variant,
            'difference': mean_variant - mean_control,
            'p_value': p_value,
            'significant': p_value < 0.05,
            'ci_lower': ci_lower,
            'ci_upper': ci_upper
        }

# Usage
test = ABTest('Control', 'Variant')
test.add_control_conversion(1)  # 1 = conversion, 0 = no conversion
test.add_variant_conversion(1)
# ... add more data ...
results = test.calculate_statistics()
print(f"Significant: {results['significant']}")
print(f"P-value: {results['p_value']:.4f}")`,
      description: 'Implement statistical A/B testing with Python.'
    },
    {
      id: 'martech-3',
      title: 'Customer Segmentation with ML',
      language: 'python',
      level: 'senior',
      code: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Load customer data
df = pd.read_csv('customers.csv')

# Feature engineering
df['customer_lifetime_value'] = df['total_purchases'] * df['avg_order_value']
df['purchase_frequency'] = df['total_purchases'] / df['months_active']

# Prepare features
features = ['customer_lifetime_value', 'purchase_frequency', 'avg_order_value']
X = df[features].fillna(0)

# Normalize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# K-means clustering
kmeans = KMeans(n_clusters=3, random_state=42)
df['segment'] = kmeans.fit_predict(X_scaled)

# Analyze segments
segments = df.groupby('segment').agg({
    'customer_lifetime_value': ['mean', 'median'],
    'purchase_frequency': 'mean',
    'customer_id': 'count'
})

print(segments)

# Visualize
plt.scatter(df['customer_lifetime_value'],
            df['purchase_frequency'],
            c=df['segment'], cmap='viridis')
plt.xlabel('Customer Lifetime Value')
plt.ylabel('Purchase Frequency')
plt.title('Customer Segments')
plt.show()`,
      description: 'Segment customers using machine learning for targeted campaigns.'
    },
    {
      id: 'mt-4',
      title: 'UTM Parameter Handler',
      language: 'javascript',
      level: 'mid',
      code: `// WHAT YOU'LL LEARN:
// - Parsing and persisting UTM parameters from URLs
// - Attributing conversions to the correct marketing campaign
// - Storing campaign data across sessions with localStorage

/**
 * UTMHandler - Capture, store, and retrieve UTM parameters for attribution.
 */
class UTMHandler {
  static UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  static STORAGE_KEY = 'utm_data';

  /**
   * Parse UTM parameters from the current URL query string.
   */
  static parseFromURL(url = window.location.href) {
    const params = new URL(url).searchParams;
    const utm = {};
    let hasUTM = false;

    for (const key of this.UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        utm[key] = decodeURIComponent(value);
        hasUTM = true;
      }
    }

    if (hasUTM) {
      utm.landing_page = window.location.pathname;
      utm.captured_at = new Date().toISOString();
    }

    return hasUTM ? utm : null;
  }

  /**
   * Persist UTM data to localStorage. First touch wins by default;
   * set overwrite=true for last-touch attribution.
   */
  static store(utmData, overwrite = false) {
    if (!utmData) return;

    const existing = this.retrieve();
    if (existing && !overwrite) {
      // First-touch: keep existing data, log the new touch
      const touches = JSON.parse(localStorage.getItem(this.STORAGE_KEY + '_all') || '[]');
      touches.push(utmData);
      localStorage.setItem(this.STORAGE_KEY + '_all', JSON.stringify(touches));
      return;
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(utmData));

    // Also store in the touch history
    const touches = JSON.parse(localStorage.getItem(this.STORAGE_KEY + '_all') || '[]');
    touches.push(utmData);
    localStorage.setItem(this.STORAGE_KEY + '_all', JSON.stringify(touches));
  }

  /**
   * Retrieve the primary (first-touch) UTM data.
   */
  static retrieve() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  /**
   * Get all recorded marketing touches for multi-touch attribution.
   */
  static getAllTouches() {
    const raw = localStorage.getItem(this.STORAGE_KEY + '_all');
    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Attach UTM data to a conversion event payload.
   */
  static enrichConversionEvent(eventData) {
    const utm = this.retrieve();
    if (utm) {
      return {
        ...eventData,
        attribution: {
          first_touch: utm,
          all_touches: this.getAllTouches(),
          touch_count: this.getAllTouches().length
        }
      };
    }
    return eventData;
  }

  /**
   * Clear all stored UTM data (e.g., after conversion is recorded).
   */
  static clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.STORAGE_KEY + '_all');
  }
}

// ============================================================
// Auto-capture on page load
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const utmData = UTMHandler.parseFromURL();
  if (utmData) {
    UTMHandler.store(utmData);
    console.log('UTM captured:', utmData);
  }
});

// Example: enrich a purchase event with UTM attribution
function trackPurchase(orderId, amount) {
  const event = UTMHandler.enrichConversionEvent({
    event: 'purchase',
    order_id: orderId,
    amount: amount,
    timestamp: new Date().toISOString()
  });
  console.log('Enriched event:', event);
  // Send to analytics endpoint
  // fetch('/api/events', { method: 'POST', body: JSON.stringify(event) });
}

// EXERCISE:
// Add support for custom campaign parameters beyond the standard
// UTM set (e.g., fbclid, gclid). Detect and store them automatically.`,
      description: 'Capture, persist, and attribute UTM campaign parameters with first-touch and multi-touch support.'
    },
    {
      id: 'mt-5',
      title: 'Consent Management Module',
      language: 'javascript',
      level: 'senior',
      code: `// WHAT YOU'LL LEARN:
// - Building a cookie consent manager compliant with GDPR/CCPA
// - Blocking tracking scripts until consent is granted
// - Persisting and updating user consent preferences

/**
 * ConsentManager - Manage user consent for cookies and tracking.
 * Supports granular categories: necessary, analytics, marketing, functional.
 */
class ConsentManager {
  static COOKIE_NAME = 'cookie_consent';
  static COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

  static CATEGORIES = {
    necessary: { label: 'Necessary', required: true, default: true },
    functional: { label: 'Functional', required: false, default: false },
    analytics: { label: 'Analytics', required: false, default: false },
    marketing: { label: 'Marketing', required: false, default: false }
  };

  constructor() {
    this.consent = this._loadConsent();
    this.listeners = [];
    this.pendingScripts = [];
  }

  /**
   * Load consent preferences from cookie.
   */
  _loadConsent() {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(ConsentManager.COOKIE_NAME + '='));

    if (cookie) {
      try {
        return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Save consent preferences as a cookie.
   */
  _saveConsent(preferences) {
    const value = encodeURIComponent(JSON.stringify({
      ...preferences,
      updated_at: new Date().toISOString(),
      version: '1.0'
    }));
    document.cookie = \`\${ConsentManager.COOKIE_NAME}=\${value}; max-age=\${ConsentManager.COOKIE_MAX_AGE}; path=/; SameSite=Lax\`;
    this.consent = preferences;
  }

  /**
   * Check if the user has made a consent choice yet.
   */
  hasConsented() {
    return this.consent !== null;
  }

  /**
   * Check if a specific category is allowed.
   */
  isAllowed(category) {
    // Necessary cookies are always allowed
    if (ConsentManager.CATEGORIES[category]?.required) return true;
    return this.consent?.[category] === true;
  }

  /**
   * Accept all cookie categories.
   */
  acceptAll() {
    const prefs = {};
    for (const key of Object.keys(ConsentManager.CATEGORIES)) {
      prefs[key] = true;
    }
    this._saveConsent(prefs);
    this._notifyListeners(prefs);
    this._loadPendingScripts();
  }

  /**
   * Reject all non-necessary cookies.
   */
  rejectAll() {
    const prefs = {};
    for (const [key, config] of Object.entries(ConsentManager.CATEGORIES)) {
      prefs[key] = config.required;
    }
    this._saveConsent(prefs);
    this._notifyListeners(prefs);
  }

  /**
   * Save custom consent preferences.
   */
  savePreferences(preferences) {
    // Always enforce required categories
    for (const [key, config] of Object.entries(ConsentManager.CATEGORIES)) {
      if (config.required) preferences[key] = true;
    }
    this._saveConsent(preferences);
    this._notifyListeners(preferences);
    this._loadPendingScripts();
  }

  /**
   * Register a script that should only load when a category is consented.
   */
  registerScript(category, src, attributes = {}) {
    if (this.isAllowed(category)) {
      this._injectScript(src, attributes);
    } else {
      this.pendingScripts.push({ category, src, attributes });
    }
  }

  /**
   * Inject a script element into the page.
   */
  _injectScript(src, attributes) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    for (const [key, value] of Object.entries(attributes)) {
      script.setAttribute(key, value);
    }
    document.head.appendChild(script);
  }

  /**
   * Load any pending scripts whose category is now allowed.
   */
  _loadPendingScripts() {
    this.pendingScripts = this.pendingScripts.filter(({ category, src, attributes }) => {
      if (this.isAllowed(category)) {
        this._injectScript(src, attributes);
        return false; // Remove from pending
      }
      return true; // Keep in pending
    });
  }

  /**
   * Subscribe to consent changes.
   */
  onChange(callback) {
    this.listeners.push(callback);
  }

  _notifyListeners(preferences) {
    this.listeners.forEach(cb => cb(preferences));
  }
}

// ============================================================
// Usage
// ============================================================

const consent = new ConsentManager();

// Register tracking scripts (they won't load until consent is given)
consent.registerScript('analytics', 'https://www.googletagmanager.com/gtag/js?id=GA_ID');
consent.registerScript('marketing', 'https://connect.facebook.net/en_US/fbevents.js');

// Listen for consent changes
consent.onChange((prefs) => {
  console.log('Consent updated:', prefs);
  if (prefs.analytics) {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  }
});

// Show banner if no consent recorded yet
if (!consent.hasConsented()) {
  console.log('Show consent banner to the user');
  // consent.acceptAll() or consent.savePreferences({ analytics: true, marketing: false })
}

// EXERCISE:
// Add a renderBanner() method that creates a DOM-based consent
// banner with "Accept All", "Reject All", and "Customize" buttons.`,
      description: 'Build a GDPR/CCPA-compliant consent manager that controls script loading based on user preferences.'
    }
  ],

  'tech-lead-architect': [
    {
      id: 'tla-1',
      title: 'System Design Template',
      language: 'javascript',
      level: 'beginner',
      code: `// WHAT YOU'LL LEARN:
// - Structuring a system design document programmatically
// - Capturing requirements, components, and trade-offs
// - Generating a readable design summary

/**
 * SystemDesign - A template class for documenting system designs.
 * Use this to structure your thinking before writing code.
 */
class SystemDesign {
  constructor(name, author) {
    this.name = name;
    this.author = author;
    this.createdAt = new Date().toISOString();
    this.requirements = { functional: [], nonFunctional: [] };
    this.components = [];
    this.dataFlow = [];
    this.tradeOffs = [];
    this.estimations = {};
  }

  addFunctionalRequirement(requirement) {
    this.requirements.functional.push(requirement);
    return this;
  }

  addNonFunctionalRequirement(requirement, target) {
    this.requirements.nonFunctional.push({ requirement, target });
    return this;
  }

  addComponent(name, responsibility, technology) {
    this.components.push({ name, responsibility, technology });
    return this;
  }

  addDataFlow(from, to, protocol, description) {
    this.dataFlow.push({ from, to, protocol, description });
    return this;
  }

  addTradeOff(decision, pros, cons) {
    this.tradeOffs.push({ decision, pros, cons });
    return this;
  }

  setEstimations({ dailyActiveUsers, peakRPS, storageGB, bandwidthGBPerDay }) {
    this.estimations = { dailyActiveUsers, peakRPS, storageGB, bandwidthGBPerDay };
    return this;
  }

  generateSummary() {
    const lines = [];
    lines.push('='.repeat(60));
    lines.push(\`SYSTEM DESIGN: \${this.name}\`);
    lines.push(\`Author: \${this.author} | Date: \${this.createdAt.split('T')[0]}\`);
    lines.push('='.repeat(60));

    lines.push('\\nFUNCTIONAL REQUIREMENTS:');
    this.requirements.functional.forEach((r, i) => lines.push(\`  \${i + 1}. \${r}\`));

    lines.push('\\nNON-FUNCTIONAL REQUIREMENTS:');
    this.requirements.nonFunctional.forEach(r =>
      lines.push(\`  - \${r.requirement}: \${r.target}\`)
    );

    lines.push('\\nCOMPONENTS:');
    this.components.forEach(c =>
      lines.push(\`  [\${c.name}] \${c.responsibility} (Tech: \${c.technology})\`)
    );

    lines.push('\\nDATA FLOW:');
    this.dataFlow.forEach(f =>
      lines.push(\`  \${f.from} --(\${f.protocol})--> \${f.to}: \${f.description}\`)
    );

    lines.push('\\nTRADE-OFF ANALYSIS:');
    this.tradeOffs.forEach(t => {
      lines.push(\`  Decision: \${t.decision}\`);
      lines.push(\`    Pros: \${t.pros.join(', ')}\`);
      lines.push(\`    Cons: \${t.cons.join(', ')}\`);
    });

    if (this.estimations.dailyActiveUsers) {
      lines.push('\\nCAPACITY ESTIMATIONS:');
      lines.push(\`  DAU: \${this.estimations.dailyActiveUsers.toLocaleString()}\`);
      lines.push(\`  Peak RPS: \${this.estimations.peakRPS.toLocaleString()}\`);
      lines.push(\`  Storage: \${this.estimations.storageGB} GB\`);
      lines.push(\`  Bandwidth: \${this.estimations.bandwidthGBPerDay} GB/day\`);
    }

    return lines.join('\\n');
  }
}

// Example: Design a URL Shortener
const design = new SystemDesign('URL Shortener Service', 'Tech Lead');

design
  .addFunctionalRequirement('Shorten a long URL to a unique short URL')
  .addFunctionalRequirement('Redirect short URL to the original URL')
  .addFunctionalRequirement('Track click analytics per short URL')
  .addNonFunctionalRequirement('Latency', 'p99 < 100ms for redirects')
  .addNonFunctionalRequirement('Availability', '99.99% uptime')
  .addComponent('API Gateway', 'Rate limiting, auth, routing', 'Nginx / Kong')
  .addComponent('Shortener Service', 'Generate and resolve short codes', 'Node.js')
  .addComponent('Database', 'Store URL mappings', 'PostgreSQL + Redis cache')
  .addComponent('Analytics Service', 'Record and aggregate click events', 'Kafka + ClickHouse')
  .addDataFlow('Client', 'API Gateway', 'HTTPS', 'Short URL creation or redirect request')
  .addDataFlow('API Gateway', 'Shortener Service', 'gRPC', 'Forward validated request')
  .addDataFlow('Shortener Service', 'Database', 'SQL/Redis', 'Read/write URL mappings')
  .addTradeOff('SQL vs NoSQL for storage', ['ACID guarantees', 'Mature tooling'], ['Horizontal scaling is harder'])
  .setEstimations({ dailyActiveUsers: 1000000, peakRPS: 5000, storageGB: 50, bandwidthGBPerDay: 10 });

console.log(design.generateSummary());

// EXERCISE:
// Extend this template with a generateMermaidDiagram() method
// that outputs a Mermaid.js flowchart of the data flow.`,
      description: 'Document system designs programmatically with requirements, components, data flow, and trade-off analysis.'
    },
    {
      id: 'tla-2',
      title: 'ADR Template Generator',
      language: 'javascript',
      level: 'beginner',
      code: `// WHAT YOU'LL LEARN:
// - What Architecture Decision Records (ADRs) are and why they matter
// - Structuring decisions with context, options, and consequences
// - Generating formatted ADR documents for your team

const fs = require('fs');
const path = require('path');

/**
 * ADRGenerator - Create and manage Architecture Decision Records.
 * ADRs capture important architectural decisions along with their context.
 */
class ADRGenerator {
  constructor(outputDir = './docs/adr') {
    this.outputDir = outputDir;
    this.decisions = [];
  }

  /**
   * Create a new Architecture Decision Record.
   */
  createADR({ title, context, options, decision, consequences, status = 'Proposed' }) {
    const id = this.decisions.length + 1;
    const paddedId = String(id).padStart(4, '0');
    const date = new Date().toISOString().split('T')[0];

    const adr = {
      id: paddedId,
      title,
      date,
      status,  // Proposed | Accepted | Deprecated | Superseded
      context,
      options,
      decision,
      consequences
    };

    this.decisions.push(adr);
    return adr;
  }

  /**
   * Format an ADR as a readable markdown-like string.
   */
  formatADR(adr) {
    const lines = [];
    lines.push(\`# ADR-\${adr.id}: \${adr.title}\`);
    lines.push(\`Date: \${adr.date}  |  Status: \${adr.status}\`);
    lines.push('');
    lines.push('## Context');
    lines.push(adr.context);
    lines.push('');
    lines.push('## Options Considered');
    adr.options.forEach((opt, i) => {
      lines.push(\`  \${i + 1}. \${opt.name}\`);
      lines.push(\`     Pros: \${opt.pros.join(', ')}\`);
      lines.push(\`     Cons: \${opt.cons.join(', ')}\`);
    });
    lines.push('');
    lines.push('## Decision');
    lines.push(adr.decision);
    lines.push('');
    lines.push('## Consequences');
    lines.push('Positive:');
    adr.consequences.positive.forEach(c => lines.push(\`  + \${c}\`));
    lines.push('Negative:');
    adr.consequences.negative.forEach(c => lines.push(\`  - \${c}\`));
    lines.push('');
    return lines.join('\\n');
  }

  /**
   * Generate and print all ADRs.
   */
  printAll() {
    this.decisions.forEach(adr => {
      console.log(this.formatADR(adr));
      console.log('='.repeat(60));
    });
  }

  /**
   * Generate a summary index of all decisions.
   */
  generateIndex() {
    const lines = ['# Architecture Decision Records\\n'];
    lines.push('| ID | Title | Date | Status |');
    lines.push('|----|-------|------|--------|');
    this.decisions.forEach(adr => {
      lines.push(\`| ADR-\${adr.id} | \${adr.title} | \${adr.date} | \${adr.status} |\`);
    });
    return lines.join('\\n');
  }
}

// ============================================================
// Example usage
// ============================================================

const generator = new ADRGenerator();

generator.createADR({
  title: 'Use PostgreSQL as primary database',
  status: 'Accepted',
  context: 'We need a relational database for our e-commerce platform that supports complex queries, ACID transactions, and has a strong ecosystem.',
  options: [
    {
      name: 'PostgreSQL',
      pros: ['ACID compliant', 'Rich JSON support', 'Strong community'],
      cons: ['Vertical scaling limits', 'Slightly higher memory usage']
    },
    {
      name: 'MySQL',
      pros: ['Widely adopted', 'Good read performance'],
      cons: ['Weaker JSON support', 'Less extensible']
    },
    {
      name: 'MongoDB',
      pros: ['Flexible schema', 'Horizontal scaling'],
      cons: ['No ACID across documents', 'Eventual consistency concerns']
    }
  ],
  decision: 'We will use PostgreSQL 15+ as our primary database. Its JSONB support covers our semi-structured data needs without sacrificing transactional guarantees.',
  consequences: {
    positive: ['Strong consistency for financial data', 'Team already has PostgreSQL expertise', 'Can use JSONB for flexible product attributes'],
    negative: ['Need to plan sharding strategy early', 'Must invest in connection pooling (PgBouncer)']
  }
});

generator.createADR({
  title: 'Adopt event-driven architecture for notifications',
  status: 'Proposed',
  context: 'Our monolithic notification system cannot scale. Email, SMS, and push notifications block the main request thread.',
  options: [
    {
      name: 'Apache Kafka',
      pros: ['High throughput', 'Message replay', 'Durable'],
      cons: ['Operational complexity', 'Steeper learning curve']
    },
    {
      name: 'RabbitMQ',
      pros: ['Simple setup', 'Flexible routing', 'Lower latency'],
      cons: ['No native replay', 'Lower throughput at scale']
    }
  ],
  decision: 'Use RabbitMQ for the notification service. Our current scale does not justify Kafka complexity. We can migrate later if needed.',
  consequences: {
    positive: ['Decoupled notification processing', 'Non-blocking API responses', 'Easy to add new notification channels'],
    negative: ['Need to handle message failures and dead-letter queues', 'Additional infrastructure to manage']
  }
});

generator.printAll();
console.log(generator.generateIndex());

// EXERCISE:
// Add a supersede(oldId, newADR) method that marks the old ADR
// as "Superseded by ADR-XXXX" and links them together.`,
      description: 'Generate and manage Architecture Decision Records with structured context, options, and consequences.'
    },
    {
      id: 'tla-3',
      title: 'Code Review Checklist Automation',
      language: 'javascript',
      level: 'mid',
      code: `// WHAT YOU'LL LEARN:
// - Automating code review checklists for consistent PR quality
// - Categorizing checks by area (security, performance, style, etc.)
// - Generating review reports with pass/fail/skip status

/**
 * CodeReviewChecker - Automate code review checklists.
 * Define checks, run them against PR metadata, and produce reports.
 */
class CodeReviewChecker {
  constructor(prTitle, prDescription, changedFiles) {
    this.prTitle = prTitle;
    this.prDescription = prDescription;
    this.changedFiles = changedFiles; // array of { path, additions, deletions }
    this.checks = [];
    this.results = [];
  }

  /**
   * Register a check with a category, name, and validator function.
   * The validator receives the checker context and returns { passed, note }.
   */
  addCheck(category, name, validator) {
    this.checks.push({ category, name, validator });
    return this;
  }

  /**
   * Run all registered checks and collect results.
   */
  runAll() {
    this.results = this.checks.map(check => {
      try {
        const result = check.validator(this);
        return {
          category: check.category,
          name: check.name,
          passed: result.passed,
          note: result.note || ''
        };
      } catch (err) {
        return {
          category: check.category,
          name: check.name,
          passed: false,
          note: \`Error: \${err.message}\`
        };
      }
    });
    return this.results;
  }

  /**
   * Print a formatted review report.
   */
  printReport() {
    const grouped = {};
    this.results.forEach(r => {
      if (!grouped[r.category]) grouped[r.category] = [];
      grouped[r.category].push(r);
    });

    console.log('='.repeat(60));
    console.log('CODE REVIEW REPORT');
    console.log(\`PR: \${this.prTitle}\`);
    console.log('='.repeat(60));

    for (const [category, checks] of Object.entries(grouped)) {
      console.log(\`\\n[\${category.toUpperCase()}]\`);
      checks.forEach(c => {
        const icon = c.passed ? 'PASS' : 'FAIL';
        const noteStr = c.note ? \` -- \${c.note}\` : '';
        console.log(\`  [\${icon}] \${c.name}\${noteStr}\`);
      });
    }

    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;
    const score = Math.round((passed / total) * 100);
    console.log(\`\\nScore: \${passed}/\${total} (\${score}%)\`);
    console.log(score >= 80 ? 'Recommendation: APPROVE' : 'Recommendation: REQUEST CHANGES');
  }

  // Utility: total lines changed
  get totalChanges() {
    return this.changedFiles.reduce((sum, f) => sum + f.additions + f.deletions, 0);
  }

  // Utility: check if specific file types are changed
  hasFileType(extension) {
    return this.changedFiles.some(f => f.path.endsWith(extension));
  }
}

// ============================================================
// Define standard checks
// ============================================================

function buildStandardChecker(prTitle, prDescription, changedFiles) {
  const checker = new CodeReviewChecker(prTitle, prDescription, changedFiles);

  // --- General ---
  checker.addCheck('general', 'PR title is descriptive', (ctx) => ({
    passed: ctx.prTitle.length >= 10 && ctx.prTitle.length <= 72,
    note: \`Title length: \${ctx.prTitle.length} chars\`
  }));

  checker.addCheck('general', 'PR description is provided', (ctx) => ({
    passed: ctx.prDescription.length > 20,
    note: ctx.prDescription.length <= 20 ? 'Description too short or missing' : ''
  }));

  checker.addCheck('general', 'PR is not too large', (ctx) => ({
    passed: ctx.totalChanges <= 400,
    note: \`\${ctx.totalChanges} lines changed (max 400 recommended)\`
  }));

  // --- Security ---
  checker.addCheck('security', 'No secrets in changed files', (ctx) => {
    const sensitiveFiles = ctx.changedFiles.filter(f =>
      f.path.includes('.env') || f.path.includes('secret') || f.path.includes('credential')
    );
    return { passed: sensitiveFiles.length === 0, note: sensitiveFiles.map(f => f.path).join(', ') };
  });

  // --- Testing ---
  checker.addCheck('testing', 'Tests are included', (ctx) => {
    const hasTests = ctx.changedFiles.some(f =>
      f.path.includes('.test.') || f.path.includes('.spec.') || f.path.includes('__tests__')
    );
    return { passed: hasTests, note: hasTests ? '' : 'No test files in this PR' };
  });

  // --- Documentation ---
  checker.addCheck('documentation', 'README or docs updated if needed', (ctx) => {
    const hasNewFiles = ctx.changedFiles.some(f => f.additions > 50);
    const hasDocs = ctx.changedFiles.some(f =>
      f.path.includes('README') || f.path.includes('/docs/')
    );
    return {
      passed: !hasNewFiles || hasDocs,
      note: hasNewFiles && !hasDocs ? 'Large additions without doc updates' : ''
    };
  });

  // --- Performance ---
  checker.addCheck('performance', 'No large generated files committed', (ctx) => {
    const largeFiles = ctx.changedFiles.filter(f =>
      (f.path.endsWith('.min.js') || f.path.endsWith('.bundle.js')) && f.additions > 100
    );
    return { passed: largeFiles.length === 0, note: largeFiles.map(f => f.path).join(', ') };
  });

  return checker;
}

// ============================================================
// Run the review
// ============================================================

const checker = buildStandardChecker(
  'Add user authentication with JWT tokens',
  'This PR implements JWT-based authentication including login, logout, and token refresh endpoints. Includes unit and integration tests.',
  [
    { path: 'src/auth/jwt.service.ts', additions: 85, deletions: 0 },
    { path: 'src/auth/auth.controller.ts', additions: 60, deletions: 5 },
    { path: 'src/auth/__tests__/jwt.test.ts', additions: 120, deletions: 0 },
    { path: 'docs/auth.md', additions: 30, deletions: 0 }
  ]
);

checker.runAll();
checker.printReport();

// EXERCISE:
// Add a 'migration' category check that flags if any database
// migration files are included and verifies a rollback file exists.`,
      description: 'Automate code review checklists with categorized checks, scoring, and approval recommendations.'
    },
    {
      id: 'tla-4',
      title: 'Architecture Fitness Functions',
      language: 'javascript',
      level: 'mid',
      code: `// WHAT YOU'LL LEARN:
// - What architecture fitness functions are and why they matter
// - Measuring coupling, cohesion, and dependency health
// - Running automated governance checks on your codebase

/**
 * FitnessFunction - A measurable check on an architectural property.
 */
class FitnessFunction {
  constructor(name, description, threshold, evaluator) {
    this.name = name;
    this.description = description;
    this.threshold = threshold; // { min, max } or { max } or { min }
    this.evaluator = evaluator; // function that returns a numeric score
  }

  run(context) {
    const score = this.evaluator(context);
    let passed = true;
    if (this.threshold.min !== undefined && score < this.threshold.min) passed = false;
    if (this.threshold.max !== undefined && score > this.threshold.max) passed = false;
    return { name: this.name, score, passed, threshold: this.threshold };
  }
}

/**
 * ArchitectureGovernor - Run a suite of fitness functions against codebase metrics.
 */
class ArchitectureGovernor {
  constructor() {
    this.functions = [];
  }

  register(fitnessFunction) {
    this.functions.push(fitnessFunction);
    return this;
  }

  evaluate(context) {
    const results = this.functions.map(fn => fn.run(context));
    return results;
  }

  printReport(results) {
    console.log('='.repeat(60));
    console.log('ARCHITECTURE FITNESS REPORT');
    console.log('='.repeat(60));

    results.forEach(r => {
      const status = r.passed ? 'PASS' : 'FAIL';
      const threshStr = r.threshold.min !== undefined && r.threshold.max !== undefined
        ? \`[\${r.threshold.min}-\${r.threshold.max}]\`
        : r.threshold.max !== undefined
          ? \`[max: \${r.threshold.max}]\`
          : \`[min: \${r.threshold.min}]\`;
      console.log(\`  [\${status}] \${r.name}: \${r.score} \${threshStr}\`);
    });

    const passed = results.filter(r => r.passed).length;
    console.log(\`\\nHealth: \${passed}/\${results.length} passed\`);
    return results.every(r => r.passed);
  }
}

// ============================================================
// Define fitness functions for a microservice architecture
// ============================================================

const governor = new ArchitectureGovernor();

// 1. Dependency freshness: % of dependencies that are up to date
governor.register(new FitnessFunction(
  'Dependency Freshness',
  'Percentage of dependencies within 1 major version of latest',
  { min: 80 },
  (ctx) => {
    const upToDate = ctx.dependencies.filter(d => d.majorsBehind <= 1).length;
    return Math.round((upToDate / ctx.dependencies.length) * 100);
  }
));

// 2. Cyclic dependencies: number of circular imports between modules
governor.register(new FitnessFunction(
  'Cyclic Dependencies',
  'Number of circular dependency chains detected',
  { max: 0 },
  (ctx) => ctx.cyclicDependencies
));

// 3. Test coverage: minimum acceptable coverage percentage
governor.register(new FitnessFunction(
  'Test Coverage',
  'Overall line coverage percentage',
  { min: 75 },
  (ctx) => ctx.testCoverage
));

// 4. Service coupling: max number of direct service-to-service calls
governor.register(new FitnessFunction(
  'Service Coupling',
  'Maximum direct dependencies any single service has',
  { max: 5 },
  (ctx) => Math.max(...ctx.services.map(s => s.directDependencies))
));

// 5. API versioning compliance: all public APIs must be versioned
governor.register(new FitnessFunction(
  'API Versioning',
  'Percentage of public endpoints with version prefix',
  { min: 100 },
  (ctx) => {
    const versioned = ctx.endpoints.filter(e => /^\\/v\\d+\\//.test(e.path)).length;
    return Math.round((versioned / ctx.endpoints.length) * 100);
  }
));

// 6. Build time: keep CI builds fast
governor.register(new FitnessFunction(
  'Build Time',
  'CI build time in seconds',
  { max: 300 },
  (ctx) => ctx.buildTimeSeconds
));

// ============================================================
// Simulate running against codebase metrics
// ============================================================

const codebaseMetrics = {
  dependencies: [
    { name: 'express', majorsBehind: 0 },
    { name: 'lodash', majorsBehind: 1 },
    { name: 'moment', majorsBehind: 3 }, // outdated!
    { name: 'axios', majorsBehind: 0 },
    { name: 'pg', majorsBehind: 0 }
  ],
  cyclicDependencies: 1,
  testCoverage: 82,
  services: [
    { name: 'auth-service', directDependencies: 2 },
    { name: 'order-service', directDependencies: 4 },
    { name: 'notification-service', directDependencies: 6 } // too coupled!
  ],
  endpoints: [
    { path: '/v1/users', method: 'GET' },
    { path: '/v1/orders', method: 'POST' },
    { path: '/health', method: 'GET' } // not versioned
  ],
  buildTimeSeconds: 240
};

const results = governor.evaluate(codebaseMetrics);
const healthy = governor.printReport(results);

console.log(\`\\nOverall: \${healthy ? 'HEALTHY' : 'ACTION REQUIRED'}\`);

// EXERCISE:
// Add a "Code Duplication" fitness function that checks the
// percentage of duplicated code blocks stays below 5%.`,
      description: 'Implement automated architecture fitness functions to continuously validate system health and governance.'
    },
    {
      id: 'tla-5',
      title: 'Tech Debt Tracker and Scorer',
      language: 'javascript',
      level: 'senior',
      code: `// WHAT YOU'LL LEARN:
// - Cataloging and scoring technical debt items systematically
// - Calculating business impact and effort to prioritize payoff
// - Generating actionable reports for sprint planning

/**
 * TechDebtItem - Represents a single piece of technical debt.
 */
class TechDebtItem {
  constructor({ id, title, category, description, component, createdBy }) {
    this.id = id;
    this.title = title;
    this.category = category; // 'code', 'architecture', 'infrastructure', 'testing', 'documentation'
    this.description = description;
    this.component = component;
    this.createdBy = createdBy;
    this.createdAt = new Date().toISOString();
    this.resolvedAt = null;

    // Scoring dimensions (1-5 scale)
    this.impact = 0;        // How much does this hurt velocity / quality?
    this.effort = 0;        // How much effort to fix? (1=trivial, 5=epic)
    this.risk = 0;          // What's the risk if we don't fix it?
    this.age = 0;           // How long has it existed? (auto-calculated)
  }

  score({ impact, effort, risk }) {
    this.impact = Math.min(5, Math.max(1, impact));
    this.effort = Math.min(5, Math.max(1, effort));
    this.risk = Math.min(5, Math.max(1, risk));
    return this;
  }

  /**
   * Calculate a priority score. Higher = should fix sooner.
   * Formula: (impact + risk) * 2 - effort
   * This favors high-impact, high-risk items that are relatively easy to fix.
   */
  get priorityScore() {
    return (this.impact + this.risk) * 2 - this.effort;
  }

  resolve() {
    this.resolvedAt = new Date().toISOString();
  }
}

/**
 * TechDebtTracker - Track, score, and report on technical debt.
 */
class TechDebtTracker {
  constructor(teamName) {
    this.teamName = teamName;
    this.items = [];
    this.nextId = 1;
  }

  add(params) {
    const item = new TechDebtItem({ id: \`TD-\${String(this.nextId++).padStart(3, '0')}\`, ...params });
    this.items.push(item);
    return item;
  }

  resolve(id) {
    const item = this.items.find(i => i.id === id);
    if (item) item.resolve();
    return item;
  }

  get openItems() {
    return this.items.filter(i => !i.resolvedAt);
  }

  get resolvedItems() {
    return this.items.filter(i => i.resolvedAt);
  }

  /**
   * Get items sorted by priority (highest first).
   */
  getPrioritized() {
    return [...this.openItems].sort((a, b) => b.priorityScore - a.priorityScore);
  }

  /**
   * Get summary statistics by category.
   */
  getCategoryBreakdown() {
    const breakdown = {};
    this.openItems.forEach(item => {
      if (!breakdown[item.category]) {
        breakdown[item.category] = { count: 0, totalImpact: 0, avgPriority: 0, items: [] };
      }
      breakdown[item.category].count++;
      breakdown[item.category].totalImpact += item.impact;
      breakdown[item.category].items.push(item);
    });

    for (const cat of Object.values(breakdown)) {
      cat.avgPriority = cat.items.reduce((sum, i) => sum + i.priorityScore, 0) / cat.count;
    }
    return breakdown;
  }

  /**
   * Calculate the overall "debt score" for the team.
   * Lower is better. 0 means no debt.
   */
  get debtScore() {
    return this.openItems.reduce((sum, item) => sum + item.priorityScore, 0);
  }

  /**
   * Suggest items for the next sprint based on effort budget.
   */
  suggestForSprint(effortBudget) {
    const prioritized = this.getPrioritized();
    const selected = [];
    let remaining = effortBudget;

    for (const item of prioritized) {
      if (item.effort <= remaining) {
        selected.push(item);
        remaining -= item.effort;
      }
    }
    return { selected, effortUsed: effortBudget - remaining, effortBudget };
  }

  /**
   * Print a full debt report.
   */
  printReport() {
    console.log('='.repeat(65));
    console.log(\`TECH DEBT REPORT - \${this.teamName}\`);
    console.log(\`Date: \${new Date().toISOString().split('T')[0]}\`);
    console.log('='.repeat(65));
    console.log(\`Open items: \${this.openItems.length}  |  Resolved: \${this.resolvedItems.length}  |  Debt Score: \${this.debtScore}\`);

    // Category breakdown
    console.log('\\nBREAKDOWN BY CATEGORY:');
    const breakdown = this.getCategoryBreakdown();
    for (const [cat, data] of Object.entries(breakdown)) {
      console.log(\`  \${cat}: \${data.count} items (avg priority: \${data.avgPriority.toFixed(1)})\`);
    }

    // Top 5 priority items
    console.log('\\nTOP PRIORITY ITEMS:');
    console.log(\`  \${'ID':<10} \${'TITLE':<30} \${'PRI':<5} \${'IMP':<5} \${'EFF':<5} \${'RISK':<5}\`);
    console.log('  ' + '-'.repeat(60));
    this.getPrioritized().slice(0, 5).forEach(item => {
      console.log(\`  \${item.id:<10} \${item.title.substring(0, 28):<30} \${item.priorityScore:<5} \${item.impact:<5} \${item.effort:<5} \${item.risk:<5}\`);
    });

    // Sprint suggestion
    const sprint = this.suggestForSprint(8);
    console.log(\`\\nSPRINT SUGGESTION (budget: \${sprint.effortBudget} effort points):\`);
    sprint.selected.forEach(item => {
      console.log(\`  [\${item.id}] \${item.title} (effort: \${item.effort})\`);
    });
    console.log(\`  Effort used: \${sprint.effortUsed}/\${sprint.effortBudget}\`);
  }
}

// ============================================================
// Usage
// ============================================================

const tracker = new TechDebtTracker('Platform Team');

tracker.add({
  title: 'Migrate from Moment.js to date-fns',
  category: 'code',
  description: 'Moment.js is deprecated and adds 70KB to the bundle.',
  component: 'frontend',
  createdBy: 'alice'
}).score({ impact: 3, effort: 2, risk: 2 });

tracker.add({
  title: 'Split monolithic auth service',
  category: 'architecture',
  description: 'Auth service handles auth, user profiles, and permissions. Should be 3 services.',
  component: 'auth-service',
  createdBy: 'bob'
}).score({ impact: 5, effort: 5, risk: 4 });

tracker.add({
  title: 'Add integration tests for payment flow',
  category: 'testing',
  description: 'Payment flow has 0% integration test coverage. Only manual QA.',
  component: 'payment-service',
  createdBy: 'carol'
}).score({ impact: 5, effort: 3, risk: 5 });

tracker.add({
  title: 'Upgrade PostgreSQL from 12 to 16',
  category: 'infrastructure',
  description: 'PG 12 EOL was Nov 2024. Missing security patches and performance improvements.',
  component: 'database',
  createdBy: 'dave'
}).score({ impact: 4, effort: 3, risk: 5 });

tracker.add({
  title: 'Document API rate limiting strategy',
  category: 'documentation',
  description: 'No documentation on rate limits. Clients hit 429s without understanding why.',
  component: 'api-gateway',
  createdBy: 'eve'
}).score({ impact: 2, effort: 1, risk: 1 });

tracker.printReport();

// EXERCISE:
// Add a trend() method that tracks debt score over time
// (e.g., weekly snapshots) and reports whether debt is
// increasing or decreasing.`,
      description: 'Track, score, and prioritize technical debt with category breakdowns and sprint-planning suggestions.'
    }
  ]
};
