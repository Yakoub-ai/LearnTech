# AI Engineer – Beginner Concept Reference


This document provides in-depth explanations of the core concepts covered at the Beginner level of the AI Engineer learning path. Each section describes what a concept is, why it matters in practice, what you need to understand about it, and the mistakes engineers most commonly make when encountering it for the first time.

---

## What is Generative AI

Generative AI refers to a category of artificial intelligence systems that create new content — text, images, audio, code, video — rather than simply classifying, predicting, or retrieving existing information. It is the subset of AI that has driven the current wave of industry transformation, and it is the foundation of the AI Engineer role.

Understanding where generative AI sits in the broader AI landscape is essential. Artificial intelligence (AI) is the broadest term — any technique that enables machines to perform tasks requiring human-like intelligence. Machine learning (ML) is a subset of AI where systems learn from data rather than following hand-coded rules. Deep learning is a subset of ML using neural networks with many layers. Generative AI is a subset of deep learning focused on content generation.

The dominant architecture behind modern generative AI is the transformer, introduced in 2017. Large language models (LLMs) such as frontier models from OpenAI and Anthropic are transformer-based models trained on vast quantities of text. They generate output by predicting the most likely next token in a sequence, producing text that is statistically consistent with their training data. This means LLMs do not retrieve facts or truly "understand" — they produce plausible continuations of input text.

Other forms of generative AI include image generation models (diffusion models), audio synthesis, and video generation. While the AI Engineer role focuses primarily on LLM-based applications, understanding the broader generative AI landscape helps in evaluating which technology fits a given problem.

**Code walkthrough:**

```python
# Step 1: Why we distinguish between generative AI and traditional ML
# Traditional ML classifies or predicts; generative AI creates new content
# Understanding this distinction prevents misapplying tools

# Traditional ML example — classification (not generative)
from sklearn.linear_model import LogisticRegression
classifier = LogisticRegression()
# This predicts a label (spam/not spam), it does NOT generate new text

# Step 2: Generative AI example — using an LLM to create new content
from anthropic import Anthropic

client = Anthropic()

# Step 3: The model generates NEW text, not retrieving from a database
# This is the defining characteristic of generative AI
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=200,
    messages=[
        {"role": "user", "content": "Explain what a transformer is in one paragraph."}
    ]
)

# Step 4: The output is a statistical continuation of the input
# The model predicted likely next tokens — it did not look up an answer
print(response.content[0].text)

# Step 5: Check token usage to understand the cost model
# Every token (input + output) has a cost — this is how LLM APIs charge
print(f"Input tokens: {response.usage.input_tokens}")
print(f"Output tokens: {response.usage.output_tokens}")
```

**Why it matters:** As an AI Engineer, everything you build is powered by generative AI. Understanding what it is, what it can do, and — critically — what it cannot do is the foundation for every design decision you will make. Engineers who treat LLMs as magic text boxes build brittle systems; engineers who understand the underlying mechanics build robust ones.

**Key things to understand:**
- Generative AI creates new content; it does not retrieve or look up facts.
- LLMs generate text by predicting the next token — they do not have a database of answers.
- The transformer architecture enables LLMs to process sequences in parallel and capture long-range dependencies.
- Not all AI problems require generative AI — many are better solved with traditional ML or even rule-based systems.

**Common pitfalls:**
- Assuming LLMs "know" things — they generate statistically plausible text, which may be factually wrong (hallucination).
- Using generative AI for tasks that are better solved with traditional search, databases, or rule-based logic.
- Conflating "AI" with "generative AI" in technical discussions, which obscures what is actually being built.

---

## How LLMs Work — A Simplified Overview

Large language models are neural networks trained on massive text datasets to predict the next token in a sequence. Understanding the basics of how they work — without needing to implement one — is essential for building applications on top of them.

**Architecture.** Modern LLMs use the transformer architecture. The key innovation is the self-attention mechanism, which allows the model to weigh the importance of every other token in the input when processing each token. This means the model can capture relationships between words that are far apart in a sentence. Transformers process input in parallel (unlike older recurrent networks that processed sequentially), making them much faster to train at scale.

