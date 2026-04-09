export const additions = {
  beginner: [
    {
      question: 'According to the "AI, ML, Deep Learning and GenAI Explained" video, what analogy does the presenter use to describe how large language models generate text?',
      options: [
        'A search engine retrieving the most relevant stored answer',
        'A calculator solving a predefined equation',
        'An autocomplete that predicts not just the next word but the next sentence, paragraph, or entire document',
        'A database lookup matching an input to a stored record'
      ],
      correctIndex: 2,
      explanation: 'The video describes LLMs as like autocomplete on steroids — where traditional autocomplete predicts the next word, LLMs predict the next sentence, paragraph, or entire document. This captures the key idea that LLMs generate statistically plausible continuations rather than retrieving stored facts.'
    },
    {
      question: 'Which API style is described in the "Every Popular API Style Explained" video as being developed by Facebook to prevent over-fetching and under-fetching of data?',
      options: [
        'REST',
        'SOAP',
        'gRPC',
        'GraphQL'
      ],
      correctIndex: 3,
      explanation: 'Facebook developed GraphQL specifically to deliver efficient, precise data to its billions of users. Unlike REST, GraphQL lets clients ask for exactly the data they need — no more, no less — eliminating over-fetching and under-fetching.'
    },
    {
      question: 'In machine learning, what is the relationship between AI, ML, and deep learning?',
      options: [
        'They are three unrelated fields that occasionally overlap',
        'AI is a subset of ML, and ML is a subset of deep learning',
        'Deep learning is a subset of ML, and ML is a subset of AI',
        'AI and ML are the same thing; deep learning is an older precursor'
      ],
      correctIndex: 2,
      explanation: 'Artificial Intelligence is the broadest field covering any technique that enables machines to simulate human intelligence. Machine Learning is a subset of AI where systems learn from data. Deep learning is a subset of ML that uses layered neural networks. Each is nested inside the one above it.'
    },
    {
      question: 'What is a token in the context of LLMs?',
      options: [
        'A single word in the input text',
        'A sentence boundary marker',
        'A numerical representation of a small chunk of text, which may be part of a word',
        'An API authentication credential'
      ],
      correctIndex: 2,
      explanation: 'Tokens are small chunks of text — numerical representations the model operates on. A word might be one token, or a rare word might be split into several. Tokens are not words, which matters for cost estimation and context window management.'
    },
    {
      question: 'How does temperature affect LLM output generation?',
      options: [
        'Higher temperature makes output more deterministic and focused',
        'Lower temperature makes output more varied and creative',
        'Temperature has no effect on output quality, only on speed',
        'Lower temperature produces more deterministic output; higher temperature produces more varied output'
      ],
      correctIndex: 3,
      explanation: 'Temperature controls randomness in token selection. Low temperature (close to 0) makes the model more deterministic and focused — good for factual tasks. High temperature makes output more varied and creative — but also more prone to errors.'
    },
    {
      question: 'What happens when content exceeds an LLM\'s context window?',
      options: [
        'The model compresses the content to fit',
        'The model raises an error and stops processing',
        'The content beyond the window is silently invisible to the model',
        'The model automatically retrieves the missing content from the internet'
      ],
      correctIndex: 2,
      explanation: 'The context window is a hard limit. Content beyond it is simply invisible to the model — there is no compression or error. This makes managing what goes into the context window a critical engineering skill.'
    },
    {
      question: 'A developer notices their LLM API costs are unexpectedly high. Which factor most directly determines API cost?',
      options: [
        'The number of HTTP requests made to the API',
        'The total number of input and output tokens processed across all requests',
        'The time of day the requests are made',
        'The programming language used in the client application'
      ],
      correctIndex: 1,
      explanation: 'LLM API pricing is token-based — you pay per input token and per output token. Long system prompts, extensive conversation history, and verbose outputs all increase cost. Understanding tokenisation is essential for cost management.'
    },
  ],
  mid: [
    {
      question: 'According to the "ML Foundations for AI Engineers" video, what is the key advantage of reinforcement learning over supervised learning, as demonstrated by AlphaGo?',
      options: [
        'Reinforcement learning requires less data to achieve good results',
        'Reinforcement learning can surpass human expert performance because it is not bounded by human labelling or expertise',
        'Reinforcement learning trains faster than supervised learning',
        'Reinforcement learning is simpler to implement than supervised learning'
      ],
      correctIndex: 1,
      explanation: 'The video uses AlphaGo as a concrete example: the supervised learning model learned from human grandmasters and got good quickly but never exceeded grandmaster level. The reinforcement learning model started poorly but, by playing itself and discovering its own strategies, eventually surpassed human grandmaster performance — something that would be impossible with supervised learning bounded by human labels.'
    },
    {
      question: 'In the context of neural network training, what is the purpose of a loss function?',
      options: [
        'It sets the architecture of the neural network layers',
        'It measures the discrepancy between the model\'s predictions and the actual values, providing the signal the optimizer minimises',
        'It determines which features to include in the model',
        'It controls how fast the model processes each batch of data'
      ],
      correctIndex: 1,
      explanation: 'A loss function (also called a cost or error function) quantifies how wrong the model\'s predictions are compared to reality. The training process uses gradient descent to update model parameters in the direction that minimises this discrepancy, improving accuracy over time.'
    },
    {
      question: 'What does the "All ML Concepts Explained" video identify as the key challenge caused by high model complexity?',
      options: [
        'The model trains too slowly to be practical',
        'The model requires more features to achieve good performance',
        'The model overfits — it memorises training data noise and fails to generalise to new examples',
        'The model underfits — it cannot capture the patterns in the training data'
      ],
      correctIndex: 2,
      explanation: 'The video explains the bias-variance tradeoff: as model complexity increases, variance increases and the model becomes sensitive to training data noise, leading to overfitting. An overfitted model performs well on training data but fails to generalise to unseen examples — the opposite of what we want in practice.'
    },
    {
      question: 'What is the key difference between supervised and self-supervised learning in the context of training LLMs?',
      options: [
        'Supervised learning requires human-labelled data for every example; self-supervised learning generates its own labels from the structure of the data (e.g. predicting the next token)',
        'Self-supervised learning is unsupervised learning with a different name',
        'Supervised learning is used for pre-training; self-supervised learning is used for fine-tuning',
        'Self-supervised learning requires more labelled data than supervised learning but produces better results'
      ],
      correctIndex: 0,
      explanation: 'Self-supervised learning creates training signals from the data itself — for example, masking a word and predicting it, or predicting the next token in a sequence. This is how LLMs are pre-trained on massive unlabelled text corpora. Supervised learning, by contrast, requires explicit human-provided labels for each example.'
    },
    {
      question: 'What is backpropagation and why is it essential to training neural networks?',
      options: [
        'A method for compressing model weights after training to reduce file size',
        'The algorithm that propagates the loss backward through the network, computing gradients for each parameter so they can be updated',
        'A technique for reversing incorrect predictions at inference time',
        'A data augmentation strategy that feeds outputs back as inputs'
      ],
      correctIndex: 1,
      explanation: 'Backpropagation computes how much each parameter contributed to the overall prediction error by propagating the loss backward through the network layers. These gradients tell gradient descent which direction and how much to adjust each parameter — it is the engine that makes neural network training possible.'
    },
    {
      question: 'In a RAG (Retrieval-Augmented Generation) system, what is the purpose of the retrieval step?',
      options: [
        'To fine-tune the model on the user\'s query before generating a response',
        'To fetch relevant documents from an external knowledge store and inject them into the model\'s context so the response is grounded in up-to-date information',
        'To cache the model\'s previous responses so they can be returned without regeneration',
        'To rank multiple model outputs and select the most confident one'
      ],
      correctIndex: 1,
      explanation: 'RAG separates knowledge from model weights. The retrieval step searches a vector database or document store for chunks relevant to the user\'s query, then injects them into the prompt context. This grounds the model\'s generation in specific, potentially up-to-date information — reducing hallucination and enabling the system to answer about data the model was never trained on.'
    },
    {
      question: 'What is an embedding in the context of AI engineering?',
      options: [
        'A compressed version of a model that runs faster on edge devices',
        'A dense numerical vector that captures the semantic meaning of text, images, or other data in a continuous vector space',
        'A unique identifier assigned to each API request for tracking purposes',
        'A method of encrypting sensitive data before sending it to an LLM'
      ],
      correctIndex: 1,
      explanation: 'Embeddings are dense vectors (arrays of floating-point numbers) that represent data in a continuous vector space where semantically similar items are close together. They are the foundation of semantic search, RAG systems, and recommendation engines — converting unstructured data into a format that enables mathematical similarity comparison.'
    },
  ],
  senior: [
    {
      question: 'When designing a production LLM agent, why is the principle of least privilege particularly important for tool access?',
      options: [
        'It reduces the computational cost of each agent step',
        'It limits the blast radius of a successful prompt injection attack — an agent with narrow permissions can do less damage if hijacked',
        'It makes the agent faster by reducing the number of available tools to choose from',
        'It ensures the agent always selects the most appropriate tool for each task'
      ],
      correctIndex: 1,
      explanation: 'Least privilege limits what an agent can do even if its reasoning is compromised (e.g., through prompt injection). A narrowly-scoped agent that can only read specific data cannot exfiltrate sensitive records or take irreversible actions, even if an attacker successfully redirects its instruction-following. This is a defence-in-depth principle, not a performance optimisation.'
    },
    {
      question: 'What is the key architectural difference between RAGAS "faithfulness" and "answer relevancy" metrics?',
      options: [
        'Faithfulness measures whether retrieved documents are relevant; answer relevancy measures whether the answer is correct',
        'Faithfulness measures whether the generated answer stays within the retrieved context; answer relevancy measures whether the answer addresses the user\'s question',
        'Faithfulness measures response speed; answer relevancy measures accuracy',
        'They measure the same thing from different perspectives and are interchangeable'
      ],
      correctIndex: 1,
      explanation: 'These are distinct dimensions of RAG quality. Faithfulness asks: "Did the model stick to what the retrieved context said, or did it hallucinate beyond it?" Answer relevancy asks: "Does the answer actually address what the user asked?" A response can be faithful to its context but still irrelevant to the question, or relevant but unfaithful by adding unsupported claims.'
    },
    {
      question: 'Under the EU AI Act, why are AI systems used in insurance underwriting and claims assessment classified as high-risk?',
      options: [
        'Because they use particularly complex algorithms that are difficult to audit',
        'Because they are listed in Annex III as systems affecting individuals\' access to essential private services, requiring conformity assessments before deployment',
        'Because they process large volumes of data that pose privacy risks under GDPR',
        'Because they are deployed at scale and therefore have a high potential for technical failure'
      ],
      correctIndex: 1,
      explanation: 'Annex III of the EU AI Act explicitly lists systems that evaluate access to essential private services — which includes insurance. This classification is risk-based (not complexity-based) because these systems make decisions that materially affect individuals\' lives. High-risk classification triggers requirements for conformity assessments, human oversight, transparency, and ongoing monitoring before deployment.'
    },
    {
      question: 'What distinguishes indirect prompt injection from direct prompt injection?',
      options: [
        'Indirect injection uses longer payloads than direct injection',
        'In indirect injection, malicious instructions are embedded in external data the agent retrieves (webpages, documents, emails) — not in the user\'s direct input',
        'Direct injection targets the system prompt; indirect injection targets only the user turn',
        'Indirect injection requires physical access to the model infrastructure'
      ],
      correctIndex: 1,
      explanation: 'Indirect prompt injection embeds malicious instructions in data the agent retrieves from external sources — webpages, documents, emails. When the agent incorporates this data into its context, the hidden instructions execute in the model\'s reasoning loop without the user or developer placing them there.'
    },
    {
      question: 'Why is implementing a maximum iteration limit critical in autonomous LLM agent loops?',
      options: [
        'To comply with API rate limits imposed by LLM providers',
        'To prevent runaway loops where the agent fails to converge on a solution, consuming unbounded tokens, time, and cost',
        'To ensure the agent produces a response within the context window limit',
        'To force the agent to use fewer tools per task, improving response quality'
      ],
      correctIndex: 1,
      explanation: 'Without iteration limits, an agent that cannot solve a task or enters a reasoning loop will keep calling tools and the LLM indefinitely — burning through API credits and time. Maximum iteration limits, combined with fallback behaviour (e.g. escalating to a human), are essential guardrails for production agent systems.'
    },
    {
      question: 'When designing evaluation for a production RAG system, why must retrieval quality and generation quality be measured separately?',
      options: [
        'Because retrieval runs on the CPU and generation runs on the GPU, so they have different performance profiles',
        'Because a correct answer from a wrong source is unreliable, and a faithful answer to the wrong question is useless — each failure mode requires different remediation',
        'Because retrieval metrics are easier to compute, so they should be evaluated first for efficiency',
        'Because generation quality can only be measured by human raters, while retrieval quality is fully automated'
      ],
      correctIndex: 1,
      explanation: 'RAG systems have two distinct failure modes. The retrieval component may fetch irrelevant chunks (poor recall or precision), while the generation component may hallucinate beyond or contradict the retrieved context (poor faithfulness). Measuring only end-to-end accuracy hides which component is failing. Metrics like context relevancy, faithfulness, and answer relevancy (as in RAGAS) isolate each component for targeted improvement.'
    },
    {
      question: 'What is the purpose of a "human-in-the-loop" checkpoint in a production LLM agent, and when should it be triggered?',
      options: [
        'It allows users to correct grammar mistakes in the agent\'s output before it is displayed',
        'It pauses the agent before any consequential or irreversible action — such as sending emails, deleting data, or initiating payments — requiring human approval to proceed',
        'It collects training data from the user to fine-tune the underlying model in real time',
        'It is only needed during the testing phase and should be removed before production deployment'
      ],
      correctIndex: 1,
      explanation: 'Human-in-the-loop checkpoints are a critical safety mechanism for production agents. They ensure that before the agent takes any action with real-world consequences — sending communications, modifying records, or making financial transactions — a human reviews and approves. This prevents irreversible harm from hallucinated tool arguments, prompt injection, or incorrect reasoning.'
    },
  ],
}
