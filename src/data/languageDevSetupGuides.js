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
      'A modern web browser (Chrome, Firefox, or Edge)',
      'VS Code (recommended) or another code editor',
      'Basic terminal or command prompt familiarity'
    ],
    steps: [
      {
        title: 'Configure VS Code with Essential Extensions',
        description: 'Install VS Code extensions for live preview, Emmet shortcuts, and enhanced HTML/CSS editing.',
        commands: [
          {
            cmd: 'code --install-extension ritwickdey.LiveServer',
            description: 'Install Live Server for auto-reloading browser preview'
          },
          {
            cmd: 'code --install-extension ecmel.vscode-html-css',
            description: 'Install HTML CSS Support for class name autocompletion'
          },
          {
            cmd: 'code --install-extension pranaygp.vscode-css-peek',
            description: 'Install CSS Peek to jump from HTML class names to CSS definitions'
          },
          {
            cmd: 'code --install-extension formulahendry.auto-rename-tag',
            description: 'Install Auto Rename Tag for synchronized tag editing'
          }
        ],
        verification: {
          cmd: 'code --list-extensions | grep -i liveserver',
          expected: 'ritwickdey.liveserver should appear in the list'
        }
      },
      {
        title: 'Install Node.js and CSS Build Tools',
        description: 'Install Node.js to access PostCSS, Autoprefixer, and other CSS processing tools.',
        commands: [
          {
            cmd: 'node --version',
            description: 'Verify Node.js is installed (install from nodejs.org if not)'
          },
          {
            cmd: 'npm install -g postcss postcss-cli',
            description: 'Install PostCSS globally for CSS transformations'
          },
          {
            cmd: 'npm install -g autoprefixer',
            description: 'Install Autoprefixer to add vendor prefixes automatically'
          },
          {
            cmd: 'npm install -g cssnano',
            description: 'Install cssnano for CSS minification'
          }
        ],
        verification: {
          cmd: 'postcss --version && echo "PostCSS installed"',
          expected: 'PostCSS version number is displayed'
        }
      },
      {
        title: 'Learn Browser DevTools Basics',
        description: 'Familiarize yourself with browser developer tools for inspecting and debugging HTML/CSS.',
        commands: [
          {
            cmd: 'open -a "Google Chrome" --args --auto-open-devtools-for-tabs',
            description: 'Open Chrome with DevTools automatically opened (macOS)'
          },
          {
            cmd: 'google-chrome --auto-open-devtools-for-tabs',
            description: 'Open Chrome with DevTools automatically opened (Linux)'
          },
          {
            cmd: 'echo "Press F12 or Ctrl+Shift+I (Cmd+Option+I on Mac) to open DevTools in any browser"',
            description: 'Keyboard shortcut reminder for opening DevTools'
          }
        ],
        verification: {
          cmd: 'echo "Open any webpage and press F12 — you should see the Elements, Console, and Network tabs"',
          expected: 'DevTools panel opens showing the Elements tab with HTML structure'
        }
      },
      {
        title: 'Set Up a Basic Project Structure',
        description: 'Create a standard folder structure for an HTML/CSS project with proper file organization.',
        commands: [
          {
            cmd: 'mkdir -p my-web-project/{css,js,images}',
            description: 'Create project folder with subdirectories for CSS, JS, and images'
          },
          {
            cmd: 'touch my-web-project/index.html my-web-project/css/styles.css my-web-project/js/main.js',
            description: 'Create the main HTML, CSS, and JS files'
          },
          {
            cmd: 'echo \'<!DOCTYPE html>\\n<html lang="en">\\n<head>\\n  <meta charset="UTF-8">\\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\\n  <title>My Project</title>\\n  <link rel="stylesheet" href="css/styles.css">\\n</head>\\n<body>\\n  <h1>Hello World</h1>\\n  <script src="js/main.js"></script>\\n</body>\\n</html>\' > my-web-project/index.html',
            description: 'Add HTML5 boilerplate to index.html'
          },
          {
            cmd: 'echo "Tip: In VS Code, type ! then press Tab in an empty .html file to generate HTML5 boilerplate via Emmet"',
            description: 'Emmet shortcut for faster HTML scaffolding'
          }
        ],
        verification: {
          cmd: 'ls my-web-project/',
          expected: 'Should show css/, js/, images/, and index.html'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Browser shows old version of CSS after making changes',
        solution: 'Hard refresh the page with Ctrl+Shift+R (Cmd+Shift+R on Mac) to bypass the cache. Alternatively, open DevTools, go to the Network tab, and check "Disable cache" while DevTools is open. Using Live Server extension avoids this issue.'
      },
      {
        problem: 'CSS or JS file not loading — 404 errors in console',
        solution: 'Check that file paths in your HTML are correct and case-sensitive. Use relative paths like "./css/styles.css" or "css/styles.css". Open DevTools Console (F12) to see exact error messages and failed resource URLs.'
      },
      {
        problem: 'Live Server extension not working or not auto-reloading',
        solution: 'Ensure you opened the project folder (not a parent folder) in VS Code. Right-click on index.html and select "Open with Live Server". Check the VS Code status bar at the bottom for the port number (default: 5500).'
      },
      {
        problem: 'CSS styles not applying to HTML elements',
        solution: 'Use browser DevTools to inspect the element — check if your styles appear in the Styles panel. Look for specificity issues (more specific selectors override less specific ones). Ensure the stylesheet link tag is in the <head> section.'
      },
      {
        problem: 'Emmet abbreviations not expanding in VS Code',
        solution: 'Ensure the file is recognized as HTML or CSS (check the language mode in the bottom-right of VS Code). If Emmet still does not work, add "emmet.triggerExpansionOnTab": true to your VS Code settings.'
      }
    ]
  },

  'sql': {
    title: 'SQL Development Setup',
    prerequisites: [
      'A computer running Windows, macOS, or Linux',
      'Administrator/sudo access for installing software',
      'VS Code or a dedicated SQL client',
      'Terminal or command prompt familiarity',
      'Docker (optional, for containerized database setup)'
    ],
    steps: [
      {
        title: 'Install PostgreSQL',
        description: 'Install PostgreSQL database server either directly or via Docker for a quick, isolated setup.',
        commands: [
          {
            cmd: 'brew install postgresql@16',
            description: 'Install PostgreSQL 16 on macOS via Homebrew'
          },
          {
            cmd: 'sudo apt update && sudo apt install postgresql postgresql-contrib',
            description: 'Install PostgreSQL on Ubuntu/Debian Linux'
          },
          {
            cmd: 'docker run --name postgres-dev -e POSTGRES_PASSWORD=devpassword -p 5432:5432 -d postgres:16',
            description: 'Alternative: Run PostgreSQL 16 in Docker (recommended for quick setup)'
          },
          {
            cmd: 'brew services start postgresql@16',
            description: 'Start PostgreSQL service on macOS'
          }
        ],
        verification: {
          cmd: 'psql --version',
          expected: 'psql (PostgreSQL) 16.x — version number should be 16 or higher'
        }
      },
      {
        title: 'Install a Database GUI Client',
        description: 'Install DBeaver (free, cross-platform) or pgAdmin for visual database management.',
        commands: [
          {
            cmd: 'brew install --cask dbeaver-community',
            description: 'Install DBeaver Community Edition on macOS'
          },
          {
            cmd: 'sudo snap install dbeaver-ce',
            description: 'Install DBeaver on Ubuntu/Debian via Snap'
          },
          {
            cmd: 'brew install --cask pgadmin4',
            description: 'Alternative: Install pgAdmin 4 on macOS'
          },
          {
            cmd: 'echo "Windows users: Download DBeaver from https://dbeaver.io/download/ or pgAdmin from https://www.pgadmin.org/download/"',
            description: 'Installation links for Windows'
          }
        ],
        verification: {
          cmd: 'echo "Open DBeaver or pgAdmin and verify it launches without errors"',
          expected: 'The GUI application opens and displays a welcome screen or connection dialog'
        }
      },
      {
        title: 'Create a Practice Database',
        description: 'Connect to PostgreSQL and create a dedicated database for learning and experimentation.',
        commands: [
          {
            cmd: 'psql -U postgres',
            description: 'Connect to PostgreSQL as the default superuser'
          },
          {
            cmd: 'CREATE DATABASE practice_db;',
            description: 'Create a new database for practice (run inside psql)'
          },
          {
            cmd: 'CREATE USER dev_user WITH PASSWORD \'devpassword\';',
            description: 'Create a dedicated user for development (run inside psql)'
          },
          {
            cmd: 'GRANT ALL PRIVILEGES ON DATABASE practice_db TO dev_user;',
            description: 'Grant the dev user full access to the practice database'
          },
          {
            cmd: '\\q',
            description: 'Exit the psql shell'
          }
        ],
        verification: {
          cmd: 'psql -U dev_user -d practice_db -c "SELECT current_database();"',
          expected: 'Should display practice_db as the current database'
        }
      },
      {
        title: 'Load Sample Data',
        description: 'Import the Chinook or Northwind sample database to practice writing queries against realistic data.',
        commands: [
          {
            cmd: 'curl -L -o chinook.sql https://raw.githubusercontent.com/lerocha/chinook-database/master/ChinookDatabase/DataSources/Chinook_PostgreSql.sql',
            description: 'Download the Chinook sample database SQL file'
          },
          {
            cmd: 'psql -U dev_user -d practice_db -f chinook.sql',
            description: 'Import the Chinook data into your practice database'
          },
          {
            cmd: 'psql -U dev_user -d practice_db -c "SELECT COUNT(*) FROM \"Artist\";"',
            description: 'Verify data was loaded by counting artists'
          }
        ],
        verification: {
          cmd: 'psql -U dev_user -d practice_db -c "\\dt"',
          expected: 'Should list tables including Artist, Album, Track, Customer, Invoice, etc.'
        }
      },
      {
        title: 'Configure VS Code for SQL',
        description: 'Install SQL extensions for VS Code to write and run queries directly from the editor.',
        commands: [
          {
            cmd: 'code --install-extension mtxr.sqltools',
            description: 'Install SQLTools — a database management extension for VS Code'
          },
          {
            cmd: 'code --install-extension mtxr.sqltools-driver-pg',
            description: 'Install the PostgreSQL driver for SQLTools'
          },
          {
            cmd: 'code --install-extension ckolkman.vscode-postgres',
            description: 'Install PostgreSQL extension for syntax highlighting and IntelliSense'
          }
        ],
        verification: {
          cmd: 'code --list-extensions | grep -i sql',
          expected: 'mtxr.sqltools and related extensions should appear in the list'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Connection refused when trying to connect to PostgreSQL',
        solution: 'Ensure the PostgreSQL service is running: brew services list (macOS), sudo systemctl status postgresql (Linux), or docker ps (Docker). The default port is 5432. Check if another service is using that port with lsof -i :5432.'
      },
      {
        problem: 'Authentication failed — password or peer authentication error',
        solution: 'For local connections, edit pg_hba.conf (usually in /etc/postgresql/16/main/ on Linux or /usr/local/var/postgresql@16/ on macOS) and change "peer" to "md5" for local connections. Restart PostgreSQL after changes. For Docker, ensure you use the password set in POSTGRES_PASSWORD.'
      },
      {
        problem: 'psql command not found',
        solution: 'On macOS with Homebrew, add PostgreSQL to PATH: echo \'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"\' >> ~/.zshrc && source ~/.zshrc. On Windows, add the PostgreSQL bin directory to your system PATH (typically C:\\Program Files\\PostgreSQL\\16\\bin).'
      },
      {
        problem: 'Cannot create database or permission denied errors',
        solution: 'Connect as the postgres superuser first: psql -U postgres. If the postgres user has no password set, use sudo -u postgres psql on Linux. For Docker, use the credentials specified when creating the container.'
      },
      {
        problem: 'Sample data import fails with encoding errors',
        solution: 'Ensure the database is created with UTF-8 encoding: CREATE DATABASE practice_db ENCODING \'UTF8\'. If the SQL file has issues, try downloading it again or use the alternative Northwind dataset.'
      }
    ]
  },

  'typescript': {
    title: 'TypeScript Development Setup',
    prerequisites: [
      'Node.js 20+ LTS installed (use nvm for version management)',
      'npm, yarn, or pnpm package manager',
      'VS Code (recommended) or another TypeScript-aware editor',
      'Basic JavaScript knowledge',
      'Terminal or command prompt familiarity'
    ],
    steps: [
      {
        title: 'Install Node.js and TypeScript',
        description: 'Install Node.js if not already present, then install TypeScript globally for command-line access.',
        commands: [
          {
            cmd: 'node --version',
            description: 'Verify Node.js is installed (should be 20.x or higher)'
          },
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
        title: 'Initialize tsconfig.json with Strict Mode',
        description: 'Create a TypeScript configuration file with strict type checking enabled for maximum safety.',
        commands: [
          {
            cmd: 'mkdir my-ts-project && cd my-ts-project',
            description: 'Create and enter a new project directory'
          },
          {
            cmd: 'npm init -y',
            description: 'Initialize package.json with default values'
          },
          {
            cmd: 'tsc --init --strict --target ES2022 --module NodeNext --moduleResolution NodeNext --outDir ./dist --rootDir ./src --esModuleInterop --skipLibCheck',
            description: 'Generate tsconfig.json with strict mode and modern settings'
          },
          {
            cmd: 'mkdir src',
            description: 'Create the source directory for TypeScript files'
          }
        ],
        verification: {
          cmd: 'cat tsconfig.json | head -10',
          expected: 'tsconfig.json should show strict: true and target: ES2022'
        }
      },
      {
        title: 'Install ts-node for Running Scripts',
        description: 'Install ts-node and tsx to run TypeScript files directly without a separate compile step.',
        commands: [
          {
            cmd: 'npm install -D ts-node @types/node',
            description: 'Install ts-node and Node.js type definitions as dev dependencies'
          },
          {
            cmd: 'npm install -D tsx',
            description: 'Install tsx — a faster alternative to ts-node for running TypeScript'
          },
          {
            cmd: 'echo \'console.log("Hello, TypeScript!");\' > src/index.ts',
            description: 'Create a simple TypeScript file to test the setup'
          },
          {
            cmd: 'npx tsx src/index.ts',
            description: 'Run the TypeScript file directly with tsx'
          }
        ],
        verification: {
          cmd: 'npx tsx src/index.ts',
          expected: 'Hello, TypeScript!'
        }
      },
      {
        title: 'Configure VS Code for TypeScript',
        description: 'Set up VS Code with extensions and settings optimized for TypeScript development.',
        commands: [
          {
            cmd: 'code --install-extension dbaeumer.vscode-eslint',
            description: 'Install ESLint extension for in-editor linting'
          },
          {
            cmd: 'code --install-extension esbenp.prettier-vscode',
            description: 'Install Prettier extension for code formatting'
          },
          {
            cmd: 'code --install-extension ms-vscode.vscode-typescript-next',
            description: 'Install TypeScript Nightly for latest language features'
          },
          {
            cmd: 'echo "Tip: VS Code has built-in TypeScript support — hover over variables to see inferred types, use F2 to rename symbols across files"',
            description: 'Built-in TypeScript features in VS Code'
          }
        ],
        verification: {
          cmd: 'code --list-extensions | grep -i typescript',
          expected: 'TypeScript-related extensions should appear in the list'
        }
      },
      {
        title: 'Set Up a Build Pipeline',
        description: 'Configure build scripts, linting, and testing for a complete TypeScript development workflow.',
        commands: [
          {
            cmd: 'npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin',
            description: 'Install ESLint with TypeScript support'
          },
          {
            cmd: 'npm install -D prettier',
            description: 'Install Prettier for code formatting'
          },
          {
            cmd: 'npm install -D jest ts-jest @types/jest',
            description: 'Install Jest with TypeScript support for testing'
          },
          {
            cmd: 'npx ts-jest config:init',
            description: 'Initialize Jest configuration for TypeScript'
          },
          {
            cmd: 'npm pkg set scripts.build="tsc" scripts.dev="tsx watch src/index.ts" scripts.lint="eslint src/" scripts.test="jest"',
            description: 'Add build, dev, lint, and test scripts to package.json'
          }
        ],
        verification: {
          cmd: 'npm run build && ls dist/',
          expected: 'TypeScript compiles without errors and dist/ contains the generated JavaScript files'
        }
      }
    ],
    troubleshooting: [
      {
        problem: 'Type errors when importing JavaScript libraries',
        solution: 'Install type definitions for the library: npm install -D @types/library-name. If no types exist, create a declarations.d.ts file with declare module "library-name"; to suppress the error while you work.'
      },
      {
        problem: 'Module resolution errors — cannot find module',
        solution: 'Ensure moduleResolution in tsconfig.json matches your setup. Use "NodeNext" for Node.js projects or "bundler" for projects using a bundler like Vite or webpack. Check that paths and baseUrl are configured correctly if using path aliases.'
      },
      {
        problem: 'tsc command not found after installation',
        solution: 'If installed globally, ensure the npm global bin directory is in your PATH. If installed locally, use npx tsc instead. Run npm list -g typescript to verify the global installation.'
      },
      {
        problem: 'Strict mode causing too many errors in existing JavaScript code',
        solution: 'Migrate gradually by starting with "strict": false in tsconfig.json and enabling individual strict flags one at a time: strictNullChecks, noImplicitAny, strictFunctionTypes, etc. Use // @ts-ignore sparingly for lines you will fix later.'
      },
      {
        problem: 'ts-node fails with ESM module errors',
        solution: 'Use tsx instead of ts-node for ESM projects, as it handles ESM natively. If you must use ts-node, add "ts-node": { "esm": true } to your tsconfig.json and run with node --loader ts-node/esm.'
      }
    ]
  }
}
