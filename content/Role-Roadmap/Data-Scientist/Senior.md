
# Data Scientist – Senior Concept Reference

This document gives in-depth explanations of the core concepts covered in the Senior level of the Data Scientist learning path. It assumes you are comfortable with the Mid material and are ready to work on production systems, advanced AI architectures, and governance responsibilities.

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

**Code walkthrough:**

```python
# Step 1: MLOps — package a model for deployment with versioning and monitoring
import mlflow
import mlflow.sklearn
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import cross_val_score
from sklearn.datasets import make_classification
import joblib

X, y = make_classification(n_samples=2000, weights=[0.95, 0.05], random_state=42)

# Step 2: Experiment tracking — log EVERYTHING for reproducibility
mlflow.set_experiment("claims-fraud-detection")
with mlflow.start_run(run_name="gbm_v3_retrained"):
    params = {"n_estimators": 200, "learning_rate": 0.05, "max_depth": 4}
    model = GradientBoostingClassifier(**params, random_state=42)

    # Log parameters, data version, and metrics
    mlflow.log_params(params)
    mlflow.log_param("data_version", "claims_2025Q1")
    scores = cross_val_score(model, X, y, cv=5, scoring="f1")
    mlflow.log_metric("f1_mean", scores.mean())
    mlflow.log_metric("f1_std", scores.std())

    # Train and log the model artifact
    model.fit(X, y)
    mlflow.sklearn.log_model(model, "model")
    print(f"F1: {scores.mean():.4f} (+/- {scores.std():.4f})")

# Step 3: Feature store pattern — ensure training-serving consistency
# Why a feature store? Without it, features computed at training time
# may differ from features computed at serving time (training-serving skew)
FEATURE_DEFINITIONS = {
    "claim_to_premium_ratio": "claim_amount / annual_premium",
    "claims_last_12m": "COUNT(claims) WHERE claim_date > NOW() - 12 months",
    "avg_claim_severity": "AVG(claim_amount) per customer",
}
# Same definitions used at training AND inference time

# Step 4: Model monitoring — detect drift in production
from scipy.stats import ks_2samp
import numpy as np

def monitor_feature_drift(training_data, production_data, features, threshold=0.05):
    """Run daily: compare production feature distributions to training baseline."""
    alerts = []
    for feature in features:
        stat, p_value = ks_2samp(training_data[feature], production_data[feature])
        if p_value < threshold:
            alerts.append(f"DRIFT DETECTED in '{feature}': KS stat={stat:.4f}, p={p_value:.4f}")
    return alerts
```

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

**Code walkthrough:**

```python
# Step 1: Build a RAG pipeline for internal knowledge retrieval
# This pattern makes proprietary documents accessible via natural language
from openai import OpenAI
from anthropic import Anthropic
import numpy as np

openai_client = OpenAI()
anthropic_client = Anthropic()

# Step 2: Document chunking — chunk size directly affects retrieval quality
def chunk_document(text: str, chunk_size: int = 500, overlap: int = 100) -> list[str]:
    """Why overlap? Without it, a key sentence split across chunk boundaries
    may never be fully retrieved. Overlap ensures continuity."""
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    return chunks

# Step 3: Embed and store chunks (simplified — use a vector DB in production)
def embed_text(text: str) -> np.ndarray:
    resp = openai_client.embeddings.create(model="text-embedding-3-small", input=text)
    return np.array(resp.data[0].embedding)

# Step 4: Retrieve with reranking — don't just return top-k by similarity
def retrieve_and_rerank(query: str, index: list, top_k: int = 5, rerank_top: int = 3):
    """Why rerank? Initial vector similarity retrieves broadly related content.
    Reranking with a cross-encoder improves precision on the final set."""
    query_emb = embed_text(query)
    scored = [(chunk, np.dot(query_emb, emb) / (np.linalg.norm(query_emb) * np.linalg.norm(emb)))
              for chunk, emb in index]
    scored.sort(key=lambda x: x[1], reverse=True)
    return scored[:rerank_top]  # In production, apply a cross-encoder reranker here

# Step 5: Generate a grounded response
def rag_answer(query: str, context_chunks: list[tuple]) -> str:
    context = "\n\n".join([f"[Relevance: {score:.3f}]\n{chunk}" for chunk, score in context_chunks])
    response = anthropic_client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=500,
        system="Answer based ONLY on the provided context. Cite the source when possible.",
        messages=[{"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"}],
    )
    return response.content[0].text
```

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

