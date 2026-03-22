export const roles = [
  {
    id: 'ai-engineer',
    name: 'AI Engineer',
    description: 'AI Engineers build applications powered by large language models and generative AI. The role covers prompt engineering, RAG systems, agent frameworks, LLM evaluation, security, and enterprise AI governance.',
    icon: 'Brain',
    color: 'indigo',
    fileName: 'AI-Engineer',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 40,
      mid: 60,
      senior: 80
    }
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    description: 'Backend developers build the server-side logic, APIs, and data layers that power applications. The role covers programming, databases, API design, security, performance, and system reliability.',
    icon: 'Server',
    color: 'emerald',
    fileName: 'Backend-Developer',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 50,
      mid: 70,
      senior: 100
    }
  },
  {
    id: 'data-engineer',
    name: 'Data Engineer',
    description: 'Data Engineers design, build, and maintain the infrastructure and pipelines that move, transform, and store data at scale. The role covers data modelling, ETL/ELT pipelines, data warehousing, streaming, orchestration, data quality, and platform tooling.',
    icon: 'Database',
    color: 'cyan',
    fileName: 'Data-Engineer',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 45,
      mid: 65,
      senior: 90
    }
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Data Scientists analyse data to generate insights and build predictive models. The role covers statistics, data manipulation, machine learning, visualisation, and communicating findings to business stakeholders.',
    icon: 'BarChart3',
    color: 'purple',
    fileName: 'Data-Scientist',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 40,
      mid: 60,
      senior: 80
    }
  },
  {
    id: 'devops-platform-engineer',
    name: 'DevOps / Platform Engineer',
    description: 'DevOps and Platform Engineers build and maintain the infrastructure, pipelines, and tooling that enable teams to ship software reliably. The role covers CI/CD, cloud infrastructure, containerisation, scripting, observability, and platform security.',
    icon: 'Container',
    color: 'orange',
    fileName: 'DevOps-Platform-Engineer',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 45,
      mid: 70,
      senior: 95
    }
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    description: 'Frontend developers build the user interfaces and client-side experiences that end users interact with directly. The role covers HTML, CSS, JavaScript, component frameworks, accessibility, performance, and browser compatibility.',
    icon: 'Layout',
    color: 'blue',
    fileName: 'Frontend-Developer',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 50,
      mid: 70,
      senior: 90
    }
  },
  {
    id: 'marketing-technology-developer',
    name: 'Marketing Technology Developer',
    description: 'Marketing Technology Developers apply software engineering and data science to marketing platforms and campaigns. The role covers data pipelines, analytics, APIs, experimentation, and AI-powered marketing tools.',
    icon: 'Megaphone',
    color: 'pink',
    fileName: 'Marketing-Technology-Developer',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 40,
      mid: 55,
      senior: 75
    }
  },
  {
    id: 'ml-engineer',
    name: 'ML Engineer',
    description: 'ML Engineers build, train, evaluate, and deploy machine learning models. The role covers data preparation, feature engineering, model selection, training, evaluation, MLOps, and production monitoring.',
    icon: 'Cpu',
    color: 'violet',
    fileName: 'ML-Engineer',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 45,
      mid: 65,
      senior: 85
    }
  },
  {
    id: 'qa-test-engineer',
    name: 'QA / Test Engineer',
    description: 'QA and Test Engineers ensure software quality through systematic testing strategies, automation, and quality processes. The role covers test planning, manual and automated testing, performance testing, API testing, CI/CD integration, test architecture, and quality metrics.',
    icon: 'TestTube2',
    color: 'lime',
    fileName: 'QA-Test-Engineer',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 40,
      mid: 60,
      senior: 80
    }
  },
  {
    id: 'security-engineer',
    name: 'Security Engineer',
    description: 'Security Engineers protect systems, applications, and data by identifying vulnerabilities, implementing defences, and building security into the development lifecycle. The role covers application security, threat modelling, secure coding, penetration testing, cloud security, identity management, incident response, and security operations.',
    icon: 'Shield',
    color: 'red',
    fileName: 'Security-Engineer',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 45,
      mid: 70,
      senior: 100
    }
  },
  {
    id: 'tech-lead-architect',
    name: 'Tech Lead / Architect',
    description: 'Tech Leads and Architects guide technical direction, system design, and engineering quality across a team or programme. This path is intended for experienced developers with three or more years of hands-on experience who are growing into a technical leadership or architecture role.',
    icon: 'PenSquare',
    color: 'amber',
    fileName: 'Tech-Lead-Architect',
    levels: ['Beginner', 'Mid', 'Senior'],
    estimatedHours: {
      beginner: 50,
      mid: 75,
      senior: 100
    }
  }
];

export const getRoleById = (id) => roles.find(r => r.id === id);

import {
  Brain, Server, Database, BarChart3, Container, Layout,
  Megaphone, Cpu, TestTube2, Shield, PenSquare
} from 'lucide-react'

const iconMap = {
  Brain, Server, Database, BarChart3, Container, Layout,
  Megaphone, Cpu, TestTube2, Shield, PenSquare,
}

export const getRoleIcon = (iconName) => iconMap[iconName] || Brain;
