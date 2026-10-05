@echo off
echo ===================================================================
echo Starting NxtWave Campaign: "Build Your First AI Project in 60 Minutes"
echo Goal: 500 Final-Year Engineering Registrations Prototype
echo ===================================================================
echo.

REM Try to launch Python simple HTTP server if python is installed
python --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Python detected. Launching local web server on http://localhost:3000 ...
    start "" http://localhost:3000
    python -m http.server 3000
    exit /b
)

REM Otherwise try npx serve
npx --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Node/npx detected. Launching local web server on http://localhost:3000 ...
    start "" http://localhost:3000
    npx serve -l 3000 .
    exit /b
)

REM Fallback: open index.html directly in the default browser
echo Opening index.html directly in browser...
start "" index.html