**Code walkthrough:**

```python
# Step 1: Context engineering for data applications — structure matters
# The same model produces dramatically different output depending on context design
from anthropic import Anthropic
import json

client = Anthropic()

# Step 2: Present data as structured context — tables outperform prose
# Why structured? Models reason more accurately over formatted tables than paragraphs
def build_data_context(df_summary: dict, query: str) -> list[dict]:
    """Engineer the context to maximise model reasoning quality."""
    context = f"""Dataset summary:
- Rows: {df_summary['rows']:,}
- Columns: {', '.join(df_summary['columns'])}
- Date range: {df_summary['date_range']}

Column statistics:
{json.dumps(df_summary['statistics'], indent=2)}

Sample data (first 5 rows):
{df_summary['sample_table']}
"""
    return [{"role": "user", "content": f"{context}\n\nAnalysis question: {query}"}]

# Step 3: Few-shot examples steer output format more reliably than instructions
ANALYSIS_SYSTEM_PROMPT = """You are a data analyst for an insurance company.
When analysing data, always follow this structure:

Example analysis:
Question: What is the average claim amount by policy type?
Answer:
1. OBSERVATION: Home insurance claims average $4,200 vs auto claims at $2,100
2. CONTEXT: Home claims are 2x higher, likely due to property repair costs
3. RECOMMENDATION: Investigate the top 10% of home claims for potential fraud
4. CAVEAT: This analysis does not account for policy coverage limits

Now analyse the data provided."""

# Step 4: Context window budget — plan what goes in and what gets cut
def prioritise_context(chunks: list[dict], max_tokens: int = 6000) -> list[dict]:
    """When context exceeds the budget, prioritise by relevance.
    Why not include everything? Models lose focus on content in the middle."""
    # Most relevant chunks at the BEGINNING and END of context
    # Least relevant in the middle (lost-in-the-middle effect)
    sorted_chunks = sorted(chunks, key=lambda c: c["relevance"], reverse=True)
    selected = []
    token_count = 0
    for chunk in sorted_chunks:
        if token_count + chunk["token_count"] > max_tokens:
            break
        selected.append(chunk)
        token_count += chunk["token_count"]
    return selected
```

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

**Code walkthrough:**

```python
# Step 1: Build a data-aware agent that can query databases and analyse results
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# Step 2: Define state — what information flows between agent steps
class DataAgentState(TypedDict):
    question: str
    sql_query: str
    query_result: str
    analysis: str
    iteration: int
    max_iterations: int

# Step 3: Define tools the agent can use — each is a node in the graph
def generate_sql(state: DataAgentState) -> dict:
    """Node 1: Convert natural language question to SQL.
    In production, this calls an LLM with the database schema as context."""
    # Simplified — would use an LLM with schema context
    return {"sql_query": f"SELECT * FROM claims WHERE ... -- generated for: {state['question']}"}

def execute_query(state: DataAgentState) -> dict:
    """Node 2: Run the SQL query against the database.
    Why separate from generation? So we can validate the SQL before executing."""
    # In production: validate SQL, execute, return results
    return {"query_result": "claim_type | count | avg_amount\nauto | 450 | 2100\nhome | 280 | 4200"}

def analyse_results(state: DataAgentState) -> dict:
    """Node 3: Interpret the query results and generate insights."""
    return {"analysis": f"Based on query results: {state['query_result'][:50]}...",
            "iteration": state["iteration"] + 1}

def should_refine(state: DataAgentState) -> str:
    """Conditional edge: decide whether to refine the query or return results.
    Why loop? First query may not capture what the user needs."""
    if state["iteration"] >= state["max_iterations"]:
        return "done"
    if "insufficient" in state.get("analysis", "").lower():
        return "refine"
    return "done"

# Step 4: Build the graph — explicit flow with conditional routing
graph = StateGraph(DataAgentState)
graph.add_node("generate_sql", generate_sql)
graph.add_node("execute", execute_query)
graph.add_node("analyse", analyse_results)

graph.set_entry_point("generate_sql")
graph.add_edge("generate_sql", "execute")
graph.add_edge("execute", "analyse")
graph.add_conditional_edges("analyse", should_refine,
    {"refine": "generate_sql", "done": END})  # Loop or terminate

app = graph.compile()
result = app.invoke({"question": "What are average claim amounts by type?",
                     "sql_query": "", "query_result": "", "analysis": "",
                     "iteration": 0, "max_iterations": 3})
print(result["analysis"])
```

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

