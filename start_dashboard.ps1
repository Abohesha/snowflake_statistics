Write-Host "🚀 Starting Sawwaf Labeling Dashboard..." -ForegroundColor Green
Write-Host ""
Set-Location dashboard
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}
Write-Host ""
Write-Host "🌐 Starting development server..." -ForegroundColor Cyan
Write-Host "Dashboard will be available at: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
npm start



