#!/bin/bash

# Comprehensive Analysis Dashboard Deployment Script
# This script helps you deploy the dashboard to GitHub and Render

echo "🚀 Comprehensive Analysis Dashboard Deployment Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Prerequisites check passed!"

# Step 1: Initialize Git repository
echo ""
print_info "Step 1: Initializing Git repository..."

if [ ! -d ".git" ]; then
    git init
    print_status "Git repository initialized"
else
    print_warning "Git repository already exists"
fi

# Step 2: Add all files to Git
print_info "Step 2: Adding files to Git..."
git add .
print_status "Files added to Git"

# Step 3: Create initial commit
print_info "Step 3: Creating initial commit..."
git commit -m "Initial commit: Comprehensive Analysis Dashboard"
print_status "Initial commit created"

# Step 4: Get GitHub repository URL
echo ""
print_info "Step 4: GitHub Repository Setup"
echo "Please follow these steps:"
echo "1. Go to https://github.com"
echo "2. Click 'New repository'"
echo "3. Name it: comprehensive-analysis-dashboard"
echo "4. Make it Public"
echo "5. DON'T initialize with README (we already have one)"
echo "6. Click 'Create repository'"
echo ""

read -p "Enter your GitHub username: " github_username
read -p "Enter the repository name (default: comprehensive-analysis-dashboard): " repo_name
repo_name=${repo_name:-comprehensive-analysis-dashboard}

# Step 5: Add remote origin
print_info "Step 5: Adding GitHub remote..."
git remote add origin "https://github.com/$github_username/$repo_name.git"
print_status "GitHub remote added"

# Step 6: Push to GitHub
print_info "Step 6: Pushing to GitHub..."
git branch -M main
git push -u origin main
print_status "Code pushed to GitHub"

# Step 7: Render deployment instructions
echo ""
print_info "Step 7: Render Deployment Instructions"
echo "=========================================="
echo ""
echo "Now follow these steps to deploy on Render:"
echo ""
echo "1. Go to https://render.com"
echo "2. Sign up/Sign in with your GitHub account"
echo "3. Click 'New +' → 'Web Service'"
echo "4. Connect your GitHub repository"
echo "5. Select: $github_username/$repo_name"
echo ""
echo "Configuration Settings:"
echo "• Name: $repo_name"
echo "• Environment: Node"
echo "• Build Command: cd dashboard && npm install && npm run build"
echo "• Start Command: cd dashboard && npm run preview"
echo "• Root Directory: (leave empty)"
echo ""
echo "6. Click 'Create Web Service'"
echo "7. Wait for deployment to complete"
echo ""
echo "Your dashboard will be available at:"
echo "https://$repo_name.onrender.com"
echo ""

print_status "Deployment script completed!"
echo ""
echo "🎉 Your dashboard is now ready for deployment!"
echo "📊 GitHub repository: https://github.com/$github_username/$repo_name"
echo "🌐 Render URL: https://$repo_name.onrender.com (after deployment)"
echo ""
echo "Next steps:"
echo "1. Complete the Render deployment steps above"
echo "2. Test your live dashboard"
echo "3. Share the URL with your team"
echo ""