**Code walkthrough:**

```python
# Step 1: Architecture pattern selection — match complexity to the problem
# The most common mistake is choosing the most complex pattern by default
from dataclasses import dataclass

@dataclass
class ArchitectureDecision:
    pattern: str
    when_to_use: str
    complexity: int      # 1-5 scale
    monthly_cost: str

PATTERNS = [
    ArchitectureDecision("Simple Pipeline", "Linear data transformations, ETL", 1, "$50-200"),
    ArchitectureDecision("Single LLM Call", "One-shot text generation/classification", 2, "$100-500"),
    ArchitectureDecision("RAG", "Knowledge retrieval from proprietary documents", 3, "$300-1000"),
    ArchitectureDecision("Agent (single)", "Multi-step reasoning with tool use", 4, "$500-2000"),
    ArchitectureDecision("Multi-Agent", "Complex tasks requiring specialised sub-agents", 5, "$1000-5000"),
]

# Step 2: Decision framework — always start at complexity level 1
def select_pattern(requires_knowledge_base: bool, requires_multi_step: bool,
                   requires_tool_use: bool, num_distinct_subtasks: int) -> str:
    """Why start simple? Every added layer adds latency, cost, and failure modes.
    Only add complexity when the simpler pattern demonstrably fails."""
    if not requires_knowledge_base and not requires_multi_step:
        return "Simple Pipeline or Single LLM Call"
    if requires_knowledge_base and not requires_multi_step:
        return "RAG"
    if requires_tool_use and num_distinct_subtasks <= 3:
        return "Single Agent with tools"
    if num_distinct_subtasks > 3:
        return "Multi-Agent (but verify that subtasks truly need separate agents)"
    return "RAG + Agent hybrid"

# Step 3: Observability is an architectural requirement, not an afterthought
import logging
import time

def trace_ai_call(func):
    """Decorator: log every AI component call for debugging and cost tracking.
    Without traces, debugging a multi-component system is nearly impossible."""
    def wrapper(*args, **kwargs):
        start = time.time()
        logger = logging.getLogger("ai_trace")
        logger.info(f"CALL: {func.__name__} | args: {str(args)[:100]}")
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        logger.info(f"DONE: {func.__name__} | {elapsed:.2f}s")
        return result
    return wrapper

# Step 4: Print the decision matrix for reference
for p in PATTERNS:
    print(f"  {p.pattern:20s} | Complexity: {p.complexity} | Cost: {p.monthly_cost}")
```

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

**Code walkthrough:**

