# LearnTech

[![CI](https://github.com/Yakoub-ai/LearnTech/actions/workflows/ci.yml/badge.svg)](https://github.com/Yakoub-ai/LearnTech/actions/workflows/ci.yml)

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

## Deployment

### Vercel

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. In the Vercel project dashboard, go to **Settings → Environment Variables** and add:
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your Supabase anon/public key
3. Deploy — Vercel will automatically build and deploy on every push to `main`

The `vercel.json` in this repo configures SPA rewrites (all routes → `index.html`) and security headers including CSP, HSTS, X-Frame-Options, and immutable asset caching.

### Required Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL (e.g. `https://xyz.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public API key |
| `VITE_APP_URL` | Deployed app URL (e.g. `https://your-app.vercel.app`) |

Copy `.env.example` to `.env` for local development.

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
