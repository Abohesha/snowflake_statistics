# Comprehensive Analysis Dashboard Deployment Script for Windows
# This script helps you deploy the dashboard to GitHub and Render

Write-Host "🚀 Comprehensive Analysis Dashboard Deployment Script" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

# Check if git is installed
try {
    git --version | Out-Null
    Write-Status "Git is installed"
} catch {
    Write-Error "Git is not installed. Please install Git first."
    exit 1
}

# Check if node is installed
try {
    node --version | Out-Null
    Write-Status "Node.js is installed"
} catch {
    Write-Error "Node.js is not installed. Please install Node.js first."
    exit 1
}

# Check if npm is installed
try {
    npm --version | Out-Null
    Write-Status "npm is installed"
} catch {
    Write-Error "npm is not installed. Please install npm first."
    exit 1
}

Write-Status "Prerequisites check passed!"

# Step 1: Initialize Git repository
Write-Host ""
Write-Info "Step 1: Initializing Git repository..."

if (-not (Test-Path ".git")) {
    git init
    Write-Status "Git repository initialized"
} else {
    Write-Warning "Git repository already exists"
}

# Step 2: Add all files to Git
Write-Info "Step 2: Adding files to Git..."
git add .
Write-Status "Files added to Git"

# Step 3: Create initial commit
Write-Info "Step 3: Creating initial commit..."
git commit -m "Initial commit: Comprehensive Analysis Dashboard"
Write-Status "Initial commit created"

# Step 4: Get GitHub repository URL
Write-Host ""
Write-Info "Step 4: GitHub Repository Setup"
Write-Host "Please follow these steps:"
Write-Host "1. Go to https://github.com"
Write-Host "2. Click 'New repository'"
Write-Host "3. Name it: comprehensive-analysis-dashboard"
Write-Host "4. Make it Public"
Write-Host "5. DON'T initialize with README (we already have one)"
Write-Host "6. Click 'Create repository'"
Write-Host ""

$github_username = Read-Host "Enter your GitHub username"
$repo_name = Read-Host "Enter the repository name (default: comprehensive-analysis-dashboard)"
if (-not $repo_name) {
    $repo_name = "comprehensive-analysis-dashboard"
}

# Step 5: Add remote origin
Write-Info "Step 5: Adding GitHub remote..."
git remote add origin "https://github.com/$github_username/$repo_name.git"
Write-Status "GitHub remote added"

# Step 6: Push to GitHub
Write-Info "Step 6: Pushing to GitHub..."
git branch -M main
git push -u origin main
Write-Status "Code pushed to GitHub"

# Step 7: Render deployment instructions
Write-Host ""
Write-Info "Step 7: Render Deployment Instructions"
Write-Host "=========================================="
Write-Host ""
Write-Host "Now follow these steps to deploy on Render:"
Write-Host ""
Write-Host "1. Go to https://render.com"
Write-Host "2. Sign up/Sign in with your GitHub account"
Write-Host "3. Click 'New +' → 'Web Service'"
Write-Host "4. Connect your GitHub repository"
Write-Host "5. Select: $github_username/$repo_name"
Write-Host ""
Write-Host "Configuration Settings:"
Write-Host "• Name: $repo_name"
Write-Host "• Environment: Node"
Write-Host "• Build Command: cd dashboard && npm install && npm run build"
Write-Host "• Start Command: cd dashboard && npm run preview"
Write-Host "• Root Directory: (leave empty)"
Write-Host ""
Write-Host "6. Click 'Create Web Service'"
Write-Host "7. Wait for deployment to complete"
Write-Host ""
Write-Host "Your dashboard will be available at:"
Write-Host "https://$repo_name.onrender.com"
Write-Host ""

Write-Status "Deployment script completed!"
Write-Host ""
Write-Host "🎉 Your dashboard is now ready for deployment!" -ForegroundColor Green
Write-Host "📊 GitHub repository: https://github.com/$github_username/$repo_name"
Write-Host "🌐 Render URL: https://$repo_name.onrender.com (after deployment)"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Complete the Render deployment steps above"
Write-Host "2. Test your live dashboard"
Write-Host "3. Share the URL with your team"
Write-Host ""