```python
# Step 1: Security controls for LLM-integrated data pipelines
# Even internal tools are vulnerable if they process external content
import re
import os

# Step 2: NEVER store credentials in code — use environment variables or a vault
# BAD: api_key = "sk-abc123..."  (in code or notebook)
# GOOD: read from environment
api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise EnvironmentError("OPENAI_API_KEY not set. Use a secrets manager, never hardcode keys.")

# Step 3: Sanitise all external content before inserting into LLM context
def sanitise_for_llm(text: str) -> str:
    """Why sanitise? External content (database values, API responses, documents)
    may contain embedded instructions that hijack the model's behaviour."""
    # Remove common injection patterns
    suspicious_patterns = [
        r"ignore\s+previous\s+instructions",
        r"system:\s*you\s+are",
        r"<\s*/?\s*system\s*>",
    ]
    cleaned = text
    for pattern in suspicious_patterns:
        cleaned = re.sub(pattern, "[REDACTED]", cleaned, flags=re.IGNORECASE)
    return cleaned

# Step 4: Validate model output BEFORE using it in downstream operations
def validate_sql_output(generated_sql: str) -> tuple[bool, str]:
    """If an LLM generates SQL for your database, treat it as untrusted input.
    A prompt injection could turn a SELECT into a DROP TABLE."""
    dangerous_patterns = ["DROP", "DELETE", "TRUNCATE", "ALTER", "INSERT", "UPDATE"]
    sql_upper = generated_sql.upper()
    for pattern in dangerous_patterns:
        if pattern in sql_upper:
            return False, f"Blocked: generated SQL contains '{pattern}'"
    if not sql_upper.strip().startswith("SELECT"):
        return False, "Blocked: only SELECT queries are allowed"
    return True, "OK"

# Step 5: Principle of least privilege for agent database access
DB_PERMISSIONS = {
    "data_analyst_agent": {"allowed_tables": ["claims_summary", "policy_stats"],
                           "operations": ["SELECT"],
                           "row_limit": 10000},
    # The agent can ONLY read from specific tables, nothing else
}
```

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

**Code walkthrough:**

```python
# Step 1: Implement a governance checklist as code — make governance practical
# Checklists turn abstract policies into concrete, verifiable checks
from dataclasses import dataclass, field
from datetime import date
from enum import Enum

class GovernanceStage(Enum):
    PLANNING = "planning"
    DEVELOPMENT = "development"
    PRE_DEPLOYMENT = "pre_deployment"
    PRODUCTION = "production"

@dataclass
class GovernanceChecklist:
    """Operationalise governance into concrete checks at each project stage.
    Why as code? Because manual checklists get skipped under deadline pressure."""
    project_name: str
    stage: GovernanceStage
    checks: dict = field(default_factory=dict)

    def add_check(self, name: str, passed: bool, evidence: str = ""):
        self.checks[name] = {"passed": passed, "evidence": evidence, "date": str(date.today())}

    def is_gate_passed(self) -> tuple[bool, list[str]]:
        failures = [name for name, check in self.checks.items() if not check["passed"]]
        return len(failures) == 0, failures

# Step 2: Pre-deployment governance gate — must pass before production
checklist = GovernanceChecklist("Claims Fraud Model v3", GovernanceStage.PRE_DEPLOYMENT)

checklist.add_check("AI Register entry exists", True, evidence="AI-2025-042")
checklist.add_check("Risk classification completed", True, evidence="HIGH risk")
checklist.add_check("Fairness evaluation across protected groups", True,
                    evidence="Demographic parity diff < 0.05 for gender, age groups")
checklist.add_check("SHAP explanations validated by domain expert", True,
                    evidence="Claims team reviewed top-10 feature contributions")
checklist.add_check("Data lineage documented", True, evidence="claims_v2025Q1 dataset")
checklist.add_check("Human oversight mechanism defined", True,
                    evidence="All high-severity predictions require manual review")
checklist.add_check("Monitoring and alerting configured", False,
                    evidence="")  # Not yet done!

passed, failures = checklist.is_gate_passed()
print(f"Governance gate: {'PASSED' if passed else 'BLOCKED'}")
if failures:
    print(f"Outstanding items: {failures}")
    # Deployment is blocked until ALL checks pass
```

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

**Code walkthrough:**

