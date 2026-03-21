// Language-specific dev setup guides
// Keyed by language ID, matching devSetupGuides.js pattern
export const languageDevSetupGuides = {
  'python': {
    title: 'Python Development Setup',
    prerequisites: [
      'A computer running Windows, macOS, or Linux',
      'Administrator/sudo access for installing software',
      'VS Code (recommended) or another code editor',
      'Terminal or command prompt familiarity'
    ],
    steps: [
      {
        title: 'Install Python 3.12+',
        description: 'Download and install the latest stable version of Python from the official website.',
        commands: [
          {
            cmd: 'python3 --version',
            description: 'Check if Python is already installed'
          },
          {
            cmd: 'curl -O https://www.python.org/ftp/python/3.12.4/python-3.12.4-macos11.pkg',
            description: 'Download Python installer (macOS example — use python.org/downloads for your OS)'
          },
          {
            cmd: 'python3 -m ensurepip --upgrade',
            description: 'Ensure pip is installed and up to date'
          },
          {
            cmd: 'pip3 install --upgrade pip',
            description: 'Upgrade pip to the latest version'
          }
        ],
        verification: {
          cmd: 'python3 --version && pip3 --version',
          expected: 'Python 3.12.x and pip 24.x or higher'
        }
      },
      {
        title: 'Set Up a Virtual Environment',
        description: 'Create an isolated Python environment to manage dependencies per project without conflicts.',
        commands: [
          {
            cmd: 'python3 -m venv myproject-env',
            description: 'Create a new virtual environment named myproject-env'
          },
          {
            cmd: 'source myproject-env/bin/activate',
            description: 'Activate the virtual environment (macOS/Linux)'
          },
          {
            cmd: 'myproject-env\\Scripts\\activate',
            description: 'Activate the virtual environment (Windows PowerShell)'
          },
          {
            cmd: 'which python',
            description: 'Confirm the active Python points to your virtual environment'
          }
        ],
        verification: {
          cmd: 'python -c "import sys; print(sys.prefix)"',
          expected: 'Path should point to your myproject-env directory, not the system Python'
        }
      },
      {
        title: 'Install Common Packages',
        description: 'Install widely-used Python libraries for HTTP requests, testing, type checking, and linting.',
        commands: [
          {
            cmd: 'pip install requests',
            description: 'Install the requests library for HTTP calls'
          },
          {
            cmd: 'pip install pytest',
            description: 'Install pytest for running tests'
          },
          {
            cmd: 'pip install mypy',
            description: 'Install mypy for static type checking'
          },
          {
            cmd: 'pip install ruff',
            description: 'Install ruff for fast linting and formatting'
          },
          {
            cmd: 'pip freeze > requirements.txt',
            description: 'Save installed packages to a requirements file'
          }
        ],
        verification: {
          cmd: 'python -c "import requests; import pytest; print(\'All packages installed successfully\')"',
          expected: 'All packages installed successfully'
        }
      },
      {
        title: 'Configure VS Code for Python',
        description: 'Install the Python extension and configure the editor for a productive development experience.',
        commands: [
          {
            cmd: 'code --install-extension ms-python.python',
            description: 'Install the official Microsoft Python extension'
          },
          {
            cmd: 'code --install-extension ms-python.vscode-pylance',
            description: 'Install Pylance for advanced IntelliSense and type checking'
          },
          {
            cmd: 'code --install-extension charliermarsh.ruff',
            description: 'Install the Ruff extension for in-editor linting'
          }
        ],
        verification: {
          cmd: 'code --list-extensions | grep -i python',
          expected: 'ms-python.python and ms-python.vscode-pylance should appear in the list'
        }
      },
      {
        title: 'Set Up Linting and Formatting',
        description: 'Configure ruff and black for consistent code style across your project.',
        commands: [
          {
            cmd: 'pip install black',
            description: 'Install black for opinionated code formatting'
          },
          {
            cmd: 'ruff check .',
            description: 'Run ruff linter on the current directory'
          },
          {
            cmd: 'black --check .',
            description: 'Check formatting without making changes'
          },
          {
            cmd: 'echo "[tool.ruff]\\nline-length = 88\\nselect = [\\"E\\", \\"F\\", \\"I\\"]" > pyproject.toml',
            description: 'Create a basic ruff configuration in pyproject.toml'
          }
        ],
        verification: {
          cmd: 'ruff check --version && black --version',
          expected: 'Both tools report their version numbers without errors'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'python or pip command not found after installation',
        solution: 'On Windows, ensure the "Add Python to PATH" checkbox was selected during installation. On macOS/Linux, add export PATH="$HOME/.local/bin:$PATH" to your shell profile (~/.bashrc, ~/.zshrc). Restart your terminal after changes.'
      },
      {
        problem: 'Virtual environment activation fails on Windows',
        solution: 'In PowerShell, you may need to run Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser first. For CMD, use myproject-env\\Scripts\\activate.bat instead of the activate command.'
      },
      {
        problem: 'Virtual environment activation fails on macOS/Linux',
        solution: 'Ensure you use "source myproject-env/bin/activate" (with the "source" command). If using fish shell, use "source myproject-env/bin/activate.fish" instead.'
      },
      {
        problem: 'pip install fails with permission errors',
        solution: 'Always install packages inside a virtual environment. Never use sudo pip install. If you must install globally, use pip install --user <package>.'
      },
      {
        problem: 'Multiple Python versions causing confusion',
        solution: 'Use python3 and pip3 explicitly to ensure you are targeting Python 3. Consider using pyenv to manage multiple Python versions cleanly.'
      }
    ]
  },

  'javascript': {
    title: 'JavaScript Development Setup',
    prerequisites: [
      'A computer running Windows, macOS, or Linux',
      'Administrator/sudo access for installing software',
      'VS Code (recommended) or another code editor',
      'Terminal or command prompt familiarity'
    ],
    steps: [
      {
        title: 'Install Node.js 20+ LTS via nvm',
        description: 'Use Node Version Manager (nvm) to install and manage Node.js versions without permission issues.',
        commands: [
          {
            cmd: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash',
            description: 'Install nvm (macOS/Linux)'
          },
          {
            cmd: 'source ~/.bashrc',
            description: 'Reload your shell profile to activate nvm'
          },
          {
            cmd: 'nvm install 20',
            description: 'Install the latest Node.js 20 LTS release'
          },
          {
            cmd: 'nvm alias default 20',
            description: 'Set Node.js 20 as the default version'
          }
        ],
        verification: {
          cmd: 'node --version && npm --version',
          expected: 'Node v20.x.x and npm 10.x.x or higher'
        }
      },
      {
        title: 'Choose and Configure a Package Manager',
        description: 'Select between npm, yarn, or pnpm based on your project needs. npm comes bundled with Node.js.',
        commands: [
          {
            cmd: 'npm --version',
            description: 'Verify npm is available (included with Node.js)'
          },
          {
            cmd: 'corepack enable',
            description: 'Enable Corepack to manage yarn and pnpm versions (built into Node.js 16+)'
          },
          {
            cmd: 'npm install -g yarn',
            description: 'Install yarn globally (alternative: use corepack)'
          },
          {
            cmd: 'npm install -g pnpm',
            description: 'Install pnpm globally — fast, disk-efficient package manager'
          }
        ],
        verification: {
          cmd: 'npm --version && yarn --version && pnpm --version',
          expected: 'All three package managers report their version numbers'
        }
      },
      {
        title: 'Install Common Development Tools',
        description: 'Set up ESLint for code quality, Prettier for formatting, and Jest for testing.',
        commands: [
          {
            cmd: 'npm install -g eslint',
            description: 'Install ESLint globally for JavaScript linting'
          },
          {
            cmd: 'npm install -g prettier',
            description: 'Install Prettier globally for code formatting'
          },
          {
            cmd: 'npm install -g jest',
            description: 'Install Jest globally for running tests'
          },
          {
            cmd: 'npm install -g nodemon',
            description: 'Install nodemon for auto-restarting Node.js apps during development'
          }
        ],
        verification: {
          cmd: 'eslint --version && prettier --version && jest --version',
          expected: 'Each tool prints its version number without errors'
        }
      },
      {
        title: 'Configure VS Code for JavaScript',
        description: 'Install essential VS Code extensions for JavaScript development with linting and formatting.',
        commands: [
          {
            cmd: 'code --install-extension dbaeumer.vscode-eslint',
            description: 'Install the ESLint extension for in-editor linting'
          },
          {
            cmd: 'code --install-extension esbenp.prettier-vscode',
            description: 'Install the Prettier extension for in-editor formatting'
          },
          {
            cmd: 'code --install-extension formulahendry.auto-rename-tag',
            description: 'Install Auto Rename Tag for HTML/JSX tag editing'
          },
          {
            cmd: 'code --install-extension christian-kohler.path-intellisense',
            description: 'Install Path Intellisense for file path autocompletion'
          }
        ],
        verification: {
          cmd: 'code --list-extensions | grep -i eslint',
          expected: 'dbaeumer.vscode-eslint should appear in the list'
        }
      },
      {
        title: 'Set Up a Basic Project',
        description: 'Initialize a new JavaScript project with package.json, ESLint, and Prettier configuration.',
        commands: [
          {
            cmd: 'mkdir my-js-project && cd my-js-project',
            description: 'Create and enter a new project directory'
          },
          {
            cmd: 'npm init -y',
            description: 'Initialize package.json with default values'
          },
          {
            cmd: 'npm init @eslint/config',
            description: 'Set up ESLint configuration interactively'
          },
          {
            cmd: 'echo \'{ "semi": true, "singleQuote": true, "trailingComma": "es5" }\' > .prettierrc',
            description: 'Create a Prettier configuration file'
          },
          {
            cmd: 'echo "node_modules/" > .gitignore',
            description: 'Create a .gitignore file to exclude node_modules'
          }
        ],
        verification: {
          cmd: 'cat package.json | head -5',
          expected: 'package.json should display with a name and version field'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Node version conflicts — wrong version active',
        solution: 'Run nvm list to see installed versions, then nvm use 20 to switch. Add a .nvmrc file with the version number (e.g., "20") to your project root so nvm use automatically picks the right version.'
      },
      {
        problem: 'npm cache issues causing failed installs',
        solution: 'Run npm cache clean --force to clear the npm cache. Then delete the node_modules folder and package-lock.json, and run npm install again.'
      },
      {
        problem: 'Permission errors when installing global packages',
        solution: 'Using nvm avoids most permission issues. If you installed Node.js directly, never use sudo npm install -g. Instead, configure npm to use a different directory: npm config set prefix ~/.npm-global and add ~/.npm-global/bin to your PATH.'
      },
      {
        problem: 'ESLint and Prettier conflicting with each other',
        solution: 'Install eslint-config-prettier (npm install -D eslint-config-prettier) and add "prettier" to the extends array in your ESLint config. This disables ESLint rules that conflict with Prettier.'
      },
      {
        problem: 'nvm command not found after installation',
        solution: 'Ensure your shell profile (~/.bashrc, ~/.zshrc, or ~/.profile) contains the nvm initialization lines. Close and reopen your terminal, or run source ~/.bashrc (or equivalent) to reload.'
      }
    ]
  },

  'html-css': {
    title: 'HTML & CSS Development Setup',
    prerequisites: [
      'A computer running Windows, macOS, or Linux',
      'A modern web browser — Chrome is recommended (no installation needed for DevTools)',
      'VS Code downloaded from code.visualstudio.com'
    ],
    steps: [
      {
        title: 'Install VS Code and the Live Server Extension',
        description: 'VS Code is a free code editor. The Live Server extension adds a local development server with live reload — no Node.js or build tools required.',
        commands: [
          {
            cmd: 'code --install-extension ritwickdey.LiveServer',
            description: 'Install Live Server extension (auto-reloads the browser on every file save)'
          },
          {
            cmd: 'code --install-extension formulahendry.auto-rename-tag',
            description: 'Install Auto Rename Tag — automatically renames the closing tag when you edit the opening tag'
          },
          {
            cmd: 'code --list-extensions',
            description: 'Verify installed extensions are listed'
          }
        ],
        verification: {
          cmd: 'code --list-extensions | grep -i liveserver',
          expected: 'ritwickdey.liveserver appears in the list'
        }
      },
      {
        title: 'Open an HTML File with Live Server',
        description: 'Create a minimal HTML file and open it with Live Server to see it in the browser. Every save will automatically reload the page.',
        commands: [
          {
            cmd: 'mkdir my-first-site && cd my-first-site',
            description: 'Create a project folder'
          },
          {
            cmd: 'echo "<!DOCTYPE html><html lang=\\"en\\"><head><meta charset=\\"UTF-8\\"><title>Hello</title></head><body><h1>Hello, World!</h1></body></html>" > index.html',
            description: 'Create a minimal index.html file'
          }
        ],
        verification: {
          cmd: 'echo "In VS Code: right-click index.html → Open with Live Server. Chrome opens at http://127.0.0.1:5500 and shows Hello, World!"',
          expected: 'Browser opens and displays the heading. Editing index.html and saving causes the browser to reload automatically.'
        }
      },
      {
        title: 'Use Chrome DevTools (No Installation Needed)',
        description: 'Chrome DevTools is built into the browser. It lets you inspect HTML elements, edit CSS live, and debug issues without any setup.',
        commands: [
          {
            cmd: 'echo "Press F12 (or Cmd+Option+I on Mac) on any webpage to open DevTools"',
            description: 'Open Chrome DevTools with a keyboard shortcut'
          },
          {
            cmd: 'echo "Click the Elements tab to inspect HTML. Click a style rule to edit CSS live in the Styles panel."',
            description: 'Inspect and live-edit HTML and CSS'
          }
        ],
        verification: {
          cmd: 'echo "Open your Live Server page, press F12, click Elements — you should see your HTML tree and CSS rules"',
          expected: 'DevTools Elements panel shows your HTML structure and the Styles panel shows applicable CSS rules'
        }
      },
      {
        title: 'Install Sass for CSS Preprocessing (Mid/Senior)',
        description: 'Once you are comfortable with plain CSS, install Sass to write variables, nesting, and mixins that compile down to standard CSS. Requires Node.js (nodejs.org).',
        commands: [
          {
            cmd: 'node --version',
            description: 'Confirm Node.js is installed (install from nodejs.org if not)'
          },
          {
            cmd: 'npm install -g sass',
            description: 'Install the Dart Sass compiler globally'
          },
          {
            cmd: 'sass --version',
            description: 'Verify Sass installed correctly'
          },
          {
            cmd: 'sass --watch src/styles/main.scss dist/styles/main.css',
            description: 'Watch and compile a Sass file to CSS on every save'
          }
        ],
        verification: {
          cmd: 'sass --version',
          expected: 'Dart Sass version number is displayed (e.g., 1.70.0)'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Live Server does not open in the browser',
        solution: 'Make sure you opened the project folder (not just a file) in VS Code. Right-click index.html in the VS Code Explorer sidebar and choose "Open with Live Server". The default port is 5500 — check the bottom status bar.'
      },
      {
        problem: 'Browser shows old version of CSS after making changes',
        solution: 'Live Server reloads automatically on save. If you opened the file directly (file:// URL) instead of through Live Server, hard-refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac) to bypass the cache.'
      },
      {
        problem: 'CSS styles not applying to HTML elements',
        solution: 'Open DevTools (F12) and inspect the element. Check the Styles panel for your rules — crossed-out rules mean they were overridden by a more specific selector. Verify the <link rel="stylesheet"> tag is inside <head> and the path is correct.'
      },
      {
        problem: 'sass command not found after npm install -g sass',
        solution: 'Your npm global bin directory may not be in your PATH. Run npm config get prefix to find the global directory, then add its bin/ folder to your PATH. On Windows, reopen your terminal after installation.'
      },
      {
        problem: 'Emmet abbreviations not expanding in VS Code',
        solution: 'Ensure the file type is recognized as HTML or CSS (check the language indicator in the bottom-right corner of VS Code). Add "emmet.triggerExpansionOnTab": true to VS Code settings if Tab expansion is not working.'
      }
    ]
  },

  'sql': {
    title: 'SQL Development Setup',
    prerequisites: [
      'A computer running Windows, macOS, or Linux',
      'A modern web browser (for the beginner path)',
      'Administrator/sudo access for installing software (intermediate and advanced paths)',
      'VS Code or a dedicated SQL client (intermediate and advanced paths)'
    ],
    steps: [
      {
        title: 'Beginner: Run SQL in the Browser (Zero Install)',
        description: 'Use SQLite Online to write and run SQL queries instantly — no installation required.',
        commands: [
          {
            cmd: 'echo "Visit https://sqliteonline.com/ in your browser to start writing SQL immediately"',
            description: 'Open https://sqliteonline.com/ — zero install, runs entirely in the browser'
          }
        ],
        verification: {
          cmd: 'SELECT 1+1;',
          expected: '2'
        }
      },
      {
        title: 'Intermediate: Install DB Browser for SQLite',
        description: 'Download DB Browser for SQLite for a local GUI tool to create and manage SQLite databases.',
        commands: [
          {
            cmd: 'echo "Download DB Browser for SQLite from https://sqlitebrowser.org/"',
            description: 'Download DB Browser for SQLite from https://sqlitebrowser.org/ (Windows, macOS, Linux)'
          },
          {
            cmd: 'brew install --cask db-browser-for-sqlite',
            description: 'Install DB Browser for SQLite on macOS via Homebrew'
          },
          {
            cmd: 'sudo apt install sqlitebrowser',
            description: 'Install DB Browser for SQLite on Ubuntu/Debian'
          }
        ],
        verification: {
          cmd: 'echo "Open DB Browser for SQLite, create a new database, and run: SELECT 1+1;"',
          expected: 'Query result shows 2'
        }
      },
      {
        title: 'Advanced: Install PostgreSQL 16 + pgAdmin',
        description: 'Install the full PostgreSQL 16 database server and pgAdmin for professional SQL development.',
        commands: [
          {
            cmd: 'echo "Download PostgreSQL 16 + pgAdmin from https://www.postgresql.org/download/"',
            description: 'Download PostgreSQL 16 from https://www.postgresql.org/download/ — installer includes pgAdmin'
          },
          {
            cmd: 'brew install postgresql@16',
            description: 'Install PostgreSQL 16 on macOS via Homebrew'
          },
          {
            cmd: 'sudo apt update && sudo apt install postgresql-16',
            description: 'Install PostgreSQL 16 on Ubuntu/Debian'
          },
          {
            cmd: 'brew install --cask pgadmin4',
            description: 'Install pgAdmin 4 on macOS'
          }
        ],
        verification: {
          cmd: 'psql -U postgres -c "SELECT 1+1;"',
          expected: '2'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'SQLite Online not loading in browser',
        solution: 'Try a different browser (Chrome or Firefox recommended) or disable browser extensions. The site requires JavaScript to be enabled.'
      },
      {
        problem: 'Connection refused when trying to connect to PostgreSQL',
        solution: 'Ensure the PostgreSQL service is running: brew services list (macOS), sudo systemctl status postgresql (Linux). The default port is 5432. Check if another service is using that port with lsof -i :5432.'
      },
      {
        problem: 'psql command not found',
        solution: 'On macOS with Homebrew, add PostgreSQL to PATH: echo \'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"\' >> ~/.zshrc && source ~/.zshrc. On Windows, add the PostgreSQL bin directory to your system PATH (typically C:\\Program Files\\PostgreSQL\\16\\bin).'
      },
      {
        problem: 'pgAdmin fails to launch or shows blank screen',
        solution: 'Try restarting pgAdmin or reinstalling it. On macOS, ensure Rosetta is installed if running on Apple Silicon. Check pgAdmin logs at ~/Library/Application Support/pgAdmin/pgadmin4.log.'
      }
    ]
  },

  'typescript': {
    title: 'TypeScript Development Setup',
    prerequisites: [
      'Node.js 22 LTS installed (use nvm for version management)',
      'npm package manager (included with Node.js)',
      'VS Code (recommended — TypeScript support is built-in)',
      'Basic JavaScript knowledge',
      'Terminal or command prompt familiarity'
    ],
    steps: [
      {
        title: 'Install Node.js 22 LTS via nvm',
        description: 'Use Node Version Manager (nvm) to install Node.js 22 LTS for a clean, permission-free setup.',
        commands: [
          {
            cmd: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash',
            description: 'Install nvm (macOS/Linux)'
          },
          {
            cmd: 'source ~/.bashrc',
            description: 'Reload your shell profile to activate nvm'
          },
          {
            cmd: 'nvm install 22 && nvm use 22',
            description: 'Install and activate Node.js 22 LTS'
          }
        ],
        verification: {
          cmd: 'node --version && npm --version',
          expected: 'Node v22.x.x and npm 10.x.x or higher'
        }
      },
      {
        title: 'Install TypeScript',
        description: 'Install the TypeScript compiler globally to use tsc from the command line.',
        commands: [
          {
            cmd: 'npm install -g typescript',
            description: 'Install TypeScript compiler globally'
          },
          {
            cmd: 'tsc --version',
            description: 'Verify TypeScript is installed and accessible'
          }
        ],
        verification: {
          cmd: 'tsc --version',
          expected: 'Version 5.x or higher'
        }
      },
      {
        title: 'Initialise tsconfig.json',
        description: 'Create a TypeScript configuration file in your project root to control compilation settings.',
        commands: [
          {
            cmd: 'tsc --init',
            description: 'Create tsconfig.json with sensible defaults'
          }
        ],
        verification: {
          cmd: 'cat tsconfig.json | head -5',
          expected: 'tsconfig.json should be present with compilerOptions'
        }
      },
      {
        title: 'Install ts-node',
        description: 'Install ts-node to run TypeScript files directly without a separate compile step.',
        commands: [
          {
            cmd: 'npm install -g ts-node',
            description: 'Install ts-node globally for running TypeScript files directly'
          },
          {
            cmd: 'ts-node --version',
            description: 'Verify ts-node is installed and accessible'
          }
        ],
        verification: {
          cmd: 'ts-node --version',
          expected: 'v10.x.x or higher'
        }
      },
      {
        title: 'Configure VS Code for TypeScript',
        description: 'VS Code has built-in TypeScript support — no extra extension needed to get started.',
        commands: [
          {
            cmd: 'echo "VS Code TypeScript support is built-in — open a .ts file and IntelliSense works immediately"',
            description: 'VS Code TypeScript support is built-in (no extension needed)'
          },
          {
            cmd: 'code --install-extension dbaeumer.vscode-eslint',
            description: 'Optional: Install ESLint extension for in-editor linting'
          },
          {
            cmd: 'code --install-extension esbenp.prettier-vscode',
            description: 'Optional: Install Prettier extension for code formatting'
          }
        ],
        verification: {
          cmd: 'echo "Open a .ts file in VS Code — you should see type hints and autocompletion without any extra setup"',
          expected: 'TypeScript IntelliSense works in .ts files out of the box'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'nvm command not found after installation',
        solution: 'Ensure your shell profile (~/.bashrc, ~/.zshrc, or ~/.profile) contains the nvm initialisation lines. Close and reopen your terminal, or run source ~/.bashrc (or equivalent) to reload.'
      },
      {
        problem: 'tsc command not found after installation',
        solution: 'If installed globally, ensure the npm global bin directory is in your PATH. If installed locally, use npx tsc instead. Run npm list -g typescript to verify the global installation.'
      },
      {
        problem: 'ts-node fails with ESM module errors',
        solution: 'For ESM projects, add "ts-node": { "esm": true } to your tsconfig.json and run with node --loader ts-node/esm. Alternatively, install tsx (npm install -g tsx) which handles ESM natively.'
      },
      {
        problem: 'Type errors when importing JavaScript libraries',
        solution: 'Install type definitions for the library: npm install -D @types/library-name. If no types exist, create a declarations.d.ts file with declare module "library-name"; to suppress the error while you work.'
      },
      {
        problem: 'Strict mode causing too many errors in existing code',
        solution: 'Migrate gradually by starting with "strict": false in tsconfig.json and enabling individual strict flags one at a time: strictNullChecks, noImplicitAny, strictFunctionTypes, etc.'
      }
    ]
  }
}
