import {
  FileCode2, Braces, Globe, Database, FileType
} from 'lucide-react'

export const languages = [
  {
    id: 'python',
    name: 'Python',
    description: 'A versatile, readable language powering data science, AI/ML, backend APIs, automation, and scripting. The most in-demand language for AI engineers and data professionals.',
    icon: 'FileCode2',
    color: 'blue',
    fileName: 'Python',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 30,
      mid: 45,
      senior: 60
    },
    relatedRoles: ['ai-engineer', 'data-scientist', 'data-engineer', 'ml-engineer', 'backend-developer', 'devops-platform-engineer']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'The language of the web — runs in every browser, powers Node.js backends, React frontends, and full-stack applications. Essential for frontend and full-stack developers.',
    icon: 'Braces',
    color: 'amber',
    fileName: 'JavaScript',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 35,
      mid: 50,
      senior: 65
    },
    relatedRoles: ['frontend-developer', 'backend-developer', 'marketing-technology-developer', 'qa-test-engineer']
  },
  {
    id: 'html-css',
    name: 'HTML & CSS',
    description: 'The foundational building blocks of every web page. HTML provides structure and semantics, CSS handles layout, styling, animations, and responsive design.',
    icon: 'Globe',
    color: 'orange',
    fileName: 'HTML-CSS',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 25,
      mid: 40,
      senior: 50
    },
    relatedRoles: ['frontend-developer', 'marketing-technology-developer']
  },
  {
    id: 'sql',
    name: 'SQL',
    description: 'The standard language for relational databases — querying, aggregating, joining, and managing data. Critical for data engineers, backend developers, and data scientists.',
    icon: 'Database',
    color: 'cyan',
    fileName: 'SQL',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 20,
      mid: 35,
      senior: 50
    },
    relatedRoles: ['data-engineer', 'data-scientist', 'backend-developer', 'ml-engineer']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'JavaScript with a powerful type system — catches bugs at compile time, enables better tooling, and scales to large codebases. The industry standard for modern web development.',
    icon: 'FileType',
    color: 'indigo',
    fileName: 'TypeScript',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 25,
      mid: 40,
      senior: 55
    },
    relatedRoles: ['frontend-developer', 'backend-developer', 'tech-lead-architect']
  }
]

export const getLanguageById = (id) => languages.find(l => l.id === id)

const iconMap = {
  FileCode2, Braces, Globe, Database, FileType
}

export const getLanguageIcon = (iconName) => iconMap[iconName] || FileCode2
