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
  ],
}