```python
# Step 1: SHAP — explain WHY the model made a specific prediction
# This is required for regulatory compliance in insurance (EU AI Act)
import shap
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split

# Step 2: Train a model on insurance data
np.random.seed(42)
n = 1000
feature_names = ["age", "income", "credit_score", "claim_history", "policy_tenure"]
X = np.column_stack([
    np.random.randint(18, 70, n),
    np.random.normal(50000, 15000, n),
    np.random.randint(300, 850, n),
    np.random.randint(0, 10, n),
    np.random.randint(0, 20, n),
])
y = ((X[:, 2] < 500) & (X[:, 3] > 5)).astype(int)  # High risk if low credit + many claims

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = GradientBoostingClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 3: TreeSHAP — efficient exact SHAP values for tree-based models
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Step 4: Global explanation — which features matter ACROSS ALL predictions?
print("Global feature importance (mean |SHAP value|):")
mean_shap = np.abs(shap_values).mean(axis=0)
for name, importance in sorted(zip(feature_names, mean_shap), key=lambda x: x[1], reverse=True):
    print(f"  {name:20s}: {importance:.4f}")

# Step 5: Local explanation — WHY was THIS specific customer flagged?
# This is what regulators and customers need: individual decision justification
customer_idx = 0
print(f"\nLocal explanation for customer {customer_idx}:")
print(f"  Prediction: {'High Risk' if model.predict(X_test[customer_idx:customer_idx+1])[0] else 'Low Risk'}")
print(f"  Base value: {explainer.expected_value:.4f}")
for name, value, shap_val in zip(feature_names, X_test[customer_idx], shap_values[customer_idx]):
    direction = "increases" if shap_val > 0 else "decreases"
    print(f"  {name}={value:.0f}: {direction} risk by {abs(shap_val):.4f}")

# Step 6: Generate SHAP summary plot (saved as image for reports)
# shap.summary_plot(shap_values, X_test, feature_names=feature_names, show=False)
# plt.savefig("shap_summary.png", dpi=150, bbox_inches="tight")
```

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

**Code walkthrough:**

```python
# Step 1: Survival analysis for customer lapse prediction using lifelines
# Standard classification ignores censoring — survival analysis handles it correctly
from lifelines import KaplanMeierFitter, CoxPHFitter
from lifelines.statistics import logrank_test
import pandas as pd
import numpy as np

np.random.seed(42)

# Step 2: Create insurance customer data with censoring
# Censored = customer is still active (event hasn't happened yet)
n = 500
data = pd.DataFrame({
    "tenure_months": np.random.exponential(24, n).astype(int) + 1,
    "lapsed": np.random.binomial(1, 0.6, n),  # 40% still active (censored)
    "age": np.random.randint(20, 70, n),
    "premium_tier": np.random.choice(["basic", "standard", "premium"], n),
    "num_claims": np.random.poisson(2, n),
})

# Step 3: Kaplan-Meier estimator — non-parametric survival curve
# Shows the probability of a customer remaining active over time
kmf = KaplanMeierFitter()
kmf.fit(data["tenure_months"], event_observed=data["lapsed"])
print(f"Median survival time: {kmf.median_survival_time_:.0f} months")
print(f"6-month retention rate: {kmf.predict(6):.1%}")
print(f"12-month retention rate: {kmf.predict(12):.1%}")
print(f"24-month retention rate: {kmf.predict(24):.1%}")

# Step 4: Compare survival between groups — log-rank test
basic = data[data["premium_tier"] == "basic"]
premium = data[data["premium_tier"] == "premium"]
result = logrank_test(basic["tenure_months"], premium["tenure_months"],
                      basic["lapsed"], premium["lapsed"])
print(f"\nBasic vs Premium — Log-rank p-value: {result.p_value:.4f}")
print(f"Significant difference? {'Yes' if result.p_value < 0.05 else 'No'}")

# Step 5: Cox Proportional Hazards — identify which factors affect lapse risk
cph_data = pd.get_dummies(data, columns=["premium_tier"], drop_first=True)
cph = CoxPHFitter()
cph.fit(cph_data, duration_col="tenure_months", event_col="lapsed")
print("\nCox PH Hazard Ratios:")
print(cph.summary[["exp(coef)", "p"]])
# exp(coef) > 1 means HIGHER lapse risk; < 1 means LOWER lapse risk

# Step 6: Check proportional hazards assumption — ALWAYS validate
cph.check_assumptions(cph_data, p_value_threshold=0.05, show_plots=False)
```