**Tokenisation.** Before an LLM processes text, it must be converted into tokens — numerical representations the model operates on. Tokenisers use subword algorithms (such as byte-pair encoding) that split text into pieces that balance vocabulary size with coverage. A common English word might be one token; a rare or compound word might be split into several tokens. Whitespace, punctuation, and casing all affect tokenisation. Tokens are not words — this distinction matters when estimating costs and managing context window limits.

**Context window.** The context window is the maximum number of tokens the model can process in a single request. It includes everything: the system prompt, conversation history, any retrieved documents, and the user's current message. Content beyond the context window is simply invisible to the model. Managing what goes into the context window is one of the most important practical skills for an AI Engineer.

**Inference.** When you send a prompt to an LLM, the model generates output one token at a time. At each step, it produces a probability distribution over its entire vocabulary and selects the next token using a sampling strategy. Temperature controls the randomness: low temperature (close to 0) produces more deterministic, focused output; high temperature produces more varied, creative output. This autoregressive generation continues until a stopping condition is met.

**Code walkthrough:**

```python
# Step 1: Understand tokenisation — tokens are NOT words
# This is critical for estimating costs and context window usage
import tiktoken

# GPT-4 uses the cl100k_base tokeniser
enc = tiktoken.get_encoding("cl100k_base")

text = "The AI Engineer role is fundamentally about building applications."
tokens = enc.encode(text)

# Step 2: See how text maps to tokens — notice subword splits
print(f"Text: {text}")
print(f"Token count: {len(tokens)}")
print(f"Tokens: {tokens}")
# Decode each token to see the subword pieces
for t in tokens:
    print(f"  Token {t} -> '{enc.decode([t])}'")

# Step 3: Why context window management matters
# A 128k context window sounds large, but fills up fast
system_prompt_tokens = 500
conversation_history_tokens = 2000
retrieved_documents_tokens = 8000
user_message_tokens = 100
total = system_prompt_tokens + conversation_history_tokens + retrieved_documents_tokens + user_message_tokens
print(f"\nTotal input tokens: {total}")
print(f"Remaining for output: {128000 - total}")

# Step 4: Temperature controls output randomness
# Low temperature (0.0-0.3) = factual, consistent output
# High temperature (0.7-1.0) = creative, varied output
# This is a design decision, not a default you should ignore
```

**Why it matters:** You do not need to train LLMs, but you need to understand how they work to use them effectively. Knowing about tokenisation helps you estimate costs and avoid truncation. Understanding the context window helps you design applications that provide the right information to the model. Understanding temperature and sampling helps you tune output for different use cases.

**Key things to understand:**
- LLMs predict the next token based on statistical patterns learned during training — they do not reason the way humans do.
- The context window is a hard limit — anything beyond it is invisible to the model.
- Token count determines API cost and latency — shorter, more focused prompts are cheaper and faster.
- Temperature is the primary control for output variability: low for factual tasks, higher for creative tasks.

**Common pitfalls:**
- Assuming the model "remembers" previous conversations — each API call is independent unless you explicitly include conversation history in the context.
- Ignoring tokenisation when estimating whether content fits in the context window, leading to unexpected truncation.
- Setting temperature too high for factual tasks, producing unreliable output, or too low for creative tasks, producing repetitive output.

---

## APIs and AI Services

AI Engineers interact with LLMs primarily through APIs (Application Programming Interfaces). Understanding how APIs work — and specifically how LLM APIs differ from traditional APIs — is a foundational skill.

**What is an API.** An API is a contract between two software systems that defines how they communicate. A REST API uses HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs. The client sends a request with headers and a body; the server processes it and returns a response with a status code and a body. JSON is the standard data format for both request and response bodies.

**How LLM APIs work.** LLM APIs (such as those provided by OpenAI, Anthropic, and Azure OpenAI) follow the REST pattern but have specific characteristics. You send a POST request containing the conversation messages (system prompt, user messages, assistant messages), model parameters (temperature, max tokens), and optionally tool definitions. The API returns the model's generated response, along with metadata such as token usage. Streaming APIs return the response token by token for lower perceived latency.

