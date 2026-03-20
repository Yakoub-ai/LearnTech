# AI Engineer – Mid Concept Reference


This document provides in-depth explanations of the core concepts covered at the Mid level of the AI Engineer learning path. It assumes familiarity with the Beginner concepts and focuses on LLM internals, embeddings, prompt and context engineering, RAG, agent frameworks, and AI-assisted development.

---

## Large Language Models – Architecture, Tokenisation and Inference

Large language models (LLMs) are neural networks trained on vast quantities of text to predict the next token in a sequence. Understanding their architecture and inference process helps engineers build systems that use them reliably.

The dominant architecture for modern LLMs is the transformer, introduced in 2017. The transformer uses self-attention mechanisms that allow each token in a sequence to attend to every other token. This enables the model to capture long-range dependencies in text — something previous recurrent architectures struggled with. Stacking many transformer blocks, scaling parameters to billions, and training on trillions of tokens produces the emergent capabilities seen in frontier models from OpenAI and Anthropic.

Tokenisation is the process of converting raw text into the integer tokens the model operates on. Tokenisers do not split on word boundaries; they use subword algorithms (such as byte-pair encoding) that balance vocabulary size with the ability to represent rare or compound words. A single English word may be one token or several; whitespace, punctuation, and casing all affect tokenisation. Tokens are not words — this distinction matters when estimating prompt cost and length.

Inference is the process of generating output from a trained model. Given a prompt (a sequence of tokens), the model produces a probability distribution over the vocabulary at each position, and a sampling strategy (greedy, top-k, nucleus sampling) selects the next token. This is repeated autoregressively until a stopping condition is met. Temperature controls the randomness of sampling: low temperature makes output more deterministic and focused, high temperature makes it more diverse and creative.

**Code walkthrough:**

```python
# Step 1: Tokenisation in practice — see how text becomes tokens
# Understanding tokenisation is critical for cost estimation and context management
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")

# Step 2: Compare token counts for different text styles
# Verbose prompts cost more and leave less room for context
verbose_prompt = "Could you please kindly provide me with a detailed summary of the following document, making sure to include all the key points and important details?"
concise_prompt = "Summarise this document. Include key points only."

verbose_tokens = len(enc.encode(verbose_prompt))
concise_tokens = len(enc.encode(concise_prompt))
print(f"Verbose: {verbose_tokens} tokens | Concise: {concise_tokens} tokens")
print(f"Savings: {verbose_tokens - concise_tokens} tokens per call")

# Step 3: Estimate API cost — tokens directly determine your bill
# At $3/M input tokens, savings compound across thousands of calls
calls_per_day = 10000
token_savings = (verbose_tokens - concise_tokens) * calls_per_day
cost_per_million = 3.00  # example rate
daily_savings = (token_savings / 1_000_000) * cost_per_million
print(f"Daily savings: ${daily_savings:.2f} ({token_savings:,} tokens)")

# Step 4: Temperature affects output — this is a design decision
# Low temp (0.0) for factual extraction, high temp (0.8) for creative tasks
from anthropic import Anthropic
client = Anthropic()

# Deterministic output for data extraction
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=100,
    temperature=0.0,  # Near-deterministic: same input → same output
    messages=[{"role": "user", "content": "Extract the date from: 'The policy expires on March 15, 2025.' Return only the date in ISO format."}]
)
print(f"Extracted: {response.content[0].text}")
```

**Why it matters:** LLMs are the foundation of most GenAI applications. Understanding how they actually work — rather than treating them as magic text boxes — is essential for diagnosing failures, optimising prompts, managing costs, and making sound architectural decisions about when to use them.

**Key things to understand:**
- LLMs do not retrieve facts — they generate text that is statistically consistent with their training data.
- The context window limits how much text the model can process at once; content beyond the window is invisible to the model.
- Token count affects cost and latency for API-based models — optimise prompt length deliberately.
- Temperature controls randomness: lower = more deterministic, higher = more varied output.

**Common pitfalls:**
- Treating LLM output as factual without verification — models hallucinate plausible-sounding but incorrect information.
- Assuming the model "understands" instructions the same way a human would — LLMs process instructions differently from humans. They can perform multi-step reasoning within limits but lack grounded understanding, and their failure modes differ from human failures.
- Ignoring tokenisation when measuring prompt length, leading to unexpected truncation.

---

## Embeddings – What They Are and Why They Enable Semantic Search

An embedding is a dense numerical vector that represents a piece of data — a word, sentence, document, or image — in a high-dimensional space. The defining property of a good embedding space is that semantically similar items are geometrically close to each other.

Embedding models are trained to produce these representations. For text, a sentence embedding captures meaning rather than surface form: the sentences "the bank closed at five" and "the financial institution shut its doors in the evening" will have similar embeddings, even though they share no words. This is in contrast to keyword-based search, which matches exact terms and misses synonyms, paraphrases, and conceptual relationships.

Semantic search uses embeddings to find the most relevant documents for a query. The query is embedded into the same vector space as the documents, and similarity is measured using cosine similarity — which measures the angle between vectors rather than their magnitude, making it scale-invariant. Vector databases (such as Azure AI Search, Pinecone, Qdrant, Weaviate, Chroma, or pgvector) store and index these embeddings for efficient approximate nearest-neighbour retrieval at scale.

Embeddings are also the foundation of retrieval-augmented generation. Before an LLM generates a response, relevant documents are retrieved from a vector store based on embedding similarity and injected into the prompt as context.

**Code walkthrough:**

```python
# Step 1: Generate embeddings — convert text into numerical vectors
# Embeddings capture meaning, not just keywords
from openai import OpenAI
import numpy as np

client = OpenAI()

# Step 2: Embed documents and a query using the SAME model
# Using different models for indexing vs querying produces garbage results
documents = [
    "The insurance policy covers water damage from burst pipes.",
    "Car insurance premiums depend on driving history and vehicle type.",
    "Home insurance does not typically cover flood damage without a rider.",
]

query = "Does my policy cover a broken water pipe?"

# Step 3: Get embeddings — each text becomes a vector of 1536 floats
def get_embedding(text):
    response = client.embeddings.create(model="text-embedding-3-small", input=text)
    return np.array(response.data[0].embedding)

doc_embeddings = [get_embedding(doc) for doc in documents]
query_embedding = get_embedding(query)

# Step 4: Cosine similarity — measure semantic closeness
# High similarity (close to 1.0) means the texts are semantically related
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print("Similarity scores (query vs each document):")
for i, doc_emb in enumerate(doc_embeddings):
    score = cosine_similarity(query_embedding, doc_emb)
    print(f"  Doc {i}: {score:.4f} — {documents[i][:60]}...")

# Step 5: The highest score wins — this is semantic search
# Notice: "broken water pipe" matches "burst pipes" despite different words
best_idx = np.argmax([cosine_similarity(query_embedding, e) for e in doc_embeddings])
print(f"\nBest match: {documents[best_idx]}")
```

**Why it matters:** Embeddings unlock semantic understanding in applications that would otherwise rely on brittle keyword matching. They are the core mechanism behind RAG, recommendation systems, and similarity search — all of which are foundational patterns in production AI systems.

**Key things to understand:**
- Embedding dimensionality (typically 384 to 4096) determines the richness of the representation.
- The embedding model must be consistent: if you embed your knowledge base with one model, you must embed queries with the same model.
- Cosine similarity is scale-invariant; it measures the angle between vectors, not their magnitude. Semantically similar content will have cosine similarity close to 1.

**Common pitfalls:**
- Using different embedding models for indexing and querying, producing nonsensical similarity scores.
- Embedding very long documents as a single vector — chunking strategies significantly affect retrieval quality.
- Assuming high cosine similarity implies semantic equivalence — it implies relatedness, which is a weaker claim.

---

## Prompt Engineering – Techniques, Patterns and Limitations

Prompt engineering is the practice of designing input text that elicits the desired output from a language model. It is partly craft and partly systematic technique.

Core techniques include: zero-shot prompting (asking the model to perform a task with no examples), few-shot prompting (providing two to five worked examples before the actual request), chain-of-thought prompting (instructing the model to reason step by step before producing an answer), and role prompting (framing the model as a particular persona to influence its style and priorities).

Structural patterns help with consistency. Separating instructions from content using delimiters (XML tags, triple quotes, or headers) reduces ambiguity. Being explicit about output format — asking for JSON, a numbered list, or a specific schema — reduces post-processing effort. Negative instructions ("do not include...") are generally less effective than positive ones ("respond only with...").

Limitations are real and must be understood. Prompts do not deterministically control model behaviour — they shift probabilities. Long prompts can cause the model to lose focus on earlier instructions (the "lost in the middle" effect). Prompts cannot reliably override a model's safety training or fundamental architecture constraints.

**Code walkthrough:**

```python
# Step 1: Chain-of-thought prompting — make the model show its reasoning
# This improves accuracy on complex tasks by forcing step-by-step logic
from anthropic import Anthropic

client = Anthropic()

# Step 2: Without chain-of-thought — the model may jump to a wrong answer
simple_prompt = "A policy has a $500 deductible and 80% co-insurance. The claim is $3,000. What does the insured pay?"

# Step 3: With chain-of-thought — explicitly request reasoning steps
cot_prompt = """A policy has a $500 deductible and 80% co-insurance. The claim is $3,000.
What does the insured pay?

Think step by step:
1. First subtract the deductible from the total claim
2. Then apply the co-insurance percentage to the remainder
3. Add the deductible back to get total out-of-pocket cost
Show your work, then give the final answer."""

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=300,
    messages=[{"role": "user", "content": cot_prompt}]
)
print(response.content[0].text)

# Step 4: Prompt versioning — treat prompts as code artefacts
# Store prompts alongside code, with version tracking
PROMPT_REGISTRY = {
    "claims_classifier_v1": {
        "version": "1.0",
        "system": "You are a claims classification engine. Respond with JSON only.",
        "template": "Classify this claim: {claim_text}\nCategories: auto, home, health, life",
        "temperature": 0.0,
        "notes": "Initial version. Tested on 200 sample claims, 94% accuracy."
    },
    "claims_classifier_v2": {
        "version": "2.0",
        "system": "You are a claims classification engine. Respond with JSON only.",
        "template": "Classify this claim into exactly one category.\nClaim: {claim_text}\nCategories: auto, home, health, life\nRespond: {{\"category\": \"...\", \"confidence\": \"high|medium|low\"}}",
        "temperature": 0.0,
        "notes": "Added confidence field. Tested on 200 samples, 97% accuracy."
    }
}
```

**Why it matters:** The prompt is your primary interface with a language model. Poor prompt design produces inconsistent, unusable output regardless of the underlying model's capability. Prompt engineering is the fastest lever available for improving a GenAI system before reaching for more expensive solutions like fine-tuning.

**Key things to understand:**
- Prompt changes have non-linear effects — a small wording change can significantly alter output.
- Few-shot examples influence the model's output format and tone more than explicit instructions in many cases.
- Chain-of-thought improves accuracy on reasoning tasks but adds output length and therefore cost.

**Common pitfalls:**
- Over-engineering a prompt when the task is simple and a direct instruction would suffice.
- Not versioning prompts alongside code — production prompt changes should be treated as code changes.
- Expecting a prompt to be stable across model versions; prompts often need revision when the underlying model changes.

---

## Context Engineering – Managing Context Windows Effectively

Context engineering extends prompt engineering to the problem of deciding what information to include in the context window, in what order, and in what form. As models are applied to more complex tasks, what is in the context matters as much as how the model is instructed.

The context window is the total input a model can process at once, measured in tokens. It includes the system prompt, conversation history, retrieved documents, tool outputs, and the current user message. Exceeding the window causes truncation, silently dropping content the model needed to answer correctly.

Effective context engineering involves: selecting the most relevant retrieved chunks rather than returning everything, placing the most critical information in positions the model attends to most reliably (typically the beginning and end of the context), compressing verbose content through summarisation, and managing multi-turn conversation history by pruning or summarising older turns.

Context order matters. Research has shown that models attend less reliably to information placed in the middle of a long context than to information at the edges. Critical instructions and the most relevant retrieved content should be positioned accordingly.

**Code walkthrough:**

```python
# Step 1: Context window budget — plan what goes in BEFORE building
# Every token has a cost in money and attention quality
CONTEXT_BUDGET = {
    "total_window": 128000,
    "system_prompt": 800,
    "conversation_history": 4000,   # Last N turns, pruned
    "retrieved_documents": 6000,    # Top-k chunks from RAG
    "user_message": 500,
    "reserved_for_output": 2000,
}
used = sum(v for k, v in CONTEXT_BUDGET.items() if k not in ["total_window", "reserved_for_output"])
remaining = CONTEXT_BUDGET["total_window"] - used - CONTEXT_BUDGET["reserved_for_output"]
print(f"Budget used: {used} tokens | Available: {remaining} tokens")

# Step 2: Conversation history pruning — older turns get summarised
# Without pruning, history grows until it exhausts the window
def prune_conversation_history(messages, max_tokens=4000):
    """Keep recent messages, summarise older ones.
    Why: models attend less reliably to middle content (lost-in-the-middle)."""
    recent = messages[-6:]  # Keep last 3 exchanges verbatim
    older = messages[:-6]
    if not older:
        return recent
    # Summarise older messages into a compact form
    summary = f"[Previous conversation summary: {len(older)} messages discussing "
    topics = set()
    for m in older:
        if len(m["content"]) > 20:
            topics.add(m["content"][:40].strip())
    summary += ", ".join(list(topics)[:3]) + "]"
    return [{"role": "user", "content": summary}] + recent

# Step 3: Structure retrieved context with clear delimiters
# Delimiters help the model distinguish between sources
def format_context(chunks):
    """Why delimiters matter: without them, the model cannot tell
    where one source ends and another begins."""
    formatted = []
    for i, chunk in enumerate(chunks):
        formatted.append(f"<document index='{i+1}' source='{chunk['source']}'>\n{chunk['text']}\n</document>")
    return "\n\n".join(formatted)
```

**Why it matters:** In complex GenAI applications, what goes into the context window is often more important than the prompt instructions themselves. Poor context engineering fills the window with noise, causes truncation of important content, and leads to unfocused or incorrect responses — problems that cannot be fixed by adjusting instructions alone.

**Key things to understand:**
- Every token in the context window has a cost in latency and money (for API-based models) — include only what is necessary.
- Conversation history grows with each turn; without pruning, it will eventually exhaust the context window.
- Structured context (using headers, labels, and clear delimiters) helps the model parse multi-source input correctly.

**Common pitfalls:**
- Including full documents when only a paragraph is relevant, diluting the signal with noise.
- Prepending all retrieved context before the user question, which can cause the model to anchor on retrieval rather than the actual request.
- Not testing context strategies across a range of query lengths and types.

---

## Retrieval-Augmented Generation (RAG) – Architecture and Components

RAG is an architecture pattern that combines a retrieval system with a language model to ground generated responses in a specific, updatable knowledge base. It addresses the core limitations of LLMs — static training data and hallucination — without the cost and complexity of fine-tuning.

The architecture has two main phases. At indexing time, documents are split into chunks, each chunk is embedded using an embedding model, and the resulting vectors are stored in a vector database alongside the original text. At query time, the user's question is embedded using the same model, the vector database is searched for the most similar chunks, and those chunks are injected into the LLM's context window as grounding material before the model generates a response.

The quality of a RAG system depends on each component in the pipeline. Chunking strategy (how documents are split) directly affects whether the retrieved context contains the information needed to answer the query. Retrieval quality determines whether the right chunks are surfaced. Prompt design determines whether the model uses the retrieved context faithfully or ignores it in favour of its parametric knowledge.

**Code walkthrough:**

```python
# Step 1: Build a minimal RAG pipeline — the core pattern for knowledge retrieval
# RAG = Retrieve relevant documents + Augment the prompt + Generate a response
from openai import OpenAI
from anthropic import Anthropic
import numpy as np

openai_client = OpenAI()
anthropic_client = Anthropic()

# Step 2: Indexing phase — chunk documents and embed them
# Chunking strategy directly affects retrieval quality
documents = [
    {"text": "Water damage from burst pipes is covered under standard home insurance. The deductible applies.", "source": "policy_handbook.pdf"},
    {"text": "Flood damage requires a separate flood insurance rider. Standard policies exclude natural flooding.", "source": "policy_handbook.pdf"},
    {"text": "Claims must be filed within 30 days of the incident. Late claims may be denied.", "source": "claims_guide.pdf"},
]

def embed(text):
    resp = openai_client.embeddings.create(model="text-embedding-3-small", input=text)
    return np.array(resp.data[0].embedding)

# Create the index (in production, use a vector database like Pinecone/Qdrant)
index = [(doc, embed(doc["text"])) for doc in documents]

# Step 3: Query phase — embed the question and find the most similar chunks
def retrieve(query, top_k=2):
    """Why top_k matters: too few chunks may miss relevant info,
    too many fills context with noise."""
    query_emb = embed(query)
    scored = [(doc, np.dot(query_emb, emb) / (np.linalg.norm(query_emb) * np.linalg.norm(emb)))
              for doc, emb in index]
    scored.sort(key=lambda x: x[1], reverse=True)
    return scored[:top_k]

# Step 4: Augment the prompt with retrieved context and generate
def rag_query(question):
    results = retrieve(question)
    context = "\n\n".join([f"[Source: {doc['source']}]\n{doc['text']}" for doc, _ in results])
    response = anthropic_client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=300,
        system="Answer based ONLY on the provided context. If the context does not contain the answer, say so.",
        messages=[{"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"}]
    )
    return response.content[0].text

print(rag_query("Is water pipe damage covered by my home insurance?"))
```

