# LearnTech

Interactive learning platform for tech roles and programming languages.

## Features

- 11 role roadmaps (AI Engineer, Backend Developer, Data Engineer, DevOps, Frontend Developer, Full-Stack Developer, ML Engineer, Mobile Developer, QA Engineer, Security Engineer, Solution Architect)
- 5 language paths (HTML/CSS, JavaScript, Python, SQL, and more)
- Quizzes with instant feedback
- Interactive labs and hands-on exercises
- Code sandboxes powered by Monaco Editor
- Skill diagrams and visual roadmaps

## Setup

```bash
# Clone the repository
git clone https://github.com/Yakoub-ai/LearnTech.git
cd LearnTech

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your Supabase credentials

# Start development server
npm run dev
```

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool and dev server
- **Tailwind CSS v4** — Utility-first styling
- **Supabase** — Backend-as-a-service (auth, database)
- **Vercel** — Deployment platform

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## License

MIT License — Copyright (c) 2026 Yakoub-ai. See [LICENSE](LICENSE) for details.