**Token-based pricing.** LLM APIs charge per token — both input tokens (your prompt) and output tokens (the model's response). This means every token in the context window has a direct cost. Optimising prompt length, managing conversation history, and choosing the right model size for each task are practical economic decisions, not just technical ones.

**Consuming APIs with Python.** The `requests` library is the standard way to make HTTP calls in Python. For LLM APIs specifically, provider SDKs (such as the `openai` or `anthropic` Python packages) wrap the HTTP calls with convenience methods, type safety, and error handling. Understanding both the raw HTTP layer and the SDK layer is important — the SDK abstracts the HTTP details, but when things go wrong, you need to understand what is happening underneath.

**Code walkthrough:**

```python
# Step 1: Making a basic LLM API call with the Anthropic SDK
# The SDK wraps HTTP calls with type safety and error handling
from anthropic import Anthropic
import time

client = Anthropic()  # reads ANTHROPIC_API_KEY from environment

# Step 2: The messages format — system prompt + conversation history
# Each API call is STATELESS — the model has no memory between calls
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=300,
    system="You are a helpful insurance claims assistant.",
    messages=[
        {"role": "user", "content": "What documents do I need to file a car insurance claim?"}
    ]
)

print(response.content[0].text)

# Step 3: Monitor token usage — this directly determines cost
print(f"Input tokens: {response.usage.input_tokens}")
print(f"Output tokens: {response.usage.output_tokens}")

# Step 4: Error handling is essential for production applications
# Rate limits, timeouts, and API errors WILL happen
from anthropic import RateLimitError, APITimeoutError

def call_with_retry(messages, max_retries=3):
    """Why retry logic matters: LLM APIs have rate limits and transient errors.
    Without retry logic, your application fails under normal operating conditions."""
    for attempt in range(max_retries):
        try:
            return client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=300,
                messages=messages
            )
        except RateLimitError:
            wait_time = 2 ** attempt  # Exponential backoff
            print(f"Rate limited. Waiting {wait_time}s before retry...")
            time.sleep(wait_time)
        except APITimeoutError:
            print(f"Timeout on attempt {attempt + 1}")
    raise Exception("Max retries exceeded")
```

**Why it matters:** APIs are the primary interface between your application and the LLM. Understanding how they work, what they cost, and how to use them efficiently is not optional — it is the mechanical foundation of everything you build as an AI Engineer.

**Key things to understand:**
- REST APIs use HTTP methods and JSON — learn the basics before using any LLM SDK.
- LLM API calls are stateless — the model has no memory between calls unless you explicitly send conversation history.
- Token usage determines cost — monitor and optimise both input and output tokens.
- Error handling (rate limits, timeouts, API errors) must be built into any production application.

**Common pitfalls:**
- Not handling API rate limits, causing applications to fail under load.
- Sending unnecessary context (full conversation history, redundant instructions) in every API call, inflating costs.
- Using raw HTTP calls when an SDK would be more reliable, or using only the SDK without understanding the underlying HTTP behaviour.

---

## Python for AI Engineers

Python is the dominant language for AI engineering. Not because it is the fastest or most elegant language, but because the entire ecosystem — LLM SDKs, ML frameworks, data processing tools, vector database clients — is built around it. As an AI Engineer, Python is your primary tool for interacting with LLMs, processing data, and building applications.

You do not need to be a Python expert at this level. You need to be comfortable with the fundamentals: variables, functions, data structures (lists, dictionaries, sets), control flow, file I/O, and working with external packages. The rest you will learn as you build.

**Key libraries for AI Engineers.** The `requests` library handles HTTP calls. The `anthropic` and `openai` packages are the official SDKs for the two most widely used LLM APIs. `json` handles structured data. `os` and `dotenv` manage environment variables (including API keys). `tiktoken` estimates token counts. As you progress, you will add `numpy`, `pandas`, `langchain`, and `langgraph`.

**Virtual environments** are essential. AI projects often require specific package versions. Using `venv` or `conda` prevents conflicts between projects and ensures reproducibility. Never install AI packages into your system Python.

**Code walkthrough:**

```python
# Step 1: Project setup — the starting point for every AI project
# Virtual environment + dependencies + environment variables
import os
from dotenv import load_dotenv

# Step 2: Load API keys from .env file — NEVER hardcode secrets
# Create a .env file: ANTHROPIC_API_KEY=sk-ant-...
load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    raise ValueError("ANTHROPIC_API_KEY not set. Create a .env file.")

# Step 3: Working with JSON — the data format for all LLM APIs
import json

# LLM API requests and responses are JSON
claim_data = {
    "claim_id": "CLM-2025-001",
    "type": "home",
    "description": "Water damage from burst pipe in kitchen",
    "amount": 3200.00,
    "filed_date": "2025-03-15"
}

# Serialise to JSON string (what gets sent over the wire)
json_string = json.dumps(claim_data, indent=2)
print(json_string)

# Parse JSON string back to Python dict (what you work with in code)
parsed = json.loads(json_string)
print(f"Claim amount: ${parsed['amount']:.2f}")

# Step 4: Functions for reusable LLM interactions
def summarise_text(text: str, max_sentences: int = 3) -> str:
    """Why wrap LLM calls in functions? Reusability, testability,
    and separation of prompt logic from application logic."""
    from anthropic import Anthropic
    client = Anthropic()
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=200,
        messages=[{
            "role": "user",
            "content": f"Summarise the following text in {max_sentences} sentences:\n\n{text}"
        }]
    )
    return response.content[0].text

# Step 5: Error handling — production code must handle failures gracefully
def safe_api_call(prompt: str) -> str | None:
    """Why handle errors? API calls fail: network issues, rate limits,
    invalid requests. Without handling, your application crashes."""
    from anthropic import Anthropic, APIError, RateLimitError
    try:
        client = Anthropic()
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=200,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
    except RateLimitError:
        print("Rate limited — wait and retry")
        return None
    except APIError as e:
        print(f"API error: {e}")
        return None
```

**Why it matters:** Python is not optional for AI Engineers — it is the primary tool. Every LLM API call, every data processing step, every integration you build will be in Python. Investing in solid Python fundamentals pays dividends at every subsequent level.

**Key things to understand:**
- Use virtual environments for every project — dependency isolation prevents painful debugging later.
- Never hardcode API keys — use environment variables loaded from `.env` files.
- JSON is the universal data format for LLM APIs — be fluent in serialisation and parsing.
- Wrap LLM calls in functions with clear inputs and outputs — this makes code testable and reusable.
- Error handling is not optional — API calls fail under normal conditions and your code must handle it.

**Common pitfalls:**
- Installing packages globally instead of in a virtual environment, causing version conflicts across projects.
- Hardcoding API keys in source files and accidentally committing them to version control.
- Not handling API errors, causing applications to crash on the first rate limit or timeout.
- Writing monolithic scripts instead of modular functions — this makes code harder to test and maintain.

---

## Introduction to Prompt Engineering

Prompt engineering is the practice of designing input text that elicits the desired output from a language model. For AI Engineers, it is the first and most accessible tool for controlling LLM behaviour — and it is often sufficient for a wide range of tasks before reaching for more complex solutions.

**Zero-shot prompting** is the simplest technique: you describe the task directly without providing any examples. "Summarise this document in three bullet points" is a zero-shot prompt. It works well for straightforward tasks where the model's pre-training provides enough context to understand what is expected.

**Few-shot prompting** provides two to five worked examples before the actual request. The examples establish the expected input-output format, style, and level of detail. Few-shot prompting is remarkably effective at steering model output — often more effective than verbose instructions — because the model infers the pattern from the examples.

**Role prompting** frames the model as a particular persona: "You are a senior insurance claims analyst." This influences the model's vocabulary, level of detail, and perspective. Role prompting is a simple but effective way to tailor output for specific audiences or domains.

**System prompts** are a special message type in LLM APIs that sets the model's overall behaviour, persona, and constraints for an entire conversation. Unlike user messages, system prompts persist across all turns and establish the ground rules. They are where you place role definitions, output format requirements, and safety instructions.

**Structured output.** Asking the model to respond in a specific format — JSON, a numbered list, a markdown table — reduces ambiguity and makes output easier to parse programmatically. Being explicit about the desired format ("Respond with a JSON object containing the keys: summary, confidence, sources") produces more consistent results than leaving the format open.

**Code walkthrough:**

```python
# Step 1: Zero-shot prompting — the simplest technique
# Just describe the task directly, no examples needed
from anthropic import Anthropic

client = Anthropic()

# Zero-shot: direct instruction, no examples
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=200,
    messages=[{"role": "user", "content": "Summarise the key benefits of home insurance in three bullet points."}]
)
print(response.content[0].text)

# Step 2: Few-shot prompting — provide examples to set the pattern
# The model infers format, style, and level of detail from examples
few_shot_prompt = """Classify the following customer messages as 'complaint', 'question', or 'praise'.

Message: "Your website has been down for 3 hours and I can't access my policy!"
Category: complaint

Message: "The claims team was incredibly helpful and resolved everything in one call."
Category: praise

Message: "Can I add my teenage daughter to my car insurance policy?"
Category: question

Message: "I've been on hold for 45 minutes trying to change my address."
Category:"""

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=50,
    messages=[{"role": "user", "content": few_shot_prompt}]
)
print(f"Classification: {response.content[0].text.strip()}")

# Step 3: System prompt — sets behaviour for the entire conversation
# Use system prompts for persona, constraints, and output format rules
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=300,
    system="You are a senior insurance claims analyst. Always respond with JSON. Never include information not supported by the claim description.",
    messages=[{"role": "user", "content": """Analyse this claim description and respond with a JSON object:
{"severity": "low|medium|high", "category": "auto|home|health", "summary": "one sentence"}

Claim: "Water pipe burst in kitchen, flooding ground floor. Hardwood floors damaged, appliances ruined."
"""}]
)
print(response.content[0].text)

# Step 4: Structured output with explicit schema — for programmatic parsing
import json

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=300,
    system="Respond with valid JSON only. No markdown, no explanation.",
    messages=[{"role": "user", "content": """Extract the following fields from this text:
{"name": "string", "date": "ISO format", "amount": "number"}

Text: "John Smith filed a claim on March 15, 2025 for $4,500 in water damage."
"""}]
)

# Parse the structured output programmatically
try:
    extracted = json.loads(response.content[0].text)
    print(f"Name: {extracted['name']}, Amount: ${extracted['amount']}")
except json.JSONDecodeError:
    print("Model did not return valid JSON — retry or adjust prompt")
```

**Why it matters:** The prompt is your primary control surface for LLM behaviour. Mastering basic prompt engineering techniques — zero-shot, few-shot, system prompts, role prompting, and structured output — gives you the tools to solve a wide range of problems before reaching for more complex approaches like RAG or fine-tuning.

**Key things to understand:**
- Start simple (zero-shot) and add complexity (few-shot, structured output) only when needed.
- Few-shot examples influence the model's behaviour more strongly than many engineers expect — the format and style of examples are often replicated closely.
- System prompts set the overall behaviour for a conversation — use them for persona, constraints, and format rules.
- Positive instructions ("respond only with...") are more reliable than negative ones ("do not include...").
- Prompts are not deterministic — the same prompt can produce different output across runs due to sampling.

**Common pitfalls:**
- Over-engineering prompts for simple tasks where a direct instruction would suffice.
- Not testing prompts across a range of inputs — a prompt that works for one example may fail on edge cases.
- Treating prompt engineering as a one-time task rather than an iterative process that requires testing and refinement.
- Mixing instructions and data in a prompt without clear delimiters — the model may confuse data for instructions.

---

## Understanding Modern LLM APIs

AI Engineers interact with multiple LLM providers, each with distinct capabilities, pricing, and API designs. Understanding the landscape of modern LLM APIs — and how to evaluate them — is a practical skill that directly affects the systems you build.

**Major providers (2025-2026).** Anthropic's Claude models (Claude Sonnet, Claude Opus, Claude Haiku) are accessed through the Anthropic API. OpenAI's GPT models are accessed through the OpenAI API or Azure OpenAI Service. Google's Gemini models are accessed through the Gemini API or Vertex AI. Each provider offers models at different capability and price points — choosing the right model for each task is an engineering decision, not a default.

**Model selection principles.** Not every task needs the most powerful (and expensive) model. A simple classification or extraction task may work perfectly with a smaller, faster, cheaper model. A complex reasoning task may require a frontier model. The right approach is to start with the smallest model that could work, evaluate quality, and scale up only if needed.

**Streaming responses.** For user-facing applications, streaming returns tokens as they are generated rather than waiting for the full response. This dramatically reduces perceived latency — the user sees output appearing immediately rather than waiting seconds for the complete response.

**Multi-turn conversations.** LLM APIs are stateless — each call is independent. To maintain a conversation, you must send the full conversation history with each request. This means every previous user message and assistant response is included in the context window, consuming tokens and cost with each turn.

**Code walkthrough:**

```python
# Step 1: Comparing LLM API patterns — Anthropic vs OpenAI
# Both follow REST patterns but have different SDK interfaces

# Anthropic Claude
from anthropic import Anthropic

anthropic_client = Anthropic()  # reads ANTHROPIC_API_KEY from env

response = anthropic_client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=200,
    system="You are a helpful assistant.",
    messages=[
        {"role": "user", "content": "What is home insurance?"}
    ]
)
print(f"Claude: {response.content[0].text}")
print(f"Tokens used: {response.usage.input_tokens} in, {response.usage.output_tokens} out")

# OpenAI GPT
from openai import OpenAI

openai_client = OpenAI()  # reads OPENAI_API_KEY from env

response = openai_client.chat.completions.create(
    model="gpt-4o",
    max_tokens=200,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is home insurance?"}
    ]
)
print(f"GPT: {response.choices[0].message.content}")
print(f"Tokens: {response.usage.prompt_tokens} in, {response.usage.completion_tokens} out")

# Step 2: Multi-turn conversation — you must manage history yourself
conversation_history = []

def chat(user_message: str) -> str:
    """Why manage history? LLM APIs are stateless — each call is independent.
    Without sending history, the model treats every message as a new conversation."""
    conversation_history.append({"role": "user", "content": user_message})
    response = anthropic_client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=300,
        system="You are an insurance advisor. Be concise.",
        messages=conversation_history
    )
    assistant_message = response.content[0].text
    conversation_history.append({"role": "assistant", "content": assistant_message})
    return assistant_message

# Each call includes full history — tokens grow with each turn
print(chat("I need home insurance. What should I consider?"))
print(chat("What about flood coverage specifically?"))
# Second call sends BOTH turns — the model sees the full conversation

# Step 3: Streaming — for responsive user-facing applications
with anthropic_client.messages.stream(
    model="claude-sonnet-4-20250514",
    max_tokens=200,
    messages=[{"role": "user", "content": "Explain deductibles in simple terms."}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)  # Tokens appear as generated
print()  # Newline after stream completes
```

**Why it matters:** Choosing the right LLM provider and model for each task is a core AI Engineering skill. Understanding how different APIs work, how to manage conversations, and how to use streaming allows you to build responsive, cost-effective applications. Engineers who default to the most expensive model for every task waste money; engineers who choose the wrong model for a complex task deliver poor results.

**Key things to understand:**
- Different providers offer models at different capability/cost trade-offs — evaluate before committing.
- LLM APIs are stateless — multi-turn conversations require sending full history with each request.
- Streaming reduces perceived latency for user-facing applications and should be used by default in UIs.
- Token usage grows with each conversation turn — monitor and manage conversation length.
- API keys must be managed securely — use environment variables, never hardcode.

**Common pitfalls:**
- Defaulting to the most expensive model without testing whether a smaller model would suffice.
- Not implementing streaming in user-facing applications, creating poor user experience with long wait times.
- Forgetting that conversation history grows with each turn, eventually consuming the entire context window.
- Using a single provider without evaluating alternatives — provider capabilities change rapidly.
