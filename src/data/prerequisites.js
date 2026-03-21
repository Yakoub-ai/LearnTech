export const prerequisites = {
  'prerequisites': `# Prerequisites Overview

Before starting any learning path, make sure your computer and mindset are ready. This section covers everything you need to get started, regardless of your technical background.

**What you'll need:**
- A computer (Windows, macOS, or Linux all work fine)
- Internet connection
- A modern browser (Chrome or Firefox recommended)
- Willingness to learn — no prior tech experience required!

**What this section covers:**
Navigate to the other tabs in this Prerequisites section to set up your development environment step by step. We recommend starting with VS Code, then Git, before diving into any learning path.`,

  'vs-code-setup': `# VS Code Setup

VS Code (Visual Studio Code) is a free, powerful code editor used by millions of developers worldwide. Think of it as a super-powered word processor — but for writing code.

## Installation

**Windows:**
1. Go to https://code.visualstudio.com/
2. Click "Download for Windows"
3. Run the installer (accept all defaults)
4. Verify: open a terminal, type \`code --version\`

**macOS:**
1. Go to https://code.visualstudio.com/
2. Download the macOS version
3. Drag VS Code to your Applications folder
4. Open VS Code, then press Cmd+Shift+P, type "shell command", select "Install 'code' command in PATH"
5. Verify: \`code --version\`

**Linux (Ubuntu/Debian):**
\`\`\`bash
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
sudo apt update && sudo apt install code
\`\`\`

## Essential Extensions

Install these via the Extensions panel (Ctrl+Shift+X):
- **ESLint** — catches JavaScript errors as you type
- **Prettier** — auto-formats your code
- **GitLens** — shows who wrote each line and when
- **Python** (by Microsoft) — if you're learning Python
- **REST Client** — test APIs directly from VS Code

## Top 10 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Ctrl+P | Open any file quickly |
| Ctrl+Shift+P | Command palette |
| Ctrl+\` | Open terminal |
| Ctrl+/ | Toggle comment |
| Ctrl+D | Select next occurrence |
| Alt+Up/Down | Move line up/down |
| Ctrl+B | Toggle sidebar |
| Ctrl+Shift+E | File explorer |
| Ctrl+Z | Undo |
| Ctrl+Shift+Z | Redo |`,

  'git': `# Git Setup

Git is a version control system — think of it as a time machine for your code. It tracks every change you make, so you can go back to any previous state, work in teams without overwriting each other's work, and keep a complete history of your project.

## Installation

**Windows:**
1. Download from https://git-scm.com/download/win
2. Run the installer — accept defaults (keep "Git from the command line" option selected)
3. Verify: open Command Prompt or Git Bash and run \`git --version\`

**macOS:**
\`\`\`bash
brew install git    # Requires Homebrew (https://brew.sh/)
git --version       # Should print git version 2.x.x
\`\`\`

**Linux:**
\`\`\`bash
sudo apt install git    # Ubuntu/Debian
sudo dnf install git    # Fedora
git --version
\`\`\`

## First-Time Configuration

Tell Git who you are (run these in your terminal):
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global core.editor "code --wait"   # Use VS Code as editor
\`\`\`

## Core Concepts

- **Repository (repo):** A folder tracked by Git — like a project folder with memory
- **Commit:** A saved snapshot of your work — like hitting "Save" but with a message
- **Branch:** A parallel version of your project — experiment without breaking the main code
- **Remote:** A copy of your repo on a server (e.g., GitHub)

## Essential Commands

\`\`\`bash
git init                    # Start tracking a new folder
git clone <url>             # Download a repo from the internet
git status                  # See what has changed
git add filename.js         # Stage a file for commit
git add .                   # Stage all changed files
git commit -m "Your message"  # Save a snapshot
git push origin main        # Upload your commits to GitHub
git pull origin main        # Download latest changes from GitHub
git log --oneline           # See commit history
\`\`\`

## GitHub Setup

1. Create a free account at https://github.com/
2. Generate an SSH key:
   \`\`\`bash
   ssh-keygen -t ed25519 -C "you@example.com"
   cat ~/.ssh/id_ed25519.pub   # Copy this output
   \`\`\`
3. Go to GitHub → Settings → SSH Keys → New SSH Key → paste your key

**Verify it works:**
\`\`\`bash
git clone git@github.com:octocat/Hello-World.git
cd Hello-World
ls   # Should see README file
\`\`\``,

  'git-collaboration-workflow': `# Git Collaboration Workflow

When working on a team (or on open source projects), you need a structured workflow so everyone's changes fit together cleanly.

## Fork vs Clone

- **Clone:** Copy a repo you have write access to. Use for your own projects or team repos.
- **Fork:** Create your own copy of someone else's repo on GitHub. Use for contributing to open source.

## Feature Branch Workflow

This is the standard professional workflow:

\`\`\`bash
# 1. Always start from an up-to-date main
git checkout main
git pull origin main

# 2. Create a new branch for your feature
git checkout -b feature/add-login-page

# 3. Make changes, commit frequently
git add .
git commit -m "feat: add login form HTML structure"
git commit -m "feat: add login form validation"

# 4. Push your branch to GitHub
git push origin feature/add-login-page

# 5. Open a Pull Request on GitHub
# 6. After review and approval, merge to main
\`\`\`

## Conventional Commits

Use this format for commit messages — it makes history readable:
\`\`\`
feat: add user authentication
fix: correct login redirect bug
docs: update README with setup steps
refactor: extract validation logic to helper
test: add unit tests for auth service
chore: update dependencies
\`\`\`

## Resolving Merge Conflicts

When two people edit the same line, Git creates a conflict:
\`\`\`
<<<<<<< HEAD
your version of the line
=======
their version of the line
>>>>>>> feature/other-branch
\`\`\`

To resolve:
1. Open the conflicting file in VS Code
2. Choose which version to keep (or combine them)
3. Delete the conflict markers (\`<<<\`, \`===\`, \`>>>\`)
4. \`git add filename.js\`
5. \`git commit -m "resolve merge conflict in filename.js"\`

## Useful Advanced Commands

\`\`\`bash
git stash                   # Temporarily save uncommitted changes
git stash pop               # Restore stashed changes
git rebase -i HEAD~3        # Squash/edit the last 3 commits
git diff main...feature     # See what changed on a feature branch
\`\`\``,

  'branching-strategy': `# Branching Strategy

A branching strategy defines rules for how your team uses Git branches — what they're for, how they're named, and how they're merged.

## Git Flow vs Trunk-Based Development

### Git Flow (structured, good for versioned releases)
\`\`\`
main         ──────────────────────────────────→ production
develop      ────────────────────────────────→ integration
feature/*    ─────→ merge into develop
release/*    ─────→ final QA, then merge to main + develop
hotfix/*     ─────→ emergency fix for production
\`\`\`

### Trunk-Based Development (fast, good for continuous deployment)
\`\`\`
main         ────────────────────────────────→ always deployable
feature/*    ─→ short-lived (< 2 days), merge directly to main
\`\`\`

Most modern teams use **trunk-based development** with feature flags to hide incomplete features.

## Branch Naming Conventions

| Type | Format | Example |
|---|---|---|
| Feature | \`feature/short-description\` | \`feature/user-authentication\` |
| Bug fix | \`fix/what-is-fixed\` | \`fix/login-redirect\` |
| Hotfix | \`hotfix/critical-issue\` | \`hotfix/payment-crash\` |
| Release | \`release/version\` | \`release/1.2.0\` |

## Protecting the Main Branch

On GitHub:
1. Go to repo → Settings → Branches
2. Add branch protection rule for \`main\`
3. Enable: "Require a pull request before merging"
4. Enable: "Require approvals" (at least 1)
5. Enable: "Require status checks to pass" (CI/tests must pass)

This prevents direct pushes to main and ensures code review for every change.`,

  'code-review': `# Code Review Best Practices

Code review is how teams maintain quality, share knowledge, and catch bugs before they reach production. Think of it as a second pair of eyes on your work — not a test to pass, but a collaboration tool.

## What to Look For as a Reviewer

1. **Correctness:** Does the code do what it claims? Are there edge cases missed?
2. **Readability:** Can you understand what this code does in 30 seconds?
3. **Security:** Are there inputs being directly used in queries or commands without sanitization?
4. **Tests:** Are new features covered by tests?
5. **Scope:** Does this PR do exactly what it says, or does it sneak in unrelated changes?

## Writing a Good PR Description

Use this template:
\`\`\`markdown
## What
Short description of what changed.

## Why
Why was this change needed? Link to the issue/ticket.

## How to Test
1. Go to /login
2. Enter invalid credentials
3. Verify error message appears

## Screenshots (if UI changed)
[before/after screenshots]
\`\`\`

## Giving Feedback

- Be specific: "This function could be extracted to reduce duplication" not "this code is messy"
- Be kind: Use questions: "Could this handle null here?" instead of "You forgot null check"
- Use prefixes: **nit:** (minor style), **suggestion:** (take or leave), **blocker:** (must fix)

## Receiving Feedback

- Don't take it personally — they're reviewing the code, not you
- If you disagree, explain your reasoning
- "Thanks, fixed!" is a great response to a valid nit

## GitHub PR Walkthrough

1. Push your branch to GitHub
2. Go to the repo → Pull Requests → New Pull Request
3. Select your branch vs main
4. Fill out the description template
5. Assign reviewers
6. Address all comments before merging`,

  'secure-ai-framework': `# Secure AI Development Framework

AI tools like GitHub Copilot, Claude, and ChatGPT are powerful coding assistants — but they require careful use to keep your code and data safe.

## What NOT to Put in AI Prompts

**Never share:**
- API keys, passwords, or tokens
- Database connection strings
- Personal data (names, emails, SSNs, etc.)
- Internal business logic with sensitive customer data
- Security vulnerabilities in your production systems

**Why:** AI providers may use your prompts to improve their models. Even with enterprise contracts, treat prompts as semi-public.

## Verifying AI-Generated Code

AI can generate code that looks correct but has subtle bugs or security issues. Always:
1. Read AI-generated code line by line — don't copy-paste blindly
2. Check for common vulnerabilities: SQL injection, unsanitized inputs, hardcoded secrets
3. Run tests — AI code often misses edge cases
4. Ask the AI to explain its logic: "What happens if input is null here?"

## Free Tools for AI Coding

| Tool | Free Tier | Best For |
|---|---|---|
| GitHub Copilot | 2,000 completions/month | In-editor autocomplete |
| Claude (claude.ai) | Generous free tier | Code review, architecture questions |
| ChatGPT | Free tier | Explanations, debugging help |

## Effective Prompting for Code

Structure your prompts clearly:
\`\`\`
I'm building a [what].
I need to [goal].
My stack is [language/framework].
Here's my current code: [paste relevant snippet only, no secrets]
What's the best approach for [specific question]?
\`\`\`

The more specific you are, the better the output. Always test suggestions in a development environment before applying to production.`,

  'eu-compliance-guide': `# EU Compliance Guide for Developers

If your application handles data from EU residents, GDPR (General Data Protection Regulation) applies to you — regardless of where your company is located.

## GDPR Basics for Developers

**Personal data** is any information that can identify a person: name, email, IP address, location, cookies with user IDs, etc.

**Your obligations as a developer:**
1. **Purpose limitation:** Only collect data you actually need
2. **Storage limitation:** Don't keep data longer than necessary
3. **User rights:** Users can request access to, correction of, or deletion of their data
4. **Consent:** Get explicit consent before setting non-essential cookies

## Practical Implementation

### Cookie Consent
\`\`\`js
// Only set analytics cookies AFTER user consents
if (userConsented()) {
  initGoogleAnalytics()
}
\`\`\`

### Data Retention
Define retention periods and implement automatic deletion:
\`\`\`sql
-- Example: delete inactive accounts older than 2 years
DELETE FROM users WHERE last_login < NOW() - INTERVAL '2 years';
\`\`\`

### Privacy by Default
- Use strong encryption for sensitive data at rest and in transit (HTTPS everywhere)
- Log the minimum necessary information
- Pseudonymise data where possible (replace real names with IDs in logs)

## Resources

- **Official GDPR text with developer guidance:** https://gdpr.eu/developers/
- **GDPR checklist for developers:** https://gdpr.eu/checklist/
- **ICO Developer Guidance (UK):** https://ico.org.uk/for-organisations/

## Data Breach Response

If you discover a breach:
1. Assess the scope within the first hour
2. Notify your Data Protection Officer (DPO) immediately
3. If high risk to individuals, notify the supervisory authority within 72 hours
4. Document everything`,

  'secure-dev-environment': `# Secure Development Environment

A secure dev environment protects your accounts, your code, and your users — before your code even reaches production.

## Password Management

Install **Bitwarden** (free, open source):
1. Go to https://bitwarden.com/
2. Create an account and install the browser extension
3. Let it generate strong unique passwords for every service
4. Enable 2FA on your Bitwarden account itself

## Two-Factor Authentication (2FA)

Enable 2FA everywhere, especially:
- GitHub: Settings → Security → Two-factor authentication → use an authenticator app (not SMS)
- Any cloud providers (AWS, GCP, Azure)
- Your email account

Use **Aegis** (Android) or **Raivo** (iOS) as your authenticator app — both are open source.

## SSH Key Best Practices

\`\`\`bash
# Generate a strong key (ed25519 is modern and secure)
ssh-keygen -t ed25519 -C "your@email.com"

# Set a passphrase when prompted!
# Add to ssh-agent so you don't type it every time
ssh-add ~/.ssh/id_ed25519

# Never share your private key (~/.ssh/id_ed25519)
# The public key (~/.ssh/id_ed25519.pub) is safe to share
\`\`\`

## Protecting Secrets in Code

**Step 1:** Always use environment variables for secrets:
\`\`\`js
// ❌ Never do this
const apiKey = "sk-1234abcd..."

// ✅ Always do this
const apiKey = process.env.API_KEY
\`\`\`

**Step 2:** Create a \`.gitignore\` that excludes secrets:
\`\`\`
.env
.env.local
*.pem
*.key
secrets/
\`\`\`

**Step 3:** Prevent committing secrets accidentally:

Install **gitleaks** (free, open source secret scanner):
\`\`\`bash
# Windows (via chocolatey)
choco install gitleaks

# macOS
brew install gitleaks

# Linux
sudo apt install gitleaks  # or download from GitHub releases

# Scan your repo
gitleaks detect --source .
\`\`\`

**If you accidentally commit a secret:**
1. Immediately revoke/rotate the secret with the service
2. Remove it from git history: \`git filter-branch\` or BFG Repo Cleaner
3. The commit history is public even after deletion from the main branch`,
}
