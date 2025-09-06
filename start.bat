@echo off
echo ========================================
echo    OSINT Matrix - Starting Application
echo ========================================
echo.

:: Check if node_modules exists
if not exist "node_modules" (
    echo Dependencies not found. Running setup first...
    call setup.bat
    if %errorlevel% neq 0 exit /b 1
)

echo Starting development server...
echo.
echo The application will open in your browser at:
echo http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev