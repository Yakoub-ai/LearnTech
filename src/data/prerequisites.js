export const prerequisites = {
  'prerequisites': `# Prerequisites Overview

Before you start any learning path on this platform, take a few minutes to get your computer and your mindset into the right shape. This guide is written for complete beginners — if you have never opened a terminal or installed a developer tool before, you are in exactly the right place.

## Computer Requirements

You do not need a powerful machine to learn software development. Any computer purchased in the last five to seven years will work fine. Here is what matters:

- **Operating system:** Windows 10 or 11, macOS 11 (Big Sur) or later, or any modern Linux distribution (Ubuntu 22.04 LTS is recommended for beginners on Linux)
- **RAM:** 8 GB is comfortable; 4 GB will work for most exercises but you may notice slowness when running a browser, a code editor, and a terminal at the same time
- **Disk space:** At least 10 GB free. Developer tools, project dependencies, and course files add up quickly
- **Internet connection:** A stable broadband connection is needed to download tools, access documentation, and push code to GitHub

## Choosing Your Operating System

All three major operating systems work well for development. Here is a brief comparison to help you decide whether to switch or stay:

**Windows** is fine for everything on this platform. Windows 11 ships with WSL 2 (Windows Subsystem for Linux), which lets you run a real Linux terminal inside Windows. You will be asked to enable this in the VS Code setup guide.

**macOS** is the most popular OS among professional developers because it is Unix-based, which means terminal commands match what you will find in documentation and tutorials almost everywhere. If you already own a Mac, stick with it.

**Linux** gives you the deepest understanding of how developer tools work under the hood. Ubuntu is the most beginner-friendly distribution and has excellent community support.

## Browser Setup

Install **Google Chrome** or **Mozilla Firefox** — both have excellent developer tools built in. When you are learning web development, you will use the browser's built-in Developer Tools constantly to inspect HTML, debug JavaScript, and watch network requests.

To open Developer Tools:
- **Chrome/Firefox on Windows or Linux:** Press F12, or right-click anywhere on a web page and select "Inspect"
- **Chrome/Firefox on macOS:** Press Cmd+Option+I

Install one of these browser extensions to make development easier:
- **JSON Formatter** — makes raw JSON responses from APIs readable
- **React Developer Tools** — essential if you learn React
- **axe DevTools** — free accessibility checker

## What You Will Need to Create

Before you start, create free accounts at:
1. **GitHub** (https://github.com) — you will store all your code here
2. **Vercel** (https://vercel.com) — free hosting for your projects so you can share them
3. **Supabase** (https://supabase.com) — free database and authentication backend

These are all free with no credit card required. Keep your login credentials safe — use a password manager (Bitwarden is covered in the Secure Dev Environment section).

## Mindset for Learning

Learning to code is a skill that takes time. Here is what will help you succeed:

**Embrace the error message.** Every error message is the computer telling you exactly what went wrong. Read them carefully. Paste them into a search engine. You will find that most errors have been solved by thousands of developers before you.

**Build things.** Reading and watching tutorials alone will not make you a developer. Type the code yourself — even when you could copy-paste. The muscle memory of writing code matters.

**Stuck for more than 20 minutes? Ask for help.** The developer community values people who ask good questions. A good question includes: what you are trying to do, what you have tried, and the exact error message you are seeing.

**Set a consistent schedule.** Thirty minutes every day beats three hours once a week. Consistency compounds.

## Recommended Order

Work through the Prerequisites tabs in this order before starting any learning path:

1. VS Code Setup — your code editor
2. Git — version control fundamentals
3. Git Collaboration Workflow — working with branches and pull requests
4. Branching Strategy — understanding how teams use Git
5. Code Review — how to give and receive feedback
6. Secure AI Framework — using AI tools safely
7. EU Compliance Guide — GDPR basics
8. Secure Dev Environment — protecting your accounts and secrets

Each section takes roughly 30–60 minutes to complete. Do not rush — these foundations will make everything else easier.`,

  'vs-code-setup': `# VS Code Setup

Visual Studio Code (VS Code) is a free, open-source code editor built by Microsoft. It is the most widely used code editor in the world for good reason: it is fast, extensible, and works identically on Windows, macOS, and Linux. Think of it as a super-powered word processor — but for writing code. It understands the programming languages you type, highlights mistakes as you write, and integrates directly with Git and your terminal.

## Installation

### Windows

1. Open your browser and go to https://code.visualstudio.com/
2. Click **Download for Windows** — this downloads a \`.exe\` installer
3. Run the downloaded installer. When you reach the "Select Additional Tasks" screen, check all of the following options:
   - Add "Open with Code" action to Windows Explorer file context menu
   - Add "Open with Code" action to Windows Explorer directory context menu
   - Register Code as an editor for supported file types
   - **Add to PATH** (important — this lets you open VS Code from the terminal)
4. Complete the installation and launch VS Code
5. Open a new terminal (press Win+R, type \`cmd\`, press Enter) and verify:

\`\`\`bash
code --version
\`\`\`

You should see output like \`1.90.0\` followed by a commit hash. If Windows says the command is not recognised, restart your computer and try again.

### macOS

1. Go to https://code.visualstudio.com/ and click **Download Mac Universal**
2. Open the downloaded \`.zip\` file — this extracts a \`Visual Studio Code.app\` file
3. Drag \`Visual Studio Code.app\` into your **Applications** folder
4. Open VS Code from Applications
5. Add the \`code\` command to your terminal PATH:
   - Press **Cmd+Shift+P** to open the Command Palette
   - Type: \`shell command\`
   - Select **Shell Command: Install 'code' command in PATH**
6. Open a new Terminal window and verify:

\`\`\`bash
code --version
\`\`\`

### Linux (Ubuntu / Debian)

The cleanest way to install VS Code on Ubuntu is through the official Microsoft repository, which also keeps VS Code updated automatically:

\`\`\`bash
# Download and install the Microsoft GPG key
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/

# Add the VS Code repository to your package sources
echo "deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" | sudo tee /etc/apt/sources.list.d/vscode.list

# Install VS Code
sudo apt update
sudo apt install code

# Verify
code --version
\`\`\`

## Opening a Project Folder

VS Code is folder-based rather than file-based. Instead of opening individual files, open an entire project folder:
- **File → Open Folder** (or **Cmd+K Cmd+O** on macOS, **Ctrl+K Ctrl+O** on Windows/Linux)
- Select your project folder
- All files in the folder appear in the left sidebar

You can also open a folder from the terminal: \`code /path/to/your/project\`

## Settings Sync

If you use multiple computers, VS Code's built-in Settings Sync keeps your settings, extensions, and keybindings identical on all of them:

1. Press **Ctrl+Shift+P** (or **Cmd+Shift+P** on macOS)
2. Type: **Settings Sync: Turn On**
3. Sign in with your GitHub account
4. Choose which settings to sync (select all for simplicity)

From now on, any changes you make to settings or extensions will sync automatically to all your devices.

## Essential Extensions

Open the Extensions panel with **Ctrl+Shift+X** (or **Cmd+Shift+X** on macOS). Search for each extension by name and click Install:

**ESLint** — automatically detects JavaScript and TypeScript errors as you type, before you even run your code. After installing, you may need to create an \`.eslintrc.json\` file in your project — the extension will prompt you.

**Prettier - Code Formatter** — automatically formats your code whenever you save a file. To enable format-on-save:
1. Open Settings: **Ctrl+,** (or **Cmd+,**)
2. Search for "format on save"
3. Check the box

**GitLens** — supercharges VS Code's built-in Git support. It shows you who wrote each line of code and when, lets you browse commit history visually, and makes it easy to compare branches. Invaluable on team projects.

**Python** (by Microsoft) — if you are going through the Python learning path, this extension adds IntelliSense (smart autocomplete), debugging, linting, and Jupyter notebook support. After installing, select your Python interpreter with **Ctrl+Shift+P** → "Python: Select Interpreter".

**REST Client** — lets you write and execute HTTP requests directly inside VS Code without switching to Postman or another app. Create a file ending in \`.http\`, write your request, and click "Send Request" that appears above it.

## Configuring the Integrated Terminal

VS Code has a built-in terminal so you rarely need to switch windows:
- Open it with **Ctrl+\`** (backtick, below the Esc key)
- On Windows, set the default terminal to Git Bash: **Ctrl+Shift+P** → "Terminal: Select Default Profile" → Git Bash
- On macOS and Linux, the default (bash or zsh) is fine

## Top 10 Keyboard Shortcuts

Learning these shortcuts will make you dramatically faster. Practice them deliberately for your first week until they become automatic:

| Shortcut (Win/Linux) | Shortcut (macOS) | Action |
|---|---|---|
| Ctrl+P | Cmd+P | Open any file by name (fuzzy search) |
| Ctrl+Shift+P | Cmd+Shift+P | Command palette — run any VS Code command |
| Ctrl+\` | Cmd+\` | Toggle the integrated terminal |
| Ctrl+/ | Cmd+/ | Toggle line comment |
| Ctrl+D | Cmd+D | Select next occurrence of current word |
| Alt+Up / Alt+Down | Option+Up / Option+Down | Move current line up or down |
| Ctrl+B | Cmd+B | Toggle the sidebar |
| Ctrl+Shift+E | Cmd+Shift+E | Focus the file explorer sidebar |
| Ctrl+Z | Cmd+Z | Undo |
| Ctrl+Shift+Z | Cmd+Shift+Z | Redo |

One more that is especially useful: **Ctrl+Shift+\`** opens a brand new terminal panel without closing your current one.`,

  'git': `# Git Setup

Git is a version control system — think of it as a time machine for your code. Every time you save a snapshot (called a commit), Git records exactly what changed and who changed it. This means you can rewind to any previous state of your project, see the full history of every change ever made, work on multiple features in parallel without them interfering with each other, and collaborate with a team where everyone works on the same codebase simultaneously without overwriting each other's work.

Without Git, most development teams would be exchanging zip files and hoping nobody overwrote something important. With Git — and with GitHub as a cloud home for your repositories — your code is safe, trackable, and shareable.

## Installation

### Windows

1. Open your browser and go to https://git-scm.com/download/win
2. The download should start automatically. If not, click the link for the 64-bit installer
3. Run the installer. The defaults are fine for most options, but pay attention to these two screens:
   - **"Choosing the default editor"** — change this to "Use Visual Studio Code as Git's default editor"
   - **"Adjusting your PATH environment"** — keep "Git from the command line and also from 3rd-party software" selected
4. Complete the installation
5. Open **Git Bash** (search for it in the Start menu) and verify:

\`\`\`bash
git --version
\`\`\`

You should see output like \`git version 2.44.0\`. Always use Git Bash on Windows for the commands in this guide, not the default Command Prompt or PowerShell.

### macOS

macOS ships with a very old version of Git. Install a modern version via Homebrew:

\`\`\`bash
# First, install Homebrew if you do not have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install Git
brew install git

# Verify — should show version 2.40 or higher
git --version
\`\`\`

### Linux (Ubuntu / Debian)

\`\`\`bash
sudo apt update
sudo apt install git

# Fedora / RHEL
sudo dnf install git

# Verify
git --version
\`\`\`

## First-Time Configuration

Before you make your first commit, tell Git your name and email address. This information is attached to every commit you make — it is how teams know who changed what.

Open your terminal and run these commands, replacing the name and email with your own:

\`\`\`bash
git config --global user.name "Your Full Name"
git config --global user.email "you@example.com"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main
\`\`\`

The third line tells Git to open VS Code when you need to write a commit message interactively. The fourth line sets the default branch name to \`main\` (the modern standard — older tutorials may still say \`master\`).

Verify your configuration:
\`\`\`bash
git config --global --list
\`\`\`

## Core Concepts

Understanding these four terms will make every Git command make sense:

**Repository (repo):** A folder tracked by Git. It looks like a normal folder on your computer, but hidden inside is a \`.git\` directory that stores the complete history of your project. When you "init" a repo or "clone" one, you create this tracking structure.

**Commit:** A saved snapshot of your project at a specific moment in time. Each commit has a unique ID (a hash like \`a3f9c12\`), your name, the timestamp, and a message describing what changed. Think of commits as checkpoint saves in a video game.

**Branch:** A parallel timeline for your project. The default branch is called \`main\`. When you work on a new feature, you create a new branch — your experiments live there and cannot affect \`main\` until you deliberately merge them. This is how teams work on ten features simultaneously without chaos.

**Remote:** A copy of your repository stored on a server somewhere — usually GitHub. The default remote is named \`origin\`. When you "push", you send your local commits up to the remote. When you "pull", you download new commits from the remote.

## Essential Commands

These are the commands you will use every single day:

\`\`\`bash
# Start tracking a new folder as a Git repo
git init

# Download an existing repo from the internet
git clone https://github.com/username/repo-name.git

# See what has changed since your last commit
git status

# Stage a specific file — adds it to the next commit
git add filename.js

# Stage all changed files in the current directory
git add .

# Save a snapshot with a descriptive message
git commit -m "feat: add login form with validation"

# Upload your commits to GitHub
git push origin main

# Download the latest commits from GitHub
git pull origin main

# See a compact history of all commits
git log --oneline

# See which branch you are on and list all local branches
git branch

# Create and switch to a new branch in one command
git checkout -b feature/my-new-feature

# Switch to an existing branch
git checkout main
\`\`\`

## Creating a GitHub Account

1. Go to https://github.com/ and click **Sign up**
2. Choose a username you would be happy putting on a CV — this will be visible to potential employers
3. Verify your email address
4. On your profile, add your real name and a short bio so collaborators know who you are

## Setting Up SSH Authentication

SSH keys let you push and pull from GitHub without typing your password every time. The key pair works like a lock and key: you keep the private key on your computer, and give GitHub the public key.

\`\`\`bash
# Generate a new SSH key pair (replace with your GitHub email)
ssh-keygen -t ed25519 -C "you@example.com"

# When prompted:
# - "Enter file in which to save the key": press Enter (accepts the default location)
# - "Enter passphrase": type a passphrase you will remember (this protects the key if your laptop is stolen)

# Display your public key — copy the entire output
cat ~/.ssh/id_ed25519.pub
\`\`\`

Now add the key to GitHub:
1. Go to GitHub → click your profile picture → **Settings**
2. In the left sidebar, click **SSH and GPG keys**
3. Click **New SSH key**
4. Give it a title (e.g., "My Laptop")
5. Paste the public key you copied
6. Click **Add SSH key**

Test that the connection works:
\`\`\`bash
ssh -T git@github.com
\`\`\`

You should see: \`Hi username! You've successfully authenticated...\`

## Verification: Clone a Public Repo

Confirm everything is working by cloning a real repository:

\`\`\`bash
git clone git@github.com:octocat/Hello-World.git
cd Hello-World
git log --oneline
\`\`\`

You should see the commit history of the Hello-World repository printed in your terminal. If you got here, Git and GitHub are fully configured.`,

  'git-collaboration-workflow': `# Git Collaboration Workflow

When you work alone, Git is already useful. When you work on a team — or contribute to open source — a structured workflow becomes essential. Without agreed rules for how branches are created, how commits are named, and how changes are reviewed, even small teams create chaos. This guide walks you through the workflow used by most professional software teams.

## Fork vs Clone: Which to Use

Both commands download a repository to your computer, but they are used in different situations:

**Clone** is for repositories you have write access to — your own repos, or repos owned by a team where you are a member. You clone it, make changes, push directly.

\`\`\`bash
git clone git@github.com:your-org/project-name.git
\`\`\`

**Fork** is for contributing to someone else's repository where you do not have write access — most open source projects work this way. Forking creates your own copy of the repo under your GitHub account. You clone your fork, make changes, push to your fork, then open a Pull Request asking the original repo to accept your changes.

To fork: click the **Fork** button in the top-right corner of any GitHub repository page. Then clone your fork:

\`\`\`bash
git clone git@github.com:YOUR-USERNAME/project-name.git

# Add the original repo as "upstream" so you can pull in future updates
git remote add upstream git@github.com:original-owner/project-name.git
\`\`\`

## The Feature Branch Workflow

This is the standard workflow at most software companies. The rule is simple: **never commit directly to main**. Every change, no matter how small, lives on its own branch until it is reviewed and approved.

Here is the exact sequence of commands for every piece of work you do:

\`\`\`bash
# Step 1: Make sure your local main is up to date
git checkout main
git pull origin main

# Step 2: Create a new branch for your feature (give it a meaningful name)
git checkout -b feature/add-login-page

# Step 3: Do your work — make changes, save files in VS Code

# Step 4: Check what changed
git status
git diff

# Step 5: Stage the files you want to include in this commit
git add src/pages/Login.jsx
git add src/styles/login.css
# Or stage everything: git add .

# Step 6: Commit with a clear message (see Conventional Commits below)
git commit -m "feat: add login page with email and password fields"

# Step 7: Continue working and committing as often as makes sense
# Small commits are better — easier to understand and easier to revert

# Step 8: Push your branch to GitHub
git push origin feature/add-login-page

# Step 9: Open a Pull Request on GitHub
# Go to your repo on github.com — GitHub will show a banner prompting you to open a PR

# Step 10: Address reviewer feedback by committing more changes to the same branch
# The PR updates automatically

# Step 11: After approval, merge via the GitHub interface
# After merging, delete your branch — it has done its job
\`\`\`

To keep your feature branch up to date while others are merging to main:

\`\`\`bash
git checkout main
git pull origin main
git checkout feature/add-login-page
git merge main
\`\`\`

## Conventional Commits

Conventional Commits is a standard format for commit messages. Consistent messages make the project history readable, enable automated changelogs, and communicate intent clearly to reviewers.

The format is:

\`\`\`
<type>: <short description in present tense>
\`\`\`

Common types and when to use them:

| Type | When to use it |
|---|---|
| \`feat\` | Adding a new feature or capability |
| \`fix\` | Fixing a bug |
| \`docs\` | Changes to documentation only |
| \`style\` | Formatting, whitespace — no logic change |
| \`refactor\` | Code restructuring that neither adds a feature nor fixes a bug |
| \`test\` | Adding or updating tests |
| \`chore\` | Build scripts, dependency updates, tooling |
| \`ci\` | Changes to CI/CD configuration |

Real examples:
\`\`\`
feat: add password strength indicator to registration form
fix: prevent login form submission when fields are empty
docs: add API authentication section to README
refactor: extract form validation into reusable hook
test: add unit tests for email validation utility
chore: upgrade React to v18.3
\`\`\`

For changes that affect multiple areas, you can add a scope in parentheses: \`feat(auth): add OAuth login with Google\`

## Resolving Merge Conflicts

A merge conflict happens when two people edit the same lines of the same file on different branches. Git cannot automatically decide which version is correct, so it flags the conflict and asks you to resolve it manually.

Conflicting files look like this:

\`\`\`
<<<<<<< HEAD
const timeout = 5000;
=======
const timeout = 3000;
>>>>>>> feature/performance-improvements
\`\`\`

The section between \`<<<<<<< HEAD\` and \`=======\` is your version (the branch you are merging into). The section between \`=======\` and \`>>>>>>>\` is the incoming version from the other branch.

To resolve it step by step:

\`\`\`bash
# Step 1: Pull the latest main and try to merge (this triggers the conflict)
git checkout feature/my-branch
git merge main

# Git will tell you which files have conflicts
# Step 2: Open each conflicting file in VS Code
code src/config.js

# Step 3: VS Code shows conflict markers with clickable options:
# "Accept Current Change", "Accept Incoming Change", "Accept Both Changes"
# Choose the option that makes sense, or manually edit to combine both

# Step 4: After resolving all conflicts, delete ALL conflict markers
# The file must be valid code — no <<<<, ====, or >>>> remaining

# Step 5: Stage the resolved file
git add src/config.js

# Step 6: Complete the merge
git commit -m "resolve merge conflict in config.js — use 3000ms timeout"
\`\`\`

The best way to avoid conflicts is to keep feature branches short-lived (merge within a day or two) and to communicate with teammates about who is working on which files.

## Git Stash

Stash is a temporary shelf for changes you are not ready to commit yet — useful when you need to switch branches to fix an urgent bug but your current work is half-finished:

\`\`\`bash
# Save all uncommitted changes to the stash
git stash

# Your working directory is now clean — switch branches, fix the bug, etc.
git checkout main

# Come back to your feature branch and restore your work
git checkout feature/my-feature
git stash pop
\`\`\`

You can have multiple stash entries. Use \`git stash list\` to see them all, and \`git stash pop stash@{1}\` to restore a specific one.

## Interactive Rebase Basics

Interactive rebase lets you rewrite your branch history before opening a Pull Request. The most common use is squashing several small "wip" commits into one clean commit:

\`\`\`bash
# Squash/edit the last 4 commits interactively
git rebase -i HEAD~4
\`\`\`

Git opens your editor with a list of the last 4 commits. Change \`pick\` to \`squash\` (or \`s\`) on the commits you want to merge into the one above them. Save and close — Git will combine them and let you write a new commit message.

Important: only rebase commits that have not been pushed to a shared remote branch. Rebasing shared history rewrites it and causes problems for everyone else.`,

  'branching-strategy': `# Branching Strategy

A branching strategy is a set of agreed rules for how everyone on a team uses Git branches: what kinds of branches exist, what they are named, how long they live, and how they are merged. Without a strategy, teams end up with dozens of stale branches, broken main branches, and merge nightmares. With one, the entire team moves faster and with more confidence.

This guide covers the two most widely used strategies and how to enforce them with GitHub's branch protection tools.

## Git Flow

Git Flow was introduced in 2010 and became the dominant branching model for teams shipping versioned releases (like desktop software or mobile apps with quarterly releases). It uses two permanent branches and three types of short-lived branches:

**Permanent branches:**
- \`main\` — always reflects the current production release. Nothing is committed here directly
- \`develop\` — the integration branch. All features are merged here first and tested together

**Short-lived branches:**
- \`feature/*\` — created from \`develop\`, merged back into \`develop\` when complete
- \`release/*\` — created from \`develop\` when preparing a release. Only bug fixes go in here, then it is merged into both \`main\` and \`develop\`
- \`hotfix/*\` — created from \`main\` to fix a critical production bug immediately. Merged back into both \`main\` and \`develop\`

\`\`\`
main       ──────────────────●─────────────────────●──→  (production tags: v1.0, v1.1)
                            up                    up
release/1.0 ─────────────────             hotfix/1.1.1 ─→
                   up
develop    ──●──●──●──●──●──●──●──●──●──────────────→
              up     up
feature/A ────    feature/B ──→
\`\`\`

Git Flow works well for:
- Products with scheduled release cycles
- Teams that must maintain multiple versions simultaneously
- Regulated industries where every release needs a formal sign-off

Git Flow is overkill for most web applications, where you can deploy as often as you like.

## Trunk-Based Development

Trunk-based development has become the dominant model at modern software companies (Google, Facebook, Netflix all use variants of it). The core rule is simple: **branches are short-lived** — ideally merged within a day, never longer than two days.

\`\`\`
main  ──●──●──●──●──●──●──●──●──●──●──●──→  (always deployable)
          up  up     up        up
          short-lived feature branches
\`\`\`

Because branches are so short-lived, merge conflicts are rare. Incomplete features are hidden behind **feature flags** (simple if-checks in code: \`if (featureFlags.newDashboard) { ... }\`) so that partially-built features can be merged to \`main\` without being visible to users.

Trunk-based development works well for:
- Web applications with continuous deployment
- Small to medium teams
- Any team that wants to ship frequently

**Which should you use?** Start with trunk-based development. It is simpler and teaches you to commit frequently and keep changes small — skills that make you a better developer. Move to Git Flow only if you have a specific reason (versioned releases, regulated industry).

## Branch Naming Conventions

Consistent branch names make it easy to understand what every branch is for at a glance. Use lowercase, hyphens (not underscores or spaces), and keep it concise but descriptive:

| Branch type | Pattern | Example |
|---|---|---|
| New feature | \`feature/short-description\` | \`feature/user-authentication\` |
| Bug fix | \`fix/what-is-fixed\` | \`fix/login-redirect-loop\` |
| Production hotfix | \`hotfix/critical-issue\` | \`hotfix/payment-null-crash\` |
| Scheduled release | \`release/version-number\` | \`release/2.1.0\` |
| Documentation | \`docs/what-changed\` | \`docs/update-api-guide\` |
| Chore / tooling | \`chore/description\` | \`chore/upgrade-node-18\` |

Avoid vague names like \`my-branch\`, \`test\`, or \`wip\`. Your future self and your teammates will thank you.

If your team uses a project management tool (Jira, Linear, GitHub Issues), include the ticket number: \`feature/PROJ-123-add-login-page\`. This creates a traceable link between code and requirements.

## Release Branches and Hotfixes

In Git Flow, here is the exact command sequence for creating and finishing a release:

\`\`\`bash
# Start a release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/2.0.0

# Only bug fixes go on this branch — no new features
git commit -m "fix: correct total calculation rounding error"

# When ready to release: merge into main
git checkout main
git merge --no-ff release/2.0.0
git tag -a v2.0.0 -m "Release 2.0.0"
git push origin main --tags

# Also merge back into develop to keep it up to date
git checkout develop
git merge --no-ff release/2.0.0
git push origin develop

# Delete the release branch
git branch -d release/2.0.0
git push origin --delete release/2.0.0
\`\`\`

For a hotfix on production:
\`\`\`bash
# Branch from main (not develop)
git checkout main
git pull origin main
git checkout -b hotfix/payment-null-crash

git commit -m "fix: handle null payment method in checkout"

# Merge into main
git checkout main
git merge --no-ff hotfix/payment-null-crash
git tag -a v2.0.1 -m "Hotfix 2.0.1"
git push origin main --tags

# Merge into develop too
git checkout develop
git merge --no-ff hotfix/payment-null-crash
git push origin develop
\`\`\`

## Protecting the Main Branch on GitHub

Branch protection rules prevent anyone from accidentally (or deliberately) pushing directly to \`main\` and bypassing code review. Setting this up takes two minutes and prevents a whole category of problems.

Step by step:
1. Go to your repository on GitHub
2. Click the **Settings** tab (you need to be the repo owner or have admin access)
3. In the left sidebar, click **Branches**
4. Under "Branch protection rules", click **Add branch protection rule**
5. In "Branch name pattern", type: \`main\`
6. Check the following options:
   - **Require a pull request before merging** — this means nobody, including admins, can push directly to main
   - **Require approvals** — set to at least 1 (on a team, set to 2)
   - **Dismiss stale pull request approvals when new commits are pushed** — re-review is required if code changes after approval
   - **Require status checks to pass before merging** — your CI tests must pass
   - **Require branches to be up to date before merging** — the PR must include the latest main before it can be merged
   - **Include administrators** — this prevents even repo owners from bypassing the rules
7. Click **Create**

From this point on, the only way to get code into \`main\` is through an approved Pull Request with passing checks.`,

  'code-review': `# Code Review Best Practices

Code review is the practice of having at least one other developer read and comment on your code before it is merged into the main branch. It is one of the most effective practices in software development for catching bugs, sharing knowledge, maintaining consistent code quality, and preventing security vulnerabilities from reaching production.

If you are new to code review — either as a reviewer or as someone receiving feedback — this guide will help you do it well.

## What to Look For as a Reviewer

A code review is not just about spotting typos or arguing about formatting (that is what Prettier is for). Focus your attention on things that automated tools cannot catch:

**1. Correctness**
Does the code actually do what the PR description claims? Walk through the logic mentally. Are there inputs that could cause unexpected behavior — empty strings, null values, very large numbers, special characters? Think about edge cases the author might not have considered.

**2. Readability and Clarity**
Can you understand what each function does without reading a comment? Are variable names self-explanatory? If you had to come back to this code in six months with no context, would you understand it? Code is read far more often than it is written.

**3. Security**
Look for common vulnerabilities:
- Is user input being inserted directly into database queries without parameterisation? (SQL injection risk)
- Is user-controlled data being inserted into HTML without sanitisation? (XSS risk)
- Are there hardcoded credentials, API keys, or tokens?
- Is sensitive data being logged or exposed in error messages?

**4. Test Coverage**
Does the PR include tests for the new behaviour? Do the tests actually test what they claim to? A test that always passes regardless of the code is worse than no test at all.

**5. Scope Creep**
Does the PR do exactly what it says, or does it sneak in unrelated refactors, dependency upgrades, or configuration changes? Unrelated changes make PRs harder to review and harder to roll back if something goes wrong. It is fine to flag this and ask for it to be split out.

**6. Performance**
Is there an obvious performance problem? A database query inside a loop that runs thousands of times, an O(n²) algorithm where O(n) would work, a missing database index? You do not need to micro-optimise everything — just watch for obvious mistakes.

## Writing a Good PR Description

A PR description is documentation. When someone looks at the git blame on this code in two years and wonders why it was written a certain way, the PR description is where they will find the answer.

Use this template:

\`\`\`markdown
## What
One or two sentences describing what changed.

## Why
Why was this change needed? Link to the relevant issue or ticket.
Example: "Fixes #123 — users were unable to log in when their email contained a plus sign."

## How it works
Optional: a short explanation of the approach taken, especially if it was non-obvious.

## How to Test
Step-by-step instructions for a reviewer to verify the change works:
1. Check out this branch: git checkout feature/fix-email-login
2. Run the development server: npm run dev
3. Navigate to /login
4. Enter an email address with a plus sign, e.g. user+test@example.com
5. Verify that login succeeds and you are redirected to the dashboard

## Screenshots (if UI changed)
Include before/after screenshots for any visual changes.

## Checklist
- [ ] Tests added or updated
- [ ] No console.log statements left in
- [ ] No secrets or credentials in the code
\`\`\`

A PR description this detailed takes five extra minutes to write and saves reviewers twenty.

## How to Give Feedback

How you phrase feedback matters as much as what you say. Developers put real effort into their work, and blunt criticism — even when technically correct — makes people defensive rather than collaborative.

**Be specific.** "This is messy" tells the author nothing actionable. "This function is doing three different things — extracting validation, API call, and state update into separate functions would make it easier to test" gives them something to work with.

**Use prefix labels to set expectations:**
- **nit:** — a minor style preference that you are fine with either way. "nit: I'd name this \`userId\` rather than \`id\` for clarity"
- **suggestion:** — an idea worth considering but not blocking. "suggestion: this could use Array.find() instead of a for loop for readability"
- **question:** — you are not sure you understand the code and want clarification. "question: why does this need to be async?"
- **blocker:** — this must be addressed before merge. "blocker: this query is vulnerable to SQL injection — use parameterised queries"

**Ask questions instead of making accusations.** "Did you consider what happens when \`user\` is null here?" is better than "You forgot to handle null". The first assumes good faith; the second sounds like an accusation.

**Approve quickly when the code is good.** A review that takes a week to arrive is a bottleneck for the whole team. Aim to review PRs within one business day.

## How to Receive Feedback

This takes practice. Here are the most important mindset shifts:

**The reviewer is reviewing the code, not you.** A comment on your code is not a comment on your intelligence or worth as a developer. Separate your identity from your work.

**If you disagree, say so — with reasoning.** "I disagree because X" is a professional response. Just ignoring a comment or changing the code to pass review without understanding the reason is not.

**"Thanks, fixed!" is a great response to a nit.** Not every comment needs a lengthy discussion.

**Ask for clarification if you do not understand a comment.** "Could you expand on what you mean by this?" is always appropriate.

## GitHub Pull Request Walkthrough

Here is the full flow from branch to merged code:

1. **Push your branch to GitHub:**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

2. **Open a Pull Request:** Go to your repository on GitHub. If you pushed recently, GitHub shows a yellow banner with a "Compare & pull request" button. Click it. Otherwise, go to the **Pull requests** tab → **New pull request** → select your branch.

3. **Fill out the description:** Use the template above. Select reviewers on the right sidebar.

4. **Respond to review comments:** When a reviewer leaves a comment, you can reply inline on GitHub, or just push new commits addressing the feedback — the PR updates automatically.

5. **Resolve conversations:** After addressing a comment, click **Resolve conversation** on GitHub to mark it done.

6. **Merge:** Once all reviewers have approved and all status checks are green, click **Merge pull request**. Choose "Squash and merge" to combine all your commits into one clean commit on \`main\`.

7. **Delete the branch:** GitHub will show a "Delete branch" button after merging. Click it — the branch has done its job.`,

  'secure-ai-framework': `# Secure AI Development Framework

AI coding tools have become genuinely useful — GitHub Copilot, Claude, and ChatGPT can help you understand unfamiliar code, debug tricky problems, write boilerplate, and learn new frameworks faster than before. Used carefully, they make you more productive. Used carelessly, they can introduce security vulnerabilities, leak sensitive information, or give you code that looks correct but is subtly broken.

This guide gives you a practical framework for using AI tools safely and effectively.

## What NOT to Share with AI Tools

The most important rule: **treat AI prompts as semi-public**. Even with privacy policies, you should assume that anything you type into an AI tool could end up being used to train future models or could be accessible to the provider.

**Never include in AI prompts:**

- **API keys, tokens, and passwords** — never paste a real API key, database password, JWT secret, or any credential. Replace them with placeholder text: \`API_KEY=your-key-here\`
- **Database connection strings** — these contain credentials and often the hostname of your database server
- **Personal data** — names, email addresses, phone numbers, national IDs, medical information, or any other data about real people. This is not just a security issue — sharing personal data with a third-party AI service may violate GDPR
- **Proprietary business logic** — code that contains trade secrets, pricing algorithms, or sensitive business rules
- **Internal infrastructure details** — server hostnames, IP addresses, internal network topology, or details about your security architecture
- **Production environment variables** — your \`.env\` file should never be pasted into an AI prompt

**What you can share safely:**

- Generic code snippets with all real values replaced by placeholders
- Error messages (check that they do not contain file paths that reveal your directory structure or usernames)
- Algorithm questions using example data you made up
- Questions about syntax, libraries, and patterns

**Example — safe vs unsafe prompt:**

Unsafe: \`"My database connection is failing: postgres://admin:SuperSecret123@prod-db.mycompany.com:5432/users"\`

Safe: \`"My PostgreSQL connection is failing with error: ECONNREFUSED. My connection string format is postgres://user:password@hostname:5432/dbname. What should I check?"\`

## Verifying AI-Generated Code

AI code generation is impressive but not reliable. Models confidently generate code that looks correct and has subtle (or not so subtle) bugs, security vulnerabilities, or uses library APIs that no longer exist. Never copy AI-generated code into your project without reading and understanding every line.

**A practical verification checklist:**

1. **Read it line by line.** Do not skim. Treat AI-generated code like code submitted by a junior developer in a code review — it needs the same scrutiny.

2. **Check for security issues.** Common problems in AI-generated code:
   - SQL queries built with string concatenation instead of parameterised queries
   - User input inserted into HTML without sanitisation (XSS vulnerability)
   - \`eval()\` or \`exec()\` called with user-controlled input
   - File paths constructed from user input without validation

3. **Verify library calls are real.** AI models sometimes invent function names or use outdated APIs. Check the official documentation for any library function the AI uses that you do not recognise.

4. **Run the tests.** If the AI wrote tests, run them. If the tests pass trivially (e.g., they only test that a constant equals itself), that is a red flag.

5. **Ask the AI to explain its reasoning.** If you do not understand why the code works a certain way, ask: "What happens if the input is null here?" or "Why did you use this approach instead of X?" If the explanation does not make sense, dig deeper before trusting the code.

6. **Test it yourself.** Run the code with normal inputs, edge cases, and invalid inputs. Does it behave the way you expect?

## Free AI Tools for Developers

You do not need to pay for AI coding assistance. All of these have useful free tiers:

| Tool | Free Tier | Best Use Cases |
|---|---|---|
| GitHub Copilot | 2,000 completions + 50 chat messages/month | In-editor autocomplete while typing, inline explanations |
| Claude (claude.ai) | Generous free tier | Code review, architecture discussions, explaining complex code, debugging |
| ChatGPT (chatgpt.com) | Free GPT-4o access | Explaining concepts, debugging help, learning new topics |
| Google Gemini | Free tier available | Similar to ChatGPT, integrates well with Google Workspace |

GitHub Copilot is the most useful for day-to-day coding because it integrates directly into VS Code and suggests code as you type. Claude and ChatGPT are better for longer conversations where you need to reason through a problem.

## Effective Prompting for Code

The quality of AI output depends almost entirely on the quality of your prompt. Vague questions get vague answers. Specific, contextual questions get useful answers.

Use this template as a starting point:

\`\`\`
Context: I'm building a [brief description of the project].
Stack: [language, framework, relevant libraries]
Goal: I need to [specific goal — one thing at a time].
Current code: [paste the relevant snippet, with all real values replaced by placeholders]
Problem: [describe exactly what is going wrong, including the error message if there is one]
Question: What is the best approach to [specific question]?
\`\`\`

**Tips for better results:**

- **One question at a time.** "Help me build a complete authentication system" is too broad. "How do I validate a JWT token in an Express middleware function?" is answerable.
- **Include the error message exactly.** Do not paraphrase error messages — paste them verbatim.
- **Specify constraints.** "Without using any third-party libraries" or "this must work in Node.js 18" helps the AI give you appropriate answers.
- **Ask for explanations.** Adding "explain each line so I understand what it does" helps you learn rather than just copy-paste.
- **Iterate.** If the first answer is not quite right, follow up: "That works, but what happens if the token has already expired? Can you update the code to handle that?"

AI tools are most valuable when you use them to understand and learn, not just to generate code you paste without reading. Every line of AI-generated code that you understand becomes your knowledge. Every line you paste blindly is a liability.`,

  'eu-compliance-guide': `# EU Compliance Guide for Developers

The General Data Protection Regulation (GDPR) is a European Union law that controls how personal data about EU residents is collected, stored, processed, and deleted. It came into force in May 2018. Despite being an EU law, it applies to any organisation anywhere in the world that handles data belonging to EU residents — which means most web applications need to comply with it.

This guide covers what every developer needs to know to build GDPR-compliant applications, without enterprise legal resources.

## What is Personal Data?

Under GDPR, "personal data" is defined very broadly: any information that can identify a living individual, either on its own or when combined with other information.

**Obviously personal:**
- Name
- Email address
- Phone number
- Physical address
- National ID or passport number
- Date of birth

**Less obvious, but still personal:**
- IP address (yes, an IP address counts as personal data under GDPR)
- Cookie identifiers that track a specific user across visits
- Device fingerprints
- Location data
- Photos
- Usernames (if they can be linked to a real person)
- Any combination of data points that together identify someone

**Not personal data:**
- Truly anonymised data (not just pseudonymised — see below)
- Aggregated statistics that cannot be reversed to identify individuals

**Pseudonymisation vs Anonymisation:** Pseudonymisation means replacing direct identifiers (like a name) with an indirect one (like a user ID). Pseudonymised data is still personal data because the link back to the real person still exists. Truly anonymised data cannot be reversed — it is no longer personal data under GDPR. Most production databases contain pseudonymised data, not anonymised data.

## The Six Principles for Developers

GDPR is built around six data protection principles. As a developer, these translate directly into decisions you make when building features:

1. **Lawfulness, fairness, transparency** — users must know what data you collect and why. This means a clear privacy policy and honest consent flows.

2. **Purpose limitation** — only collect data for specific, legitimate purposes, and only use it for those purposes. If you collect email for login, do not use it for marketing without separate consent.

3. **Data minimisation** — collect the minimum data necessary. If you do not need a user's phone number to provide your service, do not ask for it.

4. **Accuracy** — keep data accurate and up to date. Provide users a way to update their information.

5. **Storage limitation** — do not keep data longer than necessary. Define retention periods for every type of data and implement automatic deletion.

6. **Integrity and confidentiality** — protect data with appropriate security measures: encryption, access controls, and secure transmission.

## User Rights You Must Support

GDPR gives users specific rights. Your application must have mechanisms to handle these requests:

- **Right to access:** A user can request a copy of all personal data you hold about them. You need to be able to export this.
- **Right to rectification:** Users can ask you to correct inaccurate data.
- **Right to erasure ("right to be forgotten"):** Users can request deletion of their data. You need a mechanism to delete a user account and all associated personal data.
- **Right to data portability:** Users can request their data in a machine-readable format (e.g., JSON or CSV).
- **Right to object:** Users can object to certain types of processing, such as marketing.

## Cookie Consent Implementation

Cookies that are not strictly necessary for the site to function (analytics, advertising, personalisation) require explicit user consent before being set. The consent must be freely given, specific, informed, and unambiguous — a clear positive action. Pre-ticked boxes are not valid consent.

\`\`\`js
// Check if user has given consent before initialising analytics
function initAnalytics() {
  const consent = localStorage.getItem('cookie_consent');
  if (consent === 'accepted') {
    // Only now is it legal to load analytics scripts
    loadGoogleAnalytics();
  }
}

// Call this when user clicks "Accept" on your cookie banner
function acceptCookies() {
  localStorage.setItem('cookie_consent', 'accepted');
  localStorage.setItem('cookie_consent_date', new Date().toISOString());
  initAnalytics();
}

// Call this when user clicks "Reject"
function rejectCookies() {
  localStorage.setItem('cookie_consent', 'rejected');
  // Do not load analytics
}

// On page load, check consent status and show banner if needed
document.addEventListener('DOMContentLoaded', () => {
  const consent = localStorage.getItem('cookie_consent');
  if (!consent) {
    document.getElementById('cookie-banner').style.display = 'block';
  } else {
    initAnalytics();
  }
});
\`\`\`

## Data Retention Example

Define a data retention policy and implement it as a scheduled job. Running this on a schedule (e.g., nightly) means your database stays clean automatically:

\`\`\`sql
-- Delete user sessions older than 30 days
DELETE FROM sessions
WHERE created_at < NOW() - INTERVAL '30 days';

-- Anonymise order records older than 7 years
-- (Keep records for accounting, but remove personal details)
UPDATE orders
SET
  customer_name = 'ANONYMISED',
  customer_email = 'ANONYMISED',
  customer_address = 'ANONYMISED'
WHERE
  created_at < NOW() - INTERVAL '7 years'
  AND customer_name != 'ANONYMISED';

-- Hard-delete accounts that have been marked for deletion for over 30 days
-- (The 30-day grace period lets users recover their account if they change their mind)
DELETE FROM users
WHERE
  deletion_requested_at IS NOT NULL
  AND deletion_requested_at < NOW() - INTERVAL '30 days';
\`\`\`

## Privacy by Design Checklist

Before shipping any feature that handles personal data, check:

- [ ] Is this data actually necessary for the feature? Could I build this with less data?
- [ ] Is all data transmitted over HTTPS?
- [ ] Is sensitive data (passwords, payment info) stored encrypted?
- [ ] Do logs contain personal data? If so, can I remove it from logs?
- [ ] Is there a retention period defined and automated for this data?
- [ ] Can a user request deletion and will it actually delete all copies of their data?

## Data Breach Response Steps

Under GDPR, if a data breach is likely to result in a risk to individuals' rights, you must notify the relevant supervisory authority within 72 hours of becoming aware of it. If the risk is high, you must also notify the affected individuals directly.

Steps to follow:
1. **Contain immediately.** Revoke compromised credentials, isolate affected systems, stop the breach from spreading
2. **Assess the scope.** What data was accessed? How many people are affected? What is the risk to those individuals?
3. **Notify your Data Protection Officer (DPO)** or the person responsible for compliance in your organisation immediately
4. **Document everything.** Timestamps, actions taken, data affected — this documentation is a legal requirement
5. **Notify the supervisory authority** if required — in the UK this is the ICO (ico.org.uk); in Ireland the DPC; in Germany the relevant Landesdatenschutzbehörde. The notification must include: the nature of the breach, categories and approximate number of individuals affected, likely consequences, and measures taken
6. **Notify affected individuals** if the risk to them is high (e.g., financial data, passwords, or medical information was exposed)

## Developer Resources

- **GDPR guidance for developers:** https://gdpr.eu/developers/
- **Full GDPR checklist:** https://gdpr.eu/checklist/
- **UK ICO guidance for developers:** https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/
- **CNIL (France) developer guide:** https://www.cnil.fr/en/developers`,

  'secure-dev-environment': `# Secure Development Environment

Security is not just something that happens at the production infrastructure level. It starts on your laptop, in your terminal, and in the habits you build while writing code. A single leaked API key, a reused password, or a carelessly committed \`.env\` file can compromise your users, your employer, or your own projects. This guide sets you up with the fundamentals of a secure development environment from day one.

## Password Management with Bitwarden

Using the same password on multiple sites, or using weak passwords, is the single most common cause of account compromises. A password manager solves this by generating a unique, strong password for every service and remembering them for you.

**Bitwarden** is free, open source, and audited by independent security firms. It stores your passwords in an encrypted vault that only you can unlock.

Setting up Bitwarden:

1. Go to https://bitwarden.com/ and click **Get Started for Free**
2. Create an account with your email. Choose a strong master password — this is the one password you need to remember. Make it a passphrase (four or more random words, e.g., \`correct-horse-battery-staple\`) rather than a complex short password
3. Install the **browser extension** for Chrome or Firefox from the Bitwarden website. This is what auto-fills passwords as you browse
4. Install the **desktop app** from https://bitwarden.com/download/ (optional but useful for secure notes and quick access)
5. Enable **two-factor authentication** on your Bitwarden account itself — this protects your vault even if your master password is somehow compromised. Go to Account Settings → Security → Two-step Login

Going forward: every time you create an account for a new service, click the Bitwarden extension and use "Generate password" to create a unique random password. Never reuse passwords.

## Enabling Two-Factor Authentication (2FA)

Two-factor authentication means that logging into an account requires two things: your password (something you know) and a one-time code from your phone (something you have). Even if an attacker steals your password, they cannot log in without your phone.

Enable 2FA on every service that supports it, especially:

**GitHub:**
1. Click your profile picture → **Settings**
2. In the left sidebar, click **Password and authentication**
3. Under "Two-factor authentication", click **Enable two-factor authentication**
4. Choose **Authenticator app** (not SMS — SMS 2FA can be bypassed by SIM-swapping attacks)
5. Scan the QR code with your authenticator app
6. Save your recovery codes somewhere safe (Bitwarden is a good place)

Repeat this process for any cloud providers you use (AWS, Google Cloud, Azure), your email account, and your domain registrar.

**Recommended authenticator apps:**
- **Aegis** (Android) — open source, supports encrypted backups
- **Raivo OTP** (iOS) — open source
- Both are better than Google Authenticator because they support encrypted exports, so you will not lose all your 2FA codes if you change phones

## SSH Key Generation and Management

You already set up a basic SSH key in the Git Setup section. This section covers best practices for managing SSH keys securely.

**Generate a new key with a passphrase:**

\`\`\`bash
# Generate a modern ed25519 key — provide your GitHub email as the comment
ssh-keygen -t ed25519 -C "you@example.com"

# When prompted:
# Enter file in which to save the key: press Enter to use the default (~/.ssh/id_ed25519)
# Enter passphrase: type a strong passphrase (this encrypts your private key on disk)
# Enter same passphrase again: repeat it
\`\`\`

The passphrase means that even if someone gets access to your laptop files, they cannot use your SSH key without also knowing the passphrase.

**Add the key to your SSH agent** so you only need to enter the passphrase once per session, not every time you push:

\`\`\`bash
# Start the SSH agent in the background
eval "$(ssh-agent -s)"

# Add your key (you will be prompted for the passphrase once)
ssh-add ~/.ssh/id_ed25519
\`\`\`

On macOS, you can make this persist across reboots by adding this to \`~/.ssh/config\`:

\`\`\`
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
\`\`\`

**Key rules:**
- Your private key (\`~/.ssh/id_ed25519\`) must never leave your machine. Do not email it, do not paste it anywhere, do not put it in a repository
- Your public key (\`~/.ssh/id_ed25519.pub\`) is safe to share — that is its purpose
- Use a separate key pair for different contexts if your organisation requires it (one for personal GitHub, one for work GitHub)

## Protecting Secrets in Code

Hardcoded secrets in source code are an extremely common security vulnerability. Once a secret is committed to a repository — even if you delete it immediately — it is in the git history and potentially visible to anyone who has ever cloned the repo.

**The correct pattern: environment variables + .env file + .gitignore**

Step 1: Store secrets in a \`.env\` file at the root of your project:

\`\`\`bash
# .env — NEVER commit this file
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
API_KEY=sk-1234abcdef
JWT_SECRET=your-very-long-random-secret-here
\`\`\`

Step 2: Access them in code via environment variables:

\`\`\`js
// Never hardcode secrets directly in source files
// const apiKey = "sk-1234abcdef";  // BAD

// Always read from environment
const apiKey = process.env.API_KEY;

// In Node.js, load the .env file at startup using the dotenv package:
// npm install dotenv
// Add at the very top of your entry file:
require('dotenv').config();
\`\`\`

Step 3: Add \`.env\` to your \`.gitignore\` file before your first commit:

\`\`\`
# .gitignore
.env
.env.local
.env.*.local
*.pem
*.key
secrets/
credentials.json
\`\`\`

Step 4: Create a \`.env.example\` file with placeholder values and commit that instead. This documents what environment variables the project needs without exposing real values:

\`\`\`bash
# .env.example — safe to commit, shows required variables
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
API_KEY=your-api-key-here
JWT_SECRET=your-jwt-secret-here
\`\`\`

## Scanning for Secrets with gitleaks

**gitleaks** is a free, open-source tool that scans your git repository for accidentally committed secrets — API keys, tokens, passwords, and other sensitive strings. Run it before pushing to catch problems before they become public.

**Installation:**

\`\`\`bash
# macOS
brew install gitleaks

# Windows (via Chocolatey — install Chocolatey first from https://chocolatey.org/)
choco install gitleaks

# Linux — download the binary from GitHub releases
# Go to https://github.com/gitleaks/gitleaks/releases
# Download the appropriate binary, for example gitleaks_linux_amd64.tar.gz
# Then extract and move it:
tar -xzf gitleaks_linux_amd64.tar.gz
sudo mv gitleaks /usr/local/bin/

# Verify installation
gitleaks version
\`\`\`

**Usage:**

\`\`\`bash
# Scan your entire repository history for any committed secrets
gitleaks detect --source .

# Scan only uncommitted changes (staged and unstaged)
gitleaks protect --staged

# Scan and output results as JSON (useful for CI/CD pipelines)
gitleaks detect --source . --report-format json --report-path gitleaks-report.json
\`\`\`

For continuous protection, add gitleaks as a pre-commit hook. Create a file named \`.pre-commit-config.yaml\` in your repo root with this content:

\`\`\`yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.4
    hooks:
      - id: gitleaks
\`\`\`

Then install the hook framework and activate it:

\`\`\`bash
pip install pre-commit
pre-commit install
\`\`\`

Now gitleaks will run automatically on every \`git commit\` and block the commit if it finds a secret.

## What to Do If You Accidentally Commit a Secret

This happens to almost every developer at least once. Act immediately — do not wait.

**Step 1: Revoke the secret right now.** Before anything else, go to the service the secret belongs to (GitHub, AWS, Stripe, etc.) and revoke or regenerate it. A deleted commit does not fully protect you — bots scan GitHub continuously for newly committed secrets and can pick them up within seconds of a push.

**Step 2: Remove the secret from git history.** Deleting the file or reverting the commit is not enough — the secret is still in the git history. Use the BFG Repo Cleaner (simpler than \`git filter-branch\`) to rewrite history:

\`\`\`bash
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/
# Place it somewhere accessible, e.g. ~/bfg.jar

# Create a text file listing the secrets to remove (one per line)
# For example, create secrets-to-remove.txt with the leaked value inside

# Run BFG to remove all occurrences from history
java -jar ~/bfg.jar --replace-text secrets-to-remove.txt

# Clean up the repository and force-push (coordinate with your team first)
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
\`\`\`

**Step 3: Notify your team** if this is a shared repository — they need to re-clone or rebase on the rewritten history.

**Step 4: Rotate all related credentials.** If the leaked secret had access to a database, rotate the database password. If it was a cloud provider key, check the provider's access logs for any suspicious activity during the window when the secret was exposed.

**Step 5: Add the secret pattern to your \`.gitignore\`** and move it to your \`.env\` file so it cannot happen again.`,
};
