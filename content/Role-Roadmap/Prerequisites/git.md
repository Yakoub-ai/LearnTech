# Git


Git is the version control system used across all Tech-Hubben projects.

---

## Installation

Git is often bundled with Visual Studio. If it is not already installed, request it via [Appstation](https://appstationlf.lfnet.se/Shopping/requestItem/search?query=git) or download from [git-scm.com](https://git-scm.com/).

---

## Initial Setup

After installing, configure your identity. Run the following in a terminal:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## TLS/SSL Troubleshooting

If Git reports a TLS/SSL error when cloning from your Git hosting platform, configure it to use the Windows certificate store instead of OpenSSL:

```bash
git config --global http.sslBackend schannel
```

To verify the current setting:

```bash
git config --show-origin --get http.sslBackend
```

This setting is especially useful in managed Windows environments where the OS certificate store is the source of trust.

---

## Branching Strategy

All projects follow a shared branching strategy. See [Branching Strategy](Branching-Strategy.md) for the full guide.

---

## Credential Management

Git Credential Manager (GCM) is the recommended tool for storing and managing Git credentials securely. It integrates with the operating system's native credential store, so you are not prompted for your password on every push or pull.

**Why it matters:** Without a credential manager, developers often resort to storing Personal Access Tokens in plaintext files or pasting them repeatedly into the terminal. Both habits lead to leaked or expired credentials that waste time and create security risks.

**Key things to understand:**

- GCM is included with Git for Windows by default — no separate install required
- It works with most major Git hosting platforms out of the box, handling browser-based sign-in and token caching automatically
- Credentials are stored in Windows Credential Manager, not in plain files
- You can check whether GCM is active with `git config --global credential.helper`

**Common pitfalls:**

- Storing PATs in plaintext files such as `.git-credentials` or `.bashrc` — use GCM instead
- Committing tokens or secrets to a repository — they are visible in the full Git history even if removed later
- Forgetting to update credentials after a PAT expires, leading to confusing authentication failures

For more details see the [Git Credential Manager repository](https://github.com/git-ecosystem/git-credential-manager).

---

## .gitignore

Every repository should have a `.gitignore` file from day one. This file tells Git which files and folders to exclude from version control, keeping the repository clean and free of machine-specific artefacts.

**Why it matters:** Without a `.gitignore`, build outputs, IDE settings, and environment secrets end up in the repository. This bloats the repo, creates noisy diffs, and risks leaking sensitive data.

**Key things to understand:**

- Essential patterns to exclude: IDE settings (`.vs/`, `.vscode/`), build outputs (`bin/`, `obj/`, `dist/`), dependency folders (`node_modules/`, `.venv/`), environment files (`.env`), and OS files (`.DS_Store`, `Thumbs.db`)
- Use [gitignore.io](https://www.toptal.com/developers/gitignore) to generate templates for your language and toolchain
- Many Git hosting platforms and project templates can initialise a repository with a starter `.gitignore`
- The file supports glob patterns — for example `*.log` ignores all log files and `**/bin/` ignores `bin` folders at any depth

**Common pitfalls:**

- Adding `.gitignore` after files have already been tracked — Git continues tracking them until you run `git rm --cached <file>`
- Ignoring too much (e.g. shared configuration that the team needs) or too little (e.g. leaving `node_modules/` tracked)
- Not checking the `.gitignore` into the repository itself — the file must be committed so the rules apply for everyone

---

## Authentication for Git Hosting Platforms

Most Git hosting platforms support multiple authentication methods for Git operations. Choosing the right one depends on your workflow and security requirements.

**Why it matters:** A misconfigured authentication setup leads to repeated login prompts, failed CI pipelines, and — in the worst case — leaked credentials. Understanding the available options helps you pick the most secure and convenient method.

**Key things to understand:**

- **SSH keys** — generate a key pair with `ssh-keygen -t ed25519`, then add the public key in your Git hosting platform's SSH key settings. SSH avoids password prompts entirely.
- **Personal Access Tokens (PATs)** — create them in your Git hosting platform's personal access token settings. Scope each token to the minimum required permissions and always set an expiry date.
- **Git Credential Manager (GCM)** — when using HTTPS, GCM handles token caching automatically so you rarely need to manage PATs manually.
- HTTPS with GCM is the most common setup at LF because it requires the least configuration.

**Common pitfalls:**

- Creating PATs with full scope instead of restricting to `Code (Read & Write)` — overly broad tokens are a security risk
- Sharing PATs between team members — each developer should use their own token
- Forgetting PAT expiry dates and discovering them only when a pipeline breaks
- Not adding the correct SSH host for your Git provider to `~/.ssh/config`, leading to connection failures

---

## Resources

| Resource | Type |
|---|---|
| [LF Developer Network – Git Docs](https://lfdn.lfnet.se/docs/devops/code/git/) | Internal |
| [Git – Pluralsight Path](https://app.pluralsight.com/paths/skill/git) | Course |
| [Moving to Git – LFDN](http://lfdn.lfnet.se/docs/tools/git/movingtogit/) | Internal |
