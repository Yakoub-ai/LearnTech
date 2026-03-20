// Interactive labs - role-specific AND language-specific guided exercises
// Each lab has progressive steps with starter code, hints, expected output, and solutions
export const interactiveLabs = [
  // ============================================================
  // AI ENGINEER LABS
  // ============================================================
  {
    id: 'ai-lab-1',
    roleId: 'ai-engineer',
    level: 'beginner',
    title: 'Build a RAG Pipeline',
    description: 'Learn the fundamentals of Retrieval-Augmented Generation by building a simple document Q&A system step by step.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Load and Prepare Documents',
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
        title: 'Step 2: Create Embeddings',
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
        title: 'Step 3: Build the Retriever',
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
        title: 'Step 4: Generate the Answer',
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
  // BACKEND DEVELOPER LABS
  // ============================================================
  {
    id: 'be-lab-1',
    roleId: 'backend-developer',
    level: 'beginner',
    title: 'Build a REST API',
    description: 'Build a complete REST API step by step, learning HTTP methods, routing, validation, and error handling.',
    estimatedMinutes: 35,
    steps: [
      {
        title: 'Step 1: Create a Basic Server',
        instruction: 'Set up a minimal Express.js server that listens on port 3000 and responds to a health check endpoint.',
        starterCode: `// Basic Express server setup
const express = require('express');
const app = express();

// TODO: Add JSON body parsing middleware

// TODO: Create a GET /health endpoint that returns { status: 'ok' }

// TODO: Start the server on port 3000
// Print "Server running on port 3000" when ready`,
        hints: [
          'Use app.use(express.json()) for body parsing',
          'Use app.get(\'/health\', (req, res) => ...) for the endpoint',
          'Use app.listen(3000, () => console.log(...))'
        ],
        expectedOutput: `Server running on port 3000
GET /health → { "status": "ok" }`,
        solution: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`
      },
      {
        title: 'Step 2: Add GET Endpoints',
        instruction: 'Create an in-memory data store and add GET endpoints to list all users and get a single user by ID.',
        starterCode: `// In-memory data store
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

// TODO: GET /api/users — return all users

// TODO: GET /api/users/:id — return a single user by ID
// Return 404 with { error: 'User not found' } if not found`,
        hints: [
          'Use req.params.id to get the URL parameter',
          'parseInt(req.params.id) converts the string to a number',
          'Use users.find(u => u.id === id) to look up a user'
        ],
        expectedOutput: `GET /api/users → [{ id: 1, ... }, { id: 2, ... }, { id: 3, ... }]
GET /api/users/2 → { id: 2, name: "Bob", email: "bob@example.com" }
GET /api/users/99 → 404 { error: "User not found" }`,
        solution: `app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});`
      },
      {
        title: 'Step 3: Add POST Endpoint',
        instruction: 'Create a POST endpoint to add new users. Validate that name and email are provided in the request body.',
        starterCode: `// TODO: POST /api/users — create a new user
// Request body: { name: string, email: string }
// Validate: name and email are required
// Return 400 with { error: '...' } if validation fails
// Auto-increment the ID
// Return 201 with the created user

let nextId = 4; // Next available ID`,
        hints: [
          'Access the body with req.body.name and req.body.email',
          'Check if (!name || !email) for validation',
          'Use res.status(201).json(newUser) for the success response'
        ],
        expectedOutput: `POST /api/users { name: "Diana", email: "diana@example.com" }
→ 201 { id: 4, name: "Diana", email: "diana@example.com" }

POST /api/users { name: "Diana" }
→ 400 { error: "Name and email are required" }`,
        solution: `let nextId = 4;

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});`
      },
      {
        title: 'Step 4: Add PUT and DELETE',
        instruction: 'Add endpoints to update and delete users. PUT should replace the user data, DELETE should remove the user from the array.',
        starterCode: `// TODO: PUT /api/users/:id — update a user
// Find user by ID, update name and email from body
// Return 404 if not found, 200 with updated user on success

// TODO: DELETE /api/users/:id — delete a user
// Find user by ID, remove from array
// Return 404 if not found, 204 (no content) on success`,
        hints: [
          'For PUT, find the user index with users.findIndex(u => u.id === id)',
          'Update with Object.assign or spread: users[index] = { ...users[index], name, email }',
          'For DELETE, use users.splice(index, 1) to remove the user'
        ],
        expectedOutput: `PUT /api/users/2 { name: "Bobby", email: "bobby@example.com" }
→ 200 { id: 2, name: "Bobby", email: "bobby@example.com" }

DELETE /api/users/2 → 204 No Content
GET /api/users/2 → 404 Not Found`,
        solution: `app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email } = req.body;
  users[index] = { ...users[index], name, email };
  res.json(users[index]);
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
});`
      },
      {
        title: 'Step 5: Add Error Handling Middleware',
        instruction: 'Add a global error handler and a 404 catch-all route. Wrap async routes safely and add request logging.',
        starterCode: `// TODO: Add request logging middleware
// Log: METHOD PATH — e.g., "GET /api/users"

// TODO: Add a 404 catch-all route (must be AFTER all other routes)
// Return { error: 'Route not found' }

// TODO: Add global error handling middleware
// Express error handlers have 4 parameters: (err, req, res, next)
// Log the error and return 500 with { error: 'Internal server error' }`,
        hints: [
          'Logging middleware: app.use((req, res, next) => { console.log(...); next(); })',
          'The 404 handler should be app.use((req, res) => ...) placed after all routes',
          'Error middleware must have exactly 4 params: app.use((err, req, res, next) => ...)'
        ],
        expectedOutput: `GET /api/users → logged, returns user list
GET /unknown → 404 { error: "Route not found" }
Errors → 500 { error: "Internal server error" }`,
        solution: `// Request logging
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

// ... (all your routes go here) ...

// 404 catch-all (after all routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});`
      }
    ]
  },

  // ============================================================
  // DATA ENGINEER LABS
  // ============================================================
  {
    id: 'de-lab-1',
    roleId: 'data-engineer',
    level: 'beginner',
    title: 'Build an ETL Pipeline',
    description: 'Learn the Extract-Transform-Load pattern by building a pipeline that processes CSV data, transforms it, and loads it into a structured format.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Extract — Read Raw Data',
        instruction: 'Create a function that parses CSV-formatted text into a list of dictionaries. Each row becomes a dictionary with column headers as keys.',
        starterCode: `# ETL Pipeline — Step 1: Extract
# Parse CSV text into structured data

def extract_csv(csv_text):
    """Parse CSV text into a list of dictionaries.

    Args:
        csv_text: String containing CSV data with headers
    Returns:
        List of dicts, one per row
    """
    # TODO: Split into lines, extract headers from first line
    # Then create a dict for each data row
    pass

csv_data = """name,age,city,salary
Alice,30,Stockholm,55000
Bob,25,Gothenburg,42000
Charlie,35,Malmö,68000
Diana,28,Uppsala,49000
Eve,,Stockholm,51000"""

records = extract_csv(csv_data)
print(f"Extracted {len(records)} records")
for r in records:
    print(r)`,
        hints: [
          'Use csv_text.strip().split("\\n") to get lines',
          'First line is headers: headers = lines[0].split(",")',
          'zip(headers, values) pairs headers with each row\'s values'
        ],
        expectedOutput: `Extracted 5 records
{'name': 'Alice', 'age': '30', 'city': 'Stockholm', 'salary': '55000'}
...`,
        solution: `def extract_csv(csv_text):
    lines = csv_text.strip().split("\\n")
    headers = lines[0].split(",")
    records = []
    for line in lines[1:]:
        values = line.split(",")
        record = dict(zip(headers, values))
        records.append(record)
    return records

csv_data = """name,age,city,salary
Alice,30,Stockholm,55000
Bob,25,Gothenburg,42000
Charlie,35,Malmö,68000
Diana,28,Uppsala,49000
Eve,,Stockholm,51000"""

records = extract_csv(csv_data)
print(f"Extracted {len(records)} records")
for r in records:
    print(r)`
      },
      {
        title: 'Step 2: Transform — Clean and Enrich',
        instruction: 'Add transformation logic: convert types, handle missing values, and add computed fields.',
        starterCode: `# ETL Pipeline — Step 2: Transform

def transform(records):
    """Clean and enrich records.

    Rules:
    - Convert age to int (default 0 if missing/empty)
    - Convert salary to float
    - Add 'salary_band' field: 'junior' (<45000), 'mid' (45000-60000), 'senior' (>60000)
    - Skip records where name is empty

    Returns:
        List of cleaned, enriched dicts
    """
    # TODO: Implement transformation rules
    pass

# Test with extracted data
cleaned = transform(records)
print(f"Transformed: {len(records)} → {len(cleaned)} records")
for r in cleaned:
    print(f"  {r['name']}: age={r['age']}, band={r['salary_band']}")`,
        hints: [
          'Use int(r["age"]) if r["age"] else 0 for safe conversion',
          'Check salary thresholds with if/elif for salary_band',
          'Use a list comprehension or filter to skip empty names'
        ],
        expectedOutput: `Transformed: 5 → 5 records
  Alice: age=30, band=mid
  Bob: age=25, band=junior
  Charlie: age=35, band=senior
  Diana: age=28, band=mid
  Eve: age=0, band=mid`,
        solution: `def transform(records):
    cleaned = []
    for r in records:
        if not r.get('name', '').strip():
            continue

        age = int(r['age']) if r.get('age', '').strip() else 0
        salary = float(r['salary']) if r.get('salary', '').strip() else 0

        if salary < 45000:
            band = 'junior'
        elif salary <= 60000:
            band = 'mid'
        else:
            band = 'senior'

        cleaned.append({
            'name': r['name'].strip(),
            'age': age,
            'city': r.get('city', '').strip(),
            'salary': salary,
            'salary_band': band
        })
    return cleaned

cleaned = transform(records)
print(f"Transformed: {len(records)} → {len(cleaned)} records")
for r in cleaned:
    print(f"  {r['name']}: age={r['age']}, band={r['salary_band']}")`
      },
      {
        title: 'Step 3: Load — Write to Structured Output',
        instruction: 'Create a load function that writes the transformed data to a JSON-like structure grouped by city, simulating a data warehouse load.',
        starterCode: `# ETL Pipeline — Step 3: Load

def load_grouped(records, group_by='city'):
    """Group records by a key and return structured output.

    Args:
        records: List of transformed dicts
        group_by: Field name to group by
    Returns:
        Dict with group keys mapping to lists of records
    """
    # TODO: Group records by the specified field
    pass

def generate_summary(grouped):
    """Generate a summary report from grouped data."""
    # TODO: For each group, show count, avg salary, salary bands
    pass

# Run the load step
grouped = load_grouped(cleaned, group_by='city')
print("=== Data Warehouse Output ===")
for city, people in grouped.items():
    print(f"\\n{city} ({len(people)} employees):")
    for p in people:
        print(f"  - {p['name']}: {p['salary_band']}")`,
        hints: [
          'Use a defaultdict(list) or regular dict with setdefault()',
          'grouped.setdefault(record[group_by], []).append(record)',
          'For avg salary: sum(r["salary"] for r in people) / len(people)'
        ],
        expectedOutput: `=== Data Warehouse Output ===

Stockholm (2 employees):
  - Alice: mid
  - Eve: mid

Gothenburg (1 employees):
  - Bob: junior
...`,
        solution: `def load_grouped(records, group_by='city'):
    grouped = {}
    for record in records:
        key = record.get(group_by, 'Unknown')
        grouped.setdefault(key, []).append(record)
    return grouped

grouped = load_grouped(cleaned, group_by='city')
print("=== Data Warehouse Output ===")
for city, people in grouped.items():
    print(f"\\n{city} ({len(people)} employees):")
    for p in people:
        print(f"  - {p['name']}: {p['salary_band']}")`
      },
      {
        title: 'Step 4: Orchestrate the Full Pipeline',
        instruction: 'Tie everything together into a reusable pipeline function with logging, error handling, and a summary report.',
        starterCode: `# ETL Pipeline — Step 4: Orchestrate

import time

def run_pipeline(csv_text, group_by='city'):
    """Run the full ETL pipeline with logging.

    Steps:
    1. Extract CSV data
    2. Transform and clean records
    3. Load into grouped structure
    4. Print summary report

    Returns:
        Dict with pipeline results and metadata
    """
    # TODO: Implement the full pipeline with timing and logging
    # Track: start_time, records_extracted, records_transformed, groups_created
    pass

# Run it!
result = run_pipeline(csv_data, group_by='city')
print(f"\\nPipeline completed in {result['duration_ms']:.0f}ms")
print(f"Records: {result['extracted']} → {result['transformed']}")
print(f"Groups: {result['groups']}")`,
        hints: [
          'Use time.time() before and after to measure duration',
          'Call extract_csv(), transform(), load_grouped() in sequence',
          'Return a metadata dict with counts and timing'
        ],
        expectedOutput: `[EXTRACT] Parsing CSV data...
[EXTRACT] Found 5 records
[TRANSFORM] Cleaning and enriching...
[TRANSFORM] 5 → 5 records
[LOAD] Grouping by city...
[LOAD] Created 4 groups

Pipeline completed in Xms
Records: 5 → 5
Groups: 4`,
        solution: `import time

def run_pipeline(csv_text, group_by='city'):
    start = time.time()

    print("[EXTRACT] Parsing CSV data...")
    records = extract_csv(csv_text)
    print(f"[EXTRACT] Found {len(records)} records")

    print("[TRANSFORM] Cleaning and enriching...")
    cleaned = transform(records)
    print(f"[TRANSFORM] {len(records)} → {len(cleaned)} records")

    print(f"[LOAD] Grouping by {group_by}...")
    grouped = load_grouped(cleaned, group_by=group_by)
    print(f"[LOAD] Created {len(grouped)} groups")

    duration = (time.time() - start) * 1000

    return {
        'extracted': len(records),
        'transformed': len(cleaned),
        'groups': len(grouped),
        'data': grouped,
        'duration_ms': duration
    }

result = run_pipeline(csv_data, group_by='city')
print(f"\\nPipeline completed in {result['duration_ms']:.0f}ms")
print(f"Records: {result['extracted']} → {result['transformed']}")
print(f"Groups: {result['groups']}")`
      }
    ]
  },

  // ============================================================
  // FRONTEND DEVELOPER LABS
  // ============================================================
  {
    id: 'fe-lab-1',
    roleId: 'frontend-developer',
    level: 'beginner',
    title: 'Build a Component Library',
    description: 'Create reusable UI components step by step — a Button, Input, Card, and a themeable wrapper.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Create a Button Component',
        instruction: 'Build a reusable Button component with variant support (primary, secondary, danger) and size options (sm, md, lg).',
        starterCode: `// Button.jsx — Reusable button component
// Props: variant ('primary'|'secondary'|'danger'), size ('sm'|'md'|'lg'), children, onClick, disabled

const variantStyles = {
  // TODO: Define styles for each variant
  // primary: blue background, white text
  // secondary: gray background, dark text
  // danger: red background, white text
};

const sizeStyles = {
  // TODO: Define padding/font-size for each size
};

function Button({ variant = 'primary', size = 'md', children, onClick, disabled }) {
  // TODO: Combine variant + size styles
  // Add disabled styling (opacity, cursor)
  // Return a <button> element
  return null;
}

// Usage examples:
// <Button variant="primary" size="lg" onClick={handleClick}>Save</Button>
// <Button variant="danger" size="sm" disabled>Delete</Button>`,
        hints: [
          'Use an object to map variant names to CSS class strings',
          'Combine classes with template literals: \`\${variantStyles[variant]} \${sizeStyles[size]}\`',
          'Add disabled styles conditionally: disabled ? "opacity-50 cursor-not-allowed" : ""'
        ],
        expectedOutput: `<button class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
<button class="bg-red-500 text-white px-2 py-1 rounded opacity-50" disabled>Delete</button>`,
        solution: `const variantStyles = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

const sizeStyles = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

function Button({ variant = 'primary', size = 'md', children, onClick, disabled }) {
  const classes = [
    variantStyles[variant],
    sizeStyles[size],
    'rounded font-medium transition-colors',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ].join(' ');

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}`
      },
      {
        title: 'Step 2: Create an Input Component',
        instruction: 'Build a reusable Input component with label, error state, and helper text support.',
        starterCode: `// Input.jsx — Reusable input with label and validation
// Props: label, type, value, onChange, error, helperText, placeholder, required

function Input({ label, type = 'text', value, onChange, error, helperText, placeholder, required }) {
  // TODO: Render label (with required indicator *)
  // TODO: Render input with error border styling
  // TODO: Show error message OR helper text below input
  return null;
}

// Usage:
// <Input label="Email" type="email" error="Invalid email" required />
// <Input label="Name" helperText="Enter your full name" />`,
        hints: [
          'Use a wrapper div with flex-col for vertical layout',
          'Error state: change border to red and show error text in red',
          'Required indicator: {required && <span className="text-red-500">*</span>}'
        ],
        expectedOutput: `Label with * for required fields
Input with red border when error prop is set
Error message shown in red below input
Helper text shown in gray when no error`,
        solution: `function Input({ label, type = 'text', value, onChange, error, helperText, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={\`px-3 py-2 border rounded-lg outline-none transition-colors \${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 focus:border-blue-500'
        }\`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      {!error && helperText && <span className="text-sm text-gray-500">{helperText}</span>}
    </div>
  );
}`
      },
      {
        title: 'Step 3: Create a Card Component',
        instruction: 'Build a Card component with header, body, and footer sections. Add hover effects and optional image support.',
        starterCode: `// Card.jsx — Composable card component
// Props: title, subtitle, children (body), footer, image, onClick

function Card({ title, subtitle, children, footer, image, onClick }) {
  // TODO: Build a card with:
  //   - Optional image at top (full width)
  //   - Header section with title and subtitle
  //   - Body section (children)
  //   - Optional footer section
  //   - Hover shadow effect
  //   - onClick makes the whole card clickable
  return null;
}

// Usage:
// <Card title="Project Alpha" subtitle="Due March 15" footer={<Button>View</Button>}>
//   <p>A brief description of the project...</p>
// </Card>`,
        hints: [
          'Use overflow-hidden on the wrapper for image clipping',
          'Add hover:shadow-lg and transition-shadow for hover effect',
          'Use cursor-pointer when onClick is provided'
        ],
        expectedOutput: `A card with rounded corners, subtle shadow
Image fills the top area
Title is bold, subtitle is smaller and gray
Footer is at the bottom with a top border`,
        solution: `function Card({ title, subtitle, children, footer, image, onClick }) {
  return (
    <div
      className={\`bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-lg \${
        onClick ? 'cursor-pointer' : ''
      }\`}
      onClick={onClick}
    >
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {children && <div className="mt-3 text-gray-700">{children}</div>}
      </div>
      {footer && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
}`
      },
      {
        title: 'Step 4: Add Theme Support',
        instruction: 'Create a ThemeProvider that uses React Context to provide color theme values to all components. Update Button to use theme colors.',
        starterCode: `// ThemeProvider.jsx — Context-based theming
import { createContext, useContext, useState } from 'react';

const themes = {
  light: {
    primary: '#3b82f6',
    danger: '#ef4444',
    background: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
  },
  dark: {
    primary: '#60a5fa',
    danger: '#f87171',
    background: '#1f2937',
    text: '#f9fafb',
    border: '#374151',
  },
};

// TODO: Create ThemeContext
// TODO: Create ThemeProvider component with theme state and toggle function
// TODO: Create useTheme hook
// TODO: Create ThemeToggle button component`,
        hints: [
          'const ThemeContext = createContext()',
          'ThemeProvider should manage [theme, setTheme] state and provide { theme, colors, toggleTheme }',
          'useTheme = () => useContext(ThemeContext)'
        ],
        expectedOutput: `<ThemeProvider>
  <ThemeToggle /> → switches between light/dark
  <Button> → uses theme.primary color
</ThemeProvider>`,
        solution: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const colors = themes[theme];

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      <div style={{ backgroundColor: colors.background, color: colors.text, minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="px-3 py-1 rounded border">
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}`
      }
    ]
  },

  // ============================================================
  // DEVOPS PLATFORM ENGINEER LABS
  // ============================================================
  {
    id: 'do-lab-1',
    roleId: 'devops-platform-engineer',
    level: 'beginner',
    title: 'Dockerize an Application',
    description: 'Learn Docker fundamentals by containerizing a Node.js application step by step.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Write a Dockerfile',
        instruction: 'Create a Dockerfile for a simple Node.js application. Use multi-stage concepts: choose a base image, copy files, install dependencies, and set the startup command.',
        starterCode: `# Dockerfile for a Node.js application
# TODO: Choose a base image (node:20-alpine is recommended)

# TODO: Set the working directory to /app

# TODO: Copy package.json and package-lock.json first (for layer caching)

# TODO: Run npm ci --production

# TODO: Copy the rest of the application code

# TODO: Expose port 3000

# TODO: Set the command to start the app: node server.js`,
        hints: [
          'FROM node:20-alpine sets a lightweight base image',
          'COPY package*.json ./ copies both package.json and package-lock.json',
          'Copying package files before source code means npm install layer is cached unless deps change'
        ],
        expectedOutput: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
        solution: `FROM node:20-alpine

WORKDIR /app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --production

# Copy application source code
COPY . .

# Document the port the app uses
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]`
      },
      {
        title: 'Step 2: Build and Run the Container',
        instruction: 'Write the Docker commands to build the image, run the container, and verify it is working.',
        starterCode: `# Docker CLI commands — fill in the blanks

# TODO: Build the image with tag "myapp:1.0"
docker build ___

# TODO: Run the container:
#   - Detached mode (-d)
#   - Map port 3000 on host to 3000 in container
#   - Name it "myapp-container"
#   - Use the image "myapp:1.0"
docker run ___

# TODO: Check if the container is running
docker ___

# TODO: View the container logs
docker ___

# TODO: Stop and remove the container
docker ___`,
        hints: [
          'Build: docker build -t myapp:1.0 .',
          'Run: docker run -d -p 3000:3000 --name myapp-container myapp:1.0',
          'Check: docker ps, Logs: docker logs myapp-container'
        ],
        expectedOutput: `$ docker build -t myapp:1.0 .
Successfully built abc123
$ docker run -d -p 3000:3000 --name myapp-container myapp:1.0
$ docker ps
CONTAINER ID  IMAGE      STATUS   PORTS                    NAMES
abc123        myapp:1.0  Up 5s    0.0.0.0:3000->3000/tcp   myapp-container`,
        solution: `# Build the image
docker build -t myapp:1.0 .

# Run the container
docker run -d -p 3000:3000 --name myapp-container myapp:1.0

# Check if running
docker ps

# View logs
docker logs myapp-container

# Stop and remove
docker stop myapp-container && docker rm myapp-container`
      },
      {
        title: 'Step 3: Create a Docker Compose File',
        instruction: 'Write a docker-compose.yml that runs the app with a PostgreSQL database. Use environment variables, volumes, and a health check.',
        starterCode: `# docker-compose.yml
# TODO: Define two services: app and db

# version: '3.8'  (optional in modern Docker Compose)
services:
  # TODO: app service
  #   - Build from current directory
  #   - Map port 3000
  #   - Set environment variable DATABASE_URL
  #   - Depend on db service

  # TODO: db service
  #   - Use postgres:16-alpine image
  #   - Set POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD
  #   - Persist data with a named volume
  #   - Add a health check

# TODO: Define named volumes`,
        hints: [
          'Use depends_on with condition: service_healthy for proper startup order',
          'Database URL format: postgres://user:password@db:5432/dbname',
          'Health check: pg_isready -U postgres'
        ],
        expectedOutput: `docker compose up -d
Creating network...
Creating volume...
Starting db... healthy
Starting app... done`,
        solution: `services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://appuser:secret@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d myapp"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:`
      },
      {
        title: 'Step 4: Add a Health Check Endpoint',
        instruction: 'Add a health check to the Dockerfile and create a simple health endpoint in the application that checks database connectivity.',
        starterCode: `# Add to Dockerfile — health check instruction
# TODO: Add a HEALTHCHECK that curls the /health endpoint every 30s

# In your server.js — add a health check that tests DB connection
app.get('/health', async (req, res) => {
  // TODO: Check database connection
  // Return 200 { status: 'healthy', db: 'connected', uptime: process.uptime() }
  // Return 503 { status: 'unhealthy', db: 'disconnected', error: message }
});`,
        hints: [
          'HEALTHCHECK --interval=30s CMD curl -f http://localhost:3000/health || exit 1',
          'Use a try/catch around the DB query to catch connection errors',
          'process.uptime() gives seconds since the process started'
        ],
        expectedOutput: `GET /health → 200 { status: "healthy", db: "connected", uptime: 45.2 }
docker ps → shows (healthy) in STATUS column`,
        solution: `# Dockerfile addition
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# server.js health endpoint
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({
      status: 'healthy',
      db: 'connected',
      uptime: process.uptime()
    });
  } catch (err) {
    res.status(503).json({
      status: 'unhealthy',
      db: 'disconnected',
      error: err.message
    });
  }
});`
      }
    ]
  },

  // ============================================================
  // DATA SCIENTIST LABS
  // ============================================================
  {
    id: 'ds-lab-1',
    roleId: 'data-scientist',
    level: 'beginner',
    title: 'Exploratory Data Analysis',
    description: 'Perform a complete EDA workflow: load data, compute statistics, visualize distributions, and extract insights.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Load and Inspect Data',
        instruction: 'Create functions to load a dataset and compute basic descriptive statistics.',
        starterCode: `# EDA — Step 1: Load and Inspect
# Working with a sample employee dataset

dataset = [
    {"name": "Alice", "dept": "Engineering", "salary": 95000, "years": 5, "rating": 4.2},
    {"name": "Bob", "dept": "Marketing", "salary": 72000, "years": 3, "rating": 3.8},
    {"name": "Charlie", "dept": "Engineering", "salary": 110000, "years": 8, "rating": 4.5},
    {"name": "Diana", "dept": "Sales", "salary": 68000, "years": 2, "rating": 4.0},
    {"name": "Eve", "dept": "Engineering", "salary": 105000, "years": 6, "rating": 4.7},
    {"name": "Frank", "dept": "Marketing", "salary": 78000, "years": 4, "rating": 3.5},
    {"name": "Grace", "dept": "Sales", "salary": 71000, "years": 3, "rating": 4.1},
    {"name": "Hank", "dept": "Engineering", "salary": 98000, "years": 7, "rating": 3.9},
]

def describe_column(data, column):
    """Compute statistics for a numeric column.
    Returns: dict with count, mean, min, max, std_dev
    """
    # TODO: Extract values, compute stats
    pass

# Describe salary and rating columns
for col in ['salary', 'years', 'rating']:
    stats = describe_column(dataset, col)
    print(f"\\n{col}: {stats}")`,
        hints: [
          'Extract values: values = [row[column] for row in data]',
          'Mean: sum(values) / len(values)',
          'Std dev: sqrt(sum((x - mean)^2 for x in values) / len(values))'
        ],
        expectedOutput: `salary: {count: 8, mean: 87125, min: 68000, max: 110000, ...}
years: {count: 8, mean: 4.75, min: 2, max: 8, ...}
rating: {count: 8, mean: 4.09, min: 3.5, max: 4.7, ...}`,
        solution: `import math

def describe_column(data, column):
    values = [row[column] for row in data]
    n = len(values)
    mean = sum(values) / n
    variance = sum((x - mean) ** 2 for x in values) / n
    return {
        'count': n,
        'mean': round(mean, 2),
        'min': min(values),
        'max': max(values),
        'std_dev': round(math.sqrt(variance), 2)
    }

for col in ['salary', 'years', 'rating']:
    stats = describe_column(dataset, col)
    print(f"\\n{col}: {stats}")`
      },
      {
        title: 'Step 2: Group and Aggregate',
        instruction: 'Group data by department and compute aggregate statistics to find patterns.',
        starterCode: `# EDA — Step 2: Group and Aggregate

def group_by(data, key):
    """Group records by a key field.
    Returns: dict mapping group values to lists of records
    """
    # TODO: Group records
    pass

def aggregate_groups(groups, value_column):
    """For each group, compute count, mean, min, max of a value column.
    Returns: dict mapping group name to stats dict
    """
    # TODO: Compute stats per group
    pass

# Analyze salary by department
dept_groups = group_by(dataset, 'dept')
dept_salary = aggregate_groups(dept_groups, 'salary')

print("=== Salary by Department ===")
for dept, stats in dept_salary.items():
    print(f"{dept}: avg=\${stats['mean']:,.0f}, range=\${stats['min']:,}-\${stats['max']:,}")`,
        hints: [
          'Use dict.setdefault(key, []).append(record) for grouping',
          'Reuse the statistics logic from Step 1',
          'Format currency with f"${value:,.0f}"'
        ],
        expectedOutput: `=== Salary by Department ===
Engineering: avg=$102,000, range=$95,000-$110,000
Marketing: avg=$75,000, range=$72,000-$78,000
Sales: avg=$69,500, range=$68,000-$71,000`,
        solution: `def group_by(data, key):
    groups = {}
    for record in data:
        group_key = record[key]
        groups.setdefault(group_key, []).append(record)
    return groups

def aggregate_groups(groups, value_column):
    result = {}
    for group_name, records in groups.items():
        values = [r[value_column] for r in records]
        n = len(values)
        result[group_name] = {
            'count': n,
            'mean': sum(values) / n,
            'min': min(values),
            'max': max(values),
        }
    return result

dept_groups = group_by(dataset, 'dept')
dept_salary = aggregate_groups(dept_groups, 'salary')

print("=== Salary by Department ===")
for dept, stats in dept_salary.items():
    print(f"{dept}: avg=\${stats['mean']:,.0f}, range=\${stats['min']:,}-\${stats['max']:,}")`
      },
      {
        title: 'Step 3: Find Correlations',
        instruction: 'Calculate the correlation between years of experience and salary to determine if there is a relationship.',
        starterCode: `# EDA — Step 3: Correlation Analysis

def correlation(data, col_x, col_y):
    """Calculate Pearson correlation coefficient between two columns.

    r = sum((xi - mean_x)(yi - mean_y)) / sqrt(sum((xi-mean_x)^2) * sum((yi-mean_y)^2))

    Returns: float between -1 and 1
    """
    # TODO: Implement Pearson correlation
    pass

# Test correlations
pairs = [
    ('years', 'salary'),
    ('years', 'rating'),
    ('salary', 'rating'),
]

print("=== Correlation Matrix ===")
for col_x, col_y in pairs:
    r = correlation(dataset, col_x, col_y)
    strength = 'strong' if abs(r) > 0.7 else 'moderate' if abs(r) > 0.4 else 'weak'
    print(f"{col_x} vs {col_y}: r={r:.3f} ({strength})")`,
        hints: [
          'First compute mean_x and mean_y',
          'Numerator: sum of (xi - mean_x) * (yi - mean_y)',
          'Denominator: sqrt(sum_sq_x * sum_sq_y) where sum_sq is sum of squared deviations'
        ],
        expectedOutput: `=== Correlation Matrix ===
years vs salary: r=0.9xx (strong)
years vs rating: r=0.xxx (weak/moderate)
salary vs rating: r=0.xxx (moderate)`,
        solution: `import math

def correlation(data, col_x, col_y):
    xs = [r[col_x] for r in data]
    ys = [r[col_y] for r in data]
    n = len(xs)
    mean_x = sum(xs) / n
    mean_y = sum(ys) / n

    numerator = sum((x - mean_x) * (y - mean_y) for x, y in zip(xs, ys))
    sum_sq_x = sum((x - mean_x) ** 2 for x in xs)
    sum_sq_y = sum((y - mean_y) ** 2 for y in ys)
    denominator = math.sqrt(sum_sq_x * sum_sq_y)

    if denominator == 0:
        return 0
    return numerator / denominator

pairs = [
    ('years', 'salary'),
    ('years', 'rating'),
    ('salary', 'rating'),
]

print("=== Correlation Matrix ===")
for col_x, col_y in pairs:
    r = correlation(dataset, col_x, col_y)
    strength = 'strong' if abs(r) > 0.7 else 'moderate' if abs(r) > 0.4 else 'weak'
    print(f"{col_x} vs {col_y}: r={r:.3f} ({strength})")`
      },
      {
        title: 'Step 4: Generate an EDA Report',
        instruction: 'Tie everything together into a comprehensive EDA report function that summarizes the dataset.',
        starterCode: `# EDA — Step 4: Full Report

def eda_report(data, numeric_cols, group_col=None):
    """Generate a complete EDA report.

    Sections:
    1. Dataset overview (rows, columns)
    2. Descriptive stats for each numeric column
    3. Group analysis (if group_col provided)
    4. Top correlations between numeric columns
    5. Key insights (automated observations)
    """
    # TODO: Build and print a comprehensive report
    pass

# Generate the report
eda_report(
    dataset,
    numeric_cols=['salary', 'years', 'rating'],
    group_col='dept'
)`,
        hints: [
          'Reuse describe_column, group_by, aggregate_groups, and correlation',
          'For insights, check for strong correlations (|r| > 0.7) and group differences',
          'Format the output with clear section headers and alignment'
        ],
        expectedOutput: `=== EDA REPORT ===

DATASET: 8 rows, 5 columns

DESCRIPTIVE STATISTICS:
  salary: mean=$87,125 std=$14,xxx ...
  years: mean=4.75 std=1.xx ...
  ...

GROUP ANALYSIS (by dept):
  Engineering: 4 employees, avg salary $102,000
  ...

CORRELATIONS:
  years ↔ salary: 0.9xx (strong positive)
  ...

KEY INSIGHTS:
  ✓ Strong correlation between years and salary
  ...`,
        solution: `def eda_report(data, numeric_cols, group_col=None):
    print("=" * 50)
    print("EDA REPORT")
    print("=" * 50)

    # 1. Overview
    cols = list(data[0].keys()) if data else []
    print(f"\\nDATASET: {len(data)} rows, {len(cols)} columns")
    print(f"Columns: {', '.join(cols)}")

    # 2. Descriptive stats
    print(f"\\nDESCRIPTIVE STATISTICS:")
    for col in numeric_cols:
        stats = describe_column(data, col)
        print(f"  {col}: mean={stats['mean']}, std={stats['std_dev']}, range=[{stats['min']}, {stats['max']}]")

    # 3. Group analysis
    if group_col:
        print(f"\\nGROUP ANALYSIS (by {group_col}):")
        groups = group_by(data, group_col)
        for col in numeric_cols:
            agg = aggregate_groups(groups, col)
            for grp, stats in agg.items():
                print(f"  {grp} — {col}: n={stats['count']}, mean={stats['mean']:.1f}")

    # 4. Correlations
    print(f"\\nCORRELATIONS:")
    insights = []
    for i, col_x in enumerate(numeric_cols):
        for col_y in numeric_cols[i+1:]:
            r = correlation(data, col_x, col_y)
            direction = "positive" if r > 0 else "negative"
            strength = "strong" if abs(r) > 0.7 else "moderate" if abs(r) > 0.4 else "weak"
            print(f"  {col_x} ↔ {col_y}: {r:.3f} ({strength} {direction})")
            if abs(r) > 0.7:
                insights.append(f"Strong {direction} correlation between {col_x} and {col_y}")

    # 5. Insights
    print(f"\\nKEY INSIGHTS:")
    for insight in insights:
        print(f"  ✓ {insight}")

eda_report(dataset, numeric_cols=['salary', 'years', 'rating'], group_col='dept')`
      }
    ]
  },

  // ============================================================
  // QA / TEST ENGINEER LABS
  // ============================================================
  {
    id: 'qa-lab-1',
    roleId: 'qa-test-engineer',
    level: 'beginner',
    title: 'Test Automation Suite',
    description: 'Learn to write unit tests, mock dependencies, and create integration tests for a user service.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Write Unit Tests',
        instruction: 'Write unit tests for a simple calculator module using assertion patterns.',
        starterCode: `// calculator.js — module under test
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

// calculator.test.js — write tests
// TODO: Test add with positive numbers, negative numbers, zero
// TODO: Test subtract
// TODO: Test multiply
// TODO: Test divide including the zero case

describe('Calculator', () => {
  describe('add', () => {
    // TODO: Write at least 3 test cases
  });

  describe('divide', () => {
    // TODO: Test normal division and division by zero
  });
});`,
        hints: [
          'Use test() or it() for each test case',
          'expect(add(2, 3)).toBe(5) for simple assertions',
          'Use expect(() => divide(1, 0)).toThrow("Division by zero") for error testing'
        ],
        expectedOutput: `PASS calculator.test.js
  Calculator
    add
      ✓ adds two positive numbers
      ✓ adds negative numbers
      ✓ adds zero
    divide
      ✓ divides evenly
      ✓ returns decimal for non-even division
      ✓ throws on division by zero`,
        solution: `describe('Calculator', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    test('adds negative numbers', () => {
      expect(add(-1, -2)).toBe(-3);
    });
    test('adds zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(subtract(10, 3)).toBe(7);
    });
  });

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(multiply(4, 5)).toBe(20);
    });
    test('multiplies by zero', () => {
      expect(multiply(4, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    test('divides evenly', () => {
      expect(divide(10, 2)).toBe(5);
    });
    test('returns decimal', () => {
      expect(divide(7, 2)).toBe(3.5);
    });
    test('throws on division by zero', () => {
      expect(() => divide(1, 0)).toThrow('Division by zero');
    });
  });
});`
      },
      {
        title: 'Step 2: Mock Dependencies',
        instruction: 'Write tests for a user service that depends on a database. Use mocks to isolate the unit under test.',
        starterCode: `// userService.js
class UserService {
  constructor(database) {
    this.db = database;
  }

  async getUser(id) {
    const user = await this.db.findById(id);
    if (!user) throw new Error('User not found');
    return { ...user, fullName: user.firstName + ' ' + user.lastName };
  }

  async createUser(data) {
    if (!data.email) throw new Error('Email required');
    return await this.db.insert(data);
  }
}

// userService.test.js
// TODO: Create a mock database
// TODO: Test getUser success and not-found cases
// TODO: Test createUser validation and success

describe('UserService', () => {
  let service;
  let mockDb;

  beforeEach(() => {
    // TODO: Set up mock database and service
  });

  // TODO: Write test cases
});`,
        hints: [
          'Create mockDb with jest.fn(): { findById: jest.fn(), insert: jest.fn() }',
          'Use mockDb.findById.mockResolvedValue({...}) to set return values',
          'Use mockDb.findById.mockResolvedValue(null) for the not-found case'
        ],
        expectedOutput: `PASS userService.test.js
  UserService
    getUser
      ✓ returns user with fullName
      ✓ throws when user not found
    createUser
      ✓ creates user successfully
      ✓ throws when email missing`,
        solution: `describe('UserService', () => {
  let service;
  let mockDb;

  beforeEach(() => {
    mockDb = {
      findById: jest.fn(),
      insert: jest.fn(),
    };
    service = new UserService(mockDb);
  });

  describe('getUser', () => {
    test('returns user with fullName', async () => {
      mockDb.findById.mockResolvedValue({
        id: 1, firstName: 'John', lastName: 'Doe', email: 'john@test.com'
      });

      const user = await service.getUser(1);
      expect(user.fullName).toBe('John Doe');
      expect(mockDb.findById).toHaveBeenCalledWith(1);
    });

    test('throws when user not found', async () => {
      mockDb.findById.mockResolvedValue(null);
      await expect(service.getUser(99)).rejects.toThrow('User not found');
    });
  });

  describe('createUser', () => {
    test('creates user successfully', async () => {
      const userData = { email: 'new@test.com', firstName: 'New' };
      mockDb.insert.mockResolvedValue({ id: 2, ...userData });

      const result = await service.createUser(userData);
      expect(result.id).toBe(2);
      expect(mockDb.insert).toHaveBeenCalledWith(userData);
    });

    test('throws when email missing', async () => {
      await expect(service.createUser({ firstName: 'No Email' }))
        .rejects.toThrow('Email required');
    });
  });
});`
      }
    ]
  },

  // ============================================================
  // SECURITY ENGINEER LABS
  // ============================================================
  {
    id: 'sec-lab-1',
    roleId: 'security-engineer',
    level: 'beginner',
    title: 'Security Audit Checklist',
    description: 'Build automated security checks: dependency scanning, secret detection, and SAST analysis.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Dependency Vulnerability Scanner',
        instruction: 'Create a function that checks a list of dependencies against a known vulnerability database.',
        starterCode: `# Security Audit — Step 1: Dependency Scanner

# Simulated vulnerability database
VULN_DB = {
    "lodash": {"affected": "<4.17.21", "severity": "critical", "cve": "CVE-2021-23337"},
    "express": {"affected": "<4.18.0", "severity": "high", "cve": "CVE-2022-24999"},
    "jsonwebtoken": {"affected": "<9.0.0", "severity": "medium", "cve": "CVE-2022-23529"},
    "axios": {"affected": "<1.3.0", "severity": "high", "cve": "CVE-2023-26159"},
}

def parse_version(version_str):
    """Parse a version string like '4.17.20' into a tuple of ints."""
    # TODO: Split on '.' and convert to int tuple
    pass

def is_vulnerable(package_name, version, vuln_db):
    """Check if a package version is vulnerable.
    Returns: dict with vulnerability info or None
    """
    # TODO: Look up package in vuln_db, compare versions
    pass

# Test with sample dependencies
dependencies = {
    "lodash": "4.17.20",
    "express": "4.19.0",
    "jsonwebtoken": "8.5.1",
    "axios": "1.4.0",
    "react": "18.2.0",
}

print("=== Dependency Scan Results ===")
for pkg, version in dependencies.items():
    result = is_vulnerable(pkg, version, VULN_DB)
    if result:
        print(f"  ⚠ {pkg}@{version}: {result['severity']} — {result['cve']}")
    else:
        print(f"  ✓ {pkg}@{version}: OK")`,
        hints: [
          'parse_version: return tuple(int(x) for x in version_str.split("."))',
          'Compare tuples directly: (4, 17, 20) < (4, 17, 21) works in Python',
          'Extract the threshold version from the "affected" field by removing the "<" prefix'
        ],
        expectedOutput: `=== Dependency Scan Results ===
  ⚠ lodash@4.17.20: critical — CVE-2021-23337
  ✓ express@4.19.0: OK
  ⚠ jsonwebtoken@8.5.1: medium — CVE-2022-23529
  ✓ axios@1.4.0: OK
  ✓ react@18.2.0: OK`,
        solution: `def parse_version(version_str):
    return tuple(int(x) for x in version_str.split("."))

def is_vulnerable(package_name, version, vuln_db):
    if package_name not in vuln_db:
        return None

    vuln = vuln_db[package_name]
    threshold = vuln["affected"].lstrip("<")

    if parse_version(version) < parse_version(threshold):
        return {"severity": vuln["severity"], "cve": vuln["cve"]}
    return None

dependencies = {
    "lodash": "4.17.20",
    "express": "4.19.0",
    "jsonwebtoken": "8.5.1",
    "axios": "1.4.0",
    "react": "18.2.0",
}

print("=== Dependency Scan Results ===")
for pkg, version in dependencies.items():
    result = is_vulnerable(pkg, version, VULN_DB)
    if result:
        print(f"  ⚠ {pkg}@{version}: {result['severity']} — {result['cve']}")
    else:
        print(f"  ✓ {pkg}@{version}: OK")`
      },
      {
        title: 'Step 2: Secret Scanner',
        instruction: 'Build a scanner that detects hardcoded secrets in source code using regex patterns.',
        starterCode: `# Security Audit — Step 2: Secret Scanner
import re

# TODO: Define regex patterns for common secrets
SECRET_PATTERNS = {
    # 'pattern_name': regex_pattern
    # Detect: API keys, AWS keys, private keys, passwords in connection strings
}

def scan_for_secrets(code_text, patterns):
    """Scan code text for hardcoded secrets.
    Returns: List of { type, line_number, match_preview }
    """
    # TODO: Check each line against all patterns
    pass

# Test with sample code
sample_code = """
import os

API_KEY = "sk-proj-abc123def456ghi789"
DATABASE_URL = "postgres://admin:supersecret@db.example.com/mydb"
aws_access_key = "AKIAIOSFODNN7EXAMPLE"
private_key = "-----BEGIN RSA PRIVATE KEY-----"
safe_var = os.environ.get("API_KEY")
"""

findings = scan_for_secrets(sample_code, SECRET_PATTERNS)
print(f"=== Secret Scan: {len(findings)} findings ===")
for f in findings:
    print(f"  Line {f['line']}: [{f['type']}] {f['preview']}")`,
        hints: [
          'API key pattern: r\'["\\\'](sk-[a-zA-Z0-9]\\{20,\\})["\\\']\\\'',
          'AWS key pattern: r\'AKIA[0-9A-Z]\\{16\\}\'',
          'Password in URL: r\'://\\w+:([^@]+)@\''
        ],
        expectedOutput: `=== Secret Scan: 4 findings ===
  Line 4: [api_key] sk-proj-abc123...
  Line 5: [password_in_url] supersecret
  Line 6: [aws_access_key] AKIAIOSFODNN7EXAMPLE
  Line 7: [private_key] -----BEGIN RSA PRIVATE KEY-----`,
        solution: `import re

SECRET_PATTERNS = {
    'api_key': r'["\\'](sk-[a-zA-Z0-9-]{10,})["\\'\\s]',
    'aws_access_key': r'(AKIA[0-9A-Z]{16})',
    'password_in_url': r'://\\w+:([^@\\s]+)@',
    'private_key': r'(-----BEGIN (?:RSA )?PRIVATE KEY-----)',
}

def scan_for_secrets(code_text, patterns):
    findings = []
    lines = code_text.strip().split("\\n")
    for i, line in enumerate(lines, 1):
        for pattern_name, regex in patterns.items():
            match = re.search(regex, line)
            if match:
                findings.append({
                    'type': pattern_name,
                    'line': i,
                    'preview': match.group(1) if match.groups() else match.group(0)
                })
    return findings

findings = scan_for_secrets(sample_code, SECRET_PATTERNS)
print(f"=== Secret Scan: {len(findings)} findings ===")
for f in findings:
    print(f"  Line {f['line']}: [{f['type']}] {f['preview']}")`
      }
    ]
  },

  // ============================================================
  // ML ENGINEER LABS
  // ============================================================
  {
    id: 'ml-lab-1',
    roleId: 'ml-engineer',
    level: 'beginner',
    title: 'Train & Evaluate a Model',
    description: 'Build a simple classifier from scratch: prepare data, train a model, and evaluate it with proper metrics.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Prepare Training Data',
        instruction: 'Create a function that splits a dataset into training and test sets with stratified sampling.',
        starterCode: `# ML Pipeline — Step 1: Data Preparation
import random

def train_test_split(data, labels, test_ratio=0.2, seed=42):
    """Split data into training and test sets.

    Args:
        data: List of feature vectors
        labels: List of corresponding labels
        test_ratio: Fraction of data for testing
        seed: Random seed for reproducibility
    Returns:
        (train_data, train_labels, test_data, test_labels)
    """
    # TODO: Shuffle indices, split by ratio
    pass

# Sample dataset: classify fruits by weight and color score
data = [
    [150, 7], [170, 8], [140, 6], [130, 5],  # Apples
    [200, 3], [220, 2], [190, 4], [210, 3],  # Bananas
    [80, 9], [90, 8], [70, 7], [85, 9],      # Cherries
]
labels = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2]  # 0=Apple, 1=Banana, 2=Cherry

train_X, train_y, test_X, test_y = train_test_split(data, labels)
print(f"Training: {len(train_X)} samples")
print(f"Testing: {len(test_X)} samples")`,
        hints: [
          'Create indices list: list(range(len(data)))',
          'Use random.seed(seed) then random.shuffle(indices)',
          'Split point: int(len(indices) * (1 - test_ratio))'
        ],
        expectedOutput: `Training: 9 samples
Testing: 3 samples`,
        solution: `import random

def train_test_split(data, labels, test_ratio=0.2, seed=42):
    random.seed(seed)
    indices = list(range(len(data)))
    random.shuffle(indices)

    split = int(len(indices) * (1 - test_ratio))
    train_idx = indices[:split]
    test_idx = indices[split:]

    train_data = [data[i] for i in train_idx]
    train_labels = [labels[i] for i in train_idx]
    test_data = [data[i] for i in test_idx]
    test_labels = [labels[i] for i in test_idx]

    return train_data, train_labels, test_data, test_labels

train_X, train_y, test_X, test_y = train_test_split(data, labels)
print(f"Training: {len(train_X)} samples")
print(f"Testing: {len(test_X)} samples")`
      },
      {
        title: 'Step 2: Implement K-Nearest Neighbors',
        instruction: 'Build a simple KNN classifier that predicts labels based on the k closest training examples.',
        starterCode: `# ML Pipeline — Step 2: KNN Classifier
import math

def euclidean_distance(a, b):
    """Calculate Euclidean distance between two vectors."""
    # TODO: sqrt(sum((ai - bi)^2))
    pass

def knn_predict(train_X, train_y, test_point, k=3):
    """Predict the label for a test point using KNN.

    1. Compute distance from test_point to all training points
    2. Find k nearest neighbors
    3. Return the most common label among neighbors
    """
    # TODO: Implement KNN prediction
    pass

# Test prediction
test_point = [160, 7]  # Should be Apple-like
prediction = knn_predict(train_X, train_y, test_point, k=3)
label_names = {0: 'Apple', 1: 'Banana', 2: 'Cherry'}
print(f"Point {test_point} → Predicted: {label_names[prediction]}")`,
        hints: [
          'Compute distances: [(euclidean_distance(x, test_point), label) for x, label in zip(train_X, train_y)]',
          'Sort by distance: distances.sort(key=lambda x: x[0])',
          'Most common: use Counter on the k nearest labels'
        ],
        expectedOutput: `Point [160, 7] → Predicted: Apple`,
        solution: `import math
from collections import Counter

def euclidean_distance(a, b):
    return math.sqrt(sum((ai - bi) ** 2 for ai, bi in zip(a, b)))

def knn_predict(train_X, train_y, test_point, k=3):
    distances = []
    for x, label in zip(train_X, train_y):
        dist = euclidean_distance(x, test_point)
        distances.append((dist, label))

    distances.sort(key=lambda x: x[0])
    k_nearest = [label for _, label in distances[:k]]

    counter = Counter(k_nearest)
    return counter.most_common(1)[0][0]

test_point = [160, 7]
prediction = knn_predict(train_X, train_y, test_point, k=3)
label_names = {0: 'Apple', 1: 'Banana', 2: 'Cherry'}
print(f"Point {test_point} → Predicted: {label_names[prediction]}")`
      }
    ]
  },

  // ============================================================
  // MARKETING TECHNOLOGY DEVELOPER LABS
  // ============================================================
  {
    id: 'mt-lab-1',
    roleId: 'marketing-technology-developer',
    level: 'beginner',
    title: 'Analytics Dashboard',
    description: 'Build a tracking plan, event collector, and basic analytics aggregation pipeline.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Define a Tracking Plan',
        instruction: 'Create a tracking plan schema that validates analytics events before they are collected.',
        starterCode: `# Marketing Analytics — Step 1: Tracking Plan

tracking_plan = {
    "page_view": {
        "required": ["page_url", "page_title"],
        "optional": ["referrer", "utm_source", "utm_medium"],
    },
    "button_click": {
        "required": ["button_id", "button_text", "page_url"],
        "optional": ["section"],
    },
    "form_submit": {
        "required": ["form_id", "form_name", "page_url"],
        "optional": ["field_count", "time_to_complete_ms"],
    },
}

def validate_event(event_name, properties, plan):
    """Validate an event against the tracking plan.
    Returns: (is_valid, errors_list)
    """
    # TODO: Check event exists in plan
    # TODO: Check all required properties are present
    # TODO: Warn about unknown properties
    pass

# Test validation
events = [
    ("page_view", {"page_url": "/home", "page_title": "Home"}),
    ("button_click", {"button_id": "cta-1"}),  # Missing required fields
    ("unknown_event", {"foo": "bar"}),  # Unknown event
]

for name, props in events:
    valid, errors = validate_event(name, props, tracking_plan)
    status = "✓" if valid else "✗"
    print(f"  {status} {name}: {errors if errors else 'OK'}")`,
        hints: [
          'Check if event_name is in plan dict first',
          'Use set operations: required - set(properties.keys()) gives missing fields',
          'Unknown props: set(properties.keys()) - set(required + optional)'
        ],
        expectedOutput: `  ✓ page_view: OK
  ✗ button_click: ['Missing: button_text', 'Missing: page_url']
  ✗ unknown_event: ['Unknown event type']`,
        solution: `def validate_event(event_name, properties, plan):
    errors = []

    if event_name not in plan:
        return False, ["Unknown event type"]

    schema = plan[event_name]
    prop_keys = set(properties.keys())
    required = set(schema["required"])
    optional = set(schema.get("optional", []))

    missing = required - prop_keys
    for field in sorted(missing):
        errors.append(f"Missing: {field}")

    unknown = prop_keys - required - optional
    for field in sorted(unknown):
        errors.append(f"Unknown property: {field}")

    return len(errors) == 0, errors

for name, props in events:
    valid, errors = validate_event(name, props, tracking_plan)
    status = "✓" if valid else "✗"
    print(f"  {status} {name}: {errors if errors else 'OK'}")`
      },
      {
        title: 'Step 2: Collect and Aggregate Events',
        instruction: 'Build an event collector that stores events and computes basic metrics.',
        starterCode: `# Marketing Analytics — Step 2: Event Collector

class EventCollector:
    def __init__(self, tracking_plan):
        self.plan = tracking_plan
        self.events = []

    def track(self, event_name, properties, timestamp=None):
        """Track an event. Validate against plan, store if valid."""
        # TODO: Validate, add timestamp, store event
        pass

    def get_metrics(self):
        """Compute basic metrics from collected events.
        Returns: dict with event counts, top pages, conversion funnel
        """
        # TODO: Count events by type, find top pages, compute rates
        pass

# Simulate a user session
collector = EventCollector(tracking_plan)
collector.track("page_view", {"page_url": "/home", "page_title": "Home"})
collector.track("page_view", {"page_url": "/products", "page_title": "Products"})
collector.track("button_click", {"button_id": "add-cart", "button_text": "Add to Cart", "page_url": "/products"})
collector.track("page_view", {"page_url": "/checkout", "page_title": "Checkout"})
collector.track("form_submit", {"form_id": "checkout-form", "form_name": "Checkout", "page_url": "/checkout"})

metrics = collector.get_metrics()
print(f"Total events: {metrics['total']}")
print(f"Event breakdown: {metrics['by_type']}")
print(f"Top pages: {metrics['top_pages']}")`,
        hints: [
          'Use time.time() for default timestamp if None',
          'Store events as dicts: {"name": ..., "properties": ..., "timestamp": ...}',
          'For top pages, count page_url across page_view events using Counter'
        ],
        expectedOutput: `Total events: 5
Event breakdown: {'page_view': 3, 'button_click': 1, 'form_submit': 1}
Top pages: [('/home', 1), ('/products', 1), ('/checkout', 1)]`,
        solution: `import time
from collections import Counter

class EventCollector:
    def __init__(self, tracking_plan):
        self.plan = tracking_plan
        self.events = []

    def track(self, event_name, properties, timestamp=None):
        valid, errors = validate_event(event_name, properties, self.plan)
        if not valid:
            print(f"Rejected {event_name}: {errors}")
            return False

        self.events.append({
            "name": event_name,
            "properties": properties,
            "timestamp": timestamp or time.time()
        })
        return True

    def get_metrics(self):
        by_type = Counter(e["name"] for e in self.events)
        page_views = [e for e in self.events if e["name"] == "page_view"]
        top_pages = Counter(e["properties"]["page_url"] for e in page_views).most_common(5)

        return {
            "total": len(self.events),
            "by_type": dict(by_type),
            "top_pages": top_pages,
        }

collector = EventCollector(tracking_plan)
collector.track("page_view", {"page_url": "/home", "page_title": "Home"})
collector.track("page_view", {"page_url": "/products", "page_title": "Products"})
collector.track("button_click", {"button_id": "add-cart", "button_text": "Add to Cart", "page_url": "/products"})
collector.track("page_view", {"page_url": "/checkout", "page_title": "Checkout"})
collector.track("form_submit", {"form_id": "checkout-form", "form_name": "Checkout", "page_url": "/checkout"})

metrics = collector.get_metrics()
print(f"Total events: {metrics['total']}")
print(f"Event breakdown: {metrics['by_type']}")
print(f"Top pages: {metrics['top_pages']}")`
      }
    ]
  },

  // ============================================================
  // TECH LEAD / ARCHITECT LABS
  // ============================================================
  {
    id: 'tl-lab-1',
    roleId: 'tech-lead-architect',
    level: 'beginner',
    title: 'System Design Review',
    description: 'Practice structured system design by defining requirements, components, data flow, and trade-offs.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Gather Requirements',
        instruction: 'Create a structured requirements document for a URL shortener service. Separate functional and non-functional requirements.',
        starterCode: `# System Design — Step 1: Requirements Template

def gather_requirements(system_name):
    """Create a structured requirements document.

    Returns a dict with:
    - functional: list of functional requirements
    - non_functional: list of NFRs (performance, scale, availability)
    - constraints: known constraints
    - assumptions: assumptions we're making
    """
    # TODO: Fill in requirements for a URL shortener service
    return {
        "system": system_name,
        "functional": [
            # TODO: List 5+ functional requirements
            # e.g., "Given a long URL, generate a short URL"
        ],
        "non_functional": [
            # TODO: List 4+ non-functional requirements
            # e.g., "p99 latency under 100ms for redirects"
        ],
        "constraints": [
            # TODO: List constraints
        ],
        "assumptions": [
            # TODO: List assumptions
        ],
    }

reqs = gather_requirements("URL Shortener")
for section, items in reqs.items():
    if isinstance(items, list):
        print(f"\\n{section.upper()}:")
        for item in items:
            print(f"  - {item}")`,
        hints: [
          'Functional: create short URL, redirect, custom aliases, expiration, analytics',
          'Non-functional: latency, availability (99.9%), read-heavy ratio (100:1)',
          'Constraints: short URLs should be 7 chars max, no offensive words'
        ],
        expectedOutput: `FUNCTIONAL:
  - Given a long URL, generate a unique short URL
  - Redirect short URL to original URL
  - Allow custom aliases
  - Track click analytics
  - Support URL expiration

NON_FUNCTIONAL:
  - p99 redirect latency < 100ms
  - 99.9% availability
  - Support 100M URLs, 10B redirects/month
  ...`,
        solution: `def gather_requirements(system_name):
    return {
        "system": system_name,
        "functional": [
            "Given a long URL, generate a unique short URL (7 chars)",
            "Redirect short URL to the original long URL",
            "Allow users to specify custom short aliases",
            "Track click analytics (count, referrer, geography)",
            "Support URL expiration (TTL)",
            "Provide API for programmatic access",
        ],
        "non_functional": [
            "p99 redirect latency under 100ms",
            "99.9% availability (8.7 hours downtime/year max)",
            "Support 100M URLs stored, 10B redirects per month",
            "Read-to-write ratio approximately 100:1",
            "Short URLs should be unguessable (no sequential IDs)",
        ],
        "constraints": [
            "Short URL max 7 characters (base62 encoding)",
            "No offensive words in generated URLs",
            "HTTPS only for all endpoints",
        ],
        "assumptions": [
            "Average URL length is 200 characters",
            "Storage per URL record ~500 bytes (URL + metadata)",
            "Total storage: 100M * 500B = ~50GB",
            "Read QPS: ~3,800 (10B / 30 days / 86400 seconds)",
        ],
    }

reqs = gather_requirements("URL Shortener")
for section, items in reqs.items():
    if isinstance(items, list):
        print(f"\\n{section.upper()}:")
        for item in items:
            print(f"  - {item}")`
      },
      {
        title: 'Step 2: Design Components',
        instruction: 'Define the high-level system components, their responsibilities, and how they communicate.',
        starterCode: `# System Design — Step 2: Component Design

def design_components():
    """Define system components for the URL shortener.

    For each component, specify:
    - name: Component name
    - responsibility: What it does
    - technology: Suggested tech choice
    - interfaces: APIs it exposes or consumes
    """
    # TODO: Define 5+ components
    components = []

    # TODO: Define communication patterns between components
    communications = []

    return {"components": components, "communications": communications}

design = design_components()
print("=== Components ===")
for c in design["components"]:
    print(f"  [{c['name']}] — {c['responsibility']}")
    print(f"    Tech: {c['technology']}")
print("\\n=== Communications ===")
for comm in design["communications"]:
    print(f"  {comm['from']} → {comm['to']}: {comm['protocol']}")`,
        hints: [
          'Components: API Gateway, URL Service, Redirect Service, Analytics Service, Cache, Database',
          'Technology choices: Express/FastAPI, Redis, PostgreSQL, Kafka',
          'Communications: REST between services, pub/sub for analytics, cache reads for redirects'
        ],
        expectedOutput: `=== Components ===
  [API Gateway] — Route requests, rate limiting, auth
    Tech: Nginx / Kong
  [URL Service] — Create and manage short URLs
    Tech: Node.js / FastAPI
  [Redirect Service] — Handle redirects with cache
    Tech: Node.js + Redis
  ...`,
        solution: `def design_components():
    components = [
        {
            "name": "API Gateway",
            "responsibility": "Route requests, rate limiting, authentication, SSL termination",
            "technology": "Nginx or Kong",
            "interfaces": ["POST /api/shorten", "GET /:shortCode", "GET /api/stats/:shortCode"]
        },
        {
            "name": "URL Service",
            "responsibility": "Generate short URLs, validate custom aliases, manage CRUD operations",
            "technology": "Node.js with Express or Python FastAPI",
            "interfaces": ["createShortUrl()", "getUrl()", "deleteUrl()"]
        },
        {
            "name": "Redirect Service",
            "responsibility": "Resolve short codes to long URLs, serve 301/302 redirects",
            "technology": "Node.js + Redis cache",
            "interfaces": ["resolve(shortCode) → longUrl"]
        },
        {
            "name": "Analytics Service",
            "responsibility": "Track clicks, aggregate stats, serve analytics dashboards",
            "technology": "Python + ClickHouse",
            "interfaces": ["recordClick()", "getStats()"]
        },
        {
            "name": "Cache Layer",
            "responsibility": "Cache hot URLs for fast redirect lookups",
            "technology": "Redis Cluster",
            "interfaces": ["get(key)", "set(key, value, ttl)"]
        },
        {
            "name": "Database",
            "responsibility": "Persistent storage for URL mappings and user data",
            "technology": "PostgreSQL with read replicas",
            "interfaces": ["SQL queries via connection pool"]
        },
    ]

    communications = [
        {"from": "API Gateway", "to": "URL Service", "protocol": "REST/HTTP"},
        {"from": "API Gateway", "to": "Redirect Service", "protocol": "REST/HTTP"},
        {"from": "Redirect Service", "to": "Cache Layer", "protocol": "Redis protocol"},
        {"from": "Redirect Service", "to": "Database", "protocol": "SQL"},
        {"from": "Redirect Service", "to": "Analytics Service", "protocol": "Kafka (async)"},
        {"from": "URL Service", "to": "Database", "protocol": "SQL"},
        {"from": "URL Service", "to": "Cache Layer", "protocol": "Redis protocol"},
    ]

    return {"components": components, "communications": communications}

design = design_components()
print("=== Components ===")
for c in design["components"]:
    print(f"  [{c['name']}] — {c['responsibility']}")
    print(f"    Tech: {c['technology']}")
print("\\n=== Communications ===")
for comm in design["communications"]:
    print(f"  {comm['from']} → {comm['to']}: {comm['protocol']}")`
      }
    ]
  },

  // ============================================================
  // PYTHON LANGUAGE LABS
  // ============================================================
  {
    id: 'py-lab-1',
    languageId: 'python',
    level: 'beginner',
    title: 'Python Fundamentals Workout',
    description: 'Master Python basics through progressive exercises covering variables, control flow, functions, and data structures.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Variables and String Manipulation',
        instruction: 'Practice Python string methods and f-string formatting. Build a function that formats user profile data.',
        starterCode: `# Python Fundamentals — Variables & Strings

def format_profile(first_name, last_name, age, city):
    """Format a user profile string.

    Rules:
    - Names should be title case
    - If age < 18, add "(minor)" tag
    - Return formatted string: "Name (age) — City"
    """
    # TODO: Implement formatting
    pass

def count_words(text):
    """Count unique words in text (case-insensitive).
    Returns dict of {word: count}.
    """
    # TODO: Implement word counter
    pass

# Test
print(format_profile("  alice  ", "SMITH", 25, "stockholm"))
print(format_profile("bob", "jones", 16, "gothenburg"))
print(count_words("the cat sat on the mat the cat"))`,
        hints: [
          'Use .strip().title() to clean and capitalize names',
          'f-strings: f"{name} ({age}){" (minor)" if age < 18 else ""} — {city}"',
          'For word counting: split(), lower(), and use a dict or Counter'
        ],
        expectedOutput: `Alice Smith (25) — Stockholm
Bob Jones (16) (minor) — Gothenburg
{'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1}`,
        solution: `def format_profile(first_name, last_name, age, city):
    name = f"{first_name.strip().title()} {last_name.strip().title()}"
    minor_tag = " (minor)" if age < 18 else ""
    return f"{name} ({age}){minor_tag} — {city.strip().title()}"

def count_words(text):
    words = text.lower().split()
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts

print(format_profile("  alice  ", "SMITH", 25, "stockholm"))
print(format_profile("bob", "jones", 16, "gothenburg"))
print(count_words("the cat sat on the mat the cat"))`
      },
      {
        title: 'Step 2: Lists and Dictionaries',
        instruction: 'Work with Python collections: filter, transform, and aggregate data in lists and dicts.',
        starterCode: `# Python Fundamentals — Collections

students = [
    {"name": "Alice", "grade": 92, "subject": "Math"},
    {"name": "Bob", "grade": 78, "subject": "Science"},
    {"name": "Charlie", "grade": 95, "subject": "Math"},
    {"name": "Diana", "grade": 88, "subject": "Science"},
    {"name": "Eve", "grade": 67, "subject": "Math"},
    {"name": "Frank", "grade": 91, "subject": "Science"},
]

def get_honor_roll(students, threshold=90):
    """Return names of students with grade >= threshold, sorted."""
    # TODO: Filter and sort
    pass

def average_by_subject(students):
    """Return dict of {subject: average_grade}."""
    # TODO: Group by subject and compute averages
    pass

def grade_distribution(students):
    """Return dict of grade bands: A (90+), B (80-89), C (70-79), F (<70)."""
    # TODO: Count students in each band
    pass

print("Honor Roll:", get_honor_roll(students))
print("By Subject:", average_by_subject(students))
print("Distribution:", grade_distribution(students))`,
        hints: [
          'Honor roll: sorted([s["name"] for s in students if s["grade"] >= threshold])',
          'For grouping, use setdefault to build lists per subject',
          'Grade bands: use if/elif to classify each grade'
        ],
        expectedOutput: `Honor Roll: ['Alice', 'Charlie', 'Frank']
By Subject: {'Math': 84.67, 'Science': 85.67}
Distribution: {'A': 3, 'B': 1, 'C': 1, 'F': 1}`,
        solution: `def get_honor_roll(students, threshold=90):
    return sorted([s["name"] for s in students if s["grade"] >= threshold])

def average_by_subject(students):
    groups = {}
    for s in students:
        groups.setdefault(s["subject"], []).append(s["grade"])
    return {subj: round(sum(grades)/len(grades), 2) for subj, grades in groups.items()}

def grade_distribution(students):
    bands = {"A": 0, "B": 0, "C": 0, "F": 0}
    for s in students:
        g = s["grade"]
        if g >= 90: bands["A"] += 1
        elif g >= 80: bands["B"] += 1
        elif g >= 70: bands["C"] += 1
        else: bands["F"] += 1
    return bands

print("Honor Roll:", get_honor_roll(students))
print("By Subject:", average_by_subject(students))
print("Distribution:", grade_distribution(students))`
      },
      {
        title: 'Step 3: Functions and Error Handling',
        instruction: 'Build a mini calculator that handles errors gracefully and supports operation chaining.',
        starterCode: `# Python Fundamentals — Functions & Error Handling

class Calculator:
    def __init__(self):
        self.result = 0
        self.history = []

    def add(self, value):
        """Add value to result. Chain: calc.add(5).add(3)"""
        # TODO: Update result, log to history, return self
        pass

    def subtract(self, value):
        # TODO
        pass

    def multiply(self, value):
        # TODO
        pass

    def divide(self, value):
        """Divide. Raise ValueError if dividing by zero."""
        # TODO: Handle division by zero
        pass

    def reset(self):
        # TODO: Reset result to 0
        pass

    def __repr__(self):
        return f"Calculator(result={self.result})"

# Test chaining
calc = Calculator()
calc.add(10).subtract(3).multiply(2)
print(calc)  # Calculator(result=14)
print("History:", calc.history)

# Test error handling
try:
    calc.divide(0)
except ValueError as e:
    print(f"Error: {e}")`,
        hints: [
          'Return self from each method to enable chaining',
          'History: self.history.append(f"+ {value} = {self.result}")',
          'Division: if value == 0: raise ValueError("Cannot divide by zero")'
        ],
        expectedOutput: `Calculator(result=14)
History: ['+ 10 = 10', '- 3 = 7', '* 2 = 14']
Error: Cannot divide by zero`,
        solution: `class Calculator:
    def __init__(self):
        self.result = 0
        self.history = []

    def _log(self, op, value):
        self.history.append(f"{op} {value} = {self.result}")

    def add(self, value):
        self.result += value
        self._log("+", value)
        return self

    def subtract(self, value):
        self.result -= value
        self._log("-", value)
        return self

    def multiply(self, value):
        self.result *= value
        self._log("*", value)
        return self

    def divide(self, value):
        if value == 0:
            raise ValueError("Cannot divide by zero")
        self.result /= value
        self._log("/", value)
        return self

    def reset(self):
        self.result = 0
        self.history = []
        return self

    def __repr__(self):
        return f"Calculator(result={self.result})"

calc = Calculator()
calc.add(10).subtract(3).multiply(2)
print(calc)
print("History:", calc.history)

try:
    calc.divide(0)
except ValueError as e:
    print(f"Error: {e}")`
      }
    ]
  },

  // ============================================================
  // JAVASCRIPT LANGUAGE LABS
  // ============================================================
  {
    id: 'js-lab-1',
    languageId: 'javascript',
    level: 'beginner',
    title: 'DOM Manipulation Challenge',
    description: 'Learn DOM manipulation by building interactive elements: selectors, events, dynamic content, and local storage.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Select and Modify Elements',
        instruction: 'Practice DOM selection methods and modify element content, classes, and styles.',
        starterCode: `// DOM Basics — Selecting and Modifying Elements

// Given this HTML structure:
// <div id="app">
//   <h1 class="title">Hello</h1>
//   <ul class="list">
//     <li class="item">Item 1</li>
//     <li class="item active">Item 2</li>
//     <li class="item">Item 3</li>
//   </ul>
//   <button id="action-btn">Click Me</button>
// </div>

// TODO: Select the h1 element and change its text to "Welcome"
// Hint: document.getElementById() or document.querySelector()

// TODO: Select ALL .item elements and add a "visited" class to each

// TODO: Find the .active item and change its background color to #e0f2fe

// TODO: Change the button text to "Clicked!" and disable it`,
        hints: [
          'querySelector returns first match, querySelectorAll returns NodeList',
          'element.classList.add("visited") adds a class',
          'element.textContent = "new text" changes text content'
        ],
        expectedOutput: `h1 text becomes "Welcome"
All .item elements get "visited" class
The .active item gets a blue background
Button shows "Clicked!" and is disabled`,
        solution: `// Select and modify h1
const title = document.querySelector('.title');
title.textContent = 'Welcome';

// Add class to all items
const items = document.querySelectorAll('.item');
items.forEach(item => item.classList.add('visited'));

// Style the active item
const activeItem = document.querySelector('.item.active');
activeItem.style.backgroundColor = '#e0f2fe';

// Update button
const btn = document.getElementById('action-btn');
btn.textContent = 'Clicked!';
btn.disabled = true;`
      },
      {
        title: 'Step 2: Handle Events',
        instruction: 'Add event listeners for click, input, and keyboard events. Build a simple counter with keyboard shortcuts.',
        starterCode: `// DOM Events — Build an Interactive Counter

// HTML:
// <div id="counter-app">
//   <span id="count">0</span>
//   <button id="increment">+</button>
//   <button id="decrement">-</button>
//   <button id="reset">Reset</button>
//   <input id="step-input" type="number" value="1" min="1" />
// </div>

let count = 0;
let step = 1;

// TODO: Add click handlers for increment, decrement, reset buttons

// TODO: Add input handler for step-input (changes the step amount)

// TODO: Add keyboard shortcuts: ArrowUp = increment, ArrowDown = decrement, 'r' = reset

function updateDisplay() {
  document.getElementById('count').textContent = count;
}`,
        hints: [
          'element.addEventListener("click", () => { ... })',
          'For keyboard: document.addEventListener("keydown", (e) => { if (e.key === "ArrowUp") ... })',
          'parseInt(input.value) converts the step input to a number'
        ],
        expectedOutput: `Click + → count increases by step
Click - → count decreases by step
Click Reset → count goes to 0
ArrowUp/ArrowDown/R keyboard shortcuts work
Changing step input changes the increment amount`,
        solution: `let count = 0;
let step = 1;

function updateDisplay() {
  document.getElementById('count').textContent = count;
}

document.getElementById('increment').addEventListener('click', () => {
  count += step;
  updateDisplay();
});

document.getElementById('decrement').addEventListener('click', () => {
  count -= step;
  updateDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

document.getElementById('step-input').addEventListener('input', (e) => {
  step = parseInt(e.target.value) || 1;
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') { count += step; updateDisplay(); }
  if (e.key === 'ArrowDown') { count -= step; updateDisplay(); }
  if (e.key === 'r') { count = 0; updateDisplay(); }
});`
      },
      {
        title: 'Step 3: Create Elements Dynamically',
        instruction: 'Build a todo list that creates, toggles, and removes DOM elements dynamically.',
        starterCode: `// Dynamic DOM — Todo List

// HTML: <div id="todo-app">
//   <input id="todo-input" placeholder="Add a task..." />
//   <button id="add-btn">Add</button>
//   <ul id="todo-list"></ul>
//   <span id="count-display">0 items</span>
// </div>

const todos = [];

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;

  // TODO: Create a new todo object { id, text, completed }
  // TODO: Create a <li> element with:
  //   - Checkbox to toggle completion
  //   - Text span (strike-through when completed)
  //   - Delete button (×)
  // TODO: Append to #todo-list
  // TODO: Clear input and update count
}

function updateCount() {
  // TODO: Update the count display with remaining (not completed) items
}

// TODO: Add event listeners for add button and Enter key in input`,
        hints: [
          'document.createElement("li") creates a new element',
          'checkbox.addEventListener("change", ...) for toggle',
          'element.remove() removes it from the DOM'
        ],
        expectedOutput: `Type "Buy groceries" + Enter → new list item appears
Click checkbox → text gets strikethrough
Click × → item is removed
Count shows "2 items" (only non-completed)`,
        solution: `const todos = [];
let nextId = 1;

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;

  const todo = { id: nextId++, text, completed: false };
  todos.push(todo);

  const li = document.createElement('li');
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.gap = '8px';
  li.style.padding = '8px 0';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '×';
  deleteBtn.style.marginLeft = 'auto';

  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    updateCount();
  });

  deleteBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    if (idx > -1) todos.splice(idx, 1);
    li.remove();
    updateCount();
  });

  li.append(checkbox, span, deleteBtn);
  document.getElementById('todo-list').appendChild(li);
  input.value = '';
  updateCount();
}

function updateCount() {
  const remaining = todos.filter(t => !t.completed).length;
  document.getElementById('count-display').textContent = remaining + ' items';
}

document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});`
      }
    ]
  },

  // ============================================================
  // HTML-CSS LANGUAGE LABS
  // ============================================================
  {
    id: 'hc-lab-1',
    languageId: 'html-css',
    level: 'beginner',
    title: 'Build a Responsive Layout',
    description: 'Create a responsive page layout using semantic HTML, Flexbox, Grid, and media queries.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Semantic HTML Structure',
        instruction: 'Create a page layout using proper semantic HTML5 elements: header, nav, main, aside, article, and footer.',
        starterCode: `<!-- TODO: Build a semantic HTML page structure -->
<!-- Include:
  - <header> with site title and <nav> with 4 links
  - <main> containing:
    - <article> with heading, paragraph, and image placeholder
    - <aside> with a "Related Posts" list
  - <footer> with copyright text
-->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Blog</title>
</head>
<body>
  <!-- TODO: Add semantic structure here -->
</body>
</html>`,
        hints: [
          'Use <header> for the top bar, <nav> inside it for navigation links',
          'Use <main> as the primary content area, <article> for the blog post',
          '<aside> is for related/supplementary content like sidebars'
        ],
        expectedOutput: `A well-structured HTML page with:
- Header with navigation
- Main content with article
- Sidebar with related posts
- Footer with copyright`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Blog</title>
</head>
<body>
  <header>
    <h1>My Blog</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Understanding CSS Grid</h2>
      <p>CSS Grid is a powerful layout system that makes building complex layouts simple...</p>
      <img src="placeholder.jpg" alt="CSS Grid illustration" />
    </article>

    <aside>
      <h3>Related Posts</h3>
      <ul>
        <li><a href="#">Flexbox Guide</a></li>
        <li><a href="#">Responsive Design</a></li>
        <li><a href="#">CSS Variables</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2025 My Blog. All rights reserved.</p>
  </footer>
</body>
</html>`
      },
      {
        title: 'Step 2: Flexbox Navigation',
        instruction: 'Style the header and navigation using Flexbox. Make the nav responsive with space-between alignment.',
        starterCode: `/* TODO: Style the header with Flexbox */
/* Requirements:
  - Header: horizontal flex, items centered vertically, space-between
  - Background color: #1e293b, text: white, padding: 1rem 2rem
  - Nav links: horizontal row with gap, no underlines
  - Links: white text, hover becomes #60a5fa (blue)
  - On mobile (<768px): stack nav below title
*/

header {
  /* TODO */
}

header h1 {
  /* TODO */
}

nav {
  /* TODO */
}

nav a {
  /* TODO */
}

nav a:hover {
  /* TODO */
}`,
        hints: [
          'display: flex; align-items: center; justify-content: space-between;',
          'nav links: display: flex; gap: 1.5rem;',
          '@media (max-width: 768px) { header { flex-direction: column; } }'
        ],
        expectedOutput: `Desktop: Title on left, nav links on right in a row
Mobile: Title stacked above nav links
Links turn blue on hover`,
        solution: `header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1e293b;
  color: white;
  padding: 1rem 2rem;
}

