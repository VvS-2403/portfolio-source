param(
  [string]$repoName = "ai-portfolio-manager",
  [ValidateSet("public","private")][string]$visibility = "public"
)

function Write-ErrAndExit($msg){ Write-Host $msg -ForegroundColor Red; exit 1 }

# Check for git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-ErrAndExit "Git is not installed or not in PATH. Install Git and try again."
}

# Check for gh
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Host "Warning: GitHub CLI 'gh' not found. The script will initialize git locally but cannot create remote." -ForegroundColor Yellow
}

if (-not (Test-Path .git)) {
  git init
  git add .
  git commit -m "Initial commit: migrate portfolio"
} else {
  Write-Host "Existing git repository detected; skipping git init." -ForegroundColor Cyan
}

if (Get-Command gh -ErrorAction SilentlyContinue) {
  Write-Host "Creating GitHub repository '$repoName' ($visibility) and pushing..." -ForegroundColor Green
  gh repo create $repoName --$visibility --source=. --remote=origin --push
  if ($LASTEXITCODE -ne 0) { Write-ErrAndExit "gh failed to create or push the repo. Check gh auth and try again." }
} else {
  Write-Host "No 'gh' detected. To create a remote manually run:" -ForegroundColor Yellow
  Write-Host "  gh repo create $repoName --$visibility --source=. --remote=origin --push" -ForegroundColor White
}

Write-Host "Done. Use VS Code Source Control to sync changes, or run 'git push' as usual." -ForegroundColor Green
