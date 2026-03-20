# VS Code Setup


Visual Studio Code is the standard editor across Tech-Hubben. This page covers the recommended extensions and settings to get a productive environment set up quickly.

---

## Installation

Request VS Code via [Appstation](https://appstationlf.lfnet.se/Shopping/requestItem/search?query=visual+studio+code) or download from [code.visualstudio.com](https://code.visualstudio.com/).

---

## Extensions for All Roles

Install these regardless of your role.

| Extension | Purpose |
|---|---|
| [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) | Inline Git blame, history, and branch visualization |
| [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | AI code completion — requires LF licence |
| [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) | In-editor AI chat |
| [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) | Shows errors and warnings inline on the affected line |
| [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) | Enforces consistent indentation and line endings across the team |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) | Automatic code formatting |

---

## Extensions by Role

### Frontend Developer

| Extension | Purpose |
|---|---|
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) | JavaScript/TypeScript linting |
| [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) | Tailwind class autocomplete and hover previews |
| [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) | Automatically renames matching HTML/JSX tag |
| [CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek) | Navigate to CSS class definitions from HTML |
| [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) | Lightweight in-editor REST client for testing APIs |

### Backend Developer (Python)

| Extension | Purpose |
|---|---|
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | Python language support, IntelliSense, debugging |
| [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) | Fast Python type checking and autocomplete |
| [Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy) | Breakpoint debugging for Python |
| [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) | Send HTTP requests from `.http` files |

### Backend Developer (.NET / C#)

| Extension | Purpose |
|---|---|
| [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) | C# language support and debugging |
| [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) | Full .NET development tools |
| [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) | Send HTTP requests from `.http` files |

### DevOps / Platform Engineer

| Extension | Purpose |
|---|---|
| [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) | YAML schema validation and formatting |
| [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) | Dockerfile editing, container management |
| [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) | Kubernetes manifest editing and cluster management |
| [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) | Azure resource management from VS Code |
| [Bicep](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep) | Bicep IaC language support |
| [HashiCorp Terraform](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform) | Terraform language support and validation |
| [ShellCheck](https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck) | Bash script linting |
| [PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) | PowerShell language support and debugging |

### Data Engineer

| Extension | Purpose |
|---|---|
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | Python language support, IntelliSense, debugging |
| [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) | Fast Python type checking and autocomplete |
| [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) | Run and edit Jupyter notebooks inside VS Code |
| [Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) | Visual data inspection and transformation |
| [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) | Colour-coded CSV viewing |
| [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) | YAML schema validation and formatting for pipeline definitions |
| [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) | Dockerfile editing, container management |
| [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) | Azure resource management from VS Code |

### AI/ML Engineer and Data Scientist

| Extension | Purpose |
|---|---|
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | Python language support |
| [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) | Type checking and autocomplete |
| [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) | Run and edit Jupyter notebooks inside VS Code |
| [Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) | Visual data inspection and transformation |
| [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) | Colour-coded CSV viewing |

---

## Recommended Settings

Open user settings with `Ctrl+Shift+P` > **Preferences: Open User Settings (JSON)** and add:

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.rulers": [100],
  "editor.bracketPairColorization.enabled": true,
  "editor.inlineSuggest.enabled": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "git.autofetch": true,
  "git.confirmSync": false,
  "terminal.integrated.defaultProfile.windows": "Git Bash"
}
```

---

## Useful Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+P` | Quick open file by name |
| `Ctrl+Shift+P` | Command palette |
| `Ctrl+`` ` `` | Open integrated terminal |
| `Ctrl+Shift+`` ` `` | New terminal |
| `F12` | Go to definition |
| `Alt+F12` | Peek definition inline |
| `Shift+F12` | Find all references |
| `Ctrl+Shift+F` | Search across all files |
| `Ctrl+D` | Select next occurrence of selection |
| `Alt+Up/Down` | Move line up or down |
| `Ctrl+/` | Toggle line comment |
| `F2` | Rename symbol across files |

---

## Related

- [Git Setup](git.md)
- [Git Collaboration Workflow](Git-Collaboration-Workflow.md)
