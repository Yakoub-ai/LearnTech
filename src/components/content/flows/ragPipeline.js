import { MarkerType } from '@xyflow/react'

const nodeDefaults = {
  style: {
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 13,
    fontFamily: 'Inter, system-ui, sans-serif',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface-2)',
    color: 'var(--color-text)',
    cursor: 'pointer',
  },
}

const primaryStyle = {
  ...nodeDefaults.style,
  background: '#6366f1',
  color: '#fff',
  border: '1px solid #4f46e5',
}

const accentStyle = {
  ...nodeDefaults.style,
  background: '#0ea5e9',
  color: '#fff',
  border: '1px solid #0284c7',
}

const nodes = [
  // Indexing phase
  {
    id: 'docs',
    position: { x: 0, y: 0 },
    data: {
      label: '📄 Documents',
      detail: 'Raw source documents (PDFs, web pages, docs, databases) that contain the knowledge you want the LLM to access.',
      tips: ['Support multiple formats: PDF, HTML, Markdown, CSV', 'Version documents for reproducibility', 'Track document lineage and freshness'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'chunker',
    position: { x: 200, y: 0 },
    data: {
      label: '✂️ Chunker',
      detail: 'Splits documents into smaller, semantically meaningful chunks. Chunk size and overlap significantly affect retrieval quality.',
      code: 'from langchain.text_splitter import (\n  RecursiveCharacterTextSplitter\n)\nsplitter = RecursiveCharacterTextSplitter(\n  chunk_size=512,\n  chunk_overlap=50\n)',
      tips: ['Typical chunk size: 256-1024 tokens', 'Use overlap (50-100 tokens) to preserve context at boundaries', 'Consider semantic chunking for better results'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'embedder',
    position: { x: 400, y: 0 },
    data: {
      label: '🔢 Embedding Model',
      detail: 'Converts text chunks into dense vector representations that capture semantic meaning. Similar concepts end up close together in vector space.',
      code: 'from openai import OpenAI\nclient = OpenAI()\nresponse = client.embeddings.create(\n  model="text-embedding-3-small",\n  input=chunk_text\n)\nvector = response.data[0].embedding',
      tips: ['text-embedding-3-small: 1536 dims, fast, cheap', 'text-embedding-3-large: 3072 dims, more accurate', 'Use the same model for indexing AND querying'],
    },
    style: primaryStyle,
  },
  {
    id: 'vectordb',
    position: { x: 600, y: 0 },
    data: {
      label: '🗄️ Vector Store',
      detail: 'Stores embedding vectors with metadata for fast approximate nearest neighbor (ANN) search. Returns the most semantically similar chunks to a query.',
      tips: ['Popular options: Pinecone, Weaviate, Chroma, pgvector', 'ANN algorithms: HNSW, IVF, PQ', 'Store metadata for filtering (source, date, author)'],
    },
    style: accentStyle,
  },

  // Query phase
  {
    id: 'question',
    position: { x: 0, y: 160 },
    data: {
      label: '❓ User Question',
      detail: 'The natural language query from the user. May be reformulated before embedding to improve retrieval quality.',
      tips: ['Consider query expansion for ambiguous questions', 'Use HyDE (Hypothetical Document Embeddings) for better matching'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'queryembed',
    position: { x: 200, y: 160 },
    data: {
      label: '🔢 Query Embedding',
      detail: 'The question is embedded using the SAME model as the documents, so it lives in the same vector space and similarity search works correctly.',
    },
    style: primaryStyle,
  },
  {
    id: 'retriever',
    position: { x: 400, y: 160 },
    data: {
      label: '🔍 Retriever',
      detail: 'Performs similarity search against the vector store to find the top-k most relevant chunks. May also apply re-ranking for better precision.',
      code: 'results = vectorstore.similarity_search(\n  query=question,\n  k=5\n)\n# Optional: re-rank results\nreranked = reranker.rank(\n  query=question,\n  documents=results\n)',
      tips: ['Start with k=5-10, tune based on context window', 'Re-ranking (Cohere, cross-encoder) improves precision', 'Hybrid search combines vector + keyword (BM25)'],
    },
    style: accentStyle,
  },
  {
    id: 'context',
    position: { x: 600, y: 160 },
    data: {
      label: '📋 Context Window',
      detail: 'Retrieved chunks are assembled into the prompt context along with the user question and system instructions.',
      tips: ['Order chunks by relevance score', 'Deduplicate overlapping content', 'Track token count to stay within limits'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'llm',
    position: { x: 400, y: 300 },
    data: {
      label: '🤖 LLM',
      detail: 'The language model generates an answer grounded in the retrieved context. The prompt instructs it to only use provided information and cite sources.',
      code: 'response = client.messages.create(\n  model="claude-sonnet-4-20250514",\n  system="Answer using ONLY the provided context. Cite sources.",\n  messages=[{\n    "role": "user",\n    "content": f"Context:\\n{context}\\n\\nQuestion: {question}"\n  }]\n)',
      tips: ['Instruct the model to say "I don\'t know" when context is insufficient', 'Ask for citations to verify grounding', 'Temperature 0-0.3 for factual answers'],
    },
    style: primaryStyle,
  },
  {
    id: 'response',
    position: { x: 600, y: 300 },
    data: {
      label: '✅ Response',
      detail: 'The final answer returned to the user, grounded in retrieved documents with source citations.',
      tips: ['Include source references for verification', 'Log retrieval scores for monitoring', 'Evaluate with RAGAS metrics: faithfulness, relevancy, recall'],
    },
    style: nodeDefaults.style,
  },
]

const edgeDefaults = {
  style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-primary)' },
  animated: true,
}

const edges = [
  // Indexing flow
  { id: 'e1', source: 'docs', target: 'chunker', label: 'split', ...edgeDefaults },
  { id: 'e2', source: 'chunker', target: 'embedder', label: 'chunks', ...edgeDefaults },
  { id: 'e3', source: 'embedder', target: 'vectordb', label: 'vectors', ...edgeDefaults },
  // Query flow
  { id: 'e4', source: 'question', target: 'queryembed', label: 'embed', ...edgeDefaults },
  { id: 'e5', source: 'queryembed', target: 'retriever', label: 'search', ...edgeDefaults },
  { id: 'e6', source: 'vectordb', target: 'retriever', label: 'top-k', ...edgeDefaults, animated: false },
  { id: 'e7', source: 'retriever', target: 'context', label: 'results', ...edgeDefaults },
  { id: 'e8', source: 'context', target: 'llm', label: 'prompt', ...edgeDefaults },
  { id: 'e9', source: 'question', target: 'llm', label: 'question', ...edgeDefaults, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
  { id: 'e10', source: 'llm', target: 'response', label: 'answer', ...edgeDefaults },
]

export default {
  title: 'RAG Pipeline — Retrieval-Augmented Generation',
  nodes,
  edges,
}