**Common pitfalls:**
- Ignoring censored observations — dropping them from the dataset or treating them as non-events biases survival estimates downward (you underestimate the true survival time)
- Violating the proportional hazards assumption in Cox models without checking — use Schoenfeld residuals or log-log plots to verify. If violated, consider time-varying covariates or stratification
- Confusing survival analysis with simple duration calculations — the average time to event is not the median survival time when censoring is present
- Not considering competing risks — a customer who dies is not the same as a customer who lapses, but both end the observation. Competing risks models handle this correctly

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) (Internal -- requires company access) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems, particularly those used in insurance pricing, claims assessment, and underwriting, require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from data scientists building predictive models to business users employing AI-assisted analytics tools.

**Code walkthrough:**

```python
# Step 1: Model card generation — document model purpose, limitations, and evaluation
# The AI Policy requires documentation for all AI use cases
from dataclasses import dataclass, field
from datetime import date

@dataclass
class ModelCard:
    """Model cards capture everything needed for governance compliance.
    Why automate this? Manual documentation is often incomplete or outdated."""
    model_name: str
    version: str
    purpose: str
    risk_classification: str
    training_data_description: str
    evaluation_metrics: dict
    fairness_metrics: dict
    known_limitations: list[str]
    intended_users: list[str]
    last_updated: date = field(default_factory=date.today)

    def to_markdown(self) -> str:
        md = f"# Model Card: {self.model_name} v{self.version}\n\n"
        md += f"**Purpose:** {self.purpose}\n\n"
        md += f"**Risk Classification:** {self.risk_classification}\n\n"
        md += f"**Training Data:** {self.training_data_description}\n\n"
        md += "## Evaluation Metrics\n"
        for metric, value in self.evaluation_metrics.items():
            md += f"- {metric}: {value}\n"
        md += "\n## Fairness Metrics\n"
        for metric, value in self.fairness_metrics.items():
            md += f"- {metric}: {value}\n"
        md += "\n## Known Limitations\n"
        for limitation in self.known_limitations:
            md += f"- {limitation}\n"
        return md

# Step 2: Generate a model card for a claims fraud model
card = ModelCard(
    model_name="Claims Fraud Detector",
    version="3.1",
    purpose="Flag potentially fraudulent insurance claims for manual review",
    risk_classification="HIGH — affects individuals' access to insurance services",
    training_data_description="Claims data from 2020-2024, 500k records, PII removed",
    evaluation_metrics={"F1": 0.87, "Precision": 0.82, "Recall": 0.93, "AUC-PR": 0.91},
    fairness_metrics={"Demographic parity (gender)": 0.03, "Equalised odds (age)": 0.05},
    known_limitations=[
        "Performance degrades on claims in languages other than Swedish",
        "Not validated for commercial/business insurance claims",
        "Requires retraining if claim categories change",
    ],
    intended_users=["Claims handlers (as decision support, not autonomous)"],
)
print(card.to_markdown())
```

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

## EU Compliance for Data Scientists

Senior Data Scientists working in the EU must understand and implement the compliance requirements that arise when machine learning models make or influence decisions about individuals. GDPR Article 22 is the cornerstone regulation: it gives individuals the right not to be subject to a decision based solely on automated processing — including profiling — that produces legal effects or similarly significant effects on them. In insurance, this means any model that influences pricing, claims assessment, underwriting, or customer eligibility must either include meaningful human oversight or be justified under one of the narrow exceptions (explicit consent, contractual necessity, or authorisation by law). The practical implication is that Data Scientists must design models and their deployment workflows to ensure that automated outputs are reviewed by qualified humans before consequential decisions are made.