**Why it matters:** RAG is the default starting point for most enterprise knowledge retrieval applications. It enables LLMs to answer questions about proprietary, domain-specific, or recently updated information without retraining. It also reduces hallucination by grounding the model's response in real retrieved text — though it does not eliminate it entirely.

**Key things to understand:**
- RAG does not prevent hallucination entirely — if retrieval fails to surface relevant context, the model may still fabricate.
- Hybrid search (combining vector similarity with keyword search such as BM25) typically outperforms pure vector search.
- Reranking retrieved chunks before injecting them into the prompt is a common technique to improve relevance.

**Common pitfalls:**
- Using fixed-size chunking without considering sentence or paragraph boundaries, splitting context mid-thought.
- Returning too many chunks, filling the context window with noise that obscures the relevant content.
- Not evaluating retrieval quality independently of generation quality — poor retrieval cannot be compensated by a better prompt.

---

## LangGraph – Agent Graphs, State and Tool Use

LangGraph is a framework for building stateful, multi-step agent workflows using a graph-based execution model. It addresses the limitations of linear chain-based agent frameworks by allowing branching, looping, and conditional logic.

In LangGraph, a workflow is defined as a directed graph where nodes are processing steps (LLM calls, tool calls, or custom functions) and edges define the transitions between them. Edges can be conditional — the next node is selected based on the current state. This enables loops (retrying a tool call until it succeeds), branching (choosing between different response strategies), and human-in-the-loop patterns (pausing execution for human review).

State is the central concept. LangGraph maintains a typed state object that persists across all nodes in the graph. Each node reads from and writes to this state. Because state is explicit and inspectable, debugging is more tractable than in agent systems where state is implicit.

Tool use is implemented by registering functions as tools the LLM can call. The LLM generates a tool call with arguments, LangGraph routes execution to the corresponding function, captures the result, and routes it back to the LLM for the next step.

**Code walkthrough:**

```python
# Step 1: Define a LangGraph agent with state, tools, and conditional edges
# LangGraph models workflows as directed graphs — not linear chains
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# Step 2: State schema — the most important design decision
# Every node reads from and writes to this shared state
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]  # Accumulates messages
    tool_output: str
    next_action: str  # Controls routing between nodes

# Step 3: Define nodes — each node has a single responsibility
def classify_intent(state: AgentState) -> dict:
    """Node 1: Determine what the user wants. Why separate this?
    Because routing logic should be explicit, not buried in a prompt."""
    last_message = state["messages"][-1]
    # In production, this would call an LLM to classify
    if "claim" in last_message.lower():
        return {"next_action": "lookup_claim"}
    return {"next_action": "general_response"}

def lookup_claim(state: AgentState) -> dict:
    """Node 2: Tool call — query the claims database."""
    return {"tool_output": "Claim #12345: Status=Under Review, Amount=$3,200"}

def generate_response(state: AgentState) -> dict:
    """Node 3: Generate final response using context from previous nodes."""
    context = state.get("tool_output", "No specific data retrieved.")
    return {"messages": [f"Based on our records: {context}"]}

# Step 4: Build the graph — nodes + conditional edges
graph = StateGraph(AgentState)
graph.add_node("classify", classify_intent)
graph.add_node("lookup", lookup_claim)
graph.add_node("respond", generate_response)

# Conditional routing: the edge depends on state, not a fixed path
graph.add_conditional_edges("classify", lambda s: s["next_action"],
    {"lookup_claim": "lookup", "general_response": "respond"})
graph.add_edge("lookup", "respond")
graph.add_edge("respond", END)
graph.set_entry_point("classify")

# Step 5: Compile and run — state flows through the graph
app = graph.compile()
result = app.invoke({"messages": ["What is the status of my claim?"], "tool_output": "", "next_action": ""})
print(result["messages"][-1])
```

**Why it matters:** Most real agent workflows are not linear. They require loops, conditional logic, retries, and parallel execution. LangGraph provides the explicit graph structure needed to build these workflows reliably, with inspectable state that makes debugging practical.

