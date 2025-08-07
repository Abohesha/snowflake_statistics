@echo off
echo Starting Sawwaf Labeling Dashboard...
echo.
cd dashboard
echo Installing dependencies...
npm install
echo.
echo Starting development server...
echo Dashboard will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
npm start
pause



