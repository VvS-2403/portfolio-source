# AI Portfolio Manager

This repository helps manage and publish the portfolio project and provides a one-command setup to create a GitHub repository and push the local code.

Prerequisites
- Git installed and available in PATH
- GitHub CLI (`gh`) installed and authenticated (run `gh auth login`)
- Node.js (v16+) and package manager (npm, pnpm, or yarn)

Quick setup (PowerShell)
```powershell
# run from the repo root (this folder)
.\n+.
# Example: create and push to a new public repo called 'ai-portfolio-manager'
.
.
```

Automated setup

- Run the included PowerShell script to initialize git, create a GitHub repo using `gh`, and push the code:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup-github.ps1 -repoName "ai-portfolio-manager" -visibility public
```

If you prefer manual steps:

```powershell
git init
git add .
git commit -m "Initial commit: portfolio"
gh repo create ai-portfolio-manager --public --source=. --remote=origin --push
```

VS Code
- Use the `Source Control` pane to view commits and sync changes.
- A task is provided in `.vscode/tasks.json` to run the setup script.
