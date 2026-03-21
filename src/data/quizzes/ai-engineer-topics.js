export const topicQuizzes = {
  beginner: [
    {
      topicId: "what-is-generative-ai",
      topicTitle: "What is Generative AI — and Where Does It Fit?",
      objectiveIndex: 0,
      questions: [
        {
          question: "Which of the following best describes the relationship between AI, ML, deep learning, and generative AI?",
          options: [
            "They are four unrelated fields that emerged independently",
            "They are nested subsets: AI contains ML, which contains deep learning, which contains generative AI",
            "Generative AI is the broadest category and encompasses all other fields",
            "ML and deep learning are synonyms; generative AI is a subset of AI"
          ],
          correctIndex: 1,
          explanation: "The AI landscape is structured like nested circles — AI is the outermost, then ML, then deep learning, then generative AI. Each is a specialised subset of the one above it."
        },
        {
          question: "A spam filter trained on thousands of labelled spam and non-spam emails belongs to which category?",
          options: [
            "Generative AI",
            "Rule-based AI",
            "Machine learning",
            "Deep learning"
          ],
          correctIndex: 2,
          explanation: "Training on labelled examples to learn patterns is the definition of machine learning. The spam filter learns from data rather than following hand-coded rules."
        },
        {
          question: "Why do large language models sometimes produce text that sounds correct but is factually wrong?",
          options: [
            "They retrieve from an outdated database",
            "They generate text by predicting statistically likely next tokens, not by retrieving verified facts",
            "Their training data always contains misinformation",
            "They are programmed to produce creative rather than accurate answers"
          ],
          correctIndex: 1,
          explanation: "LLMs predict the most statistically likely next token given what came before — similar to autocomplete. This means they can produce plausible-sounding but factually incorrect text, known as hallucination."
        },
        {
          question: "Which of the following is an example of generative AI?",
          options: [
            "A chess engine that follows hand-coded rules to select moves",
            "A convolutional neural network that classifies images as cats or dogs",
            "A system that writes a cover letter from a job description",
            "A spam filter trained on labelled email examples"
          ],
          correctIndex: 2,
          explanation: "Generative AI creates new content (text, images, audio). Writing a cover letter is generation of new content. The other options are rule-based AI, image classification (deep learning), and supervised ML respectively."
        },
        {
          question: "What key shift did foundation models like GPT-4 and Claude introduce for software engineers?",
          options: [
            "They required engineers to train their own models from scratch",
            "They made powerful AI capabilities accessible through a simple API call",
            "They eliminated the need to understand tokenisation or context windows",
            "They replaced APIs with direct database queries"
          ],
          correctIndex: 1,
          explanation: "Foundation models changed the AI adoption curve by making powerful generative AI accessible through an API call — this is the shift that created the AI Engineer role. Engineers no longer need to train models to leverage advanced AI capabilities."
        }
      ]
    },
    {
      topicId: "how-llms-work",
      topicTitle: "How LLMs Work — A Simplified Overview",
      objectiveIndex: 1,
      questions: [
        {
          question: "What is the key innovation of the transformer architecture introduced in 2017?",
          options: [
            "Processing tokens sequentially to maintain order",
            "Using a self-attention mechanism that allows each token to weigh every other token's relevance",
            "Storing factual knowledge in a relational database for fast retrieval",
            "Using convolutional layers to identify patterns in text"
          ],
          correctIndex: 1,
          explanation: "The transformer's key innovation is self-attention, which allows every token in the input to weigh the importance of every other token. This enables the model to capture long-range relationships and process input in parallel."
        },
        {
          question: "What is a token in the context of LLMs?",
          options: [
            "A single word in the input text",
            "A sentence boundary marker",
            "A numerical representation of a small chunk of text, which may be part of a word",
            "An API authentication credential"
          ],
          correctIndex: 2,
          explanation: "Tokens are small chunks of text — numerical representations the model operates on. A word might be one token, or a rare word might be split into several. Tokens are not words, which matters for cost estimation and context window management."
        },
        {
          question: "What happens when content exceeds an LLM's context window?",
          options: [
            "The model compresses the content to fit",
            "The model raises an error and stops processing",
            "The content beyond the window is silently invisible to the model",
            "The model automatically retrieves the missing content from the internet"
          ],
          correctIndex: 2,
          explanation: "The context window is a hard limit. Content beyond it is simply invisible to the model — there is no compression or error. This makes managing what goes into the context window a critical engineering skill."
        },
        {
          question: "How does temperature affect LLM output generation?",
          options: [
            "Higher temperature makes output more deterministic and focused",
            "Lower temperature makes output more varied and creative",
            "Temperature has no effect on output quality, only on speed",
            "Lower temperature produces more deterministic output; higher temperature produces more varied output"
          ],
          correctIndex: 3,
          explanation: "Temperature controls randomness in token selection. Low temperature (close to 0) makes the model more deterministic and focused — good for factual tasks. High temperature makes output more varied and creative — but also more prone to errors."
        },
        {
          question: "A developer assumes the LLM remembers the conversation from yesterday's session. What is wrong with this assumption?",
          options: [
            "Nothing — LLMs maintain full conversation history across sessions by default",
            "LLM APIs are stateless; each call is independent unless conversation history is explicitly included",
            "LLMs remember context for 24 hours before it expires",
            "Only paid API tiers maintain conversation history"
          ],
          correctIndex: 1,
          explanation: "Each LLM API call is independent and stateless. The model has no memory of previous conversations unless you explicitly include that history in the current context window. This is a common pitfall for engineers new to LLM development."
        }
      ]
    },
    {
      topicId: "machine-learning-literacy",
      topicTitle: "Machine Learning Literacy — What You Need as an AI Engineer",
      objectiveIndex: 0,
      questions: [
        {
          question: "What are the four components of any ML system as described in the content?",
          options: [
            "Input, processing, output, and feedback",
            "Data, algorithm, model, and training/evaluation",
            "Neurons, layers, weights, and activations",
            "Training, validation, testing, and deployment"
          ],
          correctIndex: 1,
          explanation: "The four components of any ML system are: data (examples to learn from), algorithm (the mathematical process), model (the trained function), and training and evaluation (the teaching and measurement cycle)."
        },
        {
          question: "Which type of machine learning uses labelled examples — such as photos tagged as 'cat' or 'dog'?",
          options: [
            "Unsupervised learning",
            "Reinforcement learning",
            "Supervised learning",
            "Transfer learning"
          ],
          correctIndex: 2,
          explanation: "Supervised learning uses labelled examples — the model learns to predict the label for new, unseen examples. It accounts for roughly 70% of real-world ML applications."
        },
        {
          question: "How does Reinforcement Learning from Human Feedback (RLHF) make LLMs more useful?",
          options: [
            "It increases the model's training dataset size exponentially",
            "Human raters compare model responses, creating a reward signal that teaches the model to follow instructions better",
            "It automatically corrects factual errors in model outputs",
            "It reduces the model's parameter count to improve efficiency"
          ],
          correctIndex: 1,
          explanation: "RLHF uses human raters to compare model responses, creating a reward signal that guides the model toward preferred behaviour. This is what makes modern LLMs follow instructions more reliably than base pre-trained models."
        },
        {
          question: "When you call an LLM API, are you performing training or inference?",
          options: [
            "Training, because the model improves from your input",
            "Inference, because the trained parameters are fixed and used to generate output",
            "Both — each API call triggers a mini training cycle",
            "Neither — API calls are a separate category from ML operations"
          ],
          correctIndex: 1,
          explanation: "API calls are inference — the model's trained parameters are fixed, and the model uses them to produce output for new inputs. Training is the expensive phase where parameters are adjusted; inference is the production phase."
        },
        {
          question: "What is the key insight behind the phrase 'garbage in, garbage out' in ML?",
          options: [
            "ML models discard irrelevant features automatically",
            "Data quality is the single most important factor in model performance",
            "Models trained on large datasets always outperform those trained on small ones",
            "Output quality depends solely on the algorithm, not the data"
          ],
          correctIndex: 1,
          explanation: "Data quality is the most important factor in ML model performance. Even the most sophisticated algorithms cannot compensate for poor, biased, or incorrectly labelled training data. This applies directly to any model you fine-tune."
        }
      ]
    },
    {
      topicId: "apis-and-ai-services",
      topicTitle: "APIs and AI Services — How Systems Talk to Each Other",
      objectiveIndex: 2,
      questions: [
        {
          question: "What is the most accurate analogy for an API?",
          options: [
            "A storage system that holds data for later retrieval",
            "A restaurant menu that defines what you can order, what to provide, and what you receive back",
            "A programming language used to write server-side applications",
            "A network protocol for encrypting data in transit"
          ],
          correctIndex: 1,
          explanation: "An API is a contract between two systems defining how they communicate — like a restaurant menu that tells you what operations are available, what input is required, and what response to expect, without revealing what happens in the kitchen."
        },
        {
          question: "Most LLM APIs (OpenAI, Anthropic) use which API style?",
          options: [
            "GraphQL",
            "gRPC",
            "REST",
            "WebSocket"
          ],
          correctIndex: 2,
          explanation: "Most LLM APIs are REST APIs — they use standard HTTP methods (POST for sending prompts) and return JSON responses. Understanding REST at the HTTP level helps you debug authentication failures, parse error codes, and understand rate limiting."
        },
        {
          question: "A developer wants real-time bidirectional communication for a chat application. Which API style is most appropriate?",
          options: [
            "REST — it handles all real-time scenarios",
            "GraphQL — it was designed for real-time data",
            "WebSocket — it enables persistent bidirectional connections",
            "gRPC — it is the fastest protocol available"
          ],
          correctIndex: 2,
          explanation: "WebSocket enables real-time, bidirectional communication over a persistent connection. Chat applications use WebSocket because HTTP request-response would be too slow for live, interactive messaging."
        },
        {
          question: "A CI/CD pipeline should be notified automatically when code is pushed to a repository. Which API style handles this?",
          options: [
            "REST polling — the pipeline repeatedly asks 'did anything change?'",
            "GraphQL — it supports subscription-based events",
            "Webhook — the remote service calls your endpoint when the event occurs",
            "gRPC — it supports server-side push natively"
          ],
          correctIndex: 2,
          explanation: "Webhooks are event-driven: the remote service (GitHub) calls your endpoint when something happens (code is pushed), eliminating the need for your code to poll for changes. This is how GitHub notifies CI pipelines of new commits."
        },
        {
          question: "Why must error handling for rate limits be built into any production LLM application?",
          options: [
            "Rate limits only apply during development, not production",
            "LLM APIs enforce usage quotas and return errors when exceeded — unhandled rate limits cause application failures under load",
            "Rate limits are automatically handled by LLM SDKs with no engineering required",
            "Rate limits only affect streaming responses, not standard requests"
          ],
          correctIndex: 1,
          explanation: "LLM APIs enforce usage quotas. When exceeded, the API returns an error (typically 429 Too Many Requests). Without explicit rate limit handling (retry with backoff), applications will fail under load — this is a common production failure mode."
        }
      ]
    },
    {
      topicId: "introduction-to-prompt-engineering",
      topicTitle: "Introduction to Prompt Engineering",
      objectiveIndex: 4,
      questions: [
        {
          question: "What is zero-shot prompting?",
          options: [
            "Providing zero context to make the model generate the most creative output",
            "Describing the task directly without providing any worked examples",
            "Using a temperature of 0 to produce deterministic output",
            "Sending an empty prompt to test the model's default behaviour"
          ],
          correctIndex: 1,
          explanation: "Zero-shot prompting describes the task directly without providing examples — for instance, 'Summarise this document in three bullet points'. It works well for straightforward tasks where the model's training provides sufficient context."
        },
        {
          question: "Why is few-shot prompting often more effective than adding more instructions?",
          options: [
            "Instructions are more expensive in tokens than examples",
            "The model infers the expected pattern from examples rather than parsing verbose prose instructions",
            "Models are trained to ignore instructions longer than 100 words",
            "Few-shot prompts run faster because they use less compute"
          ],
          correctIndex: 1,
          explanation: "Few-shot prompting (2–5 worked examples) allows the model to infer the expected input-output format, style, and level of detail. This is often more effective than writing long explicit instructions because the model learns from demonstration."
        },
        {
          question: "Which type of prompt instruction is more reliable: 'Do not include any personal information' or 'Respond only with the applicant's professional qualifications'?",
          options: [
            "The negative instruction — models are trained to follow prohibitions more strictly",
            "The positive instruction — positive instructions ('respond only with...') are more reliable than negative ones",
            "They are equally reliable for all models",
            "Neither — structured output formats should be used instead of any instructions"
          ],
          correctIndex: 1,
          explanation: "Positive instructions ('respond only with...') are more reliable than negative ones ('do not include...'). The content emphasises this as a key principle of effective prompt engineering."
        },
        {
          question: "A developer writes a prompt, tests it on three examples, it works perfectly, and declares it production-ready. What critical step did they skip?",
          options: [
            "Adding role prompting to improve style",
            "Testing across a range of inputs including edge cases — a prompt that works on a few examples may fail on others",
            "Converting the prompt to use structured JSON output",
            "Reducing the temperature to 0 for deterministic output"
          ],
          correctIndex: 1,
          explanation: "Prompts must be tested across a range of inputs, including edge cases. A prompt that works for a few happy-path examples will frequently fail on real-world variation. This is one of the most common prompt engineering pitfalls."
        },
        {
          question: "What is the purpose of role prompting — for example, 'You are a senior claims analyst with 10 years of experience'?",
          options: [
            "It grants the model access to a specific database of claims data",
            "It forces the model to use only the persona's exact knowledge, preventing hallucination",
            "It influences the model's vocabulary, technical detail, and perspective to target a specific audience or domain",
            "It increases the model's token limit for the conversation"
          ],
          correctIndex: 2,
          explanation: "Role prompting frames the model as a particular persona, influencing its vocabulary, level of technical detail, and perspective. It is a useful way to target a specific audience or domain without writing lengthy style instructions."
        }
      ]
    }
  ],
  mid: [
    {
      topicId: "ml-foundations",
      topicTitle: "ML Foundations for AI Engineers — Training, Deep Learning, and Reinforcement Learning",
      objectiveIndex: 5,
      questions: [
        {
          question: "What is the loss function in machine learning?",
          options: [
            "The number of parameters the model discards during training",
            "A measure of how wrong the model's predictions are, used to guide parameter updates",
            "The rate at which the model forgets old training data",
            "The cost of running inference on the trained model"
          ],
          correctIndex: 1,
          explanation: "The loss function measures how wrong the model's predictions are. During training, the algorithm adjusts model parameters to minimise this loss. Understanding the loss function explains why more quality data generally improves model performance."
        },
        {
          question: "What is gradient descent and what does the learning rate control?",
          options: [
            "A data preprocessing step; learning rate controls dataset size",
            "An algorithm that adjusts parameters in the direction that reduces loss; learning rate controls step size",
            "A regularisation technique; learning rate controls model complexity",
            "A sampling method; learning rate controls output randomness"
          ],
          correctIndex: 1,
          explanation: "Gradient descent computes the gradient of the loss function and takes a step in the opposite direction (downhill). The learning rate controls how large each step is — too large overshoots, too small never converges."
        },
        {
          question: "Why does AlphaGo illustrate the advantage of reinforcement learning over supervised learning?",
          options: [
            "AlphaGo used more labelled training data than any supervised system",
            "Reinforcement learning models are bounded by human-labelled examples, which AlphaGo avoided",
            "RL is not bounded by what human labellers can produce — it discovered strategies exceeding human performance through self-play",
            "AlphaGo used supervised learning exclusively and never used reinforcement learning"
          ],
          correctIndex: 2,
          explanation: "Reinforcement learning learns through trial and error with rewards, and is not bounded by what human labellers can produce. AlphaGo surpassed human Go champions through RL self-play — discovering strategies no human labeller could have demonstrated."
        },
        {
          question: "What is the fundamental unit of a neural network, and what does it do?",
          options: [
            "A layer — it groups tokens by semantic similarity",
            "A neuron — it takes inputs, multiplies by weights, adds a bias, and passes through an activation function",
            "A parameter — it stores factual knowledge from training data",
            "A token — it represents a chunk of text for processing"
          ],
          correctIndex: 1,
          explanation: "A neuron is the fundamental unit of a neural network. It takes inputs, multiplies them by weights, adds a bias, and passes the result through a nonlinear activation function. Stacking neurons into layers and layers into networks enables learning complex patterns."
        },
        {
          question: "Why does understanding training vs inference matter for cost decisions when using LLM APIs?",
          options: [
            "Training API calls are cheaper than inference calls",
            "Inference is expensive and dominates LLM costs; training is cheap",
            "Training is expensive; inference (API calls) is comparatively cheap",
            "Both phases have identical costs at scale"
          ],
          correctIndex: 2,
          explanation: "Training is extremely expensive (GPU clusters running for weeks or months). Inference — what happens when you call an LLM API — is comparatively cheap. Understanding this helps make cost and architecture decisions, and explains why most AI Engineers use pre-trained models rather than training their own."
        }
      ]
    },
    {
      topicId: "machine-learning-concepts",
      topicTitle: "Machine Learning Concepts — The Vocabulary You Need",
      objectiveIndex: 5,
      questions: [
        {
          question: "What is the bias-variance tradeoff?",
          options: [
            "The tradeoff between model accuracy and training speed",
            "The tradeoff between model size and inference cost",
            "The tradeoff between underfitting (too simple, high bias) and overfitting (too complex, high variance)",
            "The tradeoff between labelled and unlabelled training data"
          ],
          correctIndex: 2,
          explanation: "The bias-variance tradeoff describes the tension between underfitting (high bias — model too simple) and overfitting (high variance — model memorises training noise). Finding the right complexity is the goal of model selection and regularisation."
        },
        {
          question: "An LLM fine-tuned on very little domain data performs worse on real inputs than the base model did. What ML concept explains this?",
          options: [
            "Underfitting — the model is too simple for the domain",
            "Overfitting — the model memorised the small training set instead of learning generalisable patterns",
            "Data poisoning — the training data contained adversarial examples",
            "Gradient explosion — the learning rate was set too high"
          ],
          correctIndex: 1,
          explanation: "Overfitting occurs when a model memorises training examples rather than learning generalisable patterns. An LLM fine-tuned on insufficient data will parrot training examples, performing worse on real-world inputs than the base model."
        },
        {
          question: "What is the difference between parameters and hyperparameters?",
          options: [
            "Parameters are set before training; hyperparameters are learned from data",
            "Parameters are learned from data (weights, biases); hyperparameters are set before training (learning rate, batch size)",
            "They are synonyms for the same concept",
            "Parameters are stored on disk; hyperparameters are stored in memory during training"
          ],
          correctIndex: 1,
          explanation: "Parameters (weights and biases) are what the model learns automatically from data. Hyperparameters (learning rate, batch size, epochs) are settings configured before training begins and require experimentation to optimise."
        },
        {
          question: "What does data leakage mean in ML evaluation, and why does it produce misleadingly positive results?",
          options: [
            "Training data leaks into the model's outputs at inference time",
            "Test data is inadvertently included in training data, so the model appears to generalise when it has simply memorised the test set",
            "Sensitive training data is exposed through model outputs to unauthorised users",
            "The evaluation dataset is too small to be statistically significant"
          ],
          correctIndex: 1,
          explanation: "Data leakage occurs when test data inadvertently appears in the training set. The model appears to generalise well on evaluation because it has already 'seen' those examples — producing a misleadingly positive quality picture that collapses on truly unseen data."
        },
        {
          question: "Precision and recall are mentioned as evaluation metrics. Which scenario demands high recall even at the expense of precision?",
          options: [
            "A spam filter that should avoid flagging legitimate emails",
            "A cancer screening test that must not miss any true positive cases",
            "A recommendation engine that should only suggest highly relevant items",
            "A code generation tool that should only output compiling code"
          ],
          correctIndex: 1,
          explanation: "High recall means capturing as many true positives as possible, even if it means more false positives. A cancer screening test must not miss real cases (high recall), even if it produces some false alarms (lower precision). The cost of a missed positive vastly exceeds the cost of a false alarm."
        }
      ]
    },
    {
      topicId: "llm-architecture-deep-dive",
      topicTitle: "Large Language Models — Architecture, Tokenisation and Inference (Deep Dive)",
      objectiveIndex: 0,
      questions: [
        {
          question: "How does self-attention enable LLMs to resolve pronouns correctly in long sentences?",
          options: [
            "It stores a separate pronoun resolution table trained on grammatical rules",
            "Each token can weigh the relevance of every other token in the input, connecting the pronoun to its referent regardless of distance",
            "It uses a sliding window that processes pronoun resolution in a fixed neighbourhood",
            "Pronoun resolution is handled by the tokeniser before the attention layers"
          ],
          correctIndex: 1,
          explanation: "Self-attention allows each token to weigh every other token's relevance when computing its representation. This enables LLMs to connect a pronoun to its referent even if they are hundreds of words apart — a capability earlier recurrent architectures struggled with."
        },
        {
          question: "A GPT-family tokeniser produces roughly how many tokens per English word on average?",
          options: [
            "Exactly 1 — each word is one token",
            "Approximately 1.3 tokens per word",
            "Approximately 3 tokens per word",
            "Approximately 0.5 tokens per word — most words share tokens"
          ],
          correctIndex: 1,
          explanation: "GPT-family tokenisers produce approximately 1.3 tokens per English word on average. However, unusual words, code, non-Latin scripts, and numbers often tokenise less efficiently. This matters for cost estimation and context window calculations."
        },
        {
          question: "What is the 'lost in the middle' effect?",
          options: [
            "Tokens in the middle of a word are tokenised less accurately",
            "The model attends less reliably to information placed in the middle of a long context than to content at the edges",
            "Context windows lose tokens during very long conversations",
            "Gradient descent converges more slowly for middle-layer parameters"
          ],
          correctIndex: 1,
          explanation: "The 'lost in the middle' effect is well-documented: models attend less reliably to information placed in the middle of a long context than to content at the beginning or end. This has practical implications for how you structure the context window."
        },
        {
          question: "What does top-p (nucleus) sampling do during LLM inference?",
          options: [
            "It selects only the single highest-probability token at each step",
            "It restricts candidate tokens to those whose cumulative probability exceeds a threshold",
            "It increases the probability of rare tokens to improve diversity",
            "It caps output length at the top-p percentile of typical response lengths"
          ],
          correctIndex: 1,
          explanation: "Top-p (nucleus) sampling restricts the candidate tokens at each generation step to those whose cumulative probability exceeds a threshold p. This focuses generation on plausible tokens while still allowing variation — it is available alongside temperature in most LLM APIs."
        },
        {
          question: "A developer sets temperature to 0.9 for a task that requires accurate factual answers. What failure mode is most likely?",
          options: [
            "The output will be too deterministic and repetitive",
            "The model will refuse to answer due to safety filters",
            "High temperature increases randomness, making the output more prone to hallucination on factual tasks",
            "The API will reject requests with temperature above 0.5"
          ],
          correctIndex: 2,
          explanation: "High temperature makes the probability distribution over tokens more uniform, increasing randomness and creativity — but also increasing hallucination on factual tasks. For factual, accurate output, low temperature (close to 0) produces more focused, deterministic responses."
        }
      ]
    },
    {
      topicId: "embeddings-and-semantic-search",
      topicTitle: "Embeddings — What They Are and Why They Enable Semantic Search",
      objectiveIndex: 1,
      questions: [
        {
          question: "What is an embedding in the context of LLM applications?",
          options: [
            "A compressed version of the model weights stored on disk",
            "A dense numerical vector representing a piece of text in a high-dimensional space where similar items are geometrically close",
            "A binary encoding of tokens used to reduce API payload size",
            "A positional marker added to each token during the attention calculation"
          ],
          correctIndex: 1,
          explanation: "An embedding is a dense numerical vector representing text (or other content) in a high-dimensional space. The defining property is that semantically similar items are geometrically close to each other, enabling similarity search."
        },
        {
          question: "Why would keyword search fail to match a query for 'policy cancellation procedure' with a document titled 'steps to terminate coverage'?",
          options: [
            "Keyword search is not supported by vector databases",
            "The documents use different vocabulary to describe the same concept, so no exact word overlap triggers a match",
            "The document title is too short to be indexed by keyword search",
            "Keyword search only works on structured data, not free text"
          ],
          correctIndex: 1,
          explanation: "Keyword search requires exact word matches. 'Policy cancellation procedure' and 'steps to terminate coverage' share no common keywords despite describing the same thing. Semantic search uses embeddings to find conceptually similar content regardless of vocabulary."
        },
        {
          question: "What does a cosine similarity score close to 1.0 between two vectors indicate?",
          options: [
            "The two texts are identical character-for-character",
            "The vectors point in nearly the same direction, meaning the texts are semantically similar",
            "The texts are completely unrelated",
            "One text is a subset of the other"
          ],
          correctIndex: 1,
          explanation: "Cosine similarity measures the cosine of the angle between two vectors. A score close to 1.0 means the vectors point in nearly the same direction — semantically similar content. It is scale-invariant, so a short query and a long document can still score high similarity."
        },
        {
          question: "A team switches from embedding model A to a newer embedding model B without re-embedding their knowledge base. What problem will occur?",
          options: [
            "The system will work correctly because all embedding models use the same vector space",
            "The similarity scores will be nonsensical because the query and document embeddings come from different vector spaces",
            "Only embeddings of rare words will be affected",
            "The system will automatically detect the mismatch and fall back to keyword search"
          ],
          correctIndex: 1,
          explanation: "The embedding model must be consistent: query and document embeddings must come from the same model. Different models produce incompatible vector spaces — comparing embeddings across models produces meaningless similarity scores."
        },
        {
          question: "Why does embedding an entire long document as a single vector degrade retrieval quality?",
          options: [
            "Long documents exceed the maximum vector dimensionality",
            "A single vector averages out the document's meaning, losing the specific information needed to match targeted queries",
            "Embedding models cannot process documents longer than 512 characters",
            "Single-vector embeddings are not compatible with cosine similarity"
          ],
          correctIndex: 1,
          explanation: "Embedding a long document as a single vector averages out all its content, diluting specific information. A query about one specific detail will have a low similarity score against the averaged vector even if that detail is in the document. Chunking strategies significantly affect retrieval quality."
        }
      ]
    },
    {
      topicId: "prompt-engineering-techniques",
      topicTitle: "Prompt Engineering — Techniques, Patterns and Limitations",
      objectiveIndex: 4,
      questions: [
        {
          question: "What is chain-of-thought (CoT) prompting and when is it most valuable?",
          options: [
            "Linking multiple prompts in a chain to reduce individual prompt complexity",
            "Instructing the model to reason step by step before producing the final answer — most valuable for multi-step reasoning tasks",
            "Using a chain of few-shot examples to establish output format",
            "Connecting multiple model outputs into a single response"
          ],
          correctIndex: 1,
          explanation: "Chain-of-thought prompting instructs the model to reason step by step before giving a final answer. It reliably improves accuracy on multi-step reasoning tasks, at the cost of longer outputs and higher token costs."
        },
        {
          question: "What is the 'lost in the middle' effect and how should it inform prompt design?",
          options: [
            "Models forget prompts longer than 1000 tokens; keep all prompts short",
            "Models attend less reliably to content in the middle of a long context — place critical information at the beginning or end",
            "Models mix up information from different user turns placed in the middle of a conversation",
            "Middle tokens are charged at a higher rate by LLM APIs"
          ],
          correctIndex: 1,
          explanation: "Models attend less reliably to information placed in the middle of a long context than at the edges. This is a documented limitation — engineers should place critical instructions and content at the beginning or end of the context window."
        },
        {
          question: "Why should prompts be versioned and treated like code?",
          options: [
            "LLM APIs require prompt versioning as a mandatory parameter",
            "Prompts often need revision when the underlying model changes, and production prompt changes can break applications just like code changes",
            "Versioning reduces token costs by caching repeated prompts",
            "Unversioned prompts are rejected by the model's safety filters"
          ],
          correctIndex: 1,
          explanation: "Prompts often need revision when the underlying model changes — a prompt tuned for one model version may fail on the next. Production prompt changes should be treated with the same rigour as code changes: tested, versioned, and reviewed."
        },
        {
          question: "A developer uses XML tags to separate instructions from content in a prompt. What problem does this solve?",
          options: [
            "It reduces the token count by compressing whitespace",
            "It prevents the model from processing the content at all",
            "It reduces ambiguity about what is instruction versus what is data, producing more consistent model behaviour",
            "It encrypts the content portion of the prompt for security"
          ],
          correctIndex: 2,
          explanation: "Using delimiters like XML tags (<document>...</document>) clearly separates instructions from content, reducing ambiguity. A structured prompt is less likely to be misinterpreted — the model knows which parts are instructions and which are data to process."
        },
        {
          question: "Prompts 'shift probabilities — they do not deterministically control behaviour.' What does this mean for production systems?",
          options: [
            "Prompts are unreliable and should not be used in production",
            "The same prompt can produce different outputs across runs — production systems must handle non-determinism through testing, validation, and retry logic",
            "Temperature must be set to 0 in production to make prompts deterministic",
            "Prompts only work deterministically when combined with structured output formats"
          ],
          correctIndex: 1,
          explanation: "Prompts shift the probability distribution of model outputs — they do not guarantee a specific output. The same prompt can produce different results across runs. Production systems must account for this through extensive testing across input ranges and output validation."
        }
      ]
    },
    {
      topicId: "context-engineering",
      topicTitle: "Context Engineering — Managing Context Windows Effectively",
      objectiveIndex: 4,
      questions: [
        {
          question: "What is context engineering?",
          options: [
            "The practice of training custom context-aware models",
            "The discipline of deciding what information to include in the context window, in what order, and in what form",
            "A technique for extending the context window beyond its hard limit",
            "The process of converting natural language prompts into structured API calls"
          ],
          correctIndex: 1,
          explanation: "Context engineering is the discipline of deciding what information to include in the context window, in what order, and in what form. In complex applications, this is often more important than the instructions themselves."
        },
        {
          question: "Why does conversation history in a multi-turn application require active management?",
          options: [
            "LLM APIs automatically summarise and compress history without any engineering",
            "Conversation history grows with each turn and can consume the entire context window if not pruned or summarised",
            "History must be stored client-side because APIs do not support multi-turn conversations",
            "The model assigns lower quality to older turns, making them wasteful to include"
          ],
          correctIndex: 1,
          explanation: "Each conversation turn adds to the history. Without pruning or summarisation, conversation history can eventually fill the entire context window, leaving no room for retrieved documents, instructions, or the current user message."
        },
        {
          question: "A RAG system injects the top 20 retrieved chunks into the context window. What problem might this cause?",
          options: [
            "The API will reject requests with more than 10 chunks",
            "Injecting too many chunks fills the window with noise and dilutes the relevant signal, producing unfocused responses",
            "Each additional chunk doubles the API response latency",
            "The model will process only the first 5 chunks and ignore the rest"
          ],
          correctIndex: 1,
          explanation: "Injecting too many chunks fills the context window with noise — content that is loosely related but not directly useful. This dilutes the relevant signal and can produce unfocused responses that cannot be fixed by instruction changes alone."
        },
        {
          question: "Why is structured context (using headers, labels, and delimiters) recommended for multi-source input?",
          options: [
            "Structure reduces token count by eliminating whitespace",
            "Structured context helps the model parse which parts are instructions, which are retrieved documents, and which are user messages",
            "LLM APIs require structured context to route requests to the correct model",
            "Unstructured context triggers safety filters in most LLMs"
          ],
          correctIndex: 1,
          explanation: "When the context window contains content from multiple sources (system instructions, retrieved documents, tool outputs, user messages), structured formatting with headers and labels helps the model correctly identify and process each component."
        },
        {
          question: "Why does including full documents when only a paragraph is relevant harm response quality?",
          options: [
            "Full documents always exceed the context window limit",
            "Including irrelevant content dilutes the relevant signal with noise, making it harder for the model to focus on what matters",
            "Full documents slow down tokenisation, increasing latency",
            "APIs charge significantly more for requests containing full documents"
          ],
          correctIndex: 1,
          explanation: "Including full documents when only a paragraph is relevant fills the context window with noise. The relevant information becomes harder for the model to attend to, producing responses that miss the key point even when the answer is technically in the context."
        }
      ]
    },
    {
      topicId: "rag-architecture",
      topicTitle: "Retrieval-Augmented Generation (RAG) — Architecture and Components",
      objectiveIndex: 2,
      questions: [
        {
          question: "What two core LLM limitations does RAG address?",
          options: [
            "Slow inference speed and high API costs",
            "Training data knowledge cutoff and hallucination",
            "Limited context window size and poor instruction following",
            "Inability to process structured data and non-English text"
          ],
          correctIndex: 1,
          explanation: "RAG addresses the two core LLM limitations: knowledge cutoff (LLMs cannot answer questions about recent or proprietary information) and hallucination (LLMs fabricate information when they lack knowledge). RAG grounds responses in a retrievable, updatable knowledge base."
        },
        {
          question: "During RAG indexing, documents are split into chunks, embedded, and stored. What happens at query time?",
          options: [
            "The user's query is compared to the full document text using keyword matching",
            "The query is embedded with the same model, the vector database finds the most similar chunks, and those chunks are injected into the LLM's context",
            "The LLM queries the vector database directly without embedding the user's input",
            "All documents are loaded into the context window and the LLM performs its own retrieval"
          ],
          correctIndex: 1,
          explanation: "At query time: the user's question is embedded using the same model used at indexing, the vector database finds chunks with highest cosine similarity, and those chunks are injected into the LLM's context window as grounding material before generation."
        },
        {
          question: "Why does hybrid search (vector + BM25 keyword) typically outperform pure vector search?",
          options: [
            "Keyword search is always more accurate than vector search for all query types",
            "Pure vector search misses exact-match queries that keyword search handles well — hybrid search combines the strengths of both",
            "BM25 is faster than embedding, making hybrid search more cost-efficient",
            "Vector databases do not support pure vector search at production scale"
          ],
          correctIndex: 1,
          explanation: "Pure vector search excels at semantic similarity but can miss exact-match queries (specific product codes, names, or technical terms) that keyword search handles well. Hybrid search combines both approaches, covering a wider range of query types."
        },
        {
          question: "RAG does not fully prevent hallucination. When can hallucination still occur in a RAG system?",
          options: [
            "Only when the context window is larger than 4096 tokens",
            "When retrieval fails to find relevant chunks — the model may still fabricate information from its parametric memory",
            "Only when temperature is set above 0.5",
            "Hallucination is impossible when retrieval succeeds and relevant chunks are injected"
          ],
          correctIndex: 1,
          explanation: "RAG reduces hallucination by grounding the model in retrieved context, but if retrieval fails (wrong chunks are returned, or no relevant chunks exist), the model may still fall back on its parametric memory and fabricate. Retrieval quality directly determines generation quality."
        },
        {
          question: "Why should retrieval quality be evaluated independently before addressing generation quality?",
          options: [
            "Generation evaluation is always more expensive than retrieval evaluation",
            "Poor retrieval cannot be fixed by a better prompt — if the wrong chunks are retrieved, no prompt change will produce the correct answer",
            "Retrieval evaluation tools are built into all vector databases",
            "LLM APIs automatically flag poor retrieval quality in the response metadata"
          ],
          correctIndex: 1,
          explanation: "The five failure points of RAG are independent. If retrieval is returning the wrong chunks, improving the generation prompt cannot compensate — the model simply does not have the right information. Evaluation must start with retrieval before optimising generation."
        }
      ]
    },
    {
      topicId: "langgraph-agents",
      topicTitle: "LangGraph — Agent Graphs, State and Tool Use",
      objectiveIndex: 3,
      questions: [
        {
          question: "What is the central data structure in a LangGraph workflow?",
          options: [
            "A sequential list of LLM calls executed in order",
            "An explicit directed graph where nodes are processing steps and edges define conditional transitions",
            "A relational database schema for storing agent decisions",
            "A Python class hierarchy where each subclass represents a different agent capability"
          ],
          correctIndex: 1,
          explanation: "LangGraph models workflows as explicit directed graphs. Nodes are processing steps (LLM calls, tool calls, or functions) and edges define transitions between them — including conditional transitions that enable branching and looping."
        },
        {
          question: "How does LangGraph's explicit state differ from implicit state in linear chain frameworks?",
          options: [
            "Explicit state is stored externally; implicit state is stored in the model's context window",
            "LangGraph maintains a typed state object inspectable at every node, making debugging far more tractable than with implicit state",
            "Explicit state automatically handles errors; implicit state requires manual error handlers",
            "Explicit state is shared between all agents; implicit state is private to each agent"
          ],
          correctIndex: 1,
          explanation: "LangGraph maintains a typed state object that persists across all nodes. Each node reads from and writes to this state explicitly. Because state is inspectable, debugging is much more tractable compared to agent systems where state is implicit and hidden."
        },
        {
          question: "What happens in LangGraph when an LLM generates a structured tool call?",
          options: [
            "The tool call is logged but not executed until the user approves it",
            "LangGraph routes execution to the corresponding Python function, captures the result, and routes it back to the LLM for the next step",
            "The LLM directly executes the tool call using built-in capabilities",
            "Tool calls are converted to REST API calls by the LangGraph runtime"
          ],
          correctIndex: 1,
          explanation: "When the LLM generates a structured tool call with arguments, LangGraph routes execution to the registered Python function, captures the result, and routes it back to the LLM as input for the next reasoning step."
        },
        {
          question: "Why must conditional edges in a LangGraph workflow handle all possible state values?",
          options: [
            "LangGraph requires all edges to be defined at compile time for performance",
            "Unhandled state values cause runtime errors — the graph does not know which node to transition to",
            "Partial edge definitions are penalised by higher API costs",
            "Conditional edges that miss state values default to the first node in the graph"
          ],
          correctIndex: 1,
          explanation: "Conditional edges select the next node based on the current state value. If a state value is not handled by the conditional logic, LangGraph cannot determine the next transition and raises a runtime error. All possible state values must be accounted for."
        },
        {
          question: "What does LangGraph's checkpointing capability enable?",
          options: [
            "Automatic code generation for missing graph nodes",
            "Workflows can be paused and resumed across process boundaries, enabling long-running and human-in-the-loop workflows",
            "Automatic retry of failed tool calls up to three times",
            "Real-time monitoring of graph execution from the LangGraph cloud dashboard"
          ],
          correctIndex: 1,
          explanation: "LangGraph supports checkpointing — the ability to save workflow state at any point and resume execution later, even across process boundaries. This enables long-running workflows, human-in-the-loop patterns where execution pauses for human review, and fault-tolerant agent systems."
        }
      ]
    },
    {
      topicId: "ai-assisted-development",
      topicTitle: "AI-Assisted Development — Practical Workflow Integration",
      objectiveIndex: 4,
      questions: [
        {
          question: "For which type of task do AI coding tools perform best?",
          options: [
            "Novel algorithm design requiring creative architectural decisions",
            "Well-defined, self-contained tasks like unit tests, known algorithms, format conversions, and boilerplate",
            "Tasks requiring deep understanding of a specific codebase's business logic",
            "Security-sensitive authentication and authorisation code"
          ],
          correctIndex: 1,
          explanation: "AI coding tools are strongest for well-defined, self-contained tasks: unit tests, known algorithms, format conversions, boilerplate. They are weakest for tasks requiring deep understanding of your specific codebase's conventions, subtle business logic, or novel algorithms."
        },
        {
          question: "What is the primary way AI assistance introduces bugs into a codebase?",
          options: [
            "AI tools intentionally introduce bugs to avoid intellectual property issues",
            "Accepting suggestions without reading and understanding them",
            "AI tools are incompatible with compiled languages and produce syntax errors",
            "AI tools always use deprecated APIs that fail at runtime"
          ],
          correctIndex: 1,
          explanation: "Accepting suggestions without reading them is the primary way AI assistance introduces bugs. Models produce code with subtle security vulnerabilities, use deprecated APIs, and introduce logic errors that pass superficial review."
        },
        {
          question: "How should AI-generated code be reviewed compared to human-written code?",
          options: [
            "AI-generated code can skip code review because it is tested against millions of patterns",
            "AI-generated code should be reviewed with the same rigour as any other code — never merge code you do not understand",
            "AI-generated code only needs security review, not functional review",
            "AI-generated code should be auto-approved unless it touches authentication systems"
          ],
          correctIndex: 1,
          explanation: "AI-generated code must be reviewed with the same rigour as any other code. Models produce plausible-looking code with subtle security vulnerabilities, deprecated APIs, and logic errors. Never merge code you do not fully understand."
        },
        {
          question: "Why are AI coding tools described as 'multipliers, not replacements'?",
          options: [
            "They multiply the number of engineers needed to review code",
            "They amplify the productivity of engineers who already understand the problem — and amplify risk for those who do not",
            "They can replace developers for simple tasks but require oversight for complex ones",
            "They multiply output volume but reduce output quality proportionally"
          ],
          correctIndex: 1,
          explanation: "AI tools amplify whatever capability the engineer already brings. An engineer who understands the problem becomes significantly more productive. An engineer who does not understand what they are building becomes significantly more risky — accepting incorrect suggestions confidently."
        },
        {
          question: "What is the most important factor in getting high-quality AI code suggestions?",
          options: [
            "Using the most expensive AI coding tool available",
            "Providing rich context: function signatures, expected behaviour, type definitions, and example output",
            "Keeping the codebase as small as possible to limit the tool's search space",
            "Running the tool in isolation from the rest of the codebase"
          ],
          correctIndex: 1,
          explanation: "The more context you provide — function signatures, expected behaviour, type definitions, example output — the better the results. AI coding tools work best when your codebase is well-structured, well-named, and the task is clearly specified."
        }
      ]
    }
  ],
  senior: [
    {
      topicId: "llm-agent-architecture",
      topicTitle: "LLM Agent Architecture – Planning, Memory, Tools and Orchestration",
      objectiveIndex: 0,
      questions: [
        {
          question: "What is the ReAct planning strategy in LLM agents?",
          options: [
            "A reactive architecture that only responds to external events",
            "A strategy that interleaves thoughts and tool calls to enable step-by-step reasoning and acting",
            "A reinforcement learning approach that rewards the agent for correct actions",
            "A real-time context compression technique for long agent sessions"
          ],
          correctIndex: 1,
          explanation: "ReAct (Reasoning and Acting) is a planning strategy that interleaves the agent's reasoning (thinking about what to do) with tool calls (doing it). This multi-step approach enables more capable problem-solving than single-pass prompting."
        },
        {
          question: "Why should tool access in agent systems follow the principle of least privilege?",
          options: [
            "Broad tool access increases API latency significantly",
            "Each tool is a potential attack surface — limiting permissions reduces the blast radius of a successful prompt injection or agent error",
            "LangGraph requires least-privilege tool definitions for graph compilation",
            "Broad tool access causes the agent to loop indefinitely"
          ],
          correctIndex: 1,
          explanation: "Each tool is a potential attack surface and failure point. Following least privilege — granting only the permissions necessary for the task — limits the blast radius when the agent misbehaves, makes an error, or is hijacked through prompt injection."
        },
        {
          question: "What is the key advantage of external memory over in-context memory in production agents?",
          options: [
            "External memory does not count toward token costs",
            "In-context memory is bounded by the context window — external memory (vector DB, relational DB) persists beyond single sessions and scales independently",
            "External memory is processed faster by the LLM",
            "External memory automatically summarises itself to prevent overflow"
          ],
          correctIndex: 1,
          explanation: "In-context memory is temporary and bounded by the context window. External memory (vector databases, relational databases) persists across sessions, can hold far more information, and can be queried selectively — only retrieving what the current task requires."
        },
        {
          question: "When is a human-in-the-loop checkpoint mandatory in an agent design?",
          options: [
            "For every tool call to ensure model accuracy",
            "Before any consequential or irreversible action — such as sending emails, deleting records, or making transactions",
            "Only when the agent's confidence score is below 0.8",
            "Only for external API calls, not internal database operations"
          ],
          correctIndex: 1,
          explanation: "Human-in-the-loop checkpoints are essential before consequential or irreversible actions. An agent that sends emails, deletes records, or initiates transactions without human confirmation can cause real-world harm that cannot be undone by rolling back code."
        },
        {
          question: "What is a key cost of multi-agent architectures compared to single-agent systems?",
          options: [
            "Multi-agent systems require more expensive hardware",
            "Significantly increased debugging complexity and communication overhead between agents",
            "Multi-agent systems cannot use conditional logic or branching",
            "They require proprietary orchestration frameworks not available in open source"
          ],
          correctIndex: 1,
          explanation: "Multi-agent systems increase capability at the cost of significantly increased debugging complexity and communication overhead between agents. When agents interact, failures can cascade in non-obvious ways, making root-cause analysis much harder."
        }
      ]
    },
    {
      topicId: "prompt-injection",
      topicTitle: "Prompt Injection – Attack Patterns and Mitigation Strategies",
      objectiveIndex: 1,
      questions: [
        {
          question: "What distinguishes indirect prompt injection from direct prompt injection?",
          options: [
            "Indirect injection uses longer payloads than direct injection",
            "In indirect injection, malicious instructions are embedded in external data the agent retrieves (webpages, documents, emails) — not in the user's direct input",
            "Direct injection targets the system prompt; indirect injection targets only the user turn",
            "Indirect injection requires physical access to the model infrastructure"
          ],
          correctIndex: 1,
          explanation: "Indirect prompt injection embeds malicious instructions in data the agent retrieves from external sources — webpages, documents, emails. When the agent incorporates this data into its context, the hidden instructions execute in the model's reasoning loop without the user or developer placing them there."
        },
        {
          question: "Why can no prompt design alone fully prevent prompt injection?",
          options: [
            "Prompts are limited to 4096 tokens and cannot contain enough security instructions",
            "There is no parameterisation equivalent for LLMs — unlike SQL injection, defence must be layered across validation, sandboxing, and monitoring",
            "Prompt injection only occurs when safety filters are disabled",
            "Prompt design can fully prevent injection if the system prompt is long enough"
          ],
          correctIndex: 1,
          explanation: "Unlike SQL injection (which has parameterised queries as a complete defence), there is no equivalent for prompt injection. The model's instruction-following is probabilistic, not deterministic. Defence must be layered: input validation, output validation, sandboxing, and monitoring."
        },
        {
          question: "What mitigation strategy ensures that tool calls enforce access control independently of the model's instruction-following?",
          options: [
            "Output validation — check model output before displaying it to users",
            "Sandboxing — limit what the agent can do at the tool/execution layer regardless of what the model decides",
            "Input validation — filter injection patterns before they reach the model",
            "Instruction hierarchy — give system instructions structural precedence"
          ],
          correctIndex: 1,
          explanation: "Sandboxing limits what the agent can actually execute regardless of what the model generates. Even if the model generates an instruction to take an unauthorised action, the sandbox enforces access control at the execution layer — independent of the model's instruction-following."
        },
        {
          question: "Why is unsanitised retrieved content particularly dangerous in an agent context?",
          options: [
            "Retrieved content always contains binary data that corrupts the model's context",
            "Malicious instructions in retrieved content execute within the model's reasoning loop, potentially redirecting the agent to exfiltrate data or take unauthorised actions",
            "Unsanitised content reduces retrieval speed by corrupting the vector index",
            "Retrieved content from internal sources cannot be sanitised"
          ],
          correctIndex: 1,
          explanation: "When an agent retrieves content from external sources (webpages, documents), that content enters the context window where the model processes it as part of its reasoning. Malicious instructions embedded in retrieved content execute in this reasoning loop — this is indirect prompt injection."
        },
        {
          question: "LLM output that drives tool calls should be treated with the same distrust as what?",
          options: [
            "Documentation comments — reviewed for clarity but generally trusted",
            "User input in a web application — untrusted input that must be validated before acting on it",
            "Internal configuration files — trusted because they come from controlled sources",
            "Unit test assertions — verified against known-good reference implementations"
          ],
          correctIndex: 1,
          explanation: "LLM output that drives tool calls is an execution boundary — it may contain instructions from prompt injection, hallucinated arguments, or unsafe content. It must be treated with the same distrust as user input in a web application: validated, sanitised, and access-controlled before execution."
        }
      ]
    },
    {
      topicId: "ai-architecture-patterns",
      topicTitle: "AI System Architecture Patterns – RAG, Fine-tuning, Agents and Hybrids",
      objectiveIndex: 4,
      questions: [
        {
          question: "When is RAG the right default starting point rather than fine-tuning?",
          options: [
            "When the model needs to learn a specific output style consistently",
            "When the system needs access to a large, updatable, or proprietary knowledge base that changes over time",
            "When the task requires reducing inference cost by replacing complex prompts",
            "When the domain has jargon systematically mishandled by the base model"
          ],
          correctIndex: 1,
          explanation: "RAG is appropriate when the system needs access to a large, updatable, or proprietary knowledge base. It allows the knowledge base to be updated without retraining and is the right default for most enterprise knowledge retrieval use cases."
        },
        {
          question: "Fine-tuning is appropriate when which condition is met?",
          options: [
            "The knowledge base is updated frequently and factual accuracy over changing information is required",
            "The model consistently fails at a task despite good prompting, and you have a well-defined task with labelled training data",
            "RAG retrieval quality is below 80% on the evaluation set",
            "The application requires more than 3 concurrent users"
          ],
          correctIndex: 1,
          explanation: "Fine-tuning is appropriate when the model consistently fails despite good prompting, you need specific style/format consistently, you have labelled training data, or you need to reduce inference costs. It is not a substitute for RAG when factual accuracy over changing information is needed."
        },
        {
          question: "What is a RAG agent and why is it a common hybrid pattern?",
          options: [
            "An agent that uses RAG to evaluate its own output quality",
            "An agent that retrieves relevant context before reasoning and uses tools to act on the world — combining RAG's knowledge grounding with the agent's action capabilities",
            "A RAG system that uses an agent to perform document chunking",
            "An agent that fine-tunes itself on retrieved documents at inference time"
          ],
          correctIndex: 1,
          explanation: "A RAG agent combines RAG's knowledge grounding with agent tool use: the agent retrieves relevant context before reasoning, then uses tools to take actions. This hybrid combines RAG's ability to access up-to-date knowledge with the agent's ability to act on the world."
        },
        {
          question: "Why should the simplest architecture pattern always be evaluated before adding complexity?",
          options: [
            "Simple patterns are always more accurate than complex ones",
            "Each added layer adds complexity, latency, and cost — complexity should only be added when a simpler pattern demonstrably cannot solve the problem",
            "Regulatory frameworks require documenting why simpler approaches were rejected",
            "Complex patterns cannot be deployed without specialised infrastructure"
          ],
          correctIndex: 1,
          explanation: "Each additional layer (retrieval, fine-tuning, agent loop) adds complexity, latency, and cost. A baseline must be established with the simplest pattern first — if a single well-designed prompt solves the problem, adding an agent architecture creates unnecessary overhead."
        },
        {
          question: "Fine-tuning teaches behaviour, not facts. What does this mean practically?",
          options: [
            "Fine-tuned models cannot answer factual questions at all",
            "Even a fine-tuned model needs RAG for up-to-date factual information — fine-tuning adapts style and task capability, not knowledge",
            "Fine-tuned models only learn from structured data, not natural language",
            "Factual knowledge must be injected via the system prompt before each fine-tuned model call"
          ],
          correctIndex: 1,
          explanation: "Fine-tuning teaches the model how to behave (style, format, task capability) but does not reliably update factual knowledge. For tasks requiring up-to-date or domain-specific factual accuracy, RAG is still needed alongside fine-tuning."
        }
      ]
    },
    {
      topicId: "enterprise-genai-adoption",
      topicTitle: "Enterprise GenAI Adoption – Strategy, Risk and Governance",
      objectiveIndex: 4,
      questions: [
        {
          question: "Which GenAI use case generally has a lower risk threshold for enterprise adoption?",
          options: [
            "Autonomous claims adjudication that directly determines payout amounts",
            "Productivity augmentation tasks like drafting, summarising, and coding assistance",
            "Automated underwriting decisions for high-value policies",
            "Customer credit scoring using GenAI-generated risk assessments"
          ],
          correctIndex: 1,
          explanation: "Productivity augmentation (drafting, summarising, coding assistance) has a lower risk threshold because errors are reviewed by a human before any consequence occurs. Autonomous decision-making in regulated processes has a much higher error tolerance threshold."
        },
        {
          question: "What does the Secure AI Framework (SAIF) provide?",
          options: [
            "A ranked list of LLM vendors by security compliance score",
            "Nine areas for securing AI systems that must be addressed for each use case, with rigour determined by risk-level classification",
            "An automated scanning tool for detecting prompt injection in code",
            "A legal compliance checklist for EU AI Act conformity assessments"
          ],
          correctIndex: 1,
          explanation: "The SAIF defines nine areas — from user awareness and prompt/output validation through to secure model selection — that must be addressed for each AI use case. The required rigour for each area is determined by the use case's risk-level classification."
        },
        {
          question: "What is data privacy risk in the context of enterprise GenAI adoption?",
          options: [
            "The risk that the model generates privacy-policy-violating marketing copy",
            "The risk that sensitive data is sent to an external model API or used in training without appropriate controls",
            "The risk that the model memorises user passwords during fine-tuning",
            "The risk that API keys are exposed in model outputs"
          ],
          correctIndex: 1,
          explanation: "Data privacy risk in GenAI adoption includes sending sensitive data to external model APIs (which may process and store it) or using it in training without appropriate controls. Data classification must determine which content is permitted to be sent to which AI systems."
        },
        {
          question: "Why is AI governance described as an enabler rather than a blocker?",
          options: [
            "Governance automates compliance checks, reducing engineer workload",
            "Clear governance policies allow teams to move faster with confidence — knowing what is permitted avoids slow case-by-case approvals",
            "Governance frameworks include pre-approved prompt templates for common use cases",
            "Governance budgets include additional compute allowances for AI projects"
          ],
          correctIndex: 1,
          explanation: "Clear governance policies define what is permitted, what data can be used, and what oversight is required. This allows teams to proceed confidently without seeking approval for each decision — turning governance from a bottleneck into a framework for safe, fast delivery."
        },
        {
          question: "Why must AI governance be revisited regularly rather than treated as a one-time approval?",
          options: [
            "Regulatory frameworks require annual governance reviews for all software projects",
            "Model capabilities, regulatory landscapes, and internal risk appetites evolve — governance based on yesterday's assumptions may not cover today's risks",
            "Governance tools automatically expire after 12 months and require renewal",
            "Regular reviews allow organisations to reduce governance overhead over time"
          ],
          correctIndex: 1,
          explanation: "AI governance must be revisited regularly because all three dimensions evolve: model capabilities (new models change risk profiles), regulatory landscapes (new laws and guidance), and internal risk appetites (as the organisation's experience with AI matures)."
        }
      ]
    },
    {
      topicId: "ai-security-saif",
      topicTitle: "AI Security and the Secure AI Framework",
      objectiveIndex: 6,
      questions: [
        {
          question: "What is data poisoning in the context of AI security?",
          options: [
            "Corrupting inference inputs at query time to produce wrong outputs",
            "Corrupting training data to influence model behaviour during the training phase",
            "Injecting toxic prompts through the user interface",
            "Extracting training data from the model through adversarial prompts"
          ],
          correctIndex: 1,
          explanation: "Data poisoning corrupts training data to influence model behaviour. It is an attack on the training phase — a successful poisoning attack can compromise a model without any access to its weights or inference layer."
        },
        {
          question: "Which SAIF area covers preventing sensitive data from leaking through prompts or model responses?",
          options: [
            "AI Agent IAM",
            "Prompt/Output Validation & DLP",
            "Secure Compute",
            "Traceability & Observability"
          ],
          correctIndex: 1,
          explanation: "SAIF Area 2 — Prompt/Output Validation & DLP — covers validating inputs to and outputs from AI models, including data loss prevention controls to prevent sensitive data from leaking through prompts or responses."
        },
        {
          question: "Why does using a managed AI API (rather than self-hosting) not eliminate an organisation's security responsibility?",
          options: [
            "Managed APIs are always less secure than self-hosted models",
            "The application layer and the data sent to the API remain the engineer's responsibility — the vendor only secures the model infrastructure",
            "Managed API providers are exempt from GDPR and security regulations",
            "Self-hosted models automatically apply all SAIF controls"
          ],
          correctIndex: 1,
          explanation: "Even when using a managed API, the organisation is responsible for the application layer: what data is sent (data classification), how the application handles responses, access controls, and output monitoring. The vendor secures the model infrastructure, not your application."
        },
        {
          question: "What is membership inference in AI security?",
          options: [
            "Inferring a model's architecture by analysing its output distribution",
            "Determining whether a specific data point was included in the model's training set",
            "Using one model's output as input to another model in a pipeline",
            "Extracting the model's weights through repeated API queries"
          ],
          correctIndex: 1,
          explanation: "Membership inference is an attack that determines whether a specific data point (e.g. a person's record) was in the model's training set. This is a privacy attack with significant implications for models trained on personal data."
        },
        {
          question: "The OWASP Top 10 for LLM Applications provides what value to AI engineers?",
          options: [
            "A vendor-neutral ranking of LLM models by security compliance",
            "A standardised taxonomy of the most critical security risks in LLM-based systems, informing threat modelling and security reviews",
            "An automated scanner for detecting LLM security vulnerabilities in code",
            "A legal framework for LLM security liability across jurisdictions"
          ],
          correctIndex: 1,
          explanation: "The OWASP Top 10 for LLM Applications provides a standardised taxonomy of the most critical security risks — including prompt injection, insecure output handling, and supply chain vulnerabilities — that should inform threat modelling and security reviews for any LLM application."
        }
      ]
    },
    {
      topicId: "ai-policy",
      topicTitle: "AI Policy — Organisational Principles",
      objectiveIndex: 5,
      questions: [
        {
          question: "What is the AI Register and why must use cases be registered before development begins?",
          options: [
            "A public database of all EU AI Act compliance certifications",
            "An internal register where all AI use cases are recorded and risk-classified — registration determines governance requirements and must happen before development to avoid retroactive compliance work",
            "A vendor registry of approved AI model providers",
            "A log of all AI API calls made by the organisation for audit purposes"
          ],
          correctIndex: 1,
          explanation: "The AI Register records all AI use cases with their risk classification. This classification determines governance requirements. Starting development without registration creates compliance risk and may require expensive retroactive governance work."
        },
        {
          question: "Which GDPR principles apply to AI systems that process personal data?",
          options: [
            "Only data minimisation applies — other principles are GDPR-specific and do not apply to AI",
            "Purpose limitation (use data only for the stated purpose), data minimisation, and storage limitation must be enforced in system design",
            "GDPR does not apply to AI systems that process anonymised data",
            "Only the right to erasure applies, and only for customer-facing AI systems"
          ],
          correctIndex: 1,
          explanation: "GDPR obligations apply to all AI systems that process personal data — including training data, inference inputs, and logged outputs. Purpose limitation, data minimisation, and storage limitation must be built into system design, not treated as a legal afterthought."
        },
        {
          question: "The AI Policy requires transparency. What does this mean for customer-facing AI systems?",
          options: [
            "The model's architecture and weights must be published openly",
            "Users must be informed when they are interacting with an AI system or when AI has influenced a decision affecting them",
            "All AI-generated content must include a confidence score",
            "AI systems must provide explanations for every output they generate"
          ],
          correctIndex: 1,
          explanation: "The transparency requirement means users and affected parties must be informed when they are interacting with an AI system, or when AI has influenced a decision that affects them. This applies to chatbots, AI-assisted decisions, and automated outputs."
        },
        {
          question: "Why do the AI Policy's governance requirements apply to internal-only AI tools, not just customer-facing systems?",
          options: [
            "Internal tools always process more sensitive data than customer-facing ones",
            "The policy applies to all AI use within the organisation — internal tools can still create compliance risk, data privacy issues, and reputational harm",
            "Internal tools are exempt from EU AI Act requirements but covered by GDPR",
            "Internal tools require lighter governance because they cannot affect customers directly"
          ],
          correctIndex: 1,
          explanation: "The governance requirements apply to all AI use, not just customer-facing systems. Internal tools can still process sensitive data, influence business decisions, create compliance risk, and cause reputational harm if they produce biased or incorrect outputs."
        },
        {
          question: "What is the correct sequence for a new AI use case under the AI Policy?",
          options: [
            "Build prototype → security review → register in AI Register → deploy",
            "Register in AI Register with risk classification → design system to meet governance requirements → build → deploy with ongoing monitoring",
            "Risk assessment → build → register → compliance audit",
            "Legal review → build → register → test → deploy"
          ],
          correctIndex: 1,
          explanation: "The AI Register must be completed before development begins — the risk classification determines the governance requirements that must be built into the system design. Building first and registering later creates retroactive compliance work and may require architectural changes."
        }
      ]
    },
    {
      topicId: "llm-evaluation-frameworks",
      topicTitle: "LLM Evaluation Frameworks",
      objectiveIndex: 2,
      questions: [
        {
          question: "What does the RAGAS faithfulness metric measure?",
          options: [
            "Whether the user's question is answerable from the retrieved documents",
            "Whether the generated answer sticks to the retrieved context rather than drawing on the model's parametric memory",
            "Whether the retrieved documents are relevant to the user's query",
            "Whether all documents needed to answer the question were retrieved"
          ],
          correctIndex: 1,
          explanation: "RAGAS faithfulness measures whether the generated answer sticks to the retrieved context — it penalises answers that make claims not supported by the retrieved documents, detecting hallucination introduced at the generation step."
        },
        {
          question: "What does RAGAS context recall measure, and why is it distinct from context precision?",
          options: [
            "They are synonyms — both measure whether retrieved documents are relevant",
            "Context precision measures whether retrieved documents are relevant; context recall measures whether all documents needed to answer the question were actually retrieved",
            "Context recall measures retrieval speed; context precision measures retrieval accuracy",
            "Context recall measures answer quality; context precision measures document quality"
          ],
          correctIndex: 1,
          explanation: "Context precision asks 'are the retrieved documents relevant?' (avoiding noise). Context recall asks 'did we retrieve all documents needed to answer?' (avoiding missed information). Both are required for complete retrieval quality assessment."
        },
        {
          question: "What is the LLM-as-judge evaluation approach, and what limitation must be managed?",
          options: [
            "Using the same LLM to generate and evaluate its own output — limited by the model's inability to detect its own hallucinations",
            "Using a separate LLM to evaluate another LLM's output — it scales evaluation but introduces the judge's own biases, which must be validated against human ratings",
            "Using the LLM to rank evaluation datasets — limited by the model's lack of domain expertise",
            "Asking the LLM to assign numeric scores to its outputs — limited by inconsistent scoring criteria"
          ],
          correctIndex: 1,
          explanation: "LLM-as-judge uses a separate LLM to evaluate outputs at scale. It works well but introduces the judge model's own biases. These biases must be validated by measuring judge agreement against human ratings before trusting the automated evaluations."
        },
        {
          question: "Why is a domain-specific evaluation dataset more valuable than a generic one for an insurance RAG application?",
          options: [
            "Generic datasets are not supported by RAGAS",
            "An LLM that scores well on general knowledge may fail on insurance-specific terminology, reasoning, and policy details that domain-specific questions expose",
            "Domain-specific datasets are smaller and faster to evaluate",
            "Generic datasets always contain questions about insurance anyway"
          ],
          correctIndex: 1,
          explanation: "Generic evaluation datasets may not expose failures specific to the target domain. An insurance RAG system needs domain-specific questions about policy terms, claims procedures, and regulatory requirements to reveal the failure modes that matter most in production."
        },
        {
          question: "What is the risk of optimising for RAGAS faithfulness alone?",
          options: [
            "High faithfulness causes hallucination to increase in retrieved documents",
            "Maximising faithfulness alone can produce overly conservative answers that quote context verbatim without synthesising a useful response",
            "Faithfulness optimisation automatically reduces context precision",
            "High faithfulness scores cause the retrieval component to degrade over time"
          ],
          correctIndex: 1,
          explanation: "Maximising faithfulness alone can produce answers that copy context verbatim — technically faithful but not useful as synthesised answers. Evaluation metrics must be balanced: faithfulness, relevancy, context precision, and recall together provide a complete picture."
        }
      ]
    },
    {
      topicId: "fine-tuning-lora-peft",
      topicTitle: "Fine-Tuning, LoRA and PEFT",
      objectiveIndex: 3,
      questions: [
        {
          question: "What makes LoRA (Low-Rank Adaptation) practical for fine-tuning large models?",
          options: [
            "LoRA replaces all model weights with smaller compressed versions",
            "LoRA adds small trainable rank-decomposition matrices to attention layers — typically 1–10% of full model size — dramatically reducing compute requirements",
            "LoRA uses knowledge distillation to train a smaller student model from a larger teacher",
            "LoRA quantises the full model to 4-bit precision before training begins"
          ],
          correctIndex: 1,
          explanation: "LoRA adds small trainable matrices to attention layers rather than updating all model weights. A typical LoRA adapter is 1–10% of the full model size, trains in hours instead of days, and can be swapped in and out at inference time."
        },
        {
          question: "What does QLoRA add to the LoRA approach?",
          options: [
            "Quality-focused data filtering to improve training data before LoRA training begins",
            "4-bit quantisation of the base model, reducing GPU memory requirements further and enabling fine-tuning on consumer-grade hardware",
            "Quantised output generation that reduces inference token costs",
            "Query-level LoRA adapters that activate based on the input type"
          ],
          correctIndex: 1,
          explanation: "QLoRA combines LoRA with 4-bit quantisation of the base model. This dramatically reduces GPU memory requirements, enabling fine-tuning of large models on consumer-grade hardware that would otherwise be insufficient."
        },
        {
          question: "When should fine-tuning NOT be chosen as the solution?",
          options: [
            "When the model fails at a task despite extensive prompt engineering",
            "When you need to reduce inference costs by replacing complex prompts with learned behaviour",
            "When you lack sufficient quality training data, or when RAG or better prompting can solve the problem",
            "When the task requires a very specific output format consistently"
          ],
          correctIndex: 2,
          explanation: "Fine-tuning should not be the first resort. If RAG or better prompting can solve the problem, fine-tuning is unnecessary overhead. If you lack sufficient quality training data (hundreds to thousands of examples), fine-tuning will overfit and perform worse than the base model."
        },
        {
          question: "Why can fine-tuning not replace RAG for tasks requiring up-to-date factual accuracy?",
          options: [
            "Fine-tuned models cannot access vector databases",
            "Fine-tuning changes how the model behaves and generates, not what facts it knows — for changing knowledge, RAG provides information at inference time",
            "Fine-tuning always has a higher hallucination rate than the base model",
            "PEFT methods are incompatible with retrieval systems"
          ],
          correctIndex: 1,
          explanation: "Fine-tuning teaches behaviour (style, format, task capability) — it does not reliably update factual knowledge, and knowledge baked in at training time becomes stale as the world changes. RAG provides up-to-date information at inference time, making it the right tool for evolving knowledge bases."
        },
        {
          question: "What is the purpose of maintaining a held-out evaluation set during fine-tuning?",
          options: [
            "It is required by the Hugging Face PEFT library for training to proceed",
            "To detect overfitting — measuring performance on data the model has not trained on reveals whether it is learning generalisable patterns or memorising examples",
            "To reduce the cost of training by limiting the data volume the model processes",
            "To provide examples for the LoRA adapter to initialise from"
          ],
          correctIndex: 1,
          explanation: "A held-out evaluation set (data the model never trains on) is essential for detecting overfitting. If training loss decreases but evaluation loss increases, the model is memorising rather than generalising — a critical signal to stop training or regularise."
        }
      ]
    },
    {
      topicId: "eu-ai-act",
      topicTitle: "EU AI Act — Insurance Implications",
      objectiveIndex: 5,
      questions: [
        {
          question: "Under the EU AI Act's risk classification, which tier applies to AI systems used in insurance underwriting and claims assessment?",
          options: [
            "Minimal risk — insurance is a private sector, not a public sector concern",
            "Limited risk — insurance AI only requires transparency disclosures",
            "High risk — insurance is explicitly listed in Annex III as a high-risk domain",
            "Unacceptable risk — insurance AI systems are banned under the Act"
          ],
          correctIndex: 2,
          explanation: "Insurance is explicitly listed in Annex III of the EU AI Act. AI systems used in insurance underwriting, claims assessment, and pricing fall under the high-risk category — subject to the most stringent requirements including conformity assessments, documentation, and ongoing monitoring."
        },
        {
          question: "What is a conformity assessment under the EU AI Act?",
          options: [
            "An annual audit of AI system performance metrics by an external regulator",
            "A pre-deployment assessment demonstrating compliance with requirements for data quality, documentation, transparency, human oversight, accuracy, robustness, and cybersecurity",
            "A self-certification form completed by the AI system's developers",
            "A post-deployment review conducted six months after a high-risk system goes live"
          ],
          correctIndex: 1,
          explanation: "High-risk AI systems must undergo a conformity assessment before deployment, demonstrating compliance with requirements across data quality, documentation, transparency, human oversight, accuracy, robustness, and cybersecurity."
        },
        {
          question: "The EU AI Act entered into force in August 2024. When do high-risk provisions apply?",
          options: [
            "Immediately from August 2024",
            "From August 2026",
            "From January 2025 for large organisations only",
            "From 2030, with a phased transition period"
          ],
          correctIndex: 1,
          explanation: "The EU AI Act entered into force in August 2024 with a phased implementation. High-risk provisions apply from August 2026, giving organisations time to build compliance programmes, conduct conformity assessments, and implement required documentation and oversight controls."
        },
        {
          question: "An insurance company uses a third-party AI vendor's system for claims assessment. Does the EU AI Act create obligations for the insurer?",
          options: [
            "No — only the AI developer (the vendor) has obligations under the Act",
            "Yes — organisations deploying high-risk AI have significant compliance obligations including human oversight, performance monitoring, incident reporting, and log maintenance",
            "Only if the insurer modifies the vendor's system",
            "Only if the system is customer-facing rather than internally used"
          ],
          correctIndex: 1,
          explanation: "The EU AI Act creates obligations for both developers and deployers of high-risk AI. An insurer using a vendor's AI system for claims assessment must ensure human oversight, monitor system performance, report serious incidents, and maintain logs — regardless of who built the system."
        },
        {
          question: "What are the financial penalties for non-compliance with the EU AI Act for high-risk AI systems?",
          options: [
            "Fixed fines up to 1 million EUR per incident",
            "Up to 35 million EUR or 7% of global annual turnover, whichever is higher",
            "Up to 10 million EUR or 2% of annual EU revenue",
            "Penalties are limited to suspension of the AI system — no financial penalties apply"
          ],
          correctIndex: 1,
          explanation: "Non-compliance with the EU AI Act for high-risk AI systems carries penalties up to 35 million EUR or 7% of global turnover. For large insurance organisations, 7% of global turnover represents a very significant financial exposure."
        }
      ]
    }
  ],
  exams: {
    beginner: [
      {
        question: "What is the correct nested structure of the AI landscape?",
        options: [
          "ML contains AI, which contains deep learning, which contains generative AI",
          "AI contains ML, which contains deep learning, which contains generative AI",
          "Generative AI contains deep learning, which contains ML, which contains AI",
          "All four terms describe the same field using different terminology"
        ],
        correctIndex: 1,
        explanation: "AI is the broadest field, ML is a subset of AI, deep learning is a subset of ML, and generative AI is a subset of deep learning. Each level specialises the one above it."
      },
      {
        question: "Why do LLMs hallucinate — produce text that sounds correct but is factually wrong?",
        options: [
          "They retrieve from outdated databases that have not been updated",
          "They generate text by predicting statistically likely next tokens, not by retrieving verified facts",
          "Their training data was intentionally filtered to include misinformation",
          "Hallucination only occurs at high temperature settings"
        ],
        correctIndex: 1,
        explanation: "LLMs predict the most statistically likely next token — similar to autocomplete at scale. They generate plausible continuations of text, not factual answers, which is why they can confidently produce incorrect information."
      },
      {
        question: "What is the context window of an LLM?",
        options: [
          "The number of API requests the model can process per minute",
          "The maximum number of tokens the model can process in a single request, including all input and output",
          "The time window during which a model's training data was collected",
          "The number of conversation turns the model can maintain before resetting"
        ],
        correctIndex: 1,
        explanation: "The context window is the maximum number of tokens the model can process in a single request — including system prompt, conversation history, retrieved documents, and user message. Content beyond this limit is silently invisible to the model."
      },
      {
        question: "Which ML learning paradigm uses trial-and-error with rewards and penalties to learn behaviour?",
        options: [
          "Supervised learning",
          "Unsupervised learning",
          "Reinforcement learning",
          "Transfer learning"
        ],
        correctIndex: 2,
        explanation: "Reinforcement learning learns through trial and error — receiving rewards for good actions and penalties for poor ones. RLHF (reinforcement learning from human feedback) uses this mechanism to teach LLMs to follow instructions."
      },
      {
        question: "Most LLM APIs (OpenAI, Anthropic) use which API style?",
        options: [
          "GraphQL",
          "gRPC",
          "WebSocket",
          "REST"
        ],
        correctIndex: 3,
        explanation: "Most LLM APIs are REST APIs — using standard HTTP methods and JSON. Understanding REST at the HTTP level helps you debug authentication failures, parse error codes, and handle rate limiting."
      },
      {
        question: "What is the purpose of few-shot prompting?",
        options: [
          "To minimise the number of tokens sent in each API call",
          "To provide 2–5 worked examples before the actual request so the model can infer the expected pattern",
          "To test whether the model can answer without any context",
          "To set temperature to a low value for deterministic output"
        ],
        correctIndex: 1,
        explanation: "Few-shot prompting provides worked examples before the actual request. The model infers the expected input-output format, style, and level of detail from these examples — often more effectively than explicit prose instructions."
      },
      {
        question: "A token is NOT equivalent to a word. Why does this matter for AI Engineers?",
        options: [
          "It only matters when using non-English languages",
          "It affects cost estimation and context window calculations — rare words, code, and numbers often tokenise less efficiently than common English words",
          "It means LLMs cannot process punctuation correctly",
          "It only matters when using the base model, not fine-tuned versions"
        ],
        correctIndex: 1,
        explanation: "Tokens are subword units, not words. A common English word might be one token, but rare or compound words might split into several. This affects cost (token-based pricing), context window calculations, and can cause unexpected truncation."
      },
      {
        question: "What happens to an LLM API call if you do not include conversation history from the previous turn?",
        options: [
          "The API automatically retrieves and includes the previous turn",
          "The model treats it as a fresh conversation with no knowledge of what came before",
          "The model infers context from the semantic content of the current message",
          "The API returns an error requiring history to be provided"
        ],
        correctIndex: 1,
        explanation: "LLM APIs are stateless. Each call is independent — the model has no knowledge of previous interactions unless conversation history is explicitly included in the current request. This is a fundamental design property, not a limitation to be worked around."
      },
      {
        question: "Which type of instruction is more reliable in prompt engineering?",
        options: [
          "Negative instructions: 'Do not include personal information'",
          "Positive instructions: 'Respond only with professional qualifications'",
          "Both are equally reliable across all models",
          "Negative instructions for content, positive for format"
        ],
        correctIndex: 1,
        explanation: "Positive instructions ('respond only with...') are more reliable than negative ones ('do not include...'). The content explicitly lists this as a key prompt engineering principle — tell the model what to do, not what to avoid."
      },
      {
        question: "Which API style is best suited for a GitHub webhook that notifies a CI pipeline when code is pushed?",
        options: [
          "REST — it is the most widely used and reliable",
          "GraphQL — it supports event subscriptions natively",
          "Webhook — the remote service calls your endpoint when the event occurs",
          "gRPC — it has the lowest latency for event notification"
        ],
        correctIndex: 2,
        explanation: "Webhooks are event-driven: instead of your code polling for changes, the remote service (GitHub) calls your endpoint when the event occurs. This is exactly the pattern for CI pipeline notification on code push."
      },
      {
        question: "What is role prompting used for?",
        options: [
          "Granting the model access to role-specific databases",
          "Framing the model as a specific persona to influence vocabulary, technical detail, and perspective",
          "Assigning a numeric role ID that maps to a pre-trained personality",
          "Enabling the model to access systems it would otherwise be blocked from"
        ],
        correctIndex: 1,
        explanation: "Role prompting (e.g. 'You are a senior claims analyst') influences the model's vocabulary, level of technical detail, and perspective — a useful technique for targeting a specific audience or domain without lengthy style instructions."
      },
      {
        question: "The 'garbage in, garbage out' principle in ML means:",
        options: [
          "ML models automatically discard low-quality training examples",
          "Data quality is the most important factor in model performance — poor data produces poor models regardless of algorithm sophistication",
          "Models trained on garbage data produce random, unpredictable outputs",
          "The training algorithm determines output quality more than the data does"
        ],
        correctIndex: 1,
        explanation: "Data quality is the single most important factor in ML performance. Even sophisticated algorithms cannot compensate for biased, incorrectly labelled, or low-quality training data. This applies directly to any LLM you fine-tune."
      },
      {
        question: "Temperature in LLM inference controls:",
        options: [
          "The computational load during generation",
          "The maximum length of the generated output",
          "The randomness of token selection — low for deterministic output, high for creative output",
          "The speed at which tokens are generated"
        ],
        correctIndex: 2,
        explanation: "Temperature controls randomness in token selection. Low temperature (near 0) produces more deterministic, focused output. High temperature produces more varied, creative output — but also more prone to errors on factual tasks."
      },
      {
        question: "What is overfitting in ML and how does it affect fine-tuned LLMs?",
        options: [
          "The model is too slow during inference — resolved by reducing model size",
          "The model memorises training examples instead of learning generalisable patterns — a fine-tuned LLM on too little data will perform worse on real inputs",
          "The model trains for too many epochs — resolved by early stopping at epoch 1",
          "The model has too many parameters — resolved by reducing network depth"
        ],
        correctIndex: 1,
        explanation: "Overfitting occurs when a model memorises training examples rather than generalising. An LLM fine-tuned on insufficient data will parrot training examples and fail on real-world inputs that differ from the training set."
      },
      {
        question: "What is the simplest approach to start with in prompt engineering before adding complexity?",
        options: [
          "Chain-of-thought prompting — always improves output quality",
          "Few-shot prompting with at least 10 examples",
          "Zero-shot prompting — describe the task directly without examples",
          "Structured output with JSON schema — prevents all ambiguity"
        ],
        correctIndex: 2,
        explanation: "Start simple — zero-shot prompting (describe the task directly). Add complexity (few-shot examples, chain-of-thought, structured output) only when the simpler approach does not produce the required quality. Over-engineering prompts for simple tasks is a common pitfall."
      }
    ],
    mid: [
      {
        question: "How does transformer self-attention enable LLMs to resolve long-range dependencies in text?",
        options: [
          "It uses a sliding window that processes token relationships within a fixed neighbourhood",
          "Each token can weigh the relevance of every other token in the input, regardless of distance",
          "It stores pronoun-referent pairs in a lookup table built during training",
          "It processes input left-to-right, accumulating context as it goes"
        ],
        correctIndex: 1,
        explanation: "Self-attention allows each token to weigh every other token's relevance when computing its representation. This enables LLMs to correctly resolve pronouns, follow earlier instructions, and connect concepts separated by hundreds of tokens — a capability recurrent architectures struggled with."
      },
      {
        question: "What is cosine similarity and why is it used for semantic search?",
        options: [
          "It measures the number of shared keywords between two texts",
          "It measures the cosine of the angle between two embedding vectors — close to 1 means semantically similar, scale-invariant",
          "It calculates the Euclidean distance between two document vectors",
          "It counts the percentage of overlapping n-grams between query and document"
        ],
        correctIndex: 1,
        explanation: "Cosine similarity measures the angle between two vectors in embedding space. A score near 1.0 means the vectors point in nearly the same direction — semantically similar content. It is scale-invariant, making it suitable for comparing texts of different lengths."
      },
      {
        question: "In a RAG pipeline, what must be true about the embedding model used at indexing time and query time?",
        options: [
          "They can be different models as long as they have the same dimensionality",
          "They must be the same model — different models produce incompatible vector spaces",
          "The query model must be newer and more capable than the indexing model",
          "The indexing model must be larger to capture more nuance"
        ],
        correctIndex: 1,
        explanation: "The same embedding model must be used for both indexing and querying. Different models produce vectors in incompatible spaces — comparing them produces meaningless similarity scores. Switching models requires re-embedding the entire knowledge base."
      },
      {
        question: "What is the 'lost in the middle' effect and how should it inform context window design?",
        options: [
          "Tokens in the middle of words are tokenised less accurately",
          "Models attend less reliably to content in the middle of a long context — place critical information at the beginning or end",
          "The middle portion of the context window is charged at double the token rate",
          "LangGraph loses state when workflow nodes are placed in the middle of a graph"
        ],
        correctIndex: 1,
        explanation: "The 'lost in the middle' effect is well-documented: models attend more reliably to content at the beginning and end of the context window than to content in the middle. Critical instructions and key context should be placed at the edges."
      },
      {
        question: "What does RLHF (Reinforcement Learning from Human Feedback) explain about modern LLMs?",
        options: [
          "Why LLMs can access real-time information from the internet",
          "Why models trained with RLHF follow instructions more reliably than base pre-trained models",
          "Why LLMs are deterministic when temperature is set to 0",
          "Why larger models always outperform smaller ones on instruction-following tasks"
        ],
        correctIndex: 1,
        explanation: "RLHF uses human raters to compare model responses, creating a reward signal that teaches the model preferred behaviour. This is why ChatGPT-style models follow instructions more reliably than base GPT models — RLHF aligned the model to user intent."
      },
      {
        question: "RAG pipeline has five failure points. Which one describes injecting too many chunks into the context?",
        options: [
          "Chunking failure — splitting at wrong boundaries",
          "Embedding failure — using the wrong model",
          "Retrieval failure — pure vector search missing exact matches",
          "Context injection failure — filling the window with noise from too many chunks"
        ],
        correctIndex: 3,
        explanation: "Context injection is the fourth failure point in RAG. Injecting too many retrieved chunks fills the context window with loosely related noise, diluting the signal and producing unfocused responses that cannot be fixed by prompt changes alone."
      },
      {
        question: "In LangGraph, what is the role of the typed state object?",
        options: [
          "It is a security boundary that prevents tool calls from accessing external systems",
          "It persists across all nodes, is read and written by each node, and makes debugging tractable by making state explicit and inspectable",
          "It stores the model's output tokens before they are returned to the user",
          "It defines the graph's edges and transition conditions"
        ],
        correctIndex: 1,
        explanation: "The typed state object in LangGraph persists across all workflow nodes. Each node reads from and writes to this state. Because state is explicit and inspectable at every step, debugging complex multi-step workflows is far more tractable than in systems with implicit state."
      },
      {
        question: "What is chain-of-thought prompting and what is its primary trade-off?",
        options: [
          "Linking multiple models in a pipeline — trade-off is complexity vs. accuracy",
          "Instructing the model to reason step by step before the final answer — improves multi-step reasoning accuracy at the cost of longer outputs and higher token costs",
          "Using a chain of few-shot examples — trade-off is example quality vs. generalisability",
          "Connecting multiple API calls in sequence — trade-off is latency vs. result quality"
        ],
        correctIndex: 1,
        explanation: "Chain-of-thought prompting instructs the model to reason step by step before answering. It reliably improves accuracy on multi-step reasoning tasks. The trade-off is longer outputs and higher token costs — important to weigh against the accuracy benefit."
      },
      {
        question: "Why does the bias-variance tradeoff apply when choosing RAG chunk size?",
        options: [
          "Smaller chunks have lower token costs (bias) and larger chunks have higher accuracy (variance)",
          "Too-small chunks (high variance) may fragment critical context; too-large chunks (high bias) dilute specific information — finding the right size balances both",
          "Chunk size determines the embedding model's variance across similar texts",
          "The bias-variance tradeoff does not apply to chunking decisions"
        ],
        correctIndex: 1,
        explanation: "Very small chunks may fragment information needed to answer a query (underfitting — missing context). Very large chunks dilute specific information in averaged embeddings (overfitting noise into vectors). Finding the optimal chunk size is a bias-variance balancing problem."
      },
      {
        question: "What is gradient descent and why does the learning rate matter?",
        options: [
          "A sampling algorithm for LLM inference — learning rate controls output randomness",
          "An algorithm that adjusts model parameters to reduce prediction error — learning rate controls step size: too large overshoots, too small never converges",
          "A data preprocessing technique — learning rate controls normalisation scale",
          "A hyperparameter search method — learning rate controls the search space size"
        ],
        correctIndex: 1,
        explanation: "Gradient descent adjusts model parameters in the direction that reduces the loss function. The learning rate controls step size — too large and training overshoots the optimal parameters; too small and training converges too slowly or gets stuck."
      },
      {
        question: "An AI coding tool suggests a security-sensitive function. What is the correct approach?",
        options: [
          "Accept it — AI tools are trained on security best practices and rarely introduce vulnerabilities",
          "Review it with the same rigour as any other code — models produce plausible-looking code with subtle security vulnerabilities",
          "Accept it only if the suggestion matches a known library pattern",
          "Reject all AI suggestions for security-sensitive code automatically"
        ],
        correctIndex: 1,
        explanation: "AI-generated code must be reviewed with the same rigour as any other code. Models produce plausible-looking code with subtle security vulnerabilities, deprecated APIs, and logic errors. Never merge code you do not fully understand, regardless of the source."
      },
      {
        question: "What must be done when switching to a newer, better embedding model for a RAG system?",
        options: [
          "Update only the query embedding — the indexed vectors remain compatible",
          "Re-embed the entire knowledge base with the new model — the old vectors are incompatible",
          "Run both models in parallel and average their similarity scores",
          "Nothing — all embedding models produce vectors in a shared standard space"
        ],
        correctIndex: 1,
        explanation: "Different embedding models produce vectors in incompatible spaces. Switching models requires re-embedding the entire knowledge base with the new model. Running the old index with the new query model produces meaningless similarity scores."
      },
      {
        question: "Why does top-p sampling (nucleus sampling) complement temperature control in LLM inference?",
        options: [
          "Top-p sets the maximum output length; temperature sets minimum quality",
          "Top-p restricts candidates to tokens whose cumulative probability exceeds a threshold, preventing very low-probability tokens regardless of temperature setting",
          "Top-p and temperature are redundant — only one needs to be set",
          "Top-p increases generation speed by reducing the candidate token count"
        ],
        correctIndex: 1,
        explanation: "Top-p sampling restricts candidate tokens to those whose cumulative probability exceeds threshold p, preventing generation of very low-probability (incoherent) tokens. Used alongside temperature, it provides finer control over the creativity/reliability balance."
      },
      {
        question: "What is the primary risk of treating prompt engineering as a one-time task?",
        options: [
          "Token costs increase when prompts are modified after initial deployment",
          "Prompts need revision when the underlying model changes — a prompt tuned for one model version may fail on the next",
          "Prompt changes require model retraining to take effect",
          "Static prompts are more vulnerable to prompt injection attacks"
        ],
        correctIndex: 1,
        explanation: "Prompts often need revision when the underlying model version changes. A prompt carefully tuned for one version may produce different or worse output on the next. Production prompt changes should be versioned, tested, and treated with the same rigour as code changes."
      },
      {
        question: "Context engineering is described as potentially more important than instructions themselves. Why?",
        options: [
          "Context engineering replaces the need for explicit instructions entirely",
          "In complex applications, what information is in the context window — its content, order, and structure — determines response quality more than the wording of instructions",
          "Context engineering reduces the model's tendency to hallucinate by filtering its outputs",
          "Context engineering is only important for models with context windows larger than 100k tokens"
        ],
        correctIndex: 1,
        explanation: "In complex applications, poor context engineering fills the window with noise, causes truncation of important content, and produces unfocused responses that cannot be fixed by changing instructions alone. The right information, in the right place, in the right form is often the dominant factor in output quality."
      }
    ],
    senior: [
      {
        question: "Which principle must govern tool access in production LLM agent systems, and why?",
        options: [
          "Maximum access — agents need broad permissions to handle unexpected scenarios",
          "Least privilege — granting only necessary permissions limits blast radius from prompt injection or agent errors",
          "Role-based access — tools should be grouped by agent persona",
          "Dynamic access — permissions should expand as the agent demonstrates reliability"
        ],
        correctIndex: 1,
        explanation: "Tool access must follow least privilege — grant only the permissions necessary for each task. When an agent misbehaves, makes an error, or is hijacked through prompt injection, minimal permissions limit the damage. Broad permissions make every failure potentially catastrophic."
      },
      {
        question: "What distinguishes indirect prompt injection from direct prompt injection, and why is indirect injection more dangerous in agentic systems?",
        options: [
          "Indirect injection uses longer payloads; danger comes from bypassing input length limits",
          "Indirect injection embeds malicious instructions in external data the agent retrieves — harder to detect, executes in the reasoning loop, and can redirect agent actions without user involvement",
          "Direct injection is more dangerous because it directly overrides the system prompt",
          "Indirect injection only affects agents with web browsing capabilities"
        ],
        correctIndex: 1,
        explanation: "Indirect prompt injection places malicious instructions in data the agent retrieves (webpages, documents, emails). The user did not place them there — they arrive through the retrieval pipeline. They execute in the model's reasoning loop and can redirect the agent to exfiltrate data or take unauthorised actions without any direct user interaction."
      },
      {
        question: "The RAGAS answer relevancy metric differs from faithfulness. What does each measure?",
        options: [
          "Faithfulness measures answer length; relevancy measures answer accuracy",
          "Faithfulness measures whether the answer sticks to retrieved context; relevancy measures whether the answer actually addresses the user's question",
          "Faithfulness measures retrieval recall; relevancy measures retrieval precision",
          "They measure the same thing using different calculation methods"
        ],
        correctIndex: 1,
        explanation: "Faithfulness: does the answer stick to the retrieved context (not hallucinate)? Answer relevancy: does the answer actually address what was asked? An answer can be faithful (quotes context correctly) but irrelevant (addresses a different question) — both metrics are needed."
      },
      {
        question: "When is fine-tuning the correct choice over RAG?",
        options: [
          "When the knowledge base is updated daily and factual accuracy is required",
          "When the model consistently fails at a task despite good prompting, especially for specific style or format, with sufficient labelled training data available",
          "When the application needs to reduce context window usage",
          "Fine-tuning is always preferred over RAG for production systems"
        ],
        correctIndex: 1,
        explanation: "Fine-tuning is appropriate when the model consistently fails despite good prompting, you need consistent specific style/format, you have labelled training data, or you need inference cost reduction. For factual accuracy over changing knowledge, RAG is correct — fine-tuning teaches behaviour, not facts."
      },
      {
        question: "When must an agent workflow include a human-in-the-loop checkpoint?",
        options: [
          "For every LLM call to verify output quality",
          "Only when processing personal data under GDPR",
          "Before any consequential or irreversible action — sending emails, deleting records, initiating transactions",
          "Only when the agent's reasoning involves more than three steps"
        ],
        correctIndex: 2,
        explanation: "Human-in-the-loop checkpoints are essential before consequential or irreversible actions. An agent that sends emails, deletes records, or initiates financial transactions without human confirmation can cause real-world harm that cannot be undone by rolling back code."
      },
      {
        question: "Under the EU AI Act, which category covers AI systems used in insurance underwriting?",
        options: [
          "Minimal risk — no specific requirements",
          "Limited risk — transparency obligations only",
          "High risk — strict requirements including conformity assessment before deployment",
          "Unacceptable risk — prohibited use case"
        ],
        correctIndex: 2,
        explanation: "Insurance is explicitly listed in Annex III of the EU AI Act. AI systems that influence underwriting, pricing, and claims decisions are high-risk, requiring conformity assessments, documentation, transparency, human oversight, and ongoing monitoring before and after deployment."
      },
      {
        question: "What does SAIF Area 5 (AI Agent IAM) require?",
        options: [
          "Encrypting all agent-to-agent communications",
          "Managing identity and access for AI agents — ensuring agents operate with appropriate permissions and that their actions are attributable",
          "Enforcing multi-factor authentication for all users of AI systems",
          "Logging all API calls made by AI agents to external systems"
        ],
        correctIndex: 1,
        explanation: "SAIF Area 5 (AI Agent IAM) covers managing identity and access for AI agents — ensuring agents operate with least-privilege permissions and that their actions can be attributed for audit and accountability. Agents need identities that can be tracked and revoked."
      },
      {
        question: "What is data poisoning and why is it a supply chain security concern for AI systems?",
        options: [
          "A runtime attack that injects malicious data into inference requests",
          "Corrupting training data to influence model behaviour — a supply chain risk because open-source datasets and ML libraries can be tampered with before use",
          "Poisoning vector database indices to return malicious content during retrieval",
          "Inserting backdoors into model weights during the fine-tuning phase"
        ],
        correctIndex: 1,
        explanation: "Data poisoning corrupts training data to compromise the trained model. As a supply chain attack, it targets open-source datasets or ML libraries before they reach the training pipeline — a model can be compromised without the developer ever touching the weights directly."
      },
      {
        question: "Why is RAG better than fine-tuning for maintaining factual accuracy in a system with frequently updated knowledge?",
        options: [
          "RAG models are trained more frequently than fine-tuned models",
          "Fine-tuning bakes knowledge into weights at training time — it becomes stale as the world changes. RAG retrieves current information at inference time from an updatable knowledge base",
          "RAG always has higher faithfulness scores than fine-tuned models on RAGAS benchmarks",
          "Fine-tuning is limited to 10,000 documents; RAG can index unlimited content"
        ],
        correctIndex: 1,
        explanation: "Fine-tuning encodes knowledge into model weights — knowledge that becomes stale as the world changes. RAG retrieves current information from an external knowledge base at inference time, allowing the knowledge base to be updated without model retraining."
      },
      {
        question: "The EU AI Act creates obligations for both AI developers and deployers. What must an insurer do when using a third-party AI system for claims assessment?",
        options: [
          "Nothing — compliance responsibility transfers entirely to the AI vendor",
          "Ensure human oversight, monitor system performance, report serious incidents, and maintain logs — even when using a third-party AI system",
          "Only validate that the vendor has achieved EU AI Act certification",
          "Conduct a one-time conformity assessment at deployment and maintain no ongoing obligations"
        ],
        correctIndex: 1,
        explanation: "The EU AI Act imposes deployer obligations regardless of who built the system. An insurer using a vendor's claims assessment AI must ensure human oversight, monitor performance, report serious incidents, and maintain logs. Compliance responsibility does not transfer to the vendor."
      },
      {
        question: "When evaluating a RAG system, why must retrieval quality be evaluated independently before generation quality?",
        options: [
          "Generation evaluation is more expensive and should be done after retrieval is confirmed cheap",
          "If retrieval fails, no prompt improvement can produce a correct answer — the model does not have the right information regardless of generation quality",
          "Retrieval evaluation tools are more mature and standardised than generation evaluation tools",
          "RAGAS does not support combined retrieval and generation evaluation"
        ],
        correctIndex: 1,
        explanation: "RAG has independent failure points. If retrieval is returning wrong or irrelevant chunks, improving the generation prompt is futile — the model simply does not have the information needed to answer correctly. Retrieval must be evaluated and fixed first."
      },
      {
        question: "What is the AI Register and what risk does skipping it create?",
        options: [
          "A vendor catalogue of approved AI tools — skipping creates procurement risk",
          "An internal register where AI use cases are recorded and risk-classified — skipping creates compliance risk and may require expensive retroactive governance work",
          "A public EU database of certified AI systems — skipping creates legal liability immediately",
          "A technical architecture registry — skipping creates design inconsistency risk"
        ],
        correctIndex: 1,
        explanation: "The AI Register records all AI use cases with risk classifications that determine governance requirements. Starting development without registration creates compliance risk — the governance requirements must be built into the system from the start, and retroactive implementation is expensive."
      },
      {
        question: "LoRA trains only a small fraction of parameters. What is the practical benefit of this for enterprise AI teams?",
        options: [
          "LoRA-trained models outperform full fine-tuned models on all tasks",
          "LoRA adapters (1–10% of model size) train in hours on standard hardware, dramatically reducing compute cost and enabling iteration at a pace that full fine-tuning does not allow",
          "LoRA removes the need for an evaluation set during fine-tuning",
          "LoRA adapters are automatically compatible with all base model versions"
        ],
        correctIndex: 1,
        explanation: "LoRA adapters are 1–10% of full model size and train in hours rather than days. This dramatically reduces the compute cost and enables enterprise AI teams to iterate on fine-tuning experiments at a pace and cost that full fine-tuning does not permit."
      },
      {
        question: "What OWASP Top 10 for LLM Applications risk covers agents taking unauthorised actions based on manipulated inputs?",
        options: [
          "Supply chain vulnerabilities",
          "Excessive agency — agents granted too much authority act on malicious or incorrect instructions beyond their intended scope",
          "Sensitive information disclosure",
          "Model denial of service"
        ],
        correctIndex: 1,
        explanation: "Excessive agency is the OWASP LLM risk covering agents that take unintended actions — deleting data, making purchases, sending messages — because they have been granted too much authority and act on manipulated or incorrect instructions. Least-privilege tool access is the primary mitigation."
      },
      {
        question: "Enterprise AI governance is described as an enabler, not a blocker. What makes this true in practice?",
        options: [
          "Governance automates compliance checks, eliminating manual review overhead",
          "Clear governance policies define what is permitted — teams can proceed confidently without seeking case-by-case approval, accelerating delivery within defined boundaries",
          "Governance frameworks include pre-approved AI system templates that reduce build time",
          "Governance only applies to external-facing systems, leaving internal development unconstrained"
        ],
        correctIndex: 1,
        explanation: "Clear governance policies define permitted use cases, data classifications, and oversight requirements. Teams can proceed within these boundaries without seeking approval for every decision — turning governance from a bottleneck into a framework that enables safe, fast delivery."
      }
    ]
  }
};