**Key things to understand:**
- Defining the state schema precisely is the most important design decision in a LangGraph agent.
- Conditional edges should handle all possible state values — unhandled transitions cause runtime errors.
- LangGraph supports checkpointing, which allows workflows to be paused and resumed across process boundaries.

**Common pitfalls:**
- Building deeply nested graphs that are difficult to reason about — prefer flat graphs with well-named nodes.
- Not handling tool call failures explicitly, allowing errors to propagate and corrupt agent state.
- Conflating the graph structure with business logic — keep nodes focused on a single responsibility.

---

## AI-Assisted Development – Practical Workflow Integration

AI-assisted development refers to using LLM-powered tools — code completions, chat interfaces, inline suggestions — as active collaborators in the software development process. Used well, these tools accelerate routine tasks and free engineers to focus on higher-order design decisions.

Effective use requires developing an understanding of where these tools are reliable and where they are not. Code generation is strongest for well-defined, self-contained tasks: writing unit tests, implementing a known algorithm, converting between data formats, generating boilerplate. It is weakest for tasks that require deep understanding of a specific codebase's conventions, subtle business logic, or novel algorithms the model has not seen.

Prompt quality determines output quality. Providing the function signature, the expected behaviour, relevant type definitions, and an example of the desired output style consistently produces better results than a vague request. Iterative refinement — accepting a partial result and then asking for specific improvements — is often more effective than trying to specify everything upfront.

Security awareness is essential. AI-generated code should be reviewed with the same rigour as any other code. Models can produce code with subtle security vulnerabilities, use deprecated APIs, or introduce logic errors that pass superficial review. Never merge AI-generated code without understanding what it does.

**Code walkthrough:**

```python
# Step 1: Effective AI-assisted development — give the model rich context
# Vague requests produce vague results; specific prompts produce useful code

# BAD prompt: "Write a function to process claims"
# GOOD prompt: provides signature, types, expected behaviour, and constraints

# Step 2: Example of a well-structured prompt for code generation
prompt_for_ai_tool = """
Write a Python function with this exact signature:

def validate_claim(claim: dict) -> tuple[bool, list[str]]:
    '''Validate an insurance claim dictionary.

    Args:
        claim: dict with keys 'amount' (float), 'date' (str, ISO format),
               'policy_id' (str), 'description' (str, min 10 chars)

    Returns:
        (is_valid, list_of_error_messages)
    '''

Requirements:
- amount must be positive and under 1,000,000
- date must be a valid ISO date not in the future
- policy_id must match pattern 'POL-XXXXX' (5 digits)
- Return ALL validation errors, not just the first one
"""

# Step 3: ALWAYS review and test AI-generated code before using it
# This is a verification workflow, not blind acceptance
def review_generated_code(generated_function):
    """Why testing matters: AI-generated code can have subtle bugs
    that pass superficial review but fail on edge cases."""
    test_cases = [
        # Valid claim
        ({"amount": 500.0, "date": "2025-01-15", "policy_id": "POL-12345",
          "description": "Water damage from burst pipe in kitchen"},
         True),
        # Invalid: negative amount, future date
        ({"amount": -100, "date": "2030-01-01", "policy_id": "POL-12345",
          "description": "Test claim description here"},
         False),
        # Edge case: missing keys entirely
        ({}, False),
    ]
    for claim, expected_valid in test_cases:
        is_valid, errors = generated_function(claim)
        assert is_valid == expected_valid, f"Failed for {claim}: got {is_valid}"
        if not expected_valid:
            assert len(errors) > 0, f"Expected errors for invalid claim: {claim}"
    print("All tests passed — safe to use")
```

**Why it matters:** AI coding tools are now a standard part of the development workflow. Engineers who use them effectively compound their output; engineers who use them carelessly introduce subtle bugs that are expensive to find later. The skill is learning when to trust, when to verify, and when to ignore the suggestion.

**Key things to understand:**
- AI coding tools are multipliers, not replacements — they amplify the productivity of engineers who already understand what they are building.
- Accepting suggestions without reading them carefully is the primary way AI assistance introduces bugs.
- These tools work best when your codebase is well-structured and well-named; they struggle with tangled, ambiguous code.

**Common pitfalls:**
- Using generated code in security-sensitive contexts without a thorough manual review.
- Letting AI tools become a crutch that prevents developing genuine understanding of the systems being built.
- Not customising tool configuration (such as included context or code style rules) to match the project's conventions.
