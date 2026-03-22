export const content = {
  overview: `# AI Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

AI Engineers build applications powered by large language models and generative AI. The role covers prompt engineering, RAG systems, agent frameworks, LLM evaluation, security, and enterprise AI governance.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| AI vs ML vs Deep Learning | [AI, ML, Deep Learning and GenAI Explained](https://www.youtube.com/watch?v=qYNweeDHiyU) | Video |
| Python | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course (requires Pluralsight subscription) |
| Python | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| APIs Overview | [Every Popular API Style Explained](https://www.youtube.com/watch?v=4vLxWqE94l4) | Video |
| Generative AI Intro | [Generative AI for Data Science – Pluralsight](https://app.pluralsight.com/paths/skills/generative-ai-for-data-science) | Course (requires Pluralsight subscription) |
| ML Literacy | [Machine Learning Explained Simply (12 min)](https://www.youtube.com/watch?v=Au1OxVSyGas) | Video |
| Prompt Basics | [Prompt Engineering and GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/prompt-engineering-and-generative-ai) | Course (requires Pluralsight subscription) |

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
| Context Engineering | [Context Engineering – Pluralsight](https://app.pluralsight.com/paths/skills/context-engineering) | Course (requires Pluralsight subscription) |
| RAG Development | [RAG for Developers – Pluralsight](https://app.pluralsight.com/paths/skills/retrieval-augmented-generation-rag-for-developers) | Course (requires Pluralsight subscription) |
| LangGraph | [LangGraph – Pluralsight](https://app.pluralsight.com/paths/skills/langgraph) | Course (requires Pluralsight subscription) |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course (requires Pluralsight subscription) |
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
| AI Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course (requires Pluralsight subscription) |
| Enterprise GenAI Strategy | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course (requires Pluralsight subscription) |
| OWASP LLM Security | [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) | Reference |
| LLM Evaluation | [RAGAS Documentation](https://docs.ragas.io/) | Docs |
| Fine-Tuning / PEFT | [Hugging Face – PEFT Documentation](https://huggingface.co/docs/peft/) | Docs |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy (Internal – requires company access)](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista (Internal – requires company access)](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |

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

This level is your foundation. Before you write a single line of AI code, you need to understand the landscape: what AI, machine learning, deep learning, and generative AI actually are and how they relate to each other. You also need to know how the tools you will use every day — APIs and Python — work at a mechanical level. Think of this level as learning what the ingredients are before you start cooking. By the end, you should be able to explain these concepts clearly to a colleague who has never heard the terms, and write simple Python scripts that call an LLM API and get a useful response.

## Learning Objectives

- Explain the relationship between AI, machine learning, deep learning, and generative AI using plain language
- Describe how large language models generate text and why they sometimes produce incorrect answers
- Understand what an API is and identify the differences between REST, GraphQL, gRPC, WebSocket, and Webhook
- Write basic Python scripts that call external APIs
- Write prompts using zero-shot and few-shot techniques to get useful outputs from an LLM

---

## What is Generative AI — and Where Does It Fit?

Think of the AI landscape as a set of nested circles, like Russian dolls. The outermost is **Artificial Intelligence** — any technique that enables a machine to perform tasks that normally require human intelligence. Inside AI sits **Machine Learning** — a subset where instead of hand-coding rules, you feed the system examples and let it learn the rules itself. Inside ML sits **Deep Learning** — a subset that uses layered neural networks modelled loosely on the human brain. Inside deep learning sits **Generative AI** — systems that create new content (text, images, audio, video, code) rather than just classifying or predicting.

A chess engine that follows hand-coded rules is AI but not ML. A spam filter trained on labelled emails is ML. An image classifier built on a convolutional neural network is deep learning. A system that writes a cover letter or generates an image from a text description is generative AI.

\`\`\`mermaid
flowchart LR
    AI["Artificial Intelligence"] --> ML["Machine Learning"]
    ML --> DL["Deep Learning"]
    DL --> GenAI["Generative AI"]
    AI -.- ex1["Chess engine"]
    ML -.- ex2["Spam filter"]
    DL -.- ex3["Image classifier"]
    GenAI -.- ex4["LLMs, image generators"]
\`\`\`

The key insight for AI Engineers: **LLMs do not retrieve answers from a database.** They generate text by predicting the most statistically likely next token (a small chunk of text) given everything that came before. Think of the phone's autocomplete feature — but instead of predicting the next word, an LLM predicts the next sentence, the next paragraph, or the entire document. This is why LLMs can confidently produce text that sounds correct but is factually wrong — a phenomenon called hallucination.

> **What you'll learn watching this:** This video unpacks the relationship between AI, ML, deep learning, and generative AI, then explains foundation models and LLMs using an analogy that compares generating new content to composing new music from existing notes.

https://www.youtube.com/watch?v=qYNweeDHiyU

**Why it matters:**
- Engineers who understand the nested structure of AI make better decisions about which tool to use — not every problem needs an LLM
- Knowing that LLMs predict tokens (not retrieve facts) explains hallucination and helps you design systems that verify outputs
- Foundation models like GPT-4 and Claude changed the AI adoption curve by making powerful AI accessible through an API call — this is the shift that created the AI Engineer role
- Generative AI's apparent ability to "understand" is statistical — it produces plausible continuations, which is genuinely useful but fundamentally different from human understanding
- Deep fakes, chatbots, and code generation tools all come from the same generative AI family — understanding the common origin helps you reason about their shared limitations

---

## How LLMs Work — A Simplified Overview

Large language models are neural networks trained on massive text datasets to predict the next token in a sequence. Understanding the basics of how they work — without needing to implement one — is essential for building applications on top of them.

**Architecture.** Modern LLMs use the transformer architecture introduced in 2017. The key innovation is the self-attention mechanism, which allows the model to weigh the importance of every other token in the input when processing each token. This enables the model to capture relationships between words that are far apart in a sentence. Transformers process input in parallel (unlike older recurrent networks that processed tokens one at a time), making them much faster to train at scale.

**Tokenisation.** Before an LLM processes text, it converts it into tokens — numerical representations the model operates on. Tokenisers use subword algorithms (such as byte-pair encoding) that split text into pieces balancing vocabulary size with coverage. A common English word might be one token; a rare or compound word might be split into several. Whitespace, punctuation, and casing all affect tokenisation. Tokens are not words — this distinction matters when estimating API costs and managing context window limits.

**Context window.** The context window is the maximum number of tokens the model can process in a single request. It includes everything: the system prompt, conversation history, any retrieved documents, and the user's current message. Content beyond the context window is simply invisible to the model. Managing what goes into the context window is one of the most important practical skills for an AI Engineer.

**Inference.** When you send a prompt to an LLM, the model generates output one token at a time. At each step, it produces a probability distribution over its entire vocabulary and selects the next token using a sampling strategy. Temperature controls the randomness: low temperature (close to 0) produces more deterministic, focused output; high temperature produces more varied, creative output. This autoregressive generation continues until a stopping condition is met.

**Why it matters:** You do not need to train LLMs — you need to understand how they work to use them effectively. Knowing about tokenisation helps you estimate costs and avoid truncation. Understanding the context window helps you design applications that provide the right information to the model at the right time.

**Key things to understand:**
- LLMs predict the next token based on statistical patterns — they do not reason the way humans do
- The context window is a hard limit — anything beyond it is invisible to the model
- Token count determines API cost and latency — shorter, more focused prompts are cheaper and faster
- Temperature is the primary control for output variability: low for factual tasks, higher for creative tasks

**Common pitfalls:**
- Assuming the model "remembers" previous conversations — each API call is independent unless you explicitly include conversation history
- Ignoring tokenisation when estimating whether content fits in the context window, leading to unexpected truncation
- Setting temperature too high for factual tasks, producing unreliable output

---

## Machine Learning Literacy — What You Need as an AI Engineer

You do not need to build ML models, but you do need to understand what machine learning is and how it relates to what you build. AI Engineers use LLMs, which are themselves the product of ML training. Understanding the vocabulary and core ideas prevents confusion when you encounter terms like training, inference, overfitting, and model parameters in documentation, papers, and team discussions.

Machine learning, at its core, is teaching computers to learn from examples rather than explicit instructions. Instead of programming a rule that says "if the email contains the word 'free money' it is spam", you show the system thousands of spam and non-spam emails and let it figure out the patterns. The more quality examples you give it, the better its pattern-recognition becomes.

The four components of any ML system are: **data** (the examples the model learns from), **algorithm** (the mathematical process for learning patterns), **model** (the trained function that maps inputs to outputs), and **training and evaluation** (the cycle of teaching the model and measuring how well it works).

Machine learning comes in three main flavours. **Supervised learning** uses labelled examples — photos tagged as "cat" or "dog", emails tagged as "spam" or "not spam". The model learns to predict the label for new, unseen examples. **Unsupervised learning** finds patterns in data without labels — grouping customers with similar buying habits, for example. **Reinforcement learning** learns through trial and error, receiving rewards for good actions and penalties for poor ones — how AlphaGo learned to beat human Go champions.

> **What you'll learn watching this:** This video walks through the four core components of machine learning — data, algorithms, models, and training — using analogies like tuning a radio and training a boxer, then explains supervised, unsupervised, and reinforcement learning with worked examples.

https://www.youtube.com/watch?v=Au1OxVSyGas

**Why it matters:**
- Data quality is the single most important factor in ML model performance — "garbage in, garbage out" applies directly to any model you train or fine-tune
- Understanding the difference between training and inference helps you reason about LLM API calls, which are inference (not training)
- Supervised learning makes up roughly 70% of real-world ML applications — recognising it helps you understand most AI systems you will encounter
- The loss function and gradient descent concepts underpin how LLMs were trained — knowing these terms at a conceptual level helps you read model documentation
- Reinforcement learning, combined with human feedback (RLHF), is what makes LLMs follow instructions and avoid harmful outputs — this is a critical piece of how modern LLMs work

---

## APIs and AI Services — How Systems Talk to Each Other

An API (Application Programming Interface) is a contract between two software systems that defines how they communicate. Think of an API as a restaurant menu: it tells you what you can order (available operations), what information you need to provide (request format), and what you will receive back (response format). You do not need to know what happens in the kitchen.

As an AI Engineer, every LLM you use will be accessed through an API. You send your prompt over the network, the model processes it, and the response comes back. Understanding how APIs work — at the HTTP level — means you can debug problems, optimise performance, and build robust applications.

There are several API styles, each suited to different use cases:

**REST** is the backbone of the web. It uses standard HTTP methods (GET to retrieve, POST to create, PUT to update, DELETE to remove) and JSON for data. Most LLM APIs (OpenAI, Anthropic) are REST APIs. REST is simple, widely understood, and suitable for most request-response interactions.

**GraphQL** was developed by Facebook to solve a specific REST problem: over-fetching and under-fetching. With REST, a single endpoint often returns more data than you need (over-fetching) or forces multiple requests to assemble what you need (under-fetching). GraphQL lets the client specify exactly what fields it wants. Companies like GitHub and Shopify use it for complex data requirements.

**gRPC** is a high-performance protocol that uses binary encoding (Protocol Buffers) rather than JSON. It is faster and more efficient than REST but requires more setup and has limited browser support. Netflix uses it for inter-service communication at scale — a microservices scenario, not a browser UI.

**WebSocket** enables real-time, bidirectional communication over a persistent connection. Chat applications and live dashboards use WebSocket because HTTP request-response would be too slow. Streaming LLM responses (where tokens appear one by one) uses a related mechanism.

**Webhook** is event-driven: instead of your code asking "did anything happen?", the remote service calls your endpoint when something does. GitHub webhooks notify your CI pipeline when code is pushed.

> **What you'll learn watching this:** This video compares all six major API styles — SOAP, REST, GraphQL, gRPC, WebSocket, and Webhook — with concrete real-world examples for each, including which companies use them and why.

https://www.youtube.com/watch?v=4vLxWqE94l4

**Why it matters:**
- LLM APIs are REST APIs — knowing how REST works at the HTTP level helps you debug authentication failures, parse error codes, and understand rate limiting
- Choosing the wrong API style for a use case creates significant technical debt — gRPC inside a browser, or WebSocket for a batch job, are common mismatches
- Token-based pricing means every byte you send in a REST request to an LLM has a cost — understanding request structure helps you optimise
- Webhooks are increasingly used in AI pipelines for event-driven triggers (a document uploaded, a form submitted) — knowing how they work lets you design async workflows
- GraphQL is used by several developer platforms you will integrate with as an AI Engineer — recognising it prevents confusion when their API behaves differently from REST

**Key things to understand:**
- REST APIs use HTTP methods and JSON — learn these before using any LLM SDK
- LLM API calls are stateless — the model has no memory between calls unless you include conversation history
- Token usage determines cost — monitor and optimise both input and output tokens
- Error handling (rate limits, timeouts, API errors) must be built into any production application

**Common pitfalls:**
- Not handling API rate limits, causing applications to fail under load
- Sending unnecessary context in every API call, inflating costs
- Using only the SDK without understanding the underlying HTTP behaviour — when things break, you need to know what is happening underneath

---

## Python for AI Engineers

Python is the dominant language for AI engineering. Not because it is the fastest or most elegant language, but because the entire ecosystem — LLM SDKs, ML frameworks, data processing tools, vector database clients — is built around it. As an AI Engineer, Python is your primary tool for interacting with LLMs, processing data, and building applications.

You do not need to be a Python expert at this level. You need to be comfortable with the fundamentals: variables, functions, data structures (lists, dictionaries, sets), control flow, file I/O, and working with external packages.

**Key libraries for AI Engineers.** The \`requests\` library handles HTTP calls. The \`anthropic\` and \`openai\` packages are the official SDKs for the two most widely used LLM APIs. \`json\` handles structured data. \`os\` and \`dotenv\` manage environment variables (including API keys). \`tiktoken\` estimates token counts.

**Why it matters:** Python is not optional for AI Engineers — it is the primary tool. Every LLM API call, every data processing step, every integration you build will be in Python. Investing in solid Python fundamentals pays dividends at every subsequent level.

**Key things to understand:**
- Use virtual environments for every project — dependency isolation prevents painful debugging later
- Never hardcode API keys — use environment variables loaded from \`.env\` files
- JSON is the universal data format for LLM APIs — be fluent in serialisation and parsing
- Wrap LLM calls in functions with clear inputs and outputs — this makes code testable and reusable
- Error handling is not optional — API calls fail under normal conditions and your code must handle it

**Common pitfalls:**
- Installing packages globally instead of in a virtual environment, causing version conflicts across projects
- Hardcoding API keys in source files and accidentally committing them to version control
- Not handling API errors, causing applications to crash on the first rate limit or timeout

---

## Introduction to Prompt Engineering

Prompt engineering is the practice of designing input text that elicits the desired output from a language model. Think of it like giving instructions to an extremely capable but very literal intern: the quality of what you get back depends almost entirely on how clearly you explain what you want.

**Zero-shot prompting** is the simplest approach: describe the task directly without providing examples. "Summarise this document in three bullet points" is a zero-shot prompt. It works well for straightforward tasks where the model's training provides enough context to understand the expected format and style.

**Few-shot prompting** provides two to five worked examples before the actual request. The examples establish the expected input-output format, style, and level of detail. Few-shot prompting is often more effective than adding more instructions, because the model infers the pattern from the examples rather than trying to parse verbose prose instructions.

**Role prompting** frames the model as a particular persona: "You are a senior claims analyst with 10 years of experience." This influences the model's vocabulary, level of technical detail, and perspective — a useful way to target a specific audience or domain without writing long style instructions.

**System prompts** are a special message type in LLM APIs that sets the model's overall behaviour, persona, and constraints for an entire conversation. Unlike user messages, system prompts persist across all turns and establish the ground rules. They are where you place role definitions, output format requirements, and safety instructions.

**Structured output.** Asking the model to respond in a specific format — JSON, a numbered list, a markdown table — reduces ambiguity and makes output easier to parse programmatically. Being explicit about the desired format ("Respond with a JSON object containing the keys: summary, confidence, sources") produces more consistent results than leaving the format open.

**Why it matters:** The prompt is your primary control surface for LLM behaviour. Mastering these basic techniques gives you the tools to solve a wide range of problems before reaching for more complex approaches like RAG or fine-tuning.

**Key things to understand:**
- Start simple (zero-shot) and add complexity (few-shot, structured output) only when needed
- Few-shot examples influence the model's output format and tone more strongly than explicit instructions in many cases
- System prompts set the overall behaviour for a conversation — use them for persona, constraints, and format rules
- Positive instructions ("respond only with...") are more reliable than negative ones ("do not include...")
- Prompts are not deterministic — the same prompt can produce different output across runs

**Common pitfalls:**
- Over-engineering prompts for simple tasks where a direct instruction would suffice
- Not testing prompts across a range of inputs — a prompt that works for one example may fail on edge cases
- Treating prompt engineering as a one-time task rather than an iterative process
- Mixing instructions and data in a prompt without clear delimiters — the model may confuse data for instructions

---

## Understanding Modern LLM APIs

AI Engineers interact with multiple LLM providers, each with distinct capabilities, pricing, and API designs. Anthropic's Claude models, OpenAI's GPT models, and Google's Gemini models are the three major providers as of 2025-2026. Each offers models at different capability and price points — choosing the right model for each task is an engineering decision, not a default.

**Model selection principles.** Not every task needs the most powerful (and expensive) model. A simple classification task may work with a smaller, cheaper model. A complex reasoning task may require a frontier model. Start with the smallest model that could work, evaluate quality, and scale up only if needed.

**Streaming responses.** For user-facing applications, streaming returns tokens as they are generated rather than waiting for the full response. This dramatically reduces perceived latency — the user sees output immediately rather than waiting seconds for the complete response.

\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant App as Application
    participant LLM as LLM API
    U->>App: Send question
    App->>LLM: POST /chat (prompt + system msg)
    LLM-->>App: Stream tokens
    App-->>U: Display response
    Note over App,LLM: Each call is stateless
\`\`\`

**Multi-turn conversations.** LLM APIs are stateless — each call is independent. To maintain a conversation, you must send the full conversation history with each request.

**Why it matters:** Choosing the right LLM provider and model for each task is a core AI Engineering skill. Understanding how different APIs work, how to manage conversations, and how to use streaming allows you to build responsive, cost-effective applications.

**Key things to understand:**
- Different providers offer models at different capability/cost trade-offs — evaluate before committing
- LLM APIs are stateless — multi-turn conversations require sending full history with each request
- Streaming reduces perceived latency for user-facing applications and should be used by default in UIs
- Token usage grows with each conversation turn — monitor and manage conversation length

**Common pitfalls:**
- Defaulting to the most expensive model without testing whether a smaller model would suffice
- Not implementing streaming in user-facing applications, creating poor user experience
- Forgetting that conversation history grows with each turn, eventually consuming the entire context window

---

## You're Ready for the Next Level When You Can...

- Explain the difference between AI, ML, deep learning, and generative AI without referring to notes — including why LLMs hallucinate
- Write a Python script that calls an LLM API, sends a prompt with a system message and user message, and prints the response
- Set up a Python virtual environment, install LLM SDK packages, and manage API keys securely with environment variables
- Describe what REST, GraphQL, gRPC, WebSocket, and Webhook are and give a real-world use case for each
- Write a zero-shot and a few-shot prompt for the same task and explain why the few-shot version produces more consistent output
- Explain what a token is and why token count matters for cost and context window management
- Build a simple multi-turn chatbot that maintains conversation history across API calls
- Compare the Anthropic and OpenAI SDK patterns and explain when to choose each
`,
  mid: `# AI Engineer – Mid Concept Reference

This level moves from understanding AI to building with it. You will go deeper into how LLMs actually work at a technical level — transformers, tokenisation, inference — and start connecting those mechanics to practical engineering decisions: how much does this prompt cost, why did the model ignore my instructions, why is the retrieval returning irrelevant results? You will also learn to build two of the most important architecture patterns in production AI engineering: RAG (Retrieval-Augmented Generation) and LangGraph-based agents. Think of this level as learning not just what the ingredients are, but how to combine them into something that reliably works.

## Learning Objectives

- Explain how transformer self-attention enables LLMs to capture long-range context, and why this matters for prompt design
- Describe what embeddings are and use cosine similarity to explain how semantic search works
- Implement a RAG pipeline from scratch: chunking, embedding, retrieval, and generation
- Build a simple LangGraph agent with state, conditional edges, and tool use
- Apply chain-of-thought prompting and context engineering techniques to improve LLM output quality
- Describe the training, loss function, gradient descent, and reinforcement learning concepts that underpin modern LLMs

---

## ML Foundations for AI Engineers — Training, Deep Learning, and Reinforcement Learning

As an AI Engineer, you did not train the LLMs you use — but you need to understand how they were trained to use them well. This section covers the machine learning concepts that explain why LLMs behave the way they do: why they sometimes confidently produce wrong answers, why fine-tuned models can outperform general models on narrow tasks, and why models trained with reinforcement learning from human feedback (RLHF) follow instructions better than base models.

**Training and inference.** Every ML model has two phases. In training, the model is shown labelled examples and adjusts its parameters to minimise a loss function — the measure of how wrong its predictions are. In inference, those trained parameters are fixed and the model uses them to make predictions on new inputs. When you call an LLM API, you are doing inference, not training.

**Deep learning and neural networks.** Deep learning uses layered neural networks. The fundamental unit is a neuron: it takes inputs, multiplies them by weights, adds a bias, and passes the result through a nonlinear activation function. Stacking many neurons into layers, and many layers into networks, produces models that can learn complex patterns directly from raw data — without manual feature engineering. The transformer architecture uses a specific type of layer called an attention layer, which enables each token to "look at" all other tokens when computing its representation.

**Gradient descent.** This is how neural networks learn. The training algorithm computes the gradient of the loss function — the direction in the parameter space that increases the error most steeply — then takes a step in the opposite direction. This process, repeated millions of times on batches of training data, gradually finds parameter values that produce accurate predictions. The learning rate controls step size: too large and training overshoots; too small and training never converges. Modern LLMs use Adam (adaptive momentum estimation), a smarter variant that accounts for the history of gradients to stabilise training.

**Reinforcement learning.** In supervised learning, a human labels correct answers and the model learns to reproduce them. In reinforcement learning (RL), the model learns by interacting with an environment and receiving rewards for good actions and penalties for poor ones. The key advantage: RL models are not bounded by what human labellers can produce. They can discover strategies that exceed human performance — as AlphaGo demonstrated by surpassing human Go champions through self-play. In LLM training, RLHF (reinforcement learning from human feedback) is used to teach models to follow instructions and avoid harmful outputs. Human raters compare model responses, creating a reward signal that guides the model toward preferred behaviour.

> **What you'll learn watching this:** This 34-minute video covers machine learning fundamentals specifically for AI Engineers — from linear models and loss functions through deep learning, neural network anatomy, gradient descent variants, and reinforcement learning — using the AlphaGo example to illustrate why RL can exceed supervised learning.

https://www.youtube.com/watch?v=BUTjcAjfMgY

**Why it matters:**
- Understanding gradient descent and loss functions explains why more training data generally produces better models — and why bad data produces bad models regardless of algorithm sophistication
- Knowing the difference between training and inference helps you make cost and latency decisions: inference is cheap; training is expensive
- The concept of overfitting (a model that memorises training data instead of generalising) directly affects how you evaluate and monitor LLM applications
- Reinforcement learning explains why ChatGPT follows instructions more reliably than base GPT models — RLHF is the mechanism that aligned the model to user intent
- Hyperparameters like learning rate, batch size, and dropout are terms you will encounter in fine-tuning documentation — knowing what they do at a conceptual level lets you evaluate fine-tuning configurations

---

## Machine Learning Concepts — The Vocabulary You Need

The ML landscape has a dense vocabulary. Understanding the core terms prevents you from being lost in documentation, papers, and team discussions. This is not about implementing these concepts — it is about knowing enough to reason clearly.

**Supervised, unsupervised, and reinforcement learning** are the three main paradigms. Supervised learning (roughly 70% of real-world ML) uses labelled data. Unsupervised learning finds structure in unlabelled data — clustering customers by behaviour, for example. Reinforcement learning learns through trial and error with rewards.

**The bias-variance tradeoff** is one of the most important concepts in ML. A high-bias model (like a linear regression on clearly non-linear data) is too simple — it underfits. A high-variance model (like a very deep network on a small dataset) is too complex — it overfits, memorising training noise instead of learning generalizable patterns. Finding the right complexity is the goal of model selection and regularisation.

**Overfitting and underfitting** translate directly to LLM applications. An LLM that has been fine-tuned on too little data will overfit — it will parrot training examples instead of generalising. A model used for a task it was not trained for will underfit — it will miss patterns it never had the opportunity to learn.

**Parameters and hyperparameters** are distinct. Parameters are the values the model learns from data (weights and biases). Hyperparameters are the settings you configure before training begins — learning rate, batch size, number of epochs, dropout rate. Getting hyperparameters right requires experimentation; getting parameters right is what training does automatically.

> **What you'll learn watching this:** This video covers all foundational ML terms in 22 minutes — algorithms, models, features, labels, training/test data, overfitting, bias-variance tradeoff, regularisation, gradient descent, evaluation metrics — with worked examples and clear visual analogies.

https://www.youtube.com/watch?v=Fa_V9fP2tpU

**Why it matters:**
- The bias-variance tradeoff underpins every decision about model complexity — from choosing a RAG chunk size to deciding whether fine-tuning is appropriate
- Knowing what a loss function is helps you interpret training logs and understand why a model improves (or fails to) during fine-tuning
- Feature engineering, though less relevant for LLMs than for traditional ML, still matters for structured data tasks you may build alongside an LLM pipeline
- Evaluation metrics (accuracy, precision, recall, F1, mean squared error) appear in LLM evaluation frameworks — you need to know what they measure
- Understanding data leakage (inadvertently including test data in training) explains why naive evaluation of LLM applications can produce misleadingly positive results

---

## Large Language Models — Architecture, Tokenisation and Inference (Deep Dive)

At the Mid level, you need to go beyond the Beginner-level overview and understand LLM internals well enough to make architectural decisions. This section builds on what you already know.

The transformer architecture uses **self-attention** to allow each token to weigh the relevance of every other token in the input. In practice, this is what enables an LLM to correctly resolve pronouns, follow instructions given earlier in the prompt, and connect concepts separated by hundreds of words. Earlier architectures (recurrent networks) processed tokens sequentially and struggled with long-range dependencies. Stacking many transformer blocks, scaling to billions of parameters, and training on trillions of tokens produces the emergent capabilities seen in frontier models.

**Tokenisation** matters more than most engineers realise. A GPT-family tokeniser produces roughly 1.3 tokens per English word on average — but unusual words, code, non-Latin scripts, and numbers often tokenise inefficiently. The sentence "the year 2024 was notable" may tokenise very differently from "2024". Understanding tokenisation helps you estimate whether a document fits in the context window, optimise prompts for cost, and avoid subtle bugs caused by tokenisation surprises.

**Inference sampling** determines how the model chooses the next token at each step. Temperature above 1.0 makes the probability distribution more uniform (more creative, more varied, more prone to hallucination). Temperature below 1.0 makes it more peaked (more deterministic, more focused, potentially more repetitive). Top-p sampling (nucleus sampling) restricts the candidate tokens to those whose cumulative probability exceeds a threshold. Both controls are available in most LLM APIs.

**Why it matters:** Understanding these mechanics lets you diagnose specific failure modes — a prompt that works at temperature 0.2 may fail at 0.9, a context window overflow may silently drop the most important instructions, a tokenisation mismatch may cause a retrieval system to miscalculate similarity scores.

**Key things to understand:**
- LLMs do not retrieve facts — they generate text statistically consistent with their training
- The context window is a hard limit — exceeding it silently drops content
- Token count affects cost and latency — optimise prompt length deliberately
- Temperature controls randomness; use lower values for factual, higher for creative tasks

**Common pitfalls:**
- Treating LLM output as factual without verification — hallucination is a design constraint, not a bug to be fixed
- Ignoring tokenisation when measuring prompt length, leading to unexpected truncation
- Assuming the model "understands" in a human sense — it pattern-matches against training, which produces different failure modes than human understanding

---

## Embeddings — What They Are and Why They Enable Semantic Search

An embedding is a dense numerical vector that represents a piece of text (or an image, or audio) in a high-dimensional space. The defining property of a good embedding space is that semantically similar items are geometrically close to each other.

To understand why this matters, contrast keyword search with semantic search. Keyword search finds documents that share exact words with the query. A search for "policy cancellation procedure" would miss a document titled "steps to terminate coverage" — even though they describe the same thing. Semantic search embeds both the query and the documents into the same vector space, then finds the documents whose vectors are most similar to the query vector. Semantically equivalent phrases end up near each other in the space, regardless of vocabulary.

Similarity is measured using **cosine similarity** — the cosine of the angle between two vectors. A cosine similarity of 1.0 means the vectors point in exactly the same direction (maximally similar). A score near 0 means they are unrelated. This measure is scale-invariant: a short query and a long document can still score high similarity if they discuss the same concepts.

The embedding model must be consistent: if you embed your knowledge base with one model, you must embed queries with the same model. Switching models (even to a newer, better one) requires re-embedding the entire knowledge base.

**Why it matters:** Embeddings are the core mechanism behind RAG, recommendation systems, duplicate detection, and similarity search. Without them, LLM applications that access external knowledge would be limited to brittle keyword matching.

**Key things to understand:**
- Embedding dimensionality (typically 384–4096) determines representation richness
- The same embedding model must be used for both indexing and querying
- Cosine similarity close to 1 means semantically similar, not identical

**Common pitfalls:**
- Embedding entire long documents as a single vector — chunking strategies significantly affect retrieval quality
- Using different embedding models for indexing and querying — produces nonsensical similarity scores
- Assuming high cosine similarity means factually correct — it means topically related, which is a weaker claim

---

## Prompt Engineering — Techniques, Patterns and Limitations

At the Mid level, you extend Beginner-level prompt engineering with more powerful techniques and a clearer understanding of the limits.

**Chain-of-thought (CoT) prompting** instructs the model to reason step by step before producing the final answer. Instead of "What is the best coverage for a small business?", you write "Think through the relevant risk factors step by step, then recommend coverage." CoT reliably improves accuracy on multi-step reasoning tasks, at the cost of longer outputs and higher token costs.

**Structural patterns.** Separate instructions from content using delimiters — XML tags (\`<document>...</document>\`), triple quotes, or markdown headers. This reduces ambiguity about what is instruction versus what is data. A system prompt that says \`Summarise the document below. <document>{doc}</document>\` is clearer than one that mixes instructions and content in flowing prose.

**Limitations are real.** Prompts shift probabilities — they do not deterministically control behaviour. The "lost in the middle" effect is well-documented: models attend less reliably to information placed in the middle of a long context than to information at the edges. Long prompts can cause earlier instructions to lose influence. No prompt can reliably override a model's safety training.

**Why it matters:** The prompt is your primary interface with the model. At the Mid level, you are building systems that process diverse real-world inputs — you need techniques robust enough to handle edge cases, not just the happy path.

**Key things to understand:**
- Prompt changes have non-linear effects — a small wording change can significantly alter output
- Chain-of-thought improves reasoning accuracy but adds output tokens and cost
- Version and test prompts like code — production prompt changes should be treated as code changes

**Common pitfalls:**
- Not testing prompts across a range of inputs — a prompt that works on one example may fail on edge cases
- Expecting prompts to be stable across model versions — prompts often need revision when the underlying model changes
- Over-engineering prompts for simple tasks where a direct instruction would suffice

---

## Context Engineering — Managing Context Windows Effectively

Context engineering is the discipline of deciding what information to include in the context window, in what order, and in what form. As LLM applications grow more complex, this becomes as important as the instructions themselves.

The context window is bounded — typically between 8,000 and 200,000 tokens depending on the model. It includes the system prompt, conversation history, retrieved documents, tool outputs, and the current user message. Exceeding the window causes truncation, silently dropping content the model needed to answer correctly.

Effective context engineering involves: selecting the most relevant retrieved chunks rather than returning everything, placing critical information at the beginning or end of the context (where models attend most reliably), compressing verbose content through summarisation, and pruning multi-turn conversation history to prevent it from consuming the entire window.

**Why it matters:** In complex applications, what goes into the context window is often more important than the prompt instructions. Poor context engineering fills the window with noise, causes truncation of important content, and produces unfocused responses that cannot be fixed by instruction changes alone.

**Key things to understand:**
- Every token in the context window costs money and latency — include only what is necessary
- Conversation history grows with each turn; prune or summarise older turns proactively
- Structured context (headers, labels, delimiters) helps the model parse multi-source input

**Common pitfalls:**
- Including full documents when only a paragraph is relevant, diluting the signal with noise
- Not testing context strategies across a range of query lengths and types

---

## Retrieval-Augmented Generation (RAG) — Architecture and Components

RAG is an architecture pattern that combines a retrieval system with a language model to ground generated responses in a specific, updatable knowledge base. It addresses the two core limitations of LLMs: their training data has a knowledge cutoff, and they hallucinate.

**How RAG works.** At indexing time, documents are split into chunks, each chunk is embedded with an embedding model, and the resulting vectors are stored in a vector database alongside the original text. At query time, the user's question is embedded with the same model, the vector database finds the most similar chunks, and those chunks are injected into the LLM's context window as grounding material before the model generates a response. The model is instructed to answer based on the retrieved context, not its parametric memory.

\`\`\`interactive-flow
ragPipeline
\`\`\`

**The pipeline has five failure points.** Chunking (splitting documents at the wrong boundaries can separate the information needed to answer the query). Embedding (using the wrong model, or a model mismatched to the domain, degrades retrieval). Retrieval (pure vector search misses exact-match queries that keyword search handles well — hybrid search combines both). Context injection (injecting too many chunks fills the window with noise). Generation (even with good context, the model may ignore it in favour of its training data if the prompt is not designed to prioritise retrieval).

**Why it matters:** RAG is the default starting point for most enterprise knowledge retrieval applications. It enables LLMs to answer questions about proprietary or recently updated information without retraining. It is faster and cheaper to iterate than fine-tuning, and it provides a natural audit trail (you can inspect what was retrieved).

**Key things to understand:**
- RAG does not prevent hallucination entirely — if retrieval fails, the model may still fabricate
- Hybrid search (vector + BM25 keyword) typically outperforms pure vector search
- Reranking retrieved chunks before injection is a common technique to improve relevance

**Common pitfalls:**
- Using fixed-size chunking without considering sentence or paragraph boundaries
- Returning too many chunks, filling the context window with noise
- Not evaluating retrieval quality independently — poor retrieval cannot be fixed by a better prompt

---

## LangGraph — Agent Graphs, State and Tool Use

LangGraph is a framework for building stateful, multi-step agent workflows as explicit directed graphs. It addresses the limitations of linear chain-based frameworks by allowing branching, looping, and conditional logic.

In LangGraph, a workflow is a graph where nodes are processing steps (LLM calls, tool calls, or custom functions) and edges define transitions between them. Edges can be conditional — the next node is selected based on the current state value. This enables: loops (retry a tool call until it succeeds), branching (choose between response strategies based on the model's output), and human-in-the-loop patterns (pause execution for human review before taking a consequential action).

State is the central concept. LangGraph maintains a typed state object that persists across all nodes. Each node reads from and writes to this state. Because state is explicit and inspectable, debugging is far more tractable than in agent systems where state is implicit.

Tool use is implemented by registering Python functions as tools the LLM can call. The LLM generates a structured tool call with arguments; LangGraph routes execution to the corresponding function, captures the result, and routes it back to the LLM for the next step.

\`\`\`mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Planning: User input received
    Planning --> Executing: Plan ready
    Executing --> Reflecting: Tool result returned
    Reflecting --> Planning: Needs more steps
    Reflecting --> Done: Task complete
    Done --> [*]
    Executing --> Executing: Retry on failure
\`\`\`

**Why it matters:** Most real agent workflows are not linear — they require loops, conditional logic, retries, and parallel steps. LangGraph provides the explicit graph structure needed to build these reliably, with inspectable state that makes debugging practical.

**Key things to understand:**
- Defining the state schema precisely is the most important design decision
- Conditional edges must handle all possible state values — unhandled transitions cause runtime errors
- LangGraph supports checkpointing — workflows can be paused and resumed across process boundaries

**Common pitfalls:**
- Building deeply nested graphs that are difficult to reason about — prefer flat graphs with well-named nodes
- Not handling tool call failures explicitly, allowing errors to corrupt agent state
- Conflating graph structure with business logic — nodes should have a single, clear responsibility

---

## AI-Assisted Development — Practical Workflow Integration

AI coding tools (GitHub Copilot, Claude, Cursor) are now standard in engineering workflows. Used well, they accelerate routine tasks; used carelessly, they introduce subtle bugs that are expensive to find later.

Code generation is strongest for well-defined, self-contained tasks: unit tests, known algorithms, format conversions, boilerplate. It is weakest for tasks requiring deep understanding of your specific codebase's conventions, subtle business logic, or novel algorithms. The more context you provide — function signature, expected behaviour, type definitions, example output — the better the results.

Security awareness is non-negotiable. AI-generated code should be reviewed with the same rigour as any other code. Models produce code with subtle security vulnerabilities, use deprecated APIs, and introduce logic errors that pass superficial review. Never merge code you do not understand.

**Why it matters:** AI coding tools multiply the output of engineers who understand what they are building, and multiply the risk for engineers who do not. The skill is learning when to trust, when to verify, and when to override the suggestion.

**Key things to understand:**
- These tools are multipliers, not replacements — they amplify productivity of engineers who already understand the problem
- Accepting suggestions without reading them is the primary way AI assistance introduces bugs
- Tools work best when your codebase is well-structured and well-named

**Common pitfalls:**
- Using generated code in security-sensitive contexts without thorough review
- Letting AI tools become a crutch that prevents developing genuine understanding of the system
- Not customising tool configuration to match the project's conventions

---

## You're Ready for the Next Level When You Can...

- Explain how transformer self-attention enables long-range context capture, and why the "lost in the middle" effect occurs
- Implement a working RAG pipeline: chunk a document, embed the chunks, store in a vector index, retrieve by cosine similarity, inject context, and generate a grounded response
- Build a LangGraph agent with at least two conditional edges and one tool call, and explain how state flows through the graph
- Explain what gradient descent is and why the learning rate matters, without needing to implement it
- Describe the difference between supervised learning and reinforcement learning, and explain why RLHF produces more instruction-following LLMs
- Apply chain-of-thought prompting and explain the trade-off in output length and cost
`,
  senior: `# AI Engineer – Senior Concept Reference

This level is about production engineering and organisational impact. You can already build RAG pipelines and agents — now you need to build them in ways that are secure, reliable, measurable, and defensible to both engineers and regulators. At this level you are also expected to make architectural recommendations, evaluate governance trade-offs, and understand the legal landscape that governs AI systems in your organisation. Think of the difference between someone who can cook a meal and a professional chef who runs a kitchen: the technical skills overlap, but the senior role requires broader judgment, risk awareness, and accountability.

## Learning Objectives

- Design a production-grade LLM agent architecture with appropriate guardrails, least-privilege tool access, and human-in-the-loop checkpoints
- Identify direct and indirect prompt injection vulnerabilities and apply layered mitigation strategies
- Evaluate RAG pipeline quality using RAGAS metrics and explain what each metric measures
- Explain when fine-tuning is appropriate versus prompt engineering or RAG, and describe the LoRA approach at a conceptual level
- Apply AI architecture patterns to system design and justify the choice between RAG, fine-tuning, agents, and hybrid approaches
- Describe the EU AI Act's risk classification and explain what high-risk status means for insurance AI systems
- Apply the Secure AI Framework's nine areas to a real project

---

## LLM Agent Architecture – Planning, Memory, Tools and Orchestration

An LLM agent is a system in which a language model acts as the reasoning engine for a loop that perceives inputs, decides on actions, executes those actions through tools, and updates its understanding based on the results. Designing a production-grade agent requires explicit decisions about planning, memory, tools, and orchestration — each of which has significant implications for reliability, cost, and security.

Planning is how the agent decides what to do next. Simple agents use a single-pass prompt; more capable agents use multi-step reasoning strategies such as ReAct (Reasoning and Acting), which interleaves thoughts and tool calls, or Plan-and-Execute, which separates high-level planning from step-level execution. The planning strategy must match the complexity of the task and the reliability requirements of the system.

Memory has several forms. In-context memory is the information held in the current context window — it is temporary and bounded. External memory is a persistent store (such as a vector database or relational database) that the agent retrieves from and writes to. Episodic memory records past interactions to inform future ones. Semantic memory holds factual knowledge. Production agents typically combine in-context and external memory, with careful control over what is retrieved into context.

Tools are the interfaces through which the agent acts on the world — calling APIs, querying databases, running code, reading files. Each tool is a potential attack surface and failure point. Tools must have clear input validation, enforced scope limits, and safe error handling.

Orchestration governs how the planning-execution loop runs, how state is passed between steps, and how errors trigger retries or escalations. Frameworks such as LangGraph provide the graph-based structure needed for complex orchestration with explicit state. Multi-agent systems extend this further by having multiple specialised agents collaborate — one agent may plan while another executes, or a supervisor agent may delegate subtasks to worker agents. Multi-agent architectures increase capability at the cost of significantly increased debugging complexity and communication overhead between agents.

\`\`\`mermaid
flowchart TB
    User["User Request"] --> Supervisor["Supervisor Agent"]
    Supervisor --> Planner["Planner Agent"]
    Supervisor --> Researcher["Research Agent"]
    Supervisor --> Writer["Writer Agent"]
    Planner --> Supervisor
    Researcher --> Tools["Tools & APIs"]
    Tools --> Researcher
    Researcher --> Supervisor
    Writer --> Supervisor
    Supervisor --> Response["Final Response"]
\`\`\`

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

The organisation's AI Policy establishes the governance framework for all AI use within the organisation. The policy document is available via your organisation's internal intranet. Key principles are summarised here.

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

\`\`\`mermaid
flowchart LR
    Q["Test Questions"] --> RAG["RAG Pipeline"]
    RAG --> Out["Generated Answers"]
    Out --> Eval["Evaluation Framework"]
    GT["Ground Truth"] --> Eval
    Ctx["Retrieved Context"] --> Eval
    Eval --> F["Faithfulness"]
    Eval --> R["Answer Relevancy"]
    Eval --> CP["Context Precision"]
    Eval --> CR["Context Recall"]
\`\`\`

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
