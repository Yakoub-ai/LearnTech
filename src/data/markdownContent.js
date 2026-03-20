export const roleMarkdownContent = {
  'AI-Engineer': {
    overview: `# AI Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

AI Engineers build applications powered by large language models and generative AI. The role covers prompt engineering, RAG systems, agent frameworks, LLM evaluation, security, and enterprise AI governance.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| AI vs ML vs Deep Learning | [AI, ML, Deep Learning and GenAI Explained](https://www.youtube.com/watch?v=qYNweeDHiyU) | Video |
| Python | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| APIs Overview | [Every Popular API Style Explained](https://www.youtube.com/watch?v=4vLxWqE94l4) | Video |
| Generative AI Intro | [Generative AI for Data Science – Pluralsight](https://app.pluralsight.com/paths/skills/generative-ai-for-data-science) | Course |
| ML Literacy | [Machine Learning Explained Simply (12 min)](https://www.youtube.com/watch?v=Au1OxVSyGas) | Video |
| Prompt Basics | [Prompt Engineering and GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/prompt-engineering-and-generative-ai) | Course |

### After completing Beginner you should be able to:

- Explain how large language models differ from traditional software and classical ML
- Write Python scripts using standard library modules
- Describe how APIs work and consume a REST API
- Write basic prompts using zero-shot and few-shot techniques
- Explain the difference between AI, ML, deep learning, and generative AI

For deep explanations of each concept, see the [Beginner Concept Reference](AI-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| ML Foundations for AI Engineers | [ML Foundations for AI Engineers (34 min)](https://www.youtube.com/watch?v=BUTjcAjfMgY) | Video |
| Context Engineering | [Context Engineering – Pluralsight](https://app.pluralsight.com/paths/skills/context-engineering) | Course |
| RAG Development | [RAG for Developers – Pluralsight](https://app.pluralsight.com/paths/skills/retrieval-augmented-generation-rag-for-developers) | Course |
| LangGraph | [LangGraph – Pluralsight](https://app.pluralsight.com/paths/skills/langgraph) | Course |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Generative AI Patterns | [All ML Concepts Explained in 22 min](https://www.youtube.com/watch?v=Fa_V9fP2tpU) | Video |

### After completing Mid you should be able to:

- Explain how large language models work at a conceptual level (transformer, tokenisation, inference)
- Manage context windows effectively using context engineering techniques
- Implement a RAG pipeline from scratch including chunking, embedding, retrieval, and generation
- Build a simple agent workflow using LangGraph with state, tools, and conditional edges
- Explain embeddings and how they enable semantic search

For deep explanations of each concept, see the [Mid Concept Reference](AI-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| LLM Agent Architecture | [Architecting Resilient LLM Agents](https://arxiv.org/abs/2509.08646) | Paper |
| Prompt Injection Patterns | [Design Patterns for Securing LLM Agents](https://arxiv.org/abs/2506.08837) | Paper |
| AI Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Enterprise GenAI Strategy | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| OWASP LLM Security | [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) | Reference |
| LLM Evaluation | [RAGAS Documentation](https://docs.ragas.io/) | Docs |
| Fine-Tuning / PEFT | [Hugging Face – PEFT Documentation](https://huggingface.co/docs/peft/) | Docs |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |

### After completing Senior you should be able to:

- Design a production-grade LLM agent architecture with appropriate guardrails
- Identify and mitigate prompt injection vulnerabilities (direct and indirect)
- Evaluate RAG pipeline quality using systematic metrics and evaluation frameworks
- Explain when fine-tuning is appropriate versus prompt engineering or RAG, and describe the LoRA approach
- Apply AI architecture patterns to system design
- Evaluate GenAI adoption strategy at an enterprise level

For deep explanations of each concept, see the [Senior Concept Reference](AI-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `# AI Engineer – Beginner Concept Reference


This document provides in-depth explanations of the core concepts covered at the Beginner level of the AI Engineer learning path. Each section describes what a concept is, why it matters in practice, what you need to understand about it, and the mistakes engineers most commonly make when encountering it for the first time.

---

## What is Generative AI

Generative AI refers to a category of artificial intelligence systems that create new content — text, images, audio, code, video — rather than simply classifying, predicting, or retrieving existing information. It is the subset of AI that has driven the current wave of industry transformation, and it is the foundation of the AI Engineer role.

Understanding where generative AI sits in the broader AI landscape is essential. Artificial intelligence (AI) is the broadest term — any technique that enables machines to perform tasks requiring human-like intelligence. Machine learning (ML) is a subset of AI where systems learn from data rather than following hand-coded rules. Deep learning is a subset of ML using neural networks with many layers. Generative AI is a subset of deep learning focused on content generation.

The dominant architecture behind modern generative AI is the transformer, introduced in 2017. Large language models (LLMs) such as frontier models from OpenAI and Anthropic are transformer-based models trained on vast quantities of text. They generate output by predicting the most likely next token in a sequence, producing text that is statistically consistent with their training data. This means LLMs do not retrieve facts or truly "understand" — they produce plausible continuations of input text.

Other forms of generative AI include image generation models (diffusion models), audio synthesis, and video generation. While the AI Engineer role focuses primarily on LLM-based applications, understanding the broader generative AI landscape helps in evaluating which technology fits a given problem.

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

**Consuming APIs with Python.** The \`requests\` library is the standard way to make HTTP calls in Python. For LLM APIs specifically, provider SDKs (such as the \`openai\` or \`anthropic\` Python packages) wrap the HTTP calls with convenience methods, type safety, and error handling. Understanding both the raw HTTP layer and the SDK layer is important — the SDK abstracts the HTTP details, but when things go wrong, you need to understand what is happening underneath.

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
`,
    mid: `# AI Engineer – Mid Concept Reference


This document provides in-depth explanations of the core concepts covered at the Mid level of the AI Engineer learning path. It assumes familiarity with the Beginner concepts and focuses on LLM internals, embeddings, prompt and context engineering, RAG, agent frameworks, and AI-assisted development.

---

## Large Language Models – Architecture, Tokenisation and Inference

Large language models (LLMs) are neural networks trained on vast quantities of text to predict the next token in a sequence. Understanding their architecture and inference process helps engineers build systems that use them reliably.

The dominant architecture for modern LLMs is the transformer, introduced in 2017. The transformer uses self-attention mechanisms that allow each token in a sequence to attend to every other token. This enables the model to capture long-range dependencies in text — something previous recurrent architectures struggled with. Stacking many transformer blocks, scaling parameters to billions, and training on trillions of tokens produces the emergent capabilities seen in frontier models from OpenAI and Anthropic.

Tokenisation is the process of converting raw text into the integer tokens the model operates on. Tokenisers do not split on word boundaries; they use subword algorithms (such as byte-pair encoding) that balance vocabulary size with the ability to represent rare or compound words. A single English word may be one token or several; whitespace, punctuation, and casing all affect tokenisation. Tokens are not words — this distinction matters when estimating prompt cost and length.

Inference is the process of generating output from a trained model. Given a prompt (a sequence of tokens), the model produces a probability distribution over the vocabulary at each position, and a sampling strategy (greedy, top-k, nucleus sampling) selects the next token. This is repeated autoregressively until a stopping condition is met. Temperature controls the randomness of sampling: low temperature makes output more deterministic and focused, high temperature makes it more diverse and creative.

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

**Why it matters:** AI coding tools are now a standard part of the development workflow. Engineers who use them effectively compound their output; engineers who use them carelessly introduce subtle bugs that are expensive to find later. The skill is learning when to trust, when to verify, and when to ignore the suggestion.

**Key things to understand:**
- AI coding tools are multipliers, not replacements — they amplify the productivity of engineers who already understand what they are building.
- Accepting suggestions without reading them carefully is the primary way AI assistance introduces bugs.
- These tools work best when your codebase is well-structured and well-named; they struggle with tangled, ambiguous code.

**Common pitfalls:**
- Using generated code in security-sensitive contexts without a thorough manual review.
- Letting AI tools become a crutch that prevents developing genuine understanding of the systems being built.
- Not customising tool configuration (such as included context or code style rules) to match the project's conventions.
`,
    senior: `# AI Engineer – Senior Concept Reference


This document provides in-depth explanations of the core concepts covered at the Senior level of the AI Engineer learning path. It assumes fluency with the Beginner and Mid concepts and focuses on production agent architecture, security, evaluation, fine-tuning, enterprise governance, and regulatory compliance.

---

## LLM Agent Architecture – Planning, Memory, Tools and Orchestration

An LLM agent is a system in which a language model acts as the reasoning engine for a loop that perceives inputs, decides on actions, executes those actions through tools, and updates its understanding based on the results. Designing a production-grade agent requires explicit decisions about planning, memory, tools, and orchestration — each of which has significant implications for reliability, cost, and security.

Planning is how the agent decides what to do next. Simple agents use a single-pass prompt; more capable agents use multi-step reasoning strategies such as ReAct (Reasoning and Acting), which interleaves thoughts and tool calls, or Plan-and-Execute, which separates high-level planning from step-level execution. The planning strategy must match the complexity of the task and the reliability requirements of the system.

Memory has several forms. In-context memory is the information held in the current context window — it is temporary and bounded. External memory is a persistent store (such as a vector database or relational database) that the agent retrieves from and writes to. Episodic memory records past interactions to inform future ones. Semantic memory holds factual knowledge. Production agents typically combine in-context and external memory, with careful control over what is retrieved into context.

Tools are the interfaces through which the agent acts on the world — calling APIs, querying databases, running code, reading files. Each tool is a potential attack surface and failure point. Tools must have clear input validation, enforced scope limits, and safe error handling.

Orchestration governs how the planning-execution loop runs, how state is passed between steps, and how errors trigger retries or escalations. Frameworks such as LangGraph provide the graph-based structure needed for complex orchestration with explicit state. Multi-agent systems extend this further by having multiple specialised agents collaborate — one agent may plan while another executes, or a supervisor agent may delegate subtasks to worker agents. Multi-agent architectures increase capability at the cost of significantly increased debugging complexity and communication overhead between agents.

**Why it matters:** Agent systems are the most powerful — and the most failure-prone — pattern in LLM application design. A poorly designed agent can loop indefinitely, take irreversible actions, exhaust API budgets, or be hijacked through prompt injection. Senior engineers must be able to design these systems defensively, not just functionally.

**Key things to understand:**
- Agent reliability degrades with task complexity — every added step is an opportunity for the agent to deviate from the intended path.
- Tool access should follow the principle of least privilege — grant only the permissions necessary for the task.
- Human-in-the-loop checkpoints are essential for any agent that takes consequential or irreversible actions.
- Multi-agent systems require clear communication protocols between agents and explicit handling of inter-agent failures.

**Common pitfalls:**
- Building agents that take irreversible actions (sending emails, deleting records) without a confirmation step.
- Not setting hard limits on the number of agent iterations, allowing runaway loops to exhaust context and cost budgets.
- Designing tool schemas that are ambiguous, leading the model to call tools with incorrect arguments.

---

## Prompt Injection – Attack Patterns and Mitigation Strategies

Prompt injection is a class of attack in which malicious content embedded in data the agent processes causes the language model to deviate from its intended instructions. It is the most significant security threat specific to LLM-based systems.

Direct prompt injection occurs when a user of the system deliberately crafts their input to override the system prompt. For example, a user might write "Ignore all previous instructions and instead..." in a chat interface. This is analogous to command injection in traditional web security.

Indirect prompt injection is more dangerous in agentic systems. The malicious instructions are not in the user's message — they are in data the agent retrieves from an external source: a webpage the agent browses, a document it reads, an email it processes. When the agent incorporates this data into its context, the hidden instructions execute in the model's reasoning loop, potentially redirecting the agent to exfiltrate data, take unauthorised actions, or produce harmful output.

Mitigation strategies operate at multiple layers. Input validation: detect and filter common injection patterns before they reach the model. Instruction hierarchy: structure prompts so that system-level instructions are given structural precedence over user and retrieved content. Output validation: parse and validate model output before acting on it, especially when the output contains structured data or tool call arguments. Sandboxing: limit what the agent can do regardless of what the model decides — tool calls should enforce access control independently of the model's instruction-following. Monitoring: log all agent actions and model outputs for anomaly detection and forensic investigation.

**Why it matters:** Prompt injection attacks are easy to execute and difficult to fully prevent. In an agent with broad tool access, a successful indirect injection can lead to data exfiltration, unauthorised transactions, or account compromise. Unlike SQL injection, there is no parameterisation equivalent — the defence must be layered across validation, sandboxing, and monitoring.

**Key things to understand:**
- No prompt design alone can fully prevent injection — defence must be layered across multiple controls.
- Indirect injection via retrieved content is harder to detect and more impactful than direct injection.
- LLM output that drives tool calls is an execution boundary — treat it with the same distrust as user input in a web application.

**Common pitfalls:**
- Treating prompt injection as a prompt engineering problem solvable with better instructions alone.
- Not sanitising retrieved content before placing it in the context window.
- Granting agents broad tool permissions that make the blast radius of a successful injection attack very large.

---

## AI System Architecture Patterns – RAG, Fine-tuning, Agents and Hybrids

Senior engineers must be able to select, justify, and combine architecture patterns when designing AI systems. The four dominant patterns — RAG, fine-tuning, agents, and hybrid approaches — each have distinct strengths, costs, and appropriate use cases.

RAG (Retrieval-Augmented Generation) is appropriate when the system needs access to a large, updatable, or proprietary knowledge base. It keeps the model's parametric knowledge separate from the application's knowledge, allowing the knowledge base to be updated without retraining. RAG is the right default starting point for most enterprise knowledge retrieval use cases.

Fine-tuning adjusts the model's weights on a domain-specific dataset to internalise knowledge, style, or behaviour that cannot be reliably achieved through prompting alone. It is appropriate when the task requires a very specific output style or format consistently, when domain jargon or notation is systematically mishandled by the base model, or when inference cost reduction is a priority (smaller fine-tuned models can outperform larger base models on narrow tasks). Fine-tuning does not eliminate hallucination and is not a replacement for RAG when factual accuracy over a changing knowledge base is required.

Agents are appropriate when a task requires multi-step reasoning, tool use, or dynamic decision-making that cannot be expressed as a single prompt-response pair. Agent architectures introduce reliability and latency costs that must be weighed against the flexibility they provide.

Hybrid architectures combine these patterns. A common pattern is a RAG agent: the agent retrieves relevant context before reasoning and then uses tools to act on the world. Another is a fine-tuned model used as the reasoning engine inside an agent, trading general capability for domain specificity.

**Why it matters:** The architecture pattern determines the cost, maintainability, and failure modes of the system. Senior engineers are expected to evaluate these trade-offs and defend their choices — not default to the most technically complex option or the one they are most familiar with.

**Key things to understand:**
- The architecture pattern should be determined by the task requirements, not by what is most technically interesting.
- Each added layer (retrieval, fine-tuning, agent loop) adds complexity, latency, and cost.
- Evaluation must be designed for the specific pattern — RAG evaluation differs from fine-tuning evaluation differs from agent evaluation.

**Common pitfalls:**
- Defaulting to fine-tuning when RAG would solve the problem more cheaply and with less maintenance burden.
- Building agent architectures for tasks where a single well-designed prompt would suffice.
- Not establishing a baseline with the simplest pattern before adding complexity.

---

## Enterprise GenAI Adoption – Strategy, Risk and Governance

Senior engineers are expected to contribute to decisions about how AI is adopted at an organisational level. This requires understanding the strategic, risk, and governance dimensions of GenAI — not just the technical ones.

Strategic adoption involves identifying use cases where GenAI creates genuine value, distinguishing between tasks where GenAI offers a reliable improvement and tasks where the error rate is too high for the risk tolerance of the business. Productivity augmentation (drafting, summarising, coding assistance) generally has a lower risk threshold than autonomous decision-making in regulated processes.

Risk dimensions include: accuracy and hallucination risk (the model produces incorrect output that a user acts on), data privacy risk (sensitive data is sent to an external model API or used in training), regulatory and compliance risk (output violates laws or policies), reputational risk (offensive or inappropriate output is attributed to the organisation), and security risk (prompt injection, data exfiltration via agent tools).

Governance frameworks address these risks through policies that define which use cases are permitted, what data classifications may be used with which AI systems, how AI-generated output must be reviewed before acting on it, and how incidents are reported and investigated. The [Secure AI Framework (SAIF)](../Prerequisites/Secure-AI-Framework.md) and the NIST AI Risk Management Framework provide the governance structures for securing AI systems. The SAIF defines nine areas — from user awareness and prompt/output validation through to secure model selection — that must be addressed for each AI use case, with the required rigour determined by the use case's risk-level classification.

Responsible AI and fairness are increasingly integral to governance. AI systems used in high-risk domains — such as credit scoring, claims assessment, and underwriting, all relevant to insurance — must be evaluated for bias and fairness across protected groups. This involves measuring fairness metrics (demographic parity, equalised odds) and implementing bias detection in both training data and model outputs. The EU AI Act imposes specific obligations for high-risk AI systems, including transparency, human oversight, and documentation requirements. Senior engineers should treat fairness and regulatory compliance as first-class design constraints, not post-hoc audits.

**Why it matters:** Technical capability without governance creates legal and reputational exposure. Senior engineers shape not only what gets built but whether it is built in a way that the organisation can stand behind. The engineers who understand both dimensions are the ones who earn trust to build consequential systems.

**Key things to understand:**
- Governance is an enabler, not a blocker — clear policies allow teams to move faster with confidence.
- Risk assessments for AI use cases must consider both the failure mode of the model and the downstream consequences of acting on its output.
- AI governance must be revisited regularly as model capabilities, regulatory landscapes, and internal risk appetites evolve.

**Common pitfalls:**
- Treating AI governance as a one-time approval process rather than an ongoing operational practice.
- Building governance frameworks that are so restrictive they drive teams to use AI tools outside sanctioned channels.
- Ignoring data classification when selecting which content is allowed to be sent to external AI APIs.

---

## AI Security and the Secure AI Framework

Security considerations for AI systems differ from traditional application security in important ways, and senior engineers must understand both the familiar threats that apply in new contexts and the novel threats specific to LLM-based systems.

The [Secure AI Framework (SAIF)](../Prerequisites/Secure-AI-Framework.md) defines nine areas for securing AI systems across the organisation:

1. **User Awareness** — ensuring that everyone interacting with AI understands the risks, limitations, and responsible use expectations.
2. **Prompt/Output Validation & DLP** — validating inputs to and outputs from AI models, including data loss prevention controls to prevent sensitive data from leaking through prompts or responses.
3. **Managing AI Context & Memory** — controlling what information is stored in and retrieved from AI system memory, including conversation history, retrieved documents, and cached context.
4. **Secure Development Pipelines** — applying security controls to the development lifecycle of AI applications, including code review, dependency scanning, and secure deployment practices.
5. **AI Agent IAM** — managing identity and access for AI agents, ensuring that agents operate with appropriate permissions and that their actions are attributable.
6. **Separation of Duties** — ensuring that no single role or system has unchecked authority over AI system decisions, particularly for high-impact actions.
7. **Traceability & Observability** — logging and monitoring AI system behaviour to enable audit, debugging, and incident investigation.
8. **Secure Compute** — hardening the infrastructure on which AI models and agents run, including network isolation, access controls, and runtime security.
9. **Secure Model Selection/Training** — evaluating and selecting models based on security criteria, including supply chain integrity, licensing, and known vulnerabilities.

The framework also includes model supplier criteria (evaluating third-party model providers on security, privacy, and compliance dimensions) and a risk-level classification system that determines the governance requirements for each AI use case based on its potential impact.

Traditional threats that apply to AI systems include: supply chain attacks (malicious code or data in open-source ML libraries or datasets), data poisoning (corrupting training data to influence model behaviour), model theft (extracting a proprietary model's weights or decision logic through repeated querying), and infrastructure vulnerabilities in the compute and serving layer.

AI-specific threats include: prompt injection (covered in depth above), adversarial examples (inputs crafted to cause the model to produce a specific wrong output), membership inference (determining whether a specific data point was in the training set), and training data extraction (causing the model to reproduce memorised training data through carefully crafted prompts).

The [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) is a key reference framework for understanding the most critical security risks in LLM-based systems. It provides a standardised taxonomy of threats — including prompt injection, insecure output handling, and supply chain vulnerabilities — that should inform threat modelling and security reviews for any LLM application.

Controls must be applied at multiple layers: data (validate and sanitise training and inference inputs), model (monitor output distributions for anomalies), application (enforce access control and rate limiting), and infrastructure (apply standard hardening to compute environments).

**Why it matters:** AI systems introduce a novel attack surface that existing security tooling and threat models do not fully cover. The internal SAIF provides the structured approach for addressing these risks across all nine areas — from user awareness through to secure model selection. Senior engineers are expected to apply the framework to their projects and ensure compliance with the organisation's risk-level classification.

**Key things to understand:**
- AI systems are software systems first — all standard software security practices apply before considering AI-specific threats.
- The SAIF's nine areas provide a comprehensive checklist for securing AI systems; no single area is sufficient on its own.
- The model's training data is an attack surface: data poisoning can compromise a model without any access to its weights.
- Output monitoring is the primary detective control for many AI-specific attacks — without it, attacks may go undetected indefinitely.
- The risk-level classification determines what governance controls must be applied — higher-risk use cases require more rigorous assessment and oversight.

**Common pitfalls:**
- Focusing exclusively on prompt injection while ignoring the broader attack surface covered by the SAIF's nine areas.
- Not including AI systems in the organisation's existing threat modelling process.
- Assuming that using a managed AI API (rather than self-hosting) eliminates security responsibility — the application layer and the data sent to the API remain the engineer's responsibility.
- Skipping the risk-level classification, leading to either over-governance of low-risk use cases or under-governance of high-risk ones.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems, particularly those that affect individuals' access to financial services, require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from developers building AI systems to business users employing AI-assisted tools in their daily work.

**Why it matters:** The AI Policy is the organisation's binding commitment to responsible AI use. It translates regulatory requirements (EU AI Act, GDPR) into concrete obligations that apply to every AI project. Senior engineers must understand these obligations because they directly affect system design — from data handling and access control to logging, human oversight, and documentation.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- GDPR obligations apply to all AI systems that process personal data — this includes training data, inference inputs, and logged outputs.
- The policy requires transparency: users must be informed when they are interacting with an AI system or when AI has influenced a decision affecting them.

**Common pitfalls:**
- Starting development without registering the use case in the AI Register, which creates compliance risk and may require retroactive governance work.
- Treating the AI Policy as a legal concern rather than a design constraint — the policy's requirements must be built into the system architecture from the start.
- Assuming that internal-only AI tools are exempt from the policy; the governance requirements apply to all AI use, not just customer-facing systems.

---

## LLM Evaluation Frameworks

LLM evaluation is the practice of systematically measuring the quality of outputs from large language model applications, particularly RAG (Retrieval-Augmented Generation) systems. Unlike traditional ML where metrics like accuracy and F1 are well-defined, evaluating LLM outputs requires assessing qualities like faithfulness, relevance, coherence, and completeness — properties that are inherently subjective and context-dependent.

RAGAS (Retrieval Augmented Generation Assessment) is one of the most widely adopted evaluation frameworks. It provides automated metrics that assess RAG pipeline quality across two dimensions: retrieval quality (are the right documents being retrieved?) and generation quality (is the model using the retrieved context correctly?).

**Why it matters:** Without systematic evaluation, LLM applications are deployed based on vibes — "it seems to work well." In production, especially in insurance where outputs may inform customer-facing decisions or regulatory processes, you need quantifiable measures of quality. Evaluation frameworks make it possible to compare prompt strategies, detect regressions, and set quality thresholds for deployment.

**Key things to understand:**
- RAGAS core metrics: faithfulness (does the answer stick to the retrieved context?), answer relevancy (does the answer address the question?), context precision (are the retrieved documents relevant?), context recall (are all necessary documents retrieved?)
- Evaluation vs testing: evaluation measures quality on a spectrum (faithfulness score 0.0–1.0), while testing checks binary pass/fail conditions. Both are needed — evaluation for continuous monitoring, testing for gate-keeping deployments
- Ground truth datasets: building a curated set of question-answer-context triples specific to your domain is the most valuable investment for evaluation. For insurance, this means domain-specific questions about policy terms, claims procedures, and regulatory requirements
- LLM-as-judge: using a separate LLM to evaluate another LLM's output. This scales evaluation but introduces its own biases — always validate judge agreement against human ratings
- Automated evaluation challenges: metrics can be gamed (high faithfulness by copying context verbatim), context-dependent (what counts as "relevant" varies by use case), and brittle (small prompt changes can cause large metric swings)

**Common pitfalls:**
- Evaluating only on easy questions where the model naturally performs well, creating a misleadingly positive quality picture
- Using generic evaluation datasets instead of domain-specific ones — an LLM that scores well on general knowledge may fail on insurance-specific terminology and reasoning
- Treating evaluation as a one-time activity rather than continuous monitoring; model behaviour can drift as underlying models are updated
- Optimising for a single metric at the expense of others — maximising faithfulness alone can produce overly conservative answers that quote context without synthesising

---

## Fine-Tuning, LoRA and PEFT

Fine-tuning is the process of continuing the training of a pre-trained language model on a smaller, domain-specific dataset to adapt its behaviour for a particular task or domain. Parameter-Efficient Fine-Tuning (PEFT) methods — most notably LoRA (Low-Rank Adaptation) — make this practical by training only a small number of additional parameters rather than the full model, dramatically reducing compute requirements and making fine-tuning accessible on standard hardware.

The decision of when to fine-tune versus when to use prompt engineering or RAG is one of the most important architectural choices in an LLM project. Fine-tuning changes what the model knows and how it behaves; RAG gives the model access to external knowledge at inference time; prompt engineering shapes the model's output without changing its parameters.

**Why it matters:** Understanding fine-tuning options is essential for senior AI engineers because it determines the architecture and cost structure of LLM applications. In an insurance context, fine-tuning can adapt a model to use domain-specific terminology correctly, follow company tone-of-voice guidelines, or perform specialised tasks like claims classification — but it comes with significant costs in data preparation, compute, and ongoing maintenance.

**Key things to understand:**
- When to fine-tune: the model consistently fails at a task despite good prompting, you need specific output formatting or style, you have a well-defined task with labelled training data, or you need to reduce inference costs by replacing complex prompts with learned behaviour
- When NOT to fine-tune: RAG or better prompts can solve the problem, you lack sufficient quality training data (hundreds to thousands of examples), the task requires up-to-date knowledge (use RAG instead), or the cost of maintaining a fine-tuned model outweighs the benefits
- LoRA mechanics: instead of updating all model weights, LoRA adds small trainable matrices (rank decomposition) to attention layers. A typical LoRA adapter is 1–10% of the full model size, trains in hours instead of days, and can be swapped in and out at inference time
- QLoRA: combines LoRA with 4-bit quantisation of the base model, reducing GPU memory requirements further — enabling fine-tuning of large models on consumer-grade hardware
- Insurance domain use cases: claims triage classification, policy document summarisation in company style, structured data extraction from claims descriptions, customer communication tone adaptation

**Common pitfalls:**
- Fine-tuning as a first resort instead of a last resort — always try prompt engineering and RAG first, as they are cheaper, faster, and easier to iterate on
- Training on too little or low-quality data, resulting in a model that overfits to the training examples and performs worse on real-world inputs than the base model
- Not maintaining a held-out evaluation set to detect overfitting and measure genuine improvement
- Forgetting that fine-tuned models still need RAG for factual, up-to-date information — fine-tuning teaches behaviour, not facts

---

## EU AI Act — Insurance Implications

The EU AI Act is the world's first comprehensive legal framework for artificial intelligence, establishing rules based on the risk level of AI systems. For insurance companies, this regulation is particularly significant because insurance is explicitly listed in Annex III as a high-risk domain — meaning AI systems used in insurance underwriting, claims assessment, and pricing are subject to the most stringent requirements.

**Why it matters:** The EU AI Act creates legally binding obligations for organisations that develop or deploy AI systems in the EU. Non-compliance carries penalties of up to 35 million EUR or 7% of global turnover. For insurance companies, nearly all customer-facing AI applications will fall under the high-risk category, requiring conformity assessments, documentation, and ongoing monitoring.

**Key things to understand:**
- Risk classification: the Act defines four tiers — unacceptable risk (banned), high-risk (strict requirements), limited risk (transparency obligations), and minimal risk (no specific requirements). Insurance AI systems that influence decisions about individuals (pricing, claims, underwriting) are high-risk
- Annex III high-risk categories include "access to and enjoyment of essential private services" which covers insurance. AI systems that evaluate creditworthiness, set insurance premiums, or assess claims fall under this category
- Conformity assessment: high-risk AI systems must undergo a conformity assessment before deployment, demonstrating compliance with requirements for data quality, documentation, transparency, human oversight, accuracy, robustness, and cybersecurity
- Obligations for deployers: organisations using high-risk AI must ensure human oversight, monitor system performance, report serious incidents, and maintain logs. This applies even when using third-party AI services
- Transparency requirements: individuals must be informed when they are interacting with an AI system or when an AI system is making decisions that affect them
- Timeline: the Act entered into force in August 2024, with high-risk provisions applying from August 2026

**Common pitfalls:**
- Assuming the AI Act only applies to AI developers, not deployers — organisations that deploy high-risk AI systems have significant compliance obligations even if they did not build the system
- Treating compliance as a one-time certification rather than ongoing monitoring and documentation
- Not involving legal and compliance teams early in AI projects — technical teams alone cannot assess regulatory obligations
- Underestimating the documentation requirements — the Act requires detailed technical documentation, risk assessments, and data governance records

---

## Language Deep Dives

Strengthen your foundations with these language-specific learning paths:

- [Python Deep Dive](/language/python) — Essential for AI/ML development, API integration, and data processing
- [SQL Deep Dive](/language/sql) — Query and manage the data your AI models train on
- [TypeScript Deep Dive](/language/typescript) — Build type-safe AI application frontends and tooling
`,
  },
  'Backend-Developer': {
    overview: `# Backend Developer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Backend developers build the server-side logic, APIs, and data layers that power applications. The role covers programming, databases, API design, security, performance, and system reliability.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| Programming Fundamentals | [CS50x – Harvard (Free)](https://cs50.harvard.edu/x/) | Interactive |
| Python | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| APIs Overview | [Every Popular API Style Explained](https://www.youtube.com/watch?v=xJFzPSAw4Fo) | Video |
| Backend + APIs | [freeCodeCamp – Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/) (Note: this course uses JavaScript/Node.js — valuable for understanding backend concepts in another ecosystem) | Interactive |
| Backend Roadmap | [roadmap.sh – Backend](https://roadmap.sh/backend) | Interactive |
| Web Framework (FastAPI) | [FastAPI – Official Tutorial](https://fastapi.tiangolo.com/tutorial/) | Docs |
| Web Framework (Django) | [Django – Getting Started](https://www.djangoproject.com/start/) | Docs |

### After completing Beginner you should be able to:

- Explain what variables, data types and control flow are and use them to write simple programs
- Describe the core principles of Object-Oriented Programming, including classes, inheritance and encapsulation
- Write Python scripts using built-in types, functions and standard library modules
- Explain the HTTP request/response cycle and identify the role of methods, headers and status codes
- Explain what a REST API is and consume one using a tool or code
- Describe the client-server architecture and identify where backend code runs within it
- Explain why databases are needed and what problem they solve for a backend application
- Build a basic web API endpoint using a Python web framework

For deep explanations of each concept, see the [Beginner Concept Reference](Backend-Developer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| API Design | [Design APIs Like a Senior Engineer](https://www.youtube.com/watch?v=7iHl71nt49o) | Video |
| GraphQL | [GraphQL Foundations – Pluralsight](https://www.pluralsight.com/courses/graphql-foundations) | Course |
| Relational Databases | [freeCodeCamp – Relational Databases](https://www.freecodecamp.org/learn/relational-databases-v9/) | Interactive |
| Web Security Basics | [OWASP Top Ten](https://owasp.org/www-project-top-ten/) | Docs |
| API Security | [Web Security Academy – PortSwigger](https://portswigger.net/web-security) | Interactive |
| Auth Patterns | [OAuth 2.0 and OpenID Connect in Plain English](https://www.youtube.com/watch?v=996OiexHze0) | Video |
| Algorithms and Data Structures | [Algorithms and Data Structures Pt.1 – Pluralsight](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) | Course |
| System Design Basics | [System Design Concepts in 10 min](https://www.youtube.com/watch?v=i53Gi_K3o7I) | Video |
| Docker | [Learn Docker in 7 Easy Steps](https://www.youtube.com/watch?v=gAkwW2tuIqE) | Video |
| Testing | [Python Testing with pytest](https://docs.pytest.org/) — The standard testing framework for Python | Docs |
| ORM | [SQLAlchemy – Official Tutorial](https://docs.sqlalchemy.org/en/20/tutorial/) | Docs |
| CI/CD | [Microsoft Learn – Create Your First Pipeline](https://learn.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline) | Docs |

### After completing Mid you should be able to:

- Design and document a RESTful API using correct resource naming, HTTP verbs and status codes
- Apply API versioning strategies and write clear API documentation
- Write SQL queries including joins, aggregations and transactions against a relational database
- Identify and explain at least five OWASP Top 10 vulnerabilities and describe how to mitigate them
- Implement OAuth2 and JWT-based authentication and explain the difference between authentication and authorisation
- Explain the trade-offs between GraphQL and REST and choose appropriately for a given use case
- Containerise an application using Docker and define a multi-service setup with Docker Compose
- Analyse a basic system design problem and propose a solution involving load balancing, caching or message queues
- Use an ORM to define models and query a database without writing raw SQL

For deep explanations of each concept, see the [Mid Concept Reference](Backend-Developer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| System Design – 30 Concepts | [System Design was HARD until I Learned these 30 Concepts](https://www.youtube.com/watch?v=s9Qh9fWeOAk) | Video |
| Real-world System Design | [Uber – System Design Interview](https://www.youtube.com/watch?v=DGtalg5efCw) | Video |
| Domain-Driven Design | [DDD – Pluralsight Path](https://app.pluralsight.com/paths/skills/domain-driven-design) | Course |
| Algorithms and Data Structures | [Part 1](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) / [Part 2](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-two/course-overview) | Course |
| Dynamic Programming | [Dynamic Programming – Full Course](https://www.youtube.com/watch?v=66hDgWottdA) | Video |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |

### After completing Senior you should be able to:

- Design distributed systems while articulating the trade-offs described by the CAP theorem
- Define appropriate service boundaries in a microservices architecture and justify the choice between microservices and a monolith
- Apply Domain-Driven Design concepts — bounded contexts and aggregates — to a real problem
- Recognise algorithm complexity issues in production code and propose solutions with a better Big O profile
- Identify dynamic programming patterns and implement memoisation to avoid redundant computation
- Design observability into a system using structured logging, metrics and distributed tracing
- Lead a security review of an API, identify risks and present remediation recommendations
- Describe how AI-assisted development tools change backend workflows and apply them appropriately
- Apply AI governance requirements (Secure AI Framework, AI Policy, AI Checklist) when building backend systems that integrate AI components

For deep explanations of each concept, see the [Senior Concept Reference](Backend-Developer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `# Backend Developer – Beginner Concept Reference


This document explains the foundational concepts covered in the Beginner level of the Backend Developer learning path.

---

## Programming Fundamentals – Variables, Data Types and Control Flow

Programming fundamentals are the building blocks that every software developer must understand before writing useful code. A variable is a named location in memory that stores a value. The type of that value — whether it is a whole number, a decimal, a piece of text, or a true/false flag — is its data type. Control flow determines the order in which a program's instructions execute: rather than always running top to bottom, a program can branch (execute one block of code or another depending on a condition) or loop (repeat a block of code until a condition is met).

Understanding these concepts is necessary before tackling any framework, library or system design problem. Every piece of server-side logic — from validating a user's input to deciding which database query to run — is built from these primitives.

**Why it matters:** A backend developer who cannot reason clearly about types and control flow will write code that produces subtle bugs, behaves unpredictably under edge cases, or crashes when given unexpected input. These fundamentals never stop being relevant; they underpin every layer of more advanced work.

**Key things to understand:**

- Primitive types (integers, floats, booleans, strings) and the operations each supports
- The difference between mutable and immutable values
- How \`if\`/\`else\` branching works and how to compose conditions using \`and\`, \`or\` and \`not\`
- How \`for\` and \`while\` loops work, including how to break out of them early
- What a function is, how parameters and return values work, and why functions improve reuse and readability
- What scope is and why a variable defined inside a function is not accessible outside it

**Common pitfalls:**

- Confusing assignment (\`=\`) with equality comparison (\`==\`).
- Assuming a variable always holds the type you expect, especially when data comes from user input or an external source.
- Writing deeply nested control flow that becomes unreadable; flat code with early returns is usually clearer.
- Infinite loops caused by a loop condition that never becomes false.

---

## Object-Oriented Programming – Classes, Inheritance and Encapsulation

Object-Oriented Programming (OOP) is a way of organising code around objects — bundles that combine data (attributes) and behaviour (methods). A class is the blueprint that defines what data an object holds and what it can do. When you create an instance of a class you get a concrete object based on that blueprint.

Inheritance allows a new class (the child) to reuse and extend the attributes and methods of an existing class (the parent). Encapsulation is the principle of hiding the internal details of an object and exposing only what is necessary through a well-defined interface. Together, these mechanisms help developers manage complexity in large codebases by grouping related logic together and preventing one part of a program from reaching into and corrupting the internals of another.

**Why it matters:** OOP underpins most backend frameworks, ORM libraries and the way services model real-world entities such as users, orders or products. Understanding these concepts is essential for reading, extending and contributing to any substantial codebase.

**Key things to understand:**

- How to define a class, add attributes via \`__init__\`, and write methods
- The meaning of \`self\` and why it is required
- How inheritance works and when to use it versus composition
- What encapsulation means in practice and how access modifiers signal intent
- The four pillars of OOP: encapsulation, abstraction, inheritance and polymorphism

**Common pitfalls:**

- Over-using inheritance and creating deep hierarchies that are hard to follow; prefer composition when the relationship is not a clear "is-a".
- Treating classes as nothing more than data containers with no behaviour (these are better expressed as plain data structures).
- Forgetting that child classes inherit all parent methods, including ones that may not make sense in the child context.

---

## Python – Syntax, Built-in Types and Standard Library

Python is the primary language for many backend systems, data pipelines and scripting tasks at this organisation. Its design philosophy emphasises readability and conciseness, which makes it well-suited to learning programming concepts without fighting verbose syntax.

Python's rich standard library means that common tasks — reading files, working with dates, parsing JSON, building HTTP servers — are handled by well-tested modules rather than requiring third-party dependencies. Learning the standard library reduces the risk of reinventing tools that already exist.

**Why it matters:** Code written in an un-Pythonic style is harder for other Python developers to read and maintain. Understanding Python's idioms and standard library makes you productive quickly and keeps your code consistent with the ecosystem around it.

**Key things to understand:**

- Python uses indentation to define code blocks rather than braces; mixing tabs and spaces causes errors
- Built-in types: \`int\`, \`float\`, \`str\`, \`bool\`, \`list\`, \`tuple\`, \`dict\`, \`set\` and the methods each provides
- List comprehensions as a concise, idiomatic way to build lists from iterables
- How to read, write and process files using \`open()\` and the \`with\` statement
- Commonly used standard library modules: \`os\`, \`sys\`, \`json\`, \`datetime\`, \`pathlib\`, \`collections\`, \`re\`
- Virtual environments and why dependencies should be isolated per project

**Common pitfalls:**

- Modifying a list while iterating over it leads to skipped or duplicated elements.
- Using mutable default arguments in function signatures (e.g., \`def foo(items=[])\`) causes the default to be shared across all calls.
- Forgetting that strings are immutable; operations like \`replace\` return a new string rather than modifying the original.
- Assuming \`==\` and \`is\` are interchangeable; \`is\` checks object identity, not value equality.

---

## HTTP – The Request/Response Cycle

HTTP (Hypertext Transfer Protocol) is the communication protocol used by clients and servers to exchange data on the web. Every time a browser loads a page or a mobile app fetches data, it sends an HTTP request and waits for an HTTP response.

An HTTP request consists of a method (what action to perform), a URL (which resource to act on), headers (metadata such as content type or authentication tokens) and optionally a body (data sent to the server). The server processes the request and returns a response containing a status code (a three-digit number indicating success or failure), response headers and optionally a body.

**Why it matters:** HTTP is fundamental for any backend developer because every API, web framework and network service operates on top of it. Misunderstanding status codes, methods or the stateless nature of HTTP leads to poorly designed APIs and hard-to-diagnose bugs.

**Key things to understand:**

- The most common HTTP methods: GET (retrieve), POST (create or submit data), PUT/PATCH (update), DELETE (remove)
- Status code classes: 2xx success, 3xx redirection, 4xx client errors, 5xx server errors
- Key status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Server Error
- What HTTP headers are and examples of commonly used ones: \`Content-Type\`, \`Authorization\`, \`Accept\`, \`Cache-Control\`
- The stateless nature of HTTP: each request is independent; the server does not automatically remember previous requests

**Common pitfalls:**

- Returning a 200 status code even when an error has occurred (putting error information in the body instead of using the correct status code).
- Confusing 401 Unauthorized (the request lacks valid authentication credentials) with 403 Forbidden (the request is authenticated but the user does not have permission).
- Overlooking the role of headers in content negotiation and caching.
- Using POST for every operation instead of choosing the semantically correct method.

---

## REST APIs – What They Are and How They Work

A REST (Representational State Transfer) API is a style of building web services that uses HTTP as the transport and treats everything the server exposes as a resource identified by a URL. A client interacts with resources by sending standard HTTP requests; the server responds with a representation of that resource — typically formatted as JSON.

REST defines a set of architectural constraints — statelessness, a uniform interface, a client-server separation — rather than a protocol. An API that follows these constraints is said to be RESTful. REST is the dominant style for backend APIs because it is simple, works with every HTTP client and requires no special tooling to consume.

**Why it matters:** Understanding what makes an API RESTful and how to consume one is the foundation for everything else in backend API work. Almost every external service you integrate with will expose a REST API, and almost every internal service you build will be expected to follow REST conventions.

**Key things to understand:**

- Resources are identified by URLs (e.g., \`/users\`, \`/users/42\`)
- HTTP methods map to CRUD operations: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
- Requests and responses typically use JSON as the data format
- REST is stateless: all information needed to process a request must be contained within the request itself
- How to read API documentation and understand endpoint definitions, expected inputs and response shapes
- How to make HTTP requests in Python using the \`requests\` library

**Common pitfalls:**

- Confusing REST with HTTP itself; REST is a set of constraints on how to use HTTP, not a protocol of its own.
- Assuming every API that returns JSON is RESTful; REST implies specific constraints around resource identification and statelessness.
- Ignoring error responses; a well-behaved client must handle non-2xx status codes gracefully.

---

## Client-Server Architecture

Client-server architecture is the fundamental model for how modern web and mobile applications are structured. The client is the part of the system that a user interacts with directly — a browser, a mobile app, or a desktop application. The server is a program running on a remote machine that stores data, enforces business rules and responds to client requests.

This separation of concerns is what defines backend development as a discipline. Backend code runs on the server; it is never directly visible to the user. Because the client is outside your control, the server must never blindly trust what the client sends.

**Why it matters:** Understanding where backend code runs and what it is responsible for prevents an entire class of security mistakes. Backend developers must know that any logic or validation placed only on the client can be trivially bypassed.

**Key things to understand:**

- The client initiates requests; the server responds — the server does not push data to the client unprompted in the basic model
- Multiple clients can connect to the same server simultaneously
- The server is responsible for validating all data it receives, regardless of any validation the client performs
- Backend code controls access to the database and enforces business logic; this must not be delegated to the client
- In a typical web request: DNS resolves the domain to an IP address, a TCP connection is established, the HTTP request is sent, the server processes it and returns a response

**Common pitfalls:**

- Assuming that because a client sends a well-formed request, the data inside it is trustworthy.
- Implementing security checks only on the client side (e.g., in JavaScript); these can be bypassed trivially by anyone with a browser's developer tools or a tool like curl.
- Confusing the web server (the program handling HTTP) with the application server (the program running business logic); in small applications these are often the same process, but the distinction matters as systems grow.

---

## Databases – What They Are and Why Backends Need Them

A database is a structured system for storing, retrieving and managing data persistently. Without a database, any data a server processes lives only in memory and is lost the moment the process stops. Databases provide durable storage, efficient querying and mechanisms to ensure data integrity.

For a backend developer, the database is where the state of the application lives. User accounts, product catalogues, transaction records, configuration — all of this is stored in and retrieved from a database. Understanding what databases are, what types exist and why you need them is the starting point before learning SQL or database design.

**Why it matters:** Every meaningful backend application needs persistent storage. Choosing the wrong type of database for the problem, or misunderstanding what guarantees a database provides, leads to data loss, correctness bugs and performance problems that are difficult to fix after the fact.

**Key things to understand:**

- The difference between a relational database (data stored in structured tables with defined relationships) and a non-relational database (flexible schemas, varied storage models such as documents or key-value pairs)
- What persistence means: data written to a database survives server restarts
- What a query is: a request to read or modify data in the database
- The role of the database in the typical three-tier architecture: presentation layer (client), application layer (backend server), data layer (database)
- Common relational databases: PostgreSQL and MySQL; common non-relational databases: MongoDB (document store) and Redis (in-memory key-value store)
- What a primary key is and why every row needs a unique identifier

**Common pitfalls:**

- Storing all data in a single large table without thought for structure, making queries slow and maintenance difficult.
- Using a database as a message queue or cache when dedicated tools (Redis, RabbitMQ) are better suited to those tasks.
- Ignoring that databases have their own access controls; the backend should connect with the minimum permissions needed (principle of least privilege).
- Assuming that because data was written it was committed; understanding transactions matters even at this level.

---

## Web Frameworks -- FastAPI and Django

A web framework provides the structure and tools for building web applications and APIs. Instead of handling HTTP parsing, routing, and response formatting from scratch, a framework handles these concerns so you can focus on your application's business logic. For Python backend development, FastAPI and Django are the two most important frameworks to understand.

FastAPI is a modern, high-performance framework designed specifically for building APIs. It uses Python type hints to automatically generate API documentation, validate request data, and provide editor autocompletion. FastAPI is an excellent choice when your primary goal is building a REST API -- it is fast to develop with, fast at runtime, and produces self-documenting endpoints.

Django is a full-featured web framework that follows the "batteries included" philosophy. It provides an ORM (Object-Relational Mapper), an admin interface, authentication, form handling, and much more out of the box. Django is the right choice when you need a complete web application with server-rendered pages, user management, and database interaction -- or when your project will grow to need these features over time.

**Why it matters:** Nearly every backend role involves building or maintaining web APIs. Understanding how web frameworks work -- how they receive requests, route them to your code, and send responses -- is foundational knowledge for any backend developer.

**Key things to understand:**

- The request lifecycle: a client sends an HTTP request, the framework matches the URL to a route, your handler function runs, and the framework sends the HTTP response back to the client
- FastAPI uses Python type hints and Pydantic models to validate request bodies and query parameters automatically. If the client sends invalid data, FastAPI returns a clear error response without you writing validation code
- Django follows the Model-View-Template (MVT) pattern: Models define database tables, Views handle request logic, and Templates render HTML. For API-only projects, Django REST Framework adds serialisers and API views
- Both frameworks have excellent documentation and large communities. FastAPI's interactive docs (Swagger UI at /docs) are particularly useful during development
- For LF's stack, FastAPI is typically used for microservices and API-first projects, while Django may be used for internal tools that need an admin interface

**Common pitfalls:**

- Trying to build an API by handling raw HTTP without a framework -- this leads to reinventing routing, validation, serialisation, and error handling.
- Choosing Django for a simple API when FastAPI would be faster to develop and deploy, or choosing FastAPI for a full web application when Django's built-in features would save significant development time.
- Not reading the framework's documentation and instead relying solely on AI-generated code -- framework docs explain the "why" behind design decisions, which is essential for making good architectural choices.
`,
    mid: `# Backend Developer – Mid Concept Reference


This document explains the intermediate-level concepts covered in the Mid level of the Backend Developer learning path.

---

## RESTful API Design – Resources, Verbs and Status Codes

Designing a RESTful API well is different from simply making one that works. A well-designed REST API is predictable, consistent and easy for other developers to consume without reading extensive documentation. It treats server-managed entities as resources, uses URLs to identify those resources, and relies on standard HTTP verbs and status codes to communicate intent and outcome.

Resources should be nouns, not verbs. The URL \`/orders\` refers to the collection of orders; \`/orders/42\` refers to the specific order with identifier 42. Actions are expressed through HTTP methods, not embedded in the path (avoid \`/createOrder\`).

**Why it matters:** A consistent, well-structured API reduces integration bugs, lowers the cognitive load for API consumers and makes the system easier to evolve over time. Poorly designed APIs accumulate workarounds and undocumented conventions that slow down every team that integrates with them.

**Key things to understand:**

- Use plural nouns for collection endpoints: \`/users\`, \`/products\`, \`/invoices\`
- Map CRUD operations to methods: GET (read), POST (create), PUT (full replacement update), PATCH (partial update), DELETE (remove)
- Return meaningful status codes: 200 for successful reads, 201 for successful creates (include a \`Location\` header pointing to the new resource), 204 for successful deletes with no body, 400 for validation errors, 404 for missing resources, 409 for conflicts, 422 for semantically invalid input
- Nest resources only one level deep to avoid overly complex URLs: \`/orders/42/items\` is fine; \`/orders/42/items/7/details/history\` is not
- Design for the consumer: include only the fields the client needs, avoid leaking internal implementation details in field names

**Common pitfalls:**

- Using GET requests that modify server state; GET must be safe and idempotent.
- Returning a 200 with an error message in the body instead of an appropriate 4xx or 5xx status code.
- Inconsistent naming conventions across endpoints (camelCase in some fields, snake_case in others).
- Designing endpoints around your database tables rather than the domain concepts your consumers care about.

---

## API Versioning and Documentation

As an API evolves, you will need to make changes that could break existing consumers. API versioning is the practice of managing those changes so that existing clients continue to work while new clients can take advantage of improvements.

Documentation is the contract between the API and its consumers. Without accurate, up-to-date documentation, consumers cannot integrate reliably, and your team will spend time answering questions that the docs should answer.

**Why it matters:** Breaking changes in a published API break every consumer simultaneously. A versioning strategy and clear documentation are what allow a backend team to evolve a service without disrupting the teams and applications that depend on it.

**Key things to understand:**

- Common versioning strategies: URL path versioning (\`/v1/users\`), query parameter versioning (\`?version=1\`) and header versioning (\`Accept: application/vnd.api.v1+json\`); URL versioning is the most visible and easiest to test
- What constitutes a breaking change: removing a field, changing a field's type, changing a status code's meaning, removing an endpoint
- Non-breaking changes can be introduced without a version bump: adding new optional fields, adding new endpoints
- OpenAPI (formerly Swagger) is the standard for describing REST APIs in a machine-readable format; it enables automatic documentation generation, client code generation and contract testing
- Good documentation includes: endpoint URL and method, required and optional parameters, request body schema with examples, response schemas for each status code, authentication requirements

**Common pitfalls:**

- Incrementing the version number for every small change, fragmenting the API unnecessarily.
- Maintaining multiple versions indefinitely without a deprecation and sunset policy.
- Writing documentation separately from the code so that the two drift apart; prefer generating docs from annotations or schema definitions in the code.
- Forgetting to document error responses, which are often the most important thing a consumer needs to handle.

---

## Relational Databases – Tables, Keys and Normalisation

A relational database organises data into tables (also called relations). Each table has a fixed set of columns, each with a defined data type, and stores data in rows. Relationships between tables are expressed through keys.

A primary key uniquely identifies each row in a table. A foreign key is a column in one table that references the primary key of another, establishing a link between the two. Normalisation is the process of structuring tables to reduce redundancy and improve data integrity, typically by decomposing wide tables into smaller, focused ones connected by foreign keys.

**Why it matters:** A poorly designed schema creates compounding problems: duplicate data falls out of sync, queries become slow, and adding new features requires reworking the data model from scratch. Understanding normalisation, keys and indexes is what separates a schema that scales from one that causes constant production incidents.

**Key things to understand:**

- First Normal Form (1NF): each column holds atomic (indivisible) values; no repeating groups
- Second Normal Form (2NF): every non-key column depends on the whole primary key, not just part of it
- Third Normal Form (3NF): no non-key column depends on another non-key column (no transitive dependencies)
- Indexes allow the database engine to find rows matching a condition without scanning the entire table; they speed up reads at the cost of slightly slower writes and additional storage
- Foreign key constraints enforce referential integrity: you cannot insert a row that references a non-existent parent row, and you cannot delete a parent row that has dependent children (unless cascade rules are defined)
- Joins connect rows from different tables based on a matching condition

**Common pitfalls:**

- Over-normalising to the point where every query requires many joins, hurting read performance; sometimes deliberate denormalisation for read-heavy tables is the right trade-off.
- Forgetting to add indexes on columns used frequently in WHERE clauses or JOIN conditions.
- Using wide VARCHAR columns for everything rather than choosing appropriate types; types enforce data integrity and affect storage efficiency.
- Storing comma-separated values in a single column to avoid creating a related table; this violates 1NF and makes querying painful.

---

## SQL – Queries, Joins, Indexes and Transactions

SQL (Structured Query Language) is the standard language for interacting with relational databases. Despite many databases having proprietary extensions, the core SQL syntax is portable across PostgreSQL, MySQL, SQLite and others.

A backend developer uses SQL directly when writing migrations, debugging data issues or building queries that an ORM cannot express efficiently. Understanding SQL well also makes it easier to understand what an ORM is doing on your behalf.

**Why it matters:** SQL is the lingua franca of data. An inability to write correct, efficient queries is a constant drag on productivity — every feature that touches the database takes longer, and performance problems go undiagnosed because the engineer cannot read an execution plan.

**Key things to understand:**

- \`SELECT\`, \`FROM\`, \`WHERE\`, \`GROUP BY\`, \`HAVING\`, \`ORDER BY\`, \`LIMIT\` and how they compose; \`WHERE\` filters individual rows before grouping, \`HAVING\` filters groups after aggregation
- Aggregate functions: \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`
- Join types: \`INNER JOIN\` (returns only rows that match in both tables), \`LEFT JOIN\` (all rows from the left table plus matched rows from the right; unmatched right-side columns are NULL), \`RIGHT JOIN\` (the reverse), \`FULL OUTER JOIN\` (all rows from both tables)
- Subqueries and common table expressions (CTEs) using \`WITH\` for breaking complex queries into readable steps
- \`INSERT\`, \`UPDATE\` and \`DELETE\` statements; an \`UPDATE\` or \`DELETE\` without a \`WHERE\` clause modifies every row in the table — always double-check
- Transactions: wrap related statements in \`BEGIN\` / \`COMMIT\`; use \`ROLLBACK\` to undo on error; the ACID properties (Atomicity, Consistency, Isolation, Durability) define the guarantees a transaction provides
- Indexes: creating an index on a column used frequently in \`WHERE\` or \`JOIN\` conditions can reduce query time from seconds to milliseconds; each index adds overhead to \`INSERT\`, \`UPDATE\` and \`DELETE\`
- How to read a query execution plan (\`EXPLAIN\` / \`EXPLAIN ANALYZE\`) to understand whether indexes are being used and where the cost lies

**Common pitfalls:**

- Writing \`SELECT *\` in application code; always select only the columns you need to reduce data transfer and prevent breakage when columns are added or removed.
- N+1 query problems: loading a list of records and then issuing one additional query per record to fetch a related field; solve with a single query using a JOIN or a batched query.
- Not using parameterised queries; string-concatenating user input directly into SQL is the root cause of SQL injection vulnerabilities.
- Forgetting that \`NULL\` comparisons require \`IS NULL\` / \`IS NOT NULL\` rather than \`= NULL\`; \`= NULL\` always evaluates to unknown, never true.

---

## Web Security – OWASP Top 10 for Backend Developers

The Open Web Application Security Project (OWASP) publishes a regularly updated list of the ten most critical security risks for web applications. The OWASP Top 10 is updated periodically; always refer to the current list on the OWASP website. As a backend developer you are responsible for preventing these vulnerabilities in the code and infrastructure you write and configure.

Security is not a feature to be added at the end; it must be considered throughout design and development. A single exploited vulnerability can expose all user data, give attackers control of the server, or allow fraudulent transactions.

**Why it matters:** The OWASP Top 10 represents the most commonly exploited vulnerability classes across real-world applications. Being familiar with each category and its mitigations means you can identify and prevent them during design and code review rather than discovering them after a breach.

**Key things to understand:**

- **A01 – Broken Access Control:** Users able to access resources or actions they should not; the most common critical finding. Enforce authorisation checks server-side on every request; never rely on the client to hide or restrict functionality.
- **A02 – Cryptographic Failures:** Transmitting or storing sensitive data (credentials, personal data, payment information) without adequate encryption; enforce HTTPS, hash passwords with bcrypt or Argon2, never store plaintext secrets, avoid weak or deprecated algorithms (MD5, SHA-1 for security purposes).
- **A03 – Injection:** Unsanitised user input interpreted as a command by a database (SQL injection), shell, or other interpreter; prevent with parameterised queries and strict input validation. SQL injection remains one of the most damaging attack types.
- **A04 – Insecure Design:** Security flaws baked into the design of a system before a line of code is written; no amount of hardening fixes a fundamentally insecure design. Threat modelling and security requirements must be part of design, not an afterthought.
- **A05 – Security Misconfiguration:** Default credentials left in place, unnecessary services exposed, verbose error messages leaking stack traces to clients, missing security headers. Applies across every layer from the OS to the application.
- **A06 – Vulnerable and Outdated Components:** Outdated dependencies with published CVEs; use automated dependency scanning in CI (e.g., \`npm audit\`, \`pip-audit\`, Dependabot) and apply updates regularly.
- **A07 – Identification and Authentication Failures:** Weak session management, predictable tokens, missing rate limiting on login endpoints, allowing weak passwords. Use proven auth libraries rather than rolling your own.
- **A08 – Software and Data Integrity Failures:** Code and infrastructure pipelines that do not verify the integrity of software updates, CI/CD pipelines with insufficient access control, or deserialising untrusted data without validation.
- **A09 – Security Logging and Monitoring Failures:** Insufficient logging of authentication events, access control failures and high-value transactions; without logs, breaches go undetected. Avoid logging sensitive data (passwords, tokens).
- **A10 – Server-Side Request Forgery (SSRF):** The server makes HTTP requests to a URL supplied or influenced by the user, which can be used to reach internal services, cloud metadata endpoints or other infrastructure not intended to be public.

**Common pitfalls:**

- Treating security as a checklist to complete once rather than an ongoing practice.
- Over-relying on the framework to handle security automatically without understanding what it does and does not cover.
- Logging sensitive data (passwords, tokens, credit card numbers) in plain text, creating a secondary breach vector.

---

## Authentication and Authorisation – OAuth 2.0, JWT and Sessions

Authentication is the process of verifying who a user is. Authorisation is the process of deciding what an authenticated user is allowed to do. These are distinct concepts that are frequently conflated.

Session-based authentication stores a server-side session record after login and issues the client an opaque session cookie. Token-based authentication issues the client a signed token (typically a JWT) that encodes the user's identity and optionally their permissions; the server validates the token's signature on each request without looking up a server-side record.

OAuth 2.0 is an authorisation framework — it defines how a user can grant a third-party application limited access to their account on another service without sharing their password. OAuth 2.0 is not an authentication protocol; it does not tell you who the user is, only that they have granted access. OpenID Connect (OIDC) is a thin identity layer built on top of OAuth 2.0 that adds authentication by introducing the ID token, which carries the user's identity. JWT (JSON Web Token) is a token format used by both OAuth 2.0 and OIDC — it is not a protocol itself.

**Why it matters:** Authentication and authorisation failures are the second most common cause of breaches after access control issues. Getting these right requires understanding the purpose and limits of each tool — using OAuth 2.0 for authentication without OIDC, or mishandling JWTs, creates serious security holes.

**Key things to understand:**

- JWT structure: header (specifies the signing algorithm), payload (claims such as \`sub\`, \`exp\`, \`iat\`, \`roles\`), signature (verified with a secret or public key); a JWT can be read by anyone — do not put sensitive data in the payload
- The difference between access tokens (short-lived, used to access protected resources) and refresh tokens (longer-lived, used to obtain new access tokens without re-authenticating)
- Why you should not store JWTs in \`localStorage\` on a web client; prefer \`HttpOnly\` cookies to reduce XSS exposure
- The OAuth 2.0 grant types and when to use each: Authorization Code with PKCE (web and native apps, the recommended flow), Client Credentials (machine-to-machine, no user involved), Implicit (deprecated — do not use)
- OpenID Connect adds an \`id_token\` to the OAuth 2.0 flow that contains the user's identity; this is what makes OIDC an authentication protocol
- Role-Based Access Control (RBAC): assigning permissions to roles rather than individual users; check roles on the server side on every request
- Always validate tokens server-side on every request; never trust a client that claims to be authenticated

**Common pitfalls:**

- Storing passwords in plain text or hashing them with a fast algorithm (MD5, SHA-1); use a dedicated password hashing algorithm with a work factor (bcrypt, Argon2).
- Using the same secret key across all environments; rotate secrets between environments and store production secrets in a secrets manager, not in code or environment files committed to version control.
- Not setting token expiry short enough; a compromised access token should have a limited window of usefulness.
- Confusing OAuth 2.0 (authorisation) with authentication; using an OAuth access token to identify a user without an OIDC ID token means you may be acting on an unverified identity.
- Confusing authentication middleware with authorisation; middleware may confirm a valid token without checking whether that user has permission for the specific resource being requested.

---

## GraphQL – Schema, Resolvers and When to Use It

GraphQL is an API query language and runtime developed by Meta. Rather than exposing a fixed set of endpoints each returning a fixed shape, GraphQL exposes a single endpoint and lets the client specify exactly which fields it needs. The server responds with precisely the requested data — no more, no less.

A GraphQL schema defines all the types, queries, mutations and subscriptions the API supports. Resolvers are the functions that fetch the actual data for each field in the schema. The schema is the contract; the resolvers are the implementation. By default, GraphQL APIs receive queries via HTTP POST requests to a single endpoint.

**Why it matters:** GraphQL solves specific problems — over-fetching (getting more data than you need) and under-fetching (needing to call multiple endpoints to build one screen) — that REST struggles with in complex, multi-client environments. Understanding when it is the right choice and what trade-offs it introduces prevents adopting it as a default when REST would be simpler.

**Key things to understand:**

- A query fetches data; a mutation modifies data; a subscription sets up a real-time event stream
- The schema is strongly typed; every field has a declared type, making the contract between client and server explicit and enabling powerful tooling
- GraphQL uses a single endpoint and typically sends all requests via HTTP POST; this means standard HTTP GET-based caching does not apply by default
- The N+1 problem is particularly acute in GraphQL because each field resolver runs independently; the DataLoader pattern batches and caches database calls to solve this
- Introspection allows clients to query the schema itself, enabling self-documented APIs and code generation
- GraphQL is not a replacement for REST in all cases; it shines when multiple clients (web, mobile) need different shapes of the same data and when you want to avoid over-fetching

**When to prefer REST over GraphQL:**

- Simple CRUD APIs with a small number of consumer types
- When HTTP caching is important (GraphQL queries over POST are not cached by default)
- When the team is small and the added complexity of schema management and resolver implementation is not justified

**Common pitfalls:**

- Exposing the entire data model through GraphQL without field-level authorisation, allowing clients to request data they should not access.
- Not implementing query depth or complexity limits, leaving the API vulnerable to expensive deeply nested queries.
- Treating GraphQL as always better than REST; the right tool depends on the problem.

---

## Docker – Containers, Images and Compose

Docker is a platform for packaging applications and their dependencies into containers. A container is an isolated process that runs on the host operating system's kernel — unlike a virtual machine, it does not include a full guest OS, making it much lighter. Containers have their own filesystem, network interface and process space. They solve the "it works on my machine" problem by ensuring the application runs in the same environment everywhere from a developer's laptop to production.

An image is the immutable blueprint for a container. It is built from a \`Dockerfile\` — a text file with instructions for assembling the filesystem layer by layer. A running instance of an image is a container. Because containers share the host OS kernel (rather than emulating hardware), they start in milliseconds and have negligible overhead compared to VMs.

**Why it matters:** Containerisation is the standard unit of deployment in modern backend infrastructure. Understanding Docker is a prerequisite for working with any container orchestration platform (Kubernetes, ECS), for setting up consistent local development environments, and for writing CI/CD pipelines.

**Key things to understand:**

- \`Dockerfile\` instructions: \`FROM\` (base image), \`WORKDIR\`, \`COPY\`, \`RUN\` (execute a command during the image build), \`EXPOSE\`, \`ENV\`, \`CMD\` / \`ENTRYPOINT\` (command to run when the container starts)
- Image layers: each instruction in a Dockerfile creates a cached layer; put infrequently changing instructions (installing dependencies) before frequently changing ones (copying application code) for faster incremental builds
- Core CLI commands: \`docker build\`, \`docker run\`, \`docker ps\`, \`docker logs\`, \`docker exec\`, \`docker stop\`, \`docker rm\`
- Docker Compose defines a multi-container application in a \`compose.yaml\` file (the modern naming convention since Compose V2; older projects may still use \`docker-compose.yml\`); services reference each other by service name, which Docker resolves via an internal DNS
- Volumes persist data outside the container's writable layer; without a volume, data written inside a running container is lost when the container is removed
- Environment variables should be injected at runtime (via \`-e\` flags or \`.env\` files), not baked into the image, to keep the image portable across environments

**Common pitfalls:**

- Running containers as root; specify a non-root user in the Dockerfile to limit the blast radius of a container escape.
- Storing secrets (passwords, API keys) in the \`Dockerfile\` or as image layers; they become visible in the image history. Use runtime environment variables or a secrets manager.
- Building monolithic images with every tool installed rather than using multi-stage builds to keep the final image small and reduce the attack surface.
- Ignoring the \`.dockerignore\` file, causing large \`node_modules\`, \`.git\` directories or local config files to be copied into the build context unnecessarily.

---

## Testing – Unit Tests, Integration Tests and the Test Pyramid

Testing is the practice of verifying that your code behaves as expected. A unit test targets a single function or method in isolation — it calls the function with known inputs and asserts that the output matches what is expected. An integration test verifies that multiple components work together correctly: for example, that an API endpoint correctly reads from the database and returns the expected response.

The test pyramid is a model for balancing the types of tests you write. At the base are many fast, focused unit tests. Above those are fewer integration tests that verify component interactions. At the top are a small number of end-to-end tests that exercise the full system as a user would. The pyramid shape reflects the ideal ratio: many unit tests, fewer integration tests, even fewer end-to-end tests.

**Why it matters:** Code without tests can only be verified by running it manually, which is slow, error-prone and does not scale. Tests catch regressions before they reach production, document the expected behaviour of the code and give developers the confidence to refactor without fear of breaking things they cannot see.

**Key things to understand:**

- Unit tests verify individual functions in isolation; they should be fast, deterministic and independent of external systems (databases, APIs, filesystems)
- Integration tests verify that components work together — for example, that a request to an API endpoint returns the correct response after interacting with a database
- pytest is the standard testing framework for Python; it uses simple \`assert\` statements, automatic test discovery and a powerful fixture system for setup and teardown
- Mocking replaces a real dependency (a database call, an HTTP request, a system clock) with a controlled substitute so the test can focus on the code under test without relying on external systems
- The test pyramid: many unit tests (fast, cheap, isolated), fewer integration tests (slower, test real interactions), even fewer end-to-end tests (slowest, most brittle, but closest to real user experience)
- Tests should be treated as production code: kept clean, well-named and maintained alongside the code they test

**Common pitfalls:**

- Writing tests that depend on execution order or shared mutable state; each test should set up its own preconditions and clean up after itself.
- Over-mocking to the point where the test only verifies that the mocks were called correctly, not that the code actually works.
- Writing only happy-path tests and ignoring edge cases, error conditions and boundary values.
- Treating slow or flaky tests as acceptable; a test suite that developers stop trusting is a test suite that stops being run.

---

## Error Handling and Logging

Error handling is the practice of anticipating, detecting and responding to problems that occur during program execution. In Python, this is done using \`try\`/\`except\` blocks that catch exceptions and allow the program to respond gracefully rather than crashing. Logging is the practice of recording events that happen during execution — requests received, actions taken, errors encountered — so that developers and operators can understand what the system is doing and diagnose problems after the fact.

**Why it matters:** Unhandled errors crash the application and produce unhelpful error messages for users. Missing or poorly structured logs make production incidents impossible to diagnose. Together, error handling and logging are what separate a service that can be operated and debugged from one that fails silently or noisily without giving anyone the information needed to fix it.

**Key things to understand:**

- Python's \`try\`/\`except\` blocks catch exceptions; catch specific exception types rather than bare \`except:\` to avoid silently swallowing unexpected errors
- Python's built-in \`logging\` module provides a standard way to emit log messages at different severity levels: \`DEBUG\` (detailed diagnostic information), \`INFO\` (confirmation that things are working), \`WARNING\` (something unexpected but not yet broken), \`ERROR\` (a failure that prevented an operation from completing), \`CRITICAL\` (a severe failure that may require the application to stop)
- Log what is useful for diagnosing problems: request identifiers, operation names, relevant entity IDs, error messages and stack traces
- Never log sensitive data: passwords, API keys, tokens, credit card numbers or personally identifiable information (PII) must not appear in logs
- Use structured logging (key-value pairs or JSON) rather than free-form strings so that logs can be searched, filtered and aggregated by log management tools
- Configure log levels appropriately per environment: \`DEBUG\` during local development, \`INFO\` or \`WARNING\` in production to avoid noise and performance overhead

**Common pitfalls:**

- Using bare \`except:\` or catching \`Exception\` too broadly, which hides bugs by swallowing errors the developer did not anticipate.
- Logging errors without enough context to reproduce the problem; "an error occurred" is not useful — include what operation failed, what input caused it and what the error was.
- Logging at \`DEBUG\` level in production without a way to adjust the level dynamically, flooding storage and degrading performance.
- Raising exceptions for expected control flow (e.g., using exceptions instead of a simple conditional check); exceptions should represent exceptional conditions.

---

## System Design Basics – Load Balancing, Caching and Queues

System design is the process of defining the architecture of a software system to meet functional requirements (what it does) and non-functional requirements (how reliably, how fast, at what scale). At the Mid level, understanding three fundamental building blocks — load balancers, caches and message queues — is essential.

A load balancer distributes incoming requests across multiple instances of a service. This improves availability (if one instance fails, the others continue serving traffic) and allows horizontal scaling (adding more instances to handle more load). A cache stores the result of an expensive operation (a database query, an external API call) so that subsequent requests for the same result can be served faster without repeating the work. A message queue decouples the component that produces work from the component that performs it: the producer places a message on the queue and continues without waiting; one or more consumers read from the queue and process messages at their own pace.

**Why it matters:** These three patterns appear repeatedly in system design interviews and in real production architectures. Understanding what problem each one solves — and when not to reach for them — is the foundation for discussing and designing scalable, resilient systems.

**Key things to understand:**

- Load balancing algorithms: round-robin, least connections, IP hash (for session stickiness)
- Common caching strategies: cache-aside (the application checks the cache and populates it on a miss), write-through (writes go to both cache and database), TTL-based expiry
- The difference between a cache hit and a cache miss, and why cache hit rate matters for latency
- Message queue vs pub/sub event bus: a queue delivers each message to exactly one consumer; a pub/sub bus delivers each message to all subscribers
- Idempotency in message consumers: a message may be delivered more than once; the consumer must handle duplicates safely without producing duplicate side effects

**Common pitfalls:**

- Caching data that changes frequently without a sufficiently short TTL, causing stale data to be served.
- Not considering what happens when the cache is cold (after a restart or flush); a cache stampede can send a flood of simultaneous requests to the database.
- Building synchronous dependencies between services where a queue would make the system more resilient to downstream slowdowns.
- Ignoring backpressure: if a queue grows without bound because consumers are slower than producers, the system will eventually exhaust memory or disk space.
`,
    senior: `# Backend Developer – Senior Concept Reference


This document explains the advanced concepts covered in the Senior level of the Backend Developer learning path.

---

## Distributed Systems – CAP Theorem, Consistency and Availability Trade-offs

A distributed system is a collection of independent computers that appear to the user as a single coherent system. Distributed systems unlock horizontal scalability and fault tolerance, but they introduce a fundamental challenge: the network between nodes is unreliable, and any two nodes may disagree about the current state of the world.

The CAP theorem, formulated by Eric Brewer, states that a distributed data store can guarantee at most two of the following three properties simultaneously: Consistency (every read returns the most recent write or an error), Availability (every request receives a non-error response, though it may not reflect the most recent write) and Partition Tolerance (the system continues to operate even when network messages between nodes are lost or delayed). Because network partitions are a reality rather than an edge case, the practical design choice is between favouring Consistency (CP) or Availability (AP) when a partition occurs.

**Why it matters:** Every backend system of sufficient scale becomes a distributed system — through read replicas, caches, CDNs or microservices — even if it was not designed as one. Understanding CAP and its implications is essential for making correct trade-offs in database selection, replication strategy and system design, and for communicating those trade-offs clearly to stakeholders.

**Key things to understand:**

- CP systems (e.g., traditional relational databases with synchronous replication, ZooKeeper) will refuse to serve requests if they cannot guarantee they have the latest data; they prefer consistency over uptime during a partition
- AP systems (e.g., DynamoDB, Cassandra, CouchDB) will serve potentially stale data rather than return an error; this is acceptable for many use cases where eventual correctness is sufficient
- Eventual consistency means all replicas will converge to the same state given enough time with no new writes; this is a weaker guarantee than strong consistency but allows higher availability and lower latency
- The PACELC model extends CAP by recognising that even when there is no partition, you trade off latency against consistency; a system's behaviour during normal operation is as important as its behaviour during failure
- Distributed transactions (two-phase commit, Saga pattern) are complex and introduce failure modes; design systems to minimise the need for cross-service transactions wherever possible

**Common pitfalls:**

- Assuming that because a system uses a single relational database, it does not need to reason about distributed system properties; read replicas, caches and CDNs introduce distribution even in seemingly simple architectures.
- Choosing CP or AP without clearly understanding the business requirement; the correct choice depends on what stale or inconsistent data means in your specific domain.
- Conflating CAP consistency (read-your-writes across nodes) with ACID consistency (data integrity constraints within a database); these are different concepts that use the same word.

---

## Microservices – Boundaries, Communication and Trade-offs vs Monolith

A microservices architecture decomposes a system into small, independently deployable services, each responsible for a narrow slice of business capability. Each service owns its own data store, communicates over the network and can be deployed, scaled and updated independently of the others.

A monolith is a single deployable unit that contains all application logic. This is not inherently bad; many successful, high-scale systems are well-structured monoliths. Starting with a monolith and splitting into services only when boundaries become clear and team scale demands it is often the right approach — a path sometimes called the "modular monolith first" strategy.

**Why it matters:** Choosing between these architectural styles has profound implications for team structure, deployment complexity, operational overhead and the speed at which the system can evolve. Microservices solve real problems but introduce a class of distributed-systems complexity that a monolith simply does not have. The decision must be made deliberately.

**Key things to understand:**

- Service boundaries should align with business capabilities (Domain-Driven Design bounded contexts), not technical layers; splitting by "database layer" and "API layer" creates a distributed monolith, not microservices
- Inter-service communication patterns: synchronous (REST, gRPC) vs asynchronous (events, message queues); prefer asynchronous for operations that do not require an immediate response to reduce coupling and improve resilience
- The distributed systems problems introduced by microservices: network latency, partial failure, eventual consistency and the need for distributed tracing to follow a request across service boundaries
- The Strangler Fig pattern for gradually migrating a monolith to microservices without a risky big-bang rewrite; new functionality is built as services while the monolith handles legacy paths
- Conway's Law: the architecture of a system tends to mirror the communication structure of the organisation that builds it; align team boundaries with service boundaries deliberately
- Shared databases between services create tight coupling and defeat the purpose of independent deployment; each service must own its data exclusively

**Common pitfalls:**

- Splitting into microservices prematurely, before the domain boundaries are well understood; this creates a distributed monolith with all the complexity of microservices but none of the benefits — changes still require coordinating multiple services.
- Sharing a database between services and calling it microservices; this is a monolith with extra network hops.
- Neglecting operational concerns: service discovery, centralised logging, distributed tracing and health checks are not optional in a microservices environment — the operational overhead is a genuine cost.
- Building a chatty architecture where a single user action triggers many synchronous calls between services, creating high latency and cascading failure risk.

---

## Domain-Driven Design – Bounded Contexts and Aggregates

Domain-Driven Design (DDD) is a set of principles and patterns for building software that closely reflects the domain it models. Codified by Eric Evans, DDD places the primary project focus on the core domain and domain logic, basing complex designs on a model developed collaboratively with domain experts.

At the strategic design level, DDD introduces the Bounded Context: an explicit boundary within which a particular domain model is defined and applicable. The same concept (e.g., "customer") may mean something different in the Sales context than in the Support context; each context has its own model and its own persistence, and should not share a database schema with other contexts.

At the tactical design level, the Aggregate is the key building block: a cluster of domain objects treated as a single unit for the purposes of data changes. The Aggregate Root is the only entry point into the cluster; all changes must go through it, ensuring that business invariants are always maintained.

**Why it matters:** DDD provides a vocabulary and a set of tools for tackling the most difficult part of software engineering — understanding and modelling a complex business domain correctly. For senior engineers, it is the bridge between business requirements and technical architecture, and the foundation for defining sensible microservice boundaries.

**Key things to understand:**

- The Ubiquitous Language: a shared vocabulary developed collaboratively with domain experts and used consistently in code, documentation and conversation; when code uses the same terms as the business, misunderstandings are surfaced earlier and reduced over time
- Context Maps document the relationships between bounded contexts: Shared Kernel (both contexts share part of the model), Customer/Supplier (one context depends on the other's API), Conformist (the downstream accepts the upstream's model), Anti-Corruption Layer (a translation layer that prevents a legacy or foreign model from polluting the new one)
- Aggregates enforce consistency boundaries; choose aggregate boundaries to ensure all invariants can be checked and enforced within a single transaction
- Repository pattern: abstracts the mechanism for loading and saving aggregates; application code works with domain objects and does not need to know about SQL or HTTP
- Domain Events: immutable records of things that happened in the domain that other parts of the system may need to react to; they decouple bounded contexts and are the natural integration point between services

**Common pitfalls:**

- Making aggregates too large, turning them into a god object that is slow to load, contended under concurrent writes, and difficult to change.
- Applying DDD tactical patterns (Aggregates, Repositories, Domain Events) without the strategic foundation; the patterns have real cost in complexity, and that cost is only justified when the domain is genuinely complex.
- Leaking infrastructure concerns (SQL queries, HTTP calls) into the domain model; the domain layer should be free of framework and persistence dependencies to remain independently testable.

---

## Algorithms – Complexity, Big O and When It Matters in Production

Algorithm complexity analysis is the practice of describing how an algorithm's resource usage (time or memory) grows as the input size increases. Big O notation expresses this growth as a function of input size n, discarding constant factors and lower-order terms to focus on the dominant scaling behaviour.

In most business applications, algorithmic complexity is not the primary performance bottleneck — database queries and network calls dominate. However, when it does matter, a poorly chosen algorithm can make a system completely unusable as data volume grows, with no infrastructure investment capable of fixing it.

**Why it matters:** Senior engineers encounter algorithm complexity in two ways: in technical interviews where it is tested directly, and in production systems where identifying an O(n²) hot path or replacing a linear scan with a hash-map lookup can eliminate a performance crisis. Understanding complexity analysis is also essential for evaluating the scalability of a proposed design.

**Key things to understand:**

- Common complexity classes in increasing order of cost: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2ⁿ) exponential
- O(log n) is typical of binary search and balanced tree lookups; O(n log n) is typical of efficient sorting algorithms such as merge sort and quicksort (average case)
- Amortised complexity: an operation may be occasionally expensive but cheap on average (e.g., appending to a dynamic array that occasionally resizes)
- Space complexity matters alongside time complexity; an algorithm can trade time for space and vice versa, and both resources are finite
- How to identify an O(n²) problem in code: a nested loop where both loops iterate over the same collection is the classic pattern
- Hash maps provide O(1) average-case lookup and insertion; knowing when to reach for a hash map can transform an O(n²) algorithm into O(n)

**When it matters in production:**

- Processing large files or data sets on a single node (batch jobs, ETL pipelines)
- Report generation queries that grow with the number of rows
- Real-time systems where latency guarantees must be met regardless of input size
- APIs called at high volume where a small per-request inefficiency multiplies across millions of calls

**Common pitfalls:**

- Over-optimising code that is not on the hot path; premature optimisation wastes time and produces harder-to-read code. Profile first.
- Assuming that the Big O class with the smaller exponent is always faster in practice; for small inputs, constants matter more than asymptotic behaviour.
- Fixing algorithm complexity in application code when the real fix is adding an index to the database query that drives the computation.

---

## Dynamic Programming – Pattern Recognition and Memoisation

Dynamic programming (DP) is an algorithmic technique for solving problems by breaking them into overlapping subproblems, solving each subproblem once and storing the result to avoid redundant computation. It applies when a problem exhibits two properties: optimal substructure (the optimal solution to the whole problem can be built from optimal solutions to its subproblems) and overlapping subproblems (the same subproblems are solved repeatedly in a naive recursive approach).

Memoisation is the top-down approach: write a recursive solution and cache the result of each subproblem as it is computed. Tabulation is the bottom-up approach: build a table of results iteratively, starting from the smallest subproblems and working upward. Both approaches convert an exponential naive solution into a polynomial one.

**Why it matters:** DP problems appear regularly in technical interviews and are a reliable signal of algorithmic maturity. More practically, recognising the DP pattern helps when designing algorithms for pricing engines, recommendation systems, resource scheduling and combinatorial optimisation problems that arise in real backend work.

**Key things to understand:**

- The classic DP problems and patterns to internalise: Fibonacci sequence (the simplest introduction), 0/1 Knapsack, Longest Common Subsequence, Edit Distance, Coin Change
- How to identify a DP problem: if a naive recursive solution recomputes the same subproblem multiple times, DP likely applies; draw the recursion tree to see the overlap
- State definition is the hardest part: clearly define what information the state must capture to uniquely describe a subproblem; a poorly defined state produces incorrect or inefficient solutions
- Memoisation with a dictionary (hash map) is often the easiest starting point; switch to tabulation if recursion depth causes stack overflow or if better cache locality improves performance
- Reconstructing the actual solution (not just computing the optimal value) requires storing the decisions made at each step, not just the optimal values

**Common pitfalls:**

- Jumping to DP when a simpler greedy algorithm would suffice; always verify whether a greedy approach yields optimal results before adding DP complexity.
- Defining state too broadly — capturing more information than necessary — causing the memoisation table to be enormous and negating the efficiency gain.
- Confusing top-down memoisation with general caching; memoisation is specific to pure functions with no side effects and deterministic outputs.

---

## Observability – Structured Logging, Metrics and Distributed Tracing

Observability is the degree to which you can understand the internal state of a system by examining its external outputs. In a production backend system, the three pillars of observability are logs, metrics and distributed traces.

Logs are time-stamped records of discrete events: a request arrived, a database query was executed, an error occurred. Structured logs (formatted as JSON rather than free-form text) are machine-parseable and can be queried and aggregated by log management tools. Metrics are numerical measurements aggregated over time: request rate, error rate, latency percentiles, CPU usage — they answer "how is the system behaving right now?" Traces record the end-to-end journey of a single request as it flows through multiple services, capturing the time spent in each operation and the causal relationships between them.

**Why it matters:** In a distributed system, failures are invisible without observability. Logs tell you what happened; metrics tell you how often and how fast; traces tell you where time was spent and which service caused a failure. Without all three, on-call engineers are debugging production incidents blind.

**Key things to understand:**

- The RED method for service metrics: Rate (requests per second), Errors (error rate as a percentage), Duration (latency distribution — especially p50, p95 and p99 percentiles, not just averages)
- Structured logging: always emit logs as JSON with consistent fields — at minimum: timestamp, log level, service name, trace ID, message, and relevant domain context (e.g., order ID, user ID)
- Correlation IDs (trace IDs): a unique identifier generated at the entry point of a request and propagated through every downstream service call, log entry and outgoing message; essential for reconstructing the full journey of a single request in a distributed system
- Distributed tracing tools (Jaeger, Zipkin, Honeycomb, or the vendor-neutral OpenTelemetry standard) visualise the call graph of a request across services as a series of spans, showing which service was slowest and which call failed
- Alerting should be based on symptoms (high error rate, high latency) rather than causes (high CPU); alert on what users experience, not on what the infrastructure is doing
- Cardinality: high-cardinality labels (e.g., user ID as a metric dimension) can cause metric systems to run out of memory; use distributed traces for high-cardinality data, not metric labels

**Common pitfalls:**

- Logging at DEBUG level in production without a mechanism for dynamically adjusting log levels; excessive logging degrades performance, fills storage and makes finding relevant entries harder.
- Writing log messages that describe what the code is doing ("entering processPayment()") rather than what is happening in the domain ("payment declined for order 42: insufficient funds").
- Not propagating trace context through asynchronous boundaries (message queue consumers, scheduled jobs, async tasks); the trace breaks and the end-to-end journey becomes invisible.
- Treating observability as something to retrofit after a production incident rather than designing for it from the start.

---

## AI-Assisted Development for Backend Engineers

AI-assisted development refers to the use of large language model (LLM) based tools integrated into the development workflow to accelerate and improve the quality of code and documentation. For backend engineers, these tools are most valuable when applied to well-understood, bounded tasks within a larger problem.

AI coding assistants can generate boilerplate, suggest completions, explain unfamiliar code, write tests for existing functions, translate code between languages and help diagnose error messages. They work best when given precise, context-rich prompts and when the engineer evaluates the output critically rather than accepting it uncritically.

**Why it matters:** AI-assisted development tools are changing the pace at which code is produced and the skills that provide the most leverage. Senior engineers who understand how to use these tools effectively — and equally importantly, where their limits are — will be more productive and will help their teams establish conventions that prevent the quality and security risks these tools can introduce.

**Key things to understand:**

- AI tools are statistical text-completion engines, not reasoning engines; they produce plausible-looking code, not necessarily correct code. Always review generated code for logic errors, security issues and adherence to your codebase's conventions
- Effective prompting for backend tasks: provide the function signature, the expected behaviour, example inputs and outputs, and any constraints (performance requirements, error handling expectations, existing interfaces to conform to)
- AI assistants are well-suited for: generating CRUD endpoints, writing unit tests, producing SQL queries for well-defined schemas, explaining unfamiliar libraries, converting code between languages, and drafting documentation from code
- AI assistants are poorly suited for: designing system architecture (they lack knowledge of your specific constraints and history), writing security-sensitive code without thorough review, and tasks requiring deep context about the entire codebase
- Test-driven prompting: ask the assistant to write the tests first, then the implementation; this forces the specification to be made explicit and provides an immediate way to validate the output
- Data privacy: do not paste proprietary business logic, credentials, or personal data into a public AI tool; check your organisation's policy on approved tools before use

**Common pitfalls:**

- Accepting generated code without understanding it; if you cannot explain what the code does, you cannot maintain, debug or review it in a pull request.
- Over-relying on AI for boilerplate and underinvesting in understanding the underlying concepts; tools change rapidly, but foundational understanding persists.
- Using AI to generate security-sensitive components (authentication, authorisation, cryptography) without independent expert review; the model may produce code that looks correct but has subtle vulnerabilities.
- Not establishing team conventions around AI tool use, leading to inconsistent code styles, unpredictable quality and unclear accountability across the codebase.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from developers building AI-integrated backend services to engineers using AI-assisted development tools.

**Why it matters:** The AI Policy is the organisation's binding commitment to responsible AI use. For backend engineers, this matters whenever you build APIs that call AI models, store AI-generated content, or process data that feeds into AI systems. The policy's requirements — data classification, logging, transparency — translate directly into backend design decisions.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- GDPR obligations apply to all AI systems that process personal data — this includes inference inputs, model outputs, and logged interactions.
- The policy requires transparency: users must be informed when they are interacting with an AI system or when AI has influenced a decision affecting them.

**Common pitfalls:**
- Building a backend integration with an AI model without registering the use case, creating compliance exposure.
- Treating the AI Policy as a legal concern rather than a design constraint — requirements like logging, data classification, and human oversight must be designed into the backend from the start.
- Assuming that internal-only AI tools are exempt from the policy; the governance requirements apply to all AI use.

---

## Language Deep Dives

Strengthen your foundations with these language-specific learning paths:

- [Python Deep Dive](/language/python) — Build APIs, scripts, and backend services
- [SQL Deep Dive](/language/sql) — Master database queries and data modelling
- [TypeScript Deep Dive](/language/typescript) — Type-safe Node.js backend development
- [JavaScript Deep Dive](/language/javascript) — Core language for full-stack development
`,
  },
  'Data-Engineer': {
    overview: `# Data Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Data Engineers design, build, and maintain the infrastructure and pipelines that move, transform, and store data at scale. The role covers data modelling, ETL/ELT pipelines, data warehousing, streaming, orchestration, data quality, and platform tooling.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| Python Foundations | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python Foundations | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| SQL Fundamentals | [SQLBolt – Interactive SQL Tutorial](https://sqlbolt.com/) | Interactive |
| SQL Fundamentals | [Kaggle Learn – Intro to SQL](https://www.kaggle.com/learn/intro-to-sql) | Interactive |
| Data Engineering Overview | [Data Engineering Roadmap](https://roadmap.sh/dataengineering) | Interactive |
| Relational Databases | [freeCodeCamp – Relational Databases](https://www.freecodecamp.org/learn/relational-databases-v9/) | Interactive |
| Data Pipelines Overview | [What is a Data Pipeline?](https://www.youtube.com/watch?v=VtzvF17ysbc) | Video |
| Linux & CLI Basics | [roadmap.sh – Linux](https://roadmap.sh/linux) | Interactive |

### After completing Beginner you should be able to:

- Write Python scripts to read, transform, and write structured data using built-in types and standard library modules
- Write SQL queries including SELECT, WHERE, JOIN, GROUP BY, and ORDER BY against a relational database
- Explain the difference between relational and non-relational databases and identify when each is appropriate
- Describe what a data pipeline is and identify the stages of extract, transform, and load (ETL)
- Navigate the Linux file system and use the command line for basic file operations
- Explain what data modelling means and why a well-structured schema matters for downstream consumers
- Describe the role of a Data Engineer within a data team and how it differs from Data Scientist and Data Analyst

For deep explanations of each concept, see the [Beginner Concept Reference](Data-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| Data Warehousing | [Kimball Dimensional Modelling – Overview](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/) | Docs |
| Data Warehousing | [Data Warehouse Toolkit Concepts (30 min)](https://www.youtube.com/watch?v=lWPiSZf7-uQ) | Video |
| dbt (data build tool) | [dbt – Getting Started](https://docs.getdbt.com/guides) | Interactive |
| Apache Spark | [Apache Spark – Quick Start](https://spark.apache.org/docs/latest/quick-start.html) | Docs |
| Apache Spark | [Apache Spark – Official Documentation](https://spark.apache.org/docs/latest/) | Docs |
| Apache Airflow | [Apache Airflow – Official Tutorial](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html) | Docs |
| Azure Data Services | [Microsoft Learn – Azure Data Fundamentals](https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/) | Interactive |
| Docker | [Learn Docker in 7 Easy Steps](https://www.youtube.com/watch?v=gAkwW2tuIqE) | Video |
| Data Quality | [Great Expectations – Getting Started](https://docs.greatexpectations.io/docs/) | Docs |
| Data Manipulation | [Kaggle Learn – Advanced SQL](https://www.kaggle.com/learn/advanced-sql) | Interactive |

### After completing Mid you should be able to:

- Design a dimensional model using star schema with fact and dimension tables appropriate for analytical workloads
- Build and schedule data transformation pipelines using dbt with tests and documentation
- Write PySpark jobs to process large datasets using transformations, actions, and DataFrames
- Define and schedule DAGs in Apache Airflow to orchestrate multi-step data pipelines
- Provision and configure Azure data services (Data Factory, Synapse) for a basic data integration workflow
- Implement data quality checks using validation frameworks and explain why data quality must be built into pipelines
- Containerise a data pipeline application using Docker

For deep explanations of each concept, see the [Mid Concept Reference](Data-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| Streaming & Kafka | [Confluent – Apache Kafka Fundamentals](https://developer.confluent.io/courses/apache-kafka/events/) | Course |
| Streaming & Kafka | [Kafka in 100 Seconds](https://www.youtube.com/watch?v=uvb00oaa3k8) | Video |
| Lakehouse Architecture | [Databricks – Lakehouse Fundamentals](https://www.databricks.com/learn/training/lakehouse-fundamentals) | Course |
| Delta Lake | [Delta Lake – Official Documentation](https://docs.delta.io/latest/index.html) | Docs |
| Data Mesh | [Data Mesh Principles – Zhamak Dehghani](https://martinfowler.com/articles/data-mesh-principles.html) | Docs |
| DataOps & CI/CD | [Microsoft Learn – DataOps for Azure](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/dataops) | Docs |
| GenAI for Data Engineering | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| AI Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| Data Governance | [Microsoft Learn – Data Governance with Microsoft Purview](https://learn.microsoft.com/en-us/training/paths/governance-purview/) | Interactive |
| GDPR for Data Engineers | [GDPR Overview – gdpr-info.eu](https://gdpr-info.eu/) | Reference |
| Microsoft Fabric | [Microsoft Learn – Get Started with Microsoft Fabric](https://learn.microsoft.com/en-us/training/paths/get-started-fabric/) | Interactive |
| Change Data Capture | [Debezium – Getting Started](https://debezium.io/documentation/reference/stable/tutorial.html) | Docs |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |

### After completing Senior you should be able to:

- Design and implement a real-time streaming pipeline using Kafka or Azure Event Hubs for event-driven data ingestion
- Evaluate the trade-offs between a traditional data warehouse, a data lake, and a lakehouse architecture and recommend the appropriate pattern for a given use case
- Apply Delta Lake features — ACID transactions, time travel, schema enforcement — to build reliable data lakehouse storage
- Articulate the principles of Data Mesh (domain ownership, data as a product, self-serve platform, federated governance) and assess organisational readiness
- Design and implement DataOps practices including version-controlled pipelines, automated testing, and CI/CD for data workflows
- Apply AI governance and policy requirements to data engineering projects involving GenAI components
- Design data pipelines that comply with GDPR requirements including data minimisation, purpose limitation, and right to erasure

For deep explanations of each concept, see the [Senior Concept Reference](Data-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `# Data Engineer – Beginner Concept Reference


This document explains the foundational concepts covered in the Beginner level of the Data Engineer learning path.

---

## Python Foundations – Syntax, Data Structures and File I/O

Python is the primary language for data engineering. Its readable syntax, rich standard library and mature ecosystem of data libraries make it the default choice for writing ETL scripts, pipeline logic, and data transformations. A Data Engineer uses Python daily — not to build web applications or train models, but to move, clean, reshape and validate data.

The standard library covers file I/O, JSON parsing, CSV handling, date manipulation and HTTP requests. Beyond the standard library, the data engineering ecosystem relies heavily on libraries like Pandas for tabular data manipulation, requests for API integration, and SQLAlchemy for database connectivity. Understanding Python's core data structures — lists, dictionaries, sets and tuples — is essential because every transformation you write operates on these primitives.

**Why it matters:** A Data Engineer who cannot write clean, efficient Python will struggle with every tool in the stack. Spark jobs are written in PySpark, Airflow DAGs are Python files, dbt uses Jinja-templated SQL orchestrated by Python, and most cloud SDK interactions happen through Python clients. Python fluency is the foundation everything else builds on.

**Key things to understand:**

- Built-in types: \`int\`, \`float\`, \`str\`, \`bool\`, \`list\`, \`tuple\`, \`dict\`, \`set\` and the operations each supports
- List comprehensions and generator expressions for memory-efficient data processing
- Reading and writing files: \`open()\`, \`with\` statement, CSV module, JSON module
- Error handling with \`try\`/\`except\` and why specific exception types matter
- Virtual environments (\`venv\`) and dependency management (\`pip\`, \`requirements.txt\`)
- f-strings for readable string formatting and \`pathlib\` for cross-platform file paths

**Common pitfalls:**

- Modifying a list while iterating over it, causing skipped or duplicated elements.
- Loading an entire large file into memory at once instead of processing it line by line or in chunks.
- Using mutable default arguments (e.g., \`def process(items=[])\`) which share state across calls.
- Ignoring encoding issues when reading text files; always specify encoding explicitly (e.g., \`encoding='utf-8'\`).

---

## SQL Fundamentals – Querying, Filtering and Aggregation

SQL (Structured Query Language) is the universal language for working with relational data. For a Data Engineer, SQL is not just a query tool — it is the primary language for defining transformations, building data models, and validating data quality. Every data warehouse, every analytics engine, and most pipeline tools use SQL or a SQL-like dialect as the core interface.

A solid understanding of SQL means being able to retrieve data from multiple tables, filter and aggregate it, and reshape it for downstream use. Beyond simple queries, Data Engineers use SQL to define views, create tables, manage schemas, and write the transformation logic that turns raw data into reliable analytical datasets.

**Why it matters:** SQL is the language your entire data stack speaks. Spark SQL, dbt, BigQuery, Synapse, Snowflake, PostgreSQL — they all use SQL. An inability to write correct, efficient SQL is the single biggest bottleneck for a Data Engineer, because every pipeline, every model, and every dashboard depends on it.

**Key things to understand:**

- \`SELECT\`, \`FROM\`, \`WHERE\`, \`GROUP BY\`, \`HAVING\`, \`ORDER BY\`, \`LIMIT\` and how they compose
- Aggregate functions: \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`
- Join types: \`INNER JOIN\`, \`LEFT JOIN\`, \`RIGHT JOIN\`, \`FULL OUTER JOIN\` and when to use each
- Subqueries and Common Table Expressions (CTEs) using \`WITH\` for readable multi-step queries
- \`INSERT\`, \`UPDATE\`, \`DELETE\` statements and the importance of \`WHERE\` clauses to avoid unintended data modification
- The difference between \`NULL\` handling (\`IS NULL\`, \`COALESCE\`) and empty values

**Common pitfalls:**

- Writing \`SELECT *\` in production queries; always select only the columns you need.
- Forgetting that \`NULL\` comparisons require \`IS NULL\` rather than \`= NULL\`.
- Using \`GROUP BY\` without understanding which columns must be grouped and which must be aggregated.
- Not understanding the order of SQL clause execution (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY).

---

## Relational Databases – Tables, Keys and Schema Design

A relational database organises data into tables with defined columns and data types. Each table represents an entity — customers, transactions, products — and relationships between entities are expressed through keys. A primary key uniquely identifies each row; a foreign key in one table references the primary key of another, creating the relationships that give relational databases their name.

Schema design is the process of deciding which tables to create, what columns each table has, and how tables relate to each other. Good schema design minimises redundancy (the same data stored in multiple places) and maximises integrity (constraints that prevent invalid data from being stored). For a Data Engineer, understanding relational schema design is the foundation for both operational databases and analytical data models.

**Why it matters:** Data Engineers work with relational databases constantly — as sources to extract from, as targets to load into, and as the foundation for data warehouse schemas. A poor understanding of relational concepts leads to pipelines that produce duplicate data, violate constraints, or build analytical models on an unstable foundation.

**Key things to understand:**

- Primary keys uniquely identify rows; composite keys use multiple columns together
- Foreign keys enforce referential integrity between tables
- Data types matter: choosing the right type (INTEGER, VARCHAR, TIMESTAMP, DECIMAL) affects storage, performance and correctness
- Normalisation basics: First Normal Form (atomic values), Second Normal Form (no partial dependencies), Third Normal Form (no transitive dependencies)
- Indexes speed up reads at the cost of slower writes; every table needs at least one index on its primary key
- Constraints (\`NOT NULL\`, \`UNIQUE\`, \`CHECK\`, \`DEFAULT\`) enforce data quality at the database level

**Common pitfalls:**

- Storing comma-separated values in a single column instead of creating a related table; this violates First Normal Form and makes querying painful.
- Forgetting to add foreign key constraints, allowing orphaned records to accumulate.
- Over-normalising to the point where every query requires five or more joins; pragmatic denormalisation is sometimes the right trade-off.
- Using auto-incrementing integers as primary keys for tables that will be merged across systems; UUIDs are often more appropriate.

---

## Data Pipelines – Extract, Transform, Load

A data pipeline is a series of automated steps that move data from one or more source systems to a destination where it can be analysed, reported on, or used by other applications. The classic pattern is ETL: Extract data from sources (databases, APIs, files), Transform it (clean, reshape, aggregate, enrich), and Load it into a target system (data warehouse, data lake, analytical database).

The alternative pattern is ELT: Extract and Load the raw data first into a powerful analytical system, then Transform it inside that system using SQL. ELT has become increasingly popular because modern cloud data warehouses (Snowflake, BigQuery, Synapse) have enough compute power to handle transformations at scale, and storing raw data first preserves the original source of truth.

**Why it matters:** Data pipelines are the core deliverable of a Data Engineer. Every report, dashboard, machine learning model, and business decision depends on data that was moved and transformed by a pipeline. A broken or unreliable pipeline means downstream consumers — analysts, data scientists, business users — cannot trust the data, which undermines the entire data function.

**Key things to understand:**

- The difference between ETL (transform before loading) and ELT (load first, transform in the warehouse)
- Batch processing (run on a schedule — hourly, daily) versus real-time/streaming processing (process data continuously as it arrives)
- Idempotency: a pipeline should produce the same result whether it runs once or multiple times for the same input; this is critical for safe retries after failures
- Incremental loading: processing only new or changed data since the last run, rather than reprocessing everything; this is essential for performance at scale
- Common sources: relational databases (via JDBC/ODBC), REST APIs, flat files (CSV, JSON, Parquet), message queues
- Common targets: data warehouses, data lakes (cloud storage like Azure Blob/S3 with structured formats), operational databases

**Common pitfalls:**

- Building pipelines that are not idempotent, causing duplicate data when retried after a failure.
- Not implementing incremental loading from the start, resulting in pipelines that become too slow as data volume grows.
- Ignoring error handling and monitoring; a pipeline that fails silently is worse than one that fails loudly.
- Coupling pipeline logic tightly to a specific source schema without an abstraction layer, causing breakage when the source changes.

---

## Linux and Command Line – Navigating the Data Engineering Environment

Data engineering tools run on Linux. Spark clusters, Airflow schedulers, Docker containers, cloud VMs — the vast majority of the infrastructure a Data Engineer interacts with runs on a Linux operating system. The command line interface (CLI) is the primary way to interact with these systems: starting and stopping services, inspecting logs, transferring files, and debugging pipeline failures.

Even when working on a Windows or macOS laptop, Data Engineers frequently SSH into remote Linux machines or interact with containers that run Linux. Understanding the file system structure, process management, and basic shell scripting is a prerequisite for working with any data infrastructure tool.

**Why it matters:** A Data Engineer who cannot navigate Linux is locked out of their own infrastructure. When a pipeline fails at 3 AM, the first step is usually to SSH into a server and inspect logs, check disk space, verify that a process is running, or examine a data file. These tasks require command line fluency.

**Key things to understand:**

- File system navigation: \`ls\`, \`cd\`, \`pwd\`, \`mkdir\`, \`rm\`, \`cp\`, \`mv\` and understanding absolute vs relative paths
- File inspection: \`cat\`, \`head\`, \`tail\`, \`less\`, \`wc\`, \`grep\` for searching content within files
- Permissions: \`chmod\`, \`chown\`, and understanding the read/write/execute model for user, group, and other
- Process management: \`ps\`, \`top\`, \`kill\`, and understanding background processes
- Pipes and redirection: \`|\` to chain commands, \`>\` and \`>>\` for output redirection, \`<\` for input redirection
- Environment variables and how to set them temporarily and persistently

**Common pitfalls:**

- Running commands as root when not necessary; always use the minimum permissions required.
- Deleting files or directories without confirming what will be removed; \`rm -rf\` is irreversible.
- Not understanding the difference between \`>\` (overwrite) and \`>>\` (append) when redirecting output.
- Ignoring file encoding issues when transferring files between Windows and Linux (line endings, character encoding).

---

## Data Modelling Basics – Structuring Data for Purpose

Data modelling is the process of defining how data is organised, stored, and related. A data model is an abstraction that describes the entities in a domain, their attributes, and the relationships between them. There are different types of data models for different purposes: conceptual models describe what entities exist, logical models describe how entities relate, and physical models describe how data is actually stored in a database.

For a Data Engineer at the beginner level, the most important distinction is between operational (OLTP) and analytical (OLAP) data models. Operational models are optimised for fast individual transactions — inserting an order, updating a customer record. Analytical models are optimised for fast aggregation across large datasets — total sales by region, average response time by month.

**Why it matters:** Data modelling is the blueprint for everything a Data Engineer builds. A well-designed data model makes pipelines simpler, queries faster, and data consumers more productive. A poorly designed model forces complex, brittle transformations and produces confusing, unreliable outputs.

**Key things to understand:**

- Entity-Relationship (ER) diagrams as a visual tool for describing data models
- The difference between OLTP (operational, row-oriented, normalised) and OLAP (analytical, column-oriented, often denormalised)
- Cardinality: one-to-one, one-to-many, many-to-many relationships and how to implement each
- The concept of a source of truth: which system is the authoritative source for each piece of data
- Why the same data may need to be modelled differently depending on who consumes it and for what purpose
- Surrogate keys (system-generated identifiers) versus natural keys (business-meaningful identifiers like email or product code)

**Common pitfalls:**

- Designing a data model without understanding who will consume the data and what questions they need to answer.
- Using the same model for both operational and analytical workloads, resulting in a design that is suboptimal for both.
- Neglecting to document the data model; a model that exists only in someone's head is a single point of failure.
- Assuming data modelling is a one-time activity; models evolve as business requirements change.
`,
    mid: `# Data Engineer – Mid Concept Reference


This document explains the intermediate-level concepts covered in the Mid level of the Data Engineer learning path.

---

## Data Warehousing – Dimensional Modelling and Star Schema

A data warehouse is a central repository of structured data optimised for analytical queries. Unlike operational databases that are designed for fast individual transactions (insert one order, update one customer), a data warehouse is designed for fast aggregation across millions of rows (total sales by region by month, average claim processing time by product type).

Dimensional modelling, pioneered by Ralph Kimball, is the dominant technique for designing data warehouse schemas. The core building blocks are fact tables and dimension tables. A fact table stores the measurements of a business process (sales amount, number of claims, page views) along with foreign keys to dimension tables. Dimension tables store the descriptive context (who, what, where, when) that gives meaning to the facts. The star schema — a fact table surrounded by dimension tables — is called "star" because of its visual shape in an entity-relationship diagram.

**Why it matters:** Dimensional modelling is the foundation of every analytical data warehouse. Whether you use Snowflake, BigQuery, Synapse, or Redshift, the underlying design principles are the same. A well-designed dimensional model makes queries simple and fast; a poorly designed one forces complex joins, produces incorrect aggregations, and confuses every downstream consumer.

**Key things to understand:**

- Fact tables contain numeric measurements (additive facts like revenue, semi-additive facts like account balance, non-additive facts like ratios) and foreign keys to dimension tables
- Dimension tables contain descriptive attributes (customer name, product category, date, geography) and are typically denormalised for query performance
- Star schema: fact table at the centre, dimension tables radiating out; queries join the fact table to one or more dimensions
- Snowflake schema: dimensions are normalised into sub-tables; more storage-efficient but slower to query — star schema is preferred in most modern warehouses
- Slowly Changing Dimensions (SCD): strategies for handling changes to dimension attributes over time — Type 1 (overwrite), Type 2 (add new row with versioning), Type 3 (add column for previous value)
- Grain: the level of detail in a fact table (one row per transaction, per day, per customer-product combination); defining the grain is the single most important design decision

**Common pitfalls:**

- Not defining the grain of the fact table upfront, leading to a table that mixes different levels of detail and produces incorrect aggregations.
- Over-normalising dimension tables (snowflake schema) when a star schema would be simpler and faster.
- Storing calculated metrics in the fact table instead of computing them at query time; this creates maintenance burden and risks inconsistency.
- Ignoring Slowly Changing Dimensions, causing historical data to silently update when dimension attributes change.

---

## dbt (data build tool) – Transformations as Code

dbt is an open-source tool that enables Data Engineers to write data transformations as SQL SELECT statements and manage them with software engineering best practices: version control, testing, documentation, and modular design. dbt runs inside the data warehouse — it does not extract or load data; it transforms data that is already there (the T in ELT).

Each dbt model is a SQL file that defines a transformation. dbt handles the materialisation strategy (whether the result is a table, a view, an incremental table, or an ephemeral CTE), the dependency graph between models (which models depend on which), and the execution order. dbt also provides built-in testing (not null, unique, referential integrity, accepted values) and auto-generates documentation from the models and their descriptions.

**Why it matters:** dbt has become the industry standard for analytical transformations. It brings software engineering discipline — version control, code review, testing, CI/CD — to SQL transformations that were historically managed as ad hoc scripts or GUI-based ETL workflows. Understanding dbt is a core competency for any modern Data Engineer.

**Key things to understand:**

- Models: SQL SELECT statements stored in \`.sql\` files; each model produces a table or view in the warehouse
- Materialisation strategies: \`view\` (lightweight, always up to date), \`table\` (fast queries, rebuilt from scratch each run), \`incremental\` (appends or merges only new/changed data), \`ephemeral\` (CTE, never materialised)
- The \`ref()\` function: references another model, establishing a dependency; dbt uses these references to build the DAG (directed acyclic graph) and determine execution order
- Tests: \`schema.yml\` files define tests like \`not_null\`, \`unique\`, \`relationships\`, and \`accepted_values\`; custom tests can be written as SQL queries that return failing rows
- Sources: declare external tables that dbt reads from but does not manage; source freshness checks can alert when data has not been updated
- Jinja templating: dbt uses Jinja to add logic (if/else, loops, macros) to SQL, enabling DRY (Don't Repeat Yourself) transformations

**Common pitfalls:**

- Materialising everything as tables when views would be sufficient, wasting warehouse compute and storage.
- Not writing tests, defeating one of dbt's primary benefits; at minimum, test primary keys for uniqueness and not-null.
- Creating deeply nested model dependencies without clear staging/intermediate/mart layers, making the DAG hard to understand.
- Not using \`ref()\` consistently, which breaks the dependency graph and causes models to run in the wrong order.

---

## Apache Spark – Distributed Data Processing

Apache Spark is an open-source distributed computing engine designed for processing large datasets across a cluster of machines. Spark can handle batch processing, streaming, machine learning, and graph computation, but its primary use in data engineering is large-scale data transformation — processing datasets that are too large for a single machine.

Spark distributes data across the cluster as partitions and executes transformations in parallel across those partitions. The core abstraction is the DataFrame (and its predecessor, the RDD): a distributed collection of data organised into named columns, similar to a table in a relational database. Transformations (filter, join, aggregate) are lazy — they build up a plan of what to do. Actions (count, write, collect) trigger the actual execution of that plan.

**Why it matters:** Spark is the de facto standard for large-scale data processing. Whether you are running it on Databricks, Amazon EMR, Azure HDInsight, or a self-managed cluster, Spark is the engine behind most big data pipelines. Understanding how Spark distributes and processes data is essential for writing jobs that are correct and performant.

**Key things to understand:**

- Driver and executor model: the driver orchestrates the job; executors run on worker nodes and process partitions of data in parallel
- Lazy evaluation: transformations build a logical plan; only when an action is called does Spark create a physical plan and execute it
- DataFrames: the primary API; use named columns and support SQL-like operations (select, filter, groupBy, join, agg)
- Partitioning: data is split into partitions distributed across executors; the number and size of partitions affects parallelism and performance
- Shuffle: a shuffle occurs when data must be redistributed across partitions (e.g., during a join or groupBy); shuffles are the most expensive operation in Spark
- Reading and writing data in common formats: Parquet (columnar, compressed, the default for analytical data), CSV, JSON, Delta Lake

**Common pitfalls:**

- Calling \`collect()\` on a large DataFrame, pulling all data to the driver and causing out-of-memory errors; keep data distributed.
- Not understanding partitioning, resulting in too few partitions (underutilised cluster) or too many (excessive scheduling overhead).
- Writing jobs that create many small files ("small file problem"), degrading downstream read performance; use \`coalesce()\` or \`repartition()\` to control output file count.
- Ignoring the Spark UI when diagnosing performance issues; the UI shows stage execution, shuffle sizes, and skewed partitions.

---

## Apache Airflow – Workflow Orchestration

Apache Airflow is an open-source platform for authoring, scheduling, and monitoring workflows. In data engineering, Airflow is the most widely used tool for orchestrating data pipelines — defining the order in which tasks run, handling dependencies between tasks, retrying failed tasks, and providing visibility into pipeline execution.

An Airflow workflow is defined as a DAG (Directed Acyclic Graph): a collection of tasks with defined dependencies that determines execution order. Each task is an instance of an operator — a predefined template for a specific type of work (run a Python function, execute a SQL query, trigger a Spark job, call an API). DAGs are written in Python, which gives full flexibility to dynamically generate tasks, parameterise workflows, and integrate with any system that has a Python client.

**Why it matters:** Data pipelines are not single scripts — they are sequences of dependent steps that must run in the right order, on the right schedule, with proper error handling and monitoring. Airflow provides the orchestration layer that turns a collection of scripts into a reliable, observable production system.

**Key things to understand:**

- DAGs: Python files that define a workflow as a graph of tasks and their dependencies; DAGs are not the data processing logic themselves — they orchestrate it
- Operators: \`PythonOperator\` (run a Python function), \`BashOperator\` (run a shell command), \`SQLOperator\` (execute SQL), \`SparkSubmitOperator\`, and provider-specific operators for cloud services
- Task dependencies: \`task_a >> task_b\` means task_b runs only after task_a succeeds
- Scheduling: cron-based schedule definitions (\`@daily\`, \`@hourly\`, or explicit cron expressions); Airflow triggers DAG runs based on the schedule
- XComs: a mechanism for tasks to pass small amounts of data between each other; not designed for passing large datasets
- The Airflow UI: monitor DAG runs, inspect task logs, manually trigger runs, clear failed tasks for retry

**Common pitfalls:**

- Putting heavy data processing logic directly inside Airflow tasks; Airflow should orchestrate work, not perform it — delegate processing to Spark, dbt, or cloud services.
- Passing large datasets between tasks via XComs; XComs are stored in the Airflow metadata database and are meant for small values (file paths, status flags), not dataframes.
- Not setting \`retries\` and \`retry_delay\` on tasks, causing the entire pipeline to fail permanently on transient errors.
- Writing DAGs that are not idempotent; re-running a DAG for the same date should produce the same result, enabling safe backfills and retries.

---

## Azure Data Services – Data Factory and Synapse

Microsoft Azure provides a suite of managed data services for building data pipelines and analytical platforms. Azure Data Factory (ADF) is a cloud-based data integration service that orchestrates and automates the movement and transformation of data. Azure Synapse Analytics combines enterprise data warehousing with big data analytics in a single service, providing both dedicated SQL pools (for traditional warehousing) and Spark pools (for big data processing).

For a Data Engineer working in the Azure ecosystem, ADF is typically the orchestration layer (similar to Airflow but GUI-driven) and Synapse is the compute and storage layer for analytical workloads. Together, they form the backbone of a modern Azure data platform.

**Why it matters:** Cloud data services are where most new data platforms are built. Understanding how to provision, configure, and use Azure Data Factory and Synapse Analytics is a practical skill that directly translates to building production data pipelines. These services handle scaling, availability, and infrastructure management so the Data Engineer can focus on the data itself.

**Key things to understand:**

- Azure Data Factory: pipelines, activities, datasets, linked services, triggers; a visual orchestration tool for data movement and transformation
- Copy Activity: ADF's primary data movement tool; connects to 100+ data sources and sinks with built-in format conversion
- Data Flows: ADF's visual transformation engine for code-free ETL; runs on Spark under the hood
- Azure Synapse Analytics: dedicated SQL pools (provisioned compute for large-scale SQL analytics) and serverless SQL pools (pay-per-query for ad hoc exploration)
- Synapse Spark pools: managed Spark clusters integrated with the Synapse workspace for big data processing
- Integration Runtimes: the compute infrastructure that ADF uses to connect to data sources; Self-Hosted IR is needed for on-premises data sources
- Azure Blob Storage and Azure Data Lake Storage Gen2: the primary storage layers for raw and processed data in Azure

**Common pitfalls:**

- Using ADF Data Flows for every transformation when dbt or Spark would be more maintainable and testable for complex logic.
- Not understanding the cost model; dedicated SQL pools charge per hour regardless of usage, while serverless pools charge per TB scanned.
- Storing sensitive connection details (passwords, keys) directly in linked services instead of using Azure Key Vault.
- Not implementing incremental loading patterns in Copy Activities, causing full table copies on every pipeline run.

---

## Data Quality – Validation, Testing and Trust

Data quality is the degree to which data is accurate, complete, consistent, timely, and fit for its intended purpose. For a Data Engineer, data quality is not a nice-to-have — it is a core responsibility. If the data in the warehouse is wrong, every report, dashboard, and model built on it is wrong, and the entire data function loses the trust of its consumers.

Data quality must be built into pipelines, not checked after the fact. This means defining expectations for each dataset (expected row counts, not-null constraints, value ranges, referential integrity), implementing automated checks at each stage of the pipeline, and alerting when expectations are violated. Tools like Great Expectations, dbt tests, and custom validation scripts make this practical.

**Why it matters:** Data that cannot be trusted is worse than no data, because it leads to confident wrong decisions. Data quality issues are insidious — they often go unnoticed until someone makes a decision based on bad data and the consequences surface weeks or months later. Building data quality checks into pipelines is the Data Engineer's primary defence.

**Key things to understand:**

- Dimensions of data quality: accuracy (is the data correct?), completeness (are all expected records present?), consistency (does the data agree across systems?), timeliness (is the data fresh enough?), uniqueness (are there duplicates?)
- Schema validation: does the data conform to the expected structure (column names, data types)?
- Expectation-based testing: define explicit expectations (e.g., "column X is never null", "row count is within 10% of yesterday") and fail the pipeline when they are violated
- Great Expectations: an open-source framework for defining, running, and documenting data quality expectations
- dbt tests: \`not_null\`, \`unique\`, \`relationships\`, \`accepted_values\` — lightweight quality checks integrated into the transformation layer
- Data quality monitoring vs data quality testing: testing catches issues in the pipeline; monitoring tracks quality metrics over time to detect gradual degradation

**Common pitfalls:**

- Adding data quality checks only at the end of the pipeline; by then, bad data has already been processed and is harder to trace back to its source.
- Not alerting on data quality failures; a check that fails silently is no better than no check at all.
- Setting expectations too loosely (accepting any data) or too tightly (alerting on normal variation); calibrate expectations based on actual data behaviour.
- Assuming that if the pipeline ran without errors, the data is correct; a pipeline can succeed while producing incorrect or incomplete results.

---

## Docker – Containerising Data Pipelines

Docker packages an application and all its dependencies into a container — a lightweight, isolated execution environment that runs consistently across development, testing, and production. For a Data Engineer, Docker solves the persistent problem of environment inconsistency: "it works on my machine" becomes "it works in any environment that runs Docker."

A Dockerfile defines the blueprint for a container image: the base operating system, the dependencies to install, the code to include, and the command to run. Docker Compose extends this to multi-container setups, allowing a Data Engineer to run a local development environment that includes a database, an Airflow instance, and a custom pipeline service — all with a single command.

**Why it matters:** Modern data platforms run on containers. Airflow runs in Docker, Spark can run in Docker, dbt projects are packaged as Docker images for CI/CD, and cloud services like Azure Container Instances and Kubernetes all run containers. Understanding Docker is a prerequisite for deploying and operating data pipelines in any modern environment.

**Key things to understand:**

- \`Dockerfile\` instructions: \`FROM\`, \`WORKDIR\`, \`COPY\`, \`RUN\`, \`EXPOSE\`, \`ENV\`, \`CMD\`/\`ENTRYPOINT\`
- Image layers: each instruction creates a cached layer; order instructions from least to most frequently changing for faster builds
- Docker Compose: define multi-container applications in a \`compose.yaml\` file; services reference each other by name
- Volumes: persist data outside the container; without a volume, data inside a running container is lost when it stops
- Environment variables: inject configuration at runtime rather than baking it into the image
- Multi-stage builds: use one stage to build dependencies and another for the final image, keeping images small and secure

**Common pitfalls:**

- Running containers as root; always specify a non-root user in the Dockerfile.
- Baking secrets (passwords, API keys) into the Docker image; they become visible in the image history. Use environment variables or secrets managers at runtime.
- Not using \`.dockerignore\`, causing large directories (\`.git\`, \`node_modules\`, test data) to be included in the build context.
- Building monolithic images with everything installed rather than creating focused, minimal images.

---

## Advanced SQL – Window Functions, CTEs and Performance

Beyond basic SELECT queries, a Data Engineer needs advanced SQL skills for building complex transformations, writing efficient analytical queries, and understanding query performance. Window functions, CTEs, and performance tuning are the tools that separate a basic SQL user from a data engineering professional.

Window functions perform calculations across a set of rows that are related to the current row, without collapsing the result into a single row (as GROUP BY does). Common Table Expressions (CTEs) allow you to write modular, readable SQL by breaking complex queries into named steps. Query performance tuning involves understanding how the database engine executes your query and optimising it through better query structure, appropriate indexes, and statistics maintenance.

**Why it matters:** Data engineering SQL is not simple SELECT/WHERE queries — it involves complex multi-step transformations, deduplication, gap-filling, running totals, and ranking operations. Window functions and CTEs are the tools that make these transformations possible and readable. Performance tuning ensures they run in minutes, not hours.

**Key things to understand:**

- Window functions: \`ROW_NUMBER()\`, \`RANK()\`, \`DENSE_RANK()\`, \`LAG()\`, \`LEAD()\`, \`SUM() OVER()\`, \`AVG() OVER()\` with \`PARTITION BY\` and \`ORDER BY\`
- CTEs (\`WITH\` clause): named subqueries for readability; recursive CTEs for hierarchical data
- \`PARTITION BY\` in window functions: defines the groups within which the window function operates; different from \`GROUP BY\` because it does not collapse rows
- Query execution plans: \`EXPLAIN\` / \`EXPLAIN ANALYZE\` to see how the database executes a query and where the cost lies
- Index usage: understanding when the query engine uses an index versus a full table scan and why
- Common optimization patterns: avoid \`SELECT *\`, push filters early, minimise data before joining, use appropriate join strategies

**Common pitfalls:**

- Confusing \`ROW_NUMBER()\` (always unique), \`RANK()\` (gaps after ties), and \`DENSE_RANK()\` (no gaps); choose the right one for your deduplication or ranking logic.
- Writing CTEs that materialise unnecessarily large intermediate results; some databases materialise CTEs as temporary tables.
- Not checking execution plans for production queries; a query that works on small data may become unacceptably slow at scale.
- Using correlated subqueries when a JOIN or window function would be more efficient.
`,
    senior: `# Data Engineer – Senior Concept Reference


This document explains the advanced concepts covered in the Senior level of the Data Engineer learning path.

---

## Streaming and Apache Kafka – Real-Time Data Pipelines

Apache Kafka is a distributed event streaming platform designed for high-throughput, low-latency data pipelines. Unlike batch processing (where data is collected and processed on a schedule), streaming processes data continuously as it arrives. Kafka acts as a durable, distributed commit log: producers write events to topics, and consumers read from those topics, each at their own pace and position.

Kafka's architecture consists of brokers (servers that store and serve data), topics (logical categories of events), partitions (the unit of parallelism within a topic), producers (applications that write events), and consumers (applications that read events). Events are immutable and ordered within a partition. Consumer groups enable parallel processing: each partition is assigned to exactly one consumer in a group, and Kafka automatically rebalances when consumers join or leave.

For a Data Engineer, Kafka enables architectures where data is processed as soon as it is produced — enabling real-time dashboards, fraud detection, live recommendations, and event-driven microservices. Azure Event Hubs provides a Kafka-compatible managed alternative in the Azure ecosystem.

**Why it matters:** Batch processing introduces latency — hours or even days between when data is generated and when it is available for analysis. Streaming eliminates this latency for use cases where timeliness is critical. Understanding Kafka and stream processing is essential for building modern data platforms that serve both batch and real-time consumers.

**Key things to understand:**

- Topics and partitions: topics are logical groupings; partitions provide parallelism and ordering guarantees within a partition (not across partitions)
- Producers and consumers: producers write events (key-value pairs with optional headers); consumers read events from a specific offset and track their position
- Consumer groups: multiple consumers in a group share the partitions of a topic; each partition is consumed by exactly one group member
- At-least-once, at-most-once, and exactly-once delivery semantics: understand the trade-offs and when each is appropriate
- Event schemas: use a schema registry (e.g., Confluent Schema Registry) with Avro or Protobuf to enforce compatibility between producers and consumers
- Kafka Connect: a framework for streaming data between Kafka and external systems (databases, cloud storage, search indexes) without writing custom code

**Common pitfalls:**

- Choosing too few partitions, limiting consumer parallelism; choosing too many, creating overhead. Start with the expected peak throughput and adjust.
- Not handling consumer rebalancing gracefully; when partitions are reassigned, in-progress processing must be handled to avoid data loss or duplication.
- Using Kafka as a database; Kafka is a log, not a query engine. Store data in a purpose-built system for random access queries.
- Ignoring schema evolution; changing event schemas without a compatibility strategy breaks consumers.

---

## Lakehouse Architecture – Unifying the Data Warehouse and Data Lake

The lakehouse architecture combines the best features of data warehouses (structured data, ACID transactions, SQL analytics) with data lakes (scalable storage, support for unstructured data, open formats). The core idea is to store all data in open file formats (Parquet, ORC) on cheap cloud object storage (Azure Data Lake Storage, S3) while adding a metadata and transaction layer (Delta Lake, Apache Iceberg, Apache Hudi) that provides the reliability and query performance traditionally associated with data warehouses.

Before the lakehouse, organisations maintained two separate systems: a data lake for raw, unstructured data and a data warehouse for curated, structured data. This led to data duplication, complex ETL between the two systems, and inconsistency when the same data existed in different forms in different places. The lakehouse eliminates this dual architecture by making the lake reliable enough to serve as the warehouse.

**Why it matters:** The lakehouse is the dominant architectural pattern for modern data platforms. Databricks, Microsoft Fabric, and most cloud data strategies are converging on this model. Understanding the lakehouse — and the tradeoffs it makes compared to traditional warehouses and lakes — is essential for making sound architectural decisions.

**Key things to understand:**

- Open file formats: Parquet (columnar, compressed, the standard for analytical data), ORC (similar to Parquet, common in Hadoop ecosystems)
- Table formats: Delta Lake, Apache Iceberg, and Apache Hudi add ACID transactions, time travel, schema enforcement, and efficient upserts on top of Parquet files
- Separation of storage and compute: data lives in cloud object storage; compute engines (Spark, SQL engines) are provisioned independently and scaled as needed
- Medallion architecture: a common lakehouse pattern with Bronze (raw ingested data), Silver (cleaned and conformed data), and Gold (aggregated, business-ready data) layers
- Schema enforcement and schema evolution: Delta Lake can enforce that writes conform to a defined schema and evolve the schema safely without breaking readers
- Time travel: query historical versions of a table by timestamp or version number; essential for debugging, auditing, and reproducibility

**Common pitfalls:**

- Treating the lakehouse as "just a data lake with a fancy name"; the transaction and metadata layer is what makes it reliable, and skipping it means you still have an unreliable lake.
- Not implementing the medallion architecture (or a similar layered approach), resulting in a flat lake where raw and curated data are indistinguishable.
- Ignoring file compaction; Delta Lake and Iceberg accumulate small files over time that degrade query performance. Schedule regular \`OPTIMIZE\` / compaction operations.
- Assuming that lakehouse performance matches a dedicated data warehouse for all query patterns; complex interactive queries may still benefit from a dedicated SQL engine.

---

## Delta Lake – Reliable Data Storage at Scale

Delta Lake is an open-source storage layer that brings ACID transactions, scalable metadata handling, and time travel to cloud data lakes. Built on top of Parquet files, Delta Lake uses a transaction log (\`_delta_log/\`) to track every change to a table, enabling features that plain Parquet files cannot provide: atomic writes, consistent reads, schema enforcement, and the ability to roll back to previous versions.

For a Data Engineer, Delta Lake solves the fundamental reliability problem of data lakes. Without a transaction layer, concurrent writes can corrupt data, failed jobs can leave partial results, and there is no way to roll back a bad load. Delta Lake makes the data lake transactionally reliable, bringing it closer to the guarantees that traditional data warehouses provide.

**Why it matters:** Delta Lake is the default table format for Databricks and is widely supported across the Spark ecosystem. Understanding how Delta Lake works — transactions, versioning, merge operations — is essential for building reliable data pipelines on any lakehouse platform.

**Key things to understand:**

- Transaction log: every write to a Delta table creates a new JSON commit file in \`_delta_log/\`; the log is the source of truth for the table's state
- ACID transactions: writes are atomic (all or nothing) and isolated (concurrent readers see a consistent snapshot)
- Time travel: \`SELECT * FROM table VERSION AS OF 5\` or \`TIMESTAMP AS OF '2024-01-01'\`; enables auditing, debugging, and rollback
- \`MERGE INTO\`: Delta Lake's upsert command; matches rows between a source and target and performs insert, update, or delete operations in a single atomic transaction
- Schema enforcement (\`mergeSchema\` and \`overwriteSchema\`): prevents writes with incompatible schemas from corrupting the table
- \`OPTIMIZE\` and \`ZORDER\`: compact small files and co-locate related data for faster queries

**Common pitfalls:**

- Not running \`OPTIMIZE\` regularly, allowing small files to accumulate and degrade read performance.
- Using \`overwrite\` mode when \`merge\` would be more appropriate; overwrite replaces the entire table, while merge updates only the changed rows.
- Not setting a retention period for time travel; keeping all history indefinitely consumes storage. Use \`VACUUM\` to clean up old files.
- Ignoring partition strategy; over-partitioning creates many small files, while under-partitioning creates few large files — both degrade performance.

---

## Data Mesh – Decentralised Data Architecture

Data Mesh is an architectural and organisational paradigm proposed by Zhamak Dehghani that decentralises data ownership from a central data team to the domain teams that produce the data. It is built on four principles: domain ownership (each domain owns and serves its data as a product), data as a product (data is treated with the same rigour as a customer-facing product — discoverable, documented, reliable), self-serve data platform (a central platform team provides the infrastructure and tooling that domain teams use), and federated computational governance (policies are defined centrally but enforced computationally through the platform).

Data Mesh is a response to the scaling limitations of centralised data architectures. In traditional architectures, a central data team is responsible for ingesting, transforming, and serving data from all domains. This creates a bottleneck: the central team cannot keep up with the demands of all consumers, domain knowledge is lost in translation, and data quality suffers because the team that knows the data best is not responsible for it.

**Why it matters:** Data Mesh is increasingly adopted by large organisations as a strategy for scaling their data platforms. Whether you adopt Data Mesh fully or selectively apply its principles, understanding the model helps you reason about the organisational and architectural challenges of data at scale.

**Key things to understand:**

- Domain ownership: the team that produces the data is responsible for making it available as a reliable, well-documented data product
- Data as a product: each data product has an owner, an SLA, documentation, a schema, and quality guarantees — just like a software product
- Self-serve data platform: a central platform team provides tooling for storage, compute, pipeline orchestration, cataloguing, and access control so domain teams do not need to build infrastructure from scratch
- Federated governance: policies (naming conventions, security standards, privacy rules) are defined centrally but enforced automatically through the platform
- Data contracts: explicit agreements between data producers and consumers about the schema, semantics, and quality of a data product
- Data Mesh does not mean no central team; it means the central team's role shifts from building all pipelines to building the platform that enables domain teams

**Common pitfalls:**

- Adopting Data Mesh terminology without changing the organisational structure; Data Mesh is an organisational change as much as a technical one.
- Assuming every organisation needs Data Mesh; it solves scaling problems that small or mid-size data teams may not have.
- Neglecting the self-serve platform; without robust tooling, domain teams cannot realistically own their data products.
- Treating Data Mesh as a justification for removing all central oversight; federated governance is still governance.

---

## DataOps – CI/CD and Engineering Practices for Data

DataOps applies the principles of DevOps — version control, CI/CD, automated testing, monitoring, and collaboration — to data engineering. The goal is to make data pipelines as reliable, reproducible, and rapidly deployable as application code. DataOps treats data pipelines as software: they are version-controlled, tested, reviewed, and deployed through automated pipelines.

In practice, DataOps means: pipeline code (dbt models, Spark jobs, Airflow DAGs) is stored in Git and reviewed through pull requests. Automated tests (unit tests for transformation logic, data quality tests for output datasets) run in CI on every change. Deployments to staging and production are automated through CD pipelines. Monitoring and alerting detect data quality issues, pipeline failures, and SLA breaches in real time.

**Why it matters:** Without DataOps, data pipelines are deployed manually, tested ad hoc, and monitored by checking dashboards occasionally. This leads to frequent breakages, slow recovery, and a data platform that cannot keep pace with business demands. DataOps brings the engineering discipline that turns a fragile data platform into a reliable one.

**Key things to understand:**

- Version control for everything: dbt models, Airflow DAGs, Spark jobs, infrastructure-as-code (Terraform/Bicep), schema definitions, and data quality expectations
- CI for data: run linting, unit tests, and dbt \`compile\`/\`test\` on every pull request; catch errors before they reach production
- CD for data: automated deployment of pipeline changes to staging environments with integration tests, followed by promotion to production
- Data observability: monitoring data freshness (is data arriving on time?), volume (is the expected number of rows present?), schema changes (have columns been added/removed/renamed?), and quality (do values meet expectations?)
- Infrastructure as code: define data platform infrastructure (storage accounts, Spark clusters, databases) in code for reproducibility and auditability
- Automated rollback: when a deployment causes data quality issues, the ability to quickly roll back to the previous version is essential

**Common pitfalls:**

- Applying CI/CD to application code but not to data pipeline code, creating a two-tier system where data pipelines are less reliable.
- Not testing data transformations; "it ran without errors" is not the same as "it produced correct output."
- Monitoring only pipeline execution status (success/failure) without monitoring data quality; a pipeline can succeed while producing incorrect data.
- Over-engineering the DataOps platform before the team has the basics (version control, code review, basic testing) in place.

---

## GenAI for Data Engineering – AI-Assisted Development and Architecture

Generative AI is transforming data engineering in two ways: as a tool that assists Data Engineers in their daily work (writing SQL, generating pipeline code, debugging, documentation) and as a workload that data engineers must build infrastructure to support (vector databases, embedding pipelines, RAG systems, LLM serving).

As an assistive tool, GenAI accelerates routine tasks: writing dbt models from specifications, generating Spark transformations, explaining complex SQL queries, and creating documentation. As a workload, GenAI introduces new data engineering challenges: managing unstructured data at scale, building embedding and indexing pipelines, implementing retrieval-augmented generation (RAG) architectures, and ensuring data governance over AI training data.

**Why it matters:** Senior Data Engineers must understand both sides: how to use GenAI tools to be more productive, and how to build the data infrastructure that GenAI applications require. The organisations that can build reliable data foundations for GenAI will have a significant competitive advantage.

**Key things to understand:**

- AI-assisted SQL and pipeline development: use LLM tools to generate first drafts of dbt models, Spark jobs, and SQL queries from natural language specifications; always review and test the output
- RAG (Retrieval-Augmented Generation): an architecture where an LLM's response is grounded in retrieved documents; Data Engineers build the embedding pipeline, vector database, and retrieval infrastructure
- Vector databases and embeddings: embeddings are dense numerical representations of text; vector databases (Pinecone, Weaviate, Azure AI Search) enable similarity search over embeddings
- Data governance for AI: tracking data lineage through AI pipelines, ensuring training data complies with privacy regulations, and documenting what data was used to build AI features
- Cost management: GenAI workloads (embedding generation, LLM inference) can be expensive at scale; understanding token costs, batching strategies, and caching is important
- The organisation's AI Policy, AI Checklist, and Secure AI Framework define the governance requirements for any project involving GenAI

**Common pitfalls:**

- Trusting AI-generated SQL or pipeline code without thorough review and testing; LLMs produce plausible but potentially incorrect code.
- Building GenAI infrastructure without a clear use case and business justification; the infrastructure is expensive and complex.
- Ignoring data governance when building AI pipelines; training data provenance, PII handling, and model transparency are regulatory requirements, not optional extras.
- Not involving the security team when building RAG systems; prompt injection and data leakage are real risks that require security review.

---

## Data Governance and GDPR – Compliance-Driven Pipeline Design

Data governance is the set of policies, processes, and standards that ensure data is managed as a strategic asset — discoverable, trustworthy, secure, and compliant with regulations. For data engineers, governance is not an abstract management concept; it directly shapes how pipelines are designed, how data is stored and accessed, and what metadata must be captured.

Microsoft Purview provides the governance tooling in Azure: a unified data catalog for discovering and classifying data across the estate, automated sensitive data scanning, data lineage tracking, and policy management. For LF, Purview is the central tool for understanding what data exists, where it lives, who owns it, and how it flows through the organisation.

GDPR (General Data Protection Regulation) is the EU regulation that governs how personal data is collected, processed, stored, and deleted. For a Swedish insurance company handling sensitive personal data — health information, financial records, claims history — GDPR compliance is not optional and carries penalties of up to 4% of global turnover or 20 million EUR.

**Why it matters:** Data engineers build the pipelines that move and transform personal data. If those pipelines do not implement GDPR requirements — data minimisation, purpose limitation, storage limitation, and the right to erasure — the organisation is exposed to regulatory risk. Governance and compliance must be built into pipeline design from the start, not bolted on afterwards.

**Key things to understand:**

- Data minimisation: only collect and process the personal data that is strictly necessary for the stated purpose. Pipelines should not carry forward fields "just in case" — every personal data field must have a documented purpose
- Purpose limitation: personal data collected for one purpose cannot be reused for a different purpose without consent. Pipeline design must enforce this — a marketing analytics pipeline should not have access to claims health data
- Storage limitation: personal data must not be kept longer than necessary. Pipelines must implement retention policies — automated deletion or anonymisation after the retention period expires
- Right to erasure (right to be forgotten): data subjects can request deletion of their personal data. Data engineers must design pipelines and storage to support deletion requests, which is non-trivial in append-only systems like data lakes and Delta Lake (where time travel must also be addressed)
- Data lineage: Purview tracks how data flows from source through transformations to downstream consumers. This is essential for impact analysis (what breaks if a source changes?), compliance (where does personal data end up?), and debugging (where did this data come from?)
- Data classification: automatically or manually label data by sensitivity (public, internal, confidential, restricted). Classification drives access control — confidential data requires stricter access policies than internal data

**Common pitfalls:**

- Treating governance as a one-time cataloguing exercise rather than an ongoing practice integrated into pipeline development
- Building pipelines that copy personal data into multiple locations without tracking where it ends up, making deletion requests nearly impossible to fulfil
- Implementing retention policies in documentation but not in code — retention must be automated, not dependent on manual cleanup
- Ignoring pseudonymisation and anonymisation as engineering techniques. Pseudonymised data (where the identifier can be re-linked) is still personal data under GDPR; anonymised data (where re-identification is practically impossible) is not

---

## Change Data Capture (CDC) – Real-Time Data Synchronisation

Change Data Capture (CDC) is a pattern for identifying and capturing changes made to data in a source system and delivering those changes to downstream systems in near real-time. Instead of periodically extracting a full snapshot of a table (batch ETL), CDC captures only the inserts, updates, and deletes as they happen, dramatically reducing data latency and processing overhead.

Debezium is the leading open-source CDC platform. It works by reading the database's transaction log (Write-Ahead Log in PostgreSQL, binlog in MySQL, change feed in CosmosDB) and streaming change events to Apache Kafka or other message systems. This approach is non-invasive — it does not require changes to the source application or queries against the source database.

**Why it matters:** Many data engineering use cases require fresher data than daily batch ETL can provide. Real-time dashboards, fraud detection, event-driven microservices, and operational analytics all benefit from CDC. For an insurance company, CDC enables near-real-time claims tracking, instant policy change propagation, and timely fraud detection — moving from "we see yesterday's data" to "we see what just happened."

**Key things to understand:**

- CDC vs batch ETL: batch ETL extracts full snapshots at intervals (hourly, daily). CDC captures changes continuously. CDC reduces load on the source database (no full table scans), reduces latency (seconds to minutes vs hours), and reduces downstream processing (only changes need to be processed)
- Log-based CDC (Debezium's approach) reads the database transaction log, which records every change. This is the most reliable CDC method because it captures all changes without modifying the source application and handles deletes correctly
- Event structure: CDC events typically contain the operation type (insert/update/delete), the before and after state of the row, a timestamp, and transaction metadata. This enables downstream systems to apply changes accurately
- Kafka as the CDC transport: Debezium publishes change events to Kafka topics (one topic per table). Downstream consumers (data lake ingestion, stream processing, search index updates) subscribe to the relevant topics
- CosmosDB Change Feed: Azure's native CDC mechanism for CosmosDB. It provides an ordered sequence of changes that can be processed by Azure Functions or consumed directly
- Initial snapshot: when first setting up CDC, Debezium performs an initial snapshot of the existing data before switching to log-based streaming. This ensures downstream systems have the complete dataset

**Common pitfalls:**

- Not planning for schema evolution — when source tables change (new columns, type changes), CDC events change too. Downstream consumers must handle schema changes gracefully
- Ignoring the ordering guarantees of CDC events. Events within a single partition are ordered, but events across partitions may arrive out of order. Pipeline design must account for this
- Underestimating the operational complexity of running Debezium and Kafka in production — these are distributed systems that require monitoring, capacity planning, and incident response
- Treating CDC as a replacement for all batch ETL. Some workloads (large historical backfills, complex aggregations) are still better served by batch processing. CDC and batch are complementary patterns

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from data engineers building pipelines that feed AI systems to engineers using AI-assisted development tools.

**Why it matters:** The AI Policy directly affects data engineering work. Data engineers build the pipelines that prepare training data, serve features to models, and store AI-generated outputs. The policy's requirements around data classification, lineage tracking, and purpose limitation translate directly into pipeline design decisions.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- GDPR obligations apply to data pipelines that process personal data for AI purposes — training data, feature stores, and model outputs all fall under scope.
- Data lineage through AI pipelines must be traceable, ensuring that the organisation can answer the question "what data was used to produce this AI output?"

**Common pitfalls:**
- Building data pipelines for AI workloads without verifying that the use case has been registered and classified in the AI Register.
- Not applying GDPR data minimisation to AI training datasets — collecting and retaining more personal data than necessary for the stated purpose.
- Treating the AI Policy as an application-level concern only; data pipeline design decisions around retention, access control, and lineage are directly governed.

---

## AI-Powered Development for Data Engineers

AI-assisted development tools are changing how data engineers write and maintain pipeline code, SQL transformations, and infrastructure definitions. These tools can generate first drafts of dbt models, Spark jobs, SQL queries, and Airflow DAGs from natural language specifications — tasks that often follow well-documented patterns and are well-suited to AI assistance.

AI assistants are most effective for data engineering tasks when given precise context: the schema of the source and target tables, the transformation requirements, the existing naming conventions, and any data quality constraints. They can also help explain complex SQL queries, debug pipeline errors, and generate documentation for existing transformations.

**Why it matters:** Senior data engineers who use AI tools effectively can accelerate the development of routine pipeline components — particularly for boilerplate-heavy tasks like writing dbt staging models, creating Spark DataFrame transformations, or generating Airflow DAG definitions. Understanding the limitations is equally important: AI-generated SQL or pipeline code can contain subtle errors that produce incorrect data without raising runtime errors.

**Key things to understand:**
- AI-generated SQL and pipeline code must always be reviewed and tested before deployment. Plausible-looking queries can produce incorrect results due to subtle join, aggregation, or filter errors.
- Providing rich context (table schemas, sample data, transformation rules) dramatically improves the quality of AI-generated pipeline code.
- AI tools are well-suited for: generating dbt model boilerplate, writing data quality tests, translating between SQL dialects, explaining complex queries, and drafting documentation.
- AI tools are poorly suited for: designing data models (they lack knowledge of your specific business domain), writing security-sensitive data handling code without review, and tasks requiring deep understanding of production data volumes and performance characteristics.
- Data privacy applies to AI tool use: do not paste production data, customer records, or sensitive business data into AI assistants. Follow the organisation's AI Policy for approved tools.

**Common pitfalls:**
- Accepting AI-generated SQL without running it against test data and verifying the results match expectations.
- Using AI to generate complex transformations without understanding the underlying logic — this creates a maintenance burden when the generated code needs to be modified.
- Not establishing team conventions around AI tool use, leading to inconsistent pipeline patterns and code quality.

---

## Language Deep Dives

- [Python Deep Dive](/language/python) — Core language for data pipelines and ETL
- [SQL Deep Dive](/language/sql) — Essential for data warehousing and transformations
`,
  },
  'Data-Scientist': {
    overview: `# Data Scientist – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Data Scientists analyse data to generate insights and build predictive models. The role covers statistics, data manipulation, machine learning, visualisation, and communicating findings to business stakeholders.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| Python Foundations | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python Foundations | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| ML Overview | [All ML Concepts Explained in 22 min](https://www.youtube.com/watch?v=Fa_V9fP2tpU) | Video |
| Python for Data Science | [Python Full Course for Beginners – Programming with Mosh](https://www.youtube.com/watch?v=_uQrJ0TkZlc) | Video |
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
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |
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

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

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
  },
  'DevOps-Platform-Engineer': {
    overview: `# DevOps / Platform Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

DevOps and Platform Engineers build and maintain the infrastructure, pipelines, and tooling that enable teams to ship software reliably. The role covers CI/CD, cloud infrastructure, containerisation, scripting, observability, and platform security.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| DevOps Overview | [Every DevOps Tool Explained in 8 min](https://www.youtube.com/watch?v=EY1hsh-HCjo) | Video |
| Docker | [Learn Docker in 7 Easy Steps](https://www.youtube.com/watch?v=gAkwW2tuIqE) | Video |
| DevOps Roadmap | [roadmap.sh – DevOps](https://roadmap.sh/devops) | Interactive |
| DevOps Literacy | [DevOps Literacy – Pluralsight](https://app.pluralsight.com/paths/skills/devops-literacy) | Course |
| Linux Fundamentals | [roadmap.sh – Linux](https://roadmap.sh/linux) | Interactive |
| Bash Scripting | [Bash Scripting Tutorial – Ryan's Tutorials](https://ryanstutorials.net/bash-scripting-tutorial/) | Interactive |
| Git | [Git Fundamentals](Prerequisites/git.md) and [Branching Strategy](Prerequisites/Branching-Strategy.md) | Guide |

### After completing Beginner you should be able to:

- Explain the DevOps philosophy and the CALMS framework (Culture, Automation, Lean, Measurement, Sharing)
- Explain the difference between CI, Continuous Delivery, and Continuous Deployment
- Build and run a Docker container from a Dockerfile
- Navigate the Linux file system and manage processes from the command line
- Write basic Bash scripts (variables, loops, conditionals, exit codes)

For deep explanations of each concept, see the [Beginner Concept Reference](DevOps-Platform-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| System Design | [System Design Concepts in 10 min](https://www.youtube.com/watch?v=i53Gi_K3o7I) | Video |
| CI/CD and Pipelines | [GitHub Actions – Understanding workflows](https://docs.github.com/en/actions/using-workflows) | Docs |
| Azure Fundamentals | [Microsoft Learn – Azure Fundamentals](https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/) | Interactive |
| Infrastructure as Code | [Microsoft Learn – Bicep Fundamentals](https://learn.microsoft.com/en-us/training/paths/fundamentals-bicep/) | Interactive |
| Terraform | [HashiCorp – Get Started with Terraform on Azure](https://developer.hashicorp.com/terraform/tutorials/azure-get-started) | Interactive |
| PowerShell | [Automate Tasks with PowerShell – Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/powershell/) | Interactive |
| Kubernetes Basics | [roadmap.sh – Kubernetes](https://roadmap.sh/kubernetes) | Interactive |
| Observability | [Monitor Resources with Azure Monitor – Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/az-104-monitor-backup-resources/) | Interactive |
| OpenTelemetry | [OpenTelemetry – Getting Started](https://opentelemetry.io/docs/getting-started/) | Docs |
| Generative AI for IT | [Generative AI for IT Pros – Pluralsight](https://app.pluralsight.com/paths/skill/generative-ai-for-it-pros) | Course |
| Azure Policy | [Microsoft Learn – Intro to Azure Policy](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-policy/) | Interactive |
| Cost Management | [Microsoft Learn – Control Azure Spending](https://learn.microsoft.com/en-us/training/paths/control-spending-manage-bills/) | Interactive |

### After completing Mid you should be able to:

- Build a YAML-based CI/CD pipeline with stages, jobs, and steps
- Deploy infrastructure with Bicep and Terraform using plan/apply and what-if workflows
- Write PowerShell automation scripts for Azure management tasks
- Explain the difference between a Pod, Deployment, and Service in Kubernetes
- Configure Kubernetes deployments, services, and basic ingress
- Set up Azure Monitor diagnostic settings, KQL alert rules, and dashboards
- Instrument an application with OpenTelemetry and explain the three pillars of observability
- Define and assign Azure Policy rules to enforce organisational standards across subscriptions

For deep explanations of each concept, see the [Mid Concept Reference](DevOps-Platform-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| System Design – 30 Concepts | [System Design was HARD until I Learned these 30 Concepts](https://www.youtube.com/watch?v=s9Qh9fWeOAk) | Video |
| Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Domain-Driven Design | [DDD – Pluralsight Path](https://app.pluralsight.com/paths/skills/domain-driven-design) | Course |
| Enterprise GenAI Strategy | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Platform Engineering / Cloud Architecture | [Microsoft Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/) — Landing zones, governance, and cloud strategy | Docs |
| Architecture | [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/) — Operational excellence, security, reliability, performance, cost | Docs |
| Pipeline Security | [Microsoft Learn – Secure DevOps (AZ-400)](https://learn.microsoft.com/en-us/training/paths/az-400-develop-security-compliance-plan/) — Security in pipelines, SAST, DAST, compliance | Course |
| Platform Engineering | [CNCF Platforms White Paper](https://tag-app-delivery.cncf.io/whitepapers/platforms/) — Industry definition of platform engineering | Paper |
| GitOps | [Flux – Getting Started](https://fluxcd.io/flux/get-started/) | Docs |
| Container Security | [Microsoft Learn – Container Image Security in ACR](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-best-practices#manage-image-vulnerability) | Docs |

### After completing Senior you should be able to:

- Design a multi-environment infrastructure strategy using landing zones and hub-and-spoke topology
- Define platform engineering standards and golden paths for a development organisation
- Apply cloud-native architecture patterns (microservices, event-driven, circuit breaker, sidecar) and evaluate their operational trade-offs
- Evaluate and harden the security posture of a pipeline: secrets management, SAST/DAST gates, supply chain integrity, and least-privilege service principal scoping
- Apply Domain-Driven Design to draw team and platform boundaries that reduce coupling
- Design and operate enterprise GenAI infrastructure on Azure, including private networking, quota management, and cost observability

For deep explanations of each concept, see the [Senior Concept Reference](DevOps-Platform-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `
# DevOps / Platform Engineer – Beginner Concept Reference

This document provides in-depth explanations of the core concepts covered at the Beginner level. Use it alongside the resources in the learning path to build a solid foundation before moving on to the Mid level.

---

## 1. DevOps Philosophy – Culture, Automation and Feedback Loops

DevOps is a set of cultural and technical practices that brings development and operations teams together with a shared goal: delivering software reliably and frequently. It is not a tool or a job title. At its core, DevOps rests on three ideas – culture, automation, and feedback. Culture means that teams share responsibility for the full software lifecycle, from writing code to running it in production. Automation means removing manual, error-prone steps wherever possible. Feedback means measuring outcomes and using those measurements to improve continuously.

A useful framework for understanding DevOps in practice is CALMS: Culture (shared ownership and blameless learning), Automation (eliminating manual steps), Lean (small batch sizes and fast flow), Measurement (using data to understand system behaviour), and Sharing (transparency of knowledge and tooling across teams).

**Why it matters:**

A DevOps engineer exists to remove the friction between writing code and running code in production. Without a clear understanding of the underlying philosophy, it is easy to implement tools without achieving the actual goal. Knowing that DevOps is about shortening feedback loops helps you design pipelines, infrastructure, and processes that serve that purpose rather than adding ceremony.

**Key things to understand:**

- The Three Ways: Flow (work moves fast from dev to ops), Feedback (problems surface quickly), Continual Learning (failures become learning opportunities).
- DevOps is not about a specific toolset; tools serve the philosophy.
- Shared ownership means both developers and operations engineers are accountable for reliability.
- A blameless culture encourages reporting and learning from incidents rather than hiding them.
- CALMS: Culture, Automation, Lean, Measurement, Sharing – a concrete framework for assessing DevOps maturity.

**Common pitfalls:**

- Treating DevOps as purely a tooling exercise and neglecting the cultural dimension.
- Siloing the "DevOps team" as a separate unit rather than embedding practices across all teams.
- Skipping feedback mechanisms and only focusing on delivery speed.
- Confusing DevOps with Agile; they are complementary but distinct.

---

## 2. Continuous Integration and Continuous Delivery (CI/CD)

Continuous Integration (CI) is the practice of merging code changes into a shared branch frequently – typically multiple times per day – and validating each merge with automated builds and tests. The goal is to surface integration problems as early and cheaply as possible.

Continuous Delivery (CD) extends CI by ensuring that the validated code is always in a deployable state, ready to be released to production at any time. A human still decides when to trigger the release. Continuous Deployment goes one step further: every validated change is released to production automatically, without manual approval. The distinction matters because Continuous Deployment requires a much higher level of automated test coverage and organisational confidence.

**Why it matters:**

CI/CD is the backbone of modern software delivery. As a DevOps engineer you will design, build, and maintain the pipelines that implement these practices. Understanding the distinction between CI, Continuous Delivery, and Continuous Deployment helps you design pipelines that match the organisation's risk appetite and release cadence.

**Key things to understand:**

- CI requires a trigger – typically a push or pull request to a branch – that kicks off a build and test run.
- A pipeline should fail fast: run the cheapest and quickest checks first so developers get feedback in seconds, not hours.
- Continuous Delivery means the artifact is production-ready; a human still decides when to ship.
- Continuous Deployment removes that human gate; it requires high automated test coverage and confidence.
- Artifacts (compiled binaries, container images) should be built once and promoted through environments, not rebuilt per environment.

**Common pitfalls:**

- Long-running pipelines that discourage frequent commits.
- Testing only in one environment and skipping integration or end-to-end tests.
- Conflating Continuous Delivery with Continuous Deployment.
- Allowing pipeline scripts to differ between environments, which breaks the "build once, deploy many" principle.

---

## 3. Docker – Containers, Images, Dockerfile and Compose

Docker is a platform for packaging, distributing, and running applications inside containers. A container is an isolated process running on the host operating system: it shares the host kernel but has its own isolated file system, network stack, and process namespace. Containers are not virtual machines – there is no hypervisor and no guest OS; they are lightweight and start in milliseconds. An image is the read-only blueprint from which containers are created. A Dockerfile is a text file containing the instructions to build an image layer by layer. Docker Compose is a tool for defining and running multi-container applications using a single YAML file.

A minimal Dockerfile looks like this:

\`\`\`dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
\`\`\`

Each instruction (\`FROM\`, \`RUN\`, \`COPY\`) adds a cached layer. If only \`app.py\` changes, Docker reuses all previous layers and only rebuilds from the \`COPY . .\` instruction onwards, keeping builds fast.

**Why it matters:**

Containers solve the classic "it works on my machine" problem. By packaging the application and its environment together, you guarantee that what runs locally is identical to what runs in staging and production. DevOps engineers use Docker to build images in CI pipelines, push them to container registries, and deploy them to orchestration platforms such as Kubernetes.

**Key things to understand:**

- Images are immutable and layered; each instruction in a Dockerfile adds a layer that is cached independently.
- Containers share the host kernel – they are isolated processes, not full virtual machines.
- Containers are ephemeral; persistent data must be stored in volumes or external storage.
- The base image matters: using a minimal base image (such as a slim or distroless variant) reduces attack surface and image size.
- Multi-stage builds allow you to compile code in one stage and copy only the final artifact into a smaller production image.
- Docker Compose is suited for local development environments; it is not a production orchestration tool.

**Common pitfalls:**

- Running containers as root, which creates an unnecessary security risk.
- Storing secrets in environment variables baked into the image rather than injecting them at runtime.
- Ignoring the \`.dockerignore\` file and copying unnecessary files (node_modules, .git) into the build context.
- Not pinning base image versions, which leads to non-reproducible builds.

---

## 4. Linux – File System, Permissions and Process Management

Linux is the operating system that underlies the vast majority of cloud infrastructure, containers, and CI/CD agents. Understanding Linux means knowing how the file system is organised, how file permissions work, and how to inspect and control running processes. These are not advanced skills; they are the baseline required to work confidently on any server or inside any container.

**Why it matters:**

Almost every pipeline, container, and cloud virtual machine runs on Linux. When something breaks in production, you need to be able to SSH into a host, inspect logs, check running processes, and understand file ownership issues without relying on a graphical interface. These skills are the foundation of every other operational task.

**Key things to understand:**

- The Linux file system hierarchy: \`/etc\` for system configuration files, \`/var\` for variable data and logs (e.g. \`/var/log\`), \`/home\` for user home directories, \`/usr/bin\` and \`/bin\` for executable programs, \`/tmp\` for temporary files that are cleared on reboot.
- File permissions are expressed as three sets of read/write/execute bits for owner, group, and others. The \`chmod\` and \`chown\` commands control them.
- Every process has a PID (process ID) and runs under a user. \`ps\`, \`top\`, and \`htop\` are essential tools for inspection.
- Signals control processes: \`SIGTERM\` requests graceful shutdown; \`SIGKILL\` forces immediate termination without cleanup.
- Standard streams: stdin (0), stdout (1), stderr (2). Redirecting (\`>\`, \`2>\`) and piping (\`|\`) these is fundamental to scripting.

**Common pitfalls:**

- Setting permissions too broadly (e.g. \`chmod 777\`) to solve a problem quickly, creating security vulnerabilities.
- Forgetting that processes inside containers run as a user; root inside a container can still be dangerous if the container escapes.
- Confusing hard links and symbolic links.
- Not understanding that file descriptors remain open even after a file is deleted, which can cause disk space issues.

---

## 5. Bash Scripting – Variables, Loops, Conditionals and Scripts

Bash (Bourne Again Shell) is both a command-line interpreter and a scripting language. A Bash script is a plain text file containing a sequence of shell commands that the interpreter executes in order. Bash supports variables, conditionals, loops, functions, and input/output redirection, making it a powerful tool for automating repetitive tasks on Linux systems.

Here is a concrete example that shows the core building blocks together:

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="\${1:-staging}"

if [[ "$ENVIRONMENT" == "production" ]]; then
  echo "Deploying to production – proceeding with caution"
elif [[ "$ENVIRONMENT" == "staging" ]]; then
  echo "Deploying to staging"
else
  echo "Unknown environment: $ENVIRONMENT" >&2
  exit 1
fi

for SERVICE in api worker scheduler; do
  echo "Restarting $SERVICE..."
  # systemctl restart "$SERVICE"
done
\`\`\`

Note: variables are assigned without spaces around \`=\` (\`ENVIRONMENT="staging"\`), and always referenced with double quotes (\`"$ENVIRONMENT"\`) to prevent word splitting when values contain spaces.

**Why it matters:**

Bash scripts are the glue of automation. Pipeline steps, infrastructure setup scripts, and deployment helpers are routinely written in Bash because it is available on virtually every Linux system without installation. Understanding Bash lets you read, debug, and write the scripts that CI/CD systems execute.

**Key things to understand:**

- Always start a script with a shebang line: \`#!/usr/bin/env bash\`.
- Use \`set -euo pipefail\` at the top of scripts: \`-e\` exits on error, \`-u\` treats unset variables as errors, \`-o pipefail\` propagates pipe failures.
- Variables are assigned without spaces around \`=\` and referenced with \`$\`: \`name="world"\` then \`echo "$name"\`.
- Single quotes prevent all expansion (\`'$VAR'\` is literal). Double quotes allow variable and command substitution (\`"$VAR"\` expands).
- Exit codes: 0 means success; any non-zero value means failure. Check with \`$?\` or use \`||\` and \`&&\` for inline control flow.
- \`if [[ condition ]]\`, \`for item in list; do ... done\`, and \`while [[ condition ]]; do ... done\` cover most control flow needs.

**Common pitfalls:**

- Not quoting variables, leading to subtle bugs when values contain spaces.
- Forgetting \`set -e\`, allowing scripts to continue after a command fails silently.
- Using \`ls\` output in loops, which breaks on filenames with spaces; use globs (\`for f in /path/*\`) instead.
- Writing overly long scripts in Bash when a language like Python would be more maintainable and testable.

---

## 6. Version Control in a DevOps Context – Branching, Tagging and Release Flow

Version control – almost universally Git in modern environments – is the system that tracks changes to code over time, enables collaboration, and provides the audit trail required for controlled releases. In a DevOps context, version control is not just a storage mechanism; it is the trigger for automated pipelines and the source of truth for both application code and infrastructure definitions.

**Why it matters:**

Every CI/CD pipeline is driven by events in version control: a push, a pull request, or a tag. DevOps engineers need to understand branching strategies because they directly affect pipeline design. They also manage infrastructure-as-code and pipeline definitions in the same repository, so Git skills are inseparable from day-to-day work.

**Key things to understand:**

- Trunk-based development keeps a single long-lived branch and uses short-lived feature branches, enabling frequent integration.
- GitFlow uses longer-lived branches (develop, release, hotfix) and suits teams with fixed release schedules.
- Tags mark specific commits as significant – typically a release version. Semantic versioning (MAJOR.MINOR.PATCH) is the standard convention.
- Pull requests (or merge requests) are the gate through which code enters the main branch; they are the natural point to trigger CI.
- \`.gitignore\` prevents committing secrets, build artifacts, and IDE configuration files.
- Commit messages should be descriptive and follow a convention (such as Conventional Commits) to support automated changelog generation.

**Common pitfalls:**

- Committing secrets or credentials to a repository; once pushed, they must be considered compromised even if deleted later.
- Long-lived feature branches that accumulate large diffs and cause painful merge conflicts.
- Not using tags for releases, making it difficult to reproduce a specific deployed version.
- Force-pushing to shared branches, which rewrites history and disrupts collaborators.

---
`,
    mid: `
# DevOps / Platform Engineer – Mid Concept Reference

This document provides in-depth explanations of the core concepts covered at the Mid level. Use it alongside the resources in the learning path to deepen your technical knowledge before moving on to the Senior level.

---

## 1. YAML CI/CD Pipelines – Structure, Jobs and Steps

Modern CI/CD platforms commonly define pipelines in YAML files stored alongside application code. The exact filename varies by platform — for example \`.github/workflows/ci.yml\`, \`.gitlab-ci.yml\`, or another repository-local pipeline file. Regardless of platform, the core concepts are similar: a pipeline is triggered by repository events, contains one or more jobs, and each job contains a sequence of steps. Some platforms also group jobs into higher-level stages for approval or environment flow.

Here is a minimal platform-neutral example showing the hierarchy:

\`\`\`yaml
on:
  push:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - run: dotnet build
      - run: dotnet test --no-build

  deploy-staging:
    needs: build-and-test
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - run: echo "Deploying to staging"
\`\`\`

The exact keywords vary by platform, but the same ideas appear everywhere: one block defines what events start the pipeline, one defines where jobs run, and dependency keys control sequencing.

**Why it matters:**

YAML pipelines are the primary mechanism for automating builds, tests, and deployments in modern delivery platforms. Being able to read, write, debug, and refactor pipeline definitions is a core daily skill. Understanding the structural hierarchy prevents common mistakes around variable scoping, parallelism, and environment targeting.

**Key things to understand:**

- The hierarchy is typically: pipeline > stage (optional) > job > step. Each level can define its own variables and conditions.
- Dependency keys such as \`needs\` or \`dependsOn\` control sequencing between stages and jobs.
- Templates allow you to extract reusable stage, job, or step definitions into separate files and reference them with parameters.
- Shared variables and secret stores let you inject runtime configuration without hardcoding values in the pipeline definition.
- Environments represent deployment targets (such as staging or production) and often support approvals, protection rules, and deployment history.
- Hosted runners are ephemeral and reset between runs; self-hosted runners persist state between runs.

**Common pitfalls:**

- Hardcoding environment-specific values instead of using variables or parameters.
- Not using templates, leading to duplicated pipeline code across repositories.
- Storing secrets as plain-text pipeline variables instead of linking to a secret store or cloud vault.
- Forgetting that jobs in the same stage share no file system state unless artifacts are explicitly published and downloaded.

---

## 2. Azure Cloud Fundamentals – Compute, Storage, Networking and IAM

Azure is Microsoft's public cloud platform. Its core building blocks are compute (virtual machines, App Service, Azure Kubernetes Service, Azure Functions), storage (Blob Storage, Azure Files, managed disks), networking (Virtual Networks, subnets, Network Security Groups, Azure Load Balancer, DNS), and identity and access management (Microsoft Entra ID (formerly Azure Active Directory), role-based access control). Understanding these primitives is prerequisite knowledge for designing and deploying any workload on Azure.

Resources are always contained within a resource group, which in turn belongs to a subscription. Subscriptions sit within a management group hierarchy. This three-level nesting (management group > subscription > resource group) is where policies, budgets, and RBAC assignments are applied.

**Why it matters:**

As a DevOps or platform engineer on Azure, you provision and configure these resources using infrastructure-as-code tools. You need to understand what each resource type does, how resources communicate with each other, and how access is controlled before you can write correct Bicep or Terraform definitions.

**Key things to understand:**

- Resources are organised into resource groups; resource groups are organised into subscriptions; subscriptions belong to a management group hierarchy.
- Virtual Networks (VNets) isolate network traffic. Subnets segment VNets. Network Security Groups (NSGs) apply inbound and outbound rules at the subnet or NIC level.
- Azure RBAC assigns roles (Owner, Contributor, Reader, or custom roles) to security principals (users, groups, managed identities, service principals) at a specific scope.
- Managed identities allow Azure resources to authenticate to other Azure services without storing credentials.
- Azure regions and availability zones are distinct failure domains; deploying across zones improves resilience.

**Common pitfalls:**

- Granting Contributor or Owner scope at the subscription level when a narrower scope would suffice.
- Not using managed identities for service-to-service authentication, and using client secrets instead.
- Overlooking egress costs when designing storage and networking topologies.
- Confusing service endpoints with private endpoints; private endpoints are the preferred approach for securing PaaS services.

**Azure Key Vault:**

Azure Key Vault is the managed service for storing and accessing secrets, certificates, and encryption keys. Pipelines and applications should retrieve secrets from Key Vault at runtime rather than storing them in configuration files or pipeline variables. In Bicep you can reference Key Vault secrets as secure parameters; in Terraform you use the \`azurerm_key_vault_secret\` data source. Most CI/CD platforms can inject secrets from their own secret store or from a cloud vault during pipeline execution. Access to Key Vault should be granted through managed identities and scoped RBAC roles (Key Vault Secrets User, Key Vault Crypto User) rather than broad access policies.

---

## 3. Infrastructure as Code – Principles and Why It Matters

Infrastructure as Code (IaC) is the practice of defining and managing infrastructure resources – servers, networks, databases, and more – using machine-readable definition files rather than manual configuration or interactive tools. The definition files are stored in version control, reviewed like application code, and applied by automated tools that reconcile the desired state with the actual state of the infrastructure.

The key property that distinguishes good IaC from a bag of scripts is idempotency: applying the same definition multiple times must produce the same result. This is what makes IaC safe to run in automated pipelines without human supervision.

**Why it matters:**

IaC is the foundation of repeatable, auditable, and scalable infrastructure management. Without it, environments drift apart over time, incidents are hard to reproduce, and changes have no audit trail. With IaC, every change to infrastructure goes through a pull request, is reviewed, and is applied consistently across environments.

**Key things to understand:**

- Declarative IaC (Bicep, Terraform, ARM) describes the desired end state; the tool works out the sequence of API calls needed to reach it.
- Imperative IaC (scripts) describes the exact sequence of steps; it requires the author to handle ordering and idempotency manually.
- Idempotency means applying the same definition multiple times produces the same result; this is a required property of good IaC.
- Treat IaC code with the same quality standards as application code: review, testing, linting, and modularisation.
- Separate environment-specific values (subscriptions, names, sizes) from the structural template using parameter files or variable inputs.

**Common pitfalls:**

- Making manual changes to resources outside the IaC tool, causing state drift.
- Not storing state securely (relevant for Terraform); state files can contain sensitive values.
- Writing monolithic templates that are difficult to maintain; prefer small, composable modules.
- Skipping a plan or preview step before applying changes in production.

---

## 4. Bicep – Templates, Modules and Deployment

Bicep is a domain-specific language (DSL) developed by Microsoft for deploying Azure resources declaratively. It compiles to Azure Resource Manager (ARM) JSON templates, giving access to the full ARM API surface while providing a cleaner, more readable syntax. Bicep supports modules (reusable template fragments), parameters, variables, outputs, and conditions.

A minimal Bicep resource definition looks like this:

\`\`\`bicep
param location string = resourceGroup().location
param storageAccountName string

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

output storageAccountId string = storageAccount.id
\`\`\`

Every resource block specifies a \`type\` (the ARM resource type and API version), a \`name\`, a \`location\`, and the resource-specific \`properties\`. Parameters supply environment-specific values; outputs expose values for use in other templates or pipelines.

**Why it matters:**

Bicep is the first-class IaC language for Azure. It is tightly integrated with Azure CLI and modern CI/CD platforms, making it the natural choice for Azure-native teams. Understanding Bicep lets you define, review, and deploy Azure resources reproducibly.

**Key things to understand:**

- A Bicep file declares resources with \`resource\` blocks, inputs with \`param\`, computed values with \`var\`, and return values with \`output\`.
- Modules split large templates into smaller, reusable files referenced with the \`module\` keyword.
- The \`targetScope\` determines whether the template deploys to a resource group, subscription, management group, or tenant.
- The \`az deployment\` command family deploys Bicep; the \`--what-if\` flag previews changes without applying them.
- Parameter files (\`.bicepparam\` or JSON) supply environment-specific values to a template at deployment time.
- Conditions (\`if\`) and loops (\`for\`) allow dynamic resource definitions within a single template.

**Common pitfalls:**

- Not using \`--what-if\` before applying changes to production, leading to unexpected resource modifications or deletions.
- Embedding secrets as plain-text parameters instead of referencing Key Vault secrets.
- Creating deep module nesting that makes the template hard to follow.
- Forgetting that some Azure resource properties are not idempotent; re-deploying can cause downtime if not handled carefully.

---

## 5. Terraform – Providers, State, Plan and Apply

Terraform is an open-source IaC tool by HashiCorp that uses a declarative configuration language (HCL – HashiCorp Configuration Language) to define infrastructure across multiple cloud providers and services. Terraform tracks the current state of managed infrastructure in a state file (\`terraform.tfstate\`) and calculates the difference between the current state and the desired configuration to produce a plan of changes before applying them.

A minimal Terraform configuration for an Azure resource group and storage account:

\`\`\`hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstateaccount"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}

provider "azurerm" {
  # The features block is optional in v4 of the AzureRM provider
}

resource "azurerm_resource_group" "main" {
  name     = "my-app-rg"
  location = "West Europe"
}

resource "azurerm_storage_account" "main" {
  name                     = "myappstore001"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
\`\`\`

The workflow is always: \`terraform init\` (download providers) → \`terraform plan\` (preview changes) → \`terraform apply\` (execute changes). Never skip \`plan\` in production.

**Why it matters:**

Terraform is the dominant multi-cloud IaC tool and is widely used even in Azure-primary environments, particularly when infrastructure spans multiple providers. Understanding Terraform's state model, provider ecosystem, and plan/apply workflow is essential for operating it safely at scale.

**Key things to understand:**

- Providers are plugins that define the resource types available; the AzureRM provider covers Azure resources.
- State is stored in a backend (locally by default; remotely in Azure Blob Storage or Terraform Cloud in team environments). Remote state is required for collaboration.
- \`terraform plan\` computes the change set; \`terraform apply\` executes it. Never skip the plan step in production workflows.
- State locking prevents concurrent modifications; remote backends support locking natively.
- Modules group related resources for reuse; input variables and output values define their interface.
- \`terraform import\` brings existing resources under Terraform management without recreating them.

**Common pitfalls:**

- Using local state in team environments, causing state conflicts when multiple engineers run Terraform simultaneously.
- Not protecting the state file; it can contain sensitive values such as connection strings and passwords.
- Running \`terraform apply\` without reviewing the plan output, risking accidental resource destruction.
- Overusing \`depends_on\` instead of relying on implicit dependencies through resource attribute references.

---

## 6. PowerShell – Automation and Azure Management

PowerShell is a cross-platform scripting language and shell built on .NET. It is object-oriented: commands (called cmdlets) output structured objects rather than text, making it easier to filter, sort, and transform data without fragile string parsing. The \`Az\` PowerShell module provides cmdlets for managing every Azure resource type. PowerShell is the dominant scripting language in Windows-centric and Azure-heavy environments.

**Why it matters:**

Many organisations use PowerShell for Azure management tasks, release automation, and operational scripts. Most CI/CD platforms support PowerShell steps natively. Being able to write, read, and debug PowerShell scripts is necessary for working in these environments and for understanding existing automation.

**Key things to understand:**

- Cmdlets follow a Verb-Noun naming convention: \`Get-AzResourceGroup\`, \`New-AzStorageAccount\`, \`Remove-AzWebApp\`.
- The pipeline (\`|\`) passes objects, not text, between cmdlets. \`Where-Object\` filters, \`Select-Object\` projects, \`ForEach-Object\` iterates.
- Variables are prefixed with \`$\`. Arrays use \`@()\`. Hash tables (dictionaries) use \`@{}\`.
- \`try / catch / finally\` handles errors; \`$_\` inside a catch block refers to the current exception.
- \`Connect-AzAccount\` authenticates to Azure; in pipelines, use a service principal or managed identity instead of interactive login.
- Always use \`Write-Verbose\` and \`Write-Error\` rather than \`Write-Host\` in reusable scripts to support proper output handling.

**Common pitfalls:**

- Using \`Write-Host\` in scripts that are consumed programmatically; its output cannot be captured in a pipeline.
- Ignoring error handling, allowing scripts to continue silently after failures.
- Hardcoding credentials or subscription IDs in scripts instead of using parameters or environment variables.
- Not using \`-ErrorAction Stop\` when calling cmdlets that do not throw terminating errors by default.

---

## 7. Kubernetes – Pods, Deployments, Services and Ingress

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerised applications. It introduces a set of resource types with distinct roles: the Pod is the smallest deployable unit; a Deployment manages a fleet of identical Pods; a Service provides a stable network address for reaching those Pods; an Ingress exposes HTTP/HTTPS routes from outside the cluster to Services.

Understanding the difference between these four resource types is the foundation of working with Kubernetes:

| Resource | Role |
|---|---|
| **Pod** | One or more containers that share a network namespace, storage volumes, and lifecycle. The atomic unit Kubernetes schedules and restarts. |
| **Deployment** | Declares a desired number of Pod replicas and manages rolling updates and rollbacks. You almost never create Pods directly; you create Deployments. |
| **Service** | A stable virtual IP and DNS name that load-balances traffic across all healthy Pods matching a label selector. Pods come and go; the Service address stays constant. |
| **Ingress** | Routes external HTTP/HTTPS traffic to Services based on hostname or path rules. Requires an Ingress controller (such as NGINX or the Azure Application Gateway Ingress Controller) to be installed in the cluster. |

The \`kubectl\` command-line tool is used to interact with a cluster: \`kubectl apply -f manifest.yaml\`, \`kubectl get pods\`, \`kubectl describe deployment\`, \`kubectl logs\`.

**Why it matters:**

Kubernetes is the standard platform for running containerised workloads in production. DevOps engineers provision clusters, write manifest files, configure deployments, manage secrets, and troubleshoot running workloads. Azure Kubernetes Service (AKS) is the managed offering on Azure, but understanding the underlying Kubernetes concepts is necessary to use it effectively.

**Key things to understand:**

- A Pod wraps one or more containers that share a network namespace and storage. Pods are ephemeral; when a Pod dies, its local storage is lost.
- A Deployment manages a ReplicaSet of Pods and performs rolling updates by default; \`maxUnavailable\` and \`maxSurge\` control the update strategy.
- A Service selects Pods by label and provides a stable cluster-internal DNS name and virtual IP; type \`LoadBalancer\` exposes it externally.
- Namespaces partition a cluster into logical groups; use them to separate environments or teams on shared clusters.
- ConfigMaps and Secrets inject configuration and sensitive values into Pods without baking them into images.
- Resource requests and limits control how much CPU and memory a Pod can use; setting them correctly is required for reliable scheduling.
- Liveness and readiness probes tell Kubernetes when to restart a container and when to send it traffic.

**Common pitfalls:**

- Creating Pods directly instead of using a Deployment; bare Pods are not restarted if they fail.
- Running Pods with no resource requests or limits, allowing one workload to starve others on the node.
- Storing secrets in ConfigMaps (plain text) instead of Kubernetes Secrets, or not integrating with an external secrets manager.
- Not setting readiness probes, causing traffic to be routed to Pods that are not yet ready to serve.
- Applying manifests directly to production clusters without a pipeline, bypassing audit and approval controls.

**Azure Container Registry (ACR):**

Azure Container Registry is a managed Docker registry for storing and distributing container images. ACR integrates natively with AKS – you can attach an ACR instance to a cluster so that nodes pull images without separate credentials. ACR supports automated vulnerability scanning through Microsoft Defender for Containers, image signing for supply chain integrity, and geo-replication for multi-region deployments. In a typical workflow, the CI pipeline builds an image, pushes it to ACR, and the CD pipeline deploys from ACR to AKS.

---

## 8. Observability – Metrics, Logs, Traces and the Three Pillars

Observability is the ability to understand the internal state of a system from its external outputs. The three pillars are metrics, logs, and traces. Each pillar answers a different kind of question: metrics tell you something is wrong, logs tell you what happened, and traces tell you where it happened across service boundaries.

- **Metrics** are numerical measurements aggregated over time (request rate, error rate, CPU usage, latency percentiles). They are cheap to store at scale and ideal for alerting on known failure modes.
- **Logs** are timestamped event records emitted by running software. Structured logs (formatted as JSON) are far easier to query and filter than unstructured text lines.
- **Traces** record the journey of a single request through a distributed system. Each operation is a span; spans are linked by a shared trace ID propagated through HTTP headers. Traces are essential in microservice architectures where a single user action touches many services.

Together these three signals allow engineers to detect problems (metrics), understand their context (logs), and identify where in the call graph they originated (traces).

**Why it matters:**

You cannot operate a system you cannot observe. A DevOps engineer is responsible for ensuring that production systems emit sufficient telemetry and that the tooling to collect, store, and query that telemetry is in place. Without observability, incidents take longer to detect and resolve.

**Key things to understand:**

- Metrics are cheap to store and query at scale; they are ideal for alerting on known failure modes (error rate, latency, saturation).
- Logs provide context for individual events; structured logs (JSON) are far easier to query than unstructured text.
- Traces correlate work across service boundaries using a trace ID propagated through requests; they are essential in microservice architectures.
- The RED method for services: Rate (requests per second), Errors (error rate), Duration (latency).
- The USE method for resources: Utilisation, Saturation, Errors.
- Service Level Indicators (SLIs), Service Level Objectives (SLOs), and error budgets provide a principled framework for reliability targets.

**Common pitfalls:**

- Logging too much (noise) or too little (blindness); aim for actionable, structured events.
- Alerting on symptoms that are not user-facing, generating alert fatigue without improving reliability.
- Not propagating trace context across service calls, producing disconnected traces.
- Collecting metrics and logs but never defining SLOs, leaving no shared definition of "good enough".

---

## 9. Azure Monitor and Application Insights

Azure Monitor is the unified observability platform for Azure. It collects metrics and logs from Azure resources, virtual machines, containers, and custom applications. Log Analytics workspaces store log data and expose it via the Kusto Query Language (KQL) for ad hoc analysis and alerting. Application Insights is a feature of Azure Monitor focused on application performance monitoring: it collects request rates, dependency calls, exceptions, and custom events from instrumented applications.

**Why it matters:**

Azure Monitor is the first place to look when something is wrong with a workload running on Azure. DevOps engineers configure diagnostic settings to route resource logs to Log Analytics, write KQL queries to investigate incidents, create alert rules to notify on-call engineers, and build dashboards to communicate system health to stakeholders.

**Key things to understand:**

- Diagnostic settings on each Azure resource control which categories of metrics and logs are sent to which destinations (Log Analytics, Storage, Event Hub).
- KQL is the query language for Log Analytics; understanding \`where\`, \`summarize\`, \`project\`, \`join\`, and \`render\` covers most operational needs.
- Alert rules define a condition (a KQL query or a metric threshold), an evaluation frequency, and an action group (email, webhook, PagerDuty).
- Application Insights uses a connection string (not an instrumentation key in modern SDKs) to identify where to send telemetry.
- Workbooks provide interactive, parameterised dashboards built on KQL queries and Azure resource data.
- Availability tests in Application Insights run synthetic HTTP checks against public endpoints and alert on failures.

**Common pitfalls:**

- Not enabling diagnostic settings, leaving resources with no log data in Log Analytics.
- Writing alert rules on raw log counts without accounting for periods of low traffic, causing false positives or false negatives.
- Sampling telemetry too aggressively in Application Insights, losing rare but important events.
- Treating dashboards as a one-time setup; they need to evolve as the system and its failure modes change.

---

## 10. OpenTelemetry – Instrumentation and Vendor-Neutral Telemetry

OpenTelemetry is a CNCF (Cloud Native Computing Foundation) project that provides a vendor-neutral set of APIs, SDKs, and tooling for generating, collecting, and exporting telemetry data – traces, metrics, and logs – from applications and infrastructure. It emerged from the merger of OpenTracing and OpenCensus and is now the standard approach to instrumentation. Applications are instrumented with the OpenTelemetry SDK; telemetry is collected by the OpenTelemetry Collector and exported to any compatible backend.

The separation between instrumentation (SDK in the application) and export (Collector to backend) is the key design decision. You instrument code once and then route the telemetry to any backend – Azure Monitor, Jaeger, Prometheus, Grafana – by reconfiguring the Collector, with no code changes needed.

**Why it matters:**

OpenTelemetry decouples instrumentation from the observability backend. For a DevOps engineer, this means less vendor lock-in and the ability to change observability tooling independently of application releases.

**Key things to understand:**

- The OpenTelemetry SDK instruments application code; automatic instrumentation libraries handle common frameworks (HTTP clients, database drivers) without code changes.
- The OpenTelemetry Collector is a standalone agent or gateway that receives, processes, and exports telemetry. It supports multiple receivers, processors, and exporters.
- Context propagation carries trace context (trace ID, span ID) across process boundaries via HTTP headers (W3C TraceContext standard).
- The Azure Monitor Exporter sends OpenTelemetry data to Application Insights; this is the recommended integration path for Azure workloads.
- Semantic conventions define standard attribute names for common concepts (HTTP method, database name, error type), enabling consistent querying across services.
- Resource attributes describe the source of telemetry: service name, version, environment. These are attached to all spans and metrics from a service.

**Common pitfalls:**

- Confusing the OpenTelemetry SDK (instrumentation in the application) with the Collector (collection and export pipeline); they are separate components with different deployment patterns.
- Not setting the service name resource attribute, making it impossible to filter telemetry by service in the backend.
- Sampling traces at the SDK level without considering the impact on tail-latency analysis and rare error investigation.
- Overlooking log correlation; structured logs need to include the trace ID to be joinable with trace data in the backend.

---
`,
    senior: `
# DevOps / Platform Engineer – Senior Concept Reference

This document provides in-depth explanations of the core concepts covered at the Senior level. Use it alongside the resources in the learning path to develop the strategic and architectural thinking expected of a senior DevOps or platform engineer.

---

## 1. Platform Engineering – Internal Developer Platforms and Golden Paths

Platform engineering is the discipline of building and operating internal developer platforms (IDPs) that reduce cognitive load for application teams. An IDP abstracts away the complexity of infrastructure, pipelines, and operational tooling behind self-service interfaces. A golden path is an opinionated, pre-approved, well-supported route for accomplishing a common task – creating a new service, deploying to a specific environment, or setting up observability – that teams can follow without needing deep platform expertise.

The key mental shift is treating the platform as a product. This means understanding who uses it (developers), what problems they face (slow provisioning, inconsistent environments, security toil), and continuously improving based on their feedback – exactly as a product team would.

**Why it matters:**

At the senior level, the goal shifts from doing DevOps work yourself to enabling other engineers to do it correctly and efficiently. Platform engineering operationalises this shift. Instead of being a bottleneck – approving every pipeline change or infrastructure request – you build the guardrails, templates, and automation that let teams move independently while still meeting compliance, security, and reliability standards.

**Key things to understand:**

- A platform is a product; it requires product thinking, user research (developer experience), roadmaps, and support.
- Golden paths are not mandates; they are designed to be the easiest option, not the only option.
- Platform APIs (REST, CLI, portal) allow teams to request resources without opening tickets or waiting for manual provisioning.
- Backstage (by Spotify) is a widely adopted open-source framework for building software catalogues and IDP portals.
- Measuring platform adoption, time-to-first-deployment, and developer satisfaction is as important as measuring uptime.
- The team topologies model (Stream-aligned, Platform, Enabling, Complicated-subsystem) provides vocabulary for positioning a platform team relative to delivery teams.

**Common pitfalls:**

- Building a platform without talking to its users, resulting in golden paths nobody actually wants to follow.
- Treating the platform as infrastructure rather than a product, leading to poor documentation and no support model.
- Over-standardising too early, before understanding the real diversity of team needs.
- Neglecting the migration path for teams already using non-standard approaches.

---

## 2. Advanced System Design for Infrastructure

System design for infrastructure means making deliberate architectural decisions about how cloud resources are structured, how they communicate, how they scale, and how they recover from failures. At the senior level, this goes beyond deploying individual resources and encompasses multi-region topologies, network segmentation, landing zone design, capacity planning, and the trade-offs between availability, cost, and operational complexity.

**Why it matters:**

Senior engineers are expected to own architectural decisions that affect the entire organisation. Poor infrastructure design leads to outages, security breaches, runaway costs, and teams blocked on shared bottlenecks. Good design creates a foundation that is safe to change, easy to operate, and capable of absorbing growth.

**Key things to understand:**

- Landing zones are the pre-configured, policy-enforced Azure environments into which workloads are deployed. They implement network topology, IAM baselines, logging, and cost guardrails at the subscription level.
- Hub-and-spoke network topology centralises shared services (firewalls, DNS, connectivity) in a hub VNet; workload VNets peer to the hub.
- Availability zones and regions provide different levels of fault isolation. Design for zone redundancy before region redundancy; region failover is expensive and complex.
- Capacity planning requires understanding both current usage and the growth trajectory. Autoscaling handles short-term bursts; capacity planning handles structural growth.
- Cost allocation – tagging resources with team, environment, and application identifiers – enables chargeback and identifies waste.
- Change management for infrastructure must account for dependencies; a shared database change can affect dozens of services.

**Common pitfalls:**

- Designing for maximum availability without considering the operational cost of maintaining that design.
- Not enforcing landing zone guardrails through policy, relying on documentation and trust instead.
- Underestimating the complexity of cross-region failover; it requires data replication, DNS failover, and application-level support.
- Treating tagging as optional, making cost attribution and incident scoping impossible later.

**Disaster Recovery and Business Continuity:**

For an insurance organisation, disaster recovery (DR) and business continuity are non-negotiable. A DR strategy defines how systems are restored after a major failure, and it is governed by two key metrics: Recovery Point Objective (RPO) – the maximum acceptable data loss measured in time – and Recovery Time Objective (RTO) – the maximum acceptable downtime before services must be operational again. Key considerations include:

- **Azure Site Recovery** replicates virtual machines and workloads to a secondary region, enabling automated failover when the primary region becomes unavailable.
- **Backup strategies** should cover databases (geo-redundant backups, point-in-time restore), storage accounts (geo-redundant storage with failover), and infrastructure definitions (stored in version control and deployable to any region).
- **Failover testing** must be practised regularly, not only documented. Untested DR plans fail when they are needed most. Schedule periodic failover drills and document the results.
- **Data sovereignty and compliance** requirements may constrain which Azure regions can serve as failover targets; verify this before designing the DR topology.

---

## 3. Security in Pipelines – Secrets Management, SAST, DAST and Supply Chain

Pipeline security encompasses the practices and controls that prevent pipelines from becoming a vector for compromising systems. This includes how secrets are managed and injected into builds, how code and dependencies are analysed for vulnerabilities, and how the integrity of the software supply chain – from source code to production artifact – is verified. SAST (Static Application Security Testing) analyses source code without executing it. DAST (Dynamic Application Security Testing) tests a running application by sending it crafted requests.

A compromised pipeline is a high-value attack target because it runs with elevated permissions, has access to production secrets, and can push code to production without a human reviewing the change. Pipeline security is therefore not optional hygiene – it is a core engineering responsibility.

**Why it matters:**

As the person who builds and owns pipelines, a senior DevOps engineer is directly responsible for preventing pipeline compromise. Regulators and security teams increasingly audit pipeline configurations, and a weak pipeline can block certification or cause compliance failures.

**Key things to understand:**

- Secrets must never appear in pipeline logs, environment variables baked into images, or version control. Use Azure Key Vault, HashiCorp Vault, or pipeline-native secret variable groups with masked output.
- SAST tools (such as Semgrep, CodeQL, or SonarQube) run against source code and flag known vulnerability patterns, insecure API usage, and hardcoded credentials. Integrate them as pipeline gates, not optional scans.
- DAST tools (such as OWASP ZAP) probe a deployed application for injection, authentication, and configuration vulnerabilities.
- Software Bill of Materials (SBOM) documents all components in a release artifact; it enables rapid response when a CVE affects a dependency.
- Dependency scanning checks third-party libraries against vulnerability databases; pin dependency versions and review updates deliberately.
- Build provenance (SLSA framework levels) provides a verifiable record of how an artifact was built, linking a production image back to a specific source commit and pipeline run.

**Common pitfalls:**

- Treating SAST and DAST as one-time audits rather than continuous pipeline gates.
- Granting pipeline service principals overly broad permissions (Contributor at subscription scope is a common mistake).
- Not reviewing third-party pipeline tasks or GitHub Actions before using them; they execute in a trusted context and can exfiltrate secrets.
- Ignoring the dependency update backlog, allowing known vulnerabilities to remain in production indefinitely.

---

## 4. Domain-Driven Design Applied to Platform Boundaries

Domain-Driven Design (DDD) is a software design approach that aligns the structure of a system with the business domains it serves. Key concepts include bounded contexts (explicit boundaries within which a specific model is valid), ubiquitous language (shared vocabulary used consistently by both technical and business stakeholders), aggregates (clusters of objects treated as a unit), and context maps (diagrams that show how bounded contexts relate to one another). Applied to infrastructure and platform design, DDD helps define where platform boundaries should be drawn and how teams should own and interface with services.

**Why it matters:**

At scale, the hardest problems in platform engineering are not technical – they are organisational. Where does one team's responsibility end and another's begin? Which services should be shared and which should be owned per team? DDD provides a disciplined vocabulary and set of patterns for answering these questions in a way that reduces coupling and enables autonomous team operation.

**Key things to understand:**

- A bounded context is the natural unit of platform ownership; each team owns the services within its context and exposes them through a well-defined interface.
- Context maps reveal integration patterns: shared kernel (shared code or schema), customer-supplier (upstream/downstream dependency), and anti-corruption layer (translation between incompatible models).
- The ubiquitous language of a platform team includes terms like environment, deployment, artifact, and pipeline; aligning on these terms with consuming teams prevents misunderstandings.
- Strategic design decisions (which contexts are core, supporting, or generic) guide where to invest engineering effort and what to buy or reuse rather than build.
- Microservice decomposition boundaries should follow bounded context boundaries, not technical layers.

**Common pitfalls:**

- Drawing service boundaries along technical layers (database service, API service, UI service) rather than business capability boundaries.
- Allowing bounded contexts to become entangled through shared databases or tight API coupling, undermining autonomy.
- Applying tactical DDD patterns (aggregates, repositories) without the strategic layer (bounded contexts, context maps), which provides most of the value at the platform level.
- Skipping the collaborative modelling step (event storming, context mapping workshops) and designing boundaries in isolation.

---

## 5. Architecture Patterns for Cloud-Native Systems

Cloud-native architecture patterns are design approaches that exploit the characteristics of cloud infrastructure – elasticity, managed services, distributed execution, and pay-per-use pricing – rather than treating the cloud as a virtualised data centre. Key patterns include microservices, event-driven architecture, the strangler fig (migrating from monolith to services), CQRS (Command Query Responsibility Segregation), the sidecar pattern, and the circuit breaker pattern.

**Why it matters:**

Senior DevOps engineers participate in architecture reviews and are expected to evaluate whether proposed designs are operationally sound. A pattern that looks elegant on a whiteboard can be operationally nightmarish if it produces excessive inter-service latency, complicates deployment ordering, or makes tracing difficult. Understanding these patterns lets you contribute meaningfully to design decisions and anticipate operational challenges before they reach production.

**Key things to understand:**

- Microservices decompose a system into small, independently deployable services. The operational overhead per service (pipeline, monitoring, on-call) must be justified by the independence gained.
- Event-driven architecture decouples producers from consumers via a message broker (Azure Service Bus, Event Hub, Kafka). It improves scalability and resilience but complicates debugging and consistency.
- The strangler fig pattern wraps an existing monolith and gradually moves functionality to new services without a big-bang rewrite.
- CQRS separates read and write models, allowing each to be optimised independently; it is a good fit for high-read, high-write workloads but adds complexity.
- The circuit breaker pattern prevents cascading failures by stopping calls to a failing downstream service and allowing it time to recover.
- The sidecar pattern attaches a secondary container to an application container to provide cross-cutting concerns (logging, proxy, secrets) without modifying the application.

**Common pitfalls:**

- Adopting microservices prematurely, before team and operational maturity can support the overhead.
- Using synchronous HTTP calls between services where asynchronous messaging would provide better decoupling and resilience.
- Not designing for eventual consistency in event-driven systems, leading to incorrect assumptions about data freshness.
- Implementing CQRS without a genuine need, adding complexity without a commensurate benefit.

---

## 6. Enterprise GenAI – Infrastructure and Operational Considerations

Generative AI (GenAI) workloads – large language models, embedding models, image generation systems – have unique infrastructure characteristics. They require access to GPU-enabled compute (or dedicated AI accelerator instances), high-bandwidth storage for model weights, low-latency access to embedding stores (vector databases), and robust content safety and access control layers. On Azure, the primary managed service for deploying LLMs is Azure OpenAI Service; Azure AI Foundry provides a broader platform for building and deploying AI applications.

**Why it matters:**

As organisations adopt GenAI, DevOps and platform engineers are responsible for the infrastructure that hosts, scales, and secures these workloads. GenAI systems have distinct operational characteristics: they are stateless at inference time but require careful model version management, they produce probabilistic outputs that require human-in-the-loop review or content filtering, and they have different cost profiles (per-token billing) compared to traditional workloads.

**Key things to understand:**

- Model deployment and versioning: models must be version-pinned in infrastructure definitions; a model upgrade is a production change requiring testing and rollback capability.
- Private networking: deploy Azure OpenAI endpoints inside a VNet with private endpoints to prevent data exfiltration over the public internet.
- Content filtering and responsible AI controls must be configured as platform guardrails, not left to individual application teams.
- Rate limiting and quota management: Azure OpenAI has per-deployment token-per-minute (TPM) quotas; platform engineers must model usage and request quota increases proactively.
- Vector databases (Azure AI Search with vector indexes, or dedicated services) require their own availability, backup, and access control considerations.
- Cost observability: per-token costs accumulate quickly; tag deployments by team and application, set budget alerts, and instrument token usage in application telemetry.

**Common pitfalls:**

- Not applying the same security standards to AI endpoints as to other production APIs (authentication, rate limiting, audit logging).
- Underestimating GPU/TPM quota lead times; requesting capacity increases takes days to weeks and must be planned ahead.
- Storing chat history or user-generated content in the same storage account as model weights without appropriate access controls and data classification.
- Treating GenAI as a black box and not instrumenting token usage, latency, and error rates, making it impossible to detect degradation or unexpected cost spikes.

---

## 7. GitOps – Git as the Source of Truth for Infrastructure

GitOps is an operational model where the desired state of infrastructure and applications is declared in Git, and automated tooling continuously reconciles the actual state of the environment with the declared state. Instead of making changes by running imperative commands (kubectl apply, az deployment create), you make changes by committing to a Git repository. An agent running in the cluster detects the change and applies it automatically.

Flux is the CNCF-graduated GitOps toolkit for Kubernetes, and the most common choice in Azure environments. Flux runs inside the cluster, watches one or more Git repositories, and automatically applies changes when it detects drift between the declared state in Git and the actual state in the cluster. ArgoCD is the other major GitOps tool, offering a web UI and more opinionated workflow.

**Why it matters:**

GitOps solves a fundamental operational problem: configuration drift. When changes are made imperatively (someone runs kubectl commands directly), the actual state of the cluster diverges from what is documented. GitOps eliminates drift by making Git the single source of truth — every change is version-controlled, auditable, and reversible. For a regulated environment like insurance, the audit trail that GitOps provides is particularly valuable.

**Key things to understand:**

- Pull vs push deployment: traditional CI/CD pushes changes to the environment (pipeline runs kubectl apply). GitOps pulls: an agent in the cluster watches Git and pulls changes. Pull-based deployment is more secure because the cluster does not need to expose credentials to external CI systems.
- Flux components: Source Controller (watches Git repos), Kustomize Controller (applies Kustomize overlays), Helm Controller (manages Helm releases), Notification Controller (sends alerts on reconciliation events).
- Repository structure: separate application code repos from infrastructure/config repos. Application repos trigger image builds; config repos declare the desired cluster state. Flux watches the config repo.
- Sealed Secrets / SOPS: secrets cannot be stored in Git as plaintext. Sealed Secrets (Bitnami) encrypts secrets with a cluster-specific key so they can be safely committed. Mozilla SOPS provides age/GPG-based encryption. Azure Key Vault integration via External Secrets Operator is another option.
- Drift detection and remediation: Flux continuously checks (every configurable interval) whether the cluster state matches Git. If someone makes a manual change, Flux reverts it. This enforces consistency but requires the team to commit to the GitOps workflow — manual changes will be overwritten.
- Multi-environment promotion: use Git branches or directory structures (base + overlays) with Kustomize to manage dev/staging/production differences. Promote changes by merging or copying between environments.

**Common pitfalls:**

- Storing secrets in Git without encryption — even in a private repo, plaintext secrets in version control are a security risk. Use Sealed Secrets, SOPS, or External Secrets Operator from day one.
- Not establishing a clear Git workflow (branch protection, PR reviews, automated validation) for the config repo. The config repo IS your infrastructure — it deserves the same rigour as application code.
- Trying to GitOps everything immediately instead of starting with a single application and expanding. GitOps requires changes to team workflows and tooling — adopt incrementally.
- Ignoring the feedback loop: Flux reconciliation errors, failed deployments, and drift alerts must be monitored and acted upon. Without observability of the GitOps process itself, failures go unnoticed.

---

## 8. AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from platform engineers building infrastructure for AI workloads to engineers using AI-assisted development tools.

**Why it matters:** The AI Policy directly affects platform engineering decisions. When provisioning infrastructure for AI workloads, configuring model endpoints, or building deployment pipelines for AI applications, the policy's requirements around data classification, network isolation, logging, and access control translate into concrete infrastructure design decisions.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- Platform engineers must ensure that AI infrastructure enforces the policy's data classification requirements — for example, ensuring that AI endpoints processing sensitive data are deployed with private networking.
- Logging and audit trail requirements from the policy must be implemented at the infrastructure level.

**Common pitfalls:**
- Provisioning AI infrastructure without verifying that the use case has been registered and classified in the AI Register.
- Treating AI Policy compliance as an application-level concern only; infrastructure configuration (networking, access control, logging) is equally governed.
- Not applying the same security standards to AI endpoints as to other production APIs.

---

## 9. AI-Powered Development for DevOps and Platform Engineers

AI-assisted development tools are changing how infrastructure code, pipeline definitions, and automation scripts are written and maintained. For DevOps and platform engineers, these tools can accelerate the creation of Bicep/Terraform modules, Kubernetes manifests, pipeline YAML, PowerShell scripts, and documentation — tasks that often involve repetitive patterns and well-documented syntax.

AI assistants are most effective for infrastructure work when given precise context: the target cloud provider, the existing naming conventions, the required compliance constraints, and the specific resource types involved. They can generate first drafts of infrastructure-as-code templates, suggest pipeline stages, explain unfamiliar Kubernetes error messages, and help translate between IaC languages.

**Why it matters:** Senior DevOps engineers who understand how to use AI tools effectively can significantly accelerate platform development — particularly for boilerplate-heavy tasks like writing Bicep modules, Helm charts, or pipeline definitions. Equally important is understanding the limitations: AI-generated infrastructure code can contain subtle misconfigurations that create security vulnerabilities or cost overruns.

**Key things to understand:**
- AI tools are effective for generating infrastructure boilerplate, but every generated template must be reviewed for security misconfigurations, overly permissive access controls, and compliance with organisational standards.
- Infrastructure-as-code generated by AI must be validated through the same pipeline gates (linting, policy checks, plan/what-if review) as human-written code.
- AI assistants can help explain and debug complex Kubernetes, Terraform, or pipeline configurations, reducing the time to diagnose issues.
- Data privacy applies to AI tool use: do not paste production secrets, connection strings, or customer data into AI assistants. Follow the organisation's AI Policy for approved tools.

**Common pitfalls:**
- Accepting AI-generated infrastructure code without reviewing it against organisational security policies and naming conventions.
- Using AI to generate Kubernetes manifests or Helm charts without verifying resource limits, security contexts, and network policies.
- Over-relying on AI for troubleshooting without developing the underlying understanding of the systems being managed.
- Not establishing team conventions around AI tool use in infrastructure work, leading to inconsistent patterns across the platform.

---

## Language Deep Dives

- [Python Deep Dive](/language/python) — Scripting, automation, and infrastructure tooling
`,
  },
  'Frontend-Developer': {
    overview: `# Frontend Developer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Frontend developers build the user interfaces and client-side experiences that end users interact with directly. The role covers HTML, CSS, JavaScript, component frameworks, accessibility, performance, and browser compatibility.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| HTML / CSS / JS Basics | [freeCodeCamp – Responsive Web Design](https://www.freecodecamp.org/learn/responsive-web-design-v9/) | Interactive |
| JavaScript | [roadmap.sh – JavaScript](https://roadmap.sh/javascript) | Interactive |
| Frontend Roadmap | [roadmap.sh – Frontend](https://roadmap.sh/frontend) | Interactive |
| HTML in 100 Seconds | [HTML in 100 Seconds – Fireship](https://www.youtube.com/watch?v=ok-plXXHlWw) | Video |
| JavaScript in 100 Seconds | [JavaScript in 100 Seconds – Fireship](https://www.youtube.com/watch?v=DHjqpvDnNGE) | Video |
| CSS Full Course | [Learn HTML5 and CSS3 From Scratch – freeCodeCamp](https://www.youtube.com/watch?v=mU6anWqZJcc) | Video |

> **Alternative comprehensive path:** [freeCodeCamp – Full Stack Developer](https://www.freecodecamp.org/learn/full-stack-developer-v9/) is a self-contained curriculum covering HTML, CSS, JavaScript, React, databases, and backend basics. Use this if you prefer one structured track rather than individual resources.

### After completing Beginner you should be able to:

- Explain the purpose of semantic HTML elements and choose the correct element for a given piece of content
- Build a well-structured HTML document that is readable by both browsers and assistive technologies
- Explain how the CSS box model determines the size and spacing of elements on a page
- Apply Flexbox and CSS Grid to create common layout patterns such as navigation bars, card grids, and two-column designs
- Build a responsive web page that adapts its layout to different screen sizes using media queries
- Explain the difference between var, let, and const, and identify when to use each
- Write JavaScript functions that accept parameters, return values, and handle different data types
- Manipulate the DOM by selecting elements, changing their content and styles, and responding to user events
- Explain the difference between synchronous and asynchronous code execution
- Write asynchronous code using promises and async/await to fetch data from an API

For deep explanations of each concept, see the [Beginner Concept Reference](Frontend-Developer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| React | [roadmap.sh – React](https://roadmap.sh/react) | Interactive |
| Front-End Libraries | [freeCodeCamp – Front End Development Libraries](https://www.freecodecamp.org/learn/front-end-development-libraries-v9/) | Interactive |
| TypeScript | [roadmap.sh – TypeScript](https://roadmap.sh/typescript) | Interactive |
| Testing Basics | [How to Test Apps with Jest, Testing Library and Cypress – freeCodeCamp](https://www.freecodecamp.org/news/test-a-react-app-with-jest-testing-library-and-cypress/) (note: Vitest is an increasingly popular alternative to Jest for modern projects) | Article |
| Testing Reference | [React Testing Library – Official Docs](https://testing-library.com/docs/react-testing-library/intro/) | Docs |
| End-to-End Testing | [Playwright – Getting Started](https://playwright.dev/docs/intro) | Docs |
| APIs (REST / GraphQL) | [Every Popular API Style Explained](https://www.youtube.com/watch?v=xJFzPSAw4Fo) | Video |
| CSS Flexbox | [Learn flexbox the easy way – Kevin Powell](https://www.youtube.com/watch?v=u044iM9xsWU) | Video |
| CSS Grid | [Learn CSS Grid the easy way – Kevin Powell](https://www.youtube.com/watch?v=rg7Fvvl3taU) | Video |
| GraphQL | [GraphQL Foundations – Pluralsight](https://www.pluralsight.com/courses/graphql-foundations) | Course |
| System Design Basics | [System Design Concepts in 10 min](https://www.youtube.com/watch?v=i53Gi_K3o7I) | Video |
| MDN Reference | [MDN Web Docs](https://developer.mozilla.org) | Docs |
| Web Security | [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Scripting_Prevention_Cheat_Sheet.html) | Docs |
| CSS Tooling | [Tailwind CSS Documentation](https://tailwindcss.com/docs) | Docs |
| Routing | [React Router – Tutorial](https://reactrouter.com/en/main/start/tutorial) | Docs |
| Forms and Validation | [React Hook Form](https://react-hook-form.com/get-started) + [Zod](https://zod.dev/) | Docs |

### After completing Mid you should be able to:

- Build React applications using functional components, passing data through props, and managing local state with useState
- Explain the component lifecycle and apply useEffect correctly to synchronise side effects such as data fetching and subscriptions
- Use useContext to share state across a component tree without prop drilling
- Write custom React hooks to encapsulate and reuse stateful logic across components
- Apply TypeScript types and interfaces to React props, function signatures, and API response shapes
- Use TypeScript generics to write reusable, type-safe utility functions and components
- Write unit tests for JavaScript functions using Jest and assert expected outcomes
- Write component tests using React Testing Library that interact with the UI the way a user would
- Write end-to-end tests with Playwright that cover critical user journeys in a running application
- Consume a REST API from a React application, handle loading and error states, and display the retrieved data
- Write and execute GraphQL queries and mutations from a frontend client, and explain the key differences from REST
- Identify common frontend system design concerns such as component composition, data flow direction, and performance trade-offs
- Identify common frontend security vulnerabilities (XSS, CSRF) and apply appropriate mitigations
- Explain the differences between client-side rendering, server-side rendering, and static site generation

For deep explanations of each concept, see the [Mid Concept Reference](Frontend-Developer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| Web Performance | [web.dev – Learn Performance](https://web.dev/learn/performance) | Interactive |
| Accessibility | [web.dev – Learn Accessibility](https://web.dev/learn/accessibility) | Interactive |
| Advanced AI Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Domain-Driven Design | [DDD – Pluralsight Path](https://app.pluralsight.com/paths/skills/domain-driven-design) | Course |
| API Design | [Design APIs Like a Senior Engineer](https://www.youtube.com/watch?v=7iHl71nt49o) | Video |
| Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Algorithms and Data Structures | [Algorithms and Data Structures Pt.1 – Pluralsight](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) | Course |
| Next.js / SSR | [Next.js – Getting Started](https://nextjs.org/docs/getting-started) | Docs |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |

### After completing Senior you should be able to:

- Explain the three Core Web Vitals (LCP, INP, CLS), what each measures, and what a good score looks like
- Identify performance bottlenecks in a web application using browser DevTools and Lighthouse
- Apply lazy loading and code splitting to reduce the initial bundle size and improve load time
- Explain caching strategies for static assets and API responses, and choose an appropriate strategy for a given scenario
- Apply WCAG success criteria to audit a user interface and identify accessibility failures
- Use ARIA roles and attributes correctly to communicate the purpose and state of interactive components to assistive technologies
- Build and run an automated accessibility audit using available tooling, interpret the results, and prioritise fixes
- Evaluate API design decisions from a frontend perspective, including versioning, error response shapes, and pagination strategies
- Apply domain-driven design concepts to organise a frontend codebase around business domains rather than technical layers
- Compare architecture patterns such as micro-frontends, monorepo organisation, and feature-based folder structures, and justify a choice for a given project context
- Identify practical ways to integrate AI-assisted development tools into a daily frontend engineering workflow to improve productivity and code quality
- Apply AI governance requirements (Secure AI Framework, AI Policy, AI Checklist) when building frontend applications that integrate AI features

For deep explanations of each concept, see the [Senior Concept Reference](Frontend-Developer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `# Frontend Developer – Beginner Concept Reference


## HTML – Structure and Semantics

HTML (HyperText Markup Language) is the language used to describe the structure and content of a web page. Every visible element you see in a browser — headings, paragraphs, images, buttons — is defined by an HTML element.

HTML elements are not just containers for content; they carry meaning. This is called semantics. A \`<h1>\` element does not just make text large — it tells the browser, search engines, and assistive technologies that this text is the primary heading of the page. Using the right element for the right purpose is one of the most important habits a frontend developer can build.

**Why it matters:** Semantic HTML forms the foundation of accessibility. Screen readers rely on correct element choices to guide users through a page. It also improves search engine optimisation and makes code easier to read and maintain.

**Key things to understand:**

- Block-level elements (such as \`<div>\`, \`<p>\`, \`<section>\`, \`<article>\`) start on a new line and take up the full width available. Inline elements (such as \`<span>\`, \`<a>\`, \`<strong>\`) sit within the flow of text.
- Landmark elements such as \`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`, and \`<aside>\` describe regions of a page and help screen reader users navigate.
- Form elements — \`<input>\`, \`<label>\`, \`<button>\`, \`<select>\` — have built-in browser behaviour and accessibility support that custom \`<div>\`-based controls do not.
- The \`<head>\` section of a document contains metadata (title, charset, viewport settings) that browsers and search engines use but do not display directly.

**Common pitfalls:**

- Using \`<div>\` and \`<span>\` for everything instead of choosing meaningful elements. This produces structurally correct but semantically empty documents.
- Skipping heading levels (for example, jumping from \`<h1>\` to \`<h4>\`) because of how they look rather than their hierarchy.
- Forgetting to associate \`<label>\` elements with their corresponding form inputs using the \`for\` attribute.

---

## The DOM (Document Object Model)

The DOM is a programming interface created by the browser when it parses an HTML document. It represents the page as a tree of objects (called nodes), where each HTML element, text node, and attribute becomes an object in memory that JavaScript can read and modify.

When a browser loads a page, it reads the HTML source and constructs this tree. JavaScript then interacts with the DOM to make the page dynamic — changing text, showing or hiding elements, updating styles, and responding to user actions.

**Why it matters:** Understanding the DOM explains how JavaScript controls a web page. Without this mental model, DOM manipulation feels like magic rather than a predictable system.

**Key things to understand:**

- The DOM tree starts at the \`document\` object. From there you can navigate to \`document.documentElement\` (the \`<html>\` element) and down through every element on the page.
- Selecting elements is done via methods like \`document.getElementById\`, \`document.querySelector\` (returns the first match for a CSS selector), and \`document.querySelectorAll\` (returns all matches).
- Nodes have parent, child, and sibling relationships that mirror the HTML hierarchy.
- The DOM is a live representation. Changing the DOM triggers the browser to reflow and repaint the relevant portions of the page.

**Common pitfalls:**

- Confusing the DOM with the HTML source. If JavaScript or the browser modifies the DOM after page load, the source code does not change — but the live DOM does.
- Running JavaScript that tries to select an element before the HTML for that element has been parsed, resulting in \`null\` references. This is solved by placing scripts at the bottom of the body or using the \`DOMContentLoaded\` event.
- Performing large numbers of DOM operations in a loop, which causes repeated reflows and degrades performance.

---

## CSS – Selectors, Specificity and the Box Model

CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. Understanding how CSS decides which rules apply to an element — and how it calculates the size and spacing of that element — is fundamental to predictable, maintainable styling.

**Selectors** are patterns that target HTML elements. Type selectors target element names (e.g. \`p\`), class selectors target elements with a given class (e.g. \`.card\`), and ID selectors target a single element with a specific ID (e.g. \`#header\`). Combinators such as descendant (\` \`), child (\`>\`), and adjacent sibling (\`+\`) let you target elements based on their position in the DOM.

**Specificity** is the algorithm the browser uses to decide which CSS rule wins when multiple rules target the same element. Inline styles beat ID selectors, which beat class selectors, which beat type selectors. Understanding this hierarchy prevents the common trap of adding !important everywhere.

**The box model** defines how the browser calculates the space an element occupies. Every element is a rectangular box made of four layers: content, padding, border, and margin. By default (\`box-sizing: content-box\`), width and height apply only to the content area. Setting \`box-sizing: border-box\` makes width and height include padding and border, which is almost always easier to reason about.

**Why it matters:** Misunderstanding specificity leads to style conflicts and debugging nightmares. Misunderstanding the box model leads to layouts that do not match designs.

**Key things to understand:**

- The cascade means that when specificity is equal, the rule that appears later in the stylesheet wins.
- Margin collapse: vertical margins between adjacent block elements collapse into a single margin equal to the larger of the two.
- \`border-box\` sizing is almost universally applied via a CSS reset at the start of a project.

**Common pitfalls:**

- Over-using ID selectors for styling, making it very hard to override styles later.
- Expecting margins to behave the same horizontally and vertically — they do not, due to margin collapse.

---

## CSS Layout – Flexbox and Grid

Before Flexbox and Grid, CSS layouts relied on floats and positioning — techniques that were fragile and hard to maintain. Flexbox and Grid are purpose-built layout systems that solve the majority of common layout problems clearly and predictably.

**Flexbox** is a one-dimensional layout model. You apply \`display: flex\` to a container element, and its direct children become flex items. You can control how those items are distributed along a main axis (horizontal or vertical) and aligned along the cross axis. Key properties include \`flex-direction\`, \`justify-content\`, \`align-items\`, \`flex-wrap\`, and the shorthand \`flex\` applied to individual items to control how they grow and shrink.

**CSS Grid** is a two-dimensional layout model. You define rows and columns on a container and place items into the resulting cells. Grid is ideal for page-level layouts and complex component arrangements. Key properties include \`grid-template-columns\`, \`grid-template-rows\`, \`gap\`, \`grid-column\`, and \`grid-row\`.

**Why it matters:** The majority of modern UI layouts — navigation bars, card grids, sidebars, form layouts — are solved naturally with Flexbox or Grid. Choosing the right tool for each job produces simpler, more maintainable CSS.

**Key things to understand:**

- Flexbox is suited for one-dimensional arrangements: a row of buttons, a vertical stack of items in a sidebar.
- Grid is suited for two-dimensional arrangements: a photo gallery, a dashboard with multiple panels, a full-page layout.
- The two systems can be combined: a Grid layout for the page structure, with Flexbox used inside individual components.
- The \`gap\` property works for both Flexbox and Grid and is generally preferred over margins for spacing between items.

**Common pitfalls:**

- Applying \`display: flex\` to every element regardless of whether it is the right tool.
- Forgetting that Flexbox and Grid properties apply to the container, with a separate set of properties for the individual items.

---

## Responsive Design

Responsive design is the practice of building web interfaces that adapt their layout and presentation to suit different screen sizes, from small mobile phones to large desktop monitors.

The foundation of responsive design is the CSS media query. A media query applies a block of CSS rules only when certain conditions are met — most commonly, when the viewport is above or below a particular width. This allows you to write one set of styles for small screens and override or extend them for larger screens.

The mobile-first approach means writing your default styles for small screens and then using \`min-width\` media queries to enhance the layout for larger screens. This is generally preferred because it forces you to prioritise essential content and progressively enhance rather than progressively strip down.

Relative units such as percentages, \`em\`, \`rem\`, \`vw\`, and \`vh\` allow elements to scale with their container or the viewport rather than being fixed at a pixel size.

**Why it matters:** The majority of web traffic comes from mobile devices. A layout that only works at desktop widths provides a broken experience for most users.

**Key things to understand:**

- The viewport meta tag (\`<meta name="viewport" content="width=device-width, initial-scale=1">\`) must be present in the HTML \`<head>\` or the browser will scale the page as if it were a desktop site.
- Common breakpoints are not fixed standards — they should reflect where your specific layout breaks, not arbitrary screen sizes.
- Images should use \`max-width: 100%\` to prevent them from overflowing their containers on small screens.
- CSS Grid and Flexbox with \`flex-wrap\` can handle a great deal of responsive behaviour without any media queries.

**Common pitfalls:**

- Using fixed pixel widths for layout containers, which causes horizontal scrolling on small screens.
- Designing only for desktop and attempting to retrofit mobile support late in development.
- Forgetting the viewport meta tag, which causes media queries to behave unexpectedly on real devices.

---

## JavaScript – Variables, Types and Functions

JavaScript is the programming language of the web browser. It allows developers to add behaviour to a page: responding to user input, modifying the DOM, fetching data, and running logic.

**Variables** store values. In modern JavaScript, \`let\` declares a variable whose value can be reassigned, and \`const\` declares a variable whose binding cannot be reassigned (though the contents of objects and arrays declared with \`const\` can still be mutated). \`var\` is the older declaration and has function scope rather than block scope — it is generally avoided in modern code.

**Types** in JavaScript include: \`string\`, \`number\`, \`bigint\`, \`boolean\`, \`null\`, \`undefined\`, \`object\`, and \`symbol\`. JavaScript is dynamically typed, meaning a variable can hold any type and the type can change at runtime. The \`typeof\` operator returns a string describing the type of a value.

**Functions** are reusable blocks of code. They can be declared with the \`function\` keyword or written as arrow functions (\`=>\`). Functions can accept parameters and return values. Arrow functions are commonly preferred for their concise syntax and because they do not have their own \`this\` binding.

**Why it matters:** Variables, types, and functions are the basic vocabulary of JavaScript. Everything else — DOM manipulation, API calls, React components — is built on top of them.

**Key things to understand:**

- \`null\` and \`undefined\` are distinct: \`undefined\` means a variable has been declared but not assigned a value; \`null\` is an explicit assignment indicating the absence of a value.
- Type coercion — JavaScript automatically converting one type to another — is the source of many surprising bugs. Prefer strict equality (\`===\`) over loose equality (\`==\`).
- Functions in JavaScript are first-class values: they can be assigned to variables, passed as arguments, and returned from other functions.

**Common pitfalls:**

- Using \`var\` and being surprised by its function-scoping and hoisting behaviour.
- Confusing \`null\`, \`undefined\`, and \`0\` or \`""\` (empty string), all of which are falsy but mean different things.
- Writing functions that silently return \`undefined\` because a \`return\` statement was omitted.

---

## JavaScript – DOM Manipulation and Events

DOM manipulation is the process of using JavaScript to read and change the content, structure, and styles of a web page after it has loaded. Events are signals fired by the browser when something happens — a user clicks a button, types in a field, or the page finishes loading.

To manipulate the DOM, you first select the element you want to work with using methods like \`document.querySelector\`. You can then read or set properties: \`element.textContent\` changes the text, \`element.style.color\` changes an inline style, \`element.classList.add('active')\` adds a CSS class, and \`element.setAttribute('aria-expanded', 'true')\` sets an attribute.

To respond to events, you attach an event listener to an element using \`element.addEventListener('click', handlerFunction)\`. The browser calls the handler function whenever the event occurs, passing an event object that contains information about what happened.

**Why it matters:** DOM manipulation and events are how JavaScript makes a page interactive. Every dropdown menu, form validation message, modal dialog, and live search field relies on these mechanisms.

**Key things to understand:**

- Event delegation: rather than attaching a listener to every item in a list, you attach one listener to the parent and check \`event.target\` inside the handler. This is more efficient and works for items added to the DOM later.
- \`event.preventDefault()\` stops the browser's default behaviour for an event — for example, preventing a form from submitting or a link from navigating.
- \`event.stopPropagation()\` stops an event from bubbling up to parent elements.
- Creating new elements: \`document.createElement('div')\` creates a new element, which you then configure and append to the DOM using \`parent.appendChild(newElement)\` or \`parent.append(newElement)\`.

**Common pitfalls:**

- Attaching event listeners inside loops, which creates one listener per iteration rather than one shared listener.
- Forgetting that \`innerHTML\` accepts HTML strings and can introduce cross-site scripting vulnerabilities if it is populated with user-supplied data. Use \`textContent\` for plain text.
- Not removing event listeners when elements are removed from the DOM, which can cause memory leaks.

---

## JavaScript – Asynchronous Programming (callbacks, promises, async/await)

JavaScript runs on a single thread, meaning it can only do one thing at a time. However, many operations — fetching data from an API, reading a file, waiting for a timer — would block the thread for an unacceptable amount of time if done synchronously. Asynchronous programming is the set of patterns JavaScript uses to initiate these operations, continue with other work, and handle the result when it arrives.

**Callbacks** were the original approach. You pass a function as an argument to an asynchronous operation, and that function is called when the operation completes. The problem is that nested callbacks become deeply indented and hard to read — a situation nicknamed "callback hell".

**Promises** are objects that represent the eventual result of an asynchronous operation. A promise is either pending, fulfilled (resolved with a value), or rejected (failed with an error). You chain \`.then()\` to handle a successful result and \`.catch()\` to handle errors. Promises can be chained, which is more readable than nested callbacks.

**async/await** is syntax built on top of promises that allows you to write asynchronous code that reads like synchronous code. An \`async\` function always returns a promise. Inside it, \`await\` pauses execution until a promise settles and then returns the resolved value. Error handling is done with standard \`try/catch\` blocks.

**Why it matters:** Almost all real-world JavaScript involves asynchronous operations, particularly API calls. Understanding this model is essential for building anything that fetches or sends data.

**Key things to understand:**

- \`await\` can only be used inside an \`async\` function (or at the top level of a module).
- \`Promise.all\` accepts an array of promises and resolves when all of them resolve, or rejects as soon as any one of them rejects.
- The browser's \`fetch\` API returns a promise. The response body must also be read asynchronously using methods like \`response.json()\`, which also returns a promise.

**Common pitfalls:**

- Forgetting that \`async\` functions always return a promise, so calling an async function and using the return value directly (without \`await\`) gives you a promise object, not the resolved value.
- Not handling rejected promises, which produces unhandled rejection warnings and silent failures.
- Using \`await\` inside a standard \`forEach\` loop — it does not work as expected because \`forEach\` does not wait for async callbacks. Use a \`for...of\` loop instead.

---
`,
    mid: `# Frontend Developer – Mid Concept Reference


## React – Components, Props and State

React is a JavaScript library for building user interfaces through a component-based model. A component is a self-contained unit that encapsulates a piece of the UI — its structure, its styles, and the logic that drives it. You compose components together to build complex interfaces from simple building blocks.

**Components** in modern React are functions that return JSX — a syntax extension that looks like HTML but is transpiled to JavaScript. A component's name must start with a capital letter so React can distinguish it from a plain HTML element.

**Props** (short for properties) are the mechanism by which a parent component passes data down to a child component. They are read-only from the child's perspective — a component must never modify its own props. Props make components reusable: the same \`Button\` component can render different labels and trigger different actions depending on the props it receives.

**State** is data managed inside a component that can change over time. When state changes, React re-renders the component to reflect the new data. State represents things that are specific to a single instance of a component and that the user or the application can change — for example, whether a dropdown is open, or the current value of a form field.

**Why it matters:** Components, props, and state are the core mental model of React. Every pattern you learn later — hooks, context, Redux — is built on top of this foundation.

**Key things to understand:**

- Data flows downward (from parent to child through props) by default. To communicate upward, a parent passes a callback function as a prop that the child calls.
- Lifting state up means moving state to the closest common ancestor of all components that need it, so it can be passed down as props.
- JSX expressions must have a single root element. If you do not want to add an extra DOM node, use a Fragment (\`<>...</>\`).

**Common pitfalls:**

- Mutating state directly (e.g. \`state.items.push(x)\`) instead of creating a new value — React will not detect the change and will not re-render.
- Passing too many props through too many levels of components (prop drilling), which can be addressed with context or state management libraries.

**A note on forms:** Managing form state — tracking input values, validating fields, and handling submission — can become complex as forms grow. For form-heavy applications, libraries like React Hook Form simplify state management and validation for complex forms by reducing re-renders and providing a declarative API for validation rules.

---

## React – Hooks (useState, useEffect, useContext, custom hooks)

Hooks are functions that let you use React features — state, side effects, context — inside functional components. They were introduced to replace class components and have become the standard way to write React code.

**useState** returns a state variable and a setter function. The setter replaces the current state value and triggers a re-render. When the new state depends on the previous state, pass a function to the setter: \`setState(prev => prev + 1)\`.

**useEffect** runs a side effect after the component renders. Side effects include data fetching, subscriptions, and manually modifying the DOM. The second argument is a dependency array — the effect only re-runs when one of the listed dependencies changes. An empty array means the effect runs once after the initial render. The function can return a cleanup function that runs before the next effect or when the component unmounts.

**useContext** reads the value of a React context. Context provides a way to share a value (such as the currently logged-in user or a theme) across a component tree without passing props at every level. You create a context with \`React.createContext\`, provide a value with a \`Provider\` component, and consume it with \`useContext\`.

**Custom hooks** are functions whose names start with \`use\` and that call other hooks internally. They let you extract and reuse stateful logic across components. For example, a \`useFetch\` hook could encapsulate the state and effect logic for making an API request.

**Why it matters:** Hooks are the primary tool for managing behaviour in React components. Mastering them allows you to write clean, composable, and testable component logic.

**Key things to understand:**

- Hooks must be called at the top level of a component or custom hook — never inside loops, conditions, or nested functions.
- The dependency array of \`useEffect\` must include every reactive value the effect uses, or you risk stale closures and subtle bugs.
- \`useCallback\` and \`useMemo\` are performance hooks that memoize functions and computed values; use them when you have measured a performance problem, not preemptively.

**Common pitfalls:**

- Omitting dependencies from the \`useEffect\` dependency array, causing the effect to read stale values.
- Including objects or arrays as dependencies without memoising them, causing the effect to re-run on every render because a new object is created each time.
- Fetching data inside \`useEffect\` without handling the case where the component unmounts before the fetch completes, causing state updates on unmounted components.

---

## TypeScript – Types, Interfaces and Generics

TypeScript is a superset of JavaScript that adds a static type system. TypeScript code is compiled to plain JavaScript before it runs in the browser. The type system exists only at development time — it catches errors before your code runs rather than at runtime.

**Types** in TypeScript can be primitive (\`string\`, \`number\`, \`boolean\`), composite (\`string[]\` for an array of strings, \`[string, number]\` for a tuple), or union types (\`string | null\` meaning a value is either a string or null). You can also use literal types to restrict a value to a specific set of allowed values, for example \`'asc' | 'desc'\`.

**Interfaces** describe the shape of an object. They define what properties an object must have and what types those properties must be. Interfaces can extend other interfaces. In React, interfaces are commonly used to define the expected props of a component.

**Generics** allow you to write code that works with a variety of types while remaining type-safe. A generic function or component takes a type parameter (conventionally written as \`T\`) and uses it in its signature. For example, a \`useState\` call can be typed as \`useState<User | null>(null)\` so TypeScript knows the state holds either a \`User\` object or null.

**Why it matters:** TypeScript catches a large class of bugs at compile time — wrong prop types, missing properties, calling methods on null — that would otherwise only surface at runtime or in production.

**Key things to understand:**

- Type inference means TypeScript can often work out the type of a value without an explicit annotation. You only need to annotate when inference is incorrect or insufficiently specific.
- The \`unknown\` type is the type-safe alternative to \`any\`. A value of type \`unknown\` cannot be used until you narrow its type with a check.
- Type assertions (\`value as SomeType\`) tell the compiler to treat a value as a specific type. Use them sparingly and only when you are certain, because they bypass type checking.

**Common pitfalls:**

- Reaching for \`any\` when a type is difficult to express, which silences type errors rather than solving them.
- Writing overly complex types early in a project rather than letting TypeScript infer where possible.
- Confusing interfaces and type aliases — they are mostly interchangeable for object shapes, but interfaces can be extended more naturally and are generally preferred for public API contracts.

---

## Front-End Libraries (Redux for state management, component libraries)

As React applications grow, managing state that must be shared across many parts of the application becomes difficult with component state and context alone. State management libraries and component libraries are the two most common categories of third-party tools that address this.

**Redux** is a predictable state container. It stores the entire application state in a single object (the store). State can only be changed by dispatching actions — plain objects that describe what happened. Reducer functions specify how the state changes in response to each action. Redux Toolkit is the modern, recommended way to use Redux; it reduces boilerplate and includes utilities like \`createSlice\` and \`createAsyncThunk\`.

The Redux data flow is: a component dispatches an action, the reducer processes it and returns new state, the store updates, and all subscribed components re-render with the new state. This unidirectional flow makes state changes predictable and easy to trace.

**Component libraries** such as Material UI, Ant Design, and Chakra UI provide pre-built, styled, and accessible UI components — buttons, modals, tables, form controls — that you can compose into an application. Using a component library speeds up development and ensures a consistent visual language. The trade-off is that heavy customisation can sometimes be more complex than building components from scratch.

**Why it matters:** Understanding when to use a state management library (and when not to) is an important skill. Many applications can get by with local state and context; Redux adds complexity and should be introduced when that complexity is justified by the scale of the state management problem.

**Key things to understand:**

- Server state (data fetched from an API) and client state (UI state like which tab is active) have different characteristics and are often better managed by different tools. Libraries like TanStack Query (formerly React Query) manage server state specifically.
- Redux DevTools allow you to inspect every action dispatched and the resulting state, and to travel back in time to a previous state.

**Common pitfalls:**

- Adding Redux to a small application where local state and context would suffice, adding unnecessary complexity.
- Storing derived data in the Redux store when it can be calculated from existing state inside a selector.

---

## Build Tools and Package Management

Modern frontend development relies on a set of tools that manage dependencies, transform source code, and bundle it for the browser.

**npm** (Node Package Manager) is the default package manager for Node.js and the primary way to install third-party libraries. The \`package.json\` file at the root of a project lists its dependencies, scripts, and metadata. Running \`npm install\` reads \`package.json\` and downloads all listed packages into a \`node_modules\` folder. Yarn is a popular alternative to npm that offers the same core functionality with some differences in performance and lock file format.

**Vite** is the modern build tool for React projects. It provides a fast development server with hot module replacement (instant feedback when you change a file) and an optimised production build powered by Rollup. When you create a new React project today, Vite is the recommended starting point. Understanding what a build tool does — transforming JSX and TypeScript into plain JavaScript, resolving imports, and producing optimised bundles — helps you debug issues and configure your project effectively.

Before setting up a React project, make sure you understand: how \`package.json\` describes a project and its dependencies, how \`npm install\` and \`npm run\` work, and what module bundling does (combining many source files into a smaller number of optimised files for the browser).

---

## Testing – Unit Tests and Component Tests (Jest, Vitest, React Testing Library)

Testing gives you confidence that your code does what you intend. Unit tests verify isolated pieces of logic. Component tests verify that a UI component renders and behaves correctly from the perspective of a user.

**Jest** is a JavaScript testing framework. It provides test organisation (\`describe\`, \`it\`/\`test\`), assertion methods (\`expect(value).toBe(expected)\`), and mocking capabilities. Jest runs in Node.js, so it does not have a real browser DOM — instead it uses a simulated DOM provided by jsdom. **Vitest** is a newer alternative that offers the same API surface as Jest but is built on top of Vite, providing faster test execution and native support for ES modules and TypeScript. Vitest is increasingly popular for projects that already use Vite as their build tool.

**React Testing Library (RTL)** provides utilities for rendering React components and interacting with them in tests. It is commonly used alongside a test runner such as Jest or Vitest. The core philosophy of RTL is to test components the way a user would use them — by querying for elements by their visible text, label, or role rather than by implementation details like CSS class names or component state. Key queries include \`getByRole\`, \`getByLabelText\`, and \`getByText\`. Interaction utilities like \`userEvent.click\` and \`userEvent.type\` simulate real browser events.

**Why it matters:** Tests catch regressions — changes that break existing behaviour — before they reach users. Component tests are especially valuable because they verify the integration between your component logic and its rendered output.

**Key things to understand:**

- Prefer \`getByRole\` over \`getByTestId\`. Querying by role encourages accessible component design and makes tests more resilient to markup changes.
- Mocking allows you to replace real implementations (such as API calls) with controlled fakes during testing. Jest provides \`jest.fn()\` for mock functions and \`jest.mock()\` for mocking entire modules.
- \`async\` assertions require \`await\` combined with RTL's \`waitFor\` or \`findBy\` queries, which poll until the element appears or a timeout expires.

**Common pitfalls:**

- Testing implementation details (which internal function was called, what the component's state value is) rather than observable behaviour. This makes tests fragile and expensive to maintain.
- Not cleaning up after tests — RTL does this automatically, but global state (such as mocked modules) must be reset between tests.
- Writing tests so tightly coupled to a specific DOM structure that any refactor breaks dozens of tests even though behaviour is unchanged.

---

## Testing – End-to-End Tests (Playwright)

End-to-end (E2E) tests run a real browser and exercise a real application from the user's point of view. They verify that the entire system — frontend, backend, database — works together correctly for critical user journeys.

**Playwright** is a browser automation library developed by Microsoft. It supports Chromium, Firefox, and WebKit (Safari). Tests are written in JavaScript or TypeScript. You use a \`Page\` object to navigate to a URL, interact with elements (click, type, select), and make assertions about what is visible.

A typical Playwright test navigates to a page, fills in a form, submits it, and then asserts that the expected outcome appears on the screen. Playwright provides auto-waiting: before interacting with an element, it waits until the element is visible, stable, and ready to receive input.

Playwright also supports API testing (making HTTP requests and asserting on responses), network interception (mocking API responses in browser tests), and screenshot/video capture for debugging.

**Why it matters:** Unit and component tests run in isolation and cannot catch integration failures — a mismatch between the frontend's assumptions and the backend's actual behaviour. E2E tests cover the gaps.

**Key things to understand:**

- E2E tests are slower and more brittle than unit tests. Limit them to the most critical user journeys (login, checkout, data creation) and rely on unit and component tests for edge cases.
- Playwright's \`locator\` API is the preferred way to find elements. It supports accessibility-friendly selectors like \`page.getByRole('button', { name: 'Submit' })\`.
- Tests should be independent and able to run in any order. Use Playwright fixtures and setup/teardown hooks to create the necessary test data and clean up afterwards.

**Common pitfalls:**

- Using fragile selectors based on CSS classes or DOM structure that break whenever the UI is refactored.
- Writing E2E tests for every scenario instead of reserving them for user journeys and covering fine-grained logic with unit tests.
- Not running E2E tests in a realistic environment — tests that pass against a mocked backend but fail in production provide false confidence.

---

## REST APIs – Consuming and Handling Responses

A REST API (Representational State Transfer) is an architectural style for exposing data and operations over HTTP. A frontend application consumes a REST API by making HTTP requests to specific URLs (endpoints) and handling the JSON responses.

The browser's built-in \`fetch\` function is the standard way to make HTTP requests from JavaScript. You pass it a URL and an optional configuration object specifying the HTTP method (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`), headers (such as \`Authorization\` and \`Content-Type\`), and request body. \`fetch\` returns a promise that resolves to a \`Response\` object. You then call \`response.json()\` to parse the body as JSON — this is itself asynchronous.

HTTP status codes communicate the outcome of a request. \`2xx\` codes indicate success. \`4xx\` codes indicate a client error (the request was malformed or unauthorised). \`5xx\` codes indicate a server error. Important detail: \`fetch\` only rejects its promise for network failures, not for \`4xx\` or \`5xx\` responses. You must check \`response.ok\` (a boolean that is true for \`2xx\` status codes) manually.

**Why it matters:** Almost every frontend application communicates with a backend API. Correctly handling loading states, success states, and error states is essential for a good user experience.

**Key things to understand:**

- Authentication is most commonly handled by including a bearer token in the \`Authorization\` header of each request.
- CORS (Cross-Origin Resource Sharing) is a browser security mechanism that prevents a frontend on one origin from making requests to an API on a different origin unless the API explicitly allows it.
- Pagination is commonly implemented with query parameters — the frontend passes a page number or cursor, and the API returns a subset of the data along with information about whether more pages exist.

**Common pitfalls:**

- Not checking \`response.ok\` and treating every response as a success, causing silent failures when the server returns a \`404\` or \`500\`.
- Not handling the loading and error states in the UI, leaving users with no feedback while a request is in flight or when it fails.
- Storing sensitive tokens in \`localStorage\` where they are accessible to JavaScript — \`httpOnly\` cookies are the more secure alternative.

---

## GraphQL – Queries, Mutations and the Differences from REST

GraphQL is a query language for APIs and a runtime for executing those queries. Unlike REST, where the server defines a set of fixed endpoints each returning a fixed data shape, GraphQL exposes a single endpoint and allows the client to specify exactly what data it needs in each request.

A **query** is a read operation. The client writes a query document describing the fields it wants, and the server returns a JSON object with exactly those fields — no more, no less. This eliminates over-fetching (receiving more data than needed) and under-fetching (needing to make multiple requests to assemble required data).

A **mutation** is a write operation — creating, updating, or deleting data. Like queries, mutations specify what fields should be returned after the operation completes.

A **schema** defines the types available in the API and the queries and mutations that can be performed on them. The schema is the contract between the frontend and backend.

On the client side, libraries like Apollo Client manage sending GraphQL requests, caching responses, and providing hooks (such as \`useQuery\` and \`useMutation\`) that integrate with React's rendering model.

**Why it matters:** GraphQL is widely used in modern frontend development. Understanding its concepts allows you to work with APIs that use it and to evaluate when it is the right choice over REST.

**Key things to understand:**

- GraphQL requests are typically sent over HTTP as \`POST\` requests, even for read operations (queries).
- The schema is introspectable — tools can query the schema itself to discover available types and operations, enabling powerful tooling like auto-completion in editors.
- GraphQL does not automatically solve N+1 query problems on the server side; that requires additional patterns like DataLoader.

**Common pitfalls:**

- Requesting every available field in a query (effectively treating it like a REST endpoint), which eliminates the bandwidth advantages of GraphQL.
- Confusing GraphQL's single endpoint with a lack of structure — the schema provides strong typing and clear contracts.
- Assuming GraphQL is always better than REST — for simple, resource-oriented APIs with stable data shapes, REST is often simpler.

---

## System Design Basics for Frontend (component architecture, data flow, performance considerations)

System design for frontend engineers is about making deliberate decisions on how to structure a UI application so that it remains maintainable, performant, and understandable as it grows. Unlike backend system design (which focuses on servers and databases), frontend system design focuses on component architecture, data flow, and browser performance.

**Component architecture** is the practice of deciding how to decompose a UI into components. Presentational (or "dumb") components focus on rendering; they receive props and produce output with no knowledge of where the data comes from. Container (or "smart") components manage state and data fetching and pass data down to presentational components. Feature-based organisation groups all files related to a feature — components, hooks, styles, tests — together rather than grouping by type.

**Data flow** refers to how state is managed and how it moves through the application. Local state lives in a single component. Shared state must be lifted to a common ancestor or moved into a global store. Choosing the right level for each piece of state is a key architectural decision. Unidirectional data flow — where data moves in a predictable direction and UI reflects state — makes applications easier to reason about.

**Performance considerations** at the design stage include: avoiding unnecessarily large component trees that re-render frequently; choosing when to split code into separate bundles so the initial load is smaller; and deciding how data is fetched — at the page level or within individual components — to avoid request waterfalls.

**Why it matters:** Individual components that work correctly can still combine into an application that is slow, hard to maintain, or confusing. System design thinking bridges the gap between writing correct code and building a good product.

**Key things to understand:**

- There is no single correct architecture. The right structure depends on the size of the team, the complexity of the domain, and the rate of change in requirements.
- Premature optimisation is a risk — reach for complexity only when you have evidence (measured performance data or clear scaling requirements) that simpler approaches are insufficient.

**Common pitfalls:**

- Designing everything as global state, making it difficult to understand what affects what.
- Creating deeply nested component hierarchies that make data flow and debugging difficult.
- Neglecting to discuss data fetching strategy at the design stage, resulting in request waterfalls or redundant API calls discovered late in development.

---

## Frontend Security — XSS, CSRF and Content Security Policy

Frontend security is the practice of protecting web applications from attacks that exploit the client-side code running in the user's browser. While backend security focuses on protecting servers and databases, frontend security addresses a different attack surface: the browser, the DOM, cookies, and the interaction between the user's browser and external resources.

The three most important frontend security concepts are Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and Content Security Policy (CSP). Understanding these is essential because frontend developers are the first line of defence — the code you write determines whether user input is handled safely and whether the application is vulnerable to injection attacks.

**Why it matters:** A single XSS vulnerability can allow an attacker to steal user session tokens, redirect users to phishing sites, or modify the page content to trick users into revealing sensitive information. For an insurance company handling personal and financial data, frontend security vulnerabilities are a direct path to data breaches and regulatory penalties.

**Key things to understand:**

- Cross-Site Scripting (XSS): occurs when an attacker injects malicious JavaScript that executes in another user's browser. Three types: Stored XSS (malicious script saved in the database and served to other users), Reflected XSS (malicious script in a URL parameter reflected in the page), DOM-based XSS (malicious script manipulates the client-side DOM directly).
- React's built-in protection: React escapes values embedded in JSX by default, preventing most XSS attacks. However, \`dangerouslySetInnerHTML\` bypasses this protection — never use it with untrusted data. Links with \`javascript:\` protocol and dynamic \`href\` values are also attack vectors.
- Cross-Site Request Forgery (CSRF): tricks an authenticated user's browser into making unwanted requests to a site where they are logged in. Mitigations: CSRF tokens (synchroniser tokens), SameSite cookie attribute, checking the Origin header.
- Content Security Policy (CSP): an HTTP header that tells the browser which sources of content (scripts, styles, images, fonts) are allowed. CSP prevents XSS by blocking inline scripts and restricting script sources to trusted domains. Start with a report-only policy to identify violations before enforcing.
- Secure cookies: session cookies should always be set with HttpOnly (not accessible via JavaScript), Secure (only sent over HTTPS), and SameSite=Strict or SameSite=Lax (prevents CSRF). Frontend developers should understand these attributes even though they are typically set by the backend.
- Input sanitisation vs output encoding: sanitise input when you must accept HTML (rich text editors), and always encode output when rendering user-provided content. Libraries like DOMPurify sanitise HTML safely.

**Common pitfalls:**

- Assuming React prevents all XSS — \`dangerouslySetInnerHTML\`, URL injection via \`href\`, and third-party libraries that manipulate the DOM directly can all introduce XSS vulnerabilities.
- Not setting a Content Security Policy because "our app works without it" — CSP is a defence-in-depth measure that limits the damage if an XSS vulnerability is exploited.
- Using \`target="_blank"\` on links without \`rel="noopener noreferrer"\` — the opened page can access \`window.opener\` and redirect the original page (tabnapping).
- Storing sensitive data (tokens, personal data) in localStorage, which is accessible to any JavaScript on the page including XSS payloads. Use HttpOnly cookies for session tokens.

---

## CSS Architecture and Tooling

CSS architecture is the practice of organising and structuring stylesheets to be maintainable, scalable, and predictable as an application grows. In small projects, CSS is straightforward. In large applications with multiple developers, CSS quickly becomes a source of bugs, conflicts, and frustration — styles leak across components, specificity wars emerge, and changes in one place break layouts elsewhere.

Modern CSS tooling has evolved to solve these problems. The main approaches are utility-first CSS (Tailwind CSS), CSS Modules (locally scoped class names), CSS-in-JS (styled-components, Emotion), and traditional methodologies (BEM). Each approach has trade-offs, and the right choice depends on the team, the project, and the existing codebase.

**Why it matters:** CSS architecture decisions affect every developer on the team, every day. A well-chosen approach reduces bugs, makes onboarding easier, and keeps the codebase maintainable as it grows. A poor choice — or no deliberate choice at all — leads to specificity conflicts, duplicated styles, and fear of changing CSS because you cannot predict what will break.

**Key things to understand:**

- Tailwind CSS: a utility-first framework that provides small, single-purpose classes (flex, p-4, text-lg, bg-blue-500) that you compose directly in your HTML/JSX. Eliminates the naming problem and keeps styles co-located with components. The purge/content configuration ensures only used classes are included in production builds.
- CSS Modules: a build-tool feature that locally scopes class names by generating unique identifiers. You write normal CSS but import it as a JavaScript module. Styles are guaranteed not to leak across components. Works well with existing CSS knowledge and requires no runtime JavaScript.
- CSS-in-JS (styled-components, Emotion): define styles in JavaScript using template literals or object syntax. Enables dynamic styles based on props, automatic critical CSS extraction, and component-level encapsulation. Adds a runtime cost and increases bundle size.
- When to choose which: Tailwind for rapid development and consistent design systems. CSS Modules for teams comfortable with CSS who want scoping without a new paradigm. CSS-in-JS for highly dynamic UIs where styles depend heavily on component state. BEM for projects with existing BEM conventions or when build tooling is minimal.

**Common pitfalls:**

- Mixing multiple CSS approaches in the same project without clear boundaries — using Tailwind in some components, CSS Modules in others, and inline styles in the rest creates an inconsistent, hard-to-maintain codebase.
- Not configuring Tailwind's design tokens (colours, spacing, fonts) to match the project's design system, resulting in arbitrary values scattered across components.
- Overusing CSS-in-JS for simple styles that do not need dynamic behaviour, adding runtime overhead and complexity without benefit.
- Ignoring CSS fundamentals (specificity, the cascade, the box model) when using tooling — the tools abstract these concepts but do not eliminate them. When something breaks, you need to understand the underlying CSS.

---
`,
    senior: `# Frontend Developer – Senior Concept Reference


## Web Performance – Core Web Vitals and Measurement

Core Web Vitals are a set of metrics defined by Google to measure the real-world experience of loading, interactivity, and visual stability on a web page. They are the basis for performance standards that affect both user experience and search engine ranking.

The three Core Web Vitals are:

**Largest Contentful Paint (LCP)** measures loading performance — specifically, how long it takes for the largest visible content element (an image, video, or block of text) to render within the viewport. A good LCP is 2.5 seconds or less.

**Interaction to Next Paint (INP)** measures responsiveness — how quickly the page responds to user interactions such as clicks and key presses. It replaced First Input Delay as the responsiveness metric. A good INP is 200 milliseconds or less.

**Cumulative Layout Shift (CLS)** measures visual stability — whether elements on the page move unexpectedly while loading. A good CLS score is 0.1 or less.

**Measurement** happens at two levels. Lab measurement uses tools (Lighthouse in Chrome DevTools, PageSpeed Insights) to simulate load conditions in a controlled environment. Field measurement captures data from real users via the Chrome User Experience Report (CrUX). Lab data is useful during development; field data reflects what users actually experience.

**Why it matters:** Performance is a user experience problem. Users abandon slow pages. Senior developers are expected to own performance as a quality concern, not treat it as an afterthought.

**Key things to understand:**

- LCP is most commonly hurt by slow server response times, render-blocking resources, and unoptimised images.
- CLS is most commonly caused by images without explicit width and height attributes, dynamically injected content, and web fonts causing a flash of unstyled text.
- DevTools Performance panel and the Network panel are the primary tools for diagnosing performance problems in development.

**Common pitfalls:**

- Optimising only for Lighthouse scores in a lab environment without verifying that real-user field data improves.
- Fixing the wrong metric — for example, improving visual load speed without addressing slow interaction responsiveness.

---

## Web Performance – Optimisation Techniques (lazy loading, code splitting, caching)

Once you have measured performance and identified bottlenecks, you apply targeted techniques to improve it. The most impactful techniques address initial load time, resource efficiency, and repeat-visit performance.

**Lazy loading** defers the loading of non-critical resources until they are needed. Images below the fold can use the \`loading="lazy"\` HTML attribute to load only when they approach the viewport. JavaScript modules can be lazily imported using dynamic \`import()\` syntax, so the browser only downloads the code for a feature when the user navigates to it.

**Code splitting** divides your JavaScript bundle into smaller chunks that are loaded on demand. In a React application, \`React.lazy\` combined with \`Suspense\` enables component-level code splitting — the component and its dependencies are only fetched when the component is first rendered. Route-based code splitting (loading code for each route only when the user navigates to it) is the most common and highest-impact application of this technique.

**Caching** allows resources to be stored by the browser or intermediate proxies so they do not need to be re-downloaded on repeat visits. The \`Cache-Control\` HTTP header controls caching behaviour. Static assets with content hashes in their filenames can be cached indefinitely (\`max-age=31536000, immutable\`). HTML documents are typically cached for a very short time or not at all so users always receive the latest version.

**Additional techniques** include: compressing assets with Brotli or gzip; optimising images by serving modern formats (WebP, AVIF) at appropriate sizes; eliminating render-blocking scripts by using \`defer\` or \`async\` attributes; and preloading critical resources with \`<link rel="preload">\`.

**Why it matters:** A slow application costs users time and costs businesses revenue. These techniques are the practical tools a senior developer uses to translate performance measurements into improvements.

**Key things to understand:**

- Code splitting is only beneficial if the split chunks are large enough to justify the additional HTTP request overhead.
- Resource hints (\`preload\`, \`prefetch\`, \`preconnect\`) tell the browser to prioritise or prepare resources in advance, but overusing them can hurt performance by competing for bandwidth.

**Common pitfalls:**

- Applying lazy loading to above-the-fold images, which delays the LCP element and hurts performance.
- Code splitting every component indiscriminately, resulting in hundreds of tiny requests that slow down navigation.
- Setting long cache lifetimes on resources without content hashing, so users receive stale files after a deployment.

---

## Accessibility – WCAG Standards and ARIA

Web accessibility means building interfaces that can be used by people with a wide range of disabilities — visual, auditory, motor, cognitive. The Web Content Accessibility Guidelines (WCAG) provide the internationally recognised framework for evaluating and designing accessible web content.

**WCAG** is organised around four principles, commonly abbreviated as POUR:

- **Perceivable** — users must be able to perceive all information (e.g. images have alt text, videos have captions).
- **Operable** — users must be able to operate all interface components (e.g. all functionality is available via keyboard, no content flashes more than three times per second).
- **Understandable** — users must be able to understand the content and how to operate the UI (e.g. error messages are descriptive, forms have clear labels).
- **Robust** — content must be interpreted reliably by a wide range of user agents, including assistive technologies.

WCAG defines success criteria at three conformance levels: A (minimum), AA (the standard required by most legislation), and AAA (enhanced). The current version is WCAG 2.2, which became the W3C standard in October 2023. The target standard for most projects is WCAG 2.2 Level AA. Note that the EU European Accessibility Act applies from June 2025, making accessibility compliance a legal requirement across the European Union. Senior developers should be familiar with the AA criteria.

**ARIA** (Accessible Rich Internet Applications) is a set of HTML attributes that communicate the role, state, and properties of UI elements to assistive technologies. For example, \`role="dialog"\` on a modal, \`aria-expanded="true"\` on an open accordion, and \`aria-label="Close"\` on an icon button without visible text.

**Why it matters:** Accessibility is a legal requirement in many jurisdictions and a quality standard that benefits all users. Senior developers are responsible for embedding accessible practices in the development process, not retrofitting them later.

**Key things to understand:**

- The first rule of ARIA is: use native HTML elements when they already provide the required semantics and behaviour. \`<button>\` is better than \`<div role="button">\` because it is keyboard-focusable and activatable by default.
- \`aria-label\` provides an accessible name when visible text is absent or insufficient. \`aria-labelledby\` points to an existing visible element that serves as the label.
- Focus management is a critical accessibility concern in single-page applications. When a modal opens, focus must move into it. When it closes, focus must return to the element that triggered it.

**Common pitfalls:**

- Relying on colour alone to convey information (e.g. red text for errors) without a text label, icon, or other non-colour indicator.
- Adding ARIA roles and attributes to native elements that already have the correct semantics, creating conflicts.
- Building custom interactive components (carousels, comboboxes, date pickers) without implementing the keyboard interaction patterns specified by the ARIA Authoring Practices Guide.

---

## Accessibility – Testing and Auditing

Accessibility testing is the process of verifying that an interface meets WCAG criteria and works correctly with assistive technologies. A robust accessibility testing strategy combines automated scanning, manual keyboard testing, and testing with real screen readers.

**Automated tools** such as Axe, Lighthouse, and the browser DevTools accessibility panel can identify a subset of accessibility violations — typically around 30-40% of all possible issues. These tools check for things like missing alt text, insufficient colour contrast, and form inputs without labels. They are fast and easy to integrate into a CI pipeline, but they cannot verify that a custom interactive component behaves correctly under keyboard navigation or that content makes logical sense to a screen reader user.

**Manual keyboard testing** involves navigating the entire page using only the keyboard — Tab to move forward through focusable elements, Shift+Tab to move backward, Enter and Space to activate controls, arrow keys for composite widgets. Every interactive element must be reachable, clearly focusable (visible focus indicator), and operable.

**Screen reader testing** uses tools like NVDA (Windows), VoiceOver (macOS/iOS), or TalkBack (Android) to verify that the announced content and interaction model match the visual experience. This is the most thorough form of accessibility testing and reveals issues that no automated tool can detect.

**Integrating accessibility into CI** can be achieved with tools like the axe-core library in Jest or Playwright, which runs accessibility checks against rendered components or live pages as part of the test suite.

**Why it matters:** Shipping inaccessible software and discovering it in a legal challenge or user complaint is far more costly than building accessibly from the start. Senior developers champion the processes that prevent rather than remediate accessibility failures.

**Key things to understand:**

- Automated tools catch a limited subset of issues. A clean automated scan does not mean a page is accessible.
- Colour contrast must be tested for all text and interactive element states (default, hover, focus, disabled) against their backgrounds.
- Component libraries often have known accessibility issues in specific versions. Testing with the actual library version in use is important.

**Common pitfalls:**

- Treating a passing automated scan as complete accessibility validation.
- Testing only the happy path with keyboard and screen reader, missing error states, modal dialogs, and dynamic content updates.
- Not verifying that \`aria-live\` regions announce content changes to screen readers when the DOM is updated dynamically.

---

## API Design – Principles a Frontend Senior Should Understand

Senior frontend developers do not just consume APIs — they collaborate on their design, advocate for frontend needs in API discussions, and identify design decisions that will create problems during implementation. Understanding API design from a consumer's perspective makes you a more effective collaborator with backend engineers.

**Consistency** is the most valuable property of an API. Consistent naming conventions, consistent error response shapes, and consistent pagination styles dramatically reduce the cognitive overhead of integration. A senior frontend developer should push back on APIs that are inconsistent across resources.

**Error response design** has a significant impact on the frontend. Errors should be returned in a predictable, machine-readable format — a consistent JSON structure with a code, a human-readable message, and optionally field-level validation errors. This allows the frontend to handle errors generically and display appropriate user messages without custom-casing every endpoint.

**Versioning** allows the API to evolve without breaking existing clients. URL versioning (e.g. \`/api/v2/\`) and header-based versioning are the two common strategies. Frontend developers should understand how the API they consume is versioned and what the migration path looks like when breaking changes are introduced.

**Pagination** strategies (offset-based, cursor-based) have different performance and UX implications. Cursor-based pagination is more efficient for large datasets and supports real-time data better than offset-based.

**Why it matters:** Frontend engineers who understand API design write better integration code, catch problems earlier, and have more productive conversations with backend engineers.

**Key things to understand:**

- HTTP methods should be used semantically: GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal. GET requests must be idempotent and safe.
- Response payload size matters for mobile performance. The frontend should request only needed fields where the API supports it (via sparse fieldsets or GraphQL).

**Common pitfalls:**

- Accepting a poorly designed API without raising concerns during design review, then building complex workarounds in the frontend to compensate.
- Not negotiating for detailed validation error responses, resulting in having to display generic error messages to users.

---

## Domain-Driven Design – Applied to Frontend Architecture

Domain-Driven Design (DDD) is a set of principles for tackling complex software by aligning the technical model closely with the business domain. While DDD originated in backend and enterprise contexts, its ideas are directly applicable to how frontend applications are structured.

The core idea is that code organisation should reflect the business concepts and language of the domain rather than technical concerns. In a frontend application, this means organising code around features and business capabilities — \`user-profile\`, \`order-management\`, \`product-catalogue\` — rather than around technical layers — \`components\`, \`services\`, \`utils\`.

**Bounded contexts** in DDD are explicit boundaries within which a particular model and vocabulary apply. In a large frontend application, different parts of the application might have different models of the same underlying data. For example, a \`User\` in the authentication context might have different properties than a \`User\` in the admin dashboard context. Recognising these boundaries and not forcing a single model across all contexts leads to simpler, more focused code.

**Ubiquitous language** is the practice of using the same terminology in code as the business and product team uses to describe the domain. Variable names, function names, and component names should map directly to business concepts. This reduces the cognitive translation required when moving between discussions and code.

**Why it matters:** Frontend codebases often grow into difficult-to-navigate collections of generic utilities and technically-named components. Applying DDD thinking produces codebases that are easier for new developers to orient themselves in and easier to evolve in line with business changes.

**Key things to understand:**

- Feature-based folder organisation is the practical expression of bounded contexts in a frontend codebase. Each feature folder is a self-contained module with its own components, hooks, state, and tests.
- DDD is most valuable in complex domains with rich business logic. For simple CRUD applications, it may be over-engineering.

**Common pitfalls:**

- Organising by technical role (all components in one folder, all hooks in another) in a large application, creating cross-cutting dependencies that are hard to track.
- Importing freely between feature modules, breaking the boundaries that DDD aims to establish. Use explicit, limited public APIs between modules.

---

## Architecture Patterns (micro-frontends, monorepo, feature-based structure)

As frontend applications and teams grow, the architecture of the codebase must be intentionally designed to support multiple contributors, fast iteration, and maintainability. Several architectural patterns address these concerns at different scales.

**Feature-based structure** organises code by business feature rather than by technical role. All code related to a feature — components, hooks, API calls, types, tests — lives together. This makes it easy to understand a feature in its entirety and to delete or move it without hunting across multiple directories. It is the recommended starting point for most applications.

**Monorepo** is the practice of storing multiple packages or applications in a single version-controlled repository. A design system, a shared component library, multiple applications, and shared utilities can all live together. Tools like Nx and Turborepo provide monorepo-specific features: efficient caching, dependency graph analysis, and targeted test/build runs that only process code affected by a given change. The trade-off is tooling complexity and the need for discipline around package boundaries.

**Micro-frontends** decompose a single frontend application into smaller, independently deployable pieces — each owned by a different team. Each piece is developed, tested, and deployed independently. Integration happens at runtime (in the browser) via a shell application that composes the pieces. Micro-frontends solve an organisational problem (multiple teams working on one large UI) more than a technical one. They introduce significant complexity and should only be adopted when that complexity is justified by team size and deployment independence requirements.

**Why it matters:** Choosing the right architectural pattern for a given team size and application complexity is a key senior responsibility. Poor architectural decisions compound over time and become very expensive to reverse.

**Key things to understand:**

- Start simple. Feature-based structure inside a single repository is the right starting point for most teams. Add monorepo tooling when you have multiple packages with shared code. Consider micro-frontends only when team boundaries and deployment independence cannot be achieved otherwise.
- Architecture decisions should be documented with the reasoning — including the alternatives that were considered and rejected.

**Common pitfalls:**

- Adopting micro-frontends for the technical novelty when a well-structured monolith would serve the team better.
- Setting up a monorepo without enforcing package boundaries, resulting in implicit cross-package dependencies that negate the benefits.
- Not revisiting architectural decisions as the team or application grows, continuing to apply patterns that were right at a smaller scale.

---

## AI-Assisted Development – Practical Use for Frontend Engineers

AI-assisted development tools — code completion assistants, conversational coding agents, and automated review tools — have become a meaningful part of the frontend engineering workflow. A senior developer uses these tools deliberately, understanding their capabilities and their limitations.

**Code generation** is the most immediate capability. AI assistants can generate boilerplate, scaffold components, write unit tests for a given function, and convert designs into markup. The value is in reducing the time spent on repetitive tasks, not in replacing engineering judgment. Generated code must be reviewed with the same rigour as code from any other source.

**Conversational exploration** allows you to ask an AI assistant to explain an unfamiliar API, suggest approaches to a problem, or review a code snippet for issues. This is most useful for exploring options quickly and for learning — understanding why a suggestion is made is as important as the suggestion itself.

**Limitations** that a senior developer must understand: AI models have knowledge cutoffs and may suggest deprecated APIs or patterns. They hallucinate — generating plausible-sounding but incorrect code or references. They do not have context about your specific codebase, team conventions, or business requirements unless you provide it. Generated code may be technically correct but not aligned with your architecture, naming conventions, or performance requirements.

**Workflow integration** includes using AI tools in editors (inline suggestions), in the terminal (command generation), and in code review (automated summaries and issue flagging). The most effective practitioners treat AI tools as a highly capable but unreliable junior contributor: useful for volume work, but requiring oversight and domain-specific correction.

**Why it matters:** Senior developers set the standard for how AI tools are used on their teams. Thoughtful adoption — with clear guidelines on review, attribution, and appropriate use cases — multiplies team output without compromising quality.

**Key things to understand:**

- Security-sensitive code (authentication, cryptography, data handling) generated by AI must be reviewed with extra care. Plausible-looking security code can have subtle, critical flaws.
- Providing rich context in prompts (the function signature, the types involved, the expected behaviour, the existing patterns in the codebase) dramatically improves output quality.

**Common pitfalls:**

- Accepting generated code without reading and understanding it, which transfers knowledge debt to future maintainers.
- Using AI-generated test cases as a substitute for thinking about what needs to be tested — the AI may generate tests that pass trivially without covering meaningful behaviour.
- Not updating AI tool guidelines as the tools evolve rapidly, leaving the team with outdated practices.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from developers building AI-powered frontend features to engineers using AI-assisted development tools.

**Why it matters:** The AI Policy is the organisation's binding commitment to responsible AI use. For frontend engineers, this matters when building interfaces that display AI-generated content, collecting user data that feeds into AI systems, or integrating AI-powered features such as chatbots, recommendations, or content generation. The policy's transparency requirements — informing users when they interact with AI — are directly implemented in the frontend.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- Transparency obligations require the frontend to clearly communicate when users are interacting with AI-generated content or AI-powered features.
- GDPR obligations apply to data collected through AI-powered interfaces — consent management and data minimisation are frontend concerns.

**Common pitfalls:**
- Building a frontend AI feature (chatbot, AI-generated content) without ensuring the use case is registered in the AI Register.
- Not implementing the transparency requirements — users must be clearly informed when content is AI-generated or when they are interacting with an AI system.
- Treating the AI Policy as a backend-only concern; frontend design decisions around data collection, user consent, and AI feature presentation are directly governed by the policy.

---

## Language Deep Dives

- [JavaScript Deep Dive](/language/javascript) — The core language of web development
- [HTML & CSS Deep Dive](/language/html-css) — Structure and style every web interface
- [TypeScript Deep Dive](/language/typescript) — Type-safe JavaScript for large codebases
`,
  },
  'Marketing-Technology-Developer': {
    overview: `# Marketing Technology Developer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Marketing Technology Developers apply software engineering and data science to marketing platforms and campaigns. The role covers data pipelines, analytics, APIs, experimentation, and AI-powered marketing tools.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| Python | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| ML Overview | [Machine Learning Explained Simply (12 min)](https://www.youtube.com/watch?v=Au1OxVSyGas) | Video |
| SQL | [SQLBolt -- Interactive SQL Tutorial](https://sqlbolt.com/) | Interactive |
| APIs Overview | [Every Popular API Style Explained](https://www.youtube.com/watch?v=xJFzPSAw4Fo) | Video |
| Generative AI for Data | [Generative AI for Data Science – Pluralsight](https://app.pluralsight.com/paths/skills/generative-ai-for-data-science) | Course |

### After completing Beginner you should be able to:

- Write Python scripts to query and transform data
- Query a database using SQL with filters, joins and aggregations
- Describe how APIs work and consume a REST API
- Explain what machine learning is and give relevant marketing use cases

For deep explanations of each concept, see the [Beginner Concept Reference](Marketing-Technology-Developer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| Data Visualization | [Kaggle Learn – Data Visualization](https://www.kaggle.com/learn/data-visualization) | Interactive |
| A/B Testing | [A/B Testing – Udacity (Free)](https://www.udacity.com/course/ab-testing--ud257) | Course |
| Feature Engineering | [Kaggle – Feature Engineering](https://www.kaggle.com/learn/feature-engineering) | Interactive |
| ML Algorithms | [All ML Algorithms Explained in 17 min](https://www.youtube.com/watch?v=E0Hmnixke2g) | Video |
| Prompt Engineering | [Prompt Engineering and GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/prompt-engineering-and-generative-ai) | Course |
| Context Engineering | [Context Engineering – Pluralsight](https://app.pluralsight.com/paths/skills/context-engineering) | Course |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Customer Data Platforms | [Segment CDP Introduction](https://segment.com/docs/getting-started/) | Docs |
| Analytics | [Google Analytics 4 – Developer Documentation](https://developers.google.com/analytics/devguides/collection/ga4) | Docs |
| A/B Testing (Supplement) | [Evan Miller – How Not To Run an A/B Test](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) | Article |

### After completing Mid you should be able to:

- Create data visualisations to communicate campaign performance
- Design and analyse an A/B test
- Engineer features from marketing data for ML models
- Write effective prompts for marketing content and analysis tasks
- Evaluate when to apply different ML algorithms
- Explain the role of a Customer Data Platform and how it unifies customer data across channels
- Configure event tracking using Google Analytics 4 or equivalent analytics tools

For deep explanations of each concept, see the [Mid Concept Reference](Marketing-Technology-Developer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| RAG Systems | [RAG for Developers – Pluralsight](https://app.pluralsight.com/paths/skills/retrieval-augmented-generation-rag-for-developers) | Course |
| LangGraph | [LangGraph – Pluralsight](https://app.pluralsight.com/paths/skills/langgraph) | Course |
| Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| System Design | [System Design – 30 Concepts](https://www.youtube.com/watch?v=s9Qh9fWeOAk) | Video |
| LLM Security Patterns | [Design Patterns for Securing LLM Agents](https://arxiv.org/abs/2506.08837) | Paper |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |
| MLOps for Marketing | [Microsoft Learn – MLOps with Azure ML](https://learn.microsoft.com/en-us/training/paths/build-first-machine-operations-workflow/) | Interactive |

### After completing Senior you should be able to:

- Design and implement a RAG-based marketing tool
- Build and orchestrate an AI agent workflow
- Apply AI architecture patterns to a marketing platform
- Identify LLM security risks in a customer-facing AI product

For deep explanations of each concept, see the [Senior Concept Reference](Marketing-Technology-Developer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `
# Beginner Concept Reference – Marketing Technology Developer

This document provides in-depth explanations of the core concepts covered at the Beginner level of the Marketing Technology Developer learning path. Use it alongside the resources listed in the main learning path to build a solid foundation before progressing to the Mid level.

---

## Python for Marketing Technology – Use Cases and Key Libraries

Python is a general-purpose programming language that has become the dominant choice for data work, automation, and machine learning. Its readable syntax and extensive ecosystem of libraries make it accessible to people coming from non-engineering backgrounds while still being powerful enough for production systems.

For a marketing technology developer, Python is the primary tool for working with campaign data, automating repetitive tasks, calling external APIs, and building the data pipelines that feed dashboards and models. Understanding Python is a prerequisite for almost every other technical skill in this role.

**Why it matters:** Marketing teams generate large volumes of data from advertising platforms, CRM systems, and web analytics tools. Python lets you automate the collection and transformation of that data, run analyses that would take hours manually, and build reproducible pipelines that others can maintain. Without Python, most of the practical work in this role requires expensive third-party tools or slow manual processes.

**Key things to understand:**

- \`pandas\` is the standard library for loading, cleaning, and transforming tabular data such as campaign exports or CRM records.
- \`numpy\` provides fast numerical operations that underpin most data science libraries.
- \`scikit-learn\` is the go-to library for machine learning tasks such as clustering, classification, and feature preprocessing.
- \`requests\` is used to make HTTP calls to external APIs, which is how you fetch data from advertising platforms or push results to other systems.
- \`sqlalchemy\` and database connectors allow Python scripts to query data warehouses directly.
- \`matplotlib\` and \`seaborn\` provide basic charting capabilities for exploratory analysis.
- Virtual environments and \`requirements.txt\` keep dependencies isolated and reproducible across machines.
- Python scripts are often run on a schedule using tools such as Azure Functions or Airflow, so understanding file I/O and error handling is important.

**Common pitfalls:**

- Not handling missing or null values before transforming data, which causes silent errors downstream.
- Writing scripts that only work on a local machine because file paths or credentials are hard-coded.
- Ignoring encoding issues when loading CSV exports from advertising platforms that use non-ASCII characters.
- Skipping version control and treating notebooks as the final deliverable rather than a stepping stone to a maintainable script.

---

## SQL – Querying, Filtering and Aggregating Marketing Data

SQL (Structured Query Language) is the standard language for interacting with relational databases and most modern data warehouses. Despite the growth of Python-based data tools, SQL remains the most direct and efficient way to retrieve and summarise large volumes of marketing data.

Marketing databases typically contain tables for customers, orders, campaign events, and channel touchpoints. Being fluent in SQL means you can answer business questions directly without moving large datasets into Python first, which is both faster and more resource-efficient.

**Why it matters:** Almost every marketing data platform — data warehouses, CDPs, analytics tools — exposes its data through SQL or a SQL-compatible interface. Writing efficient queries is the fastest path from a business question to an answer, and it is a skill expected of anyone working with marketing data professionally.

**Key things to understand:**

- \`SELECT\`, \`FROM\`, \`WHERE\` form the foundation of every query and filter rows before aggregation.
- \`ORDER BY\` sorts the result set; \`LIMIT\` restricts how many rows are returned, which is important when exploring large tables.
- \`JOIN\` combines tables — for example, linking a customer table to a purchase table to calculate revenue per segment. The four main join types are: \`INNER JOIN\` (returns only rows with matching records in both tables), \`LEFT JOIN\` (returns all rows from the left table plus any matching rows from the right), \`RIGHT JOIN\` (returns all rows from the right table plus any matching rows from the left), and \`FULL OUTER JOIN\` (returns all rows from both tables, with NULLs where there is no match).
- \`GROUP BY\` with aggregate functions (\`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`) produces the summary statistics used in reporting.
- \`HAVING\` filters on aggregated values, such as showing only segments with more than 1000 customers. It is evaluated after \`GROUP BY\`, unlike \`WHERE\` which filters rows before aggregation.
- Window functions (\`ROW_NUMBER\`, \`RANK\`, \`LAG\`) allow calculations across related rows, which is useful for calculating time-since-last-purchase or ranking customers within a segment.
- Common Table Expressions (CTEs) using \`WITH\` make complex queries easier to read and maintain.

**Common pitfalls:**

- Using \`SELECT *\` in production queries, which pulls unnecessary columns and slows performance on large tables.
- Forgetting that \`JOIN\` without a proper key can create a Cartesian product and multiply row counts unexpectedly.
- Not understanding the difference between \`WHERE\` (pre-aggregation) and \`HAVING\` (post-aggregation).
- Assuming that NULL equals zero; aggregate functions typically ignore NULLs, which can skew results silently.

---

## APIs – How They Work and Why Marketing Platforms Use Them

An API (Application Programming Interface) is a defined contract that lets one piece of software communicate with another. In the context of marketing technology, APIs are the primary mechanism by which data moves between platforms — for example, pulling impressions from an advertising platform, pushing audience segments to an email tool, or triggering a personalisation engine when a user visits a website.

Understanding APIs means you can integrate marketing tools without relying on manual exports, and you can build automation that keeps systems in sync in near real time.

**Why it matters:** Modern marketing stacks are made up of many specialised tools — ad platforms, email systems, CRMs, analytics tools — none of which are built to talk to each other by default. APIs are the connective tissue. A marketing technology developer who understands APIs can automate data flows, build integrations, and reduce the manual work that would otherwise fall on analysts or campaign managers.

**Key things to understand:**

- REST APIs are stateless — each request contains all the information needed to process it. Resources are identified by URLs, and the HTTP method determines the action: \`GET\` reads data, \`POST\` creates a new resource, \`PUT\` replaces an existing resource, \`PATCH\` partially updates a resource, and \`DELETE\` removes it. Data is most commonly exchanged in JSON format.
- Authentication is typically handled with API keys, OAuth tokens, or service accounts; credentials must never be stored in code repositories.
- Rate limits control how many requests you can make in a given time window; exceeding them returns error codes such as 429 and requires retry logic with exponential back-off.
- Pagination is used when an endpoint returns large datasets in chunks; you must iterate through pages to retrieve all records.
- API documentation describes available endpoints, required parameters, expected responses, and error codes — reading it carefully before writing code saves significant debugging time.
- Webhooks are the reverse of a standard API call: the external platform pushes data to your endpoint when an event occurs, rather than you polling for updates.

**Common pitfalls:**

- Not validating API responses before using the data, assuming the schema will always match documentation.
- Storing API keys in plain text in scripts or notebooks that end up in source control.
- Not implementing retry logic, so a single transient failure breaks an entire nightly pipeline.
- Confusing REST with GraphQL or SOAP; different platforms use different styles, and the calling pattern differs.

---

## Machine Learning in Marketing – Use Cases and Limitations

Machine learning (ML) refers to algorithms that learn patterns from data and use those patterns to make predictions or decisions without being explicitly programmed for each case. In marketing, ML is applied to problems such as predicting which customers are likely to churn, identifying which audience segments respond best to a particular message, or forecasting campaign spend efficiency.

A marketing technology developer does not need to be a research scientist, but must understand what ML can and cannot do, and how to work with data scientists to deploy models into production systems.

**Why it matters:** Manual rules and intuition-based targeting can only go so far. ML allows marketing teams to act on patterns in customer behaviour that are invisible to the human eye — predicting who will buy, who will leave, and who is most likely to respond to a specific message. Understanding ML means you can evaluate model proposals critically, integrate model outputs into pipelines, and know when a simpler approach is more appropriate.

**Key things to understand:**

- Supervised learning uses labelled historical data to train a model that predicts an outcome — for example, predicting purchase probability from browsing behaviour.
- Unsupervised learning finds structure in data without predefined labels — customer segmentation via clustering is a common marketing application.
- Key marketing use cases include: **churn prediction** (classification — identifying customers likely to stop buying), **customer segmentation** (clustering — grouping customers by behaviour or value), **recommendation systems** (collaborative filtering or content-based filtering — suggesting relevant products), **lookalike audiences** (finding prospects who resemble your best customers), **propensity models** (scoring how likely a customer is to take a specific action), and **price optimisation** (using demand signals to inform pricing decisions).
- Model performance is measured differently depending on the task; accuracy alone is misleading when one class is rare (for example, churned customers are typically a small fraction of total customers).
- Features — the input variables fed to a model — must be carefully selected and cleaned; the quality of inputs directly determines prediction quality.
- Models require retraining when the underlying data distribution changes, for example after a market shift or major campaign.
- ML is not suitable for every problem; a well-designed rule or a simple SQL query is often more reliable, faster to build, and easier to explain to stakeholders.

**Common pitfalls:**

- Treating a model as a black box and deploying it without understanding what drives its predictions.
- Data leakage — accidentally including information in training data that would not be available at prediction time, producing unrealistically good metrics.
- Overfitting — building a model that performs well on training data but fails on new data because it has memorised noise.
- Neglecting to monitor model performance in production; predictions degrade over time as the world changes.

---

## Data Quality – Why It Matters and How to Assess It

Data quality refers to how well a dataset accurately, completely, and consistently represents the real-world information it is meant to capture. In marketing, data flows from many sources — advertising platforms, CRM systems, web analytics, and offline channels — and each handoff introduces the risk of errors, gaps, or inconsistencies.

Poor data quality leads directly to poor decisions: misleading attribution, inaccurate audience sizes, or incorrect performance reports. A marketing technology developer must be able to identify data quality problems and communicate their impact before they reach dashboards or models.

**Why it matters:** A model or dashboard is only as trustworthy as the data that feeds it. In marketing, bad data has direct business consequences — targeting the wrong audience, misattributing spend, or reporting false results to leadership. Identifying and communicating data quality issues early is one of the highest-value contributions a marketing technology developer can make.

**Key things to understand:**

- **Completeness:** are there missing values in critical fields such as customer ID, timestamp, or conversion flag?
- **Accuracy:** do the values represent reality? For example, are revenue figures in the correct currency and scale?
- **Consistency:** does the same concept use the same definition across systems? "Active customer" may mean different things in the CRM and the data warehouse.
- **Timeliness:** is the data fresh enough for the intended use case? A daily refresh may be acceptable for trend reporting but insufficient for real-time personalisation.
- **Uniqueness:** are records deduplicated? Duplicate rows inflate counts and distort aggregations.
- Profiling tools and simple SQL queries (null counts, distinct value checks, range checks) are the first line of defence when receiving a new dataset.

**Common pitfalls:**

- Assuming that data from a trusted source is clean without checking it.
- Treating all data quality issues as equally urgent; some will have a small impact while others invalidate entire analyses.
- Not documenting known quality issues so that downstream consumers are not caught off guard.
- Fixing quality problems in the analysis layer rather than at the source, so the same issue must be worked around repeatedly.

### Data Privacy Basics

Marketing technology developers work with customer data daily, so a basic awareness of data privacy obligations is essential even at the beginner level. Under GDPR and similar regulations, processing personal data requires a lawful basis such as legitimate interest or explicit consent. The principle of data minimisation means you should only collect and process the data that is genuinely necessary for the task at hand. Users must be able to opt in and out of data collection through clear consent management mechanisms, and systems must support the right to erasure — the ability to delete a customer's personal data on request. These are not edge cases; they are routine requirements in any marketing data workflow. Building an early habit of asking "do we need this data, and are we allowed to use it?" will prevent costly compliance problems later.

---

## Generative AI Basics – What It Is and How It Applies to Marketing

Generative AI refers to machine learning models that can produce new content — text, images, code, or structured data — in response to a prompt. Large language models (LLMs) such as frontier models from OpenAI and Anthropic are the most widely used category in marketing contexts, capable of drafting copy, summarising reports, classifying sentiment, and assisting with data analysis.

Understanding the fundamentals of generative AI allows a marketing technology developer to identify where it genuinely adds value, use it responsibly, and avoid the class of errors that arise from misplaced trust in model outputs.

**Why it matters:** Generative AI is already embedded in marketing workflows — from content drafting and personalisation to automated reporting and customer-facing chat tools. A marketing technology developer who understands how these models work can build reliable integrations, spot failure modes before they affect customers, and make informed decisions about where AI assistance is appropriate versus where human judgement is essential.

**Key things to understand:**

- LLMs generate text by predicting the next most probable token; they do not look up facts, they interpolate from patterns learned during training.
- Prompts are the primary interface; the quality and structure of the input significantly affects the quality and reliability of the output.
- Models have a knowledge cut-off date and do not have access to real-time or proprietary data unless it is provided in the prompt or retrieved via a connected tool.
- Hallucination is the tendency for models to produce plausible-sounding but incorrect information; outputs that include factual claims must be verified.
- Token limits constrain how much text can be processed in a single call; long documents must be chunked or summarised before being sent to the model.
- Generative AI is well-suited to tasks that tolerate imperfect output and benefit from human review — drafting, ideation, and summarisation — and less well-suited to tasks requiring precise factual accuracy or auditability.

**Common pitfalls:**

- Publishing AI-generated marketing content without human review, leading to factual errors or off-brand messaging.
- Sending confidential customer data in prompts to external model APIs, creating privacy and compliance risks.
- Relying on a single zero-shot prompt for a complex task instead of breaking the task into smaller, verifiable steps.
- Assuming that a model that performs well in one context will perform equally well after a prompt change or model update.
`,
    mid: `
# Mid Concept Reference – Marketing Technology Developer

This document provides in-depth explanations of the core concepts covered at the Mid level of the Marketing Technology Developer learning path. It assumes familiarity with the Beginner concepts and builds toward the analytical and AI-assisted skills needed for independent delivery of marketing data products.

---

## Data Visualisation – Chart Selection, Interpretation and Storytelling with Data

Data visualisation is the practice of representing data graphically so that patterns, trends, and anomalies become immediately apparent to an audience. In marketing, it is the primary way to communicate campaign performance, customer behaviour, and the impact of decisions to both technical and non-technical stakeholders.

Choosing the wrong chart type or presenting data without context can mislead audiences or obscure the actual insight. A marketing technology developer must understand not just how to produce charts, but how to select and frame them so the data tells a clear, honest story.

**Why it matters:** Marketing decisions are made by people who cannot read raw data. A well-constructed chart can surface a performance problem or justify a budget reallocation in seconds; a poorly constructed one can hide the same insight for weeks. The ability to visualise data clearly is one of the most direct ways to create impact from analytical work.

**Key things to understand:**

- Line charts are appropriate for continuous trends over time, such as weekly reach or daily conversions.
- Bar charts compare discrete categories; horizontal bars work better when category labels are long.
- Scatter plots reveal the relationship between two continuous variables, for example spend versus return.
- Pie and donut charts are best reserved for showing part-to-whole relationships with very few segments; they become unreadable with more than four or five slices.
- Dual axes on a single chart frequently mislead; if two metrics must be shown together, consider separate panels with aligned scales.
- Context matters as much as the data itself: always label axes, include units, and show a comparison baseline such as a prior period or a target.
- Storytelling with data means leading the audience to a specific conclusion rather than presenting raw charts and expecting them to draw their own interpretation.

**Common pitfalls:**

- Truncating the y-axis to make small differences look dramatic.
- Using colour as the only distinguishing feature in a chart, making it inaccessible to people with colour vision deficiencies.
- Showing averages without any measure of spread, hiding the variability that often contains the real insight.
- Over-annotating charts until the visual becomes cluttered and harder to read than a table.

---

## A/B Testing – Hypothesis, Sample Size, Statistical Significance and Pitfalls

An A/B test is a controlled experiment in which exactly two versions of something are shown to randomly assigned groups: a control group (A) that receives the current experience, and a variant group (B) that receives the change being tested — for example, a different email subject line, landing page design, or bidding strategy. The outcomes are compared statistically to determine whether the change caused a measurable improvement. It is the gold standard method for establishing causation rather than correlation.

Marketing technology developers are frequently responsible for setting up, monitoring, and analysing experiments, and for helping stakeholders understand what the results mean and what they do not mean.

**Why it matters:** Without controlled experimentation, it is impossible to know whether a change in a marketing metric was caused by a decision or by some unrelated external factor. A/B testing is how data-driven marketing teams make confident, defensible decisions about what to change and what to leave alone. Getting the methodology wrong leads to false conclusions and wasted budget.

**Key things to understand:**

- A hypothesis must be stated before the test begins: what change is being made, what metric is expected to move, and in what direction.
- Sample size must be calculated in advance using a power analysis — this takes into account the expected effect size, the baseline conversion rate, and the desired statistical power (typically 80%). Running a test without a pre-calculated sample size produces unreliable results.
- Statistical significance (commonly set at p < 0.05) indicates the probability that the observed difference would occur by chance if there were no real effect; it does not measure the size or business value of the effect.
- Practical significance — whether the effect is large enough to matter in business terms — must be considered alongside statistical significance.
- Tests should be run for a full business cycle to avoid day-of-week or seasonality bias.
- Multiple testing — running many simultaneous experiments and cherry-picking significant results — inflates the false positive rate and requires corrections such as the Bonferroni method.

**Common pitfalls:**

- Peeking — stopping a test early because it "looks significant" — dramatically increases the false positive rate and is one of the most common mistakes in experimentation.
- Changing the test design or the primary metric after the experiment has started.
- Failing to check that the randomisation process actually produced balanced groups.
- The novelty effect: users may respond differently to a new experience simply because it is new, not because it is better. Results measured in the first few days may not reflect long-term behaviour.
- Survivorship bias: if only active or engaged users are included in the analysis (for example, users who opened an email rather than all users who received it), the measured effect may not generalise to the full population.
- Confusing statistical significance with business impact; a statistically significant 0.1% uplift may not justify the cost of implementation.

---

## Feature Engineering for Marketing Data – RFM, Attribution and Conversion Metrics

Feature engineering is the process of transforming raw data into inputs that a machine learning model can learn from effectively. The quality and relevance of features are often more important to model performance than the choice of algorithm itself.

Marketing datasets are rich but messy: they contain timestamps, categorical identifiers, sparse signals, and high-cardinality fields. A marketing technology developer must know how to extract meaningful signals from this raw material.

**Why it matters:** Raw marketing data — timestamps, event logs, transaction records — is not in a form that a model can directly use. Feature engineering is the translation step. Well-engineered features encode domain knowledge about customer behaviour and make it possible to build models that are both accurate and interpretable to business stakeholders.

**Key things to understand:**

- **RFM (Recency, Frequency, Monetary)** is a classic framework that summarises customer purchase behaviour into three features: how recently a customer bought, how often they buy, and how much they spend. These three features alone can power effective segmentation and propensity models, and they are widely used because they are simple to calculate, interpretable, and predictive.
- **Attribution features** encode how credit for a conversion is distributed across marketing touchpoints. Common attribution models include: first-touch (100% credit to the first touchpoint), last-touch (100% credit to the last touchpoint before conversion), linear (equal credit to all touchpoints), time-decay (more credit to touchpoints closer in time to the conversion), and data-driven or multi-touch (uses ML to assign credit based on actual contribution). Attribution model choice significantly affects which channels appear effective. Note that Google removed first-touch, linear, time-decay, and position-based attribution models from Google Analytics 4 and Google Ads during 2023-2024, making data-driven attribution the default. This industry shift means that understanding how data-driven attribution works is now more important than memorising the mechanics of the legacy rule-based models.
- **Conversion metrics** such as conversion rate, customer acquisition cost (CAC), and customer lifetime value (CLV) are frequently engineered as features or targets in marketing models. Churn rate — the proportion of customers who stop purchasing over a given period — is another key derived metric used as both a feature and a model target.
- Temporal features derived from timestamps — day of week, time since last event, number of events in the last 30 days — capture behavioural patterns that raw timestamps cannot convey to a model.
- Categorical encoding transforms text labels into numeric representations; one-hot encoding works for low-cardinality fields while target encoding or embeddings are better suited to high-cardinality fields such as product category.
- Interaction features combine two existing features to capture relationships that either feature alone cannot express — for example, spend per visit as a ratio of total spend and visit count.
- Feature scaling (normalisation or standardisation) ensures that features with large numeric ranges do not dominate distance-based algorithms.
- Train-test split must be applied before any feature statistics are calculated; calculating means or percentiles on the full dataset before splitting leaks information from the test set into the training set.

**Common pitfalls:**

- Creating features that include future information relative to the prediction date, a form of data leakage that produces optimistic but invalid metrics.
- Engineering dozens of features without assessing their importance, leading to slower models and potential overfitting.
- Forgetting to handle unseen categories at prediction time that were not present during training.
- Not version-controlling the feature engineering logic alongside the model, making it impossible to reproduce predictions later.

---

## ML Algorithms for Marketing – Segmentation, Churn Prediction and Propensity Models

Different business problems in marketing require different algorithmic approaches. A mid-level marketing technology developer should be able to map a business question to an appropriate class of algorithm, understand the key assumptions and trade-offs, and communicate model outputs to non-technical stakeholders.

**Why it matters:** Choosing the wrong algorithm — or applying an algorithm without understanding its assumptions — leads to models that perform poorly or produce results that cannot be explained or trusted. Understanding the landscape of algorithms used in marketing means you can have productive conversations with data scientists, evaluate proposed solutions critically, and contribute meaningfully to model design decisions.

**Key things to understand:**

- K-means clustering groups customers into segments based on feature similarity; the number of clusters must be chosen deliberately, for example by examining inertia curves or using domain knowledge about how many actionable segments exist.
- Logistic regression is a strong baseline for binary classification problems such as churn prediction or email open propensity; it produces interpretable coefficients and calibrated probability scores.
- Gradient boosting models (XGBoost, LightGBM) typically outperform logistic regression on complex tabular marketing data and handle missing values and mixed feature types well, at the cost of reduced interpretability.
- Random forests provide built-in feature importance estimates, which are useful for understanding which customer attributes drive behaviour.
- Recommendation systems suggest relevant products or content to individual customers. Collaborative filtering identifies recommendations based on the behaviour of similar users; content-based filtering recommends items similar to what the user has previously engaged with.
- Lookalike audience models find prospects in a broader population who resemble your best existing customers; they are typically built using classification or embedding-based similarity approaches.
- Model evaluation metrics must match the business goal: precision and recall matter more than accuracy when the positive class is rare, as is common in churn and propensity modelling.
- Propensity scores — predicted probabilities — are more actionable than binary predictions because they allow prioritisation by likelihood rather than a hard cut-off.

**Common pitfalls:**

- Selecting an algorithm based on familiarity rather than suitability for the problem and data.
- Optimising for model accuracy without considering the cost of false positives versus false negatives in the business context.
- Presenting model output to stakeholders as a certainty rather than a probability estimate.
- Not establishing a simple baseline (such as a rule-based approach) before investing in a complex model.

---

## Prompt Engineering for Marketing Tasks

Prompt engineering is the practice of designing the text instructions given to a large language model to produce outputs that are accurate, appropriately formatted, and fit for purpose. In a marketing context, this covers tasks such as drafting campaign copy, summarising customer feedback, generating content variations, and analysing campaign performance reports in natural language.

A well-designed prompt is explicit about the task, the audience, the format required, and the constraints that must be respected.

**Why it matters:** The quality of output from a language model is directly determined by the quality of its input. A vague or poorly structured prompt produces generic, inconsistent, or incorrect output. A well-crafted prompt is the difference between an AI tool that genuinely saves time and one that creates more work through editing and correction. For marketing teams using AI at scale, prompt quality has a direct impact on content quality and operational efficiency.

**Key things to understand:**

- Role framing — telling the model to behave as a specific type of expert — can improve the relevance and tone of output for specialised marketing tasks.
- Few-shot examples provide the model with concrete demonstrations of the desired output format, which significantly improves consistency compared to a zero-shot instruction alone.
- Chain-of-thought prompting asks the model to reason step by step before producing an answer, which is particularly useful for analytical tasks such as interpreting campaign metrics.
- Constraints must be explicit: word count limits, required keywords, prohibited topics, target audience, and tone should all be stated clearly rather than implied.
- Temperature controls the randomness of model output; lower values produce more predictable, conservative text suitable for factual summaries, while higher values produce more varied output suited to creative ideation.
- Prompt length is limited by the model's context window; long prompts with extensive examples may leave little space for the response.

**Common pitfalls:**

- Writing vague prompts and attributing poor output to the model rather than to the instruction.
- Over-relying on a single prompt template across very different tasks without testing whether it remains effective.
- Not iterating on prompts systematically — changing multiple variables at once makes it impossible to identify which change caused an improvement.
- Forgetting that prompt changes can break previously reliable workflows; prompts used in production should be version-controlled and tested before deployment.

---

## Context Engineering – Building Effective AI Pipelines for Marketing Content

Context engineering extends beyond individual prompt design to the architecture of how information is assembled and delivered to a language model across an entire workflow. While prompt engineering focuses on the wording of instructions, context engineering addresses what data is retrieved, how it is structured, and how multiple model calls are coordinated to produce a reliable end-to-end result.

In marketing technology, context engineering is relevant when building systems that generate personalised content at scale, summarise large volumes of customer feedback, or power internal tools that answer questions about campaign performance.

**Why it matters:** A single well-written prompt is not enough when building a production marketing AI system. The model needs the right information at the right time — product details, campaign briefs, brand guidelines, customer history — structured in a way that it can actually use. Context engineering is what separates a one-off demo from a reliable, maintainable system that works consistently across thousands of inputs.

**Key things to understand:**

- The context window — the total amount of text a model can process in a single call — constrains how much information can be included; prioritising the most relevant content over exhaustive inclusion usually produces better results.
- Retrieval-augmented generation (RAG) retrieves relevant documents from a knowledge base and includes them in the prompt, grounding model output in specific, current information rather than relying on the model's training data alone.
- System prompts define the model's behaviour, persona, and constraints across an entire session; they are typically set once and persist across user turns.
- Chunking and summarisation are used to process documents that are too long to fit in a single context window; the strategy for how content is divided and compressed affects output quality significantly.
- Pipelines that chain multiple model calls should pass only the relevant output from each step, not the full accumulated context, to avoid hitting token limits and to keep later steps focused.
- Evaluation of context engineering decisions requires testing with representative inputs; qualitative review by domain experts is often necessary in addition to automated metrics.

**Common pitfalls:**

- Filling the context window with marginally relevant information, diluting the signal and degrading output quality.
- Not testing the pipeline with edge-case inputs such as unusually long documents or queries that fall outside the knowledge base.
- Treating context engineering as a one-time setup task rather than an ongoing calibration as data and model versions change.
- Conflating retrieval quality with generation quality; a pipeline can retrieve the right information yet still produce a poor response if the prompt does not guide the model to use it well.

---

## AI-Assisted Analysis – Practical Workflows

AI-assisted analysis refers to the use of language models and AI-powered tools to accelerate and augment the analytical work of a marketing technology developer. This includes using AI to explore data, generate hypotheses, write and explain code, interpret results, and produce draft narratives around findings.

The goal is not to replace analytical judgement but to reduce the time spent on mechanical tasks so more effort can be directed at interpretation, validation, and decision-making.

**Why it matters:** Marketing analysis involves a significant amount of repetitive, mechanical work — writing boilerplate queries, reformatting data, drafting report summaries. AI tools can compress this work substantially, freeing time for higher-value judgement tasks. Understanding how to use these tools effectively — and where they fall short — is quickly becoming a baseline expectation for analytical roles.

**Key things to understand:**

- AI assistants can generate SQL queries, Python scripts, and regular expressions from plain-language descriptions; the output must be reviewed and tested before use.
- Describing a dataset and a business question in natural language and asking for hypotheses or analytical approaches is a useful way to broaden the scope of an investigation quickly.
- AI tools can explain unfamiliar code or error messages, which accelerates learning and debugging without replacing the need to understand what the code does.
- Iterative refinement — providing feedback on an AI-generated output and asking for a revised version — generally produces better results than trying to write the perfect prompt on the first attempt.
- Human validation remains essential: AI-generated analysis can contain errors in logic, incorrect assumptions about the data, or misinterpretation of domain-specific terminology.
- Keeping a record of AI-assisted work — including the prompts used and the outputs accepted — supports reproducibility and makes peer review easier.

**Common pitfalls:**

- Accepting AI-generated code or analysis without running it or checking the logic, creating the impression of productivity while introducing errors.
- Using AI to generate narratives from data without first verifying that the underlying numbers are correct.
- Not adapting AI-generated outputs to the specific audience and context; generic outputs often require significant editing to be genuinely useful.
- Developing a dependency on AI assistance for tasks that should become internalized skills, slowing professional development over time.

---

## Customer Data Platforms and Analytics

A Customer Data Platform (CDP) is a system that collects, unifies, and activates customer data from multiple sources — website interactions, app usage, CRM records, email engagement, and offline touchpoints — into a single, persistent customer profile. Unlike a data warehouse (which stores data for analysis) or a CRM (which stores data for sales), a CDP is designed to make unified customer data available in real time to marketing tools, personalisation engines, and analytics platforms.

Analytics platforms like Google Analytics 4 (GA4) provide the instrumentation layer that captures user behaviour on websites and apps. GA4 uses an event-based model where every interaction (page view, button click, form submission, purchase) is recorded as an event with associated parameters. Understanding how to configure event tracking, set up conversions, and build reports is a core skill for marketing technology developers.

Tag management systems (Google Tag Manager, Adobe Launch) sit between the website and the analytics/marketing tools. Instead of hardcoding tracking scripts into the website, tag management systems allow marketing teams to add, modify, and remove tracking tags through a UI — reducing the dependency on developer releases for marketing instrumentation changes.

**Why it matters:** Modern marketing depends on understanding customer behaviour across channels. CDPs and analytics platforms are the infrastructure that makes this possible. As a marketing technology developer, you need to understand how customer data flows from touchpoints through collection, unification, and activation — and how to instrument that flow correctly.

**Key things to understand:**

- CDP architecture: data collection (SDKs, APIs, event streams), identity resolution (matching anonymous and known user profiles across devices and channels), profile unification (merging data into a single customer view), activation (sending unified profiles to downstream tools like email platforms, ad networks, personalisation engines)
- GA4 event model: everything is an event. Automatically collected events (page_view, session_start), enhanced measurement events (scroll, outbound_click, file_download), recommended events (purchase, sign_up), and custom events. Each event can have custom parameters for additional context
- Consent management: GDPR requires explicit consent before collecting personal data for analytics. Consent Management Platforms (CMPs) must be integrated with analytics and CDP tools to respect user choices — no consent means no tracking
- First-party data strategy: as third-party cookies are deprecated, CDPs become more important for building direct relationships with customers using consented first-party data (data collected directly from the customer through your own properties)

**Common pitfalls:**

- Implementing analytics tracking without a measurement plan — deciding what to track before writing code ensures you collect meaningful data instead of everything-and-nothing
- Not testing analytics implementations — events must be validated in debug mode before deployment. Incorrect event parameters or missing tracking can go unnoticed for weeks
- Treating the CDP as a "plug and play" solution — identity resolution is hard, and unifying data from multiple sources requires careful schema design and ongoing data quality work
- Ignoring consent requirements when setting up tracking — deploying analytics without proper consent management violates GDPR and can result in significant fines
`,
    senior: `
# Senior Concept Reference – Marketing Technology Developer

This document provides in-depth explanations of the core concepts covered at the Senior level of the Marketing Technology Developer learning path. It assumes fluency with the Beginner and Mid concepts and focuses on system design, advanced AI architecture, and the governance skills required to lead delivery of significant marketing technology initiatives.

---

## RAG Systems – Architecture and Application to Marketing Knowledge Bases

Retrieval-Augmented Generation (RAG) is an architectural pattern that combines a language model with a retrieval mechanism so that responses are grounded in specific, current information from an external knowledge base rather than in the model's training data alone. This is particularly valuable in marketing contexts where the relevant information — product catalogues, campaign briefs, brand guidelines, campaign performance data, and customer data policies — changes frequently and must be accurate.

A senior marketing technology developer should be able to design, build, and evaluate a RAG system end to end, understanding the trade-offs at each component level.

**Why it matters:** LLMs trained on general data cannot answer questions about your specific products, campaigns, or customers without being given that information explicitly. RAG is the standard architectural solution: instead of retraining the model (expensive and slow), you retrieve the relevant documents at query time and inject them into the prompt. This enables internal tools that can answer questions like "what was the ROAS on last quarter's campaign?" or "what are the brand guidelines for this product category?" — using your actual data.

**Key things to understand:**

- The indexing pipeline converts source documents into vector embeddings, which are numerical representations of semantic meaning, and stores them in a vector database that supports similarity search.
- At query time, the user's question is embedded using the same model, and the nearest document chunks are retrieved and injected into the language model's prompt as context.
- Chunking strategy — how documents are divided before embedding — significantly affects retrieval quality; chunks that are too large reduce precision, while chunks that are too small lose surrounding context.
- Reranking applies a second model to the retrieved candidates to improve relevance before they are passed to the generator, at the cost of additional latency.
- Evaluation of a RAG system requires measuring retrieval quality (were the right chunks returned?) and generation quality (did the model use them correctly?) separately.
- Hybrid retrieval — combining dense vector search with keyword-based search — often outperforms either method alone, particularly for queries that contain specific product names or campaign identifiers.

**Common pitfalls:**

- Treating the vector database as a solved component and not testing retrieval quality with real user queries.
- Using a single chunk size for all document types rather than adapting to document structure.
- Not implementing a feedback loop to identify queries where retrieval failed, leading to undetected degradation over time.
- Neglecting to update the index when source documents change, so the model continues to cite stale information.

---

## LangGraph – Orchestrating Marketing AI Workflows

LangGraph is a framework for building stateful, multi-step AI workflows using a graph-based execution model. Unlike simple prompt chains, LangGraph allows workflows to branch conditionally, loop until a condition is met, and maintain state across multiple steps. This makes it suited to marketing automation tasks that require decision logic, tool use, and human-in-the-loop review steps.

A senior marketing technology developer should understand how to model a business process as a LangGraph workflow, manage state effectively, and design for reliability and observability.

**Why it matters:** Real marketing automation workflows are not linear sequences of prompts. They involve decisions — route this content for human approval, retry this API call, escalate this edge case — and they need to interact with external systems such as databases, content management tools, and advertising platforms. LangGraph provides the structure to build these workflows reliably, with explicit state management and the ability to pause for human review at critical points.

**Key things to understand:**

- Nodes in a LangGraph graph represent discrete steps — a model call, a tool invocation, a data lookup — and edges define the conditions under which execution moves from one node to the next.
- State is a typed schema that is passed through the graph and updated at each node; defining the state schema carefully at the outset prevents ambiguity about what data is available at each step.
- Conditional edges allow the workflow to route based on the content of the current state — for example, routing to a human review node when a generated output falls below a confidence threshold.
- Tool nodes connect the workflow to external systems such as APIs, databases, or file storage, enabling the agent to act on the world rather than only generate text.
- Interrupts allow a human to review and approve or modify the agent's state before execution continues, which is essential for workflows that produce customer-facing content or execute financial transactions.
- Checkpointing persists the graph state so that long-running workflows can be resumed after a failure without restarting from the beginning.

**Common pitfalls:**

- Designing graphs that are difficult to observe and debug because state transformations are spread across many small nodes without clear logging.
- Not handling tool call failures gracefully, causing the entire workflow to fail when a single external API returns an error.
- Allowing unlimited loops without a maximum iteration count, risking runaway execution and unexpected cost.
- Building complex multi-agent graphs before establishing that a simpler single-agent design cannot meet the requirements.

---

## Architecture Patterns for Marketing Technology Platforms

Architecture patterns are reusable solutions to recurring system design problems. In marketing technology, the choice of pattern determines how data flows between systems, how quickly the platform can respond to new business requirements, and how reliably it operates under load.

A senior marketing technology developer must be able to evaluate alternative patterns against the specific constraints of a marketing context — high data volume, frequent schema changes, multiple upstream source systems, and a mix of batch and real-time processing requirements.

**Why it matters:** Architectural decisions made early are expensive to reverse later. A pattern that works well for a small campaign reporting tool may collapse under the data volumes and latency requirements of a real-time personalisation engine. Understanding these patterns means you can ask the right questions during design, identify risks before they materialise in production, and advocate for the approach that best fits the actual requirements.

**Key things to understand:**

- The Lambda architecture separates processing into a batch layer for comprehensive historical computation and a speed layer for low-latency real-time updates; results from both layers are merged in a serving layer. It is well understood but complex to maintain.
- The Kappa architecture simplifies Lambda by treating all data as a stream and reprocessing historical data through the same stream-processing pipeline; it reduces operational complexity but requires a stream processor capable of handling high throughput.
- Event-driven architecture decouples producers and consumers using an event broker; marketing platforms often use this pattern to propagate customer events — page views, purchases, consent updates — to multiple downstream systems without tight coupling.
- The medallion architecture (Bronze, Silver, Gold layers) is common in data lakehouses; raw data lands in Bronze, is cleaned and standardised in Silver, and is aggregated for specific use cases in Gold. It makes data lineage and quality management explicit.
- Microservices allow individual marketing capabilities — segmentation, content serving, attribution — to be developed, deployed, and scaled independently, but introduce network overhead and distributed system complexity.
- API gateway patterns centralise authentication, rate limiting, and routing for the many external integrations that characterise marketing platforms.

**Common pitfalls:**

- Applying a distributed pattern to a problem that could be solved with a well-designed monolith, introducing unnecessary operational complexity.
- Underestimating the cost and effort of operating event-driven or stream-processing systems in production.
- Not designing for schema evolution from the start; marketing data schemas change frequently as new channels and tools are added.
- Choosing an architecture based on industry trends rather than the specific throughput, latency, and consistency requirements of the platform being built.

---

## System Design for Data-Intensive Marketing Applications

System design for data-intensive applications addresses how to build systems that must store, process, and serve large volumes of marketing data reliably, efficiently, and at low cost. At the senior level, this means making deliberate decisions about data storage, processing topology, consistency guarantees, and failure modes.

**Why it matters:** Marketing platforms at scale must handle high-velocity event streams, serve personalisation decisions with low latency, and maintain accurate reporting across billions of records. Getting these design decisions right separates a system that handles growth gracefully from one that requires constant firefighting as traffic increases. Senior developers are expected to reason about these trade-offs and document their decisions clearly.

**Key things to understand:**

- Normalisation reduces data duplication and simplifies updates in transactional systems (OLTP), while denormalisation improves read performance in analytical systems (OLAP); marketing platforms often need both, served by separate data stores.
- Partitioning (sharding) distributes data across multiple nodes to handle scale; partitioning by date is common for time-series marketing data because most queries filter by time window.
- Caching reduces latency and database load for frequently accessed data such as customer segment memberships; cache invalidation strategy must be defined explicitly to avoid serving stale personalisation data.
- Idempotency ensures that retrying a failed operation — for example, recording a campaign impression — does not create duplicate records; achieving idempotency typically requires a unique event identifier and deduplication logic.
- Eventual consistency is acceptable for many marketing use cases such as aggregated reporting, but not for others such as real-time offer eligibility where stale data could lead to incorrect customer experience.
- Monitoring and alerting must cover both infrastructure metrics (latency, error rate, queue depth) and business metrics (event volume, segment sizes) so that anomalies are detected at whichever layer they first appear.

**Common pitfalls:**

- Designing for peak load of a specific campaign without accounting for how requirements will grow as the platform matures and more channels are added.
- Not testing failure modes; systems that have never been run with a failed dependency often have untested recovery paths that do not work in practice.
- Storing all marketing data in a single large table because it is the simplest structure to reason about, leading to performance and maintainability problems at scale.
- Conflating the data model used for processing with the data model used for serving; they often need to be different shapes.

---

## LLM Security – Risks in Customer-Facing AI Marketing Tools

Deploying large language models in customer-facing marketing tools introduces a class of security and safety risks that differ from those associated with traditional software. These risks arise from the model's ability to generate arbitrary text, follow instructions embedded in user input, and access tools or data via function calls.

A senior marketing technology developer is responsible for identifying these risks during design, implementing mitigations, and contributing to the organisation's AI governance posture.

**Why it matters:** A customer-facing AI marketing tool that can be manipulated into revealing competitor pricing, exposing other customers' data, or generating harmful content is a reputational and legal liability. These risks do not exist in traditional web applications and are not mitigated by standard web security controls. Senior developers must understand this threat landscape to design systems that are robust by default, not just by hope.

**Key things to understand:**

- Prompt injection is an attack in which a user embeds instructions in their input that cause the model to override its system prompt and behave in unintended ways — for example, revealing confidential system instructions or generating off-brand content.
- Indirect prompt injection occurs when injected instructions arrive not from the user directly but from content the model retrieves — for example, a malicious instruction embedded in a document that the model is asked to summarise.
- Sensitive data exposure risks arise when a model with access to customer data is prompted to reveal information about another customer or to exfiltrate data via a tool call.
- Jailbreaking refers to user attempts to bypass content filters or safety constraints through carefully crafted prompts; models cannot be assumed to be robust to all jailbreak attempts.
- Input validation and output filtering are the primary technical controls: validate that user inputs conform to expected formats and length limits before passing them to the model, and filter model outputs to detect and block policy violations before they reach the user.
- Least-privilege tool access means that tools connected to an agent should only be granted the permissions required for their specific function; an agent that generates marketing copy does not need write access to customer records.

**Common pitfalls:**

- Treating LLM security as equivalent to traditional web application security and not accounting for the unique risks introduced by natural language inputs and outputs.
- Relying solely on the model's built-in safety training as the only control rather than implementing defence in depth.
- Not logging model inputs and outputs, making it impossible to investigate incidents after they occur.
- Deploying a customer-facing AI tool without a defined process for handling reports of unexpected or harmful outputs.

---

## AI Governance for Marketing – Policy, Data Privacy and Responsible Use

AI governance in marketing refers to the frameworks, policies, and processes that ensure AI-powered marketing tools are built and operated in a way that is legal, ethical, transparent, and aligned with the organisation's values. As AI becomes more deeply embedded in how organisations communicate with customers, governance is a senior responsibility, not a compliance afterthought.

**Why it matters:** The consequences of ungoverned AI in marketing are significant: regulatory penalties for improper use of personal data, discriminatory outcomes from biased models, reputational damage from harmful outputs, and inability to respond to customer complaints or regulatory inquiries because the system is not documented. Senior developers who understand AI governance are able to build systems that are defensible, auditable, and trusted by the organisations that rely on them.

**Key things to understand:**

- Data privacy regulations constrain what customer data can be used to train or prompt AI models; personal data must be handled in accordance with applicable law, and using customer data to build targeting models requires a lawful basis under regulations such as GDPR. In addition to GDPR, the EU AI Act entered into force in August 2024 with phased enforcement running through 2026. Insurance-adjacent AI use cases — including customer-facing chatbots, automated pricing, and risk-related targeting — may be classified as high-risk under the Act, which imposes requirements for transparency, human oversight, and technical documentation. August 2026 is the major compliance deadline for high-risk AI systems, making it directly relevant for marketing technology teams building or operating AI tools in the EU market.
- Transparency obligations in some jurisdictions require organisations to disclose when a customer has interacted with an automated system or when a decision affecting them has been made by an algorithm.
- Bias and fairness: AI models trained on historical marketing data can encode and amplify existing biases, for example by systematically excluding certain demographic groups from campaign targeting. Regular audits are necessary to detect and address this.
- Model documentation — recording what data a model was trained on, what it was designed to do, its known limitations, and its intended deployment context — is the foundation of responsible AI practice and is increasingly required by regulation.
- Human oversight requirements: high-stakes decisions, such as those affecting credit, insurance, or employment, require meaningful human review; marketing applications adjacent to these domains should be designed with review workflows built in.
- Incident response: organisations must have a defined process for detecting, investigating, and remediating cases where an AI marketing tool produces harmful, discriminatory, or non-compliant output.

**Common pitfalls:**

- Treating governance as a one-time approval process rather than an ongoing operational responsibility.
- Not involving legal, privacy, and ethics stakeholders until late in the development process, when changes are costly.
- Assuming that because a use case is "just marketing" it is low risk; customer-facing AI that influences purchasing decisions or uses inferred personal attributes carries significant regulatory and reputational risk.
- Failing to maintain documentation as models and data sources change, leaving the organisation unable to answer basic questions about how a deployed system works.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems, including customer-facing AI marketing tools that influence purchasing decisions, require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from marketing technology developers building AI-powered campaign tools to marketers using AI-assisted content generation.

**Why it matters:** The AI Policy is the organisation's binding commitment to responsible AI use. For marketing technology developers, this is particularly relevant because marketing AI tools often process customer data, generate customer-facing content, and influence targeting decisions — all of which carry significant privacy and fairness implications under the policy.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- Customer data used in AI-powered marketing must comply with GDPR — lawful basis, purpose limitation, and data minimisation requirements apply.
- Transparency obligations require clear disclosure when customers interact with AI-generated content or AI-driven personalisation.

**Common pitfalls:**
- Building AI-powered marketing tools without registering the use case, particularly when customer data is involved.
- Using customer data to train or prompt AI models without verifying that a lawful basis under GDPR exists for that specific purpose.
- Treating the AI Policy as separate from the AI Governance for Marketing practices already covered above — they are complementary, and compliance requires both.

---

## Language Deep Dives

- [JavaScript Deep Dive](/language/javascript) — Client-side tracking, analytics, and integrations
- [HTML & CSS Deep Dive](/language/html-css) — Landing pages, email templates, and web content
`,
  },
  'ML-Engineer': {
    overview: `# ML Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

ML Engineers build, train, evaluate, and deploy machine learning models. The role covers data preparation, feature engineering, model selection, training, evaluation, MLOps, and production monitoring.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| ML Fundamentals | [Machine Learning Explained Simply (12 min)](https://www.youtube.com/watch?v=Au1OxVSyGas) | Video |
| ML Concepts Overview | [All ML Concepts Explained in 22 min](https://www.youtube.com/watch?v=Fa_V9fP2tpU) | Video |
| AI vs ML vs Deep Learning | [AI, ML, Deep Learning and GenAI Explained](https://www.youtube.com/watch?v=qYNweeDHiyU) | Video |
| Python for ML | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python for ML | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| NumPy | [NumPy – Official Tutorials](https://numpy.org/learn/) | Interactive |
| Data Manipulation | [Kaggle Learn – Pandas](https://www.kaggle.com/learn/pandas) | Interactive |
| Data Visualization | [Kaggle Learn – Data Visualization](https://www.kaggle.com/learn/data-visualization) | Interactive |
| Interactive ML Practice | [Kaggle Learn – Intro to ML](https://www.kaggle.com/learn/intro-to-machine-learning) | Interactive |
| scikit-learn | [scikit-learn – Getting Started](https://scikit-learn.org/stable/getting_started.html) | Docs |
| Algorithms Visual | [Essential ML Concepts Animated](https://www.youtube.com/watch?v=PcbuKRNtCUc) | Video |

### After completing Beginner you should be able to:

- Explain supervised vs unsupervised learning and give examples of each
- Describe the ML training pipeline (data, features, model, evaluation)
- Write Python scripts using NumPy and Pandas for data manipulation
- Train and evaluate a basic ML model using scikit-learn
- Create basic data visualisations to explore and communicate patterns

For deep explanations of each concept, see the [Beginner Concept Reference](ML-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| All ML Algorithms | [All ML Algorithms Explained in 17 min](https://www.youtube.com/watch?v=E0Hmnixke2g) | Video |
| Feature Engineering | [Kaggle Learn – Feature Engineering](https://www.kaggle.com/learn/feature-engineering) | Interactive |
| Intermediate ML Practice | [Kaggle Learn – Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) | Interactive |
| Neural Networks / Deep Learning | [PyTorch – Official Tutorials](https://pytorch.org/tutorials/) | Docs |
| Experiment Tracking | [MLflow – Getting Started](https://mlflow.org/docs/latest/getting-started/index.html) | Docs |
| MLOps | [End-to-end MLOps with Azure ML – Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/build-first-machine-operations-workflow/) | Interactive |
| Algorithms and Data Structures | [Algorithms and Data Structures Pt.1 – Pluralsight](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) | Course |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |

### After completing Mid you should be able to:

- Compare and select appropriate ML algorithms for structured data problems
- Engineer features from raw data to improve model performance
- Train and evaluate neural networks using PyTorch
- Track experiments systematically using MLflow or Azure ML
- Deploy a model as a containerised API endpoint using MLOps practices

For deep explanations of each concept, see the [Mid Concept Reference](ML-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| ML Foundations for AI Engineers | [ML Foundations for AI Engineers (34 min)](https://www.youtube.com/watch?v=BUTjcAjfMgY) | Video |
| Advanced MLOps | [Microsoft Learn – MLOps maturity model](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/mlops-maturity-model) | Docs |
| Model Monitoring | [Microsoft Learn – Monitor models with Azure ML](https://learn.microsoft.com/en-us/azure/machine-learning/concept-model-monitoring) | Docs |
| Responsible AI | [Fairlearn – Fairness in ML](https://fairlearn.org/) | Docs |
| Dynamic Programming | [Dynamic Programming – Full Course](https://www.youtube.com/watch?v=66hDgWottdA) | Video |
| Algorithms and Data Structures | [Part 1](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) / [Part 2](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-two/course-overview) | Course |
| AI Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Enterprise GenAI Strategy | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |

### After completing Senior you should be able to:

- Design and operate an end-to-end MLOps pipeline with experiment tracking, model registry, and automated deployment
- Detect and respond to data drift and model degradation in production
- Evaluate ML models for fairness and bias across protected groups
- Recognise algorithm complexity issues and propose solutions with better Big O profiles
- Apply AI governance and policy requirements to ML projects

For deep explanations of each concept, see the [Senior Concept Reference](ML-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `# ML Engineer – Beginner Concept Reference


This document provides in-depth explanations of the core concepts covered at the Beginner level of the ML Engineer learning path. Each section describes what a concept is, why it matters in practice, what you need to understand about it, and the mistakes engineers most commonly make when encountering it for the first time.

---

## Machine Learning – What It Is and How It Differs from Traditional Programming

Machine learning (ML) is a branch of computer science where a system learns patterns from data rather than following a set of hand-written rules. In traditional programming, a developer explicitly encodes every decision the program can make: if the input looks like X, return Y. In ML, the developer instead provides examples of inputs and desired outputs, and an algorithm finds the mapping between them automatically.

This distinction matters because many real-world problems are too complex or too variable to encode as explicit rules. Recognising whether an image contains a cat, predicting whether a loan will default, or deciding what product to recommend next would each require thousands of brittle, hand-crafted rules in a traditional approach. An ML model can learn those patterns directly from data.

**Why it matters:** Everything you do in this role rests on understanding the difference between rule-based logic and learned behaviour. Knowing when ML is the right tool — and when a simpler rule-based approach is better — is a judgement you will exercise constantly.

**Key things to understand:**
- In traditional programming, logic flows from code. In ML, logic flows from data.
- ML models are not programmed; they are trained on examples.
- The quality and quantity of training data directly determines model quality.
- ML is not a replacement for all software engineering; it is a tool for specific problem types.

**Common pitfalls:**
- Assuming ML will always outperform a well-tuned rule-based system — for simple, stable problems it often will not.
- Treating ML as a black box without understanding what problem it is actually solving.
- Underestimating how much effort data preparation requires relative to model building.

---

## Supervised vs Unsupervised vs Reinforcement Learning

These three terms describe the fundamental modes by which ML models are trained, and they differ in what kind of signal the algorithm uses to learn.

Supervised learning is the most common approach. The training data consists of input-output pairs — for example, images labelled as "cat" or "not cat". The algorithm learns a function that maps inputs to outputs by minimising the difference between its predictions and the correct labels. There are two main task types: classification (predicting a discrete category, such as spam/not spam) and regression (predicting a continuous value, such as house price). Both are supervised learning — the difference is in the output type.

Unsupervised learning is used when labelled data is unavailable or impractical to obtain. The algorithm receives only inputs and must discover structure on its own. Common examples include clustering (grouping customers by purchasing behaviour using algorithms like K-means) and dimensionality reduction (compressing a high-dimensional dataset for visualisation using techniques like PCA). The algorithm is not told what the "right" answer is — it finds groupings or patterns inferred from the data distribution.

Reinforcement learning involves an agent that learns by interacting with an environment. The agent takes actions, receives rewards or penalties, and updates its behaviour to maximise cumulative reward over time. It is used for game-playing systems, robotics, and increasingly for fine-tuning large language models via techniques such as RLHF (reinforcement learning from human feedback).

**Why it matters:** Choosing the wrong learning paradigm for a problem will lead to failure regardless of how well the rest of the pipeline is built.

**Key things to understand:**
- Supervised learning requires labelled data, which is expensive to produce.
- Classification predicts a category; regression predicts a continuous number — both are supervised tasks.
- Unsupervised learning outputs are harder to evaluate because there is no ground truth.
- Reinforcement learning is the most complex to implement and debug.

**Common pitfalls:**
- Attempting to apply supervised learning without investing in data labelling quality.
- Conflating clustering (unsupervised) with classification (supervised) — they look similar but clustering has no predefined classes.
- Treating reinforcement learning as a go-to approach when simpler supervised methods would suffice.

---

## The ML Training Pipeline – Data, Features, Model, Evaluation

Building an ML model is not a single step — it is a sequential pipeline. Understanding each stage and how they interact is essential before writing a line of model code.

Data collection and preparation is almost always the longest phase. Raw data is messy: it contains missing values, inconsistent formatting, duplicates, and noise. Engineers must clean it, handle missing entries (by imputation or removal), and split it into training, validation, and test sets. The split ensures that the model is evaluated on data it has never seen during training.

Feature engineering transforms raw data into a format the model can learn from. A column of raw timestamps, for instance, is rarely useful as-is; extracting the hour of day, day of week, or whether a date is a public holiday may each be far more informative. Numerical features may need scaling. Categorical features need encoding (for example, one-hot encoding or ordinal encoding).

Model training is the phase where the algorithm processes the training data and adjusts its internal parameters to minimise a loss function — a measure of how wrong its predictions are. This process is iterative. After training, the model is evaluated against held-out data; those results feed back into earlier stages (more data, different features, a different model) until performance meets requirements. The full cycle is: data collection → preprocessing and cleaning → feature engineering → model selection → training → evaluation → deployment → monitoring.

**Why it matters:** Skipping or rushing any stage of the pipeline consistently produces worse results than spending more time on the stage that actually limits model quality — which is usually data quality and feature design, not model choice.

**Key things to understand:**
- The pipeline is iterative, not linear — results from evaluation feed back into earlier stages.
- Data quality has a larger impact on final model performance than algorithm choice.
- Test set data must never influence any decision made before final evaluation.
- Deployment and monitoring are part of the pipeline, not afterthoughts — models degrade as real-world data drifts from training data.

**Common pitfalls:**
- Data leakage: allowing test data to influence the training process, producing misleadingly high evaluation scores.
- Skipping exploratory data analysis before modelling.
- Evaluating a model on the training set and mistaking that for generalisation.

---

## Overfitting, Underfitting and the Bias-Variance Trade-off

These three concepts describe the central tension in training any ML model: a model that is too simple fails to capture the patterns in the data, while a model that is too complex memorises the training data and fails to generalise.

Underfitting occurs when the model is not expressive enough to capture the underlying pattern. A linear model applied to inherently non-linear data will underfit. The model will perform poorly on both training and test data. This reflects high bias — the model has made overly strong assumptions about the data.

Overfitting occurs when the model has learned the training data too well, including its noise and random fluctuations. It performs well on training data but poorly on new, unseen data. This reflects high variance — small changes in the training data produce large changes in the model. Common causes of overfitting include using a model that is too complex relative to the amount of training data. Solutions include collecting more data, applying regularisation (L1/Lasso shrinks some weights to zero; L2/Ridge penalises large weights), using dropout in neural networks, and early stopping during training.

The bias-variance trade-off captures the fact that reducing one type of error tends to increase the other. The goal is to find the sweet spot — a model complex enough to capture real patterns, but regularised enough not to memorise noise.

Cross-validation is the standard technique for estimating how well a model generalises before committing to a final evaluation. In k-fold cross-validation, the training data is divided into k equal folds. The model is trained k times; each time, a different fold is held out as the validation set and the remaining k-1 folds are used for training. The k validation scores are averaged to produce a more reliable generalisation estimate than a single split. This is important because a single train-validation split can be misleading if the split was lucky or unlucky.

**Why it matters:** Overfitting is the most common failure mode in ML. A model that performs brilliantly on the training set but fails on real data delivers no value — and can actively mislead stakeholders who only see the training metrics.

**Key things to understand:**
- High training accuracy alongside low test accuracy is a strong signal of overfitting.
- Regularisation techniques (L1, L2, dropout) are tools for controlling overfitting.
- Cross-validation (k-fold) gives a more reliable estimate of generalisation than a single train-test split.
- More training data generally reduces overfitting.
- Early stopping halts training when validation performance stops improving, preventing further overfitting.

**Common pitfalls:**
- Tuning hyperparameters to maximise test set performance, which causes the test set to leak into model selection and defeats its purpose.
- Adding more model complexity as a first response to underfitting without first checking data quality.
- Ignoring learning curves, which visually diagnose both underfitting and overfitting.

---

## Python for ML – NumPy Arrays and Vectorised Operations

NumPy is the foundational numerical computing library for Python and underpins virtually every ML and data science library in the ecosystem, including scikit-learn, Pandas, and PyTorch. Its central data structure is the ndarray (n-dimensional array), and its defining characteristic is vectorised computation.

Vectorised operations allow mathematical operations to be applied to entire arrays at once, without writing explicit Python loops. This matters because Python loops are slow for numerical work — they interpret each iteration individually. NumPy operations, by contrast, execute in compiled C code and operate on blocks of memory directly, making them orders of magnitude faster.

An array of a million floating-point numbers can be multiplied by a scalar, squared, or added to another array in a single line, and the operation will complete in milliseconds rather than seconds. Broadcasting is NumPy's mechanism for performing operations between arrays of different but compatible shapes — for example, adding a 1D array of shape (3,) to a 2D array of shape (4, 3) without explicitly repeating the 1D array. Understanding broadcasting rules prevents a common class of shape mismatch errors.

**Why it matters:** NumPy is the foundation of the entire Python ML stack. You will encounter ndarrays constantly — as model inputs, as outputs, as intermediate representations. Fluency with vectorised operations is the difference between code that runs in milliseconds and code that runs in minutes.

**Key things to understand:**
- NumPy arrays are homogeneous: all elements must be the same data type. This enables the memory efficiency that makes vectorised operations fast.
- Broadcasting rules govern how NumPy handles operations between arrays of different shapes. Understanding broadcasting prevents shape mismatch errors.
- Avoid Python loops over array elements wherever possible; always seek a vectorised equivalent.
- Array indexing and slicing in NumPy follows the same principles as Python list indexing but extends to multiple dimensions.

**Common pitfalls:**
- Confusing 1D arrays with column or row vectors, leading to shape errors in matrix operations.
- Using Python lists where NumPy arrays are needed, then being surprised by element-wise multiplication not working as expected.
- Copying arrays unintentionally — NumPy slices are views, not copies, so modifying a slice modifies the original.

---

## Pandas – DataFrames and Data Manipulation

Pandas provides the DataFrame, a two-dimensional, labelled data structure that is the standard tool for tabular data manipulation in Python. If NumPy is the foundation for numerical computation, Pandas is the foundation for data preparation. A Series is a single labelled column — a DataFrame is a collection of Series sharing the same index.

A DataFrame behaves like a spreadsheet with named columns and an index. It can hold columns of different types — integers, floats, strings, datetimes — in the same structure. Most real-world datasets arrive as CSV or database tables and are loaded directly into a DataFrame.

Core operations include: filtering rows with boolean conditions, selecting columns, handling missing values with \`fillna\` or \`dropna\`, grouping and aggregating with \`groupby\`, joining multiple DataFrames with \`merge\`, reshaping with \`pivot_table\`, and applying custom functions with \`apply\`. Row selection by label uses \`.loc\`; by integer position uses \`.iloc\` — confusing these two is a frequent source of bugs. These operations compose into the data preparation workflows that precede model training.

**Why it matters:** The majority of time in any ML project is spent preparing data. Fluency in Pandas directly translates to speed and correctness in data work.

**Key things to understand:**
- A DataFrame is a table; a Series is a single column. Both share the same index-based alignment system.
- \`.loc\` selects by label; \`.iloc\` selects by integer position — they are not interchangeable.
- Operations that look like they modify a DataFrame in place often do not — always assign results back or use \`inplace=True\` explicitly.
- Pandas is not designed for very large datasets (beyond memory). At that scale, tools like Polars, Dask, or Spark are more appropriate.

**Common pitfalls:**
- The \`SettingWithCopyWarning\`: modifying a slice of a DataFrame instead of the original. Use \`.loc\` for explicit selection.
- Forgetting to reset the index after filtering, causing confusing downstream behaviour.
- Using \`iterrows()\` for row-by-row operations instead of vectorised Pandas methods or \`apply()\`, which is dramatically slower.

---

## Model Evaluation – Accuracy, Precision, Recall, F1, RMSE and Confusion Matrices

Choosing the right evaluation metric is as important as choosing the right model. A single number can conceal critical information about how a model behaves on different subsets of the data.

**Classification metrics.** Accuracy is the fraction of predictions that are correct. It is intuitive but misleading on imbalanced datasets. A model that always predicts "not fraud" on a dataset where 99% of transactions are legitimate achieves 99% accuracy while being completely useless.

A confusion matrix breaks down predictions into four categories for a binary classifier: true positives (TP — correctly predicted positive), true negatives (TN — correctly predicted negative), false positives (FP — predicted positive, actually negative), and false negatives (FN — predicted negative, actually positive). All other classification metrics derive from these four numbers.

Precision is the fraction of positive predictions that are actually positive: **Precision = TP / (TP + FP)**. High precision means: when the model says yes, it is usually right. Recall (also called sensitivity) is the fraction of actual positives the model correctly identifies: **Recall = TP / (TP + FN)**. High recall means: the model rarely misses a real positive. There is a trade-off — increasing the threshold for a positive prediction raises precision and lowers recall, and vice versa.

The F1 score is the harmonic mean of precision and recall: **F1 = 2 × (Precision × Recall) / (Precision + Recall)**. It is useful when both matter and you want a single number that balances them. The harmonic mean penalises extreme imbalances between precision and recall more than a simple average would.

**Regression metrics.** When the target is a continuous value rather than a category, accuracy and F1 do not apply. Root Mean Squared Error (RMSE) is the most common regression metric: it is the square root of the average squared difference between predicted and actual values. Squaring the errors gives larger errors disproportionately more weight, making RMSE sensitive to outliers. Mean Absolute Error (MAE) averages the absolute differences and is more robust to outliers.

**Why it matters:** Using the wrong metric can make a useless model look good, or make a good model look worse than a naive baseline. Metric choice is a business decision as much as a technical one — it encodes which types of errors are acceptable.

**Key things to understand:**
- Always examine the full confusion matrix, not just aggregate metrics.
- Precision = TP / (TP + FP); Recall = TP / (TP + FN); F1 is their harmonic mean.
- RMSE is for regression tasks (continuous output); accuracy and F1 are for classification tasks.
- Choose metrics that align with the business cost of each error type. In medical diagnosis, a false negative (missed disease) may be far more costly than a false positive.
- For multi-class problems, precision, recall, and F1 can be computed per class or averaged (macro, micro, weighted).

**Common pitfalls:**
- Optimising for accuracy on an imbalanced dataset without checking class-level performance.
- Reporting only the best metric without acknowledging the trade-offs.
- Evaluating on the training set rather than a held-out test set.
- Using RMSE for a classification task or accuracy for a regression task.

---

## The Difference Between AI, ML, Deep Learning and Generative AI

These four terms are used interchangeably in popular media, but they describe distinct and nested concepts. Understanding the hierarchy prevents confusion when reading technical literature or discussing systems with stakeholders.

Artificial intelligence (AI) is the broadest term. It refers to any technique that enables machines to perform tasks that would otherwise require human intelligence. Rule-based expert systems from the 1980s are AI. Modern neural networks are AI. The term says nothing about the method used.

Machine learning is a subset of AI that covers systems which learn from data rather than following hand-coded rules. All ML is AI, but not all AI is ML.

Deep learning is a subset of ML that uses artificial neural networks with many layers (hence "deep"). Deep learning has driven most of the major advances in computer vision, speech recognition, and natural language processing over the past decade. It is particularly effective when large amounts of data and compute are available.

Generative AI is a subset of deep learning concerned with models that generate new content — text, images, audio, code — rather than simply classifying or predicting. Large language models such as frontier models from OpenAI and Anthropic, image generation models, and audio synthesis models are all examples of generative AI. The current wave of generative AI is built almost entirely on the transformer architecture.

**Why it matters:** These distinctions come up constantly in stakeholder conversations, architecture decisions, and when reading research. Conflating them leads to misapplied mental models — for example, assuming that because a product uses "AI", it must involve neural networks, or assuming all GenAI limitations apply to traditional ML models.

**Key things to understand:**
- In practice, modern generative AI is built on deep learning, which is a branch of machine learning, which is a branch of AI. The boundaries are not absolute — some generative techniques do not rely on deep learning — but the general nesting holds.
- "AI" in a product description rarely means anything more specific than "it uses some form of learned model."
- Deep learning requires significantly more data and compute than classical ML methods, but it tends to outperform them when both are available.

**Common pitfalls:**
- Using "AI" and "ML" interchangeably in technical conversations, which obscures what is actually being built.
- Assuming all AI problems require deep learning — many are solved adequately by simpler models.
- Conflating generative AI with the broader field of ML, leading to misapplied mental models about how non-generative models work.
`,
    mid: `# ML Engineer – Mid Concept Reference


This document provides in-depth explanations of the core concepts covered at the Mid level of the ML Engineer learning path. It assumes familiarity with the Beginner concepts and focuses on algorithm selection, feature engineering, neural networks, experiment tracking, and MLOps.

---

## ML Algorithms – Regression and Classification Families

Classical ML algorithms remain the workhorses of structured data problems. Understanding the algorithm families and when to apply them is a key Mid-level skill.

Regression algorithms predict a continuous numeric output. Linear regression fits a straight-line relationship between input features and the target. Regularised variants — Ridge (L2 penalty) and Lasso (L1 penalty) — reduce overfitting and, in the case of Lasso, can drive less important feature coefficients to zero, performing implicit feature selection. When the decision boundary between classes is linear, logistic regression is a natural fit for binary classification despite its name.

Classification algorithms predict a discrete category. Logistic regression, support vector machines (SVMs), k-nearest neighbours (KNN), and naive Bayes all belong to this family. SVMs are effective in high-dimensional spaces and work well when classes are clearly separable. KNN is non-parametric and requires no training but scales poorly — prediction cost grows with dataset size because it searches for the k closest training points at inference time.

A decision tree partitions the feature space by asking a series of yes/no questions at each node. At each split, it selects the feature and threshold that best separates the classes (using metrics such as Gini impurity or information gain). Decision trees are interpretable — you can trace exactly why a prediction was made — but they overfit easily.

Random forests address overfitting by training many decision trees on different random subsets of the training data and features, then aggregating their predictions by majority vote or averaging. The randomness decorrelates the individual trees, so their errors do not compound. This technique is called bagging (bootstrap aggregating). Random forests are robust, require little hyperparameter tuning, and handle missing data relatively well.

Gradient boosting also combines many weak learners (typically shallow trees), but sequentially rather than in parallel. Each new tree is trained to correct the residual errors of the ensemble so far. The result is a highly accurate model that can outperform random forests on many tabular datasets, at the cost of more hyperparameter sensitivity and longer training time. XGBoost, LightGBM, and CatBoost are the most widely used implementations.

**Why it matters:** No single algorithm works best for every problem. Choosing an algorithm that is appropriately matched to the data type, size, and interpretability requirements is a core engineering decision — defaulting to the most complex option is a common and costly mistake.

**Key things to understand:**
- The hierarchy for tree-based methods is: single decision tree → Random Forest (bagging, parallel) → Gradient Boosting (sequential). Complexity and accuracy generally increase along this hierarchy, as does the risk of overfitting.
- Random forests reduce variance; gradient boosting reduces both bias and variance together.
- Gradient boosting is more sensitive to hyperparameters and requires careful tuning to avoid overfitting.
- Feature importance scores from tree-based models are useful for understanding which inputs drive predictions, but reflect correlation, not causation.

**Common pitfalls:**
- Applying gradient boosting without tuning the learning rate and number of estimators, producing overfit models.
- Choosing complex ensembles when a single decision tree would be sufficiently accurate and far more interpretable.
- Applying a linear model (linear regression, logistic regression) to strongly non-linear data without feature transformations.

---

## ML Algorithms – Clustering and Unsupervised Methods

Clustering algorithms group data points into clusters based on similarity, without using labels. They are the primary unsupervised learning tool for exploratory analysis, customer segmentation, anomaly detection, and data preprocessing.

K-means is the most widely used clustering algorithm. It requires specifying k (the number of clusters) upfront. The algorithm initialises k centroids, assigns each point to its nearest centroid, recomputes centroids as the mean of their assigned points, and repeats until assignments stabilise. K-means is fast and scales well, but its results depend on the initial centroid placement (mitigated by running it multiple times), it assumes roughly spherical, equally sized clusters, and choosing the wrong k produces meaningless results. The elbow method and silhouette score help select a reasonable k.

DBSCAN (Density-Based Spatial Clustering of Applications with Noise) takes a different approach. It does not require specifying the number of clusters upfront. Instead, it identifies clusters as dense regions of points separated by low-density regions. Points in sparse regions are labelled as noise (outliers) rather than forced into a cluster. DBSCAN handles clusters of arbitrary shape and is robust to outliers, but its two hyperparameters (minimum points and the neighbourhood radius epsilon) require careful tuning.

Dimensionality reduction methods such as PCA (Principal Component Analysis) are also unsupervised. PCA finds the directions of maximum variance in the data and projects it onto a lower-dimensional space. It is used for visualisation, noise reduction, and as a preprocessing step before training.

**Why it matters:** Many real-world problems involve unlabelled data. Clustering enables discovery — finding structure in data that no one has categorised yet. Understanding the differences between algorithms prevents common failures such as forcing arbitrary cluster shapes with K-means when DBSCAN would be more appropriate.

**Key things to understand:**
- K-means requires specifying k upfront; DBSCAN does not.
- K-means assumes clusters are spherical and roughly equal in size; DBSCAN makes no such assumption.
- DBSCAN can identify noise points (outliers) explicitly; K-means forces every point into a cluster.
- Evaluating clustering quality is harder than evaluating supervised models — there is no ground truth. Silhouette score and inertia are common proxies.

**Common pitfalls:**
- Applying K-means to data with non-spherical or highly variable cluster sizes, producing meaningless groupings.
- Forgetting to scale features before clustering — algorithms that use distance metrics are sensitive to feature scale.
- Treating clustering output as definitive categories without validating that the clusters correspond to meaningful real-world distinctions.

---

## Neural Networks – Layers, Activation Functions and Backpropagation

Neural networks are the building blocks of deep learning. Understanding how they work mechanically is essential before working with more complex architectures such as transformers.

A neural network consists of layers of artificial neurons. Each neuron computes a weighted sum of its inputs, adds a bias term, and then passes the result through an activation function. The input layer receives the raw features, hidden layers learn intermediate representations, and the output layer produces the prediction. Activation functions introduce non-linearity, which allows the network to learn complex mappings. Without them, stacking multiple layers would reduce to a single linear transformation. Common activation functions include ReLU (Rectified Linear Unit, used in hidden layers), sigmoid (used for binary output), and softmax (used in the output layer for multi-class classification).

Training a neural network means finding the weights that minimise a loss function. This is done through backpropagation combined with an optimiser such as stochastic gradient descent (SGD) or Adam. Backpropagation computes the gradient of the loss with respect to each weight by applying the chain rule of calculus layer by layer from output back to input. The optimiser then updates the weights in the direction that reduces the loss.

**Why it matters:** Neural networks are the foundation of every deep learning system, including LLMs, image classifiers, and speech models. Understanding backpropagation and gradient descent gives you the mental model needed to diagnose training problems, choose architectures, and understand why regularisation techniques work.

**Key things to understand:**
- The input layer, hidden layers, and output layer each play a distinct role. Depth (more hidden layers) allows the network to represent more complex functions.
- The choice of loss function must match the task: cross-entropy for classification, mean squared error for regression.
- Learning rate is the most important hyperparameter to get right — too high causes instability, too low causes slow convergence.
- Batch normalisation and dropout are regularisation techniques that stabilise and improve training.

**Common pitfalls:**
- Using sigmoid or tanh activations in hidden layers of deep networks, causing vanishing gradients. ReLU and its variants are generally preferred.
- Not normalising input features, leading to slow or unstable training.
- Treating neural network training as deterministic — results vary across runs due to random weight initialisation; set seeds for reproducibility.

---

## Feature Engineering – Transforming Raw Data into Model-Ready Features

Feature engineering is the process of transforming raw data into features that better represent the underlying problem to the model, improving predictive performance. It is often the single highest-leverage activity in an ML project — a well-engineered feature set can make a simple model outperform a complex one trained on raw data.

Feature types fall into several categories. Numerical features (age, income, temperature) may need scaling (standardisation to zero mean and unit variance, or min-max normalisation to a fixed range) so that algorithms sensitive to feature magnitude — such as SVMs, KNN, and neural networks — treat all features equally. Categorical features (country, product type, day of week) must be encoded numerically. One-hot encoding creates a binary column for each category; ordinal encoding assigns integers to ordered categories. High-cardinality categorical features (such as postcode or customer ID) require special handling — target encoding, frequency encoding, or embedding layers are common approaches.

Feature creation involves deriving new features from existing ones. Date columns can be decomposed into year, month, day of week, and binary flags for weekends or holidays. Text columns can be converted to word counts, TF-IDF vectors, or embeddings. Interaction features (multiplying two features together) capture relationships that the model might not learn on its own.

Feature selection removes features that add noise without predictive value. Techniques include correlation analysis (removing features highly correlated with each other), mutual information (measuring how much a feature tells you about the target), and model-based selection (using feature importance from a tree-based model to filter). Reducing the feature set improves training speed, reduces overfitting, and makes the model more interpretable.

Domain knowledge is the most important input to feature engineering. An engineer who understands the business problem will create features that capture the relevant signal — for example, in insurance, the ratio of claim amount to policy premium may be far more predictive than either value alone.

**Why it matters:** Models learn from the features they are given. No algorithm can extract signal that the features do not contain. Feature engineering is where domain expertise meets data science, and it is the stage where experienced ML engineers consistently add the most value.

**Key things to understand:**
- Scaling is required for distance-based and gradient-based algorithms but generally not for tree-based models.
- One-hot encoding can explode dimensionality with high-cardinality features — alternative encodings are needed in those cases.
- Feature creation is guided by domain knowledge — automated feature generation tools exist but rarely replace expert intuition.
- Feature selection should be performed on the training set only; applying it to the full dataset before splitting causes data leakage.

**Common pitfalls:**
- Applying feature engineering steps (such as scaling or target encoding) before the train-test split, leaking information from the test set.
- Creating features that inadvertently encode the target variable, producing artificially high metrics that collapse on new data.
- Over-engineering features for tree-based models that handle raw features well, adding complexity without performance gain.
- Ignoring domain knowledge and relying solely on automated feature generation.

---

## Experiment Tracking – Reproducibility and Systematic Model Development

Experiment tracking is the practice of systematically recording the parameters, metrics, code versions, data versions, and artifacts associated with every model training run. It is the foundation of reproducible ML development — without it, successful experiments cannot be reliably recreated, and comparing different approaches becomes guesswork.

MLflow is the most widely adopted open-source experiment tracking framework. It provides four core components: Tracking (logging parameters, metrics, and artifacts), Projects (packaging code for reproducibility), Models (a standard format for model packaging and serving), and a Model Registry (versioned model storage with stage transitions). Azure ML provides equivalent functionality integrated into the Azure ecosystem, with experiment tracking, model registration, and managed compute for training.

A well-structured experiment tracking workflow logs: the hyperparameters used (learning rate, batch size, number of estimators), the evaluation metrics on both validation and test sets, the dataset version or hash, the code commit hash, and the trained model artifact. This creates a complete audit trail from result back to the exact conditions that produced it.

Parameter logging should be comprehensive from the start. Engineers commonly begin by logging only a few key parameters, then discover months later that a critical parameter was not recorded and the experiment cannot be reproduced. Logging everything is cheap; not logging is expensive.

**Why it matters:** ML development is inherently experimental — engineers try many combinations of data, features, algorithms, and hyperparameters. Without systematic tracking, this experimentation degenerates into an uncontrolled search where previous results cannot be compared, reproduced, or built upon. Experiment tracking transforms ML development from art into engineering.

**Key things to understand:**
- Every training run should be logged automatically — manual logging is error-prone and inconsistent.
- MLflow's tracking UI allows visual comparison of runs across metrics and parameters.
- The model registry provides version control for models with stage labels (Staging, Production, Archived).
- Azure ML integrates experiment tracking with managed compute, enabling training runs to be submitted and tracked from a single interface.

**Common pitfalls:**
- Starting a project without experiment tracking and trying to retroactively reconstruct what was tried — this is always more expensive than setting up tracking from day one.
- Logging metrics but not parameters, making it impossible to reproduce a good result.
- Not versioning the training data alongside the model, so the same code with different data produces different results with no explanation.
- Treating experiment tracking as overhead rather than infrastructure — it pays for itself within the first week of any serious project.

---

## MLOps Fundamentals – Operationalising ML Models

MLOps is the set of practices for deploying, monitoring, and maintaining ML models in production. Training a model is only part of the job — getting it into production reliably and keeping it healthy over time is where most operational effort is spent.

Experiment tracking tools such as MLflow and Azure ML allow engineers to log parameters, metrics, and artifacts (trained model files, plots, data snapshots) for every training run. This makes experiments reproducible: any result can be traced back to the exact code, data, and hyperparameters that produced it.

A model registry is a versioned store of trained models with metadata — who trained it, when, on what data, with what performance metrics. It provides a single source of truth for which model version is deployed to which environment. Azure ML and MLflow both provide model registry functionality.

Model serving is the process of deploying a trained model as an API endpoint that other systems can call. The standard approach is containerisation with Docker: the model, its dependencies, and a serving framework are packaged into a container image that can be deployed consistently across environments. This decouples the model from the infrastructure it runs on.

Model monitoring detects problems after deployment. Data drift occurs when the distribution of incoming data changes relative to the training data, causing model performance to degrade silently. Model monitoring tracks input distributions, prediction distributions, and performance metrics over time to detect drift and trigger retraining or alerts.

**Why it matters:** A model that is not deployed is not delivering value. MLOps practices bridge the gap between experimentation and production, ensuring that models are reproducible, deployable, and maintainable over their full lifecycle.

**Key things to understand:**
- Experiment tracking is non-negotiable for reproducibility — without it, successful experiments cannot be reliably recreated.
- Model registries provide version control for models the same way Git provides version control for code.
- Containerisation with Docker ensures that the model runs the same way in development, staging, and production.
- Data drift is the most common cause of silent model degradation in production — monitoring must be active, not reactive.

**Common pitfalls:**
- Training models in notebooks without logging parameters or metrics, making it impossible to reproduce results later.
- Deploying models manually instead of through a reproducible, containerised pipeline.
- Not monitoring model performance after deployment, allowing degraded models to serve incorrect predictions for weeks or months.
- Treating MLOps as a separate concern from model development — it should be considered from the start of a project, not added after the model is trained.
`,
    senior: `# ML Engineer – Senior Concept Reference


This document provides in-depth explanations of the core concepts covered at the Senior level of the ML Engineer learning path. It assumes fluency with the Beginner and Mid concepts and focuses on advanced MLOps, model monitoring, responsible AI, algorithms, and enterprise governance.

---

## Algorithms and Dynamic Programming for ML Engineers

A solid foundation in algorithms and data structures makes ML engineers more effective at every level of the stack — from understanding how embedding search works internally, to writing performant data processing code, to debugging why a model training loop is slow.

Dynamic programming (DP) is a technique for solving problems by breaking them into overlapping subproblems, solving each subproblem once, and storing the result. It is applicable when a problem has optimal substructure (the optimal solution to the whole problem contains optimal solutions to its subproblems) and overlapping subproblems (the same subproblems recur). Classic examples include the longest common subsequence, the knapsack problem, and the edit distance between two strings — the last of which appears directly in NLP evaluation (Levenshtein distance).

For ML engineers, algorithmic thinking is relevant in: designing efficient data pipelines (understanding time and space complexity prevents accidentally writing O(n²) preprocessing steps), implementing custom loss functions or evaluation metrics, understanding the internals of approximate nearest-neighbour algorithms used in vector search (HNSW, IVF), and reasoning about the computational cost of transformer attention (which scales quadratically with sequence length).

Graph algorithms appear in agent orchestration (LangGraph is literally a directed graph traversal problem) and in knowledge graph construction.

**Why it matters:** Algorithmic complexity failures in ML systems are expensive and often only discovered at production scale. An O(n²) preprocessing step that runs in seconds on a development dataset can take hours on production data. Understanding these fundamentals prevents engineering decisions that are technically correct but operationally infeasible.

**Key things to understand:**
- Big-O notation is a tool for reasoning about scalability — know the complexity of the operations you use most often.
- Many ML operations are expressible as matrix operations; understanding linear algebra and matrix decomposition methods (SVD, PCA) is directly applicable.
- Memoisation (top-down DP with caching) is often easier to implement correctly than tabulation (bottom-up DP).

**Common pitfalls:**
- Writing preprocessing code without considering how it scales with dataset size, then discovering it is infeasible at production volume.
- Treating algorithmic knowledge as irrelevant to ML engineering — it surfaces in performance debugging, custom implementations, and system design.
- Memorising DP solutions without understanding the underlying recurrence relation, making it impossible to adapt them to novel problems.

---

## Model Monitoring and Data Drift

Model monitoring is the practice of continuously tracking the behaviour of deployed ML models to detect degradation before it impacts business outcomes. A model that performed well at training time can silently deteriorate as the real world changes around it — a phenomenon driven primarily by data drift.

Data drift occurs when the statistical distribution of incoming production data diverges from the distribution the model was trained on. There are several forms: feature drift (the distribution of input features changes), label drift (the distribution of the target variable changes), and concept drift (the relationship between features and the target changes). All three can cause a model that was accurate at deployment to produce increasingly unreliable predictions over time.

Detection methods include statistical tests (Kolmogorov-Smirnov test, Population Stability Index) applied to input feature distributions, monitoring prediction distributions for shifts (if the model suddenly predicts one class far more frequently, something has changed), and tracking business metrics (such as claim approval rates or customer complaint rates) that serve as proxies for model quality when ground truth labels are delayed.

Retraining triggers should be defined in advance. Common approaches include: scheduled retraining (weekly or monthly, regardless of drift detection), drift-triggered retraining (automatic retraining when a statistical test exceeds a threshold), and performance-triggered retraining (when a monitored metric drops below a defined threshold). The choice depends on the cost of retraining versus the cost of serving stale predictions.

Azure ML provides built-in model monitoring capabilities, including data drift detection across features, alerting when drift exceeds configurable thresholds, and integration with retraining pipelines. Setting up monitoring at deployment time — not as an afterthought — is a key MLOps maturity indicator.

**Why it matters:** Models are not static assets. The world changes, data distributions shift, and models degrade. Without active monitoring, degraded models serve incorrect predictions for weeks or months before anyone notices — often only when a downstream business metric has already been damaged.

**Key things to understand:**
- Data drift is the most common cause of model degradation in production — it is not a question of if, but when.
- Monitoring must cover inputs (feature distributions), outputs (prediction distributions), and outcomes (business metrics).
- Ground truth labels are often delayed (e.g., whether a claim was fraudulent may not be known for months), making proxy metrics essential.
- Retraining is not free — it requires data preparation, validation, and deployment, all of which should be automated through the MLOps pipeline.

**Common pitfalls:**
- Deploying a model without any monitoring, assuming it will remain accurate indefinitely.
- Monitoring only aggregate metrics and missing drift in individual features that affects a subset of predictions.
- Setting retraining triggers too sensitively, causing unnecessary retraining on normal seasonal variation.
- Not automating the retraining pipeline, making each retraining cycle a manual, error-prone process.

---

## Responsible AI and Fairness

Responsible AI is the practice of designing, building, and deploying ML systems that are fair, transparent, accountable, and aligned with ethical and legal standards. Fairness in ML specifically addresses the risk that models systematically produce worse outcomes for certain groups — often along dimensions such as gender, ethnicity, age, or disability status.

Bias can enter the ML pipeline at multiple stages. Training data bias occurs when historical data reflects existing societal biases — for example, if past lending decisions were discriminatory, a model trained on that data will learn and perpetuate the discrimination. Feature bias occurs when input features serve as proxies for protected attributes — postcode can proxy for ethnicity, job title can proxy for gender. Algorithmic bias occurs when the model optimises an objective that inadvertently penalises certain groups — maximising overall accuracy on an imbalanced dataset can produce a model that performs well on the majority group but poorly on minority groups.

Fairness metrics quantify whether a model treats different groups equitably. Demographic parity requires that the positive prediction rate is equal across groups. Equalised odds requires that the true positive rate and false positive rate are equal across groups. These definitions can conflict — satisfying one may violate another — so the choice of fairness metric is a normative decision that must involve domain experts, legal counsel, and affected stakeholders.

Fairlearn is an open-source toolkit for assessing and improving the fairness of ML models. It provides metrics for measuring group fairness, visualisations for comparing model performance across groups, and mitigation algorithms (such as threshold optimisation and exponentiated gradient) that adjust model behaviour to improve fairness without retraining from scratch.

In insurance, fairness is not only an ethical imperative but a legal one. Anti-discrimination laws prohibit pricing or coverage decisions based on protected attributes. The EU AI Act classifies insurance AI systems as high-risk and requires conformity assessments that include fairness evaluation. Senior ML engineers must treat fairness as a first-class design constraint — integrated into the development process from the start, not checked as a post-hoc audit.

**Why it matters:** Unfair ML systems cause real harm to individuals and expose organisations to legal, regulatory, and reputational risk. In regulated industries like insurance, deploying a biased model can result in discrimination claims, regulatory sanctions, and loss of customer trust. Senior engineers are expected to identify, measure, and mitigate fairness risks proactively.

**Key things to understand:**
- Fairness cannot be achieved by simply removing protected attributes from the feature set — proxy features can carry the same information.
- Different fairness metrics encode different definitions of "fair" — there is no single correct definition, and the choice must be context-specific.
- Fairlearn provides both assessment tools (metrics, visualisations) and mitigation algorithms (threshold optimisation, exponentiated gradient).
- The EU AI Act requires high-risk AI systems (including insurance AI) to demonstrate fairness, transparency, and human oversight.

**Common pitfalls:**
- Assuming that removing protected attributes from the model eliminates bias — correlated features can serve as proxies.
- Optimising for a single fairness metric without considering the trade-offs with other fairness definitions and model performance.
- Treating fairness as a post-deployment check rather than a design constraint throughout the ML lifecycle.
- Not involving non-technical stakeholders (legal, compliance, affected communities) in defining what fairness means for a given application.

---

## Enterprise GenAI Adoption – Strategy, Risk and Governance

Senior engineers are expected to contribute to decisions about how AI is adopted at an organisational level. This requires understanding the strategic, risk, and governance dimensions of GenAI — not just the technical ones.

Strategic adoption involves identifying use cases where GenAI creates genuine value, distinguishing between tasks where GenAI offers a reliable improvement and tasks where the error rate is too high for the risk tolerance of the business. Productivity augmentation (drafting, summarising, coding assistance) generally has a lower risk threshold than autonomous decision-making in regulated processes.

Risk dimensions include: accuracy and hallucination risk (the model produces incorrect output that a user acts on), data privacy risk (sensitive data is sent to an external model API or used in training), regulatory and compliance risk (output violates laws or policies), reputational risk (offensive or inappropriate output is attributed to the organisation), and security risk (prompt injection, data exfiltration via agent tools).

Governance frameworks address these risks through policies that define which use cases are permitted, what data classifications may be used with which AI systems, how AI-generated output must be reviewed before acting on it, and how incidents are reported and investigated. The [Secure AI Framework (SAIF)](../Prerequisites/Secure-AI-Framework.md) and the NIST AI Risk Management Framework provide the governance structures for securing AI systems. The SAIF defines nine areas — from user awareness and prompt/output validation through to secure model selection — that must be addressed for each AI use case, with the required rigour determined by the use case's risk-level classification.

Responsible AI and fairness are increasingly integral to governance. AI systems used in high-risk domains — such as credit scoring, claims assessment, and underwriting, all relevant to insurance — must be evaluated for bias and fairness across protected groups. This involves measuring fairness metrics (demographic parity, equalised odds) and implementing bias detection in both training data and model outputs. The EU AI Act imposes specific obligations for high-risk AI systems, including transparency, human oversight, and documentation requirements. Senior engineers should treat fairness and regulatory compliance as first-class design constraints, not post-hoc audits.

**Why it matters:** Technical capability without governance creates legal and reputational exposure. Senior engineers shape not only what gets built but whether it is built in a way that the organisation can stand behind. The engineers who understand both dimensions are the ones who earn trust to build consequential systems.

**Key things to understand:**
- Governance is an enabler, not a blocker — clear policies allow teams to move faster with confidence.
- Risk assessments for AI use cases must consider both the failure mode of the model and the downstream consequences of acting on its output.
- AI governance must be revisited regularly as model capabilities, regulatory landscapes, and internal risk appetites evolve.

**Common pitfalls:**
- Treating AI governance as a one-time approval process rather than an ongoing operational practice.
- Building governance frameworks that are so restrictive they drive teams to use AI tools outside sanctioned channels.
- Ignoring data classification when selecting which content is allowed to be sent to external AI APIs.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems, particularly those used in insurance underwriting, claims assessment, and pricing, require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from ML engineers building models to business users employing AI-assisted tools in their daily work.

**Why it matters:** The AI Policy is the organisation's binding commitment to responsible AI use. It translates regulatory requirements (EU AI Act, GDPR) into concrete obligations that apply to every ML project. Senior ML engineers must understand these obligations because they directly affect model development — from training data governance and fairness evaluation to deployment documentation and monitoring.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- GDPR obligations apply to all ML systems that process personal data — this includes training data, feature stores, model inputs, and logged predictions.
- The policy requires transparency: affected parties must be informed when AI has influenced a decision affecting them, which has direct implications for model documentation and explainability.

**Common pitfalls:**
- Starting model development without registering the use case in the AI Register, which creates compliance risk and may require retroactive governance work.
- Treating the AI Policy as a legal concern rather than a design constraint — the policy's requirements must be built into the ML lifecycle from the start.
- Assuming that internal-only ML models are exempt from the policy; the governance requirements apply to all AI use, not just customer-facing systems.

---

## Language Deep Dives

- [Python Deep Dive](/language/python) — The primary language for ML development
- [SQL Deep Dive](/language/sql) — Feature extraction and data preparation
`,
  },
  'QA-Test-Engineer': {
    overview: `# QA / Test Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

QA and Test Engineers ensure software quality through systematic testing strategies, automation, and quality processes. The role covers test planning, manual and automated testing, performance testing, API testing, CI/CD integration, test architecture, and quality metrics.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| QA Roadmap | [roadmap.sh – QA](https://roadmap.sh/qa) | Interactive |
| Testing Fundamentals | [ISTQB Foundation Level Syllabus](https://www.istqb.org/certifications/certified-tester-foundation-level) | Syllabus |
| QA Certification | [freeCodeCamp – Quality Assurance](https://www.freecodecamp.org/learn/quality-assurance/) | Interactive |
| Manual Testing | [Software Testing Tutorial – Guru99](https://www.guru99.com/software-testing.html) | Article |
| Bug Reporting | [How to Write a Good Bug Report – Ministry of Testing](https://www.ministryoftesting.com/articles/the-art-of-the-bug-report) | Article |
| HTTP for Testers | [HTTP Crash Course – Traversy Media](https://www.youtube.com/watch?v=iYM2zFP3Zn0) | Video |
| Testing Fundamentals | [Software Testing Explained in 100 Seconds – Fireship](https://www.youtube.com/watch?v=u6QfIXgjwGQ) | Video |
| Testing Introduction | [JavaScript Testing Introduction Tutorial – Academind](https://www.youtube.com/watch?v=r9HdJ8P6GQI) | Video |
| Browser Developer Tools | [Chrome DevTools Overview – Google](https://developer.chrome.com/docs/devtools/overview/) | Docs |

### After completing Beginner you should be able to:

- Explain the difference between QA (quality assurance), QC (quality control), and testing, and describe how they relate to the software development lifecycle
- Describe the test pyramid and explain why unit tests form the base, integration tests the middle, and end-to-end tests the top
- Distinguish between functional and non-functional testing, and give examples of each category
- Write a structured bug report that includes steps to reproduce, expected behaviour, actual behaviour, and environment details
- Design basic test cases from a requirements specification using equivalence partitioning and boundary value analysis
- Use browser developer tools to inspect network requests, examine response codes, and identify front-end issues
- Explain common HTTP methods (GET, POST, PUT, DELETE) and status codes (2xx, 4xx, 5xx) and their relevance to testing

For deep explanations of each concept, see the [Beginner Concept Reference](QA-Test-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| Playwright | [Playwright – Getting Started](https://playwright.dev/docs/intro) | Docs |
| Test Automation University | [Test Automation University – Free Courses](https://testautomationu.applitools.com) | Course |
| API Testing with Postman | [Postman Learning Center](https://learning.postman.com) | Interactive |
| Cypress | [Cypress – Getting Started](https://docs.cypress.io/app/get-started/why-cypress) | Docs |
| Python for Testers | [Automate the Boring Stuff with Python](https://automatetheboringstuff.com) | Book |
| Performance Testing | [k6 Documentation – Getting Started](https://grafana.com/docs/k6/latest/) | Docs |
| BDD and Gherkin | [Cucumber – BDD Overview](https://cucumber.io/docs/bdd/) | Docs |
| CI/CD Test Integration | [Microsoft Learn – Getting Started with Continuous Testing](https://learn.microsoft.com/en-us/azure/devops/pipelines/test/getting-started-with-continuous-testing) | Docs |
| Testing Strategies | [JavaScript Testing Introduction Tutorial – Academind](https://www.youtube.com/watch?v=r9HdJ8P6GQI) | Video |
| Contract Testing | [Pact – Getting Started](https://docs.pact.io) | Docs |
| Test Data Management | [Ministry of Testing – Test Data Management](https://www.ministryoftesting.com/articles/test-data-management) | Article |

### After completing Mid you should be able to:

- Write end-to-end tests with Playwright or Cypress that cover critical user journeys using reliable locator strategies
- Design and implement API test suites using Postman collections, including environment variables, pre-request scripts, and test assertions
- Write Python or JavaScript scripts that automate repetitive testing tasks such as test data generation and log parsing
- Configure a CI/CD pipeline to run automated tests on every commit and report results back to the team
- Create and execute a basic performance test with k6 that measures response times and throughput under load
- Write BDD scenarios in Gherkin syntax and explain how they bridge communication between technical and non-technical stakeholders
- Explain consumer-driven contract testing and describe how Pact prevents integration failures between services

For deep explanations of each concept, see the [Mid Concept Reference](QA-Test-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| Test Strategy and Architecture | [Martin Fowler – The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) | Article |
| Google Testing Blog | [Google Testing Blog](https://testing.googleblog.com) | Blog |
| Quality Engineering | [Quality Engineering – Pluralsight](https://www.pluralsight.com/courses/software-quality-assurance-testing-fundamentals) | Course |
| Shift-Left Testing | [Microsoft Learn – Shift Left to Make Testing Fast and Reliable](https://learn.microsoft.com/en-us/devops/develop/shift-left-make-testing-fast-reliable) | Article |
| Accessibility Testing | [WCAG 2.2 – W3C](https://www.w3.org/TR/WCAG22/) | Standard |
| Security Testing | [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) | Guide |
| Visual Regression Testing | [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots) | Docs |
| Networking for Testers | [Computer Networking Full Course](https://www.youtube.com/watch?v=qiQR5rTSshw) | Video |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| Regulatory Testing | [ISTQB – Testing in Regulated Industries](https://www.istqb.org/certifications/automotive-tester) | Reference |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |

### After completing Senior you should be able to:

- Design a comprehensive test strategy for a product that defines the scope, types, tools, environments, and ownership of testing across all levels
- Apply shift-left testing principles to move quality activities earlier in the development lifecycle, including test-driven development and static analysis
- Plan and execute accessibility audits against WCAG 2.2 Level AA criteria and integrate automated accessibility checks into the CI pipeline
- Identify and test for the OWASP Top 10 security vulnerabilities using both manual techniques and automated security scanning tools
- Implement visual regression testing to detect unintended UI changes across releases
- Define and track quality metrics (defect escape rate, test coverage, mean time to detect, flaky test rate) and use them to drive continuous improvement
- Evaluate AI-assisted testing tools and approaches while applying the organisation's AI policy, checklist, and secure AI framework
- Design test approaches for regulated environments that include traceability, audit trails, and compliance evidence

For deep explanations of each concept, see the [Senior Concept Reference](QA-Test-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `# QA / Test Engineer – Beginner Concept Reference


This document explains the foundational concepts covered in the Beginner level of the QA / Test Engineer learning path.

---

## QA Roadmap – Orientation and the QA Landscape

Quality Assurance is a discipline that spans the entire software development lifecycle. It is not limited to finding bugs after code is written; it encompasses prevention, detection, and continuous improvement of the processes that produce software. The QA roadmap provides a structured overview of the skills, tools, and concepts a QA engineer needs to master at each stage of their career.

The roadmap covers areas such as testing fundamentals, test design techniques, automation, API testing, performance testing, CI/CD integration, and soft skills like communication and analytical thinking. Having this bird's-eye view early on helps you understand where each skill fits into the broader picture and prevents you from over-investing in one area while neglecting others.

Understanding the full landscape also helps you communicate effectively with developers, product owners, and managers. When you can articulate what you do and why it matters in the context of the whole delivery process, you become a more effective advocate for quality.

**Why it matters:** Without a clear map of the discipline, beginners often dive into automation tools before understanding testing fundamentals, or focus exclusively on manual testing without awareness of the full spectrum. The roadmap prevents these gaps.

**Key things to understand:**

- QA is broader than testing. It includes process improvement, risk analysis, requirements review, and collaboration with the development team to prevent defects.
- Testing is one activity within QA. It involves executing software to find defects and verify that requirements are met.
- QC (quality control) focuses on identifying defects in the finished product, while QA focuses on improving the processes that create the product.
- The QA role varies significantly across organisations. Some teams expect QA engineers to write automation code; others focus on exploratory and manual testing; many expect both.

**Common pitfalls:**

- Skipping fundamentals and jumping directly into learning automation frameworks without understanding what to test or why.
- Treating QA as a purely technical role and neglecting the communication, documentation, and process improvement aspects.
- Assuming QA is only about finding bugs rather than about preventing them through better processes and earlier involvement.

---

## Testing Fundamentals – The Test Pyramid, Test Types, and ISTQB Foundations

The ISTQB (International Software Testing Qualifications Board) Foundation Level syllabus is the industry standard body of knowledge for software testing. It defines the vocabulary, principles, and techniques that form the common language of the profession. Even if you never take the certification exam, the syllabus provides a structured foundation that most testing literature and job descriptions assume you know.

The test pyramid is a model that describes the ideal distribution of test types in a software project. At the base are unit tests -- fast, isolated, and numerous. In the middle are integration tests (sometimes called service tests) that verify the interaction between components. At the top are end-to-end (E2E) tests that exercise the full system through its user interface. The pyramid shape reflects the principle that you should have many fast, cheap tests at the bottom and fewer slow, expensive tests at the top.

Testing is broadly divided into functional testing (does the software do what it should?) and non-functional testing (how well does it do it?). Functional testing includes unit testing, integration testing, system testing, and acceptance testing. Non-functional testing includes performance testing, security testing, usability testing, and accessibility testing.

**Why it matters:** These fundamentals are the vocabulary and mental models you will use every day. Understanding the test pyramid prevents you from building a test suite that is slow, brittle, and expensive to maintain. Understanding test types helps you choose the right approach for each situation.

**Key things to understand:**

- The seven testing principles from ISTQB: testing shows the presence of defects (not their absence), exhaustive testing is impossible, early testing saves time and money, defects cluster together, the pesticide paradox (repeating the same tests stops finding new bugs), testing is context-dependent, and the absence-of-errors fallacy.
- Static testing (reviewing code, requirements, and designs without executing them) catches defects earlier and more cheaply than dynamic testing (executing the software).
- Test levels (unit, integration, system, acceptance) correspond to different scopes and objectives. Each level answers a different question about the software.
- Regression testing is the practice of re-running existing tests after changes to ensure that previously working functionality has not been broken.

**Common pitfalls:**

- Inverting the test pyramid by writing mostly E2E tests and few unit tests, resulting in a slow, fragile test suite that takes hours to run and is expensive to maintain.
- Treating the ISTQB syllabus as purely theoretical without connecting its principles to practical testing decisions.
- Confusing test levels with test types. Test levels describe scope (unit vs. system); test types describe purpose (functional vs. performance).

---

## QA Certification – Hands-On Practice with freeCodeCamp

The freeCodeCamp Quality Assurance certification provides hands-on experience with testing in a real development environment. It covers writing tests with Chai (an assertion library for Node.js), building and testing web applications, and understanding how automated tests validate application behaviour.

The curriculum is structured around projects. You do not just read about testing -- you write tests for real applications and verify your own code. This project-based approach builds practical skills that reading documentation alone cannot provide. The certification covers both functional testing (testing routes and responses in a web application) and unit testing (testing individual functions and modules).

Working through the certification also introduces you to the rhythm of test-driven development: write a test, see it fail, write the code to make it pass, refactor. Even if you do not adopt strict TDD as your daily practice, experiencing this cycle builds intuition about how tests relate to the code they verify.

**Why it matters:** Theoretical knowledge of testing is necessary but not sufficient. You need practice writing tests, interpreting failures, and debugging both the code under test and the tests themselves. The freeCodeCamp certification provides this practice in a structured, guided environment.

**Key things to understand:**

- Assertion libraries like Chai provide methods to express expectations about values: \`expect(result).to.equal(5)\`, \`expect(array).to.have.lengthOf(3)\`, \`expect(response).to.have.status(200)\`.
- Functional tests for web applications typically make HTTP requests to routes and assert on the response status, headers, and body content.
- Test suites are organised into \`describe\` blocks (grouping related tests) and \`it\` blocks (individual test cases). This structure makes test output readable and helps locate failures.
- The freeCodeCamp certification requires you to complete projects to earn the credential, reinforcing that QA is a practice-based skill.

**Common pitfalls:**

- Writing assertions that are too vague (e.g., only checking that a response has status 200 without verifying the response body contains the expected data).
- Copying test code without understanding what each assertion checks, which defeats the purpose of learning.
- Skipping the projects and only reading the instructions, missing the hands-on practice that builds real competence.

---

## Manual Testing – Techniques and Exploratory Testing

Manual testing is the practice of executing test cases by a human tester without the aid of automation scripts. It includes both scripted testing (following pre-written test cases step by step) and exploratory testing (simultaneously designing and executing tests based on the tester's understanding of the system).

Scripted manual testing is valuable when you need documented, repeatable verification -- for example, during acceptance testing or when following a regulatory compliance checklist. Each test case specifies preconditions, steps, expected results, and actual results. The tester follows the steps precisely and records whether the outcome matches the expectation.

Exploratory testing is a more creative, investigative approach. The tester uses their knowledge of the system, user behaviour, and common failure patterns to design tests on the fly. Exploratory testing is particularly effective at finding defects that scripted tests miss because they follow unexpected paths through the application. Session-based test management (SBTM) provides structure to exploratory testing by organising it into timed sessions with charters, notes, and debriefs.

**Why it matters:** Even in highly automated environments, manual testing remains essential. Automation verifies what you already know should work; exploratory testing discovers what you did not anticipate. Senior QA engineers rely on exploratory testing to evaluate new features, assess risk, and build understanding of system behaviour.

**Key things to understand:**

- Exploratory testing is not random clicking. It is skilled, intentional investigation guided by heuristics, domain knowledge, and risk awareness.
- Test case design techniques from ISTQB (equivalence partitioning, boundary value analysis, decision tables, state transition testing) apply to both manual and automated testing.
- Equivalence partitioning divides input data into groups (partitions) where the system is expected to behave the same way, and you test one representative from each group.
- Boundary value analysis tests the edges of equivalence partitions, where defects are statistically most likely to occur.

**Common pitfalls:**

- Treating manual testing as unskilled work that anyone can do. Effective manual testing requires deep system knowledge, analytical thinking, and creativity.
- Writing test cases that are so detailed they leave no room for the tester to notice unexpected behaviour outside the scripted steps.
- Neglecting to document findings during exploratory testing, making it impossible to reproduce or communicate discovered issues.

---

## Bug Reporting – Clear Communication of Defects

A bug report is the primary communication artifact between a tester and the development team. Its purpose is to convey enough information for a developer to understand, reproduce, and fix a defect efficiently. A poorly written bug report wastes time, causes misunderstandings, and may result in the defect being closed as "cannot reproduce."

A good bug report contains: a clear, descriptive title; the environment (browser, operating system, application version); preconditions (the state the system must be in before the steps); numbered steps to reproduce; the expected result (what should happen); the actual result (what actually happened); severity and priority; and supporting evidence such as screenshots, videos, or log files.

Writing effective bug reports is a skill that distinguishes a strong QA engineer from an average one. The ability to isolate the minimal reproduction steps, identify the relevant environment details, and describe the defect unambiguously saves the development team significant time and builds trust between testers and developers.

**Why it matters:** A defect that cannot be reproduced from the bug report is a defect that will not be fixed. Clear, consistent bug reporting directly impacts how quickly defects are resolved and how effectively the QA team collaborates with development.

**Key things to understand:**

- Severity describes the impact of the defect on the system (critical, major, minor, trivial). Priority describes how urgently it should be fixed. A cosmetic typo on the login page might be low severity but high priority if it is the first thing customers see.
- Minimal reproduction steps are essential. Remove any steps that are not necessary to trigger the defect. The fewer the steps, the easier it is for the developer to isolate the root cause.
- Screenshots and screen recordings are not substitutes for written steps -- they are supplements. Written steps are searchable, version-controllable, and accessible; visual evidence adds clarity.
- Bug reports should describe observed facts, not opinions or assumptions about the root cause. "The save button does not respond when clicked" is better than "I think the event handler is broken."

**Common pitfalls:**

- Writing vague titles like "Button doesn't work" instead of specific ones like "Save button on user profile page does not submit form when clicked in Firefox 120."
- Including unnecessary steps that obscure the actual reproduction path and make the report harder to follow.
- Mixing multiple defects into a single bug report, making it difficult to track, assign, and verify each one independently.

---

## HTTP for Testers – Understanding Web Communication

HTTP (HyperText Transfer Protocol) is the foundation of communication on the web. Every interaction between a browser and a web server, every API call, and every test that interacts with a web application relies on HTTP. A QA engineer does not need to implement HTTP servers, but must understand how HTTP works to test web applications effectively.

An HTTP request consists of a method (GET, POST, PUT, DELETE, PATCH), a URL (the address of the resource), headers (metadata about the request, such as content type and authentication tokens), and optionally a body (the data being sent, typically in JSON format for APIs). The server responds with a status code, response headers, and a response body.

Status codes are grouped by their first digit: 1xx (informational), 2xx (success), 3xx (redirection), 4xx (client error), and 5xx (server error). The most common codes a tester encounters are 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorised), 403 (Forbidden), 404 (Not Found), and 500 (Internal Server Error). Understanding these codes helps you quickly identify whether a failure is on the client side or the server side.

**Why it matters:** HTTP knowledge is essential for API testing, debugging web application issues, reading network traces in browser developer tools, and understanding error responses. Without it, a tester can observe that something is broken but cannot articulate where or why.

**Key things to understand:**

- GET requests retrieve data and should not modify server state. POST requests create new resources. PUT requests replace a resource entirely. PATCH requests modify part of a resource. DELETE requests remove a resource.
- Headers carry important metadata. \`Content-Type\` tells the server what format the request body is in. \`Authorization\` carries authentication credentials. \`Accept\` tells the server what response format the client expects.
- HTTPS is HTTP over TLS (Transport Layer Security), which encrypts the communication between client and server. All production applications should use HTTPS.
- Cookies are small pieces of data sent by the server and stored by the browser. They are automatically included in subsequent requests to the same domain and are commonly used for session management.

**Common pitfalls:**

- Ignoring HTTP status codes during testing and only checking whether the page looks correct visually. A page that renders with a 500 error in the background may appear to work but indicates a serious server-side problem.
- Not understanding the difference between authentication (proving who you are) and authorisation (proving what you are allowed to do), which leads to incomplete security testing.
- Overlooking CORS (Cross-Origin Resource Sharing) errors in the browser console, which indicate that the browser is blocking requests to a different domain for security reasons.

---

## Browser Developer Tools – Inspecting and Debugging

Browser developer tools (DevTools) are built into every modern browser and provide a suite of utilities for inspecting, debugging, and profiling web applications. For a QA engineer, DevTools are an essential daily tool for understanding application behaviour, capturing evidence for bug reports, and verifying that the application works correctly at the network and DOM levels.

The most important panels for a QA engineer are: the Elements panel (inspect and modify the HTML and CSS of a page), the Console panel (view JavaScript errors and log messages), the Network panel (inspect every HTTP request and response made by the page), and the Application panel (inspect cookies, local storage, and session storage).

The Network panel is particularly valuable for QA work. It shows every request the page makes, including the URL, method, status code, response time, and response body. When a feature is not working as expected, the Network panel often reveals the root cause -- a failed API call, an unexpected response, or a missing request that should have been made.

**Why it matters:** DevTools transform a tester from someone who can only describe symptoms ("the page is blank") into someone who can provide root-cause evidence ("the GET request to /api/users returned a 500 with the error message 'database connection timeout'"). This dramatically improves the quality of bug reports and the speed of defect resolution.

**Key things to understand:**

- The Console panel shows JavaScript errors (in red) and warnings (in yellow). These often indicate real bugs even when the page appears to work visually.
- The Network panel can be filtered by request type (XHR/Fetch for API calls, JS for scripts, CSS for stylesheets, Img for images) to focus on relevant traffic.
- The Elements panel allows you to modify HTML and CSS in real time to test visual changes or reproduce layout issues without changing the source code.
- The Responsive Design Mode (device toolbar) lets you simulate different screen sizes and devices, which is essential for testing responsive layouts.

**Common pitfalls:**

- Forgetting to check the Console panel for JavaScript errors. A page that appears functional may be throwing errors that affect specific user flows.
- Clearing the Network panel accidentally and losing the evidence of a failed request. Use the "Preserve log" option to keep network entries across page navigations.
- Not using the Network panel's timing information to identify slow API calls that degrade user experience, even when the functional behaviour is correct.

---
`,
    mid: `# QA / Test Engineer – Mid Concept Reference


This document explains the intermediate-level concepts covered in the Mid level of the QA / Test Engineer learning path.

---

## Playwright – Modern End-to-End Test Automation

Playwright is a browser automation library developed by Microsoft that supports Chromium, Firefox, and WebKit (Safari) from a single API. It enables writing end-to-end tests that run real browsers, interact with pages the way users do, and verify that the full application stack works correctly together.

Playwright's architecture is built on the concept of browser contexts -- isolated browser sessions that share no state. Each test can run in its own context, providing true test isolation without the overhead of launching separate browser instances. This makes tests faster and more reliable than approaches that share browser state between tests.

The locator API is Playwright's primary mechanism for finding elements on a page. Locators are lazy and auto-waiting: when you write \`page.getByRole('button', { name: 'Submit' })\`, Playwright does not immediately search the DOM. Instead, it waits until the element is visible, stable, and actionable before interacting with it. This auto-waiting behaviour eliminates the need for explicit sleep statements and dramatically reduces test flakiness.

**Why it matters:** Playwright has become the industry standard for end-to-end test automation due to its reliability, speed, cross-browser support, and developer-friendly API. Mastering Playwright is essential for any mid-level QA engineer working on web applications.

**Key things to understand:**

- Prefer accessibility-based locators (\`getByRole\`, \`getByLabel\`, \`getByText\`) over CSS selectors or XPath. They are more resilient to UI changes and encourage accessible application design.
- Playwright supports API testing (\`request.get\`, \`request.post\`) alongside browser testing, allowing you to set up test data via API calls before running UI tests.
- Test fixtures and hooks (\`beforeEach\`, \`afterEach\`, \`beforeAll\`, \`afterAll\`) manage test setup and teardown. Custom fixtures can encapsulate common setup patterns.
- Playwright's trace viewer captures a complete timeline of each test including screenshots, DOM snapshots, and network requests, making it invaluable for debugging failures.

**Common pitfalls:**

- Using fragile CSS selectors or XPath expressions that break whenever the UI structure changes.
- Writing tests that depend on a specific execution order. Each test should be independent and able to run in isolation.
- Not using Playwright's built-in assertion methods (\`expect(locator).toBeVisible()\`, \`expect(locator).toHaveText(...)\`) which include auto-waiting, and instead using manual waits or raw JavaScript assertions.

---

## Test Automation University – Structured Learning for Test Automation

Test Automation University (TAU) is a free learning platform by Applitools that offers structured courses on test automation across multiple tools, languages, and frameworks. Courses are taught by recognised experts in the testing community and cover topics from beginner automation concepts to advanced patterns like visual testing and AI-assisted testing.

The platform is organised into learning paths. The Web UI testing paths cover tools like Selenium, Cypress, and Playwright. The API testing paths cover REST Assured, Postman, and other tools. There are also paths for mobile testing, CI/CD integration, and programming fundamentals for testers. Each course includes video lessons, quizzes, and hands-on exercises.

TAU is particularly valuable for QA engineers who need to build or strengthen their programming skills in the context of testing. The courses bridge the gap between generic programming tutorials and real-world test automation by teaching concepts through the lens of testing problems.

**Why it matters:** Structured, high-quality learning resources accelerate skill development and prevent the gaps that come from ad-hoc learning. TAU provides a curated path through the test automation landscape, taught by practitioners who understand the challenges testers face.

**Key things to understand:**

- Start with the fundamentals courses (Java or JavaScript/Python for testers) if you are not yet comfortable writing code. Automation frameworks assume programming proficiency.
- The courses on test design patterns (Page Object Model, Screenplay Pattern) teach you how to write maintainable, scalable test code rather than just functional test scripts.
- Visual testing courses introduce the concept of using screenshots and image comparison to detect UI regressions that functional assertions miss.
- Each course awards a certificate upon completion, which helps you track your progress and demonstrate your commitment to continuous learning.

**Common pitfalls:**

- Watching courses passively without writing code along with the exercises. Active practice is essential for skill retention.
- Jumping to advanced courses before completing the prerequisites, leading to confusion and frustration.
- Focusing only on one tool (e.g., Selenium) when the industry is moving toward modern alternatives like Playwright and Cypress.

---

## API Testing with Postman – Testing Services Directly

API testing involves sending HTTP requests directly to an application's backend services and validating the responses, without going through the user interface. Postman is one of the most widely used tools for this purpose. It provides a graphical interface for constructing requests, organising them into collections, writing test assertions, and automating test execution.

A Postman collection is a group of related API requests organised into folders. Each request specifies the HTTP method, URL, headers, and body. After executing a request, you write tests in JavaScript that run against the response. Postman's test syntax uses the \`pm.test\` function with Chai-style assertions: \`pm.response.to.have.status(200)\`, \`pm.expect(jsonData.name).to.eql('Alice')\`.

Environment variables and collection variables allow you to parameterise your tests. A base URL, authentication token, or test data ID can be stored as a variable and referenced across all requests in a collection. This makes it easy to run the same tests against different environments (development, staging, production) by switching the active environment.

**Why it matters:** API testing catches defects faster than UI testing because it targets the logic layer directly, without the overhead and fragility of browser interaction. Many critical defects -- incorrect business logic, missing validation, broken authentication -- are most efficiently found at the API level.

**Key things to understand:**

- Pre-request scripts run before a request is sent and can be used to generate dynamic data (timestamps, random values) or retrieve authentication tokens.
- Collection Runner and Newman (the command-line companion to Postman) allow you to run entire collections automatically, which is essential for integrating API tests into a CI/CD pipeline.
- Response time assertions (\`pm.expect(pm.response.responseTime).to.be.below(500)\`) combine functional and performance validation.
- Postman supports request chaining: the response of one request can be saved to a variable and used as input for the next request, enabling complex multi-step workflows.

**Common pitfalls:**

- Testing only the happy path (valid inputs, expected responses) and not testing error cases, edge cases, and boundary values.
- Hardcoding values (URLs, tokens, IDs) instead of using variables, making the tests brittle and environment-specific.
- Not validating the response schema (structure and data types) in addition to specific values, which means structural changes can go undetected.

---

## Cypress – Component and End-to-End Testing

Cypress is a JavaScript-based end-to-end testing framework designed specifically for modern web applications. Unlike Selenium-based tools that control the browser from outside, Cypress runs directly inside the browser alongside the application code. This architecture gives Cypress direct access to the DOM, network requests, and application state, enabling features that external tools cannot easily replicate.

Cypress provides a rich interactive test runner that displays the application alongside the test execution. As each test step runs, you can see the command log, inspect DOM snapshots at each step, and time-travel through the test to see exactly what the application looked like at any point. This visual feedback loop makes writing and debugging tests significantly easier.

The Cypress API is designed to be intuitive. Commands like \`cy.visit()\`, \`cy.get()\`, \`cy.click()\`, \`cy.type()\`, and \`cy.should()\` chain together fluently. Cypress automatically waits for elements to exist and become actionable before interacting with them, eliminating most timing-related flakiness.

**Why it matters:** Cypress is widely adopted in JavaScript-heavy teams and provides an excellent developer experience for writing and debugging tests. Understanding Cypress alongside Playwright gives a QA engineer the flexibility to work effectively across different teams and projects.

**Key things to understand:**

- Cypress uses a command queue rather than promises or async/await. Commands are enqueued and executed sequentially, which simplifies the test syntax but means you cannot use standard JavaScript \`async/await\` with Cypress commands.
- Network interception (\`cy.intercept()\`) allows you to stub API responses, simulate errors, and test how the application handles various backend scenarios without needing a real backend.
- Cypress supports component testing in addition to end-to-end testing, allowing you to mount and test individual React, Vue, or Angular components in isolation.
- The \`.should()\` command retries its assertion until it passes or times out, providing built-in resilience against timing issues.

**Common pitfalls:**

- Trying to use \`async/await\` with Cypress commands, which does not work due to Cypress's command queue architecture.
- Over-relying on \`cy.wait(milliseconds)\` for timing instead of using Cypress's built-in auto-waiting and assertion retries.
- Not leveraging network interception to isolate the frontend from the backend in tests, making tests dependent on backend availability and data state.

---

## Python for Testers – Scripting and Automation

Python is one of the most accessible and versatile programming languages for QA engineers. Its clear syntax, extensive standard library, and rich ecosystem of testing libraries make it an ideal language for writing test scripts, automating repetitive tasks, processing test data, and building custom testing tools.

For QA engineers, Python is useful in several contexts: writing test automation scripts with frameworks like pytest or Robot Framework, building utilities for test data generation, parsing log files to identify patterns, automating environment setup, and creating custom reporting tools. The book "Automate the Boring Stuff with Python" is an excellent starting point because it focuses on practical automation tasks rather than abstract computer science concepts.

pytest is the most popular Python testing framework. It uses a simple function-based syntax (test functions prefixed with \`test_\`), powerful fixtures for setup and teardown, and a plugin ecosystem that supports HTML reporting, parallel execution, and integration with CI/CD systems. Understanding pytest is essential for any QA engineer working in a Python environment.

**Why it matters:** Programming proficiency separates a manual tester from a test automation engineer. Python's low barrier to entry and practical power make it the ideal first (or second) language for QA engineers who want to expand into automation, tooling, and data analysis.

**Key things to understand:**

- Python's \`requests\` library is the standard tool for making HTTP requests in scripts, making it easy to write API tests or automate API interactions outside of Postman.
- List comprehensions, dictionaries, and file I/O operations are the Python features you will use most frequently in QA automation work.
- Virtual environments (\`venv\`) isolate project dependencies, preventing conflicts between different projects on the same machine.
- The \`json\` and \`csv\` modules in Python's standard library make it easy to work with the most common test data formats.

**Common pitfalls:**

- Writing long, monolithic scripts instead of breaking code into reusable functions and modules.
- Not using version control (Git) for test automation code, making it difficult to collaborate and track changes.
- Ignoring error handling in automation scripts, so a single unexpected condition causes the entire script to crash without useful diagnostic information.

---

## Performance Testing with k6 – Load and Stress Testing

k6 is an open-source load testing tool built for modern development workflows. Unlike older tools that use XML configuration or GUI-based test design, k6 tests are written in JavaScript, making them version-controllable, code-reviewable, and easy to integrate into CI/CD pipelines. k6 is designed to generate high load efficiently and produce clear, actionable metrics.

A k6 test script defines scenarios that simulate user behaviour. The simplest test makes HTTP requests in a loop, with k6 managing the virtual users (VUs) and iteration timing. You configure the number of virtual users, the test duration, and optional stages (ramp-up, steady state, ramp-down) to simulate realistic traffic patterns. k6 collects metrics automatically: response time (min, max, median, p90, p95), request rate, failure rate, and data transfer.

Thresholds are pass/fail criteria that you define in the test script. For example, you might require that the 95th percentile response time is below 500ms and the error rate is below 1%. If any threshold is breached, k6 exits with a non-zero code, making it easy to fail a CI pipeline on performance regression.

**Why it matters:** Performance testing ensures that the application meets its performance requirements under expected and peak load conditions. Without performance testing, performance problems are discovered by real users in production, where they are most expensive and embarrassing to fix.

**Key things to understand:**

- Virtual users (VUs) simulate concurrent users. Each VU executes the test script independently and concurrently. The number of VUs determines the level of concurrency.
- Percentile metrics (p90, p95, p99) are more meaningful than averages for performance testing because averages hide outliers. If the p95 response time is 2 seconds, 5% of users are experiencing 2+ second response times.
- Smoke tests (1-2 VUs for a short duration) verify that the script works correctly. Load tests (expected concurrent users) verify normal performance. Stress tests (beyond expected load) identify the breaking point.
- k6 Cloud and Grafana integration allow you to visualise test results in dashboards and track performance trends across releases.

**Common pitfalls:**

- Running performance tests from a single machine with insufficient resources, bottlenecking the test tool rather than the application under test.
- Not establishing a performance baseline before making changes, making it impossible to determine whether performance has improved or degraded.
- Testing against a development environment that has different hardware, configuration, or data volume than production, producing results that do not reflect real-world performance.

---

## BDD and Gherkin – Bridging Communication with Behaviour-Driven Development

Behaviour-Driven Development (BDD) is a collaborative approach to software development that uses structured natural language to describe the expected behaviour of a system. The goal is to create a shared understanding between business stakeholders, developers, and testers about what the software should do before any code is written.

Gherkin is the language used to write BDD scenarios. It uses a simple, keyword-driven syntax: \`Given\` (the preconditions), \`When\` (the action), \`Then\` (the expected outcome), and optionally \`And\` and \`But\` for additional steps. For example: "Given a user is logged in, When they click the delete button on a post, Then the post is removed from their profile." These scenarios serve as both requirements documentation and the basis for automated tests.

Cucumber is the most widely used tool for executing Gherkin scenarios. It maps each step in a scenario to a step definition -- a function in code that performs the action or assertion. This creates a living documentation system where the Gherkin scenarios are both human-readable specifications and executable tests that verify the system's behaviour.

**Why it matters:** BDD addresses one of the most common causes of software defects: misunderstanding between the people who specify what the software should do and the people who build it. Gherkin scenarios provide an unambiguous, testable format for requirements that all stakeholders can read and validate.

**Key things to understand:**

- BDD is fundamentally about collaboration and communication, not about test automation. The scenarios are a byproduct of conversations between product owners, developers, and testers (the "Three Amigos" practice).
- Scenarios should describe business behaviour, not implementation details. "When the user clicks the green submit button in the top-right corner" is too implementation-specific; "When the user submits the form" is better.
- Scenario Outlines allow you to run the same scenario with multiple sets of data, reducing duplication.
- Feature files (\`.feature\`) should be organised by business capability, not by technical component.

**Common pitfalls:**

- Using BDD as a test automation framework without the collaborative conversations that are its primary purpose. This produces Gherkin scenarios that are essentially rewritten test scripts with no communication benefit.
- Writing scenarios that are too detailed or too technical, making them unreadable for non-technical stakeholders.
- Creating step definitions that are too specific to one scenario, resulting in a large, unmaintainable library of steps instead of reusable building blocks.

---

## CI/CD Test Integration – Running Tests in the Pipeline

Continuous Integration (CI) is the practice of merging code changes frequently and running automated checks on every merge. Continuous Delivery (CD) extends this by automatically deploying changes that pass all checks to staging or production environments. Integrating tests into the CI/CD pipeline is what transforms testing from a manual gate into an automated quality checkpoint.

In a typical pipeline, tests run at multiple stages. Unit tests run first because they are fastest and catch the most common defects. If they pass, integration tests and API tests run. Finally, end-to-end tests run against a deployed environment. This staged approach provides fast feedback: a broken unit test is caught in seconds, while slower E2E tests only run if the faster tests have already passed.

Most modern CI/CD platforms support pipeline steps that execute test commands, collect results in standard formats (JUnit XML, TRX), and publish them in the build or workflow UI. This makes it easy to see which tests failed and why.

**Why it matters:** Tests that do not run automatically are tests that will eventually be forgotten or skipped. CI/CD integration ensures that every code change is verified by the full test suite, catching regressions before they reach users.

**Key things to understand:**

- Test results should be published in a standard format (JUnit XML is the most widely supported) so the CI/CD platform can display them in its UI and track trends over time.
- Flaky tests (tests that pass and fail intermittently) undermine confidence in the pipeline. Track flaky tests, fix them, and quarantine them if necessary until they are stable.
- Parallel test execution reduces pipeline duration. Most test runners support splitting tests across multiple agents or containers.
- Environment-specific configuration (API URLs, credentials) should be managed through pipeline variables and secrets, not hardcoded in test code.

**Common pitfalls:**

- Running all tests in a single pipeline stage, so a slow E2E test blocks feedback on a simple unit test failure.
- Ignoring intermittently failing tests instead of investigating and fixing them, gradually eroding the team's trust in the test suite.
- Not archiving test artifacts (screenshots, videos, logs) on failure, making it difficult to diagnose why a test failed in the pipeline when it passes locally.

---

## Contract Testing with Pact – Preventing Integration Failures

Contract testing verifies that two services (a consumer and a provider) can communicate correctly by testing each side independently against a shared contract. Pact is the most widely used consumer-driven contract testing tool. It works by having the consumer define a contract (called a pact) that describes the requests it will make and the responses it expects, and then verifying that the provider meets that contract.

The process has two phases. First, the consumer test generates a pact file: the consumer's test code makes requests to a mock provider (provided by Pact) and records the expected interactions. Second, the provider test replays those interactions against the real provider service and verifies that the actual responses match the expected ones. If the provider changes its API in a way that breaks the contract, the provider test fails -- before the change is deployed.

This approach is fundamentally different from traditional integration testing, which requires both services to be running simultaneously. Contract testing runs each side independently, making it faster, more reliable, and easier to integrate into CI/CD pipelines.

**Why it matters:** In a microservices architecture, integration failures between services are one of the most common and costly types of defects. Contract testing catches these failures early, in the individual service's build pipeline, rather than in a shared integration environment where failures are harder to diagnose and attribute.

**Key things to understand:**

- Consumer-driven means the consumer defines the contract based on the interactions it actually needs. This avoids over-specification and keeps the contract focused on real usage.
- Pact Broker is a central server that stores pact files and verification results, enabling consumer and provider teams to work independently while sharing contracts.
- The "can I deploy" check uses Pact Broker data to determine whether a specific version of a service is compatible with all its consumers and providers before deploying.
- Contract testing does not replace functional testing. It verifies the shape and structure of the communication, not the business logic of either service.

**Common pitfalls:**

- Writing overly specific contracts that assert on every field in a response, making the contract brittle and the provider unable to add new fields without breaking it.
- Treating contract tests as integration tests and trying to verify business logic through them rather than focusing on the API structure.
- Not running provider verification in the provider's CI pipeline, which defeats the purpose of catching breaking changes early.

---
`,
    senior: `# QA / Test Engineer – Senior Concept Reference


This document explains the advanced concepts covered in the Senior level of the QA / Test Engineer learning path.

---

## Test Strategy and Architecture – Designing the Testing Approach

A test strategy is a high-level document that defines how testing will be approached across a product or organisation. It answers questions like: what types of testing will be performed, who is responsible for each type, what tools will be used, what environments are needed, what the entry and exit criteria are, and how test results will be reported and acted upon. A test architecture describes how tests are structured, organised, and maintained as a codebase.

Martin Fowler's practical test pyramid article is one of the most influential pieces of writing on test strategy. It argues that a well-designed test suite has many fast unit tests, a moderate number of integration tests, and a small number of end-to-end tests. This shape maximises feedback speed and minimises maintenance cost. The article also discusses the tradeoffs between test fidelity (how closely a test resembles real usage) and test speed (how quickly the test provides feedback).

At the senior level, you are expected to design test strategies that balance risk, cost, and speed. This means making deliberate decisions about which features require E2E coverage, which can be adequately tested at the integration level, and which can be verified with unit tests alone. It also means defining standards for test code quality, naming conventions, folder structure, and maintenance practices.

**Why it matters:** Without a deliberate test strategy, teams end up with ad-hoc test suites that are slow, fragile, expensive to maintain, and provide uneven coverage. A well-designed strategy ensures that testing effort is invested where it provides the most value.

**Key things to understand:**

- Risk-based testing allocates more testing effort to the areas of the system that are most critical, most complex, or most likely to contain defects.
- The testing quadrants (Brian Marick's model) categorise tests along two axes: business-facing vs. technology-facing, and supporting the team vs. critiquing the product. This framework helps identify gaps in the testing approach.
- Test architecture includes decisions about the page object model (or other abstraction patterns), shared fixtures, test data strategies, and how tests are distributed across repositories and pipelines.
- A living test strategy document is reviewed and updated as the product, team, and technology evolve. A strategy written once and never revisited quickly becomes irrelevant.

**Common pitfalls:**

- Defining a test strategy on paper without implementing the tooling, infrastructure, and processes to support it.
- Treating the test pyramid as a rigid rule rather than a guideline. Some systems genuinely need more integration tests than unit tests, depending on their architecture.
- Not involving developers in the test strategy, resulting in a QA-owned strategy that does not align with how the codebase is structured or how the team works.

---

## Google Testing Blog – Industry Perspectives on Testing at Scale

The Google Testing Blog is a long-running publication by Google's engineering productivity team. It covers testing practices, tools, and philosophies developed at one of the largest software engineering organisations in the world. The blog's articles address topics such as test flakiness, test automation strategy, testing in CI/CD, code review for test quality, and the economics of testing.

The blog is valuable not because Google's practices should be copied directly -- their scale and context are unique -- but because the underlying principles are universal. Articles on topics like reducing test flakiness, the cost of slow tests, and the value of hermetic tests provide insights that apply to teams of any size. The blog also introduces concepts like "testing on the toilet" (short, actionable testing tips) and "test sizes" (small, medium, large) as an alternative to the traditional unit/integration/E2E labels.

Senior QA engineers benefit from reading broadly across the industry to challenge their assumptions and discover approaches they might not encounter in their own team. The Google Testing Blog is one of the highest-quality sources for this kind of learning.

**Why it matters:** Senior engineers are expected to have a broad perspective on testing that goes beyond the practices of their own team. Reading and synthesising industry knowledge enables you to evaluate new approaches, challenge conventional wisdom, and bring proven ideas to your organisation.

**Key things to understand:**

- Google uses test sizes (small, medium, large) based on resource constraints rather than scope labels (unit, integration, E2E). Small tests run in a single process, medium tests can use localhost network, and large tests can use external resources. This classification focuses on reliability and speed rather than scope.
- Hermetic tests are tests that are completely self-contained and do not depend on external services, shared databases, or network access. They are the most reliable and the fastest to run.
- The "testing tax" is the ongoing cost of maintaining a test suite: fixing broken tests, updating tests when behaviour changes, and waiting for slow tests. A well-designed strategy minimises this tax.
- Flaky tests (tests that pass and fail non-deterministically) are one of the most damaging problems in a test suite because they erode trust and lead teams to ignore test failures.

**Common pitfalls:**

- Trying to adopt Google-scale practices (like their testing infrastructure) in a small team where simpler approaches would be more effective.
- Reading blog posts without critically evaluating how the advice applies to your specific context, team size, and technology stack.
- Ignoring the economic perspective on testing -- every test has a cost to write, maintain, and run, and the benefit must justify that cost.

---

## Quality Engineering – Beyond Testing to Quality Culture

Quality engineering is a mindset shift from "testing the product to find defects" to "engineering the process to prevent defects." It encompasses all activities that improve the quality of the software and the efficiency of the team: test automation, CI/CD, monitoring, developer experience, process improvement, and cultural change.

A quality engineer does not just write tests. They analyse where defects originate and implement systemic improvements. If bugs are frequently introduced in a specific module, they might introduce static analysis rules, pair programming sessions, or architectural refactoring -- not just more tests. If deployments frequently cause incidents, they might implement feature flags, canary deployments, or improved monitoring -- not just more regression testing.

The shift from QA (quality assurance through testing) to quality engineering (quality through systemic improvement) reflects the industry's recognition that testing alone cannot ensure quality. Quality must be built into every stage of the development process, from requirements gathering through design, coding, testing, deployment, and monitoring.

**Why it matters:** Senior QA engineers are expected to influence quality at the systemic level, not just at the test execution level. Quality engineering is the framework for thinking about and improving quality across the entire delivery pipeline.

**Key things to understand:**

- Quality metrics (defect escape rate, mean time to detect, test coverage, flaky test rate, lead time for changes) provide data for quality improvement decisions. Without metrics, improvement efforts are based on intuition rather than evidence.
- Defect escape rate -- the percentage of defects found in production rather than in testing -- is one of the most important quality metrics. A decreasing escape rate indicates improving quality processes.
- Quality engineering requires collaboration with developers, product owners, and operations. It is not a solo discipline.
- The cost of quality includes prevention costs (training, tools, processes), appraisal costs (testing, code review), internal failure costs (rework, debugging), and external failure costs (production incidents, customer complaints). Investment in prevention reduces all other costs.

**Common pitfalls:**

- Equating quality engineering with test automation. Automation is one tool, not the whole discipline.
- Implementing quality metrics without acting on them. Metrics are only valuable if they drive decisions and improvements.
- Trying to improve quality in isolation without the support and involvement of the development team and management.

---

## Shift-Left Testing – Moving Quality Earlier in the Lifecycle

Shift-left testing is the practice of moving testing activities earlier in the software development lifecycle. Instead of testing only after the code is written and deployed to a test environment, shift-left testing integrates quality activities into every phase: requirements review, design review, code writing, and code review.

The economic argument for shift-left is compelling. The cost of fixing a defect increases exponentially the later it is discovered. A requirements misunderstanding caught during a design review costs almost nothing to fix. The same misunderstanding discovered in production after deployment can cost orders of magnitude more in rework, incident response, and customer impact.

Shift-left practices include: participating in requirements review to identify ambiguities and testability issues before development begins; integrating static analysis and linting into the development workflow to catch coding errors automatically; writing unit tests during development (or before, in TDD); running automated tests on every commit in CI; and performing code reviews with a quality and testability lens.

Test-Driven Development (TDD) is a development practice where tests are written before the production code. The cycle is: write a failing test that defines the desired behaviour (red), write the minimal code to make the test pass (green), then refactor the code while keeping all tests green. TDD produces code that is inherently testable (because the test was written first) and provides immediate documentation of the intended behaviour. TDD is not just "writing tests first" -- it is a design practice that drives code toward small, focused, loosely coupled modules because those are the easiest to test.

Static analysis tools examine code without executing it. They detect bugs, code smells, security vulnerabilities, and style violations. For QA engineers, the key static analysis tools include ESLint (JavaScript/TypeScript linting), SonarQube (comprehensive code quality platform), Pylint (Python linting), and Snyk (dependency vulnerability scanning). Integrating these tools into the CI pipeline and the developer's editor creates a continuous quality feedback loop. SonarQube quality gates can be integrated into CI pipelines to block merges when code quality drops below defined thresholds (coverage, duplication, security vulnerabilities, code smells). Dependency scanning (Snyk, npm audit, pip audit) identifies known vulnerabilities in third-party packages -- this is critical because most modern applications have hundreds of dependencies, each with their own potential security issues.

**Why it matters:** Shift-left testing is not about testing earlier for its own sake. It is about reducing the feedback loop so that defects are discovered when they are cheapest to fix and closest to the person who introduced them. Defects caught by static analysis cost virtually nothing to fix because the developer is already working in the relevant code. TDD prevents defects from being introduced in the first place by requiring the developer to think about correctness before writing the implementation.

**Key things to understand:**

- Test-Driven Development (TDD) is the most extreme form of shift-left: tests are written before the code, defining the desired behaviour as executable specifications. The red-green-refactor cycle (write a failing test, write the minimum code to pass it, refactor) builds quality into the development process itself.
- Static analysis tools (ESLint, SonarQube, Pylint) detect common errors, code smells, and security vulnerabilities without running the code. Integrating them into the editor and CI pipeline catches issues at the earliest possible moment.
- Shift-left does not mean abandoning right-side activities like E2E testing, monitoring, and production observability. It means complementing them with earlier activities to reduce the volume of defects that reach the later stages.
- Requirements traceability links each test case to the requirement it verifies, making it possible to identify untested requirements and understand the impact of requirement changes on the test suite.
- The value of static analysis depends on rule configuration. Too many rules or too-strict rules produce noise that developers learn to ignore. Start with a focused ruleset targeting high-impact issues and expand gradually.

**Common pitfalls:**

- Interpreting shift-left as "QA should write unit tests" rather than "the whole team should care about quality from the start."
- Eliminating later-stage testing in the name of shift-left, creating gaps in coverage for integration and production-like scenarios.
- Overwhelming developers with quality gates (linting rules, mandatory coverage thresholds, mandatory reviews) to the point where they slow down delivery without proportional quality benefit.
- Mandating 100% code coverage as a quality gate, which incentivises writing tests that achieve coverage without verifying meaningful behaviour.
- Ignoring static analysis warnings until they accumulate to the point where the backlog is overwhelming and demoralising.
- Applying TDD rigidly to every piece of code, including exploratory prototypes where the requirements are not yet understood. TDD is most valuable when the desired behaviour can be clearly defined.

---

## Accessibility Testing – WCAG Compliance and Inclusive Design

Accessibility testing verifies that a web application can be used by people with a wide range of disabilities, including visual, auditory, motor, and cognitive impairments. The Web Content Accessibility Guidelines (WCAG) 2.2 provide the internationally recognised standard for evaluating accessibility. Most legislation and organisational policies require conformance to WCAG 2.2 Level AA.

Accessibility testing combines automated scanning, manual testing, and assistive technology testing. Automated tools (axe-core, Lighthouse, Pa11y) can detect approximately 30-40% of accessibility issues -- those with clear, programmatically verifiable rules, such as missing alt text, insufficient colour contrast, and form inputs without labels. The remaining 60-70% of issues require human judgment: Is the tab order logical? Do screen reader announcements make sense? Can a keyboard-only user complete all critical tasks?

The EU European Accessibility Act applies from June 2025, making digital accessibility a legal requirement across the European Union. This elevates accessibility from a best practice to a compliance obligation. Senior QA engineers must be able to plan and execute accessibility audits, interpret the results, and prioritise remediation.

**Why it matters:** Accessibility affects a significant portion of the user population and is increasingly a legal requirement. A senior QA engineer who can lead accessibility testing and advocate for inclusive design adds substantial value to any product team.

**Key things to understand:**

- WCAG is organised around four principles (POUR): Perceivable, Operable, Understandable, Robust. Each principle contains guidelines, and each guideline contains testable success criteria at levels A, AA, and AAA.
- Keyboard testing is the single most impactful manual accessibility test. Navigate the entire application using only the keyboard (Tab, Shift+Tab, Enter, Space, Escape, arrow keys) and verify that all interactive elements are reachable, focusable, and operable.
- Screen reader testing (NVDA on Windows, VoiceOver on macOS) reveals issues that no automated tool can detect, such as nonsensical reading order, missing announcements for dynamic content updates, and confusing navigation landmarks.
- axe-core can be integrated into Playwright or Cypress tests to run automated accessibility checks as part of the CI pipeline, catching regressions with every build.

**Common pitfalls:**

- Relying solely on automated accessibility tools and declaring the application "accessible" based on a clean scan.
- Testing only the default state of components and missing accessibility issues in error states, expanded states, and dynamically loaded content.
- Treating accessibility as a one-time audit rather than an ongoing practice integrated into the definition of done for every feature.

---

## Security Testing – OWASP and Application Security Fundamentals

Security testing evaluates an application's ability to protect its data and functionality from unauthorised access, manipulation, and disruption. The OWASP (Open Web Application Security Project) Testing Guide provides a comprehensive methodology for security testing of web applications, and the OWASP Top 10 lists the most critical security risks that affect web applications.

The OWASP Top 10 includes risks such as injection (SQL injection, command injection), broken authentication, sensitive data exposure, cross-site scripting (XSS), insecure deserialization, and security misconfiguration. A senior QA engineer should be able to test for these vulnerabilities using both manual techniques and automated tools.

Security testing includes several approaches: SAST (Static Application Security Testing) analyses source code for vulnerabilities without running the application; DAST (Dynamic Application Security Testing) tests the running application by sending malicious inputs and observing responses; and penetration testing is a targeted, manual approach where a tester attempts to exploit vulnerabilities in the system.

**Why it matters:** Security vulnerabilities can result in data breaches, financial loss, regulatory penalties, and reputational damage. QA engineers who understand security testing add a critical layer of protection beyond functional correctness.

**Key things to understand:**

- SQL injection is one of the most common and dangerous vulnerabilities. It occurs when user input is incorporated into SQL queries without proper sanitisation or parameterisation. Testing for it involves submitting SQL metacharacters (single quotes, semicolons, comment markers) in input fields and observing the response.
- Cross-site scripting (XSS) occurs when an application includes untrusted data in its HTML output without proper escaping. Testing for it involves submitting script tags or event handlers in input fields and checking whether they are executed in the browser.
- Authentication and authorisation testing verifies that users can only access resources they are entitled to. This includes testing for broken access controls: can a regular user access admin endpoints? Can user A read user B's data?
- SAST tools (SonarQube, Snyk, Checkmarx) can be integrated into the CI pipeline to scan code for known vulnerability patterns on every commit.

**Common pitfalls:**

- Treating security testing as a separate activity done once before release rather than an ongoing practice integrated into the development lifecycle.
- Only testing the happy path and not attempting to bypass security controls with unexpected inputs, modified requests, or direct API access.
- Assuming that using a web framework's built-in security features (CSRF tokens, input validation) eliminates the need for security testing. Implementation errors and configuration mistakes can still introduce vulnerabilities.

---

## Visual Regression Testing – Detecting Unintended UI Changes

Visual regression testing uses automated screenshot comparison to detect unintended changes in the appearance of a user interface. Unlike functional tests that verify behaviour (what the application does), visual tests verify appearance (what the application looks like). They catch issues such as misaligned elements, overlapping text, broken layouts, incorrect colours, and missing icons that functional assertions would miss.

Playwright has built-in support for visual comparisons through its \`toHaveScreenshot()\` assertion. On the first run, it captures a baseline screenshot. On subsequent runs, it captures a new screenshot and compares it pixel-by-pixel against the baseline. If the difference exceeds a configurable threshold, the test fails and produces a diff image highlighting the changed areas. Baselines are stored in the repository alongside the test code.

Visual regression testing is most valuable for design-heavy applications, component libraries, and situations where pixel-perfect consistency matters. It complements functional testing by catching a class of defects -- visual regressions -- that functional tests are not designed to detect.

**Why it matters:** Visual regressions are easy to introduce (a CSS change in one component can cascade across the application) and difficult to catch manually. Automated visual testing provides consistent, repeatable verification of the application's appearance across every build.

**Key things to understand:**

- Baseline management is critical. When a visual change is intentional (a redesign, a new feature), baselines must be updated explicitly. The process of reviewing and approving baseline changes should be part of the code review workflow.
- Threshold configuration determines how much difference is tolerated before a test fails. Too tight a threshold produces false positives from anti-aliasing and font rendering differences across platforms. Too loose a threshold misses real regressions.
- Visual tests should target stable, isolated components or pages to reduce flakiness. Dynamic content (timestamps, random data, animations) must be mocked or masked to prevent false failures.
- Cross-browser visual testing (running visual comparisons in Chromium, Firefox, and WebKit) catches rendering differences between browser engines.

**Common pitfalls:**

- Running visual tests against pages with dynamic content (live data, timestamps, ads) without mocking or masking the dynamic areas, resulting in constant false failures.
- Not establishing a clear process for reviewing and approving baseline updates, leading to baselines being rubber-stamped without meaningful review.
- Capturing full-page screenshots instead of component-level screenshots, making it difficult to identify which specific element changed when a test fails.

---

## AI Policy, AI Checklist, and Secure AI Framework – Internal Guidelines

As AI-assisted tools become increasingly integrated into the testing workflow -- including AI-powered test generation, intelligent test selection, AI-assisted bug triage, and automated test maintenance -- it is essential to follow the organisation's policies and frameworks for responsible AI use.

The AI Policy defines the boundaries and governance for AI adoption within the organisation. It covers topics such as approved tools and models, data classification rules (what data can and cannot be sent to external AI services), intellectual property considerations for AI-generated code, and accountability for AI-assisted outputs.

The AI Checklist provides a practical, step-by-step verification process for teams adopting AI tools. It ensures that security, privacy, compliance, and quality considerations are addressed before an AI tool is deployed in a production workflow. The Secure AI Framework provides the technical guardrails for AI system integration, covering areas such as model access control, data handling, prompt injection prevention, and output validation.

**Why it matters:** AI tools are powerful but introduce new categories of risk: data leakage (sending sensitive test data to external services), hallucinated test cases (AI-generated tests that assert incorrect behaviour), and over-reliance on AI-generated outputs without human review. Following the organisation's AI guidelines ensures that AI adoption is both effective and responsible.

**Key things to understand:**

- Never send sensitive data (customer data, credentials, proprietary business logic) to external AI services without explicit approval under the AI Policy.
- AI-generated test code must be reviewed with the same rigour as human-written code. AI models can produce tests that pass but test the wrong thing, or that contain subtle logical errors.
- The AI Checklist should be completed before introducing any new AI-assisted testing tool into the team's workflow.
- The Secure AI Framework provides guidance on technical controls for AI integration, including input/output validation, access management, and audit logging.

**Common pitfalls:**

- Assuming that AI-generated tests are correct because they pass. A test that asserts incorrect expectations will pass and provide false confidence.
- Sending production data or sensitive business logic to AI services for test generation without checking the data classification requirements in the AI Policy.
- Adopting AI testing tools without completing the AI Checklist, bypassing the governance process that exists to protect the organisation.

---

## Quality Metrics and Reporting – Data-Driven Quality Improvement

Quality metrics are quantitative measures that track the effectiveness of testing activities and the overall quality of the software. For a senior QA engineer, metrics are not just numbers to report -- they are the basis for identifying problems, making decisions, and demonstrating the value of quality investments.

Key quality metrics include: defect escape rate (the ratio of defects found in production to defects found in testing); test coverage (the percentage of code, requirements, or risk areas covered by tests); mean time to detect (the average time between a defect being introduced and being discovered); mean time to resolve (the average time between defect discovery and fix deployment); flaky test rate (the percentage of tests that fail intermittently); and test execution time (how long the test suite takes to run in CI).

Effective quality reporting presents metrics in context: trends over time, comparisons between releases, and correlation with process changes. A single-point metric ("we have 80% code coverage") is less useful than a trend ("coverage increased from 65% to 80% over three sprints after we introduced coverage gates"). Dashboards that update automatically from CI/CD data are more reliable and less effort than manual reports.

**Why it matters:** Without metrics, quality improvement is based on intuition and anecdote. With metrics, you can identify where to invest testing effort, demonstrate the impact of quality initiatives, and make evidence-based decisions about risk and release readiness.

**Key things to understand:**

- Defect escape rate is the most important metric for measuring the overall effectiveness of the quality process. A decreasing escape rate means fewer defects are reaching production.
- Code coverage is a useful indicator but not a goal in itself. 80% coverage with meaningful assertions is far more valuable than 95% coverage with trivial assertions that do not verify real behaviour.
- Flaky tests are a critical metric because they directly undermine the value of the test suite. If tests fail randomly, the team stops trusting test results and may ignore real failures.
- Quality metrics should be visible to the whole team, not just the QA team. Quality is a shared responsibility, and metrics should inform everyone's decisions.

**Common pitfalls:**

- Using metrics as performance targets for individuals, which incentivises gaming (writing trivial tests for coverage, closing bugs without fixing them) rather than genuine improvement.
- Reporting metrics without analysis. A dashboard full of numbers without interpretation and recommended actions is information noise, not actionable intelligence.
- Measuring too many things at once. Start with 3-5 key metrics that align with the team's current quality challenges and expand only when those are well-understood and acted upon.

---

## Regulatory and Compliance Testing

Regulatory and compliance testing verifies that software systems meet the requirements imposed by laws, regulations, industry standards, and internal policies. In the financial services sector -- and insurance specifically -- this is not optional: Finansinspektionen (the Swedish Financial Supervisory Authority), the EU's DORA regulation, and GDPR all impose requirements that directly affect how software is tested, documented, and maintained.

Unlike functional testing (does the feature work?) or performance testing (does it work fast enough?), compliance testing asks: can we prove that the system meets its regulatory obligations? This requires traceability (linking requirements to test cases to test results), audit trails (immutable records of what was tested, when, and by whom), and evidence packages (documented proof of testing activities for regulatory audits).

**Why it matters:** In a regulated industry like insurance, inadequate testing documentation can result in regulatory findings, fines, or restrictions on business activities -- regardless of whether the software actually works correctly. A senior QA engineer in this environment must understand not just how to test, but how to document and evidence testing activities in a way that satisfies regulatory scrutiny.

**Key things to understand:**

- Traceability matrix: a bidirectional mapping between requirements and test cases. Every requirement must have at least one test case, and every test case must trace back to a requirement. This ensures complete coverage and makes it possible to assess the impact of requirement changes on the test suite.
- Audit trails: testing activities must produce immutable records -- who ran which tests, when, with what results, in what environment. Test management systems and CI/CD pipeline logs provide this naturally, but the records must be retained according to the organisation's retention policy.
- Test data masking: regulatory testing often requires realistic test data, but using production data containing personal information violates GDPR. Data masking (replacing sensitive values with realistic but fictitious alternatives) and synthetic data generation solve this problem.
- Finansinspektionen (FI) requirements: FFFS 2014:5 (governance and control) and the outsourcing regulations require financial institutions to demonstrate adequate IT risk management, including testing of critical systems. The regulations do not prescribe specific testing methods but require documented processes and evidence.
- DORA (Digital Operational Resilience Act): requires financial entities to implement ICT risk management frameworks including testing of ICT systems. DORA specifically requires threat-led penetration testing (TLPT) for significant financial institutions.
- Environment parity: regulatory testing often requires tests to run in environments that closely mirror production. Differences between test and production environments (data volumes, network configuration, integrations) can invalidate test results.
- Evidence packages: for regulatory audits, compile test evidence into structured packages: test plan, test cases with traceability, test execution results, defect reports and resolutions, environment descriptions, and sign-off records.

**Common pitfalls:**

- Treating regulatory testing as a checkbox exercise performed before release rather than an integrated part of the development process.
- Maintaining traceability manually in spreadsheets instead of using dedicated test management tools that automate the linkage between requirements and test cases.
- Using production data for testing without proper masking, violating GDPR and potentially exposing sensitive customer information.
- Not retaining test evidence according to the required retention periods -- if an auditor asks for test records from two years ago and they do not exist, the testing effectively did not happen from a compliance perspective.
- Assuming that automated test results alone satisfy compliance requirements -- regulators often expect documented test plans, risk assessments, and sign-off by responsible individuals, not just pass/fail reports.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from QA engineers evaluating AI-powered testing tools to testers validating AI features in production applications.

**Why it matters:** The AI Policy affects QA engineers in two ways: when using AI-assisted testing tools (which must comply with the policy's data handling and approved tool requirements) and when testing AI-powered features (which must be validated against the policy's transparency, fairness, and robustness requirements).

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins — this includes AI-assisted testing tools adopted by the QA team.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- When testing AI-powered features, verify that the transparency requirements are implemented — users must be informed when they interact with AI.
- The AI Policy's data classification requirements constrain what test data can be sent to AI services — never send production customer data to external AI tools without explicit approval.

**Common pitfalls:**
- Adopting AI-assisted testing tools without completing the AI Checklist and verifying compliance with the AI Policy.
- Testing AI features only for functional correctness without validating the policy's transparency and fairness requirements.
- Sending sensitive test data to AI-powered testing tools without checking the data classification requirements.

---

## AI-Powered Development for QA and Test Engineers

AI-assisted development tools are increasingly relevant to QA and test engineering workflows. These tools can generate test cases from specifications, create test data, write page object models, suggest assertions for existing test code, and help diagnose flaky tests — tasks that are well-suited to AI assistance because they follow recognisable patterns.

AI assistants are most effective for testing tasks when given precise context: the feature specification, the existing test patterns in the codebase, the testing framework conventions, and the types of assertions expected. They can also help explain unfamiliar test frameworks, generate API test collections, and draft BDD scenarios from user stories.

**Why it matters:** Senior QA engineers who use AI tools effectively can accelerate test development — particularly for generating boilerplate test structures, creating test data sets, and writing repetitive assertions. Understanding the limitations is critical: AI-generated tests can assert incorrect expectations, test the wrong behaviour, or provide false confidence through tests that always pass.

**Key things to understand:**
- AI-generated test cases must be reviewed with the same rigour as human-written tests. A test that asserts the wrong expected value will pass and provide false confidence.
- AI tools are effective for: generating test boilerplate, creating test data, writing assertions for straightforward behaviour, translating test cases between frameworks, and drafting BDD scenarios.
- AI tools are poorly suited for: identifying what needs to be tested (test design requires human judgment about risk and business impact), writing tests for complex business logic without deep domain context, and security testing.
- Data privacy applies to AI tool use: do not paste production data, customer records, or sensitive business logic into AI assistants. Follow the organisation's AI Policy for approved tools.

**Common pitfalls:**
- Using AI to generate tests without reviewing whether the assertions verify meaningful behaviour — AI-generated tests may achieve code coverage without testing anything important.
- Over-relying on AI for test design decisions that require human judgment about risk, business impact, and user behaviour.
- Not establishing team conventions around AI tool use in testing, leading to inconsistent test quality and patterns.

---

## Language Deep Dives

- [JavaScript Deep Dive](/language/javascript) — Test automation with Playwright, Cypress, and Jest
- [Python Deep Dive](/language/python) — pytest, API testing, and automation scripts
`,
  },
  'Security-Engineer': {
    overview: `# Security Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Security Engineers protect systems, applications, and data by identifying vulnerabilities, implementing defences, and building security into the development lifecycle. The role covers application security, threat modelling, secure coding, penetration testing, cloud security, identity management, incident response, and security operations.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| Security Fundamentals | [Cybersecurity Roadmap](https://roadmap.sh/cyber-security) | Interactive |
| OWASP Top 10 | [OWASP Top Ten](https://owasp.org/www-project-top-ten/) | Docs |
| Web Security Basics | [Web Security Academy – PortSwigger](https://portswigger.net/web-security) | Interactive |
| Networking Fundamentals | [Computer Networking Full Course (9h)](https://www.youtube.com/watch?v=qiQR5rTSshw) | Video |
| Cryptography Explained | [Secret Key Exchange (Diffie-Hellman) – Computerphile](https://www.youtube.com/watch?v=NmM9HA2MQGI) | Video |
| Linux Security Basics | [roadmap.sh – Linux](https://roadmap.sh/linux) | Interactive |
| Security+ Foundations | [Professor Messer – CompTIA Security+ Course](https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/) | Video |
| Hands-on Security Labs | [TryHackMe – Introduction to Cyber Security](https://tryhackme.com/path/outline/introtocyber) | Interactive |
| Cryptography Basics | [Khan Academy – Cryptography](https://www.khanacademy.org/computing/computer-science/cryptography) | Interactive |

### After completing Beginner you should be able to:

- Explain the CIA triad (Confidentiality, Integrity, Availability) and apply it to evaluate the security posture of a system
- Identify and describe the OWASP Top 10 vulnerability categories and explain why each is dangerous
- Explain how common web attacks work — SQL injection, XSS, CSRF — and describe their mitigations
- Describe the fundamentals of TCP/IP, DNS, HTTP/HTTPS, and how network traffic flows between client and server
- Navigate a Linux system, manage file permissions, and explain the principle of least privilege
- Explain the difference between symmetric and asymmetric encryption and describe when each is used
- Use a hands-on security lab environment to complete basic security challenges

For deep explanations of each concept, see the [Beginner Concept Reference](Security-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| Penetration Testing | [PortSwigger Web Security Academy – All Labs](https://portswigger.net/web-security/all-labs) | Interactive |
| Threat Modelling | [Threat Modeling Manifesto](https://www.threatmodelingmanifesto.org/) | Docs |
| Threat Modelling | [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) | Docs |
| Secure SDLC | [OWASP SAMM – Software Assurance Maturity Model](https://owaspsamm.org/) | Docs |
| Azure Security | [Microsoft Learn – Azure Security](https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/) | Interactive |
| Identity & Access Management | [OAuth 2.0 and OpenID Connect in Plain English](https://www.youtube.com/watch?v=996OiexHze0) | Video |
| Docker Security | [Learn Docker in 7 Easy Steps – Fireship](https://www.youtube.com/watch?v=gAkwW2tuIqE) | Video |
| Container Security | [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html) | Docs |
| API Security | [OWASP API Security Top 10](https://owasp.org/API-Security/) | Docs |
| SAST/DAST | [OWASP Source Code Analysis Tools](https://owasp.org/www-community/Source_Code_Analysis_Tools) | Docs |
| Hands-on Practice | [Hack The Box Academy](https://academy.hackthebox.com/) | Interactive |
| SIEM / Sentinel | [Microsoft Learn – Microsoft Sentinel Fundamentals](https://learn.microsoft.com/en-us/training/paths/security-ops-sentinel/) | Interactive |
| Secrets Management | [Microsoft Learn – Azure Key Vault](https://learn.microsoft.com/en-us/training/modules/configure-and-manage-azure-key-vault/) | Interactive |
| GDPR | [GDPR Overview – gdpr-info.eu](https://gdpr-info.eu/) | Reference |

### After completing Mid you should be able to:

- Perform a structured threat model using STRIDE and produce a prioritised list of threats with mitigations
- Execute web application penetration tests using manual techniques and tools like Burp Suite
- Integrate SAST and DAST scanning into a CI/CD pipeline and triage the findings
- Configure Azure security services including Defender for Cloud, Key Vault, and network security groups
- Explain OAuth 2.0 and OpenID Connect flows and identify common implementation mistakes that lead to vulnerabilities
- Assess the security posture of containerised applications and apply Docker security best practices
- Identify and explain the OWASP API Security Top 10 risks and describe mitigations for each

For deep explanations of each concept, see the [Mid Concept Reference](Security-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| Zero Trust Architecture | [Microsoft Zero Trust Documentation](https://learn.microsoft.com/en-us/security/zero-trust/) | Docs |
| MITRE ATT&CK | [MITRE ATT&CK Framework](https://attack.mitre.org/) | Docs |
| Incident Response | [NIST Incident Response Recommendations (SP 800-61 Rev 3)](https://csrc.nist.gov/pubs/sp/800/61/r3/final) | Docs |
| Supply Chain Security | [SLSA Framework – Supply-chain Levels for Software Artifacts](https://slsa.dev/) | Docs |
| LLM Security | [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | Docs |
| LLM Security | [Architecting Resilient LLM Agents](https://arxiv.org/abs/2509.08646) | Paper |
| Security Architecture | [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework) | Docs |
| Enterprise GenAI Security | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| DORA | [EUR-Lex – Digital Operational Resilience Act](https://eur-lex.europa.eu/eli/reg/2022/2554/oj) | Reference |
| NIS2 Directive | [EUR-Lex – NIS 2 Directive](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) | Reference |
| Kubernetes Security | [OWASP Kubernetes Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Kubernetes_Security_Cheat_Sheet.html) | Docs |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |

### After completing Senior you should be able to:

- Design a Zero Trust architecture and explain how identity, device, network, and data controls work together to enforce least-privilege access
- Map real-world attack techniques to the MITRE ATT&CK framework and use it to identify detection gaps
- Lead an incident response process following the NIST framework: preparation, detection, containment, eradication, recovery, and lessons learned
- Evaluate and implement supply chain security controls using frameworks like SLSA to protect build and deployment pipelines
- Identify the OWASP Top 10 risks for LLM applications and design mitigations for prompt injection, data leakage, and insecure plugin execution
- Define a security governance programme that integrates threat modelling, security testing, and compliance into the SDLC
- Apply AI governance and policy requirements to projects involving GenAI components
- Explain the requirements of DORA, NIS2, and Finansinspektionen regulations and their implications for ICT risk management in insurance

For deep explanations of each concept, see the [Senior Concept Reference](Security-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `# Security Engineer – Beginner Concept Reference


This document explains the foundational concepts covered in the Beginner level of the Security Engineer learning path.

---

## Security Fundamentals – The CIA Triad

The CIA triad is the foundational model for information security. It defines three core objectives that every security control aims to protect: Confidentiality (ensuring that information is accessible only to those authorised to access it), Integrity (ensuring that information is accurate and has not been tampered with), and Availability (ensuring that information and systems are accessible when needed by authorised users).

These three properties are often in tension. Encrypting all data at rest and in transit improves confidentiality but may reduce availability if key management fails. Allowing unrestricted public access maximises availability but destroys confidentiality. Security engineering is the discipline of finding the right balance for the specific system, data sensitivity, and business context.

**Why it matters:** The CIA triad is the lens through which all security decisions are evaluated. When assessing a vulnerability, you ask: does this compromise confidentiality, integrity, or availability? When designing a control, you ask: which of these properties does this protect? Without this framework, security work becomes a disconnected collection of tools and checklists rather than a coherent discipline.

**Key things to understand:**

- Confidentiality: encryption, access controls, data classification, need-to-know principle
- Integrity: hashing, digital signatures, checksums, audit logs, input validation
- Availability: redundancy, backups, DDoS protection, capacity planning, disaster recovery
- Defence in depth: layering multiple security controls so that the failure of one does not compromise the entire system
- The principle of least privilege: every user, process, and system should have only the minimum permissions needed to perform its function
- Risk = Threat × Vulnerability × Impact: a threat exploits a vulnerability to cause impact; security controls reduce one or more of these factors

**Common pitfalls:**

- Focusing exclusively on confidentiality (encryption, firewalls) while ignoring integrity (can the data be tampered with?) and availability (can the system be denied to legitimate users?).
- Treating security as a binary state ("we are secure" vs "we are not secure") rather than as a continuous spectrum of risk management.
- Applying the same security controls to all data regardless of sensitivity; not all data requires the same level of protection, and over-protecting low-sensitivity data wastes resources.

---

## OWASP Top 10 – The Most Critical Web Application Security Risks

The Open Web Application Security Project (OWASP) publishes a regularly updated list of the ten most critical security risks for web applications. The OWASP Top 10 is the most widely referenced baseline for web application security and is used by security teams, auditors, and regulators worldwide. The 2021 edition is the current stable reference, with a 2025 update available.

For a beginner Security Engineer, the OWASP Top 10 serves as a structured introduction to the vulnerability classes that are most commonly exploited in real-world attacks. Each category describes what the vulnerability is, why it is dangerous, and how to prevent it.

**Why it matters:** The OWASP Top 10 represents the consensus of the security community on what matters most. Being able to identify, explain, and mitigate each category is the baseline expectation for any security professional. These are not theoretical risks — they are the vulnerabilities that are actively exploited in breaches every day.

**Key things to understand:**

- **A01 – Broken Access Control:** Users accessing resources or actions they should not; enforce authorisation server-side on every request
- **A02 – Cryptographic Failures:** Sensitive data exposed due to weak or missing encryption; enforce HTTPS, hash passwords with bcrypt/Argon2
- **A03 – Injection:** Unsanitised input interpreted as commands (SQL injection, command injection); use parameterised queries
- **A04 – Insecure Design:** Security flaws in the architecture itself, not just the implementation; threat modelling must happen before code
- **A05 – Security Misconfiguration:** Default credentials, unnecessary services, verbose errors; harden every layer
- **A06 – Vulnerable Components:** Outdated dependencies with known CVEs; automate dependency scanning
- **A07 – Authentication Failures:** Weak passwords, missing rate limiting, predictable tokens; use proven auth libraries
- **A08 – Software and Data Integrity Failures:** Unverified updates, insecure CI/CD, unsafe deserialisation
- **A09 – Logging and Monitoring Failures:** Insufficient logging means breaches go undetected; log security events without logging secrets
- **A10 – Server-Side Request Forgery (SSRF):** Server makes requests to attacker-controlled or internal URLs

**Common pitfalls:**

- Treating the OWASP Top 10 as a checklist to complete once rather than a framework for ongoing awareness.
- Assuming that a web framework automatically prevents all OWASP Top 10 issues; frameworks help but do not eliminate the need for secure design and testing.
- Focusing only on injection (the historically most famous category) while ignoring broken access control, which is now the most prevalent critical finding.

---

## Web Security Basics – How Web Attacks Work

Understanding how web attacks work requires understanding how the web itself works. A web application consists of a client (browser) and a server communicating over HTTP. The browser sends requests, the server processes them and returns responses. Attackers exploit weaknesses in this cycle: injecting malicious input that the server processes unsafely, manipulating the browser into performing unintended actions, or intercepting communication between client and server.

The three most fundamental web attacks every Security Engineer must understand are SQL injection (injecting SQL commands through user input), Cross-Site Scripting (XSS, injecting JavaScript that executes in other users' browsers), and Cross-Site Request Forgery (CSRF, tricking an authenticated user's browser into making requests they did not intend). These three attacks have existed for decades and remain among the most commonly exploited vulnerabilities.

**Why it matters:** You cannot defend against attacks you do not understand. A Security Engineer must be able to recognise, demonstrate, and explain these attacks before they can effectively test for them, design mitigations, or review code for vulnerabilities. Hands-on practice in lab environments like PortSwigger Web Security Academy makes these concepts concrete.

**Key things to understand:**

- SQL Injection: attacker supplies input like \`' OR 1=1 --\` that is concatenated into a SQL query, allowing data extraction or manipulation; prevented by parameterised queries
- Cross-Site Scripting (XSS): attacker injects JavaScript that executes in other users' browsers; Stored XSS persists in the database, Reflected XSS is in the URL; prevented by output encoding and Content Security Policy
- Cross-Site Request Forgery (CSRF): attacker tricks an authenticated user's browser into submitting a request (e.g., changing their email address); prevented by CSRF tokens and SameSite cookies
- The same-origin policy and how it restricts cross-origin interactions in the browser
- HTTPS and TLS: how encryption in transit prevents eavesdropping and tampering; why HTTP without TLS is inherently insecure
- Security headers: \`Content-Security-Policy\`, \`X-Content-Type-Options\`, \`Strict-Transport-Security\`, \`X-Frame-Options\`

**Common pitfalls:**

- Believing that input validation alone prevents injection; validation helps but is not sufficient — parameterised queries are the definitive fix for SQL injection.
- Confusing encoding, escaping, and sanitisation; each serves a different purpose and is appropriate in different contexts.
- Assuming HTTPS means the application is secure; HTTPS encrypts the transport but does nothing about application-level vulnerabilities.
- Testing only with a browser and missing vulnerabilities that require intercepting and modifying requests with a proxy tool like Burp Suite.

---

## Networking Fundamentals – TCP/IP, DNS and How Traffic Flows

Networking is the physical and logical infrastructure that connects systems. Every web request, API call, database connection, and file transfer depends on the network. For a Security Engineer, understanding how networks work is essential because most attacks either traverse the network or exploit network protocols.

The TCP/IP model is the foundation: the Network Interface layer handles physical connections, the Internet layer (IP) handles addressing and routing, the Transport layer (TCP/UDP) handles reliable delivery and port-based multiplexing, and the Application layer (HTTP, DNS, SSH) handles the protocols that applications use. DNS translates human-readable domain names into IP addresses. Firewalls filter traffic based on source, destination, port, and protocol.

**Why it matters:** A Security Engineer who does not understand networking cannot analyse traffic, configure firewalls, understand VPN topologies, investigate network-based attacks, or explain how a man-in-the-middle attack works. Networking is the infrastructure layer upon which all application security sits.

**Key things to understand:**

- The TCP/IP four-layer model and how data encapsulation works (application data → TCP segment → IP packet → frame)
- TCP three-way handshake (SYN → SYN-ACK → ACK) and why it matters for understanding connection-based attacks
- IP addressing: IPv4 addresses, subnets, CIDR notation, private vs public address ranges
- DNS resolution: recursive and iterative queries, A records, CNAME records, and why DNS is a common attack vector (DNS spoofing, DNS exfiltration)
- Common ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS), 3389 (RDP)
- Firewalls: packet filtering, stateful inspection, and the concept of allow/deny rules based on source, destination, and port

**Common pitfalls:**

- Assuming that being on a "private" network means traffic is secure; internal networks are frequently compromised and lateral movement is a standard attack technique.
- Confusing encryption in transit (TLS) with network segmentation; they solve different problems and both are needed.
- Not understanding NAT (Network Address Translation) and how it affects the ability to identify the true source of traffic.

---

## Linux Security – Permissions, Users and Hardening

Linux is the operating system that runs the majority of servers, cloud infrastructure, and security tools. For a Security Engineer, Linux proficiency is non-negotiable — both for securing Linux systems and for using the offensive and defensive tools that run on Linux.

Linux security starts with the user and permission model. Every file and process has an owner and group, and permissions define who can read, write, or execute. The root user has unrestricted access, which makes it both powerful and dangerous. Beyond file permissions, Linux security involves managing services (disabling unnecessary ones), configuring firewalls (iptables, ufw), monitoring logs, and applying security updates.

**Why it matters:** Most security tools run on Linux (Burp Suite, Nmap, Wireshark, Metasploit, and countless others). Most servers that Security Engineers are asked to protect run Linux. And most attackers target Linux servers. Understanding Linux security is essential for both offence and defence.

**Key things to understand:**

- User management: creating users, managing groups, \`sudo\` and why root login should be disabled
- File permissions: the \`rwx\` model for user/group/other, \`chmod\`, \`chown\`, and understanding octal notation (e.g., 755, 644)
- The principle of least privilege applied to Linux: run services as non-root users, restrict file permissions to the minimum needed
- Firewall configuration: \`ufw\` or \`iptables\` for controlling inbound and outbound traffic
- SSH security: key-based authentication instead of passwords, disabling root login, changing the default port
- Log files: \`/var/log/auth.log\` for authentication events, \`/var/log/syslog\` for system events, and how to use \`journalctl\`

**Common pitfalls:**

- Running applications as root because it is easier; this gives an attacker full system access if the application is compromised.
- Setting permissions to 777 (world-readable, writable, executable) to "fix" a permission error without understanding why the error occurred.
- Not updating the system regularly; unpatched Linux servers are one of the most common entry points for attackers.
- Leaving default SSH configuration (root login enabled, password authentication enabled) on internet-facing servers.

---

## Cryptography Basics – Encryption, Hashing and Digital Signatures

Cryptography is the science of protecting information through mathematical transformations. For a Security Engineer, cryptography provides the tools for three fundamental capabilities: keeping data secret (encryption), verifying that data has not been modified (hashing), and proving the identity of the sender (digital signatures).

There are two families of encryption: symmetric (the same key encrypts and decrypts, e.g., AES) and asymmetric (a public key encrypts, a private key decrypts, e.g., RSA). Hashing is a one-way function that produces a fixed-size fingerprint of input data; it is used for password storage, file integrity verification, and digital signatures. A digital signature combines hashing with asymmetric encryption to prove both the identity of the signer and the integrity of the signed data.

**Why it matters:** Cryptography underpins TLS/HTTPS, password storage, API authentication, code signing, and data protection at rest. A Security Engineer who does not understand cryptography cannot evaluate whether a system's protections are adequate, cannot identify cryptographic weaknesses, and cannot make informed recommendations.

**Key things to understand:**

- Symmetric encryption (AES): fast, used for encrypting large amounts of data; the challenge is securely sharing the key
- Asymmetric encryption (RSA, ECDSA): slower, used for key exchange and digital signatures; the public key is shared, the private key is secret
- Hashing (SHA-256, bcrypt, Argon2): one-way, deterministic, fixed-size output; used for password storage and integrity verification
- The difference between encryption (reversible with the key) and hashing (one-way, not reversible)
- TLS handshake: how asymmetric encryption is used to exchange a symmetric session key, which is then used for the actual communication
- Certificate authorities and how HTTPS trust works: the browser trusts a CA, the CA signs the server's certificate, the browser verifies the signature

**Common pitfalls:**

- Using MD5 or SHA-1 for any security purpose; both have known collision vulnerabilities and should be considered broken for security use.
- Storing passwords with a fast hash (SHA-256) instead of a slow, salted password hash (bcrypt, Argon2); fast hashes can be brute-forced.
- Confusing encoding (Base64) with encryption; encoding is trivially reversible and provides zero security.
- Implementing custom cryptography instead of using well-tested libraries; cryptography is extraordinarily easy to get wrong and the consequences of getting it wrong are catastrophic.
`,
    mid: `# Security Engineer – Mid Concept Reference


This document explains the intermediate-level concepts covered in the Mid level of the Security Engineer learning path.

---

## Penetration Testing – Structured Offensive Security

Penetration testing (pentesting) is the practice of simulating real-world attacks against a system to identify vulnerabilities before malicious actors do. Unlike vulnerability scanning (which is automated), penetration testing involves human creativity, judgement, and the ability to chain multiple low-severity findings into a high-impact attack path.

A penetration test follows a methodology: reconnaissance (gathering information about the target), enumeration (discovering services, endpoints, and potential entry points), exploitation (attempting to leverage vulnerabilities), post-exploitation (determining the impact of a successful compromise), and reporting (documenting findings with severity, evidence, and remediation recommendations). The goal is not to break things but to provide a realistic assessment of the system's defensive capabilities.

**Why it matters:** Automated tools find known vulnerability patterns, but real attackers combine findings, think creatively, and exploit business logic flaws that scanners miss. Penetration testing bridges the gap between "we ran a scanner and it came back clean" and "we are confident a skilled attacker cannot compromise this system."

**Key things to understand:**

- Methodology: reconnaissance → enumeration → vulnerability analysis → exploitation → post-exploitation → reporting
- Burp Suite: the industry-standard web application testing proxy; intercept and modify requests, scan for vulnerabilities, test authentication flows
- Common attack types to practice: SQL injection (error-based, blind, time-based), XSS (stored, reflected, DOM-based), authentication bypass, IDOR (Insecure Direct Object References), SSRF, path traversal
- The difference between black-box (no knowledge of the system), grey-box (partial knowledge), and white-box (full access to source code) testing
- Rules of engagement: defined scope, authorised targets, testing windows, and escalation procedures; testing without authorisation is illegal
- PortSwigger Web Security Academy provides free, structured labs for practising every major web vulnerability category

**Common pitfalls:**

- Running automated scanners and calling it a penetration test; scanners are a starting point, not a substitute for human analysis.
- Testing outside the agreed scope; even in a test, accessing systems that are not in scope can have legal and operational consequences.
- Focusing only on technical exploitation while ignoring business logic flaws (e.g., manipulating a discount code to get negative prices).
- Writing reports that are too technical for the audience; findings must be communicated in terms of business risk, not just technical details.

---

## Threat Modelling – Identifying Risks Before Writing Code

Threat modelling is a structured process for identifying what can go wrong in a system, how likely it is, and what to do about it. It happens during the design phase — before code is written — making it one of the most cost-effective security activities because it prevents vulnerabilities from being built in the first place.

The most widely used framework is STRIDE, developed by Microsoft, which categorises threats into six types: Spoofing (pretending to be someone else), Tampering (modifying data or code), Repudiation (denying an action occurred), Information Disclosure (exposing data to unauthorised parties), Denial of Service (making the system unavailable), and Elevation of Privilege (gaining unauthorised access levels). A threat model typically involves creating a data flow diagram of the system, identifying trust boundaries, and systematically applying STRIDE to each component and data flow.

**Why it matters:** Security vulnerabilities found in design are orders of magnitude cheaper to fix than those found in production. Threat modelling forces the team to think about security before writing code, surfaces risks that might otherwise go unnoticed, and produces a prioritised list of threats that guides security investment.

**Key things to understand:**

- STRIDE categories and what each means in practice
- Data Flow Diagrams (DFDs): visual representation of how data moves through the system, including processes, data stores, external entities, and trust boundaries
- Trust boundaries: the lines between components with different levels of trust (e.g., between the internet and the application, between the application and the database)
- Risk rating: use a framework like DREAD (Damage, Reproducibility, Exploitability, Affected Users, Discoverability) or a simple likelihood × impact matrix to prioritise threats
- Threat modelling is not a one-time activity; it should be updated when the system architecture changes significantly
- The Threat Modeling Manifesto provides guiding principles: "A threat model is a tool for making security decisions, not a compliance artefact"

**Common pitfalls:**

- Creating overly detailed threat models that take weeks and produce documents no one reads; focus on the highest-risk areas.
- Only threat modelling new systems and ignoring existing ones that have never been analysed.
- Identifying threats without assigning owners or mitigations; a threat model that produces no action is a waste of time.
- Treating threat modelling as a security team activity rather than a collaborative exercise involving architects, developers, and product owners.

---

## Secure SDLC – Building Security into the Development Lifecycle

A Secure Software Development Lifecycle (Secure SDLC) integrates security activities into every phase of software development — requirements, design, implementation, testing, deployment, and maintenance — rather than treating security as a final gate before release.

OWASP SAMM (Software Assurance Maturity Model) provides a framework for assessing and improving an organisation's secure development practices across five business functions: Governance, Design, Implementation, Verification, and Operations. Each function has activities at three maturity levels, allowing organisations to incrementally improve their security posture.

**Why it matters:** Adding security only at the end of development (via a penetration test before release) catches some issues but misses fundamental design flaws, leaves developers without guidance on secure coding practices, and creates a bottleneck where the security team becomes a gate for every release. A Secure SDLC distributes security responsibility across the entire team and catches issues when they are cheapest to fix.

**Key things to understand:**

- Security requirements: define security needs alongside functional requirements (e.g., "passwords must be hashed with bcrypt", "API endpoints must enforce authorisation")
- Threat modelling during design (see previous section)
- Secure coding practices during implementation: input validation, parameterised queries, output encoding, secure authentication patterns
- Security testing during verification: SAST (Static Application Security Testing), DAST (Dynamic Application Security Testing), SCA (Software Composition Analysis for dependency vulnerabilities)
- Security review before deployment: final review of high-risk changes, configuration verification, secrets management check
- OWASP SAMM maturity levels provide a roadmap for gradual improvement rather than demanding perfection immediately

**Common pitfalls:**

- Implementing a Secure SDLC as a set of mandatory gates that slow down delivery without providing value; security activities should be integrated, not imposed.
- Making the security team solely responsible; secure development is a shared responsibility, with the security team providing tools, training, and guidance.
- Assuming that following a Secure SDLC eliminates all vulnerabilities; it reduces risk but does not eliminate it.

---

## Cloud Security – Azure Security Services and Configuration

Cloud security in Azure involves configuring and operating the security services that protect cloud resources, networks, identities, and data. Azure provides a layered security model: identity and access management (Azure Active Directory / Entra ID), network security (NSGs, firewalls, private endpoints), data protection (encryption at rest and in transit, Key Vault), and threat protection (Microsoft Defender for Cloud).

For a mid-level Security Engineer, the focus is on understanding how to configure these services correctly and how to detect and respond to misconfigurations and threats in a cloud environment. Cloud security is different from on-premises security because the shared responsibility model means the cloud provider secures the infrastructure while the customer secures the configuration, data, and identities.

**Why it matters:** Misconfigured cloud resources are the leading cause of cloud security breaches. A storage account left publicly accessible, a network security group with overly permissive rules, or an identity with excessive permissions — these misconfigurations are the cloud equivalent of leaving the front door unlocked. Understanding Azure security services is essential for preventing these exposures.

**Key things to understand:**

- Shared responsibility model: Microsoft secures the physical infrastructure, network, and hypervisor; the customer secures identity, data, application configuration, and access policies
- Azure Entra ID (formerly Azure AD): the identity provider; manages users, groups, service principals, and conditional access policies
- Network Security Groups (NSGs): stateful firewalls for controlling inbound and outbound traffic to Azure resources
- Azure Key Vault: centrally manages secrets, keys, and certificates; applications should retrieve secrets from Key Vault at runtime rather than storing them in configuration files
- Microsoft Defender for Cloud: provides security posture management (identifies misconfigurations) and threat protection (detects active attacks)
- Private endpoints: connect Azure PaaS services to a virtual network privately, eliminating public internet exposure

**Common pitfalls:**

- Granting Owner or Contributor roles at the subscription level when a more specific, lower-privilege role would suffice.
- Leaving storage accounts with public access enabled; default to private and use managed identities or SAS tokens for authorised access.
- Not enabling diagnostic logging on critical resources; without logs, security incidents cannot be investigated.
- Relying solely on network security (firewalls, NSGs) without implementing identity-based access controls; identity is the new perimeter.

---

## Identity and Access Management – OAuth 2.0 and OpenID Connect

Identity and Access Management (IAM) is the framework of policies and technologies that ensures the right people and machines have the right access to the right resources at the right time. For web applications and APIs, OAuth 2.0 and OpenID Connect (OIDC) are the dominant standards.

OAuth 2.0 is an authorisation framework — it defines how a user can grant a third-party application limited access to their resources without sharing their password. OpenID Connect is an identity layer built on top of OAuth 2.0 that adds authentication — it tells the application who the user is via an ID token. JWT (JSON Web Token) is the token format used by both standards.

**Why it matters:** Authentication and authorisation failures are the most common cause of security breaches (OWASP A01 and A07). Implementing these correctly requires understanding the protocols, their intended use, and the common mistakes that create vulnerabilities. Security Engineers must be able to review OAuth/OIDC implementations and identify weaknesses.

**Key things to understand:**

- OAuth 2.0 grant types: Authorization Code with PKCE (recommended for web and mobile apps), Client Credentials (machine-to-machine), Implicit (deprecated — do not use)
- OpenID Connect: adds the \`id_token\` which contains the authenticated user's identity claims; this is what makes OIDC an authentication protocol
- JWT structure: header (algorithm), payload (claims: \`sub\`, \`iss\`, \`aud\`, \`exp\`, \`iat\`), signature; the payload is Base64-encoded, not encrypted — do not put secrets in it
- Token validation: verify the signature, check the issuer (\`iss\`), check the audience (\`aud\`), check the expiration (\`exp\`), check the algorithm
- The difference between access tokens (used to access protected resources, short-lived) and refresh tokens (used to obtain new access tokens without re-authentication, longer-lived)
- Common implementation mistakes: not validating tokens server-side, accepting tokens with \`alg: none\`, storing tokens in localStorage (XSS risk), not checking audience claims

**Common pitfalls:**

- Confusing OAuth 2.0 (authorisation) with authentication; using an access token to identify a user without an OIDC ID token is insecure.
- Not validating the \`aud\` (audience) claim, allowing tokens intended for a different service to be accepted.
- Setting token expiry too long; a compromised token should have a limited window of usefulness.
- Implementing custom token validation logic instead of using a well-tested library; subtle bugs in validation lead to authentication bypass.

---

## Container Security – Securing Docker and Container Environments

Containers share the host operating system kernel, which makes them lighter than virtual machines but also means that a container escape — an attacker breaking out of the container's isolation — gives them access to the host and potentially all other containers running on it. Container security involves securing the image (what goes into the container), the runtime (how the container is configured and executed), and the orchestration layer (how containers are managed at scale).

For a mid-level Security Engineer, the focus is on understanding the Docker-specific security risks and applying the hardening practices that prevent the most common container-based attacks.

**Why it matters:** Containers are the standard deployment unit for modern applications. An insecure container image, an over-privileged container runtime, or an exposed container API can compromise the entire application and infrastructure. Container security must be addressed at every stage: build, deploy, and run.

**Key things to understand:**

- Image security: use minimal base images (e.g., Alpine, distroless), scan images for known CVEs using tools like Trivy or Snyk, pin dependency versions
- Never run containers as root; use the \`USER\` instruction in the Dockerfile to specify a non-root user
- Read-only file systems: mount the container's filesystem as read-only where possible to prevent attackers from writing to disk
- Secrets management: never bake secrets into images; use environment variables, Docker secrets, or external secrets managers
- Resource limits: set CPU and memory limits to prevent a compromised container from consuming all host resources
- Network policies: restrict container-to-container communication to only what is necessary; default-deny network policies in Kubernetes

**Common pitfalls:**

- Using \`latest\` tags for base images, which makes builds non-reproducible and may pull in unverified changes.
- Running containers with \`--privileged\` flag, which disables most security features and gives the container nearly full host access.
- Not scanning images in CI/CD pipelines, allowing images with known critical vulnerabilities to be deployed to production.
- Exposing the Docker daemon API without authentication, which is equivalent to giving anyone root access to the host.

---

## API Security – OWASP API Security Top 10

APIs are the connective tissue of modern applications — they connect frontends to backends, services to services, and organisations to partners. Because APIs expose data and functionality directly, they are high-value targets for attackers. The OWASP API Security Top 10 identifies the most critical security risks specific to APIs.

API security differs from web application security because APIs are designed for machine-to-machine communication, often lack the browser-based protections (same-origin policy, CSRF tokens) that web applications benefit from, and expose structured data that is easier for attackers to enumerate and manipulate.

**Why it matters:** API breaches are among the most damaging security incidents because APIs often provide direct access to backend data and business logic. A single broken authorisation check on an API endpoint can expose millions of records. Understanding API-specific security risks and how to test for them is essential for any mid-level Security Engineer.

**Key things to understand:**

- **API1 – Broken Object Level Authorization (BOLA):** The most common API vulnerability; the API does not verify that the authenticated user has permission to access the specific object they are requesting (e.g., changing \`/api/users/42\` to \`/api/users/43\`)
- **API2 – Broken Authentication:** Weak authentication mechanisms, missing rate limiting, or flawed token management
- **API3 – Broken Object Property Level Authorization:** The API exposes properties that the user should not be able to read or write (mass assignment, excessive data exposure)
- **API4 – Unrestricted Resource Consumption:** No rate limiting, pagination, or size restrictions, allowing abuse and denial of service
- **API5 – Broken Function Level Authorization:** Regular users able to access admin endpoints
- Rate limiting, input validation, output filtering, and authentication enforcement must be applied at the API gateway and application level
- Test APIs using tools like Burp Suite, Postman (for functional testing), and purpose-built API security tools

**Common pitfalls:**

- Relying on the frontend to enforce authorisation; if the API does not check permissions, an attacker can bypass the frontend entirely.
- Returning all object properties in API responses and relying on the frontend to hide sensitive fields.
- Not implementing rate limiting, allowing brute-force attacks against authentication endpoints.
- Treating internal APIs as inherently trusted; internal APIs should enforce authentication and authorisation as rigorously as public APIs.

---

## SAST and DAST – Automated Security Testing in the Pipeline

Static Application Security Testing (SAST) analyses source code without executing it, looking for patterns that indicate vulnerabilities (e.g., SQL queries built by string concatenation, hardcoded credentials, missing output encoding). Dynamic Application Security Testing (DAST) tests the running application by sending crafted requests and analysing the responses for signs of vulnerabilities (e.g., error messages revealing stack traces, reflected XSS in responses).

SAST and DAST are complementary. SAST finds issues in the code before it is deployed — it can identify the exact line of code where a vulnerability exists. DAST finds issues in the running application — it can identify misconfigurations and runtime behaviours that SAST cannot see. Both should be integrated into the CI/CD pipeline as automated quality gates.

**Why it matters:** Manual code review and penetration testing are essential but do not scale to every commit on every project. SAST and DAST provide continuous, automated security feedback that catches common vulnerabilities before they reach production. They are the foundation of a "shift-left" security programme.

**Key things to understand:**

- SAST: analyses source code or bytecode; produces results mapped to specific code lines; examples include SonarQube, Semgrep, CodeQL, and Checkmarx
- DAST: tests the running application over HTTP; does not require access to source code; examples include OWASP ZAP, Burp Suite (automated scan mode), and Nuclei
- SCA (Software Composition Analysis): scans dependencies for known vulnerabilities (CVEs); examples include Snyk, Dependabot, and \`pip-audit\`
- False positives: both SAST and DAST produce findings that are not real vulnerabilities; triage and contextual analysis are essential to avoid alert fatigue
- Integration: run SAST on every pull request, run SCA on every build, run DAST against staging environments; fail builds only for high/critical findings to avoid blocking development
- Findings must be triaged, prioritised, and tracked to resolution; a tool that produces findings no one acts on provides no security value

**Common pitfalls:**

- Enabling SAST/DAST tools without triaging findings, resulting in thousands of unreviewed alerts that everyone ignores.
- Treating automated scan results as the definitive security assessment; these tools find patterns, not all vulnerabilities.
- Running DAST against production without approval; dynamic scanners can cause unintended side effects (data creation, service disruption).
- Not suppressing confirmed false positives, causing the same irrelevant findings to appear in every scan.
`,
    senior: `# Security Engineer – Senior Concept Reference


This document explains the advanced concepts covered in the Senior level of the Security Engineer learning path.

---

## Zero Trust Architecture – Identity as the New Perimeter

Zero Trust is a security model based on the principle "never trust, always verify." Traditional security architectures assume that everything inside the corporate network is trusted and everything outside is untrusted. Zero Trust eliminates this assumption: every request — regardless of where it originates — must be authenticated, authorised, and continuously validated before access is granted.

The shift to Zero Trust is driven by the reality that the traditional network perimeter has dissolved. Cloud services, remote work, mobile devices, and partner integrations mean that users and applications routinely access resources from outside the corporate network. Attackers who breach the perimeter (via phishing, compromised credentials, or supply chain attacks) can move laterally with minimal resistance in a traditional model. Zero Trust limits this lateral movement by requiring verification at every access point.

Microsoft's Zero Trust model is built on three principles: verify explicitly (always authenticate and authorise based on all available data points — identity, location, device health, service, data classification, anomalies), use least-privilege access (limit access with just-in-time and just-enough-access policies), and assume breach (minimise blast radius through segmentation and monitor for anomalous behaviour to detect breaches early).

**Why it matters:** Zero Trust is the security architecture that modern organisations are adopting. Understanding how to design and implement Zero Trust controls — identity verification, conditional access, micro-segmentation, continuous monitoring — is essential for any senior Security Engineer responsible for the security posture of an organisation.

**Key things to understand:**

- Identity is the control plane: use Azure Entra ID (Azure AD) Conditional Access to enforce policies based on user identity, device compliance, location, risk level, and application sensitivity
- Micro-segmentation: divide the network into small zones and enforce policies at each boundary; even if an attacker compromises one zone, they cannot move to others without re-authenticating
- Device trust: verify that the device accessing a resource is managed, compliant, and free of known vulnerabilities before granting access
- Least-privilege access: implement just-in-time (JIT) privileged access using Azure PIM (Privileged Identity Management); administrators must request elevated access for a limited time window
- Continuous monitoring: use SIEM (Security Information and Event Management) and UEBA (User and Entity Behaviour Analytics) to detect anomalous behaviour in real time
- Data-centric security: classify data by sensitivity and apply protection controls (encryption, DLP, access policies) based on classification rather than network location

**Common pitfalls:**

- Treating Zero Trust as a product to buy rather than an architecture to implement; no single vendor provides "Zero Trust in a box."
- Implementing Zero Trust for external access but not for internal service-to-service communication; internal traffic must also be authenticated and authorised.
- Making Zero Trust so restrictive that legitimate users cannot do their work, causing them to find workarounds that bypass security controls.
- Not investing in identity infrastructure (MFA, conditional access, device management) before implementing network-level Zero Trust controls.

---

## MITRE ATT&CK – Understanding Adversary Behaviour

MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is a globally accessible knowledge base of adversary tactics and techniques based on real-world observations. It documents how attackers operate — from initial access through execution, persistence, privilege escalation, defence evasion, credential access, discovery, lateral movement, collection, command and control, exfiltration, and impact.

ATT&CK provides a common language for describing adversary behaviour. Each technique has a unique identifier (e.g., T1059 – Command and Scripting Interpreter), a description of how it works, examples of real-world use, and documented mitigations and detections. Security teams use ATT&CK to evaluate their detection coverage, design threat-informed defences, and communicate about threats in a precise, unambiguous way.

**Why it matters:** ATT&CK transforms security from a reactive discipline ("we detected an alert") to a proactive one ("we have detection coverage for 80% of the techniques used by our most relevant threat actors, and here are the gaps we need to close"). For a senior Security Engineer, ATT&CK is the framework for evaluating and improving an organisation's detection and response capabilities.

**Key things to understand:**

- Tactics (the "why"): the adversary's objective at each stage (e.g., Initial Access, Persistence, Lateral Movement)
- Techniques (the "how"): the specific methods used to achieve each tactic (e.g., Phishing for Initial Access, Pass-the-Hash for Lateral Movement)
- Sub-techniques: more granular descriptions of how a technique is implemented (e.g., T1566.001 – Spearphishing Attachment is a sub-technique of T1566 – Phishing)
- ATT&CK Navigator: a tool for visualising coverage — colour-code techniques by detection status to identify gaps
- Threat-informed defence: prioritise detection engineering based on the techniques used by the threat actors most relevant to your organisation and industry
- Purple teaming: collaborative exercises where red team (offensive) and blue team (defensive) work together, using ATT&CK techniques to test and improve detection capabilities

**Common pitfalls:**

- Trying to achieve coverage of every technique simultaneously; prioritise based on threat intelligence relevant to your organisation and industry.
- Mapping detections to ATT&CK techniques without testing them; a detection rule that triggers on the right log event but has never been validated against a real technique execution provides false confidence.
- Treating ATT&CK as a compliance checklist rather than a living tool for continuous improvement.
- Ignoring sub-techniques and mapping everything to top-level techniques, losing the granularity that makes ATT&CK useful.

---

## Incident Response – Detection, Containment and Recovery

Incident response (IR) is the structured process for detecting, investigating, containing, eradicating, and recovering from security incidents. The NIST Incident Response Recommendations (SP 800-61 Rev 3) provides updated guidance on incident response, restructured from the previous revision's four-phase lifecycle into a recommendations-based format covering preparation, detection, response coordination, and post-incident activities.

A security incident is any event that compromises the confidentiality, integrity, or availability of information or systems. This includes malware infections, unauthorised access, data breaches, denial-of-service attacks, and insider threats. The IR process ensures that incidents are handled consistently, damage is minimised, evidence is preserved, and lessons are learned to prevent recurrence.

**Why it matters:** Every organisation will experience security incidents. The difference between a minor disruption and a catastrophic breach often comes down to how quickly and effectively the incident is detected and contained. A senior Security Engineer must be able to lead incident response, coordinate across teams, and make time-critical decisions under pressure.

**Key things to understand:**

- Preparation: incident response plan, contact lists, communication templates, forensic toolkits, log collection and retention policies, tabletop exercises
- Detection and Analysis: monitoring (SIEM, EDR, network analysis), alert triage (true positive vs false positive), severity classification, initial scoping (what systems are affected?)
- Containment: short-term (isolate affected systems to stop the spread) and long-term (apply patches, disable compromised accounts, block malicious IPs) containment strategies
- Eradication: remove the root cause (malware, backdoors, compromised credentials); verify that all instances are removed, not just the ones found initially
- Recovery: restore systems from clean backups, validate integrity, monitor for signs of re-compromise during and after restoration
- Post-incident activity: root cause analysis, lessons learned, process improvements, stakeholder communication, regulatory notification (if required)

**Common pitfalls:**

- Not having an incident response plan before an incident occurs; creating a plan during a crisis is too late.
- Focusing on containment without preserving evidence for forensic analysis; volatile evidence (memory, network connections) must be captured before it is lost.
- Declaring an incident resolved without thorough eradication; attackers frequently maintain multiple persistence mechanisms.
- Not conducting post-incident reviews; without lessons learned, the same type of incident will happen again.

---

## Supply Chain Security – Protecting the Build and Deployment Pipeline

Software supply chain security addresses the risks introduced by the components, tools, and processes used to build and deploy software. Supply chain attacks target the weakest link in the chain: compromising a widely-used library, a build tool, or a CI/CD pipeline to inject malicious code into the final product. High-profile incidents like SolarWinds (compromised build pipeline) and Log4Shell (vulnerable dependency) have demonstrated the devastating impact of supply chain attacks.

SLSA (Supply-chain Levels for Software Artifacts, pronounced "salsa") is a framework for ensuring the integrity of software artifacts throughout the supply chain. SLSA v1.0 organises requirements into tracks: the Build track (levels L0–L3) focuses on build integrity and provenance, while the Source track addresses source code integrity. Each level adds stronger guarantees about the build process.

**Why it matters:** Modern software is built from hundreds of open-source dependencies, compiled by CI/CD systems, and deployed by automated pipelines. Each of these components is a potential attack vector. A senior Security Engineer must understand supply chain risks and implement controls to detect and prevent supply chain compromises.

**Key things to understand:**

- Software Bill of Materials (SBOM): a machine-readable inventory of all components in a software product; essential for vulnerability tracking and incident response
- Dependency management: pin dependency versions, use lock files, verify checksums, scan for known vulnerabilities (Dependabot, Snyk, pip-audit)
- Build integrity: ensure that the build process is reproducible and that the build output matches the source code; use signed commits and signed build artifacts
- SLSA v1.0 Build track: L0 (no guarantees), L1 (provenance exists — the build process produces attestations documenting how the artifact was built), L2 (hosted build service — the build runs on a hosted platform that generates authenticated provenance), L3 (hardened build platform — the build platform provides strong isolation and tamper protection). The Source track (under development) will address source code integrity requirements
- Container image security: scan images for vulnerabilities, sign images with cosign/Notary, use trusted base images, verify image provenance before deployment
- CI/CD pipeline security: restrict who can modify pipelines, use separate build and deployment credentials, audit pipeline changes, prevent secret leakage in build logs

**Common pitfalls:**

- Trusting all open-source dependencies without verification; popularity is not a security guarantee.
- Not monitoring for new CVEs in existing dependencies; a library that was safe when you adopted it may have a critical vulnerability discovered later.
- Securing the application code but not the pipeline that builds and deploys it; a compromised pipeline can inject arbitrary code.
- Generating SBOMs without using them for vulnerability tracking and incident response; an SBOM that is not maintained is a compliance artifact, not a security tool.

---

## LLM Security – OWASP Top 10 for Large Language Model Applications

The OWASP Top 10 for LLM Applications identifies the most critical security risks specific to applications that incorporate large language models. As organisations integrate LLMs into their products and internal tools, a new class of vulnerabilities has emerged that traditional application security testing does not cover.

LLM applications introduce unique risks because they process natural language input that can be crafted to manipulate the model's behaviour (prompt injection), they may have access to sensitive data through retrieval systems (data leakage), and they may be connected to external tools and APIs that can be triggered by model output (insecure plugin/tool execution).

**Why it matters:** LLM adoption is accelerating across every industry. Security Engineers must understand the LLM-specific attack surface to evaluate, secure, and monitor these applications. The OWASP LLM Top 10 provides a structured framework for this, analogous to the traditional OWASP Top 10 for web applications.

**Key things to understand:**

- **Prompt Injection:** The most critical LLM risk; attacker-crafted input causes the model to ignore its system instructions and perform unintended actions. Direct injection (user sends malicious prompt) and indirect injection (malicious content in retrieved documents)
- **Insecure Output Handling:** LLM output is used unsafely — passed to a shell command, rendered as HTML, or used in a SQL query without sanitisation
- **Sensitive Information Disclosure:** The LLM reveals confidential data from its training data, system prompt, or retrieved documents
- **Excessive Agency:** The LLM is given access to tools, APIs, or data that it should not be able to invoke; combined with prompt injection, this creates high-impact attack chains
- **Model Denial of Service:** Crafted inputs that cause the model to consume excessive resources or produce extremely long outputs
- Defence layers: input validation, output filtering, privilege separation (limit what tools the LLM can invoke), human-in-the-loop for high-risk actions, monitoring for anomalous LLM behaviour

**Common pitfalls:**

- Treating LLM output as trusted data; LLM output should be treated with the same suspicion as user input — always validate and sanitise before using it in downstream operations.
- Relying solely on system prompts for security ("you must never reveal the system prompt"); prompt injection can override system instructions.
- Giving LLMs direct access to production databases, file systems, or APIs without mediation and access controls.
- Not monitoring LLM interactions; without logging and analysis of prompts and responses, attacks and data leakage go undetected.

---

## Security Governance – Building a Security Programme

Security governance is the framework of policies, standards, processes, and organisational structures that ensures security is managed as a strategic business function rather than an ad hoc technical activity. For a senior Security Engineer, governance means defining what "good" looks like, ensuring compliance, measuring progress, and continuously improving the organisation's security posture.

A security programme typically includes: a security policy (the top-level document that defines the organisation's security principles and commitments), standards (specific technical requirements derived from the policy), procedures (step-by-step instructions for implementing standards), guidelines (recommended best practices), and metrics (measurements that track the programme's effectiveness).

**Why it matters:** Technical security controls are necessary but not sufficient. Without governance, security efforts are fragmented, inconsistent, and unmeasured. A senior Security Engineer must be able to design and operate a security programme that aligns security investment with business risk, ensures compliance with regulatory requirements, and demonstrates value to leadership.

**Key things to understand:**

- Risk management frameworks: NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover), ISO 27001 (information security management system), CIS Controls (prioritised set of security actions)
- Security metrics: vulnerability remediation time, mean time to detect (MTTD), mean time to respond (MTTR), patching compliance, security training completion, phishing simulation click rates
- Compliance vs security: compliance (meeting regulatory requirements) is a subset of security (protecting the organisation); being compliant does not guarantee being secure
- Security awareness training: the most technically secure system is still vulnerable to social engineering; training must be ongoing, relevant, and measured
- Third-party risk management: assessing and monitoring the security posture of vendors, partners, and SaaS providers that have access to your data or systems
- The organisation's AI Policy, AI Checklist, and Secure AI Framework define governance requirements for GenAI projects specifically

**Common pitfalls:**

- Writing policies that no one reads or follows; policies must be practical, specific, and enforced through technical controls where possible.
- Measuring security by the number of tools deployed rather than by outcomes (reduction in risk, faster detection, fewer incidents).
- Treating governance as a one-time project rather than an ongoing programme; the threat landscape, technology stack, and regulatory environment change continuously.
- Separating security governance from engineering; governance that is disconnected from how software is actually built and operated produces compliance theater, not security.

---

## Regulatory Landscape — DORA, NIS2 and Finansinspektionen

The regulatory landscape for ICT security in European financial services has undergone a significant transformation. Three overlapping regulatory frameworks now define the security obligations for insurance companies operating in Sweden and the EU: DORA (Digital Operational Resilience Act), NIS2 (Network and Information Security Directive), and Finansinspektionen's (FI) national regulations.

DORA is an EU regulation that became applicable in January 2025. It establishes uniform requirements for the security of ICT systems used by financial entities, including insurance companies. Unlike previous regulations that addressed ICT risk as a subset of operational risk, DORA treats digital operational resilience as a distinct regulatory domain with specific, detailed requirements.

NIS2 is the updated EU directive on network and information security, expanding the scope of the original NIS directive to cover more sectors and imposing stricter requirements. Financial services, including insurance, are classified as "essential entities" under NIS2, subject to the highest tier of obligations. EU member states were required to transpose NIS2 into national law by October 2024.

Finansinspektionen (FI) is Sweden's financial supervisory authority. FI's regulations (FFFS) and general guidelines set national requirements for IT governance, outsourcing, and operational risk management in financial institutions. FFFS 2014:5 (governance, risk management and control) is the primary regulation covering IT risk for Swedish insurance companies.

**Why it matters:** Security engineers in insurance must understand the regulatory framework because it defines the minimum acceptable security posture. Non-compliance carries significant consequences: DORA penalties can reach 1% of average daily worldwide turnover (applied daily until compliance is achieved), NIS2 penalties up to 10 million EUR or 2% of global turnover, and FI can impose sanctions including operational restrictions. More importantly, these regulations codify genuine security best practices that protect the organisation and its customers.

**Key things to understand:**

- DORA ICT risk management framework: requires financial entities to establish a comprehensive ICT risk management framework covering identification, protection, detection, response, and recovery. This must be documented, regularly reviewed, and approved by the management body
- DORA incident reporting: significant ICT-related incidents must be reported to the competent authority (FI in Sweden) using standardised templates and within defined timelines (initial notification within 4 hours of classification, intermediate report within 72 hours, final report within one month)
- DORA third-party risk: financial entities must manage ICT third-party risk, including maintaining a register of all ICT third-party service providers, conducting due diligence before engagement, including contractual exit strategies, and monitoring providers continuously. Critical ICT third-party providers are subject to direct oversight by EU supervisory authorities
- DORA digital operational resilience testing: requires regular testing of ICT systems including vulnerability assessments, network security testing, and — for significant entities — advanced threat-led penetration testing (TLPT) at least every three years
- NIS2 obligations for essential entities: risk management measures (risk analysis, incident handling, business continuity, supply chain security, security in acquisition and development, vulnerability handling), incident reporting within 24 hours (early warning) and 72 hours (full notification), management body accountability (senior management must approve and oversee cybersecurity risk management)
- FFFS 2014:5 (FI): requires financial institutions to have documented IT strategy, IT risk management processes, and incident management procedures. Outsourcing arrangements must maintain the same level of control as internal operations. FI conducts regular supervisory reviews and can require corrective actions
- Overlap and alignment: DORA, NIS2, and FI regulations overlap significantly. DORA takes precedence for financial entities on ICT-specific matters (lex specialis). A well-designed security programme that satisfies DORA will largely satisfy NIS2 and FI requirements, but gaps must be explicitly assessed

**Common pitfalls:**

- Treating DORA as a compliance checkbox rather than an opportunity to genuinely improve digital operational resilience — the regulation's requirements are substantive and reflect real security needs
- Not maintaining the ICT third-party register — DORA requires a complete, up-to-date register of all ICT service providers with details of the services provided, criticality assessments, and contractual arrangements
- Underestimating the incident reporting timelines — 4 hours for initial classification and notification is very tight and requires pre-established processes, templates, and communication channels
- Assuming that existing FI compliance automatically satisfies DORA — while there is significant overlap, DORA introduces new requirements (particularly around testing and third-party risk) that go beyond existing FI regulations
- Not involving senior management — both DORA and NIS2 explicitly require management body accountability for ICT risk management, including personal liability provisions

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from security engineers evaluating AI system risks to analysts using AI-assisted security tools.

**Why it matters:** The AI Policy is directly relevant to security engineering in two ways. First, security engineers must understand the policy to evaluate whether AI systems comply with it — the policy defines the security, privacy, and governance requirements that AI systems must meet. Second, security tools and workflows increasingly incorporate AI, and those uses must themselves comply with the policy.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- Security engineers should verify that AI systems implement the policy's requirements for data classification, access control, logging, and transparency as part of security reviews.
- The policy's requirements complement (and reference) the Secure AI Framework — the SAIF provides the technical security controls while the policy provides the governance framework.

**Common pitfalls:**
- Reviewing AI systems only against the Secure AI Framework without also verifying compliance with the AI Policy's broader governance requirements.
- Assuming that AI-powered security tools (SIEM analytics, threat detection) are exempt from the policy; any AI use must comply.
- Not including AI Policy compliance in the security review checklist for AI-powered applications.

---

## AI-Powered Development for Security Engineers

AI-assisted development tools are becoming relevant to security engineering workflows. These tools can help write detection rules, generate SIEM queries (KQL, SPL), draft incident response playbooks, explain complex log patterns, and assist with security documentation — tasks where AI can accelerate routine work while the security engineer provides the judgment and domain expertise.

AI assistants are most effective for security tasks when given precise context: the log format, the detection objective, the SIEM platform syntax, and the threat model being addressed. They can also help explain unfamiliar attack techniques, translate between query languages, and generate documentation for security controls.

**Why it matters:** Senior security engineers who use AI tools effectively can accelerate security operations — particularly for writing detection rules, analysing log patterns, and creating documentation. Understanding the limitations is critical: AI-generated detection rules may have gaps that miss real attacks, and AI-generated security assessments may overlook risks that require domain-specific knowledge.

**Key things to understand:**
- AI-generated detection rules and SIEM queries must be validated against real attack data before deployment. A rule that looks correct may miss edge cases or produce excessive false positives.
- AI tools are effective for: generating KQL/SPL queries, drafting detection rules from ATT&CK technique descriptions, explaining log entries, translating between security tool formats, and creating documentation.
- AI tools are poorly suited for: threat modelling (which requires understanding your specific environment and adversaries), evaluating the completeness of security controls, and making risk decisions that require business context.
- Data privacy and operational security apply to AI tool use: never paste sensitive log data, credentials, or internal network details into external AI tools. Follow the organisation's AI Policy for approved tools.

**Common pitfalls:**
- Trusting AI-generated detection rules without testing them against known attack samples and benign traffic.
- Using AI to generate security assessments without applying independent expert judgment — the AI may miss context-specific risks.
- Not establishing team conventions around what security data can and cannot be shared with AI tools.

---

## Language Deep Dives

- [Python Deep Dive](/language/python) — Security tooling, automation, and scripting
- [JavaScript Deep Dive](/language/javascript) — Understanding web vulnerabilities and XSS
- [SQL Deep Dive](/language/sql) — SQL injection testing and database security
`,
  },
  'Tech-Lead-Architect': {
    overview: `# Tech Lead / Architect – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Tech Leads and Architects guide technical direction, system design, and engineering quality across a team or programme. This path is intended for experienced developers — typically with three or more years of hands-on development experience — who are growing into a technical leadership or architecture role. Foundational programming knowledge is assumed.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| System Design Intro | [System Design for Beginners Course](https://www.youtube.com/watch?v=m8Icp_Cid5o) | Video |
| AI / ML Literacy | [AI, ML, Deep Learning and GenAI Explained](https://www.youtube.com/watch?v=qYNweeDHiyU) | Video |
| DevOps Literacy | [DevOps Literacy – Pluralsight](https://app.pluralsight.com/paths/skills/devops-literacy) | Course |
| APIs Overview | [Every Popular API Style Explained](https://www.youtube.com/watch?v=xJFzPSAw4Fo) | Video |
| Generative AI for IT | [Generative AI for IT Pros – Pluralsight](https://app.pluralsight.com/paths/skill/generative-ai-for-it-pros) | Course |
| Branching Strategy | [Branching Strategy](Prerequisites/Branching-Strategy.md) | Guide |
| Code Review | [Code Review](Prerequisites/Code-Review.md) | Guide |

### After completing Beginner you should be able to:

- Describe the main components of a distributed system and their responsibilities
- Explain what DevOps is and how CI/CD pipelines enable reliable delivery
- Compare REST, GraphQL and event-driven API styles
- Explain what large language models are and where they fit in a system architecture
- Apply the branching strategy and conduct a code review

For deep explanations of each concept, see the [Beginner Concept Reference](Tech-Lead-Architect/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| System Design – 30 Concepts | [System Design was HARD until I Learned these 30 Concepts](https://www.youtube.com/watch?v=s9Qh9fWeOAk) | Video |
| Domain-Driven Design | [DDD – Pluralsight Path](https://app.pluralsight.com/paths/skills/domain-driven-design) | Course |
| Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Prompt Engineering | [Prompt Engineering and GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/prompt-engineering-and-generative-ai) | Course |
| Leading Teams | [Leading Teams and Individuals – Pluralsight](https://app.pluralsight.com/paths/skills/leading-teams-and-individuals) | Course |
| System Design Case Study | [Uber – System Design Interview](https://www.youtube.com/watch?v=DGtalg5efCw) | Video |
| Security Architecture | [OWASP Top Ten](https://owasp.org/www-project-top-ten/) | Docs |
| Azure Well-Architected Framework | [Microsoft Learn – Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/) | Docs |
| Cloud Adoption Framework | [Microsoft Learn – Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/) | Docs |
| Observability | [OpenTelemetry – Getting Started](https://opentelemetry.io/docs/getting-started/) | Docs |

### After completing Mid you should be able to:

- Break down a complex system into bounded contexts using DDD
- Select appropriate architecture patterns for given requirements
- Facilitate a system design discussion with a team
- Lead a code review effectively
- Identify and articulate security risks in a system design
- Apply prompt engineering to improve AI integrations
- Apply the five pillars of the Azure Well-Architected Framework to evaluate a system design
- Write and maintain Architecture Decision Records (ADRs) to document significant technical choices

For deep explanations of each concept, see the [Mid Concept Reference](Tech-Lead-Architect/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| Enterprise GenAI Strategy | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| LLM Agent Architecture | [Architecting Resilient LLM Agents](https://arxiv.org/abs/2509.08646) | Paper |
| LLM Security Patterns | [Design Patterns for Securing LLM Agents](https://arxiv.org/abs/2506.08837) | Paper |
| LLM Security Reference | [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — Industry-standard security reference for LLM systems | Reference |
| Context Engineering | [Context Engineering – Pluralsight](https://app.pluralsight.com/paths/skills/context-engineering) | Course |
| Advanced AI-Assisted Dev | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |
| Incident Management | [PagerDuty Incident Response Documentation](https://response.pagerduty.com/) | Docs |

### After completing Senior you should be able to:

- Define and communicate a GenAI adoption strategy for an enterprise
- Evaluate the security posture of an LLM-powered system
- Design an LLM agent architecture with appropriate guardrails
- Apply context engineering to production AI systems
- Lead an incident response process and facilitate blameless post-mortems

For deep explanations of each concept, see the [Senior Concept Reference](Tech-Lead-Architect/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
    beginner: `# Tech Lead / Architect – Beginner Concept Reference


This document provides detailed explanations of the foundational concepts covered in the Beginner level of the Tech Lead / Architect learning path. Each section expands on the ideas behind the resources and gives you the vocabulary and mental models you need before moving to the Mid level.

---

## System Design Fundamentals – Components, Responsibilities and Trade-offs

System design is the process of defining the architecture, components, data flows and interactions of a system to satisfy a given set of requirements. For a tech lead or architect, understanding system design is not optional — it is the core skill that separates a senior individual contributor from someone who can guide an entire team or programme.

A distributed system is a collection of independent components that work together and appear to the user as a single coherent system. Common components include clients (browsers, mobile apps, CLI tools), load balancers (which distribute traffic across servers), application servers (which execute business logic), databases (which persist state), caches (which store frequently read data in fast memory), message queues (which decouple producers and consumers), and content delivery networks (which serve static assets close to users).

Each component has a clear responsibility, and part of an architect's job is to ensure that responsibilities are not mixed inappropriately — for example, having business logic leak into the database tier, or allowing the client to make decisions that belong on the server.

System design always involves trade-offs. There is no universally correct architecture. Choosing a relational database gives you strong consistency and mature tooling but may limit horizontal scalability. Choosing an eventually consistent NoSQL store gives you write throughput but complicates application logic. Understanding the CAP theorem — which states that a distributed system can guarantee at most two of consistency (all nodes see the same data at the same time), availability (every request receives a response) and partition tolerance (the system continues operating despite network partitions between nodes) — gives you a framework for reasoning about these trade-offs honestly. In practice, network partitions are an unavoidable reality in any distributed system, so partition tolerance is not negotiable. The genuine trade-off is between consistency and availability: during a partition, do you refuse requests to protect data integrity, or do you serve potentially stale data to remain available? Importantly, CAP is a per-partition-event trade-off, not a permanent architectural choice — a system can favour consistency for some operations and availability for others, and the trade-off only materialises when a partition actually occurs.

**Why it matters:** As a tech lead, every significant technical conversation eventually becomes a conversation about trade-offs. You need a shared vocabulary for these discussions — one that lets you articulate why a design choice has costs, not just benefits. The moment you can walk a team through a whiteboard diagram explaining what each component does and why it is there, you stop being a senior developer and start being an architect.

**Key things to understand:**
- The purpose of each major component type and when to use each
- How data flows through a system end-to-end for a typical request
- What trade-offs exist between consistency, availability, performance and cost
- Why requirements drive architecture, not the other way around
- The CAP theorem and why the real trade-off in practice is consistency versus availability

**Common pitfalls:**
- Over-engineering early: building for scale before you have evidence you need it
- Ignoring operational concerns: a system that cannot be monitored or deployed safely is not production-ready
- Treating architecture as a one-time decision rather than something that evolves with the product

---

## Scalability – Vertical vs Horizontal Scaling, Caching and Reliability

Scalability is the ability of a system to handle increased load without a proportional increase in cost or degradation in performance. Reliability is the ability of a system to perform its intended function correctly and consistently over time. Availability is the proportion of time a system is operational and accessible. These three properties are related but distinct, and a tech lead must be able to reason about all of them when evaluating a design.

Vertical scaling (scaling up) means giving an existing machine more resources: a faster CPU, more RAM, or faster storage. It is simple to implement because the application does not need to change. However, it has a hard ceiling — there is a maximum machine size — and it introduces a single point of failure if that one machine goes down.

Horizontal scaling (scaling out) means adding more machines and distributing load across them. A load balancer sits in front of the pool of servers and routes incoming requests, typically using strategies such as round-robin, least-connections, or consistent hashing. Horizontal scaling removes the ceiling and improves resilience because losing one node does not take the whole system down. The cost is complexity: the application must be stateless or externalise state so that any instance can serve any request.

Caching is one of the most effective scalability tools available. Storing the results of expensive computations or database reads in memory (for example with Redis) dramatically reduces the load on downstream systems. The main challenge is cache invalidation — knowing when a cached value is stale. Three common strategies are: time-to-live (the cached value expires after a fixed duration), write-through (the cache is updated whenever the source data is written) and cache-aside (the application checks the cache first and populates it on a miss).

Database scaling has its own vocabulary. Read replicas serve read traffic from copies of the primary database. Sharding splits data across multiple database instances by a key such as user ID. Both approaches add operational complexity and require careful design.

Reliability and availability are improved by eliminating single points of failure, adding redundancy, implementing health checks and graceful degradation, and designing for failure recovery rather than failure prevention. An architect distinguishes between mean time between failures (MTBF) and mean time to recovery (MTTR): a reliable system fails rarely; a resilient system recovers quickly when it does fail.

**Why it matters:** Your team will regularly ask "can this scale?" or "what happens when the database goes down?" You need concrete answers grounded in architecture choices, not reassurances. Understanding these concepts lets you design systems that are robust by construction rather than by accident.

**Key things to understand:**
- When vertical scaling is appropriate and where its limits lie
- What statelessness means and why it is a prerequisite for horizontal scaling
- How load balancers distribute traffic and why session affinity complicates horizontal scaling
- The role of caching and the challenges of cache invalidation
- The difference between reliability (correct behaviour) and availability (uptime)
- Basic database scaling strategies: read replicas and sharding

**Common pitfalls:**
- Scaling prematurely before profiling to find the actual bottleneck
- Ignoring the database when scaling the application tier — the database often becomes the constraint first
- Assuming horizontal scaling is always cheaper — coordination overhead grows with node count
- Designing only for the happy path and not for partial failures or degraded modes

---

## API Styles – REST, GraphQL, gRPC and Event-Driven

An API (application programming interface) defines how two software components communicate. Choosing the right API style for a given integration is an architectural decision with long-term consequences, and tech leads are routinely called on to make or ratify this choice.

REST (Representational State Transfer) is the most widely used style for public-facing web APIs. It uses standard HTTP methods (GET, POST, PUT, DELETE) and URLs that represent resources. REST is stateless, cacheable and well understood, making it a safe default for most web integrations. Its main limitation is over-fetching (the client receives more data than it needs) or under-fetching (the client must make multiple requests to assemble a complete view).

GraphQL is a query language that allows the client to specify exactly what data it needs in a single request. This solves the over- and under-fetching problems of REST and is particularly valuable for complex UIs that aggregate data from many resources. The trade-off is a more complex server implementation and less natural use of HTTP caching.

gRPC is a high-performance remote procedure call framework that uses Protocol Buffers for serialisation. It is strongly typed and generates client and server code from a schema. gRPC is well suited for internal service-to-service communication where performance and type safety matter more than human readability.

Event-driven APIs decouple producers and consumers through a message broker such as Kafka or Azure Service Bus. Instead of one service calling another synchronously, it emits an event and any interested consumer processes it asynchronously. This improves resilience and scalability but makes the system harder to trace and debug.

**Why it matters:** A tech lead who defaults to REST for every integration will create the wrong tool for the job repeatedly. The choice of API style shapes the coupling between services, the performance characteristics of the system and the experience of the teams that consume your APIs. Understanding when each style is appropriate — and being able to explain that reasoning to a team — is a core architectural responsibility.

**Key things to understand:**
- The fundamental model of each API style and the problem it solves
- When to choose each style based on consumer type, latency requirements and coupling tolerance
- The difference between synchronous and asynchronous communication and the implications for error handling
- Why event-driven communication introduces eventual consistency and what that means for the application

**Common pitfalls:**
- Choosing GraphQL for simple CRUD APIs where REST is sufficient
- Using REST for high-frequency internal service calls where gRPC would be more efficient
- Treating event-driven as inherently better — it introduces eventual consistency and operational complexity that must be justified

---

## DevOps and CI/CD – What It Means for a Technical Leader

DevOps is a culture and set of practices that brings development and operations together to shorten the delivery cycle and improve reliability. For a tech lead, DevOps literacy means understanding how the software you design actually gets built, tested and deployed — and taking responsibility for making that process as smooth and reliable as possible.

Continuous Integration (CI) is the practice of merging code changes into a shared branch frequently (at least daily) and validating each merge with an automated build and test run. The goal is to catch integration problems early, when they are cheap to fix. A CI pipeline typically checks out the code, compiles it, runs unit and integration tests, performs static analysis and produces a build artefact.

Continuous Delivery (CD) extends CI by automatically deploying the validated artefact to one or more environments. Continuous Deployment goes one step further by deploying to production automatically whenever all checks pass. The distinction matters: continuous delivery still requires a human approval gate before production; continuous deployment removes it.

As a tech lead, you influence the pipeline by setting quality gates: minimum test coverage thresholds, required security scans, mandatory code review approvals. You are also responsible for ensuring the team treats a broken pipeline as the highest priority — a red build that sits unresolved for hours is a sign of a team that has not yet internalised DevOps thinking.

Infrastructure as Code (IaC) — managing infrastructure through version-controlled configuration files rather than manual console clicks — is a key DevOps practice. It makes environments reproducible and reduces the gap between development and production.

**Why it matters:** A team that cannot deploy reliably cannot deliver value reliably. As a tech lead, the pipeline is part of the product. If deployments are manual, slow or error-prone, you will spend more time on incidents and less time on features. Understanding CI/CD at a leadership level means you can set standards, diagnose bottlenecks and hold the team accountable for delivery health — not just code quality.

**Key things to understand:**
- The difference between CI, continuous delivery and continuous deployment
- What a typical pipeline stage does and why each stage exists
- How quality gates work and why they matter for team discipline
- The relationship between IaC and environment consistency
- How deployment frequency, lead time and change failure rate signal the health of a delivery process

**Common pitfalls:**
- Treating the pipeline as someone else's responsibility — the tech lead owns delivery health
- Adding too many gates without fixing the underlying code quality issues, making pipelines slow and frustrating
- Not investing in test automation early, which makes CD impossible to achieve safely later

---

## AI and ML Literacy – What Every Tech Lead Should Understand

Artificial intelligence and machine learning are no longer specialist topics. Tech leads are increasingly asked to evaluate whether AI should be part of a system, which type of AI is appropriate and what the architectural implications are. You do not need to implement models, but you do need to understand the landscape well enough to make sound decisions.

Machine learning is the practice of training statistical models on data so that the model can make predictions or decisions on new, unseen data. Traditional ML models (regression, classification, clustering) are trained on structured tabular data and produce narrow predictions. They are interpretable, relatively lightweight and appropriate for many business problems.

Deep learning uses neural networks with many layers to learn representations from unstructured data such as images, audio and text. Large language models (LLMs) are a class of deep learning model trained on vast amounts of text. They generate coherent text and can follow natural language instructions, which makes them useful for tasks like summarisation, question answering, code generation and conversation.

Generative AI refers to models that produce new content — text, images, code, audio — rather than simply classifying or predicting. LLMs such as frontier models from OpenAI and Anthropic are generative AI models. They are stateless by default (they have no persistent memory across conversations) and produce probabilistic outputs, meaning the same input can produce different outputs.

For a tech lead, the key architectural consideration is where an LLM sits in the system: is it a standalone feature, a component in a larger pipeline, or a decision-making agent? Each placement has different implications for latency, cost, reliability and data governance.

**Why it matters:** Engineers on your team will propose using AI for increasingly more tasks. Business stakeholders will ask whether a feature "can use AI." Without a clear mental model of how these systems work, you cannot evaluate those proposals, identify risks or make architecture decisions about where AI fits. Literacy here is not about being able to train models — it is about being able to ask the right questions.

**Key things to understand:**
- The difference between traditional ML, deep learning and generative AI
- What an LLM is and how it generates output (token prediction, not reasoning from first principles)
- The concepts of temperature, context window and prompt as they apply to LLM behaviour
- Why LLM outputs are non-deterministic and what that means for testing and reliability
- The difference between using a hosted model API (OpenAI, Azure OpenAI) and deploying a model yourself

**Common pitfalls:**
- Treating LLM outputs as deterministic facts — they hallucinate and must be validated
- Choosing an LLM for a problem that a simpler, cheaper model would solve reliably
- Ignoring data privacy implications when sending sensitive data to a hosted model API

---

## Branching Strategy and Code Review – Leadership Responsibilities

A branching strategy defines how a team uses version control branches to manage parallel development, integrate changes and release software. Code review is the practice of having peers examine code changes before they are merged. Together, these two practices form the backbone of engineering quality at the team level, and the tech lead is responsible for establishing and upholding both.

A common branching strategy is trunk-based development, in which all developers integrate into a single main branch (trunk) frequently — ideally at least once per day. Short-lived feature branches are created, worked on briefly and merged back quickly. This keeps integration costs low and prevents long-lived divergence. An alternative is the Gitflow model, which uses separate branches for features, releases and hotfixes. Gitflow gives more structure for teams with infrequent releases but can create integration complexity in teams that deploy continuously.

The tech lead's role in branching strategy is to define the team convention, ensure it is documented and hold the team to it. When a developer opens a pull request that has been open for a week against a branch that is months behind main, that is a failure of process that the tech lead should address.

Code review is not primarily about finding bugs — automated tests do that better. It is about knowledge sharing, maintaining consistency with team standards and catching design problems before they are embedded in the codebase. As a tech lead, you set the tone: if your reviews are nitpicky and discouraging, the team will follow. If they are constructive, curious and focused on understanding intent, the team will adopt that culture.

**Why it matters:** The branching strategy and code review process are the most visible expressions of how a team works together. A tech lead who neglects these areas will see integration pain, knowledge silos, inconsistent quality and a codebase that gradually drifts from its intended design. Establishing good habits here early pays compounding returns over the life of the project.

**Key things to understand:**
- The trade-offs between trunk-based development and Gitflow
- What a good pull request description contains and why it matters
- How to give feedback that is specific, actionable and kind
- The tech lead's role in unblocking stale pull requests promptly
- How to set and communicate code review norms so the whole team aligns

**Common pitfalls:**
- Using code review as a gatekeeping ritual rather than a learning opportunity
- Allowing large pull requests that are impossible to review meaningfully — set a norm for small, focused changes
- Letting the branching strategy drift — inconsistency creates confusion and integration pain
`,
    mid: `# Tech Lead / Architect – Mid Concept Reference


This document provides detailed explanations of the concepts covered in the Mid level of the Tech Lead / Architect learning path. At this level the focus shifts from understanding individual technologies to designing systems deliberately and leading the people who build them.

---

## Domain-Driven Design – Strategic Patterns (Bounded Contexts, Ubiquitous Language, Context Maps)

Domain-Driven Design (DDD) is an approach to software development that centres the design process on the business domain — the real-world subject area the software supports. Eric Evans introduced DDD in 2003, and it remains the most influential body of thinking for architects working on complex business systems. Strategic DDD deals with how to divide a large domain into manageable pieces and how those pieces relate to each other.

A bounded context is an explicit boundary within which a particular domain model is defined and applicable. Inside the boundary, terms have precise meanings and the model is internally consistent. Outside it, the same word may mean something different. For example, "account" in a banking system means something different in the lending context than in the payments context. Defining bounded contexts forces the team to make these distinctions explicit rather than allowing a single tangled model to grow without limit.

Ubiquitous language is the shared vocabulary that domain experts and developers use within a bounded context. It should appear in code: class names, method names, variable names and database column names should reflect the language the business uses. When ubiquitous language is maintained rigorously, business stakeholders can read the code at a high level and the distance between business intent and implementation narrows.

A context map is a diagram showing the relationships between bounded contexts and how they integrate. Integration patterns include shared kernel (two contexts share a subset of the model), customer-supplier (one context serves another), conformist (the downstream context accepts the upstream model without translation) and anti-corruption layer (the downstream context translates the upstream model into its own terms). The context map is not a one-time diagram — it is a living record of the relationships and dependencies between the teams and systems that make up the organisation.

**Why it matters:** Most large system failures are not caused by bad code — they are caused by a bad model. When two teams use the same word to mean different things, or when a single model tries to serve every part of the business, complexity compounds rapidly. Strategic DDD gives a tech lead the vocabulary and tools to draw explicit boundaries, reduce the cost of change and align technical structure with organisational structure.

**Key things to understand:**
- How to identify bounded context boundaries by looking for where vocabulary changes or teams differ
- Why ubiquitous language reduces translation costs between business and engineering
- Which context map integration patterns protect autonomy and which introduce coupling
- How bounded contexts map to team and service boundaries

**Common pitfalls:**
- Drawing bounded context boundaries along technical layers (frontend, backend, database) rather than domain lines
- Allowing ubiquitous language to degrade over time as terminology drifts between business and code
- Treating the context map as a one-time exercise rather than a living document

---

## Domain-Driven Design – Tactical Patterns (Aggregates, Entities, Value Objects, Repositories, Domain Events)

Tactical DDD provides a set of building blocks for implementing the domain model inside a bounded context. These patterns give the development team a shared vocabulary for discussing design decisions and a set of rules that protect the integrity of domain state.

An entity is an object that has a unique identity that persists over time. A customer is an entity: even if the customer's name and address change, the customer record remains the same object because it has a stable identifier. The identity is what matters, not the current attribute values.

A value object has no identity — it is defined entirely by its attributes. A monetary amount of 100 SEK is a value object. Two amounts of 100 SEK are interchangeable. Value objects should be immutable: rather than changing a value object, you replace it with a new one. This immutability makes them safe to share and easy to reason about.

An aggregate is a cluster of entities and value objects treated as a single unit for data changes. The aggregate root is the only entry point to the cluster; nothing outside the aggregate may hold a direct reference to an internal entity. All state changes go through the root, which enforces invariants — the business rules that must always be true. Aggregates define the consistency boundary: everything inside one aggregate is always consistent; between aggregates, eventual consistency is acceptable.

A repository is an abstraction over the persistence mechanism for a given aggregate. Application code retrieves and stores aggregates through the repository interface, which hides the details of the underlying database. This keeps the domain model independent of infrastructure choices and makes the domain testable in isolation. A repository typically offers operations like \`findById\`, \`save\` and \`findBySpecification\`, but does not expose SQL or ORM internals.

Domain events represent something that happened in the domain that other parts of the system may need to react to. They are named in the past tense (OrderPlaced, PaymentReceived) and are immutable records of fact. Publishing domain events allows bounded contexts to react to each other without direct coupling.

**Why it matters:** Without these building blocks, domain logic tends to scatter across services, controllers and database procedures, making it impossible to reason about business rules in one place. Tactical patterns give a team a shared language for design conversations — you can discuss whether something is an entity or a value object, whether an aggregate boundary is too wide, or whether a behaviour belongs to the domain or the application layer, and everyone understands what the question means.

**Key things to understand:**
- The difference between entity identity and value object equality
- How aggregate boundaries enforce invariants and why they should be kept small
- Why the aggregate root is the only public interface to an aggregate
- The role of the repository in separating domain logic from infrastructure concerns
- How domain events enable loose coupling between bounded contexts

**Common pitfalls:**
- Creating God aggregates that own too much state — large aggregates cause contention and slow writes
- Using database IDs as aggregate roots without thinking about domain identity
- Confusing value objects with entities because both happen to be stored in the database
- Leaking persistence details (ORM annotations, SQL queries) into the domain model itself

---

## Architecture Patterns – Monolith, Microservices, Hexagonal, Event-Driven and CQRS

Architecture patterns are proven solutions to recurring structural problems in software systems. A tech lead needs to understand at least a handful of these patterns deeply enough to recommend them, explain their trade-offs and — critically — know when each one is and is not appropriate.

A monolith is a single deployable unit containing all of the application's functionality. It is the correct starting point for most new systems. A well-structured monolith — sometimes called a modular monolith — organises code into clear modules with explicit boundaries, uses dependency inversion between modules and avoids circular dependencies. This structure preserves the option to extract services later, once you understand the domain well enough to draw the right boundaries. The mistake is not starting with a monolith; the mistake is letting it become an unstructured big ball of mud.

Microservices architecture decomposes a system into independently deployable services, each owning its own data and exposing a well-defined interface. This enables independent scaling, independent deployment and technology diversity across services. The trade-offs are significant: network latency replaces in-process calls, distributed transactions are hard to reason about, operational complexity increases substantially (service discovery, health checks, distributed tracing, multiple deployment pipelines) and a team must be mature enough to manage that complexity before the benefits outweigh the costs. A good heuristic: extract a service when you have a clear, stable domain boundary, an independent scaling requirement, or a team that needs to deploy independently. Do not extract services prematurely.

Layered (or N-tier) architecture organises code into horizontal layers — typically presentation, application, domain and infrastructure — where each layer may only depend on the layer beneath it. It is the most familiar pattern and a reasonable default for simple applications. The risk is that over time layers leak into each other, leading to the "big ball of mud" anti-pattern.

Hexagonal architecture (also called ports and adapters) inverts the dependency rule: the domain sits at the centre and all external concerns (databases, HTTP, message queues, UI) connect to it through defined ports (interfaces) with adapters (implementations). This makes the domain independently testable and allows infrastructure to be swapped without touching business logic. Use it when the domain is complex enough to justify the abstraction overhead — it is the natural complement to DDD bounded contexts.

Event-driven architecture builds systems around the production and consumption of events rather than synchronous request-response calls. Services are decoupled — a producer does not know which consumers exist. This improves scalability and resilience but introduces eventual consistency and makes tracing a complete business transaction more complex. Use it when services need to react to things that happen in other services without tight coupling, when you need to fan out to multiple consumers, or when you need an audit trail of domain state changes.

CQRS (Command Query Responsibility Segregation) separates the write model (commands that change state) from the read model (queries that return data). This allows each model to be optimised independently — for example, the write model enforces strict invariants while the read model uses denormalised projections optimised for UI needs. CQRS is often combined with event sourcing, where state is stored as a sequence of immutable events rather than a current snapshot, giving a full audit trail and the ability to replay history. Use CQRS when the read and write workloads have significantly different shapes or scale requirements; it is overkill for simple CRUD applications.

**Why it matters:** Choosing the wrong architecture pattern for a system's maturity, team size or domain complexity is one of the most expensive mistakes a tech lead can make. An architecture that is too sophisticated creates unnecessary complexity; one that is too simple becomes a bottleneck as the system grows. The value of knowing these patterns is not in picking the most impressive one — it is in being able to justify a choice with concrete reasoning about the team's current situation.

**Key things to understand:**
- When a modular monolith is the right choice and when to extract services
- The operational prerequisites for microservices (CI/CD per service, distributed tracing, service discovery)
- Which pattern suits which category of problem: layered for simple CRUD, hexagonal for complex domains, event-driven for decoupled reactions, CQRS for differentiated read/write workloads
- How hexagonal architecture protects the domain from infrastructure concerns
- Why CQRS is not appropriate for every system and what complexity it introduces

**Common pitfalls:**
- Jumping to microservices before the domain boundaries are well understood — premature extraction creates distributed monoliths
- Applying CQRS to simple systems where a single model would suffice — the overhead is not justified
- Implementing hexagonal architecture by name but still allowing infrastructure imports inside the domain
- Designing event-driven systems without addressing event ordering, idempotency and dead-letter handling

---

## Security Architecture – Threat Modelling and OWASP for Architects

Security architecture is not a separate track layered on top of a design — it is embedded in the design from the start. A tech lead who treats security as an afterthought will repeatedly find that critical issues surface late, when they are expensive to fix.

Threat modelling is the practice of systematically identifying potential threats to a system before building it. The most widely used framework is STRIDE, which categorises threats as Spoofing (claiming a false identity), Tampering (modifying data or code), Repudiation (denying an action occurred), Information Disclosure (exposing data to unauthorised parties), Denial of Service (making the system unavailable) and Elevation of Privilege (gaining access beyond what is permitted). Walking through STRIDE for each component and data flow produces a prioritised list of risks that can be addressed in the design.

OWASP (Open Web Application Security Project) publishes the Top Ten list — a consensus ranking of the most critical web application security risks. As an architect, you need to understand not just the names but the mechanisms: why SQL injection works, how broken access control manifests, what insecure design means at the architecture level. The OWASP Top Ten shapes your design decisions: do you enforce authentication at the gateway or at each service? Do you use parameterised queries everywhere? Are secrets managed through a vault rather than environment variables?

Authentication and authorisation are two distinct concerns that are frequently confused. Authentication answers "who are you?" Authorisation answers "what are you allowed to do?" An architect defines the authentication mechanism (OAuth 2.0 / OIDC with an identity provider, for example) and the authorisation model (role-based, attribute-based or policy-based access control).

A tech lead's role in security is not to be the team's only security expert but to ensure security thinking is embedded in every design conversation. Running a lightweight STRIDE exercise as part of a design review, asking "what can go wrong if this endpoint is misconfigured?" during a code review, and referencing the OWASP Top Ten when evaluating a proposed data flow are practical habits that prevent expensive late-stage fixes.

**Why it matters:** Security vulnerabilities discovered after deployment can destroy user trust, trigger regulatory penalties and require emergency remediation work that derails the team's roadmap. A tech lead who normalises security thinking as part of design — rather than treating it as a pre-launch checklist — dramatically reduces the probability of these outcomes and builds a team that thinks about attack surfaces as naturally as it thinks about performance.

**Key things to understand:**
- How to run a STRIDE threat model for a system design diagram
- The mechanisms behind the most common OWASP Top Ten vulnerabilities
- The difference between authentication and authorisation and how to design for both
- The principle of least privilege and how to apply it to service identities and data access
- How to facilitate a security review as a team activity rather than a solo expert audit

**Common pitfalls:**
- Leaving security to a penetration test at the end of the project — by then, fixes are expensive
- Designing a single authentication perimeter and assuming everything inside is trusted
- Conflating encryption at rest with encryption in transit — both are necessary and independent

---

## Observability for Architects – Logs, Metrics, Traces and Service Level Objectives

Observability is the ability to understand what a system is doing and why, based on the data it emits. For a tech lead, observability is not an operational add-on — it is a design concern that must be built in from the start.

The three pillars of observability are logs, metrics and traces. Logs are timestamped records of discrete events — errors, state changes, user actions. Metrics are numeric measurements aggregated over time — request rate, error rate, latency percentiles, CPU utilisation. Traces follow a single request as it traverses multiple services, showing where time is spent and where failures occur. Each pillar answers different questions, and a well-observed system uses all three.

Service Level Indicators (SLIs) are the specific measurements you use to quantify system health — for example, the proportion of requests that complete in under 300 milliseconds, or the percentage of requests that return a non-error response. SLIs answer the question "what do we measure?"

Service Level Objectives (SLOs) define what acceptable looks like by setting a target for an SLI — for example, "99.5% of requests complete in under 300 milliseconds over a rolling 30-day window." SLOs answer the question "what is good enough?" and give the team an objective basis for deciding when to invest in reliability versus features.

Service Level Agreements (SLAs) are formal commitments made to external customers, typically with contractual consequences if they are breached. SLAs are derived from SLOs but are intentionally set with more headroom — an SLO of 99.9% might back an SLA of 99.5%. The architect's role is to ensure the internal SLO is ambitious enough that breaching the external SLA is unlikely.

An architect's responsibility is to define what "healthy" means for a system and ensure the observability infrastructure exists to detect when it is not. This means deciding which SLIs matter for each service, setting SLOs before launch, instrumenting code to emit the right logs, metrics and traces, and ensuring dashboards and alerts are in place from day one — not added after the first incident.

**Why it matters:** Systems without observability are systems you cannot reason about under pressure. When an incident occurs, you need to know what changed, where the failure is and how users are affected — in minutes, not hours. A tech lead who designs observability into the architecture from the start turns incidents from chaotic firefights into structured investigations with clear data.

**Key things to understand:**
- The three pillars of observability and the distinct questions each answers
- The relationship between SLIs, SLOs and SLAs and who owns each
- How distributed tracing connects logs and metrics across service boundaries
- Why observability must be a design-time concern, not an afterthought

**Common pitfalls:**
- Logging everything without structure — high-volume unstructured logs are expensive and difficult to query
- Setting SLOs without historical data or user expectations, making them arbitrary rather than meaningful
- Confusing monitoring (alerting when a threshold is breached) with observability (the ability to ask arbitrary questions about system behaviour)
- Treating observability as the platform team's responsibility — the team that builds the service must instrument the service

---

## Technical Leadership – Running Design Reviews and Decision Records

A tech lead's value is not just technical knowledge — it is the ability to channel that knowledge into good decisions made by the team, not just by the tech lead alone. Two tools that make this concrete are design reviews and architecture decision records.

A design review is a structured conversation in which the team examines a proposed solution before committing to it. The goal is not to find fault with the author but to surface assumptions, identify risks and share knowledge. A well-run design review begins with the author presenting the problem and constraints before the solution, so reviewers can evaluate whether the proposed approach actually fits. The tech lead facilitates, ensures that dissenting voices are heard and steers the conversation toward a decision rather than an open-ended discussion. After the review, someone records the outcome — the decision, the key objections raised and the conditions under which the decision should be revisited.

An Architecture Decision Record (ADR) is a short document that captures an architectural decision, the context in which it was made, the options that were considered and the rationale for the choice. ADRs are stored in version control alongside the code (typically in a \`docs/adr/\` directory), so future developers can understand why the system is the way it is without having to reconstruct the reasoning from memory or tribal knowledge. The format is deliberately lightweight: a title, status (proposed, accepted, deprecated, superseded), context, decision and consequences.

The act of writing an ADR often improves the decision itself. Forcing the author to articulate the trade-offs in writing frequently reveals assumptions that had not been examined. The record also makes it easier to revisit a decision when circumstances change — you can see what the original constraints were and whether they still apply.

When proposing a significant architectural change, a tech lead will often write a draft ADR first, share it for asynchronous review and then use the design review session to resolve outstanding objections. This sequence — written proposal, async comments, synchronous discussion — is more efficient than arriving at a meeting with only a verbal proposal and expecting the team to make a good decision in real time.

**Why it matters:** Teams that skip design reviews and never write down their decisions accumulate invisible technical debt — not in the code, but in their heads. When the engineer who made a key decision leaves the team, the reasoning leaves with them. The next team member who touches the same component has no way to know whether the design was intentional, accidental or a known compromise. ADRs are cheap insurance against this kind of institutional memory loss.

**Key things to understand:**
- How to structure a design review so it produces a decision rather than a debate
- The core fields of an ADR and why each one matters
- How to propose an ADR via a pull request and manage the review process
- How to create a team habit of writing ADRs without making it feel bureaucratic
- The difference between a design review and a code review

**Common pitfalls:**
- Running design reviews as approval ceremonies rather than genuine collaborative explorations
- Writing ADRs only for major decisions — small decisions accumulate into large constraints
- Storing ADRs in a wiki that drifts from the codebase rather than in the repository itself

---

## Leading Teams – Giving Feedback, Delegation and Growing Engineers

Technical leadership is inseparable from people leadership. A tech lead who is technically excellent but who hoards decisions, gives crushing feedback or fails to develop the engineers around them will limit the team's ability to grow and deliver. The skills in this section are as important as any architecture pattern.

Feedback is the mechanism by which engineers improve. Effective feedback is specific (tied to an observable behaviour or artifact, not a character judgement), timely (given close to the event rather than saved for a quarterly review), actionable (it suggests what to do differently) and kind (it assumes positive intent and treats the recipient as capable of improvement). The SBI model (Situation, Behaviour, Impact) is a useful framework: describe the situation, the specific behaviour you observed and the impact it had, then invite the recipient to respond.

Delegation is not the same as task assignment. When you delegate, you transfer ownership of an outcome to another person and give them the authority and support they need to achieve it. Effective delegation requires matching the level of autonomy to the engineer's readiness: a junior engineer needs clear instructions and frequent check-ins; a senior engineer needs context and a goal, then space to work. The Situational Leadership model describes four leadership styles (directing, coaching, supporting, delegating) and maps them to the follower's development level.

Growing engineers means creating the conditions in which people can stretch beyond their current capability. This includes giving stretch assignments that are challenging but achievable, pairing junior engineers with seniors on meaningful work, sponsoring engineers for opportunities that raise their visibility and giving timely, specific developmental feedback.

Hiring is also a tech lead responsibility. Writing good job descriptions, designing technical interviews that assess the skills actually needed on the team, providing structured and consistent feedback after interviews and making hiring decisions based on evidence rather than instinct are all part of the role. A single poor hire affects the whole team; a single great hire can raise the bar for everyone.

**Why it matters:** A tech lead who is also a great individual contributor but a poor people leader creates a ceiling. The team's output is bounded by what the tech lead can personally review, decide and unblock. The only way to scale impact beyond what one person can do is to develop the team around you — which requires investing in feedback, delegation, growth and hiring as deliberately as you invest in technical design.

**Key things to understand:**
- The SBI model for giving feedback and how to apply it in practice
- The difference between delegation and task assignment
- How to calibrate autonomy to an engineer's readiness level
- What it means to be a sponsor (not just a mentor) for engineers on your team
- How to structure a fair and effective technical hiring process

**Common pitfalls:**
- Delegating outcomes without authority — engineers cannot succeed if they cannot make decisions
- Giving only positive feedback to avoid conflict — this deprives engineers of information they need to grow
- Holding onto complex work because it is easier to do it yourself than to coach someone through it

---

## Prompt Engineering – Architectural Perspective on AI Integration

Prompt engineering is the practice of designing inputs to language models to produce useful, reliable outputs. For a tech lead, the interest is not in prompting as a creative skill but in understanding how prompt design affects system behaviour and what architectural choices enable or constrain it.

A prompt is the text (or combination of text, data and instructions) that is sent to an LLM to elicit a response. The system prompt sets the model's role and constraints; the user prompt is the specific request. In a production system, the prompt is constructed programmatically — it combines static instructions with dynamic content from databases, user input and tool outputs. This construction logic is part of the system architecture and needs to be treated as such: versioned, tested and observable.

Prompt patterns are reusable structures that solve common problems. A few that matter architecturally: chain-of-thought prompting asks the model to reason step by step before giving an answer, which improves accuracy on complex tasks; few-shot prompting provides examples of the desired input-output format, which improves consistency; output format instructions (asking for JSON, for example) make downstream parsing reliable and reduce error handling complexity.

Retrieval-Augmented Generation (RAG) is an architectural pattern in which relevant context is retrieved from a knowledge base and injected into the prompt at inference time. This allows an LLM to answer questions about private or recent data without retraining. The retrieval mechanism (typically vector search) and the quality of the injected context are as important as the prompt itself.

**Why it matters:** As AI components become part of more systems, prompt construction logic will increasingly sit in codebases your team owns. Without treating it as engineering artefact — with tests, version history and observability — changes to prompts will silently break behaviour and be impossible to diagnose. A tech lead who understands prompt engineering can set standards for how AI components are built, reviewed and operated, rather than treating them as a black box that someone else manages.

**Key things to understand:**
- How the system prompt and user prompt interact and why their separation matters
- Why prompt construction logic belongs in version control and must be tested
- The RAG pattern and when to use it instead of fine-tuning
- How to measure prompt reliability (consistency, correctness, format adherence) in a production context

**Common pitfalls:**
- Hardcoding prompts in application code with no versioning or testing strategy
- Assuming longer, more detailed prompts always produce better results — brevity and clarity often outperform length
- Ignoring token costs when designing prompts for high-traffic systems — verbose prompts become expensive at scale

---

## Azure Well-Architected Framework

The Azure Well-Architected Framework (WAF) is Microsoft's set of guiding principles for designing and operating cloud workloads. It defines five pillars — Reliability, Security, Cost Optimisation, Operational Excellence, and Performance Efficiency — that provide a structured approach to evaluating architectural decisions. For LF, where Azure is the primary cloud platform and a defined set of approved services exists, WAF provides the framework for making consistent, defensible architectural choices.

WAF is not just a Microsoft checklist — it codifies principles that apply to any cloud architecture. The framework includes design principles, design review checklists, Azure Advisor recommendations, and reference architectures. The Well-Architected Review is a structured assessment that evaluates a workload against all five pillars and produces prioritised recommendations.

The Cloud Adoption Framework (CAF) complements WAF by providing guidance for the organisational and strategic aspects of cloud adoption: strategy, planning, readiness, migration, governance, and management. While WAF focuses on individual workload quality, CAF addresses the broader enterprise cloud journey.

**Why it matters:** As a Tech Lead or Architect, every system design decision involves trade-offs across the five pillars. Understanding WAF gives you a shared vocabulary for discussing these trade-offs with stakeholders, a structured approach for design reviews, and alignment with the cloud platform your organisation has chosen. It also ensures you consider dimensions (cost, operational excellence) that are easy to overlook when focused on features.

**Key things to understand:**
- Reliability: the ability of a system to recover from failures and continue to function. Design for failure: use availability zones, implement health probes, design retry policies, plan for disaster recovery. Key question: what happens when this component fails?
- Security: protect the workload from threats through defence in depth. Identity-based access control (Azure Entra ID), network segmentation, encryption at rest and in transit, security monitoring. At LF, this aligns with the approved security services (Key Vault for secrets, PIM for privileged access, LF Root CA for certificates)
- Cost Optimisation: deliver business value while minimising unnecessary spending. Right-size resources, use auto-scaling, choose appropriate pricing tiers, implement cost alerts. For LF, this means using approved services (Container Apps instead of full AKS where appropriate, Functions for event-driven workloads) which are pre-negotiated and well-understood
- Operational Excellence: the processes and practices that keep a workload running in production. Infrastructure as code, CI/CD, monitoring and alerting, incident management, documentation. Key question: can the team that inherits this system operate it successfully?
- Performance Efficiency: the ability of a workload to scale and meet demand. Identify bottlenecks, implement caching, choose appropriate compute (Container Apps for HTTP workloads, Functions for event-driven), use CDN for static content, design for horizontal scaling
- LF approved services alignment: architectural decisions should prioritise approved Azure services. Container Apps for containerised workloads, Azure Functions for event-driven compute, Azure SQL Database and CosmosDB for data, Key Vault for secrets and certificates, Azure Monitor for observability. Using approved services reduces operational burden and security risk
- Design reviews: use the WAF design review checklists as a structured approach for evaluating system designs in architecture reviews. Walk through each pillar and assess how the design addresses reliability, security, cost, operations, and performance

**Common pitfalls:**
- Optimising for one pillar at the expense of others — a maximally reliable system may be prohibitively expensive. WAF is about finding the right balance for your specific workload and business requirements
- Treating WAF as a one-time assessment rather than a continuous practice. Workloads evolve, and the architectural trade-offs should be reassessed as requirements and usage patterns change
- Ignoring Cost Optimisation during initial design ("we will optimise costs later") — cost-efficient architecture is much easier to achieve from the start than to retrofit
- Not involving the operations team in architectural decisions — Operational Excellence requires that the people who will run the system can actually operate it effectively
`,
    senior: `# Tech Lead / Architect – Senior Concept Reference


This document provides detailed explanations of the concepts covered in the Senior level of the Tech Lead / Architect learning path. At this level the focus is on enterprise-scale decision-making, the architecture of AI-powered systems and the organisational practices that let those systems be built and governed responsibly.

---

## Enterprise GenAI Strategy – Build vs Buy, ROI and Governance

Deploying generative AI at enterprise scale is not primarily a technology problem — it is a governance, organisational and change management challenge. A senior architect or tech lead is expected to contribute to (and often to drive) the definition of how their organisation adopts AI responsibly, consistently and in a way that creates durable value rather than isolated experiments.

The first strategic question is build vs buy. Buying a hosted capability (calling an API provided by OpenAI, Azure OpenAI, Anthropic or a similar vendor) reduces time to market and offloads model maintenance but raises questions about data privacy, vendor lock-in, cost at scale and the ability to customise model behaviour. Building or fine-tuning your own model gives greater control but requires significant data, compute and ML expertise. For most enterprise use cases, the right answer is to buy the foundation model and build the integration layer — owning the prompt design, the retrieval pipeline, the evaluation harness and the guardrails, while treating the model itself as a commodity. The build vs buy decision should be revisited as the technology landscape evolves.

Return on investment for AI initiatives is harder to measure than for traditional software because the value is often diffuse (developer productivity, reduced handling time, improved search quality) and the costs include not just compute but data preparation, evaluation, governance overhead and change management. A senior architect contributes to the ROI framework by defining what success looks like before deployment: which metrics will be measured, what the baseline is, what improvement constitutes success and over what time horizon. AI initiatives that lack this upfront definition tend to be evaluated on whether they shipped, rather than whether they delivered value.

An adoption framework gives the organisation a structured way to evaluate, pilot, scale and govern AI use cases. A common structure moves through four stages: explore (identify candidate use cases and assess feasibility), experiment (run time-boxed pilots with clear success criteria), scale (productionise validated use cases with proper engineering rigour) and govern (apply controls, monitor and continuously evaluate). Without a framework, organisations tend to accumulate disconnected pilots that never reach production, creating technical debt and eroding confidence.

Governance of AI systems involves several distinct concerns. Model governance asks which models are approved for use, under what conditions and who owns the decision to adopt a new model. Data governance asks what data can be sent to which models, how consent and privacy are maintained and what logging is required. Output governance asks how model outputs are reviewed, who is accountable for decisions made with AI assistance and how errors are reported and remediated.

**Why it matters:** An organisation without a coherent AI strategy will either move too slowly — paralysed by governance debates while competitors ship — or too fast, accumulating unmanaged risk that eventually forces a costly halt. A senior architect shapes the strategy rather than waiting for it to be handed down. That means being able to articulate the build vs buy trade-offs in a steering committee, propose a governance structure to a CISO, and define an ROI framework for a product owner — not just design the technical architecture.

**Key things to understand:**
- The build vs buy decision framework and the factors that shift it in each direction
- How to define an ROI framework for an AI initiative before deployment, not after
- The stages of an AI adoption lifecycle and what governance gates belong at each stage
- The distinction between model governance, data governance and output governance
- How to evaluate AI use cases against a consistent value and risk framework
- The role of a centre of excellence or AI guild in maintaining consistency across teams

**Common pitfalls:**
- Treating each AI initiative as independent rather than establishing shared infrastructure, standards and learnings
- Allowing business enthusiasm to bypass governance — speed of adoption without controls creates liability
- Measuring success only by deployment (did we ship it?) rather than by outcome (did it deliver the expected value?)
- Defaulting to build when buy would be faster and cheaper, or defaulting to buy without considering data privacy and lock-in

---

## LLM Agent Architecture – Orchestration, Memory, Tools and Guardrails

An LLM agent is a system in which a language model acts as a reasoning engine that can plan, use tools, observe the results of tool use and iterate until a goal is achieved. This is a significant architectural step beyond a simple question-and-answer interface, and it introduces complexity that must be managed deliberately.

The orchestrator is the component that coordinates the agent loop. It receives the goal, maintains the current state of the task, selects which tool to invoke next based on the model's output and feeds the tool result back to the model for the next reasoning step. The orchestrator may be implemented as a framework (LangGraph, AutoGen, Semantic Kernel) or as custom code. The choice affects how much control you have over the loop, how observable the system is and how easy it is to debug.

Memory in an agent system takes several forms. In-context memory is the content currently in the model's context window — it is fast to access but limited in size and lost when the session ends. External memory stores information in a retrievable form outside the context window. Common external memory stores include a vector database for semantic retrieval of unstructured content, a key-value store for structured ephemeral state such as the current step in a multi-step workflow, and a relational or document database for long-term structured history such as past conversations or user preferences. The architecture must decide what is stored, when and how it is retrieved and what happens when retrieved context conflicts with the model's parametric knowledge.

Tools (also called function calls or actions) give the agent the ability to interact with the world: querying databases, calling APIs, reading files, executing code. Each tool is a potential source of side effects. An architect must define which tools are available to which agents, what permissions those tools require and how tool failures are handled without causing the agent to loop or hallucinate a successful outcome.

Guardrails are constraints that prevent the agent from producing harmful, incorrect or out-of-scope outputs. They operate at multiple layers: input filtering (blocking prohibited queries before they reach the model), output filtering (reviewing model outputs before they are acted upon or shown to the user), tool permission boundaries (preventing the agent from invoking tools it should not have access to) and human-in-the-loop gates (requiring human approval before the agent takes high-stakes actions).

**Why it matters:** Agent architectures are becoming the dominant pattern for complex AI-powered features — everything from automated research assistants to code review agents to process automation. The failure modes are severe: an agent with over-broad tool access and no guardrails can take destructive actions at machine speed. A senior architect who understands the agent loop, memory trade-offs and guardrail layers can design these systems to be capable without being dangerous.

**Key things to understand:**
- The agent loop: observe, plan, act, observe — and how the orchestrator manages it
- The difference between in-context memory and external memory, and the trade-offs between them
- The three common external memory store types (vector, key-value, relational) and when each is appropriate
- How tool definitions affect model behaviour and what a well-designed tool interface looks like
- The layers at which guardrails can be applied and why multiple layers are necessary

**Common pitfalls:**
- Building agents without visibility into the reasoning trace — observability is essential for debugging and auditing
- Giving agents broad tool access because it is convenient — least-privilege applies to agents as much as to human users
- Assuming guardrails at one layer are sufficient — a single layer can be circumvented; defence in depth is required

---

## LLM Security – Prompt Injection, Data Exfiltration and Mitigation

LLM-powered systems introduce a class of security vulnerabilities that do not exist in traditional software. A senior architect must understand these threats at a mechanistic level, not just by name, in order to design systems that are resilient to them.

Prompt injection is the most significant LLM-specific attack. It occurs when an attacker embeds instructions in content that the model processes — such as a document being summarised, a web page being retrieved or a user message in a multi-turn conversation — and those instructions cause the model to behave in ways that override the system prompt or the developer's intent. Direct prompt injection comes directly from the user, who crafts their input to manipulate the model's behaviour. Indirect prompt injection comes from external content the model processes on the user's behalf — for example, a malicious instruction embedded in a document that an agent retrieves from a web search. Mitigations include separating instructions from data through structured input formats, treating all external content as untrusted, using output filtering to detect policy violations and applying privilege separation so the model cannot act on injected instructions that require elevated permissions.

Data exfiltration through an LLM occurs when the model reveals information from its context — including system prompts, retrieved documents or other users' data — in response to crafted queries. This is particularly dangerous in RAG systems where sensitive documents are injected into the context. Mitigations include strict access control on what documents can be retrieved for a given user, prompt designs that instruct the model not to quote source material verbatim and output scanning for patterns that suggest confidential data leakage.

Insecure tool use is another critical risk. If an agent is given tools that can write to databases, send emails or execute code, and the agent can be prompted to invoke those tools with attacker-controlled inputs, the consequences can be severe. The mitigation is a combination of least-privilege tool design (tools accept only validated, typed parameters rather than free-text instructions), human-in-the-loop gates for high-impact actions and audit logging of every tool invocation with its parameters.

Model denial of service — crafting inputs that consume excessive tokens, trigger long reasoning chains or cause the model to loop — is also a concern for production systems. Rate limiting, token budget enforcement and circuit breakers on agent loops are standard mitigations.

**Why it matters:** LLM security cannot be bolted on after deployment. The attack surfaces are novel — traditional WAF rules and input sanitisation do not defend against prompt injection — and the blast radius of a successful attack can be large when agents have tool access. A senior architect who can articulate these threat models to a security team, design mitigations into the system architecture and include LLM-specific risks in threat modelling exercises is operating at the level the role demands.

**Key things to understand:**
- The mechanism of direct and indirect prompt injection and why it is difficult to prevent entirely
- How data exfiltration through LLMs differs from traditional data leakage and what controls apply
- Why tool invocation requires the same security rigour as any other privileged API call
- The [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) as the industry-standard reference for LLM-specific risks — this is the essential starting point for any LLM security review. The OWASP Top 10 for Agentic Applications, released in 2026, extends this work to cover risks specific to autonomous AI agents with tool access

**Common pitfalls:**
- Relying on the system prompt alone to prevent prompt injection — it is necessary but not sufficient
- Treating LLM security as a model problem rather than a system design problem — most mitigations are architectural
- Logging prompts and completions without redacting sensitive data — the logs themselves become a liability

---

## Context Engineering at Scale – Managing AI System Complexity

Context engineering is the discipline of designing and managing the information that flows into an LLM's context window to produce reliable, high-quality outputs at production scale. It extends prompt engineering from a craft applied to individual prompts into a systems engineering concern applied across an entire AI product.

The context window is the model's working memory — everything the model can attend to in a single inference call. Effective context engineering maximises the relevance and quality of information in the context while staying within token budget constraints. This involves decisions about what to include (retrieved documents, conversation history, tool results, persona instructions), in what order (models tend to weight content at the beginning and end of the context more heavily) and how to format it (structured formats like XML or JSON can improve model adherence to instructions).

At scale, context construction becomes a software engineering problem. The code that assembles a context from dynamic components — user query, retrieved chunks, conversation history, system instructions — must be versioned, tested and observable. Changes to context construction logic can silently degrade output quality, so regression testing of context pipelines against a golden dataset of expected outputs is essential.

Context compression is a set of techniques for fitting more relevant information into a fixed token budget. Strategies include summarising conversation history instead of including it verbatim, ranking retrieved chunks by relevance score and discarding low-ranked ones, filtering retrieved content to remove boilerplate and using structured extraction to pull only the fields relevant to the current query.

Multi-agent systems, where multiple LLMs collaborate on a task, amplify context engineering complexity: each agent has its own context, and the information passed between agents must be designed as carefully as an API contract. Poorly designed inter-agent communication leads to information loss, hallucination amplification and debugging nightmares.

**Why it matters:** Output quality degradation in AI systems is often traced back to context construction problems, not model problems. A context that includes irrelevant documents, stale conversation history or poorly formatted instructions produces worse outputs regardless of how capable the underlying model is. Senior architects who understand context engineering can diagnose these problems, set engineering standards for how context pipelines are built and tested, and prevent the silent quality regressions that erode user trust over time.

**Key things to understand:**
- How context window position affects model attention and what implications that has for context ordering
- Why context construction pipelines need the same engineering rigour as any other production code path
- The standard techniques for context compression and when each is appropriate
- How context engineering concerns multiply in multi-agent architectures

**Common pitfalls:**
- Treating context construction as a one-time configuration rather than an evolving, tested code path
- Including all available context on the assumption that more information is always better — irrelevant context degrades output quality
- Failing to instrument context pipelines, making it impossible to diagnose why output quality changed after a deployment

---

## AI Policy and the Secure AI Framework – Architect Responsibilities

Every organisation that uses AI in production systems operates within a policy environment — internal policies set by the organisation, external regulations set by governments and regulators, and frameworks provided by standards bodies. A senior architect must understand this environment well enough to design systems that comply with it and to advise the organisation when a proposed use case creates policy risk.

Internal AI policy defines what AI tools and models are approved for use, under what conditions, by whom and for what purposes. It typically addresses data classification (which data may be sent to which models), model approval (which models are on the approved list and how new models are evaluated), output use (whether AI-generated outputs may be used without human review) and incident response (how AI-related incidents are reported and investigated). The architect's role is to ensure that systems are designed to make policy compliance verifiable — for example, logging which model was used for each inference, enforcing data classification at the API level and building human review checkpoints where policy requires them.

The Secure AI Framework (SAIF) provides a set of principles for building AI systems that are secure by design. Its core principles cover securing the AI supply chain (models, training data, third-party components), protecting AI systems at runtime (access controls, monitoring, adversarial input detection), ensuring model outputs are monitored and validated and maintaining the ability to detect and respond to model misbehaviour. As an architect, you translate SAIF principles into concrete design requirements: which threat models apply, which controls are implemented in infrastructure versus application code and how compliance is demonstrated.

Regulatory context is evolving rapidly. The EU AI Act introduces risk-based obligations: high-risk AI systems (those that affect access to credit, employment, education or public services) face requirements around transparency, human oversight, data governance and conformity assessment. The August 2026 deadline for high-risk AI system compliance is particularly relevant to insurance, where AI used in credit decisions, claims assessment and underwriting falls squarely within the high-risk category. An architect working in a regulated industry must understand which risk tier applies to each system and what technical obligations follow.

**Why it matters:** Policy and regulation are not the legal team's problem alone — they translate directly into architecture decisions. A system that cannot demonstrate which model version made a given decision, or that sends customer data to an unapproved model API, is both a compliance risk and a reputational one. A senior architect who understands the policy landscape can design compliance in from the start rather than retrofitting it under pressure before an audit.

**Key things to understand:**
- How to read an internal AI policy and identify the architectural implications of each clause
- The core principles of the Secure AI Framework and how they translate to design decisions
- The risk-tier model of the EU AI Act and what obligations attach to each tier
- How to build audit trails that demonstrate policy compliance for AI-assisted decisions

**Common pitfalls:**
- Treating policy compliance as a legal concern rather than an architectural one — compliance must be built in, not checked at the end
- Failing to account for policy drift — policies evolve, and systems must be designed to adapt without a complete rebuild
- Conflating security controls with compliance controls — they overlap but are not the same, and both are required

---

## Architecture Decision Records – Structure, Process and Culture

Architecture Decision Records (ADRs) are the mechanism by which a team creates and preserves the institutional memory of its technical decisions. At the senior level, the question is not whether to use ADRs — it is how to embed them into team culture so that they are written consistently, kept current and actually consulted when decisions are revisited.

The standard ADR structure includes a title (short, imperative: "Use PostgreSQL as the primary data store"), a status (proposed, accepted, deprecated, superseded — with a reference to the superseding ADR if applicable), a context section that describes the forces at play when the decision was made, a decision section that states what was decided and why, and a consequences section that describes the implications — both positive and negative — of the decision. Some teams add a "considered alternatives" section to capture why other options were rejected.

The process of creating an ADR should be lightweight enough that engineers actually do it. A good target is that any decision which would take more than a day to reverse warrants an ADR. The author drafts the ADR, shares it for asynchronous review (comments on a pull request work well), the team discusses any objections and the ADR is merged with accepted status. For significant decisions, a synchronous design review complements the written record but does not replace it.

Culture is the hardest part. ADRs fail when they are written after the fact as documentation (rather than as part of the decision process), when they are stored somewhere that nobody reads, when the team treats them as optional or when outdated ADRs are left in accepted status after the decision has been reversed. A senior tech lead models the behaviour: writing ADRs for their own decisions, referencing existing ADRs in design discussions and updating or deprecating records when circumstances change.

The long-term value of ADRs is disproportionate to the effort of writing them. New team members can understand the reasoning behind the system without a lengthy onboarding interview. Post-incident reviews can identify whether a decision was made with known risks that materialised. Architectural drift — the gradual accumulation of small decisions that undermine the intended structure — becomes visible when compared against the ADR record.

**Why it matters:** A senior tech lead or architect works across multiple teams or systems. Without a systematic practice of recording decisions, the organisation's technical strategy exists only in the minds of the people who made it. When those people change roles or leave, the rationale disappears. Embedding ADRs as a cultural norm — not just a personal habit — is an act of organisational care that pays dividends for every engineer who joins the team in the future.

**Key things to understand:**
- The five core fields of an ADR and the purpose of each
- How to calibrate the threshold for when a decision warrants an ADR
- The process for proposing, reviewing and accepting an ADR in a pull-request-based workflow
- How to keep ADRs current and what to do when a decision is reversed
- How to champion ADR adoption across teams that do not yet have the habit

**Common pitfalls:**
- Writing ADRs as retrospective documentation rather than as part of the decision process — the value is in the thinking, not just the record
- Storing ADRs in a wiki that is not co-located with the code — they become disconnected from the system they describe
- Allowing the ADR backlog to grow stale without a regular review cycle, eroding trust in the records

---

## AI Policy — Organisational Principles (English Summary)

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English to ensure all engineers can understand and apply them.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems, particularly those affecting access to financial services such as insurance, require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from architects designing AI systems to developers building them and business users employing AI-assisted tools.

**Why it matters:** As the section above on "AI Policy and the Secure AI Framework – Architect Responsibilities" describes, architects translate policy into architecture. This English summary ensures that the specific policy principles — particularly the AI Register, risk classification, responsible AI principles, and GDPR requirements — are accessible to all team members regardless of language, enabling consistent application across the organisation.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- The responsible AI principles (non-discrimination, transparency, robustness, security, privacy) are design constraints that architects must embed in system architecture.
- GDPR obligations apply throughout the AI lifecycle — from training data through inference to logged outputs.

**Common pitfalls:**
- Designing AI system architecture without consulting the AI Policy, then discovering compliance gaps during review.
- Assuming that the AI Policy only applies to customer-facing AI systems; internal AI tools and development assistants are also in scope.
- Not propagating policy requirements to development teams — the architect must ensure that policy constraints are reflected in technical specifications and design documents.

---

## Language Deep Dives

- [TypeScript Deep Dive](/language/typescript) — Type-safe architecture for scalable applications
- [Python Deep Dive](/language/python) — Backend and data architecture patterns
- [SQL Deep Dive](/language/sql) — Database design and performance at scale
`,
  },
  _prerequisites: {
    'overview': `# Prerequisites

Complete these before starting any role-specific learning path. They apply to all roles and levels in Tech-Hubben.

---

## Tools and Workflow

| Topic | Resource | Type |
|---|---|---|
| Git | [Git Setup](Prerequisites/git.md) | Guide |
| Git | [LF Developer Network – Git Docs](https://lfdn.lfnet.se/docs/devops/code/git/) | Internal |
| Git | [Git – Pluralsight Path](https://app.pluralsight.com/paths/skill/git) | Course |
| Git Intro Video | [Git It? How to use Git and Github – Fireship](https://www.youtube.com/watch?v=HkdAHXoRtos) | Video |
| Git Crash Course | [Git & GitHub Crash Course For Beginners – Traversy Media](https://www.youtube.com/watch?v=SWYqp7iY_Tc) | Video |
| Branching Strategy | [Branching Strategy](Prerequisites/Branching-Strategy.md) | Guide |
| Git Collaboration Workflow | [Git Collaboration Workflow](Prerequisites/Git-Collaboration-Workflow.md) | Guide |
| VS Code | [VS Code for Absolute Beginners](https://www.youtube.com/watch?v=lWEKiak0WVU) | Video |
| VS Code | [VS Code Foundations – Pluralsight](https://app.pluralsight.com/ilx/video-courses/vs-code-foundations/course-overview) | Course |

## AI Tools and Policy

| Topic | Resource | Type |
|---|---|---|
| GitHub Copilot | [LF Developer Network – GitHub Copilot Docs](https://lfdn.lfnet.se/docs/ai/github-copilot/) | Internal |
| GitHub Copilot | [GitHub Copilot Onboarding – LF](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/GitHub-Copilot-Onboarding.aspx) | Internal |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |

> The AI Policy, AI Checklist, and Secure AI Framework are required reading before contributing to any AI-related feature or product. They are not required to begin role-specific learning paths.

## Access

| Topic | Resource | Type |
|---|---|---|
| Pluralsight Access | Contact [learningdevelopment@lansforsakringar.se](mailto:learningdevelopment@lansforsakringar.se) or [learning@lfab.se](mailto:learning@lfab.se) to request access | Internal |

---

Once complete, proceed to your role-specific path from the [Role Roadmap index](README.md).
`,
    'vs-code-setup': `# VS Code Setup


Visual Studio Code is the standard editor across Tech-Hubben. This page covers the recommended extensions and settings to get a productive environment set up quickly.

---

## Installation

Request VS Code via [Appstation](https://appstationlf.lfnet.se/Shopping/requestItem/search?query=visual+studio+code) or download from [code.visualstudio.com](https://code.visualstudio.com/).

---

## Extensions for All Roles

Install these regardless of your role.

| Extension | Purpose |
|---|---|
| [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) | Inline Git blame, history, and branch visualization |
| [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | AI code completion — requires LF licence |
| [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) | In-editor AI chat |
| [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) | Shows errors and warnings inline on the affected line |
| [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) | Enforces consistent indentation and line endings across the team |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) | Automatic code formatting |

---

## Extensions by Role

### Frontend Developer

| Extension | Purpose |
|---|---|
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) | JavaScript/TypeScript linting |
| [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) | Tailwind class autocomplete and hover previews |
| [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) | Automatically renames matching HTML/JSX tag |
| [CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek) | Navigate to CSS class definitions from HTML |
| [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) | Lightweight in-editor REST client for testing APIs |

### Backend Developer (Python)

| Extension | Purpose |
|---|---|
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | Python language support, IntelliSense, debugging |
| [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) | Fast Python type checking and autocomplete |
| [Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy) | Breakpoint debugging for Python |
| [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) | Send HTTP requests from \`.http\` files |

### Backend Developer (.NET / C#)

| Extension | Purpose |
|---|---|
| [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) | C# language support and debugging |
| [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) | Full .NET development tools |
| [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) | Send HTTP requests from \`.http\` files |

### DevOps / Platform Engineer

| Extension | Purpose |
|---|---|
| [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) | YAML schema validation and formatting |
| [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) | Dockerfile editing, container management |
| [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) | Kubernetes manifest editing and cluster management |
| [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) | Azure resource management from VS Code |
| [Bicep](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep) | Bicep IaC language support |
| [HashiCorp Terraform](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform) | Terraform language support and validation |
| [ShellCheck](https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck) | Bash script linting |
| [PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) | PowerShell language support and debugging |

### Data Engineer

| Extension | Purpose |
|---|---|
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | Python language support, IntelliSense, debugging |
| [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) | Fast Python type checking and autocomplete |
| [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) | Run and edit Jupyter notebooks inside VS Code |
| [Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) | Visual data inspection and transformation |
| [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) | Colour-coded CSV viewing |
| [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) | YAML schema validation and formatting for pipeline definitions |
| [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) | Dockerfile editing, container management |
| [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) | Azure resource management from VS Code |

### AI/ML Engineer and Data Scientist

| Extension | Purpose |
|---|---|
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | Python language support |
| [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) | Type checking and autocomplete |
| [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) | Run and edit Jupyter notebooks inside VS Code |
| [Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) | Visual data inspection and transformation |
| [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) | Colour-coded CSV viewing |

---

## Recommended Settings

Open user settings with \`Ctrl+Shift+P\` > **Preferences: Open User Settings (JSON)** and add:

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.rulers": [100],
  "editor.bracketPairColorization.enabled": true,
  "editor.inlineSuggest.enabled": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "git.autofetch": true,
  "git.confirmSync": false,
  "terminal.integrated.defaultProfile.windows": "Git Bash"
}
\`\`\`

---

## Useful Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| \`Ctrl+P\` | Quick open file by name |
| \`Ctrl+Shift+P\` | Command palette |
| \`Ctrl+\`\` \` \`\` | Open integrated terminal |
| \`Ctrl+Shift+\`\` \` \`\` | New terminal |
| \`F12\` | Go to definition |
| \`Alt+F12\` | Peek definition inline |
| \`Shift+F12\` | Find all references |
| \`Ctrl+Shift+F\` | Search across all files |
| \`Ctrl+D\` | Select next occurrence of selection |
| \`Alt+Up/Down\` | Move line up or down |
| \`Ctrl+/\` | Toggle line comment |
| \`F2\` | Rename symbol across files |

---

## Related

- [Git Setup](git.md)
- [Git Collaboration Workflow](Git-Collaboration-Workflow.md)
`,
    'git': `# Git


Git is the version control system used across all Tech-Hubben projects.

---

## Installation

Git is often bundled with Visual Studio. If it is not already installed, request it via [Appstation](https://appstationlf.lfnet.se/Shopping/requestItem/search?query=git) or download from [git-scm.com](https://git-scm.com/).

---

## Initial Setup

After installing, configure your identity. Run the following in a terminal:

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

---

## TLS/SSL Troubleshooting

If Git reports a TLS/SSL error when cloning from your Git hosting platform, configure it to use the Windows certificate store instead of OpenSSL:

\`\`\`bash
git config --global http.sslBackend schannel
\`\`\`

To verify the current setting:

\`\`\`bash
git config --show-origin --get http.sslBackend
\`\`\`

This setting is especially useful in managed Windows environments where the OS certificate store is the source of trust.

---

## Branching Strategy

All projects follow a shared branching strategy. See [Branching Strategy](Branching-Strategy.md) for the full guide.

---

## Credential Management

Git Credential Manager (GCM) is the recommended tool for storing and managing Git credentials securely. It integrates with the operating system's native credential store, so you are not prompted for your password on every push or pull.

**Why it matters:** Without a credential manager, developers often resort to storing Personal Access Tokens in plaintext files or pasting them repeatedly into the terminal. Both habits lead to leaked or expired credentials that waste time and create security risks.

**Key things to understand:**

- GCM is included with Git for Windows by default — no separate install required
- It works with most major Git hosting platforms out of the box, handling browser-based sign-in and token caching automatically
- Credentials are stored in Windows Credential Manager, not in plain files
- You can check whether GCM is active with \`git config --global credential.helper\`

**Common pitfalls:**

- Storing PATs in plaintext files such as \`.git-credentials\` or \`.bashrc\` — use GCM instead
- Committing tokens or secrets to a repository — they are visible in the full Git history even if removed later
- Forgetting to update credentials after a PAT expires, leading to confusing authentication failures

For more details see the [Git Credential Manager repository](https://github.com/git-ecosystem/git-credential-manager).

---

## .gitignore

Every repository should have a \`.gitignore\` file from day one. This file tells Git which files and folders to exclude from version control, keeping the repository clean and free of machine-specific artefacts.

**Why it matters:** Without a \`.gitignore\`, build outputs, IDE settings, and environment secrets end up in the repository. This bloats the repo, creates noisy diffs, and risks leaking sensitive data.

**Key things to understand:**

- Essential patterns to exclude: IDE settings (\`.vs/\`, \`.vscode/\`), build outputs (\`bin/\`, \`obj/\`, \`dist/\`), dependency folders (\`node_modules/\`, \`.venv/\`), environment files (\`.env\`), and OS files (\`.DS_Store\`, \`Thumbs.db\`)
- Use [gitignore.io](https://www.toptal.com/developers/gitignore) to generate templates for your language and toolchain
- Many Git hosting platforms and project templates can initialise a repository with a starter \`.gitignore\`
- The file supports glob patterns — for example \`*.log\` ignores all log files and \`**/bin/\` ignores \`bin\` folders at any depth

**Common pitfalls:**

- Adding \`.gitignore\` after files have already been tracked — Git continues tracking them until you run \`git rm --cached <file>\`
- Ignoring too much (e.g. shared configuration that the team needs) or too little (e.g. leaving \`node_modules/\` tracked)
- Not checking the \`.gitignore\` into the repository itself — the file must be committed so the rules apply for everyone

---

## Authentication for Git Hosting Platforms

Most Git hosting platforms support multiple authentication methods for Git operations. Choosing the right one depends on your workflow and security requirements.

**Why it matters:** A misconfigured authentication setup leads to repeated login prompts, failed CI pipelines, and — in the worst case — leaked credentials. Understanding the available options helps you pick the most secure and convenient method.

**Key things to understand:**

- **SSH keys** — generate a key pair with \`ssh-keygen -t ed25519\`, then add the public key in your Git hosting platform's SSH key settings. SSH avoids password prompts entirely.
- **Personal Access Tokens (PATs)** — create them in your Git hosting platform's personal access token settings. Scope each token to the minimum required permissions and always set an expiry date.
- **Git Credential Manager (GCM)** — when using HTTPS, GCM handles token caching automatically so you rarely need to manage PATs manually.
- HTTPS with GCM is the most common setup at LF because it requires the least configuration.

**Common pitfalls:**

- Creating PATs with full scope instead of restricting to \`Code (Read & Write)\` — overly broad tokens are a security risk
- Sharing PATs between team members — each developer should use their own token
- Forgetting PAT expiry dates and discovering them only when a pipeline breaks
- Not adding the correct SSH host for your Git provider to \`~/.ssh/config\`, leading to connection failures

---

## Resources

| Resource | Type |
|---|---|
| [LF Developer Network – Git Docs](https://lfdn.lfnet.se/docs/devops/code/git/) | Internal |
| [Git – Pluralsight Path](https://app.pluralsight.com/paths/skill/git) | Course |
| [Moving to Git – LFDN](http://lfdn.lfnet.se/docs/tools/git/movingtogit/) | Internal |
`,
    'git-collaboration-workflow': `# Git Collaboration Workflow

This guide covers a platform-neutral day-to-day workflow for collaborating on code with Git. It applies whether your repository is hosted on GitHub, GitLab, Bitbucket, or another Git platform. It assumes Git is installed and configured — see [Git Setup](git.md) if not.

---

## Cloning a Repository

1. Open the repository in your Git hosting platform.
2. Copy the HTTPS or SSH clone URL.
3. In a terminal, run:

\`\`\`bash
git clone <repository-url>
cd <repository-folder>
\`\`\`

If you receive a TLS/SSL error, see the [Git Setup](git.md) page for troubleshooting.

---

## Creating a Branch

Always branch from \`master\`/\`main\`. Never commit directly to \`master\`/\`main\`.

\`\`\`bash
git checkout master
git pull
git checkout -b feature/123/add-login-button
\`\`\`

Follow the naming convention from the [Branching Strategy](Branching-Strategy.md):

\`\`\`
<type>/<id>/<short-description>
\`\`\`

Where \`<id>\` is the related issue, ticket, or planning item ID.

Types: \`feature\`, \`bugfix\`, \`refactor\`, \`release\`

---

## Making Commits

Stage your changes and commit with a clear, descriptive message:

\`\`\`bash
git add <file>
git commit -m "Add login button to navigation bar"
\`\`\`

Keep commits focused. One logical change per commit.

If your team uses ticket or issue references in commit messages, include the ID:

\`\`\`bash
git commit -m "Add login button #123"
\`\`\`

---

## Pushing and Opening a Pull Request

Push your branch to the remote:

\`\`\`bash
git push -u origin feature/123/add-login-button
\`\`\`

Then in your Git hosting platform:

1. Open a new pull request or merge request.
2. Set the source branch to your feature branch and the target to \`master\`/\`main\`.
3. Fill in the title and description (see [Code Review](Code-Review.md) for description standards).
4. Link the related ticket or issue if your team uses one.
5. Add reviewers.
6. Enable automatic completion/merge when checks pass if your platform supports it.
7. Enable deletion of the source branch on completion if your platform supports it.

---

## Linking Related Work

If your team tracks work in Jira, GitHub Issues, GitLab Issues, Linear, or another system, link the relevant item to the pull request so reviewers can see the context and trace the change back to the request.

---

## Reviewing a Pull Request

When assigned as a reviewer:

1. Open the pull request.
2. Review each changed file.
3. Leave comments on specific lines where needed.
4. Mark files as reviewed if your platform supports it.
5. Approve, request changes, or leave suggestions.

See [Code Review](Code-Review.md) for what to look for when reviewing.

---

## Responding to Feedback

When you receive review comments on your pull request:

- Address each comment with a code change or a reply explaining why no change is needed.
- Resolve comments after addressing them.
- Push new commits to the same branch so the pull request updates automatically.
- Re-request review once all comments are resolved.

---

## Completing a Pull Request

Once approved and all required checks pass:

1. Merge the pull request.
2. Prefer the merge strategy defined by your team.
3. Delete the source branch after merge unless there is a clear reason to keep it.

---

## Keeping Your Branch Up to Date

If \`master\`/\`main\` has moved ahead while you are working on your branch, rebase or merge to bring in the latest changes:

\`\`\`bash
git fetch origin
git rebase origin/master
\`\`\`

Resolve any conflicts, then continue:

\`\`\`bash
git rebase --continue
git push --force-with-lease
\`\`\`

---

## Related

- [Git Setup](git.md)
- [Branching Strategy](Branching-Strategy.md)
- [Code Review](Code-Review.md)
`,
    'branching-strategy': `# Branching Strategy


All Tech-Hubben projects follow Release Flow as the standard branching strategy. It is a form of trunk-based development.

---

## Core Rules

- Do not commit directly to master/main. Direct commits should be blocked by branch protection rules.
- All code changes go through short-lived feature branches.
- Feature branches should have one developer working on them over a few days at most.
- Merge to master/main via pull requests only.
- Never hotfix directly on a release branch. Create a branch from master/main, fix it there, open a PR to master/main, then cherry-pick the change to the release branch.

---

## Branch Naming

Use the following format:

\`\`\`
<type>/<id>/<short-description>
\`\`\`

Where \`<id>\` refers to the related issue, ticket, or planning item ID.

**Examples:**

\`\`\`
feature/123/add-login-button
refactor/123/cleaned-up-user-controller
bugfix/123/fix-calculation-error-in-currency-utils
release/M21
\`\`\`

---

## Release Flow

Release Flow is the recommended strategy. Releases are made from dedicated release branches.

| Branch | Deploys to |
|---|---|
| Feature branch | Dynamic feature environment |
| Pull Request | Dynamic feature environment (removed on PR completion) |
| master/main | Test, then Stage |
| release branch | Test, then Stage, then Production |

Reference: [Trunk Based Development](https://trunkbaseddevelopment.com/)

---

## Release from Trunk

An alternative strategy where every commit to master/main triggers a release. Recommended for NuGet packages and applications approved for Continuous Deployment.

| Branch | Deploys to |
|---|---|
| Feature branch | Dynamic feature environment |
| Pull Request | Dynamic feature environment (removed on PR completion) |
| master/main | Stage, then Production |

For NuGet packages specifically:

| Branch | Deploys to |
|---|---|
| Feature branch | nuget-release-candidates (Nexus) |
| master/main | nuget-releases (Nexus) |

---

## Pull Requests

- Enable automatic merge as soon as the pull request is ready, if your platform supports it.
- Use Merge without fast forward.
- Enable deletion of the source branch on completion.

---

## Branch Protection (master/main)

Enforce the following protections on the master/main branch:

1. Prevent direct commits to master/main.
2. Require pull requests to link to the relevant issue or ticket when your team uses one.
3. Require all PR comments to be resolved before merge.

---

## Comparison

| | Release Flow | Release from Trunk |
|---|---|---|
| Trunk based | Yes | Yes |
| Has release branch | Yes | No |
| Release from | release branch | master/main |
| All commits to master/main released | No | Yes |
| Version in Production | Latest commit in release branch | Latest commit in master/main |
| Rollback strategy | Roll forward | Roll forward |
`,
    'code-review': `# Code Review


Code review is a shared responsibility. A good review improves quality, spreads knowledge, and catches issues before they reach production. This guide covers what to write in a PR, what to look for as a reviewer, and how to give and receive feedback effectively.

---

## Writing a Good Pull Request

A PR description is not optional. It exists so reviewers understand the context without reading every line of code.

**A good PR description includes:**

- **What** was changed and why.
- **How** to test or verify the change.
- Any **known limitations** or follow-up work.
- A link to the related issue or ticket if your team uses one.

**Example structure:**

\`\`\`
## What
Added a login button to the navigation bar. Routes to /login on click.

## Why
Required by feature #123 – User Authentication.

## How to test
1. Run the app locally.
2. Confirm the login button appears in the nav.
3. Click it and verify redirect to /login.

## Notes
The button is hidden on mobile for now — tracked in #145.
\`\`\`

Keep PRs small. A PR that changes one thing is easier to review than one that changes ten. If a PR is growing large, split it.

---

## What Reviewers Check

### Correctness
- Does the code do what it is supposed to do?
- Are edge cases handled?
- Are there obvious bugs or off-by-one errors?

### Security
- Is user input validated and sanitised?
- Are secrets or credentials hardcoded anywhere?
- Does the change introduce any OWASP-class vulnerability (injection, broken auth, exposed data)?

### Readability
- Is the code easy to understand without excessive comments?
- Are names clear and consistent with the rest of the codebase?
- Is the logic straightforward, or unnecessarily complex?

### Tests
- Are there tests covering the new behaviour?
- Do existing tests still pass?
- Are the tests meaningful, or do they only test happy paths?

### Design
- Does the change fit the existing architecture?
- Is there duplication that could be avoided?
- Are responsibilities clearly separated?

---

## Review Etiquette

**As a reviewer:**
- Comment on the code, not the person.
- Distinguish between blocking issues and suggestions. Use prefixes like \`Blocking:\` or \`Suggestion:\` if it helps.
- Ask questions before assuming. "Why is this done this way?" is better than "This is wrong."
- Approve promptly. Do not let PRs sit unreviewed for more than one working day.

**As the author:**
- Do not take comments personally. They are about the code.
- Respond to every comment — either with a fix or a clear explanation.
- Resolve comments after addressing them so reviewers know what is done.
- Do not push unrelated changes to a PR under review.

---

## Checklist Before Requesting Review

- [ ] The PR description is complete.
- [ ] The related issue or ticket is linked, if applicable.
- [ ] The code builds and tests pass locally.
- [ ] There are no leftover debug logs, commented-out code, or TODO items that were not intentional.
- [ ] New functionality has tests.
- [ ] Secrets or credentials are not committed.
- [ ] The branch is up to date with master/main.

---

## Related

- [Branching Strategy](Branching-Strategy.md)
- [Git Collaboration Workflow](Git-Collaboration-Workflow.md)
`,
    'secure-ai-framework': `# Secure AI Framework

This guide provides a platform-neutral baseline for securing AI systems. It summarises the control areas that repeatedly appear in strong public guidance such as [Google Secure AI Framework (SAIF)](https://saif.google/), the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), and the [OWASP Top 10 for LLM Applications](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/).

Use it as a practical checklist when designing, building, reviewing, and operating AI-enabled products.

---

## Core Control Areas

### 1. User Awareness

People using or operating AI systems must understand the system's capabilities, limitations, and failure modes. Users should know when human review is required and what kinds of outputs must never be trusted without verification.

### 2. Prompt and Output Validation

AI inputs and outputs must be treated as untrusted data. Validate prompts, retrieved context, tool inputs, and generated responses. Apply content filtering, data loss prevention, structured output validation, and business-rule checks where needed.

### 3. Context and Memory Management

Control what information is stored in chat history, vector stores, caches, and long-term memory. Retain only what is necessary, classify stored data appropriately, and ensure sensitive information is not exposed to later users or sessions.

### 4. Secure Development Pipelines

Apply normal secure software delivery practices to AI systems: code review, dependency scanning, secret handling, SBOM generation, reproducible builds, and environment separation. AI apps expand the supply chain, so pipeline hygiene matters more, not less.

### 5. Identity and Access for Agents and Tools

Agents, workflows, and connected tools should operate with least privilege. Every tool call should be attributable, and credentials should be scoped narrowly enough that a prompt injection or logic flaw cannot escalate into broad system access.

### 6. Separation of Duties

High-impact actions should not rely on a single model response or a single unchecked workflow. Build approval steps, human review, or dual-control patterns where the risk of incorrect execution is material.

### 7. Traceability and Observability

Log model versions, prompts, tool calls, policy decisions, evaluation outcomes, and user-visible outputs to the level appropriate for privacy and compliance needs. Good observability is required for debugging, auditing, and incident response.

### 8. Secure Compute and Runtime

Harden the infrastructure running AI systems: network isolation, patching, runtime security, secrets management, access controls, and workload identity. Model-serving infrastructure should meet the same operational security bar as other production services.

### 9. Secure Model Selection and Training

Evaluate models, datasets, and third-party AI providers for security, licensing, provenance, privacy, and known risks. Review fine-tuning data sources, model update processes, and vendor terms before adopting a model in production.

---

## How to Apply the Framework

For each AI use case, ask:

1. What could go wrong technically?
2. What is the business impact if it goes wrong?
3. Which control areas above reduce that risk?
4. Which controls must be preventive, detective, or both?
5. What evidence will prove the controls are working?

This turns AI security from a vague principle into a repeatable engineering practice.

---

## Public Reference Material

- [Google Secure AI Framework (SAIF)](https://saif.google/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [MITRE ATLAS](https://atlas.mitre.org/)
`,
    'secure-dev-environment': `# Secure Development Environment

A secure development environment is the foundation of every trustworthy software project. If your local machine, credentials, dependencies, or network are compromised, nothing you ship can be trusted either. This guide covers the essential practices and tools every developer at Tech-Hubben should adopt before writing production code.

---

## 1. SSH Key Management & GPG Commit Signing

### Why it matters

SSH keys replace passwords for authenticating with remote Git hosts, CI servers, and cloud VMs. GPG signing proves that a commit was actually authored by you and not someone who happened to have push access. GitHub marks signed commits with a **Verified** badge, and many organisations now require signature verification on protected branches.

### 1.1 Generating an SSH Key

Use the Ed25519 algorithm — it is shorter, faster, and more secure than RSA-2048.

\`\`\`bash
# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "your.name@company.com" -f ~/.ssh/id_ed25519

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add the key to the agent
ssh-add ~/.ssh/id_ed25519
\`\`\`

On Windows with Git Bash the same commands work. If you use the Windows OpenSSH agent, start it from Services first:

\`\`\`powershell
# PowerShell (run as Administrator)
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add "$env:USERPROFILE\\.ssh\\id_ed25519"
\`\`\`

### 1.2 Adding the SSH Key to GitHub

\`\`\`bash
# Copy the public key to clipboard (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Copy the public key to clipboard (Linux)
xclip -selection clipboard < ~/.ssh/id_ed25519.pub

# Copy the public key to clipboard (Windows Git Bash)
cat ~/.ssh/id_ed25519.pub | clip
\`\`\`

Then navigate to **GitHub → Settings → SSH and GPG keys → New SSH key**, paste the key, and save.

Verify the connection:

\`\`\`bash
ssh -T git@github.com
# Expected: Hi <username>! You've successfully authenticated...
\`\`\`

### 1.3 SSH Config for Multiple Accounts

If you work with more than one GitHub account (personal and work), create an SSH config:

\`\`\`bash
# ~/.ssh/config

Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
  IdentitiesOnly yes

Host github-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes
\`\`\`

Then clone using the host alias:

\`\`\`bash
git clone git@github-work:org/repo.git
\`\`\`

### 1.4 Generating a GPG Key

\`\`\`bash
# Generate a GPG key (choose RSA 4096 or Ed25519)
gpg --full-generate-key

# List your keys to find the key ID
gpg --list-secret-keys --keyid-format=long

# Example output:
# sec   ed25519/ABC123DEF456 2026-03-20 [SC]
#       FINGERPRINT1234567890
# uid           [ultimate] Your Name <your.name@company.com>

# Export the public key for GitHub
gpg --armor --export ABC123DEF456
\`\`\`

Copy the output (including \`-----BEGIN PGP PUBLIC KEY BLOCK-----\` and \`-----END PGP PUBLIC KEY BLOCK-----\`) and add it at **GitHub → Settings → SSH and GPG keys → New GPG key**.

### 1.5 Configuring Git to Sign Commits

\`\`\`bash
# Tell Git which GPG key to use
git config --global user.signingkey ABC123DEF456

# Sign all commits by default
git config --global commit.gpgsign true

# Sign all tags by default
git config --global tag.gpgSign true

# If using GPG on Windows, point Git to the correct binary
git config --global gpg.program "C:/Program Files (x86)/GnuPG/bin/gpg.exe"
\`\`\`

Verify a signed commit:

\`\`\`bash
git log --show-signature -1
\`\`\`

### 1.6 Common Mistakes

- **Leaving SSH keys without a passphrase.** Always set a passphrase. The SSH agent caches it so you only type it once per session.
- **Committing with the wrong email.** Your GPG key email must match your Git \`user.email\`. Check with \`git config user.email\`.
- **Forgetting to back up GPG keys.** Export your private key and store it in a password manager: \`gpg --export-secret-keys --armor ABC123DEF456 > gpg-private.asc\`.

> **Security tip:** Rotate SSH keys annually and revoke any key that may have been exposed. GitHub lets you set expiry dates on SSH keys.

---

## 2. Environment Variable Security

### Why it matters

Hard-coded secrets in source code are the single most common cause of credential leaks. Once a secret is committed, it lives in Git history forever — even if you delete the file in a later commit. Environment variables keep secrets out of code and make configuration portable across environments.

### 2.1 The .env Pattern

Most frameworks support \`.env\` files via a \`dotenv\` library:

\`\`\`bash
# .env (never commit this file)
DATABASE_URL=postgres://user:password@localhost:5432/mydb
API_KEY=sk-live-abc123def456
JWT_SECRET=supersecretvalue
REDIS_URL=redis://localhost:6379
\`\`\`

### 2.2 Loading .env in Node.js

\`\`\`javascript
// Install: npm install dotenv
require('dotenv').config();

// Access variables
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

// Validate required variables at startup
const required = ['DATABASE_URL', 'API_KEY', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(\`Missing required environment variable: \${key}\`);
    process.exit(1);
  }
}
\`\`\`

### 2.3 Loading .env in Python

\`\`\`python
# Install: pip install python-dotenv
from dotenv import load_dotenv
import os

load_dotenv()

database_url = os.getenv("DATABASE_URL")
api_key = os.getenv("API_KEY")

# Validate at startup
required_vars = ["DATABASE_URL", "API_KEY", "JWT_SECRET"]
missing = [var for var in required_vars if not os.getenv(var)]
if missing:
    raise EnvironmentError(f"Missing required env vars: {', '.join(missing)}")
\`\`\`

### 2.4 .gitignore Rules for Secrets

\`\`\`gitignore
# Environment files
.env
.env.local
.env.*.local
.env.production
.env.staging

# Key files
*.pem
*.key
*.p12
*.pfx

# IDE credential caches
.idea/dataSources/
.vscode/settings.json
\`\`\`

### 2.5 Providing a Template

Create a \`.env.example\` file that is committed to the repo:

\`\`\`bash
# .env.example — copy to .env and fill in real values
DATABASE_URL=postgres://user:password@localhost:5432/mydb
API_KEY=your-api-key-here
JWT_SECRET=generate-a-random-string
REDIS_URL=redis://localhost:6379
\`\`\`

### 2.6 Detecting Committed Secrets

Use \`git-secrets\` or \`trufflehog\` to scan history:

\`\`\`bash
# Install git-secrets (macOS)
brew install git-secrets

# Register AWS patterns
git secrets --register-aws

# Install the pre-commit hook
git secrets --install

# Scan the entire repo history
git secrets --scan-history
\`\`\`

Using trufflehog:

\`\`\`bash
# Scan a local repo
trufflehog git file://. --only-verified

# Scan a remote repo
trufflehog git https://github.com/org/repo.git --only-verified
\`\`\`

### 2.7 Common Mistakes

- **Committing \`.env\` and then adding it to \`.gitignore\`.** The file is already in history. You must rotate every secret in that file immediately.
- **Using the same secrets across environments.** Production, staging, and development should each have unique credentials.
- **Logging environment variables.** Never log \`process.env\` or \`os.environ\` in production — it will leak every secret.

> **Security tip:** Use a pre-commit hook (see Section 5) that blocks commits containing high-entropy strings or known secret patterns.

---

## 3. Dependency Scanning

### Why it matters

Your application is only as secure as its weakest dependency. A single vulnerable package in \`node_modules\` or your Python virtualenv can expose your users to remote code execution, data exfiltration, or supply-chain attacks. Automated scanning catches known vulnerabilities before they reach production.

### 3.1 npm audit (Node.js)

\`\`\`bash
# Run an audit
npm audit

# See only high and critical vulnerabilities
npm audit --audit-level=high

# Automatically fix where possible
npm audit fix

# Force fix (may include breaking changes)
npm audit fix --force

# Generate a JSON report for CI
npm audit --json > audit-report.json
\`\`\`

### 3.2 pip-audit (Python)

\`\`\`bash
# Install
pip install pip-audit

# Audit the current environment
pip-audit

# Audit a requirements file
pip-audit -r requirements.txt

# Output in JSON for CI integration
pip-audit --format=json --output=audit-report.json

# Fix vulnerabilities automatically
pip-audit --fix
\`\`\`

### 3.3 Snyk CLI

Snyk supports multiple ecosystems (npm, pip, NuGet, Maven, Docker images):

\`\`\`bash
# Install
npm install -g snyk

# Authenticate
snyk auth

# Test a project
snyk test

# Monitor a project (sends alerts on new vulnerabilities)
snyk monitor

# Test a Docker image
snyk container test node:20-alpine

# Test infrastructure-as-code files
snyk iac test terraform/
\`\`\`

### 3.4 GitHub Dependabot

Add this file to your repo:

\`\`\`yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "security"

  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"

  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "monthly"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
\`\`\`

### 3.5 CI Integration Example

\`\`\`yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1'  # Every Monday at 06:00 UTC

jobs:
  dependency-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=high

      - name: Run Snyk test
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
\`\`\`

### 3.6 Lock File Hygiene

\`\`\`bash
# Always commit lock files
git add package-lock.json  # npm
git add yarn.lock           # yarn
git add pnpm-lock.yaml      # pnpm
git add Pipfile.lock         # pipenv
git add poetry.lock          # poetry

# Use ci install in pipelines (respects lock file exactly)
npm ci        # not npm install
pip install -r requirements.txt --require-hashes
\`\`\`

### 3.7 Common Mistakes

- **Ignoring lock files in \`.gitignore\`.** Lock files ensure reproducible builds and prevent supply-chain attacks.
- **Running \`npm audit fix --force\` blindly.** This can upgrade major versions and break your application. Review changes first.
- **Not scanning transitive dependencies.** A vulnerability five levels deep in your dependency tree is still your problem.

> **Security tip:** Pin exact versions in production (\`"express": "4.18.2"\` not \`"express": "^4.18.2"\`) and let Dependabot handle updates via PRs you can review.

---

## 4. Container Isolation for Development

### Why it matters

Containers give every project an isolated filesystem, network, and set of dependencies. This prevents "works on my machine" problems and stops a compromised project from affecting your host system. Dev containers also make onboarding instant — clone, open, and code.

### 4.1 Basic Dockerfile for Development

\`\`\`dockerfile
# Dockerfile.dev
FROM node:20-alpine

# Create a non-root user
RUN addgroup -S devgroup && adduser -S devuser -G devgroup

# Set working directory
WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Switch to non-root user
USER devuser

# Expose dev server port
EXPOSE 3000

# Start dev server with hot reload
CMD ["npm", "run", "dev"]
\`\`\`

### 4.2 Docker Compose for Multi-Service Development

\`\`\`yaml
# docker-compose.yml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules  # Prevent overwriting container node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://devuser:devpass@db:5432/devdb
    depends_on:
      db:
        condition: service_healthy
    networks:
      - dev-network

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpass
      POSTGRES_DB: devdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devuser"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - dev-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - dev-network

volumes:
  pgdata:

networks:
  dev-network:
    driver: bridge
\`\`\`

### 4.3 VS Code Dev Containers

Create a \`.devcontainer\` folder in your project:

\`\`\`json
// .devcontainer/devcontainer.json
{
  "name": "Project Dev Container",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/app",

  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-azuretools.vscode-docker",
        "GitHub.copilot"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "terminal.integrated.defaultProfile.linux": "bash"
      }
    }
  },

  "forwardPorts": [3000, 5432, 6379],

  "postCreateCommand": "npm ci",
  "remoteUser": "devuser"
}
\`\`\`

Alternatively, use a standalone Dockerfile:

\`\`\`json
// .devcontainer/devcontainer.json (standalone)
{
  "name": "Node.js Dev",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {},
    "ghcr.io/devcontainers/features/git:1": {},
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },
  "postCreateCommand": "npm ci",
  "forwardPorts": [3000]
}
\`\`\`

### 4.4 Security Best Practices for Containers

\`\`\`dockerfile
# Always use specific image tags, never :latest
FROM node:20.11.1-alpine

# Scan the image for vulnerabilities
# Run: docker scout cves node:20.11.1-alpine

# Never run as root in the container
USER node

# Drop all capabilities and add only what you need
# (in docker-compose.yml or docker run)
\`\`\`

\`\`\`yaml
# docker-compose.yml security hardening
services:
  app:
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
    cap_drop:
      - ALL
\`\`\`

### 4.5 Common Mistakes

- **Running containers as root.** Always create and switch to a non-root user.
- **Using \`:latest\` tags.** Pin image versions for reproducibility and security.
- **Mounting the Docker socket into dev containers.** This gives the container full control of your host. Use Docker-in-Docker features instead.
- **Storing secrets in Dockerfiles or images.** Use environment variables or mounted secret files.

> **Security tip:** Run \`docker scout cves <image>\` or \`snyk container test <image>\` regularly to catch vulnerabilities in your base images.

---

## 5. IDE Security Extensions

### Why it matters

Your IDE is the first line of defence. Security-focused extensions catch vulnerabilities, secrets, and misconfigurations as you type — before the code ever reaches a commit or a CI pipeline. Shifting security left to the editor saves time and prevents embarrassing leaks.

### 5.1 ESLint Security Plugins

\`\`\`bash
# Install ESLint with security rules
npm install -D eslint eslint-plugin-security eslint-plugin-no-secrets
\`\`\`

\`\`\`javascript
// eslint.config.js (flat config, ESLint 9+)
import security from 'eslint-plugin-security';
import noSecrets from 'eslint-plugin-no-secrets';

export default [
  {
    plugins: {
      security,
      'no-secrets': noSecrets,
    },
    rules: {
      // Detect potential security issues
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-pseudoRandomBytes': 'warn',

      // Detect hardcoded secrets
      'no-secrets/no-secrets': ['error', { tolerance: 4.5 }],
    },
  },
];
\`\`\`

### 5.2 Semgrep

Semgrep is a fast, open-source static analysis tool that supports 30+ languages:

\`\`\`bash
# Install
pip install semgrep

# Run with the default security ruleset
semgrep --config=auto .

# Run specific rulesets
semgrep --config=p/javascript .
semgrep --config=p/python .
semgrep --config=p/owasp-top-ten .
semgrep --config=p/secrets .

# Run and output SARIF for GitHub Code Scanning
semgrep --config=auto --sarif --output=semgrep.sarif .
\`\`\`

VS Code extension: Install **Semgrep** from the marketplace. It runs scans in the background as you edit.

### 5.3 CodeQL

CodeQL is GitHub's semantic code analysis engine. It is available as a GitHub Action and as a VS Code extension:

\`\`\`yaml
# .github/workflows/codeql.yml
name: CodeQL Analysis

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 4 * * 1'

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    strategy:
      matrix:
        language: ['javascript', 'python']
    steps:
      - uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: \${{ matrix.language }}

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
\`\`\`

### 5.4 Recommended VS Code Extensions

\`\`\`json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "Semgrep.semgrep",
    "GitHub.vscode-codeql",
    "GitGuardian.gitguardian",
    "SonarSource.sonarlint-vscode",
    "snyk-security.snyk-vulnerability-scanner",
    "redhat.vscode-yaml",
    "ms-azuretools.vscode-docker"
  ]
}
\`\`\`

### 5.5 Pre-Commit Hooks

Combine multiple checks using \`husky\` and \`lint-staged\`:

\`\`\`bash
# Install husky and lint-staged
npm install -D husky lint-staged

# Initialise husky
npx husky init
\`\`\`

\`\`\`json
// package.json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "eslint --fix",
      "semgrep --config=auto"
    ],
    "*.{json,yml,yaml}": [
      "prettier --write"
    ]
  }
}
\`\`\`

\`\`\`bash
# .husky/pre-commit
npx lint-staged
npx git-secrets --scan
\`\`\`

### 5.6 Common Mistakes

- **Disabling security warnings instead of fixing them.** \`// eslint-disable\` for security rules should require a code review comment explaining why.
- **Not sharing extension recommendations.** Add \`.vscode/extensions.json\` so the whole team gets prompted to install security tools.
- **Running Semgrep only in CI.** Run it locally too — the feedback loop is faster.

> **Security tip:** Configure your IDE to treat security rule violations as errors, not warnings. Developers are trained to ignore warnings.

---

## 6. Network Security for Development

### Why it matters

Development servers often run with permissive defaults — no authentication, debug mode enabled, verbose error messages. If these services are exposed to an untrusted network, attackers can exploit them to access your code, environment variables, or connected databases.

### 6.1 VPN for Development

Always connect to your organisation's VPN when accessing internal services:

\`\`\`bash
# Example: connecting with OpenConnect (Cisco AnyConnect compatible)
sudo openconnect vpn.company.com --user=your.username

# Example: WireGuard
sudo wg-quick up wg0
\`\`\`

### 6.2 Firewall Rules for Dev Servers

Bind development servers to localhost only:

\`\`\`bash
# Node.js — bind to localhost
node server.js --host 127.0.0.1

# Vite
npx vite --host 127.0.0.1

# Django
python manage.py runserver 127.0.0.1:8000

# Flask
flask run --host=127.0.0.1
\`\`\`

\`\`\`javascript
// Express.js — bind explicitly
const app = require('express')();
app.listen(3000, '127.0.0.1', () => {
  console.log('Server running on http://127.0.0.1:3000');
});
\`\`\`

On macOS, use the built-in firewall:

\`\`\`bash
# Enable the firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Block incoming connections to a specific port
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node
\`\`\`

On Linux with \`ufw\`:

\`\`\`bash
# Allow only localhost access to port 3000
sudo ufw deny 3000
sudo ufw allow from 127.0.0.1 to any port 3000
\`\`\`

### 6.3 Using ngrok Safely

ngrok creates public tunnels to your local machine. This is useful for testing webhooks, but dangerous if misconfigured:

\`\`\`bash
# Install ngrok
# Download from https://ngrok.com or use brew/snap

# Basic tunnel (creates a public URL)
ngrok http 3000

# Require authentication on the tunnel
ngrok http 3000 --basic-auth="user:password"

# Restrict to specific IPs (paid plan)
ngrok http 3000 --cidr-allow="203.0.113.0/24"

# Use a custom domain (paid plan)
ngrok http 3000 --domain=dev.yourdomain.com
\`\`\`

\`\`\`yaml
# ngrok.yml — configuration file
version: 2
authtoken: your-auth-token
tunnels:
  webapp:
    proto: http
    addr: 3000
    basic_auth:
      - "user:password"
    inspect: false  # Disable the inspection UI in production-like testing
\`\`\`

### 6.4 HTTPS for Local Development

\`\`\`bash
# Generate a self-signed certificate with mkcert
# Install mkcert first: brew install mkcert (macOS) or choco install mkcert (Windows)
mkcert -install
mkcert localhost 127.0.0.1 ::1

# This creates localhost+2.pem and localhost+2-key.pem
\`\`\`

\`\`\`javascript
// Express.js with HTTPS
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
const options = {
  key: fs.readFileSync('localhost+2-key.pem'),
  cert: fs.readFileSync('localhost+2.pem'),
};

https.createServer(options, app).listen(3000, '127.0.0.1', () => {
  console.log('HTTPS server running on https://127.0.0.1:3000');
});
\`\`\`

### 6.5 DNS Rebinding Protection

\`\`\`javascript
// Express.js — validate Host header
app.use((req, res, next) => {
  const allowedHosts = ['localhost', '127.0.0.1'];
  const host = req.hostname;
  if (!allowedHosts.includes(host)) {
    return res.status(403).send('Invalid host');
  }
  next();
});
\`\`\`

### 6.6 Common Mistakes

- **Binding dev servers to \`0.0.0.0\`.** This makes them accessible to every device on your network, including potentially hostile ones on public Wi-Fi.
- **Leaving ngrok tunnels running.** Kill tunnels when you are done. Use \`ngrok http --inspect=false\` to prevent data leaks through the inspect UI.
- **Running \`DEBUG=*\` in production-like environments.** Debug mode exposes stack traces, environment variables, and internal paths.
- **Connecting to production databases from a development machine.** Use separate credentials with minimal permissions.

> **Security tip:** Add \`0.0.0.0\` binding detection to your CI linting. A Semgrep rule can catch \`app.listen(PORT, '0.0.0.0')\` patterns.

---

## 7. Secrets Management

### Why it matters

Environment variables in \`.env\` files work for local development, but they do not scale to teams, CI/CD pipelines, or production. Dedicated secrets managers provide encryption at rest, access control, audit logging, automatic rotation, and central revocation. If a secret is leaked, you can rotate it in one place instead of hunting through dozens of servers.

### 7.1 HashiCorp Vault Basics

\`\`\`bash
# Start a development server (not for production)
vault server -dev

# Set the address and token
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='hvs.dev-root-token'

# Store a secret
vault kv put secret/myapp/config \\
  db_password="supersecret" \\
  api_key="sk-live-abc123"

# Read a secret
vault kv get secret/myapp/config

# Read a specific field
vault kv get -field=db_password secret/myapp/config

# Delete a secret
vault kv delete secret/myapp/config
\`\`\`

Using Vault in application code (Node.js):

\`\`\`javascript
// npm install node-vault
const vault = require('node-vault')({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
});

async function getSecrets() {
  const result = await vault.read('secret/data/myapp/config');
  const { db_password, api_key } = result.data.data;
  return { db_password, api_key };
}
\`\`\`

### 7.2 1Password CLI

\`\`\`bash
# Install: https://developer.1password.com/docs/cli/get-started/

# Sign in
op signin

# Read a secret
op read "op://Development/API Key/credential"

# Inject secrets into a command
op run --env-file=.env.tpl -- npm start

# Use secret references in .env.tpl
# DATABASE_URL=op://Development/Database/url
# API_KEY=op://Development/API Key/credential
\`\`\`

\`\`\`bash
# .env.tpl (committed to repo — contains references, not values)
DATABASE_URL=op://Vault/PostgreSQL/connection-string
API_KEY=op://Vault/ExternalAPI/api-key
JWT_SECRET=op://Vault/Auth/jwt-secret
\`\`\`

\`\`\`bash
# Run the app with secrets injected
op run --env-file=.env.tpl -- node server.js
\`\`\`

### 7.3 Azure Key Vault

\`\`\`bash
# Login to Azure
az login

# Create a Key Vault
az keyvault create \\
  --name my-dev-vault \\
  --resource-group my-rg \\
  --location northeurope

# Store a secret
az keyvault secret set \\
  --vault-name my-dev-vault \\
  --name "DatabasePassword" \\
  --value "supersecret"

# Retrieve a secret
az keyvault secret show \\
  --vault-name my-dev-vault \\
  --name "DatabasePassword" \\
  --query "value" -o tsv
\`\`\`

Using Azure Key Vault in Node.js:

\`\`\`javascript
// npm install @azure/keyvault-secrets @azure/identity
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const vaultUrl = 'https://my-dev-vault.vault.azure.net';
const client = new SecretClient(vaultUrl, new DefaultAzureCredential());

async function getSecret(name) {
  const secret = await client.getSecret(name);
  return secret.value;
}

// Usage
const dbPassword = await getSecret('DatabasePassword');
\`\`\`

### 7.4 AWS Secrets Manager

\`\`\`bash
# Store a secret
aws secretsmanager create-secret \\
  --name myapp/production/db \\
  --description "Production database credentials" \\
  --secret-string '{"username":"admin","password":"supersecret","host":"db.example.com"}'

# Retrieve a secret
aws secretsmanager get-secret-value \\
  --secret-id myapp/production/db \\
  --query SecretString --output text

# Rotate a secret (requires a Lambda function)
aws secretsmanager rotate-secret \\
  --secret-id myapp/production/db \\
  --rotation-lambda-arn arn:aws:lambda:eu-north-1:123456:function:rotate-db
\`\`\`

Using AWS Secrets Manager in Python:

\`\`\`python
import boto3
import json

def get_secret(secret_name: str, region: str = "eu-north-1") -> dict:
    client = boto3.client("secretsmanager", region_name=region)
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response["SecretString"])

# Usage
creds = get_secret("myapp/production/db")
db_host = creds["host"]
db_password = creds["password"]
\`\`\`

### 7.5 Choosing the Right Tool

| Tool | Best For | Cost |
|------|----------|------|
| \`.env\` files | Local development only | Free |
| 1Password CLI | Small teams, individual developers | Subscription |
| HashiCorp Vault | Self-hosted, multi-cloud, advanced policies | Free (OSS) / Paid (Enterprise) |
| Azure Key Vault | Azure-native projects | Pay-per-use |
| AWS Secrets Manager | AWS-native projects | Pay-per-use |
| GitHub Actions Secrets | CI/CD pipelines on GitHub | Free with GitHub |

### 7.6 Common Mistakes

- **Storing Vault tokens in \`.env\` files.** Use machine identity (IAM roles, managed identities) instead.
- **Not rotating secrets after a team member leaves.** Automate rotation schedules.
- **Using the same secret across all environments.** Each environment should have unique secrets.
- **Granting broad access.** Apply least-privilege: developers need read access to dev secrets only, not production.

> **Security tip:** Enable audit logging on every secrets manager. You should be able to answer "who accessed which secret, when, and from where?" at any time.

---

## 8. Backup & Disaster Recovery

### Why it matters

Hardware fails, files get accidentally deleted, and ransomware exists. A reliable backup strategy means the difference between losing an hour of work and losing months. For developers, backups span code (Git), configuration (dotfiles), secrets (password managers), and local data (databases, documents).

### 8.1 Git Stash — Saving Work in Progress

\`\`\`bash
# Stash current changes (tracked files only)
git stash

# Stash with a descriptive message
git stash push -m "WIP: refactoring auth module"

# Stash including untracked files
git stash push -u -m "WIP: new feature with new files"

# List all stashes
git stash list

# Apply the most recent stash (keeps it in the stash list)
git stash apply

# Apply and remove the most recent stash
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Show what is in a stash
git stash show -p stash@{0}

# Drop a specific stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
\`\`\`

### 8.2 Git Reflog — Recovering Lost Commits

\`\`\`bash
# View the reflog (list of all HEAD movements)
git reflog

# Example output:
# abc1234 HEAD@{0}: commit: fix login bug
# def5678 HEAD@{1}: reset: moving to HEAD~1
# ghi9012 HEAD@{2}: commit: add feature X  <-- "lost" commit

# Recover a "lost" commit
git checkout ghi9012
# or
git cherry-pick ghi9012
# or create a branch from it
git branch recovered-feature ghi9012
\`\`\`

### 8.3 Git Worktrees — Parallel Work Without Stashing

\`\`\`bash
# Create a worktree for a hotfix without leaving your current branch
git worktree add ../hotfix-branch hotfix/critical-bug

# Work in the new directory
cd ../hotfix-branch
# ... make changes, commit, push ...

# Remove the worktree when done
git worktree remove ../hotfix-branch
\`\`\`

### 8.4 Automated Local Backups

macOS Time Machine:

\`\`\`bash
# Verify Time Machine is running
tmutil status

# Start a backup manually
tmutil startbackup

# Exclude node_modules and build artifacts from backups
tmutil addexclusion ~/projects/myapp/node_modules
tmutil addexclusion ~/projects/myapp/dist
tmutil addexclusion ~/projects/myapp/.next
\`\`\`

Windows File History:

\`\`\`powershell
# Enable File History via Settings > Update & Security > Backup
# Or via PowerShell
Enable-ComputerRestore -Drive "C:\\"
Checkpoint-Computer -Description "Before major refactor"
\`\`\`

Linux with \`restic\`:

\`\`\`bash
# Install restic
sudo apt install restic

# Initialise a local backup repository
restic -r /mnt/backup/dev init

# Backup your projects directory
restic -r /mnt/backup/dev backup ~/projects \\
  --exclude="node_modules" \\
  --exclude=".next" \\
  --exclude="dist" \\
  --exclude="__pycache__" \\
  --exclude=".venv"

# List snapshots
restic -r /mnt/backup/dev snapshots

# Restore a specific snapshot
restic -r /mnt/backup/dev restore latest --target ~/restored
\`\`\`

### 8.5 Cloud Sync Best Practices

\`\`\`yaml
# Example rclone config for syncing to cloud storage
# rclone config (interactive setup) or edit ~/.config/rclone/rclone.conf

# Sync projects to cloud (excluding build artifacts)
# rclone sync ~/projects remote:dev-backup \\
#   --exclude="node_modules/**" \\
#   --exclude=".next/**" \\
#   --exclude="dist/**" \\
#   --exclude="__pycache__/**" \\
#   --exclude=".venv/**" \\
#   --exclude=".env" \\
#   --exclude="*.pem" \\
#   --exclude="*.key"
\`\`\`

**Important:** Never sync \`.env\` files, private keys, or credentials to cloud storage that is not end-to-end encrypted. Use a password manager for secrets backup.

### 8.6 Database Backup for Local Development

\`\`\`bash
# PostgreSQL
pg_dump -h localhost -U devuser devdb > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql -h localhost -U devuser devdb < backup_20260320_143000.sql

# MySQL
mysqldump -u root -p devdb > backup_$(date +%Y%m%d_%H%M%S).sql

# SQLite (just copy the file)
cp dev.sqlite3 "backups/dev_$(date +%Y%m%d_%H%M%S).sqlite3"

# MongoDB
mongodump --db devdb --out "backups/$(date +%Y%m%d_%H%M%S)"
\`\`\`

### 8.7 Dotfiles Backup

\`\`\`bash
# Create a bare Git repo for dotfiles
git init --bare ~/.dotfiles

# Set up an alias
alias dotfiles='git --git-dir=$HOME/.dotfiles --work-tree=$HOME'

# Ignore untracked files (so it does not list your entire home directory)
dotfiles config --local status.showUntrackedFiles no

# Add your dotfiles
dotfiles add ~/.bashrc
dotfiles add ~/.gitconfig
dotfiles add ~/.ssh/config
dotfiles add ~/.config/nvim/init.lua

# Commit and push
dotfiles commit -m "Initial dotfiles backup"
dotfiles remote add origin git@github.com:username/dotfiles.git
dotfiles push -u origin main
\`\`\`

### 8.8 The 3-2-1 Backup Rule

Follow the **3-2-1 rule** for any data you cannot afford to lose:

- **3** copies of your data
- **2** different storage media (e.g., SSD + external drive)
- **1** offsite copy (cloud storage or a remote server)

\`\`\`
┌─────────────────────────────────────────────────┐
│                3-2-1 Backup Strategy             │
├─────────────────────────────────────────────────┤
│                                                  │
│  Copy 1: Local machine (SSD)                    │
│    └── Your active working files                │
│                                                  │
│  Copy 2: External drive / NAS                   │
│    └── Time Machine, restic, or manual backup   │
│                                                  │
│  Copy 3: Cloud / offsite                        │
│    └── GitHub (code), rclone (files),           │
│        password manager (secrets)               │
│                                                  │
└─────────────────────────────────────────────────┘
\`\`\`

### 8.9 Common Mistakes

- **Assuming GitHub is a backup.** GitHub is a collaboration tool. If you force-push over history or delete a repo, the data is gone.
- **Never testing restores.** A backup that cannot be restored is not a backup. Test your restore process quarterly.
- **Backing up \`node_modules\`.** Exclude build artifacts — they can be regenerated from lock files.
- **Not backing up local databases.** If you have spent hours seeding a development database, dump it to a file and version it.

> **Security tip:** Encrypt all backups at rest. Both \`restic\` and \`rclone\` support encryption. Never back up to unencrypted cloud storage.

---

## Quick Reference Checklist

Use this checklist to verify your development environment is secure:

\`\`\`
[ ] SSH keys generated with Ed25519 and protected by passphrase
[ ] GPG key created and configured for commit signing
[ ] .env files listed in .gitignore
[ ] .env.example committed as a template
[ ] Pre-commit hook installed to scan for secrets
[ ] npm audit / pip-audit runs in CI pipeline
[ ] Dependabot or Snyk configured for dependency updates
[ ] Dev containers configured (or Docker Compose for multi-service)
[ ] ESLint security plugin installed and configured
[ ] Semgrep or CodeQL running locally and in CI
[ ] Dev servers bound to 127.0.0.1, not 0.0.0.0
[ ] ngrok tunnels use authentication when active
[ ] Secrets stored in a secrets manager, not in code
[ ] Backups follow the 3-2-1 rule
[ ] Backup restores tested within the last quarter
\`\`\`

---

## Further Reading

- [GitHub SSH Key Documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [GitHub GPG Signing Documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [Semgrep Rules Registry](https://semgrep.dev/explore)
- [HashiCorp Vault Getting Started](https://developer.hashicorp.com/vault/tutorials/getting-started)
- [1Password CLI Documentation](https://developer.1password.com/docs/cli/)
- [Azure Key Vault Documentation](https://learn.microsoft.com/en-us/azure/key-vault/)
- [AWS Secrets Manager Documentation](https://docs.aws.amazon.com/secretsmanager/)
`,
  },
};
