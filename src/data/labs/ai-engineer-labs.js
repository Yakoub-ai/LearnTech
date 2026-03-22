export const labs = [
  // ============================================================
  // AI ENGINEER LABS
  // ============================================================

  // Lab 1: copied exactly from interactiveLabs.js (id: ai-lab-1)
  {
    id: 'ai-lab-1',
    roleId: 'ai-engineer',
    level: 'beginner',
    title: 'Build a RAG Pipeline',
    description: 'Learn the fundamentals of Retrieval-Augmented Generation by building a simple document Q&A system step by step.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a RAG pipeline, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+ and a virtual environment. This lab uses only the Python standard library — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Load and Prepare Documents',
        instruction: 'Create a function that loads text documents and splits them into chunks. Chunking is essential for RAG because embedding models have token limits and smaller chunks produce more precise retrievals.',
        starterCode: `# Document loader and chunker for RAG pipeline
# Goal: Load text and split into overlapping chunks

def load_document(text):
    """Load a document string and return it cleaned."""
    # TODO: Strip whitespace and normalize newlines
    pass

def chunk_text(text, chunk_size=200, overlap=50):
    """Split text into overlapping chunks.

    Args:
        text: The full document text
        chunk_size: Number of characters per chunk
        overlap: Number of overlapping characters between chunks
    Returns:
        List of text chunks
    """
    # TODO: Implement sliding window chunking
    pass

# Test with sample data
sample = """
Machine learning is a subset of artificial intelligence.
It allows systems to learn from data without being explicitly programmed.
Deep learning is a subset of machine learning using neural networks.
Neural networks are inspired by the structure of the human brain.
"""

doc = load_document(sample)
chunks = chunk_text(doc, chunk_size=100, overlap=20)
print(f"Document length: {len(doc)} chars")
print(f"Number of chunks: {len(chunks)}")
for i, chunk in enumerate(chunks):
    print(f"Chunk {i}: {chunk[:50]}...")`,
        hints: [
          'Use text.strip() and text.replace("\\n\\n", "\\n") for cleaning',
          'For chunking, use a while loop stepping by (chunk_size - overlap)',
          'Make sure to include the last chunk even if it is shorter than chunk_size'
        ],
        expectedOutput: `Document length: ~220 chars
Number of chunks: 3-4
Chunk 0: Machine learning is a subset of artificial intelli...
Chunk 1: ...without being explicitly programmed. Deep learni...`,
        solution: `def load_document(text):
    """Load a document string and return it cleaned."""
    cleaned = text.strip()
    cleaned = cleaned.replace("\\n\\n", "\\n")
    return cleaned

def chunk_text(text, chunk_size=200, overlap=50):
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks

sample = """
Machine learning is a subset of artificial intelligence.
It allows systems to learn from data without being explicitly programmed.
Deep learning is a subset of machine learning using neural networks.
Neural networks are inspired by the structure of the human brain.
"""

doc = load_document(sample)
chunks = chunk_text(doc, chunk_size=100, overlap=20)
print(f"Document length: {len(doc)} chars")
print(f"Number of chunks: {len(chunks)}")
for i, chunk in enumerate(chunks):
    print(f"Chunk {i}: {chunk[:50]}...")`
      },
      {
        title: 'Step 3: Create Embeddings',
        instruction: 'Build a simple embedding function that converts text chunks into numerical vectors. In production you would use a model like OpenAI text-embedding-ada-002, but here we will create a TF-IDF-like bag-of-words approach to understand the concept.',
        starterCode: `# Simple embedding function using bag-of-words
import math
from collections import Counter

def build_vocabulary(chunks):
    """Build a vocabulary from all chunks.
    Returns a sorted list of unique words."""
    # TODO: Tokenize all chunks and collect unique words
    pass

def embed_chunk(chunk, vocabulary):
    """Convert a text chunk into a TF vector.

    Args:
        chunk: A text string
        vocabulary: List of all known words
    Returns:
        List of floats (TF values for each vocab word)
    """
    # TODO: Calculate term frequency for each vocab word
    pass

def cosine_similarity(vec_a, vec_b):
    """Calculate cosine similarity between two vectors."""
    # TODO: Implement dot product / (magnitude_a * magnitude_b)
    pass

# Test
chunks = [
    "machine learning uses data to train models",
    "deep learning is a type of machine learning",
    "neural networks power deep learning systems"
]

vocab = build_vocabulary(chunks)
print(f"Vocabulary size: {len(vocab)}")

embeddings = [embed_chunk(c, vocab) for c in chunks]
sim = cosine_similarity(embeddings[0], embeddings[1])
print(f"Similarity between chunk 0 and 1: {sim:.3f}")`,
        hints: [
          'Tokenize by lowering case and splitting on whitespace',
          'TF = count of word in chunk / total words in chunk',
          'Cosine similarity = sum(a*b) / (sqrt(sum(a^2)) * sqrt(sum(b^2)))'
        ],
        expectedOutput: `Vocabulary size: ~15
Similarity between chunk 0 and 1: ~0.4-0.6`,
        solution: `import math
from collections import Counter

def build_vocabulary(chunks):
    vocab = set()
    for chunk in chunks:
        words = chunk.lower().split()
        vocab.update(words)
    return sorted(vocab)

def embed_chunk(chunk, vocabulary):
    words = chunk.lower().split()
    word_counts = Counter(words)
    total = len(words)
    return [word_counts.get(w, 0) / total for w in vocabulary]

def cosine_similarity(vec_a, vec_b):
    dot = sum(a * b for a, b in zip(vec_a, vec_b))
    mag_a = math.sqrt(sum(a * a for a in vec_a))
    mag_b = math.sqrt(sum(b * b for b in vec_b))
    if mag_a == 0 or mag_b == 0:
        return 0.0
    return dot / (mag_a * mag_b)

chunks = [
    "machine learning uses data to train models",
    "deep learning is a type of machine learning",
    "neural networks power deep learning systems"
]

vocab = build_vocabulary(chunks)
print(f"Vocabulary size: {len(vocab)}")

embeddings = [embed_chunk(c, vocab) for c in chunks]
sim = cosine_similarity(embeddings[0], embeddings[1])
print(f"Similarity between chunk 0 and 1: {sim:.3f}")`
      },
      {
        title: 'Step 4: Build the Retriever',
        instruction: 'Create a retrieval function that takes a query, embeds it, and finds the most relevant chunks using cosine similarity. This is the "R" in RAG.',
        starterCode: `# Build a retriever that finds the most relevant chunks for a query

def retrieve(query, chunks, vocabulary, embeddings, top_k=2):
    """Find the top_k most relevant chunks for a query.

    Args:
        query: The user's question string
        chunks: List of text chunks
        vocabulary: The vocabulary list
        embeddings: Pre-computed chunk embeddings
        top_k: Number of results to return
    Returns:
        List of (chunk_text, similarity_score) tuples
    """
    # TODO: Embed the query, compute similarity with all chunks,
    # return top_k results sorted by similarity
    pass

# Test the retriever
chunks = [
    "Python is a high-level programming language known for readability",
    "Machine learning models learn patterns from training data",
    "Flask and Django are popular Python web frameworks",
    "Neural networks consist of layers of interconnected nodes",
    "Data preprocessing includes cleaning and normalizing datasets"
]

vocab = build_vocabulary(chunks)
embeddings = [embed_chunk(c, vocab) for c in chunks]

query = "What programming language is good for beginners?"
results = retrieve(query, chunks, vocab, embeddings, top_k=2)

print(f"Query: {query}")
print("\\nTop results:")
for chunk, score in results:
    print(f"  [{score:.3f}] {chunk}")`,
        hints: [
          'Embed the query the same way you embed chunks — using embed_chunk()',
          'Use a list of (similarity, index) tuples and sort by similarity descending',
          'Return the chunk text along with its score'
        ],
        expectedOutput: `Query: What programming language is good for beginners?
Top results:
  [0.xxx] Python is a high-level programming language...
  [0.xxx] Flask and Django are popular Python web frameworks...`,
        solution: `def retrieve(query, chunks, vocabulary, embeddings, top_k=2):
    query_embedding = embed_chunk(query, vocabulary)
    similarities = []
    for i, emb in enumerate(embeddings):
        sim = cosine_similarity(query_embedding, emb)
        similarities.append((sim, i))
    similarities.sort(reverse=True)
    results = []
    for sim, idx in similarities[:top_k]:
        results.append((chunks[idx], sim))
    return results

chunks = [
    "Python is a high-level programming language known for readability",
    "Machine learning models learn patterns from training data",
    "Flask and Django are popular Python web frameworks",
    "Neural networks consist of layers of interconnected nodes",
    "Data preprocessing includes cleaning and normalizing datasets"
]

vocab = build_vocabulary(chunks)
embeddings = [embed_chunk(c, vocab) for c in chunks]

query = "What programming language is good for beginners?"
results = retrieve(query, chunks, vocab, embeddings, top_k=2)

print(f"Query: {query}")
print("\\nTop results:")
for chunk, score in results:
    print(f"  [{score:.3f}] {chunk}")`
      },
      {
        title: 'Step 5: Generate the Answer',
        instruction: 'Complete the RAG pipeline by combining retrieved context with the query into a prompt template. In production this would go to an LLM, but here we will build the prompt construction and see how context affects the answer.',
        starterCode: `# Complete RAG pipeline: Retrieve + Augment + Generate

def build_rag_prompt(query, retrieved_chunks):
    """Build a prompt that includes retrieved context.

    Args:
        query: The user's question
        retrieved_chunks: List of (chunk_text, score) tuples
    Returns:
        A formatted prompt string ready for an LLM
    """
    # TODO: Build a prompt with context and question
    # Format: Context section with numbered chunks, then the question
    pass

def rag_pipeline(query, chunks, vocabulary, embeddings, top_k=2):
    """Full RAG pipeline: retrieve context and build augmented prompt."""
    # TODO: Use retrieve() to get context, then build_rag_prompt()
    pass

# Run the full pipeline
chunks = [
    "Python was created by Guido van Rossum in 1991",
    "Python emphasizes code readability with significant whitespace",
    "JavaScript is the language of the web browser",
    "Python has a large standard library called batteries included",
    "TypeScript adds static types to JavaScript"
]

vocab = build_vocabulary(chunks)
embeddings = [embed_chunk(c, vocab) for c in chunks]

query = "Tell me about Python's design philosophy"
prompt = rag_pipeline(query, chunks, vocab, embeddings, top_k=2)
print("=== Generated RAG Prompt ===")
print(prompt)`,
        hints: [
          'Start the prompt with "Answer based on the following context:"',
          'Number each context chunk: "[1] chunk text"',
          'End with "Question: {query}\\nAnswer:"'
        ],
        expectedOutput: `=== Generated RAG Prompt ===
Answer based on the following context:

[1] Python emphasizes code readability with significant whitespace
[2] Python was created by Guido van Rossum in 1991

Question: Tell me about Python's design philosophy
Answer:`,
        solution: `def build_rag_prompt(query, retrieved_chunks):
    context_lines = []
    for i, (chunk, score) in enumerate(retrieved_chunks, 1):
        context_lines.append(f"[{i}] {chunk}")
    context = "\\n".join(context_lines)

    prompt = f"""Answer based on the following context:

{context}

Question: {query}
Answer:"""
    return prompt

def rag_pipeline(query, chunks, vocabulary, embeddings, top_k=2):
    retrieved = retrieve(query, chunks, vocabulary, embeddings, top_k)
    return build_rag_prompt(query, retrieved)

chunks = [
    "Python was created by Guido van Rossum in 1991",
    "Python emphasizes code readability with significant whitespace",
    "JavaScript is the language of the web browser",
    "Python has a large standard library called batteries included",
    "TypeScript adds static types to JavaScript"
]

vocab = build_vocabulary(chunks)
embeddings = [embed_chunk(c, vocab) for c in chunks]

query = "Tell me about Python's design philosophy"
prompt = rag_pipeline(query, chunks, vocab, embeddings, top_k=2)
print("=== Generated RAG Prompt ===")
print(prompt)`
      }
    ]
  },

  // ============================================================
  // Lab 2: Basic Prompt to OpenAI API (converted from ai-1)
  // ============================================================
  {
    id: 'ai-lab-2',
    roleId: 'ai-engineer',
    level: 'beginner',
    title: 'Your First OpenAI API Call',
    description: 'Learn how to authenticate with the OpenAI API, structure a chat-completion request with system and user roles, and interpret the response object. This is the foundational skill every AI engineer uses daily — every LLM-powered product starts with exactly this pattern.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing code, ensure your AI Engineering environment is ready. Click "Go to Dev Setup" below to access the complete setup guide. You will need: Python 3.12+, pip, the OpenAI SDK, a virtual environment, and an API key configured in a .env file. Complete all setup steps and run the verification commands before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" to see all installation steps',
          'Run `python --version` and `pip --version` to verify your setup',
          'Create a .env file with OPENAI_API_KEY=sk-... before starting the next step'
        ],
        expectedOutput: `Python 3.12.x
pip 24.x
openai 1.x.x installed
OPENAI_API_KEY loaded from .env`,
        solution: null
      },
      {
        title: 'Step 2: Load Your API Key Securely',
        instruction: 'AI engineers never hard-code API keys in source files — they load them from environment variables at runtime. This protects credentials from leaking into version control and makes code portable across environments (local, staging, production). Use python-dotenv to load your .env file, then instantiate the OpenAI client.',
        starterCode: `# secure_client.py
# Goal: Load API credentials from environment variables and create the client

# TODO: Import load_dotenv from dotenv and os
# TODO: Import OpenAI from openai

# TODO: Call load_dotenv() to read the .env file into os.environ

# TODO: Read OPENAI_API_KEY from environment with os.getenv()
#       Raise a ValueError if the key is missing or empty

# TODO: Instantiate the OpenAI client with the api_key argument

# Verification — should print the first 8 chars of the key
print(f"Client ready. Key prefix: {api_key[:8]}...")`,
        hints: [
          'python-dotenv reads your .env file with load_dotenv() before os.getenv() is called',
          'Use: api_key = os.getenv("OPENAI_API_KEY") and check `if not api_key: raise ValueError(...)`',
          'If you see AuthenticationError, the key is missing or invalid — check your .env for extra spaces or quotes'
        ],
        expectedOutput: `Client ready. Key prefix: sk-proj-...`,
        solution: `from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found. Add it to your .env file.")

client = OpenAI(api_key=api_key)

print(f"Client ready. Key prefix: {api_key[:8]}...")`
      },
      {
        title: 'Step 3: Structure the Chat Completion Request',
        instruction: "OpenAI's chat API uses a messages array where each entry has a role ('system', 'user', or 'assistant') and content. The system role sets the model's behavior and persona for the entire conversation. Understanding this structure is critical because every advanced pattern — few-shot prompting, RAG, agents — is built on top of this same message format.",
        starterCode: `# chat_request.py
# Goal: Build a well-structured chat completion request

from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# TODO: Call client.chat.completions.create() with:
#   model = "gpt-4o-mini"   (cost-efficient for learning)
#   messages = a list with two dicts:
#     1. role "system": "You are a concise technical explainer. Answer in 2-3 sentences."
#     2. role "user": "Explain what a transformer model is."
#   temperature = 0.7        (controls creativity: 0=deterministic, 1=creative)
#   max_tokens = 200         (caps response length to control cost)

# Store the result in: response

# TODO: Extract and print the answer text from response
# Hint: response.choices[0].message.content`,
        hints: [
          'The messages list order matters: system always comes first, then user messages',
          'Access the response text with: response.choices[0].message.content',
          'If you get a RateLimitError, wait 60 seconds — free-tier keys have per-minute limits'
        ],
        expectedOutput: `A transformer model is a type of neural network architecture that uses self-attention mechanisms to process sequences of data in parallel. It was introduced in the 2017 paper "Attention Is All You Need" and became the foundation for modern LLMs like GPT and BERT. Unlike RNNs, transformers handle long-range dependencies efficiently by attending to all positions in a sequence simultaneously.`,
        solution: `from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a concise technical explainer. Answer in 2-3 sentences."},
        {"role": "user", "content": "Explain what a transformer model is."}
    ],
    temperature=0.7,
    max_tokens=200
)

print(response.choices[0].message.content)`
      },
      {
        title: 'Step 4: Inspect the Full Response Object',
        instruction: 'The raw response object contains more than just the answer text — it exposes usage statistics (prompt tokens, completion tokens, total tokens) that are essential for cost monitoring and debugging. In production AI systems, engineers log this metadata for every request to track costs, detect anomalies, and optimize token usage. Explore the response object and build a simple usage logger.',
        starterCode: `# response_inspector.py
# Goal: Extract metadata from the API response to understand token usage and cost

from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ],
    temperature=0.7,
    max_tokens=150
)

# TODO: Print the answer text

# TODO: Print the model that was used (response.model)

# TODO: Print the finish_reason (response.choices[0].finish_reason)
#       This tells you WHY the response ended: "stop" = natural end, "length" = hit max_tokens

# TODO: Print token usage — prompt_tokens, completion_tokens, total_tokens
#       from response.usage

# TODO: Estimate cost and print it
#       gpt-4o-mini input:  $0.00015 per 1k tokens
#       gpt-4o-mini output: $0.00060 per 1k tokens
COST_PER_1K_INPUT = 0.00015
COST_PER_1K_OUTPUT = 0.00060`,
        hints: [
          'Token usage lives at response.usage.prompt_tokens and response.usage.completion_tokens',
          'finish_reason "length" means the model was cut off — increase max_tokens if you see this',
          'Estimated cost = (prompt_tokens / 1000 * input_rate) + (completion_tokens / 1000 * output_rate)'
        ],
        expectedOutput: `Answer: Quantum computing uses quantum bits (qubits) that can exist in multiple states simultaneously...

Model used: gpt-4o-mini
Finish reason: stop

Token Usage:
  Prompt tokens:     28
  Completion tokens: 89
  Total tokens:      117

Estimated cost: $0.000058`,
        solution: `from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ],
    temperature=0.7,
    max_tokens=150
)

COST_PER_1K_INPUT = 0.00015
COST_PER_1K_OUTPUT = 0.00060

answer = response.choices[0].message.content
print(f"Answer: {answer}\\n")

print(f"Model used: {response.model}")
print(f"Finish reason: {response.choices[0].finish_reason}\\n")

usage = response.usage
print("Token Usage:")
print(f"  Prompt tokens:     {usage.prompt_tokens}")
print(f"  Completion tokens: {usage.completion_tokens}")
print(f"  Total tokens:      {usage.total_tokens}\\n")

cost = (usage.prompt_tokens / 1000 * COST_PER_1K_INPUT) + (usage.completion_tokens / 1000 * COST_PER_1K_OUTPUT)
print(f"Estimated cost: \${cost:.6f}")`
      }
    ]
  },

  // ============================================================
  // Lab 3: RAG Pipeline with LangChain (converted from ai-2)
  // ============================================================
  {
    id: 'ai-lab-3',
    roleId: 'ai-engineer',
    level: 'mid',
    title: 'Production RAG Pipeline with LangChain',
    description: 'Move beyond from-scratch RAG and build a production-quality document Q&A system using LangChain, FAISS vector search, and OpenAI embeddings. This pattern powers enterprise knowledge bases, customer support bots, and internal documentation search — understanding its components makes you effective in any LLM production codebase.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing code, ensure your AI Engineering environment is ready. Click "Go to Dev Setup" below to access the complete setup guide. For this lab you specifically need: Python 3.12+, openai, langchain, langchain-community, langchain-openai, faiss-cpu, and python-dotenv installed. Run the verification commands to confirm the imports work before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" to see all installation steps',
          'Run: pip install openai langchain langchain-community langchain-openai langchain-text-splitters faiss-cpu python-dotenv',
          'Verify with: python -c "from langchain_openai import OpenAIEmbeddings; print(\'OK\')"'
        ],
        expectedOutput: `Python 3.12.x
langchain installed
langchain-openai installed
faiss-cpu installed
OPENAI_API_KEY loaded from .env
OK`,
        solution: null
      },
      {
        title: 'Step 2: Load Documents and Split into Chunks',
        instruction: "LangChain's RecursiveCharacterTextSplitter is the industry default for RAG chunking because it tries to split on semantic boundaries (paragraphs, sentences, words) before falling back to character splits. The chunk_overlap parameter ensures context is not lost at boundaries — a critical correctness concern. For this lab we will create an in-memory document rather than reading from disk, so the code runs without external files.",
        starterCode: `# rag_pipeline.py  Step 2: Document loading and chunking
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Sample knowledge base — in production this comes from TextLoader, PDFLoader, etc.
raw_text = """
LangChain is an open-source framework for building applications with large language models.
It provides abstractions for document loaders, text splitters, embeddings, vector stores, and chains.
LangChain supports integration with OpenAI, Anthropic, Cohere, and many other LLM providers.

Retrieval-Augmented Generation (RAG) combines retrieval systems with generative models.
Instead of relying on the model's training data alone, RAG fetches relevant documents at query time.
This reduces hallucinations and allows the model to answer questions about private or recent data.

FAISS stands for Facebook AI Similarity Search.
It is an open-source library for efficient similarity search on dense vectors.
FAISS is optimized for in-memory search and can handle millions of vectors quickly.
"""

# TODO: Wrap raw_text in a LangChain Document object
#       Document(page_content=raw_text, metadata={"source": "knowledge_base"})

# TODO: Create a RecursiveCharacterTextSplitter with:
#       chunk_size=300, chunk_overlap=50

# TODO: Call splitter.split_documents([document]) to get chunks

# TODO: Print the number of chunks and preview the first chunk's content`,
        hints: [
          'Document() takes page_content and metadata kwargs — metadata is used for source attribution in production',
          'chunk_overlap=50 means 50 characters repeat between consecutive chunks, preserving cross-boundary context',
          'Access chunk text with chunks[0].page_content and metadata with chunks[0].metadata'
        ],
        expectedOutput: `Created 5 chunks from 1 document

Chunk 0 preview:
  Content: LangChain is an open-source framework for building applications...
  Metadata: {'source': 'knowledge_base'}`,
        solution: `from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

raw_text = """
LangChain is an open-source framework for building applications with large language models.
It provides abstractions for document loaders, text splitters, embeddings, vector stores, and chains.
LangChain supports integration with OpenAI, Anthropic, Cohere, and many other LLM providers.

Retrieval-Augmented Generation (RAG) combines retrieval systems with generative models.
Instead of relying on the model's training data alone, RAG fetches relevant documents at query time.
This reduces hallucinations and allows the model to answer questions about private or recent data.

FAISS stands for Facebook AI Similarity Search.
It is an open-source library for efficient similarity search on dense vectors.
FAISS is optimized for in-memory search and can handle millions of vectors quickly.
"""

document = Document(page_content=raw_text, metadata={"source": "knowledge_base"})

splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)
chunks = splitter.split_documents([document])

print(f"Created {len(chunks)} chunks from 1 document\\n")
print("Chunk 0 preview:")
print(f"  Content: {chunks[0].page_content[:60]}...")
print(f"  Metadata: {chunks[0].metadata}")`
      },
      {
        title: 'Step 3: Embed Chunks and Build the Vector Store',
        instruction: "OpenAI's text-embedding-3-small model converts each text chunk into a 1536-dimensional float vector that captures semantic meaning. FAISS stores these vectors in an index optimized for approximate nearest-neighbor search — finding the k most similar vectors to a query in milliseconds even across millions of entries. This embed-then-index pattern is the backbone of every production RAG system.",
        starterCode: `# rag_pipeline.py  Step 3: Embeddings and vector store
from dotenv import load_dotenv
import os
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

load_dotenv()

# (chunks from Step 2 should be in scope — paste your Step 2 code above this)

# TODO: Instantiate OpenAIEmbeddings
#       Use model="text-embedding-3-small" (cheaper and faster than ada-002)

# TODO: Build a FAISS vector store from the chunks
#       Use FAISS.from_documents(chunks, embeddings_model)
#       This calls the embedding API for every chunk and indexes the results

# TODO: Print confirmation with the number of indexed vectors
#       Hint: vector_store.index.ntotal gives the count

# TODO: Run a quick similarity search to verify the index works
#       query = "What is FAISS used for?"
#       results = vector_store.similarity_search(query, k=2)
#       Print each result's page_content`,
        hints: [
          'FAISS.from_documents() makes one embedding API call per chunk — expect a short wait',
          'vector_store.index.ntotal returns the count of vectors stored in the FAISS index',
          'similarity_search returns Document objects — access content via result.page_content'
        ],
        expectedOutput: `Indexed 5 vectors in FAISS

Similarity search: "What is FAISS used for?"
Result 1: FAISS stands for Facebook AI Similarity Search. It is an open-source library...
Result 2: Retrieval-Augmented Generation (RAG) combines retrieval systems with generative models...`,
        solution: `from dotenv import load_dotenv
import os
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

load_dotenv()

embeddings_model = OpenAIEmbeddings(model="text-embedding-3-small")

vector_store = FAISS.from_documents(chunks, embeddings_model)

print(f"Indexed {vector_store.index.ntotal} vectors in FAISS\\n")

query = "What is FAISS used for?"
results = vector_store.similarity_search(query, k=2)
print(f'Similarity search: "{query}"')
for i, result in enumerate(results, 1):
    print(f"Result {i}: {result.page_content[:80]}...")`
      },
      {
        title: 'Step 4: Wire Up the Retrieval Chain',
        instruction: "LangChain's create_retrieval_chain is the modern LCEL-based way to connect retrieval and generation: it embeds the user's query, fetches the top-k chunks from the vector store, injects them into a prompt template via create_stuff_documents_chain, and calls the LLM. This approach replaces the deprecated RetrievalQA chain from LangChain v0.2+.",
        starterCode: `# rag_pipeline.py  Step 4: Full retrieval chain (LCEL)
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

# (vector_store from Step 3 should be in scope)

# TODO: Instantiate ChatOpenAI
#       model="gpt-4o-mini", temperature=0 (deterministic for Q&A)

# TODO: Build a retriever from the vector store
#       retriever = vector_store.as_retriever(search_kwargs={"k": 3})
#       k=3 means fetch 3 most relevant chunks per query

# TODO: Create a ChatPromptTemplate with a system message that uses {context} and {input}
#       prompt = ChatPromptTemplate.from_template("Answer based on context:\\n{context}\\n\\nQuestion: {input}")

# TODO: Create a combine_docs_chain using create_stuff_documents_chain(llm, prompt)

# TODO: Create qa_chain using create_retrieval_chain(retriever, combine_docs_chain)

# TODO: Invoke the chain: result = qa_chain.invoke({"input": question})
#       question = "How does RAG reduce hallucinations?"

# TODO: Print result["answer"] (the answer)
# TODO: Print result["context"] (the source documents) so the user can verify provenance`,
        hints: [
          'create_retrieval_chain expects {input} (not {query}) — invoke with qa_chain.invoke({"input": question})',
          'The answer is in result["answer"] and the retrieved docs are in result["context"]',
          'temperature=0 for Q&A chains because you want factual, deterministic answers, not creative ones'
        ],
        expectedOutput: `Question: How does RAG reduce hallucinations?

Answer: RAG reduces hallucinations by fetching relevant documents at query time and providing them as context to the model, so the model answers based on retrieved facts rather than its training data alone.

Sources used:
  [1] Retrieval-Augmented Generation (RAG) combines retrieval systems with generative models. Instead of relying on the model's training data alone, RAG fetches relevant documents at query time...
  [2] LangChain is an open-source framework for building applications with large language models...`,
        solution: `from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

retriever = vector_store.as_retriever(search_kwargs={"k": 3})

prompt = ChatPromptTemplate.from_template("Answer based on context:\\n{context}\\n\\nQuestion: {input}")
combine_docs_chain = create_stuff_documents_chain(llm, prompt)
qa_chain = create_retrieval_chain(retriever, combine_docs_chain)

question = "How does RAG reduce hallucinations?"
result = qa_chain.invoke({"input": question})

print(f"Question: {question}\\n")
print(f"Answer: {result['answer']}\\n")
print("Sources used:")
for i, doc in enumerate(result["context"], 1):
    print(f"  [{i}] {doc.page_content[:120]}...")`
      }
    ]
  },

  // ============================================================
  // Lab 4: Few-Shot Prompting (converted from ai-3)
  // ============================================================
  {
    id: 'ai-lab-4',
    roleId: 'ai-engineer',
    level: 'senior',
    title: 'Few-Shot Prompting and Structured Classification',
    description: 'Master few-shot prompting — the technique of teaching the model a task by example rather than explicit instructions. You will build a reusable sentiment classifier that constructs dynamic few-shot prompts, enforces structured output format, and evaluates accuracy across a test set. This pattern is the most cost-effective way to adapt a general LLM to domain-specific tasks without fine-tuning.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing code, ensure your AI Engineering environment is ready. Click "Go to Dev Setup" below to access the complete setup guide. You will need: Python 3.12+, the OpenAI SDK, and python-dotenv. This lab uses only the standard chat completions API with no additional packages.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" to see all installation steps',
          'Run: pip install openai python-dotenv',
          'Verify with: python -c "from openai import OpenAI; print(\'OK\')"'
        ],
        expectedOutput: `Python 3.12.x
openai 1.x.x installed
OPENAI_API_KEY loaded from .env
OK`,
        solution: null
      },
      {
        title: 'Step 2: Build a Dynamic Few-Shot Prompt Constructor',
        instruction: "Few-shot prompting works by prepending labeled examples to the model's input. The key insight is that the format of examples directly controls the format of the output — if your examples say 'Sentiment: positive', the model will mirror that exact format. Building a prompt constructor as a function (rather than hard-coding strings) lets you swap example sets to control model behavior without changing API call code.",
        starterCode: `# few_shot_classifier.py  Step 2: Prompt construction
# Goal: Build a reusable function that creates few-shot classification prompts

# These are our labeled training examples — the "shots"
EXAMPLES = [
    {"input": "The weather is beautiful today", "sentiment": "positive"},
    {"input": "I hate waiting in traffic for hours", "sentiment": "negative"},
    {"input": "It was just okay, nothing special", "sentiment": "neutral"},
    {"input": "This is the best product I have ever bought!", "sentiment": "positive"},
    {"input": "Terrible service, would not recommend", "sentiment": "negative"},
]

def build_few_shot_prompt(examples, new_input):
    """Build a few-shot classification prompt from examples.

    Args:
        examples: List of dicts with 'input' and 'sentiment' keys
        new_input: The new text to classify
    Returns:
        A string prompt ready to send to the API
    """
    # TODO: Start with a task description line:
    #       "Classify the sentiment of each text as positive, negative, or neutral.\\n\\n"

    # TODO: For each example, append:
    #       f"Text: {example['input']}\\nSentiment: {example['sentiment']}\\n\\n"

    # TODO: Append the new input WITHOUT the answer:
    #       f"Text: {new_input}\\nSentiment:"
    pass

# Test your prompt constructor
prompt = build_few_shot_prompt(EXAMPLES, "I am so excited about this vacation!")
print(prompt)
print("---")
print(f"Prompt length: {len(prompt)} characters")`,
        hints: [
          'Build the prompt with string concatenation or a list joined with empty string',
          'The final line must end with "Sentiment:" with no newline — the model will complete it',
          'More examples generally improve accuracy but cost more tokens; 3-5 examples is usually the sweet spot'
        ],
        expectedOutput: `Classify the sentiment of each text as positive, negative, or neutral.

Text: The weather is beautiful today
Sentiment: positive

Text: I hate waiting in traffic for hours
Sentiment: negative

Text: It was just okay, nothing special
Sentiment: neutral

Text: This is the best product I have ever bought!
Sentiment: positive

Text: Terrible service, would not recommend
Sentiment: negative

Text: I am so excited about this vacation!
Sentiment:
---
Prompt length: ~520 characters`,
        solution: `EXAMPLES = [
    {"input": "The weather is beautiful today", "sentiment": "positive"},
    {"input": "I hate waiting in traffic for hours", "sentiment": "negative"},
    {"input": "It was just okay, nothing special", "sentiment": "neutral"},
    {"input": "This is the best product I have ever bought!", "sentiment": "positive"},
    {"input": "Terrible service, would not recommend", "sentiment": "negative"},
]

def build_few_shot_prompt(examples, new_input):
    prompt = "Classify the sentiment of each text as positive, negative, or neutral.\\n\\n"
    for example in examples:
        prompt += f"Text: {example['input']}\\nSentiment: {example['sentiment']}\\n\\n"
    prompt += f"Text: {new_input}\\nSentiment:"
    return prompt

prompt = build_few_shot_prompt(EXAMPLES, "I am so excited about this vacation!")
print(prompt)
print("---")
print(f"Prompt length: {len(prompt)} characters")`
      },
      {
        title: 'Step 3: Call the API and Parse Structured Output',
        instruction: 'Setting temperature=0 for classification tasks is a best practice: it makes the model deterministic so you get the same answer every time for the same input, which is essential for reproducibility and testing. After calling the API, you must strip and normalize the output because the model sometimes adds trailing punctuation or extra whitespace — defensive parsing is critical in production classifiers.',
        starterCode: `# few_shot_classifier.py  Step 3: API call with structured output parsing
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

VALID_LABELS = {"positive", "negative", "neutral"}

def classify_sentiment(text, examples=EXAMPLES):
    """Classify the sentiment of text using few-shot prompting.

    Args:
        text: Input string to classify
        examples: Few-shot examples list
    Returns:
        One of: "positive", "negative", "neutral", or "unknown"
    """
    # TODO: Build the prompt using build_few_shot_prompt()

    # TODO: Call client.chat.completions.create() with:
    #       model="gpt-4o-mini"
    #       messages=[{"role": "user", "content": prompt}]
    #       temperature=0       <- deterministic for classifiers
    #       max_tokens=5        <- we only need one word in response

    # TODO: Extract the response text, strip whitespace,
    #       lowercase it, and remove trailing punctuation

    # TODO: Return the label if it is in VALID_LABELS, else return "unknown"
    pass

# Test it
test_inputs = [
    "I absolutely loved this movie!",
    "The food was cold and tasteless.",
    "The package arrived on Tuesday.",
]

for text in test_inputs:
    label = classify_sentiment(text)
    print(f"'{text[:40]}...' -> {label}")`,
        hints: [
          'Use .strip().lower().rstrip(".,!") to normalize the model output before checking VALID_LABELS',
          'max_tokens=5 is enough for a single-word label and saves cost on bulk classification',
          'If label is "unknown", the model output an unexpected format — log the raw response to debug'
        ],
        expectedOutput: `'I absolutely loved this movie!...' -> positive
'The food was cold and tasteless....' -> negative
'The package arrived on Tuesday....' -> neutral`,
        solution: `from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

VALID_LABELS = {"positive", "negative", "neutral"}

def classify_sentiment(text, examples=EXAMPLES):
    prompt = build_few_shot_prompt(examples, text)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
        max_tokens=5
    )

    raw = response.choices[0].message.content
    label = raw.strip().lower().rstrip(".,!")

    return label if label in VALID_LABELS else "unknown"

test_inputs = [
    "I absolutely loved this movie!",
    "The food was cold and tasteless.",
    "The package arrived on Tuesday.",
]

for text in test_inputs:
    label = classify_sentiment(text)
    print(f"'{text[:40]}...' -> {label}")`
      },
      {
        title: 'Step 4: Evaluate Classifier Accuracy',
        instruction: 'A classifier is only useful if you know how accurate it is. AI engineers build evaluation harnesses that run the model against a labeled test set and compute precision per class. Accuracy alone is misleading on imbalanced datasets — tracking per-class results reveals where the model makes errors. This step teaches the habit of always evaluating models quantitatively before deploying them.',
        starterCode: `# few_shot_classifier.py  Step 4: Evaluation harness
# Goal: Measure classifier accuracy on a held-out test set

TEST_SET = [
    ("This restaurant is fantastic!", "positive"),
    ("I regret buying this product.", "negative"),
    ("The meeting was rescheduled to 3pm.", "neutral"),
    ("Outstanding customer support team!", "positive"),
    ("Worst experience of my life.", "negative"),
    ("The report contains 12 pages.", "neutral"),
    ("I feel incredibly happy today.", "positive"),
    ("This is a complete disappointment.", "negative"),
    ("The store opens at 9am on weekdays.", "neutral"),
]

def evaluate_classifier(test_set):
    """Run the classifier on test_set and compute accuracy metrics.

    Returns:
        dict with keys: total, correct, accuracy, per_class
    """
    # TODO: Initialize counters: correct=0, per_class={"positive":{correct,total}, ...}

    # TODO: For each (text, expected_label) in test_set:
    #       - Call classify_sentiment(text)
    #       - Compare to expected_label
    #       - Update correct and per_class counters
    #       - Print: f"  {'OK' if match else 'FAIL'} | Expected: {expected} | Got: {predicted} | {text[:40]}"

    # TODO: Compute overall accuracy = correct / len(test_set)

    # TODO: Return the metrics dict
    pass

print("Running evaluation...\\n")
metrics = evaluate_classifier(TEST_SET)

print(f"\\nOverall accuracy: {metrics['accuracy']:.1%} ({metrics['correct']}/{metrics['total']})")
print("\\nPer-class results:")
for label, counts in metrics["per_class"].items():
    acc = counts["correct"] / counts["total"] if counts["total"] > 0 else 0
    print(f"  {label}: {counts['correct']}/{counts['total']} ({acc:.0%})")`,
        hints: [
          'Initialize per_class as a dict of dicts: {"positive": {"correct": 0, "total": 0}, ...}',
          'Increment per_class[expected_label]["total"] for every sample, per_class[...]["correct"] only on match',
          'If accuracy is below 80%, consider adding more examples or using a stronger model'
        ],
        expectedOutput: `Running evaluation...

  OK   | Expected: positive | Got: positive | This restaurant is fantastic!
  OK   | Expected: negative | Got: negative | I regret buying this product.
  OK   | Expected: neutral  | Got: neutral  | The meeting was rescheduled to 3pm.
  OK   | Expected: positive | Got: positive | Outstanding customer support team!
  OK   | Expected: negative | Got: negative | Worst experience of my life.
  OK   | Expected: neutral  | Got: neutral  | The report contains 12 pages.
  OK   | Expected: positive | Got: positive | I feel incredibly happy today.
  OK   | Expected: negative | Got: negative | This is a complete disappointment.
  OK   | Expected: neutral  | Got: neutral  | The store opens at 9am on weekdays.

Overall accuracy: 100.0% (9/9)

Per-class results:
  positive: 3/3 (100%)
  negative: 3/3 (100%)
  neutral: 3/3 (100%)`,
        solution: `TEST_SET = [
    ("This restaurant is fantastic!", "positive"),
    ("I regret buying this product.", "negative"),
    ("The meeting was rescheduled to 3pm.", "neutral"),
    ("Outstanding customer support team!", "positive"),
    ("Worst experience of my life.", "negative"),
    ("The report contains 12 pages.", "neutral"),
    ("I feel incredibly happy today.", "positive"),
    ("This is a complete disappointment.", "negative"),
    ("The store opens at 9am on weekdays.", "neutral"),
]

def evaluate_classifier(test_set):
    correct = 0
    per_class = {label: {"correct": 0, "total": 0} for label in ["positive", "negative", "neutral"]}

    for text, expected in test_set:
        predicted = classify_sentiment(text)
        match = predicted == expected
        if match:
            correct += 1
        if expected in per_class:
            per_class[expected]["total"] += 1
            if match:
                per_class[expected]["correct"] += 1
        status = "OK  " if match else "FAIL"
        print(f"  {status} | Expected: {expected:<8} | Got: {predicted:<8} | {text[:40]}")

    return {
        "total": len(test_set),
        "correct": correct,
        "accuracy": correct / len(test_set),
        "per_class": per_class
    }

print("Running evaluation...\\n")
metrics = evaluate_classifier(TEST_SET)

print(f"\\nOverall accuracy: {metrics['accuracy']:.1%} ({metrics['correct']}/{metrics['total']})")
print("\\nPer-class results:")
for label, counts in metrics["per_class"].items():
    acc = counts["correct"] / counts["total"] if counts["total"] > 0 else 0
    print(f"  {label}: {counts['correct']}/{counts['total']} ({acc:.0%})")`
      }
    ]
  },

  // ============================================================
  // Lab 5: Streaming Chat Response (converted from ai-4)
  // ============================================================
  {
    id: 'ai-lab-5',
    roleId: 'ai-engineer',
    level: 'mid',
    title: 'Streaming Chat with Conversation History',
    description: 'Build a streaming multi-turn chat client that displays tokens as they arrive and maintains full conversation history. Streaming is the standard UX pattern for all production AI chat products — it dramatically reduces perceived latency. Managing history correctly is equally important: improperly maintained history causes context loss or runaway token costs.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing code, ensure your AI Engineering environment is ready. Click "Go to Dev Setup" below to access the complete setup guide. You will need: Python 3.12+, the OpenAI SDK, and python-dotenv. This lab uses only stdlib plus the openai package.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" to see all installation steps',
          'Run: pip install openai python-dotenv',
          'Verify with: python -c "from openai import OpenAI; print(\'Ready\')"'
        ],
        expectedOutput: `Python 3.12.x
openai 1.x.x installed
OPENAI_API_KEY loaded from .env
Ready`,
        solution: null
      },
      {
        title: 'Step 2: Design the StreamingChat Class',
        instruction: 'A well-designed chat client encapsulates two concerns: conversation state (the messages history list) and API communication. Storing history as an instance variable lets you add messages from both sides of the conversation and replay the full context to the model on every turn — which is required for the model to reference prior messages. The system prompt is injected once at initialization and stays at index 0 of history forever.',
        starterCode: `# streaming_chat.py  Step 2: Class skeleton with history management
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class StreamingChat:
    """A chat client that streams responses and maintains conversation history."""

    def __init__(self, model="gpt-4o-mini", system_prompt="You are a helpful assistant."):
        # TODO: Store model as self.model

        # TODO: Initialize self.history as a list containing the system message:
        #       [{"role": "system", "content": system_prompt}]

        # TODO: Initialize self.total_tokens = 0 (for usage tracking)
        pass

    def add_message(self, role, content):
        """Append a message to the conversation history.

        Args:
            role: "user" or "assistant"
            content: The message string
        """
        # TODO: Append {"role": role, "content": content} to self.history
        pass

    def get_history_summary(self):
        """Return a summary of conversation length for debugging."""
        # TODO: Return a string like "3 messages (1 system, 1 user, 1 assistant)"
        #       Count each role type from self.history
        pass

# Smoke test the class
chat = StreamingChat(system_prompt="You are a concise technical tutor.")
chat.add_message("user", "Hello!")
chat.add_message("assistant", "Hi! How can I help you today?")
print(chat.get_history_summary())
print("History[0]:", chat.history[0])`,
        hints: [
          'self.history starts with the system message so it always persists at the front of every API call',
          'For get_history_summary, use a Counter or manual dict to count roles: from collections import Counter',
          'Never mutate self.history[0] — the system prompt should be immutable after __init__'
        ],
        expectedOutput: `3 messages (1 system, 1 user, 1 assistant)
History[0]: {'role': 'system', 'content': 'You are a concise technical tutor.'}`,
        solution: `from dotenv import load_dotenv
import os
from openai import OpenAI
from collections import Counter

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class StreamingChat:
    """A chat client that streams responses and maintains conversation history."""

    def __init__(self, model="gpt-4o-mini", system_prompt="You are a helpful assistant."):
        self.model = model
        self.history = [{"role": "system", "content": system_prompt}]
        self.total_tokens = 0

    def add_message(self, role, content):
        self.history.append({"role": role, "content": content})

    def get_history_summary(self):
        counts = Counter(msg["role"] for msg in self.history)
        parts = ", ".join(f"{v} {k}" for k, v in sorted(counts.items()))
        return f"{len(self.history)} messages ({parts})"

chat = StreamingChat(system_prompt="You are a concise technical tutor.")
chat.add_message("user", "Hello!")
chat.add_message("assistant", "Hi! How can I help you today?")
print(chat.get_history_summary())
print("History[0]:", chat.history[0])`
      },
      {
        title: 'Step 3: Implement Token-by-Token Streaming',
        instruction: 'Streaming works by passing stream=True to the API, which returns an iterator of chunks instead of a single response. Each chunk contains a delta object — only the new token(s) for this chunk. By writing each token immediately to stdout with sys.stdout.flush(), the user sees the response grow in real time rather than waiting for the complete answer. This is what makes modern AI chat UIs feel fast and responsive.',
        starterCode: `# streaming_chat.py  Step 3: stream_response method
import sys
import openai

# (Add this method inside the StreamingChat class from Step 2)

def stream_response(self, user_message):
    """Send a user message and stream the assistant's reply token by token.

    Args:
        user_message: The user's input string
    Returns:
        The complete reply string, or None on error
    """
    # TODO: Call self.add_message("user", user_message) to record the user turn

    collected_tokens = []

    try:
        # TODO: Call client.chat.completions.create() with:
        #       model=self.model
        #       messages=self.history
        #       stream=True          <- enables streaming mode
        #       temperature=0.7
        #       max_tokens=500

        # TODO: Iterate over the streaming response with: for chunk in response:
        #       - Get delta = chunk.choices[0].delta
        #       - If delta.content is not None:
        #           - Append delta.content to collected_tokens
        #           - sys.stdout.write(delta.content)
        #           - sys.stdout.flush()
        #       - If chunk.choices[0].finish_reason == "stop": break

    except openai.RateLimitError:
        print("\\nRate limit reached. Please wait and retry.")
        return None
    except openai.APIError as e:
        print(f"\\nAPI error: {e}")
        return None

    # TODO: Join collected_tokens into full_reply
    # TODO: Print a newline after streaming ends
    # TODO: Call self.add_message("assistant", full_reply) to save the assistant turn
    # TODO: Return full_reply
    pass

# Test streaming
chat = StreamingChat(system_prompt="You are a concise technical tutor.")
print("Assistant: ", end="", flush=True)
reply = chat.stream_response("What is a neural network? Answer in one sentence.")
print(f"\\n[History length: {len(chat.history)} messages]")`,
        hints: [
          'sys.stdout.write() + sys.stdout.flush() pushes each token to the terminal immediately without buffering',
          'delta.content is None for the first and last chunks — always guard with `if delta.content`',
          'After the loop, call print() (no args) to move the cursor to a new line before printing metadata'
        ],
        expectedOutput: `Assistant: A neural network is a computational model inspired by the human brain, consisting of layers of interconnected nodes that learn patterns from data through training.
[History length: 3 messages]`,
        solution: `import sys
import openai

def stream_response(self, user_message):
    self.add_message("user", user_message)
    collected_tokens = []

    try:
        response = client.chat.completions.create(
            model=self.model,
            messages=self.history,
            stream=True,
            temperature=0.7,
            max_tokens=500
        )

        for chunk in response:
            delta = chunk.choices[0].delta
            if delta.content is not None:
                collected_tokens.append(delta.content)
                sys.stdout.write(delta.content)
                sys.stdout.flush()
            if chunk.choices[0].finish_reason == "stop":
                break

    except openai.RateLimitError:
        print("\\nRate limit reached. Please wait and retry.")
        return None
    except openai.APIError as e:
        print(f"\\nAPI error: {e}")
        return None

    full_reply = "".join(collected_tokens)
    print()
    self.add_message("assistant", full_reply)
    return full_reply

StreamingChat.stream_response = stream_response

chat = StreamingChat(system_prompt="You are a concise technical tutor.")
print("Assistant: ", end="", flush=True)
reply = chat.stream_response("What is a neural network? Answer in one sentence.")
print(f"[History length: {len(chat.history)} messages]")`
      },
      {
        title: 'Step 4: Add a Token Counter and Multi-Turn Conversation',
        instruction: 'In production, every AI chat system tracks cumulative token usage to enforce per-user rate limits and bill correctly. Because the streaming API does not return usage data in the stream itself, you estimate token count from the collected tokens — a good approximation since each token is roughly 4 characters. This step also validates that history works correctly: the model should remember earlier turns and build on them.',
        starterCode: `# streaming_chat.py  Step 4: Token tracking and multi-turn demo
# (Add track_tokens and a token_report method to StreamingChat, then run the demo)

def track_tokens(self, text):
    """Estimate token count from text and add to self.total_tokens.
    Approximation: 1 token ~ 4 characters (works well for English prose).
    """
    # TODO: estimated_tokens = max(1, len(text) // 4)
    # TODO: self.total_tokens += estimated_tokens
    # TODO: Return estimated_tokens
    pass

def token_report(self):
    """Print a summary of token usage and estimated cost."""
    # TODO: Print self.total_tokens
    # TODO: Estimate cost at $0.00015 per 1k tokens (gpt-4o-mini blended rate)
    # TODO: Print estimated cost
    pass

# Attach methods to the class
StreamingChat.track_tokens = track_tokens
StreamingChat.token_report = token_report

# Multi-turn conversation demo
print("=== Multi-Turn Streaming Chat Demo ===\\n")
chat = StreamingChat(
    model="gpt-4o-mini",
    system_prompt="You are a concise technical tutor. Keep answers to 2 sentences."
)

questions = [
    "Explain how transformers work.",
    "Now explain what attention heads do.",
    "How do those two concepts connect?"
]

for i, question in enumerate(questions, 1):
    print(f"[Turn {i}] User: {question}")
    print(f"Assistant: ", end="", flush=True)

    # TODO: Call chat.stream_response(question) and track the tokens from the reply
    # TODO: After the reply, print: f"  [~{estimated} tokens this turn]"

print("\\n=== Session Summary ===")
# TODO: Call chat.token_report()
print(chat.get_history_summary())`,
        hints: [
          'Call track_tokens(reply) after stream_response() returns — pass the full reply string',
          'The model will reference previous turns ("those two concepts") proving history is working',
          'If the model loses context after turn 2, check that add_message() is being called for both roles'
        ],
        expectedOutput: `=== Multi-Turn Streaming Chat Demo ===

[Turn 1] User: Explain how transformers work.
Assistant: Transformers process sequences using self-attention, allowing each token to attend to every other token in the input simultaneously. They use positional encodings to retain order information and feed-forward layers to transform representations at each position.
  [~42 tokens this turn]

[Turn 2] User: Now explain what attention heads do.
Assistant: Attention heads are parallel self-attention mechanisms that each learn to focus on different relationships in the sequence. Multiple heads allow the model to capture various types of dependencies simultaneously, from syntactic to semantic patterns.
  [~39 tokens this turn]

[Turn 3] User: How do those two concepts connect?
Assistant: Each transformer layer contains multiple attention heads working in parallel — this is what gives the overall transformer architecture its power to model rich, multi-faceted relationships in a single forward pass.
  [~37 tokens this turn]

=== Session Summary ===
Total tokens used (estimated): ~118
Estimated cost: $0.000018
7 messages (1 system, 3 user, 3 assistant)`,
        solution: `def track_tokens(self, text):
    estimated = max(1, len(text) // 4)
    self.total_tokens += estimated
    return estimated

def token_report(self):
    cost = self.total_tokens / 1000 * 0.00015
    print(f"Total tokens used (estimated): ~{self.total_tokens}")
    print(f"Estimated cost: \${cost:.6f}")

StreamingChat.track_tokens = track_tokens
StreamingChat.token_report = token_report

print("=== Multi-Turn Streaming Chat Demo ===\\n")
chat = StreamingChat(
    model="gpt-4o-mini",
    system_prompt="You are a concise technical tutor. Keep answers to 2 sentences."
)

questions = [
    "Explain how transformers work.",
    "Now explain what attention heads do.",
    "How do those two concepts connect?"
]

for i, question in enumerate(questions, 1):
    print(f"[Turn {i}] User: {question}")
    print(f"Assistant: ", end="", flush=True)
    reply = chat.stream_response(question)
    if reply:
        estimated = chat.track_tokens(reply)
        print(f"  [~{estimated} tokens this turn]")
    print()

print("=== Session Summary ===")
chat.token_report()
print(chat.get_history_summary())`
      }
    ]
  },

  // ============================================================
  // Lab 6: AI Agent with Tool Use (converted from ai-5)
  // ============================================================
  {
    id: 'ai-lab-6',
    roleId: 'ai-engineer',
    level: 'senior',
    title: 'Build a Function-Calling AI Agent',
    description: 'Build a fully functional AI agent that decides which tools to call, executes them, and feeds results back to the model in a loop until the task is complete. This agent loop pattern is the foundation of every production AI agent framework — LangChain Agents, LlamaIndex, AutoGPT, and the Anthropic tool use API all implement this same core loop.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing code, ensure your AI Engineering environment is ready. Click "Go to Dev Setup" below to access the complete setup guide. You will need: Python 3.12+, the OpenAI SDK (1.0+), json (stdlib), and python-dotenv. The OpenAI function-calling API is available on all chat models — no extra packages needed.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" to see all installation steps',
          'Run: pip install openai python-dotenv',
          'Verify with: python -c "import openai, json; print(\'Ready\')"'
        ],
        expectedOutput: `Python 3.12.x
openai 1.x.x installed
OPENAI_API_KEY loaded from .env
Ready`,
        solution: null
      },
      {
        title: 'Step 2: Define Tools with JSON Schema',
        instruction: "The OpenAI function-calling API requires you to describe each tool as a JSON Schema object. This schema is sent to the model alongside the conversation, and the model uses it to decide when and how to call the tool — it will only pass arguments that match the schema's property names and types. Writing clear 'description' fields in your schema is the single most important factor in tool-call accuracy: the model reads these descriptions to understand what each tool does and when to use it.",
        starterCode: `# ai_agent.py  Step 2: Tool schema definitions
# Goal: Define the tools the agent can call using OpenAI function-calling JSON Schema

# TODO: Create a list called TOOLS containing two tool definitions.
# Each tool is a dict with "type": "function" and a "function" key.

# Tool 1: get_weather
#   name: "get_weather"
#   description: "Get the current weather conditions and temperature for a given city."
#   parameters:
#     type: object
#     properties:
#       city: {type: string, description: "The city name, e.g. 'Paris' or 'New York'"}
#       units: {type: string, enum: ["celsius", "fahrenheit"], description: "Temperature units"}
#     required: ["city"]

# Tool 2: search_database
#   name: "search_database"
#   description: "Search a product database and return matching product names."
#   parameters:
#     type: object
#     properties:
#       query: {type: string, description: "The product search query"}
#       max_results: {type: integer, description: "Maximum number of results to return (default 5)"}
#     required: ["query"]

TOOLS = [
    # TODO: implement tool 1
    # TODO: implement tool 2
]

# Verify schema structure
import json
print(json.dumps(TOOLS, indent=2))
print(f"\\nDefined {len(TOOLS)} tools:")
for t in TOOLS:
    print(f"  - {t['function']['name']}: {t['function']['description'][:60]}...")`,
        hints: [
          'The top-level dict has exactly two keys: "type" (always "function") and "function" (the schema)',
          'The "required" list inside parameters controls which args the model MUST provide vs which are optional',
          'Descriptions should explain WHEN to call the tool, not just what it does — this improves selection accuracy'
        ],
        expectedOutput: `[
  {
    "type": "function",
    "function": {
      "name": "get_weather",
      "description": "Get the current weather conditions and temperature for a given city.",
      "parameters": { ... }
    }
  },
  ...
]

Defined 2 tools:
  - get_weather: Get the current weather conditions and temperature for a...
  - search_database: Search a product database and return matching product...`,
        solution: `import json

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather conditions and temperature for a given city.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "The city name, e.g. 'Paris' or 'New York'"
                    },
                    "units": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Temperature units"
                    }
                },
                "required": ["city"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_database",
            "description": "Search a product database and return matching product names.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The product search query"
                    },
                    "max_results": {
                        "type": "integer",
                        "description": "Maximum number of results to return (default 5)"
                    }
                },
                "required": ["query"]
            }
        }
    }
]

print(json.dumps(TOOLS, indent=2))
print(f"\\nDefined {len(TOOLS)} tools:")
for t in TOOLS:
    print(f"  - {t['function']['name']}: {t['function']['description'][:60]}...")`
      },
      {
        title: 'Step 3: Implement Tool Functions and Dispatcher',
        instruction: 'The tool functions in an agent are the bridge between the LLM and real systems. In this lab they are simulated, but in production they would call weather APIs, databases, or internal services. The dispatcher pattern — a dict mapping function names to callables — is the standard way to route tool calls because it is O(1) lookup and easy to extend safely.',
        starterCode: `# ai_agent.py  Step 3: Tool implementations and dispatcher

def get_weather(city, units="celsius"):
    """Simulated weather lookup.
    In production: call a real weather API (e.g., OpenWeatherMap).

    Returns a dict matching the schema the model expects back as tool result.
    """
    # TODO: Return a dict with keys: city, temperature, units, condition, humidity
    # Use realistic but hardcoded values for simulation:
    #   temperature: 22 (celsius) or 72 (fahrenheit)
    #   condition: "partly cloudy"
    #   humidity: "65%"
    pass

def search_database(query, max_results=5):
    """Simulated product database search.
    In production: query a real database or Elasticsearch index.
    """
    # TODO: Return a dict with key "results" containing a list of max_results strings
    # Format each result as: f"Product: {query.title()} - Model {i+1} (In Stock)"
    pass

# TODO: Create a TOOL_DISPATCH dict mapping function name strings to callables
#       {"get_weather": get_weather, "search_database": search_database}

# Test the implementations
print("get_weather test:")
print(json.dumps(get_weather("Paris"), indent=2))

print("\\nsearch_database test:")
print(json.dumps(search_database("winter jacket", max_results=3), indent=2))`,
        hints: [
          'Return dicts — not strings — from tool functions; json.dumps() will serialize them for the API',
          'The dispatcher dict must use the exact same string keys as the "name" fields in your TOOLS schema',
          'In production, wrap each tool function in try/except so one failing tool does not crash the whole agent'
        ],
        expectedOutput: `get_weather test:
{
  "city": "Paris",
  "temperature": 22,
  "units": "celsius",
  "condition": "partly cloudy",
  "humidity": "65%"
}

search_database test:
{
  "results": [
    "Product: Winter Jacket - Model 1 (In Stock)",
    "Product: Winter Jacket - Model 2 (In Stock)",
    "Product: Winter Jacket - Model 3 (In Stock)"
  ]
}`,
        solution: `def get_weather(city, units="celsius"):
    temp = 22 if units == "celsius" else 72
    return {
        "city": city,
        "temperature": temp,
        "units": units,
        "condition": "partly cloudy",
        "humidity": "65%"
    }

def search_database(query, max_results=5):
    results = [f"Product: {query.title()} - Model {i+1} (In Stock)" for i in range(max_results)]
    return {"results": results}

TOOL_DISPATCH = {
    "get_weather": get_weather,
    "search_database": search_database,
}

print("get_weather test:")
print(json.dumps(get_weather("Paris"), indent=2))

print("\\nsearch_database test:")
print(json.dumps(search_database("winter jacket", max_results=3), indent=2))`
      },
      {
        title: 'Step 4: Implement the Agent Loop',
        instruction: 'The agent loop is the control plane: it sends messages to the model, checks whether the model wants to call a tool, executes the tool, appends the result back to the message list, and repeats until the model produces a final answer (no more tool calls). This loop can run any number of iterations — a complex task might require 5+ tool calls. The key correctness requirement is that tool results must be appended with role "tool" and the matching tool_call_id, otherwise the API returns an error.',
        starterCode: `# ai_agent.py  Step 4: The agent loop
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def run_agent(user_prompt, verbose=True):
    """Run the agent loop until the model produces a final answer.

    Args:
        user_prompt: The user's task description
        verbose: If True, print tool calls and results as they happen
    Returns:
        The final answer string from the model
    """
    messages = [
        {"role": "system", "content": "You are a helpful assistant with access to tools. Use them when needed."},
        {"role": "user", "content": user_prompt}
    ]

    iteration = 0
    max_iterations = 10  # safety limit to prevent infinite loops

    while iteration < max_iterations:
        iteration += 1

        # TODO: Call client.chat.completions.create() with:
        #       model="gpt-4o-mini"
        #       messages=messages
        #       tools=TOOLS
        #       tool_choice="auto"   <- let the model decide when to call tools

        # TODO: Extract msg = response.choices[0].message

        # TODO: If msg.tool_calls is not None and non-empty:
        #       1. Append msg to messages (the model's decision to call tools)
        #       2. For each tool_call in msg.tool_calls:
        #          a. Extract fn_name = tool_call.function.name
        #          b. Parse fn_args = json.loads(tool_call.function.arguments)
        #          c. If verbose: print the tool call being made
        #          d. Execute: result = TOOL_DISPATCH[fn_name](**fn_args)
        #          e. If verbose: print the result
        #          f. Append tool result to messages:
        #             {"role": "tool", "tool_call_id": tool_call.id, "content": json.dumps(result)}
        #       3. Continue the while loop (do NOT return yet)

        # TODO: Else (no tool calls — model has the final answer):
        #       Return msg.content

        pass

    return "Agent exceeded maximum iterations."

# Run the agent on a multi-tool task
print("=== AI Agent Demo ===\\n")
answer = run_agent("What's the weather in Paris and Tokyo? Also find me 3 winter jackets.")
print(f"\\n=== Final Answer ===\\n{answer}")`,
        hints: [
          'Append msg (the raw message object) to messages BEFORE the tool result — the API requires this ordering',
          'tool_call.id must match exactly in the tool result message — a mismatch causes an API error',
          'The while loop naturally handles multi-step tasks: the model keeps calling tools until it has enough info'
        ],
        expectedOutput: `=== AI Agent Demo ===

[Tool call 1] get_weather(city='Paris', units='celsius')
  Result: {"city": "Paris", "temperature": 22, "units": "celsius", "condition": "partly cloudy", "humidity": "65%"}

[Tool call 2] get_weather(city='Tokyo', units='celsius')
  Result: {"city": "Tokyo", "temperature": 22, "units": "celsius", "condition": "partly cloudy", "humidity": "65%"}

[Tool call 3] search_database(query='winter jackets', max_results=3)
  Result: {"results": ["Product: Winter Jackets - Model 1 (In Stock)", "Product: Winter Jackets - Model 2 (In Stock)", "Product: Winter Jackets - Model 3 (In Stock)"]}

=== Final Answer ===
Here's the information you requested:

Weather:
- Paris: 22°C, partly cloudy, 65% humidity
- Tokyo: 22°C, partly cloudy, 65% humidity

Winter Jackets available:
1. Product: Winter Jackets - Model 1 (In Stock)
2. Product: Winter Jackets - Model 2 (In Stock)
3. Product: Winter Jackets - Model 3 (In Stock)`,
        solution: `from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def run_agent(user_prompt, verbose=True):
    messages = [
        {"role": "system", "content": "You are a helpful assistant with access to tools. Use them when needed."},
        {"role": "user", "content": user_prompt}
    ]

    iteration = 0
    tool_call_count = 0
    max_iterations = 10

    while iteration < max_iterations:
        iteration += 1

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=TOOLS,
            tool_choice="auto"
        )
        msg = response.choices[0].message

        if msg.tool_calls:
            messages.append(msg)
            for tool_call in msg.tool_calls:
                fn_name = tool_call.function.name
                fn_args = json.loads(tool_call.function.arguments)
                tool_call_count += 1

                if verbose:
                    args_str = ", ".join(f"{k}={repr(v)}" for k, v in fn_args.items())
                    print(f"[Tool call {tool_call_count}] {fn_name}({args_str})")

                result = TOOL_DISPATCH[fn_name](**fn_args)

                if verbose:
                    print(f"  Result: {json.dumps(result)}")
                    print()

                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(result)
                })
        else:
            return msg.content

    return "Agent exceeded maximum iterations."

print("=== AI Agent Demo ===\\n")
answer = run_agent("What's the weather in Paris and Tokyo? Also find me 3 winter jackets.")
print(f"\\n=== Final Answer ===\\n{answer}")`
      }
    ]
  }
]
