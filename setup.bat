@echo off
echo ========================================
echo    OSINT Matrix - Windows Setup Script
echo ========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    echo Choose the LTS version and make sure to add it to PATH
    pause
    exit /b 1
)

:: Display Node.js version
echo Node.js version:
node --version
echo.

:: Display npm version
echo npm version:
npm --version
echo.

:: Install dependencies
echo Installing dependencies...
echo This may take a few minutes...
echo.
npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

echo.
echo ========================================
echo     Setup completed successfully!
echo ========================================
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo The application will open automatically in your browser
echo at http://localhost:8080
echo.
pause