export const content = {
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
}
