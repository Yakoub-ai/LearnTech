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

## Introduction to Prompt Engineering

Prompt engineering is the practice of designing input text that elicits the desired output from a language model. For AI Engineers, it is the first and most accessible tool for controlling LLM behaviour — and it is often sufficient for a wide range of tasks before reaching for more complex solutions.

**Zero-shot prompting** is the simplest technique: you describe the task directly without providing any examples. "Summarise this document in three bullet points" is a zero-shot prompt. It works well for straightforward tasks where the model's pre-training provides enough context to understand what is expected.

**Few-shot prompting** provides two to five worked examples before the actual request. The examples establish the expected input-output format, style, and level of detail. Few-shot prompting is remarkably effective at steering model output — often more effective than verbose instructions — because the model infers the pattern from the examples.

**Role prompting** frames the model as a particular persona: "You are a senior insurance claims analyst." This influences the model's vocabulary, level of detail, and perspective. Role prompting is a simple but effective way to tailor output for specific audiences or domains.

**Structured output.** Asking the model to respond in a specific format — JSON, a numbered list, a markdown table — reduces ambiguity and makes output easier to parse programmatically. Being explicit about the desired format ("Respond with a JSON object containing the keys: summary, confidence, sources") produces more consistent results than leaving the format open.

**Code walkthrough:**

```python
# Step 1: Zero-shot prompting — the simplest technique
# Just describe the task directly, no examples needed
from anthropic import Anthropic

client = Anthropic()

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

# Step 3: Role prompting + structured output — combine for production use
# Role sets the persona; structured output makes parsing reliable
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=300,
    system="You are a senior insurance claims analyst. Always respond with JSON.",
    messages=[{"role": "user", "content": """Analyse this claim description and respond with a JSON object:
{"severity": "low|medium|high", "category": "auto|home|health", "summary": "one sentence"}

Claim: "Water pipe burst in kitchen, flooding ground floor. Hardwood floors damaged, appliances ruined."
"""}]
)
print(response.content[0].text)
```

**Why it matters:** The prompt is your primary control surface for LLM behaviour. Mastering basic prompt engineering techniques — zero-shot, few-shot, role prompting, and structured output — gives you the tools to solve a wide range of problems before reaching for more complex approaches like RAG or fine-tuning.

**Key things to understand:**
- Start simple (zero-shot) and add complexity (few-shot, structured output) only when needed.
- Few-shot examples influence the model's behaviour more strongly than many engineers expect — the format and style of examples are often replicated closely.
- Positive instructions ("respond only with...") are more reliable than negative ones ("do not include...").
- Prompts are not deterministic — the same prompt can produce different output across runs due to sampling.

**Common pitfalls:**
- Over-engineering prompts for simple tasks where a direct instruction would suffice.
- Not testing prompts across a range of inputs — a prompt that works for one example may fail on edge cases.
- Treating prompt engineering as a one-time task rather than an iterative process that requires testing and refinement.
