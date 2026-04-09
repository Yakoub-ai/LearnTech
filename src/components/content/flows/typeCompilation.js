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

const greenStyle = {
  ...nodeDefaults.style,
  background: '#10b981',
  color: '#fff',
  border: '1px solid #059669',
}

const amberStyle = {
  ...nodeDefaults.style,
  background: '#f59e0b',
  color: '#fff',
  border: '1px solid #d97706',
}

const nodes = [
  {
    id: 'source',
    position: { x: 0, y: 80 },
    data: {
      label: '📝 Source .ts',
      detail: 'The raw TypeScript source code files. Each file is a compilation unit that contains type annotations, interfaces, generics, and standard JavaScript code.',
      tips: ['tsconfig.json controls which files are included and how they are compiled', 'The "strict" flag enables all strict type checking options', 'Project references allow splitting large codebases into smaller compilation units'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'scanner',
    position: { x: 180, y: 80 },
    data: {
      label: '🔤 Scanner',
      detail: 'The scanner (lexer/tokeniser) reads raw text character by character and produces a stream of tokens: keywords (const, function, interface), identifiers, literals, operators, and punctuation.',
      code: '// Source code:\nconst x: number = 42;\n\n// Token stream:\n// [const] [x] [:] [number] [=] [42] [;]\n//  kwd    id  op   kwd     op  lit  punc',
      tips: ['The scanner is the first phase — it does not understand structure, only individual tokens', 'It handles string escapes, template literals, and JSX syntax', 'Invalid characters produce scanner errors (e.g., illegal Unicode)'],
    },
    style: accentStyle,
  },
  {
    id: 'parser',
    position: { x: 360, y: 80 },
    data: {
      label: '🌳 Parser',
      detail: 'The parser consumes the token stream and builds an Abstract Syntax Tree (AST). The AST represents the hierarchical structure of the code: statements contain expressions, functions contain blocks, etc.',
      code: '// AST for: const x: number = 42;\n// VariableStatement\n//   └── VariableDeclaration\n//       ├── name: Identifier "x"\n//       ├── type: TypeReference "number"\n//       └── initializer:\n//           NumericLiteral 42',
      tips: ['Syntax errors are caught here: missing semicolons, unmatched braces', 'The AST preserves type annotations that will be used by the checker', 'You can inspect the AST at ts-ast-viewer.com'],
    },
    style: primaryStyle,
  },
  {
    id: 'binder',
    position: { x: 0, y: 220 },
    data: {
      label: '🔗 Binder',
      detail: 'The binder walks the AST and creates a symbol table — a mapping from each name (variable, function, type) to its declaration. It resolves scoping rules: which "x" does this reference refer to?',
      tips: ['Creates the symbol table that the checker will use', 'Resolves block scoping (let/const) vs function scoping (var)', 'Handles declaration merging for interfaces and namespaces'],
    },
    style: accentStyle,
  },
  {
    id: 'checker',
    position: { x: 180, y: 220 },
    data: {
      label: '✅ Type Checker',
      detail: 'The heart of TypeScript. The checker walks every AST node and verifies type correctness: assignment compatibility, function call arguments, generic constraints, control flow narrowing, and more.',
      code: '// The checker catches errors like:\nconst x: number = "hello";\n//    ^^^^^^^^^^^^^^^^^^^^^\n// Type \'string\' is not assignable\n// to type \'number\'. (2322)\n\n// It also infers types:\nconst y = [1, 2, 3];\n// y is inferred as number[]',
      tips: ['This is the most computationally expensive phase', 'Structural typing: types are compatible if their shapes match', 'Control flow analysis narrows types after if/switch/typeof checks', 'Generics are resolved here by substituting type parameters'],
    },
    style: amberStyle,
  },
  {
    id: 'emitter',
    position: { x: 360, y: 220 },
    data: {
      label: '📤 Emitter',
      detail: 'The emitter transforms the AST into output files. It strips all type annotations to produce plain JavaScript (.js) and generates type declaration files (.d.ts) for library consumers.',
      code: '// Input (TypeScript):\nconst greet = (name: string): string\n  => `Hello, ${name}`;\n\n// Output (.js):\nconst greet = (name)\n  => `Hello, ${name}`;\n\n// Output (.d.ts):\ndeclare const greet:\n  (name: string) => string;',
      tips: ['Type annotations are completely erased at runtime — zero overhead', '.d.ts files let JavaScript consumers get type checking without source code', 'Source maps (.js.map) enable debugging TypeScript in the browser'],
    },
    style: greenStyle,
  },
  {
    id: 'output',
    position: { x: 180, y: 340 },
    data: {
      label: '📦 Output',
      detail: 'The final output: JavaScript files (.js) for execution, declaration files (.d.ts) for type information, and source maps (.js.map) for debugging.',
      tips: ['target in tsconfig controls the JS version output (ES2020, ESNext)', 'module controls the module system (ESM, CommonJS)', 'declaration: true generates .d.ts files for library authors'],
    },
    style: greenStyle,
  },
]

const edgeDefaults = {
  style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-primary)' },
  animated: true,
}

const edges = [
  { id: 'e1', source: 'source', target: 'scanner', label: 'tokenise', ...edgeDefaults },
  { id: 'e2', source: 'scanner', target: 'parser', label: 'tokens', ...edgeDefaults },
  { id: 'e3', source: 'parser', target: 'binder', label: 'AST', ...edgeDefaults },
  { id: 'e4', source: 'binder', target: 'checker', label: 'symbols', ...edgeDefaults },
  { id: 'e5', source: 'checker', target: 'emitter', label: 'validated', ...edgeDefaults },
  { id: 'e6', source: 'emitter', target: 'output', label: 'emit', ...edgeDefaults },
]

export default {
  title: 'TypeScript Compiler Pipeline — From .ts to .js',
  nodes,
  edges,
}
