// Language-specific skill diagrams (Mermaid flowcharts)
// Keyed by language ID
export const languageSkillDiagrams = {
  'python': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["Variables"]
      B2["Control Flow"]
      B3["Functions"]
      B4["Data Structures"]
      B5["File I/O"]
      B1 --> B2
      B2 --> B3
      B3 --> B4
      B4 --> B5
    end

    subgraph Mid["Mid"]
      M1["OOP"]
      M2["Decorators"]
      M3["Generators"]
      M4["Type Hints"]
      M5["Testing"]
      M1 --> M2
      M2 --> M3
      M3 --> M4
      M4 --> M5
    end

    subgraph Senior["Senior"]
      S1["Async"]
      S2["Metaclasses"]
      S3["Memory"]
      S4["Concurrency"]
      S5["Design Patterns"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S4 --> S5
    end

    Beginner --> Mid
    Mid --> Senior`,

  'javascript': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["Variables"]
      B2["Functions"]
      B3["Arrays/Objects"]
      B4["DOM"]
      B5["Events"]
      B6["Async Basics"]
      B1 --> B2
      B2 --> B3
      B3 --> B4
      B4 --> B5
      B5 --> B6
    end

    subgraph Mid["Mid"]
      M1["Closures"]
      M2["Prototypes"]
      M3["Modules"]
      M4["Fetch/Async"]
      M5["Testing"]
      M6["FP"]
      M1 --> M2
      M2 --> M3
      M3 --> M4
      M4 --> M5
      M5 --> M6
    end

    subgraph Senior["Senior"]
      S1["Event Loop"]
      S2["Memory"]
      S3["Workers"]
      S4["Performance"]
      S5["Patterns"]
      S6["Security"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S4 --> S5
      S5 --> S6
    end

    Beginner --> Mid
    Mid --> Senior`,

  'html-css': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["Semantic HTML"]
      B2["Forms"]
      B3["Selectors"]
      B4["Box Model"]
      B5["Flexbox"]
      B6["Grid"]
      B7["Responsive"]
      B1 --> B2
      B2 --> B3
      B3 --> B4
      B4 --> B5
      B5 --> B6
      B6 --> B7
    end

    subgraph Mid["Mid"]
      M1["Custom Properties"]
      M2["Animations"]
      M3["BEM"]
      M4["Accessibility"]
      M5["SVG"]
      M6["Pseudo-elements"]
      M1 --> M2
      M2 --> M3
      M3 --> M4
      M4 --> M5
      M5 --> M6
    end

    subgraph Senior["Senior"]
      S1["CSS Architecture"]
      S2["Container Queries"]
      S3["Cascade Layers"]
      S4["Performance"]
      S5["Design Systems"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S4 --> S5
    end

    Beginner --> Mid
    Mid --> Senior`,

  'sql': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["SELECT"]
      B2["Filtering"]
      B3["JOINs"]
      B4["Aggregates"]
      B5["Subqueries"]
      B6["Indexes"]
      B7["Data Types"]
      B1 --> B2
      B2 --> B3
      B3 --> B4
      B4 --> B5
      B5 --> B6
      B6 --> B7
    end

    subgraph Mid["Mid"]
      M1["Window Functions"]
      M2["CTEs"]
      M3["Transactions"]
      M4["Views"]
      M5["Optimization"]
      M6["Normalization"]
      M1 --> M2
      M2 --> M3
      M3 --> M4
      M4 --> M5
      M5 --> M6
    end

    subgraph Senior["Senior"]
      S1["Execution Plans"]
      S2["Index Internals"]
      S3["Partitioning"]
      S4["Locking"]
      S5["Performance"]
      S6["Migrations"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S4 --> S5
      S5 --> S6
    end

    Beginner --> Mid
    Mid --> Senior`,

  'typescript': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["Type Annotations"]
      B2["Interfaces"]
      B3["Enums"]
      B4["Unions"]
      B5["Generics"]
      B6["tsconfig"]
      B1 --> B2
      B2 --> B3
      B3 --> B4
      B4 --> B5
      B5 --> B6
    end

    subgraph Mid["Mid"]
      M1["Advanced Generics"]
      M2["Utility Types"]
      M3["Mapped Types"]
      M4["Conditional Types"]
      M5["Strict Mode"]
      M1 --> M2
      M2 --> M3
      M3 --> M4
      M4 --> M5
    end

    subgraph Senior["Senior"]
      S1["Template Literals"]
      S2["Type Programming"]
      S3["Branded Types"]
      S4["Monorepo"]
      S5["Migration"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S4 --> S5
    end

    Beginner --> Mid
    Mid --> Senior`
}