Fairness metrics are not optional in the EU regulatory context — they are a legal requirement for high-risk AI systems under the EU AI Act. Article 10 requires that training, validation, and testing datasets are relevant, representative, and as free of errors and bias as possible. For Data Scientists, this translates into a concrete obligation to measure and document fairness across protected groups at every stage of the model lifecycle. Demographic parity, equalised odds, and predictive parity should be computed across gender, age, disability status, and other protected attributes. When disparities exceed acceptable thresholds, mitigation techniques — threshold optimisation, resampling, or algorithmic constraints — must be applied and documented. The key principle is that fairness evaluation must be a recurring pipeline step, not a one-time audit.

The right to explanation is another GDPR requirement with direct implications for Data Scientists. When automated processing significantly affects an individual, they have the right to obtain meaningful information about the logic involved. This means that Data Scientists must be able to explain individual predictions — not just provide global feature importance. SHAP values, LIME explanations, and counterfactual reasoning are not just good scientific practice; they are tools for meeting regulatory obligations. Explanations must be understandable to the affected individual, which means translating technical feature contributions into plain-language reasons that a claims handler or customer can understand.

Documentation requirements under the EU AI Act are comprehensive. High-risk AI systems must have technical documentation meeting Annex IV requirements, including: a description of the AI system and its intended purpose, the design specifications and development methodology, information about the training data and its governance, evaluation metrics and results, information about human oversight measures, and details of the monitoring and update procedures. Data Scientists contribute directly to this documentation — they produce the model cards, evaluation reports, and fairness assessments that form the core of the conformity evidence.

**Code walkthrough:**

```python
# GDPR Article 22 compliance — fairness metrics and automated decision safeguards
# Required for any model that influences decisions about individuals
from dataclasses import dataclass
from datetime import date
import numpy as np

@dataclass
class Article22ComplianceReport:
    """Documents compliance with GDPR Article 22 for automated decisions."""
    model_name: str
    model_version: str
    report_date: date
    human_oversight_mechanism: str
    fairness_metrics: dict
    explanation_method: str
    compliant: bool
    gaps: list[str]

def assess_article22_compliance(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    sensitive_attrs: dict[str, np.ndarray],
    model_name: str,
    has_human_review: bool,
    fairness_threshold: float = 0.05,
) -> Article22ComplianceReport:
    """Assess whether a model deployment complies with GDPR Article 22.
    Why automate this? Compliance checks must run on every model version,
    not just at initial deployment."""
    gaps = []
    fairness_results = {}

    # Check fairness across all protected attributes
    for attr_name, attr_values in sensitive_attrs.items():
        groups = np.unique(attr_values)
        positive_rates = {}
        for group in groups:
            mask = attr_values == group
            positive_rates[str(group)] = float(y_pred[mask].mean())

        disparity = max(positive_rates.values()) - min(positive_rates.values())
        fairness_results[attr_name] = {
            "positive_rates_by_group": positive_rates,
            "demographic_parity_diff": round(disparity, 4),
            "within_threshold": disparity <= fairness_threshold,
        }
        if disparity > fairness_threshold:
            gaps.append(f"Fairness gap on '{attr_name}': disparity={disparity:.4f}")

    # Human oversight is mandatory for decisions with significant effects
    if not has_human_review:
        gaps.append("No human oversight mechanism — required by Article 22(1)")

    return Article22ComplianceReport(
        model_name=model_name,
        model_version="latest",
        report_date=date.today(),
        human_oversight_mechanism="Claims handler reviews all flagged predictions"
            if has_human_review else "MISSING",
        fairness_metrics=fairness_results,
        explanation_method="SHAP TreeExplainer — local explanations per prediction",
        compliant=len(gaps) == 0,
        gaps=gaps,
    )
```

> **Why it matters:** GDPR Article 22 violations can result in individual complaints, regulatory investigations, and penalties of up to 20 million EUR or 4% of global turnover. In insurance specifically, a model that systematically disadvantages a protected group in pricing or claims assessment creates both legal liability and reputational harm. Data Scientists who embed fairness measurement, human oversight design, and explainability into their standard workflow ensure that models are not just accurate but also legally deployable in the EU.