header h1 {
  font-size: 1.5rem;
  margin: 0;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  transition: color 0.2s;
}

nav a:hover {
  color: #60a5fa;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}`
      },
      {
        title: 'Step 3: CSS Grid Content Layout',
        instruction: 'Use CSS Grid to create a two-column layout: article (2/3 width) and aside (1/3 width). Stack on mobile.',
        starterCode: `/* TODO: Grid layout for main content area */
/* Requirements:
  - Main: 2-column grid — article 2fr, aside 1fr
  - Gap: 2rem
  - Max-width: 1200px, centered with auto margins
  - Padding: 2rem
  - On mobile (<768px): single column
  - Article: styled with padding, light background
  - Aside: styled with border and padding
*/

main {
  /* TODO */
}

article {
  /* TODO */
}

aside {
  /* TODO */
}

/* Responsive */`,
        hints: [
          'grid-template-columns: 2fr 1fr; creates the 2/3 + 1/3 split',
          'On mobile: grid-template-columns: 1fr; for single column',
          'Use max-width: 1200px; margin: 0 auto; for centering'
        ],
        expectedOutput: `Desktop: Article takes 2/3, sidebar takes 1/3
Mobile: Article stacks on top of sidebar
Both have padding and subtle styling`,
        solution: `main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

article {
  background-color: #f8fafc;
  padding: 2rem;
  border-radius: 8px;
}

article img {
  width: 100%;
  border-radius: 8px;
  margin-top: 1rem;
}

aside {
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  align-self: start;
}

aside ul {
  list-style: none;
  padding: 0;
}

aside li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

@media (max-width: 768px) {
  main {
    grid-template-columns: 1fr;
  }
}`
      }
    ]
  },

  // ============================================================
  // SQL LANGUAGE LABS
  // ============================================================
  {
    id: 'sql-lab-1',
    languageId: 'sql',
    level: 'beginner',
    title: 'Query Challenge Gauntlet',
    description: 'Master SQL fundamentals through progressive query challenges: SELECT, filtering, JOINs, and aggregation.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: SELECT and Filtering',
        instruction: 'Write queries to select, filter, and sort data from an employees table.',
        starterCode: `-- Given table: employees
-- Columns: id, name, department, salary, hire_date, is_active

-- TODO: Query 1: Select all active employees, ordered by salary descending

-- TODO: Query 2: Find employees hired after 2023-01-01 with salary > 70000

-- TODO: Query 3: Find employees whose name starts with 'A' or 'M'

-- TODO: Query 4: Select name and salary, renaming salary as "annual_pay"`,
        hints: [
          'WHERE is_active = true for active employees',
          'Use AND to combine conditions: hire_date > \'2023-01-01\' AND salary > 70000',
          'LIKE \'A%\' matches names starting with A; combine with OR'
        ],
        expectedOutput: `Query 1: All active employees sorted by salary (highest first)
Query 2: Recent high-earners
Query 3: Names starting with A or M
Query 4: Name and annual_pay columns`,
        solution: `-- Query 1
SELECT * FROM employees
WHERE is_active = true
ORDER BY salary DESC;

-- Query 2
SELECT * FROM employees
WHERE hire_date > '2023-01-01'
  AND salary > 70000;

-- Query 3
SELECT * FROM employees
WHERE name LIKE 'A%' OR name LIKE 'M%';

-- Query 4
SELECT name, salary AS annual_pay
FROM employees;`
      },
      {
        title: 'Step 2: JOINs',
        instruction: 'Write queries that combine data from multiple tables using different JOIN types.',
        starterCode: `-- Tables:
-- employees (id, name, department_id, salary)
-- departments (id, name, budget)
-- projects (id, name, lead_id)

-- TODO: Query 1: List all employees with their department name
-- (Use INNER JOIN)

-- TODO: Query 2: List ALL departments, even those with no employees
-- (Use LEFT JOIN from departments)

-- TODO: Query 3: Find employees who are project leads
-- Show: employee name, project name

-- TODO: Query 4: Find departments where the total salary exceeds the budget`,
        hints: [
          'INNER JOIN departments d ON e.department_id = d.id',
          'LEFT JOIN keeps all rows from the left table even with no match',
          'JOIN projects p ON e.id = p.lead_id links employees to projects'
        ],
        expectedOutput: `Query 1: Employee names with department names
Query 2: All departments including those with 0 employees
Query 3: Project leads with their project names
Query 4: Over-budget departments`,
        solution: `-- Query 1: Employees with department names
SELECT e.name AS employee, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- Query 2: All departments (including empty ones)
SELECT d.name AS department, COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name;

-- Query 3: Project leads
SELECT e.name AS lead_name, p.name AS project_name
FROM employees e
INNER JOIN projects p ON e.id = p.lead_id;

-- Query 4: Over-budget departments
SELECT d.name, d.budget, SUM(e.salary) AS total_salary
FROM departments d
INNER JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name, d.budget
HAVING SUM(e.salary) > d.budget;`
      },
      {
        title: 'Step 3: GROUP BY and Aggregation',
        instruction: 'Use aggregate functions and GROUP BY to analyze data patterns.',
        starterCode: `-- TODO: Query 1: Count employees per department, sorted by count descending

-- TODO: Query 2: Find the min, max, and average salary per department

-- TODO: Query 3: Find departments with more than 5 employees

-- TODO: Query 4: For each department, find the highest-paid employee
-- (Use a subquery or window function)`,
        hints: [
          'GROUP BY department_id with COUNT(*) for employee counts',
          'Use MIN(salary), MAX(salary), AVG(salary) in SELECT',
          'HAVING COUNT(*) > 5 filters groups (WHERE filters rows)'
        ],
        expectedOutput: `Query 1: Department employee counts
Query 2: Salary ranges per department
Query 3: Large departments only
Query 4: Top earner per department`,
        solution: `-- Query 1: Employee count per department
SELECT d.name, COUNT(*) AS employee_count
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.id, d.name
ORDER BY employee_count DESC;

-- Query 2: Salary stats per department
SELECT d.name,
  MIN(e.salary) AS min_salary,
  MAX(e.salary) AS max_salary,
  ROUND(AVG(e.salary), 2) AS avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.id, d.name;

-- Query 3: Departments with 5+ employees
SELECT d.name, COUNT(*) AS headcount
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.id, d.name
HAVING COUNT(*) > 5;

-- Query 4: Highest-paid per department (window function)
SELECT name, department_id, salary
FROM (
  SELECT e.name, e.department_id, e.salary,
    RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS rk
  FROM employees e
) ranked
WHERE rk = 1;`
      }
    ]
  },

  // ============================================================
  // TYPESCRIPT LANGUAGE LABS
  // ============================================================
  {
    id: 'ts-lab-1',
    languageId: 'typescript',
    level: 'beginner',
    title: 'Type a JavaScript Module',
    description: 'Learn TypeScript basics by adding types to an existing JavaScript module: basic types, interfaces, generics, and type guards.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Add Basic Type Annotations',
        instruction: 'Convert plain JavaScript functions to TypeScript by adding type annotations for parameters and return values.',
        starterCode: `// TODO: Add TypeScript types to these JavaScript functions

// Convert this JS function to TS:
function greet(name) {
  return "Hello, " + name + "!";
}

// Convert: handle optional and default parameters
function createUser(name, age, email) {
  return { name, age, email: email || "not provided" };
}

// Convert: handle arrays and return type
function sum(numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// Convert: handle union types (value can be string or number)
function formatValue(value) {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}`,
        hints: [
          'greet(name: string): string',
          'Optional params: email?: string. Default: age: number = 0',
          'Union types: value: string | number'
        ],
        expectedOutput: `function greet(name: string): string
function createUser(name: string, age: number, email?: string): {...}
function sum(numbers: number[]): number
function formatValue(value: string | number): string`,
        solution: `function greet(name: string): string {
  return "Hello, " + name + "!";
}

function createUser(
  name: string,
  age: number,
  email?: string
): { name: string; age: number; email: string } {
  return { name, age, email: email || "not provided" };
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

function formatValue(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}`
      },
      {
        title: 'Step 2: Define Interfaces',
        instruction: 'Create TypeScript interfaces for a blog system: Post, Author, and Comment.',
        starterCode: `// TODO: Define interfaces for a blog system

// Interface: Author
// - id: number
// - name: string
// - email: string
// - bio?: string (optional)

// Interface: Comment
// - id: number
// - author: Author
// - text: string
// - createdAt: Date

// Interface: Post
// - id: number
// - title: string
// - content: string
// - author: Author
// - tags: string[]
// - comments: Comment[]
// - published: boolean
// - createdAt: Date
// - updatedAt?: Date (optional)

// TODO: Create a function that takes a Post and returns a summary string
// Format: "Title by Author (X comments)"

// TODO: Create a function that filters posts by tag`,
        hints: [
          'interface Author { id: number; name: string; ... }',
          'Use the interfaces as types: function getPostSummary(post: Post): string',
          'Filter: posts.filter(p => p.tags.includes(tag))'
        ],
        expectedOutput: `interface Author { id: number; name: string; email: string; bio?: string }
interface Post { ... }
getPostSummary(post) → "My Post by Alice (3 comments)"
filterByTag(posts, "typescript") → Post[]`,
        solution: `interface Author {
  id: number;
  name: string;
  email: string;
  bio?: string;
}

interface Comment {
  id: number;
  author: Author;
  text: string;
  createdAt: Date;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
  tags: string[];
  comments: Comment[];
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

function getPostSummary(post: Post): string {
  return \`\${post.title} by \${post.author.name} (\${post.comments.length} comments)\`;
}

function filterByTag(posts: Post[], tag: string): Post[] {
  return posts.filter(p => p.tags.includes(tag));
}`
      },
      {
        title: 'Step 3: Use Generics',
        instruction: 'Create generic utility functions that work with any type while maintaining type safety.',
        starterCode: `// TODO: Implement generic utility functions

// Generic function: first element of any array
// function first<T>(arr: T[]): T | undefined

// Generic function: unique values from an array
// function unique<T>(arr: T[]): T[]

// Generic interface: API response wrapper
// interface ApiResponse<T> { data: T; status: number; message: string }

// Generic function: create a typed API response
// function createResponse<T>(data: T, status: number, message: string): ApiResponse<T>

// Test your generics:
// first([1, 2, 3]) → number
// first(["a", "b"]) → string
// unique([1, 2, 2, 3, 3]) → [1, 2, 3]
// createResponse({ name: "Alice" }, 200, "OK") → ApiResponse<{name: string}>`,
        hints: [
          'function first<T>(arr: T[]): T | undefined { return arr[0]; }',
          'unique: return [...new Set(arr)] or use Array.from(new Set(arr))',
          'The generic T flows through: createResponse<User>(user, 200, "OK") returns ApiResponse<User>'
        ],
        expectedOutput: `first([1,2,3]) → 1 (type: number)
unique([1,2,2,3]) → [1,2,3] (type: number[])
createResponse(user, 200, "OK") → { data: User, status: 200, message: "OK" }`,
        solution: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function createResponse<T>(data: T, status: number, message: string): ApiResponse<T> {
  return { data, status, message };
}

// Usage — TypeScript infers the generic type:
const num = first([1, 2, 3]);         // number | undefined
const str = first(["a", "b"]);        // string | undefined
const nums = unique([1, 2, 2, 3, 3]); // number[]

const response = createResponse(
  { name: "Alice", age: 30 },
  200,
  "OK"
); // ApiResponse<{ name: string; age: number }>`
      }
    ]
  }
]
